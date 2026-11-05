"""BuffCake evals: does the cake stay short, in character, and family-friendly?

Calls Claude with the exact prompt the game uses (shared/cake-prompt.json),
scores every line with rule checks, and optionally asks a second model to
judge tone. Standard library only, so it runs with plain python3.

    export ANTHROPIC_API_KEY=sk-ant-...
    python3 evals/run_evals.py              # rules + judge, 3 samples per case
    python3 evals/run_evals.py --no-judge   # rules only (cheaper)
    python3 evals/run_evals.py --samples 5 --threshold 0.95

Exits with code 1 when the pass rate is below --threshold, so it can gate CI.
"""

import argparse
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from checks import run_rules  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
PROMPT = json.loads((ROOT / "shared" / "cake-prompt.json").read_text())
CASES = json.loads((Path(__file__).parent / "cases.json").read_text())

JUDGE_MODEL = "claude-sonnet-5-5"
JUDGE_SYSTEM = (
    "You grade one line written by BuffCake, a cartoon cake that gets more muscular "
    "the more protein it eats. Reply with JSON only, no prose: "
    '{"in_character": true|false, "family_friendly": true|false, '
    '"funny": 1-5, "reason": "<one short sentence>"}. '
    "in_character = it sounds like a cake talking about food or getting buff. "
    "family_friendly = fine for a 10-year-old. funny = 3 means a smile, 5 means a laugh."
)


def call_claude(api_key: str, model: str, system: str, user: str, max_tokens: int) -> str:
    request = urllib.request.Request(
        "https://api.anthropic.com/v1/messages",
        data=json.dumps(
            {
                "model": model,
                "max_tokens": max_tokens,
                "system": system,
                "messages": [{"role": "user", "content": user}],
            }
        ).encode(),
        headers={
            "x-api-key": api_key,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        data = json.load(response)
    return next(block["text"] for block in data["content"] if block["type"] == "text").strip()


def user_message(case: dict) -> str:
    # Same substitution as userMessage() in api/react.ts.
    return (
        PROMPT["userTemplate"]
        .replace("{foods}", ", ".join(case["foods"]))
        .replace("{gained}", str(case["gained"]))
        .replace("{level}", case["level"])
    )


def judge(api_key: str, line: str) -> dict[str, str]:
    """Return {check: reason} for judge failures."""
    raw = call_claude(api_key, JUDGE_MODEL, JUDGE_SYSTEM, line, 150)
    try:
        verdict = json.loads(raw.removeprefix("```json").removesuffix("```").strip())
    except json.JSONDecodeError:
        return {"judge": f"unparseable verdict: {raw[:60]}"}
    failures = {}
    if not verdict.get("in_character"):
        failures["in_character"] = verdict.get("reason", "")
    if not verdict.get("family_friendly"):
        failures["family_friendly"] = verdict.get("reason", "")
    if int(verdict.get("funny", 0)) < 3:
        failures["funny"] = f"{verdict.get('funny')}/5: {verdict.get('reason', '')}"
    return failures


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--samples", type=int, default=3, help="lines per case (default 3)")
    parser.add_argument("--threshold", type=float, default=0.9, help="min pass rate (default 0.9)")
    parser.add_argument("--no-judge", action="store_true", help="skip the model-graded checks")
    args = parser.parse_args()

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("Set ANTHROPIC_API_KEY first.", file=sys.stderr)
        return 2

    results = []
    for case in CASES:
        for _ in range(args.samples):
            try:
                line = call_claude(api_key, PROMPT["model"], PROMPT["system"], user_message(case), PROMPT["maxTokens"])
                failures = run_rules(line)
                if not args.no_judge:
                    failures |= judge(api_key, line)
            except urllib.error.HTTPError as err:
                line, failures = "", {"api": f"HTTP {err.code}: {err.read()[:120]!r}"}
            results.append((case["name"], line, failures))
            mark = "PASS" if not failures else "FAIL"
            print(f"{mark}  {case['name']:<14} {line}")
            for check, reason in failures.items():
                print(f"      - {check}: {reason}")

    passed = sum(1 for _, _, failures in results if not failures)
    rate = passed / len(results)
    print(f"\n{passed}/{len(results)} passed ({rate:.0%}), threshold {args.threshold:.0%}")
    return 0 if rate >= args.threshold else 1


if __name__ == "__main__":
    sys.exit(main())
