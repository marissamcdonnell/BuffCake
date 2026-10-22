import type { Food } from './foods.ts'

const GAIN_LINES = [
  'I can feel my frosting firming up.',
  'Do you even lift, cupcake? Because I do now.',
  'My layers have layers.',
  'Spotter! Spot my sprinkles!',
]

const LOSS_LINES = [
  'That was delicious and I regret nothing. Also I am softer.',
  'Cheat day. Again.',
  'My gains are melting like buttercream in July.',
]

const SHOE_LINES = ['Tastes like shoe. Honestly? Respect.', 'Chewy. Leathery. Elite.']

/** Canned fallback when the Claude API is unavailable. `pick` is injectable for tests. */
export function cannedReaction(
  meal: readonly Food[],
  gained: number,
  pick: (n: number) => number = (n) => Math.floor(Math.random() * n),
): string {
  const lines = meal.some((f) => f.id === 'shoe')
    ? SHOE_LINES
    : gained >= 0
      ? GAIN_LINES
      : LOSS_LINES
  return lines[pick(lines.length)]
}
