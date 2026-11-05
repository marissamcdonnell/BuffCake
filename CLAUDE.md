# BuffCake: code standards

Feed a cake, watch it get buff. The cake talks back through Claude. Same principles as Goomi Lab.

## Commands

```sh
pnpm install
pnpm dev          # game, offline reactions
pnpm test         # game logic tests (Node's built-in runner)
pnpm test:evals   # Python unit tests for the eval checks
pnpm evals        # real evals against Claude (needs ANTHROPIC_API_KEY)
pnpm build
pnpm lint
```

## Where code goes

- `src/App.tsx`: thin. Puts the game inside the layout.
- `src/game`: everything for the game. Shared files sit at its root: `game.consts.ts`,
  `game.strings.ts`, `game.types.ts`. Its folders:
  - `cake/`: what you see of the cake (the SVG, the buff meter, its speech bubble).
  - `kitchen/`: the controls (food picker, feed and reset buttons).
  - `hooks/`: `useCakeGame` holds the game state and actions.
  - `utils/`: pure game rules, one function per file, each with its test beside it.
  - `api/`: the browser's call to `/api/react`.
- `src/layout`: app shell (`Layout`, `Header`).
- `src/library`: reusable code only, in `components/` and `utils/`. `library` never imports from
  `game` or `layout`.
- `api/react.ts`: the Vercel serverless function. It must stay at the repo root for Vercel.
- `shared/cake-prompt.json`: the prompt, shared by the API and the evals, so they test the same
  thing.
- `evals/`: Python, standard library only.
- Keep the folder structure flat. Don't bury files in deep nesting.

## Code style

- Write all functions as arrow functions, including components. ESLint enforces this.
- Use named imports from React (`useState`, `type ReactNode`), not `React.useState`.
- No index (barrel) files. Import directly from the file.
- Use named exports.
- Use relative imports with the `.ts` / `.tsx` extension. Node's test runner needs both, so there's
  no `@/` alias here.
- Prettier sets the format (`.prettierrc`): no semicolons, single quotes.
- Flag anything that doesn't follow current React and JS best practice.

## Components

- One job per component. If it does two things, split it.
- UI text lives in a strings file (`game/game.strings.ts`, `layout/layout.strings.ts`), not inline
  in JSX. That includes food names and the canned cake lines.
- Use `library/components/Button.tsx` for buttons. Add a variant there before adding a new button
  component.

## State

- Game state lives in `game/hooks/useCakeGame.ts`. Components get what they need as props.
- Game rules in `game/utils/` stay pure: no React, no network. That's what makes them testable.

## Comments

- Only comment what can't be read from the code: why, units, a gotcha, a math trick.
- No comments that restate the code or narrate what a line does.

## Claude API

- The API key stays on the server (`api/react.ts`). Never call Anthropic from the browser.
- Validate everything that reaches the prompt. Only short lowercase food ids get through.
- The game must work with no API: `getReaction` falls back to a canned line.
- Prompt changes go in `shared/cake-prompt.json`. Run `pnpm evals` after changing it.

## Tests

- Keep tests next to the code they cover (`feed.test.ts` beside `feed.ts`).
- Prioritize game rules and the main user flow over testing every component.
- Don't test constants or native browser behavior.

## Before opening a PR

- `pnpm test && pnpm test:evals && pnpm build && pnpm lint` pass.
- If packages couldn't be installed, say so in the PR description and list what wasn't run.
