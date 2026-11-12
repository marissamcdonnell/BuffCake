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
pnpm evals --no-judge     # rule checks only
pnpm test:evals           # unit tests for the rule checks, no API calls
```

Rule checks: ≤15 words, first person, no emoji, no hashtags, not wrapped in quotes. The judge (`claude-sonnet-5-5`) scores in-character, family-friendly and funny (≥3/5). Cases live in `evals/cases.json`. Exits 1 below a 90% pass rate.

## How it's built

| Piece | Where | What it does |
| --- | --- | --- |
| Game rules | `src/game/utils/` | Pure functions like `feed(cake, meal)` → new cake. No React, each tested in the file beside it. |
| Game state | `src/game/hooks/useCakeGame.ts` | Holds the cake, the meal and the reaction, and the feed / reset actions. |
| The cake | `src/game/cake/` | SVG cake whose biceps grow with buff, the buff meter, and the speech bubble. |
| Controls | `src/game/kitchen/` | Food picker and the feed / reset buttons. |
| Text and numbers | `src/game/game.strings.ts`, `game.consts.ts` | Every word on screen, and every tunable number (foods, levels, combo bonus). |
| Reactions API | `api/react.ts` | Vercel function. Validates input, calls Claude, keeps the key server-side. |
| Fallback | `src/game/utils/cannedReaction.ts` | Canned lines when the API is missing or slow, so the game never breaks. |
| Prompt | `shared/cake-prompt.json` | Model, system prompt and message template, shared by the API and the evals. |
| Evals | `evals/` | Python: rule checks plus a model judge on real Claude output. |

Code standards live in `CLAUDE.md`.

## Adding a food

1. Add it to `FOODS` in `src/game/game.consts.ts`: an `id`, an emoji, and its `gains` per bite.
2. Add its name to `FOOD_NAMES` in `src/game/game.strings.ts`. TypeScript flags it if you forget.
3. Add an eval case that uses it in `evals/cases.json`.

The picker, the rules and the API read from `FOODS`, so nothing else changes.

## Roadmap

- [x] Playable game loop with Claude reactions
- [x] Evals in Python (`evals/`): does the cake stay short (≤15 words), in character, family-friendly, and emoji-free? Run against the same system prompt as `api/react.ts`
- [ ] MCP server so agents can feed the cake
- [ ] Agent-friendly JSON API + docs for machines
