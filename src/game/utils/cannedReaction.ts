import { REACTION_LINES } from '../game.strings.ts'
import type { Food } from '../game.types.ts'

const randomIndex = (n: number) => Math.floor(Math.random() * n)

// `pick` is injectable so tests can choose a line.
export const cannedReaction = (
  meal: readonly Food[],
  gained: number,
  pick: (n: number) => number = randomIndex,
): string => {
  const lines = meal.some((f) => f.id === 'shoe')
    ? REACTION_LINES.shoe
    : gained >= 0
      ? REACTION_LINES.gain
      : REACTION_LINES.loss
  return lines[pick(lines.length)]
}
