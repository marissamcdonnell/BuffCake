# BuffCake 🎂💪

Feed the cake. Watch it get buff.

A revival of SquishFruits (my first dev project: mash fruits, get a random taste like "shoe"). This time you pick foods, feed a cake, and it bulks up from **Soft Sponge** to **Beef Cake**. The cake talks back using Claude.

## Run it

```sh
pnpm install
pnpm dev     # game at http://localhost:5173 (offline reactions)
pnpm test    # game logic tests, Node's built-in runner
```

To hear real Claude reactions locally, run `vercel dev` with `ANTHROPIC_API_KEY` set in `.env.local`.

## Evals

Checks that the cake stays short, in character and family-friendly, using the exact prompt the game uses (`shared/cake-prompt.json`). Python standard library only, no install.

```sh
export ANTHROPIC_API_KEY=sk-ant-...
pnpm evals                # rule checks + a Claude judge, 3 lines per case
pnpm evals -- --no-judge  # rule checks only
pnpm test:evals           # unit tests for the rule checks, no API calls
```

Rule checks: ≤15 words, first person, no emoji, no hashtags, not wrapped in quotes. The judge (`claude-sonnet-5-5`) scores in-character, family-friendly and funny (≥3/5). Cases live in `evals/cases.json`. Exits 1 below a 90% pass rate.

## How it's built

| Piece | Where | What it does |
| --- | --- | --- |
| Game rules | `src/game/` | Pure functions: `feed(cake, meal)` → new cake. No React, fully tested. |
| UI | `src/components/`, `src/App.tsx` | React 19 + Tailwind v4. SVG cake whose biceps grow with buff. |
| Reactions API | `api/react.ts` | Vercel function. Validates input, calls Claude, keeps the key server-side. |
| Fallback | `src/game/reactions.ts` | Canned lines when the API is missing or slow, so the game never breaks. |
| Prompt | `shared/cake-prompt.json` | Model, system prompt and message template, shared by the API and the evals. |
| Evals | `evals/` | Python: rule checks plus a model judge on real Claude output. |

## Roadmap

- [x] Playable game loop with Claude reactions
- [x] Evals in Python (`evals/`): does the cake stay short (≤15 words), in character, family-friendly, and emoji-free? Run against the same system prompt as `api/react.ts`
- [ ] MCP server so agents can feed the cake
- [ ] Agent-friendly JSON API + docs for machines
