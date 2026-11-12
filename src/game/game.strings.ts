import type { FoodId } from './game.types.ts'

export const FOOD_NAMES: Record<FoodId, string> = {
  egg: 'egg',
  chicken: 'chicken',
  broccoli: 'broccoli',
  peanut: 'peanuts',
  banana: 'banana',
  sprinkles: 'sprinkles',
  donut: 'donut',
  shoe: 'shoe',
}

export const GAME_LABELS = {
  cakeImage: (buff: number) => `A cake with ${Math.round(buff)} percent buff`,
  eating: 'nom nom nom…',
  idle: 'I am but a humble sponge. Feed me.',
  pickFoods: (picked: number, max: number) => `Pick up to ${max} foods (${picked}/${max})`,
  feed: 'Feed the cake',
  reset: 'Reset',
  meals: (count: number) => `${count} meals`,
  claudeSource: 'reactions by Claude',
  cannedSource: 'offline reactions',
} as const

// Canned fallback lines for when the Claude API is missing or slow.
export const REACTION_LINES = {
  gain: [
    'I can feel my frosting firming up.',
    'Do you even lift, cupcake? Because I do now.',
    'My layers have layers.',
    'Spotter! Spot my sprinkles!',
  ],
  loss: [
    'That was delicious and I regret nothing. Also I am softer.',
    'Cheat day. Again.',
    'My gains are melting like buttercream in July.',
  ],
  shoe: ['Tastes like shoe. Honestly? Respect.', 'Chewy. Leathery. Elite.'],
} as const
