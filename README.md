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

## How it's built

| Piece | Where | What it does |
| --- | --- | --- |
| Game rules | `src/game/` | Pure functions: `feed(cake, meal)` → new cake. No React, fully tested. |
| UI | `src/components/`, `src/App.tsx` | React 19 + Tailwind v4. SVG cake whose biceps grow with buff. |
| Reactions API | `api/react.ts` | Vercel function. Validates input, calls Claude, keeps the key server-side. |
| Fallback | `src/game/reactions.ts` | Canned lines when the API is missing or slow, so the game never breaks. |

## Roadmap

- [x] Playable game loop with Claude reactions
- [ ] MCP server so agents can feed the cake
- [ ] Agent-friendly JSON API + docs for machines
- [ ] Evals: does the cake stay funny, short, and in character?
