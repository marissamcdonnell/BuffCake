export type Food = {
  id: string
  name: string
  emoji: string
  /** Muscle gained per bite. Negative foods make the cake softer. */
  gains: number
}

export const FOODS: readonly Food[] = [
  { id: 'egg', name: 'egg', emoji: '🥚', gains: 12 },
  { id: 'chicken', name: 'chicken', emoji: '🍗', gains: 15 },
  { id: 'broccoli', name: 'broccoli', emoji: '🥦', gains: 8 },
  { id: 'peanut', name: 'peanuts', emoji: '🥜', gains: 10 },
  { id: 'banana', name: 'banana', emoji: '🍌', gains: 6 },
  { id: 'sprinkles', name: 'sprinkles', emoji: '🌈', gains: -5 },
  { id: 'donut', name: 'donut', emoji: '🍩', gains: -8 },
  { id: 'shoe', name: 'shoe', emoji: '👟', gains: 1 },
] as const

export const MAX_BITES = 3

export function findFood(id: string): Food | undefined {
  return FOODS.find((food) => food.id === id)
}
