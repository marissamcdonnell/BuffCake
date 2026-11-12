"""Rule-based checks for one cake reaction line. Pure functions, no network.

Each check returns None when the line passes, or a short reason when it fails.
"""

import re
import unicodedata

MAX_WORDS = 15
FIRST_PERSON = re.compile(r"\b(i|i'm|i've|i'll|me|my|mine|myself)\b", re.IGNORECASE)


def check_not_empty(line: str) -> str | None:
    return None if line.strip() else "empty"


def check_short(line: str) -> str | None:
    words = len(line.split())
    return None if words <= MAX_WORDS else f"{words} words (max {MAX_WORDS})"


def check_no_emoji(line: str) -> str | None:
    # "So" = Unicode "Symbol, other", the category emoji fall into.
    found = [c for c in line if unicodedata.category(c) == "So"]
    return None if not found else f"emoji: {''.join(found)}"


def check_no_hashtags(line: str) -> str | None:
    return None if not re.search(r"#\w", line) else "hashtag"


def check_no_wrapping_quotes(line: str) -> str | None:
    quotes = "\"'“”‘’"
    s = line.strip()
    return "wrapped in quotes" if len(s) > 1 and s[0] in quotes and s[-1] in quotes else None


def check_first_person(line: str) -> str | None:
    return None if FIRST_PERSON.search(line) else "not first person"


RULES = {
    "not_empty": check_not_empty,
    "short": check_short,
    "no_emoji": check_no_emoji,
    "no_hashtags": check_no_hashtags,
    "no_wrapping_quotes": check_no_wrapping_quotes,
    "first_person": check_first_person,
}


def run_rules(line: str) -> dict[str, str]:
    """Return {rule_name: reason} for every rule the line fails. Empty dict = all passed."""
    failures = {}
    for name, rule in RULES.items():
        reason = rule(line)
        if reason:
            failures[name] = reason
    return failures
