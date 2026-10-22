import type { Food } from './foods.ts'

export const MAX_BUFF = 100

export const LEVELS = [
  { min: 0, name: 'Soft Sponge' },
  { min: 20, name: 'Toned Torte' },
  { min: 45, name: 'Swole Sponge' },
  { min: 70, name: 'Mighty Muffin' },
  { min: 100, name: 'Beef Cake' },
] as const

export type LevelName = (typeof LEVELS)[number]['name']

export type CakeState = {
  buff: number
  meals: number
}

export const INITIAL_CAKE: CakeState = { buff: 0, meals: 0 }

export type FeedResult = {
  cake: CakeState
  gained: number
  leveledUp: boolean
}

function clamp(value: number): number {
  return Math.min(MAX_BUFF, Math.max(0, value))
}

export function levelFor(buff: number): LevelName {
  let name: LevelName = LEVELS[0].name
  for (const level of LEVELS) {
    if (buff >= level.min) name = level.name
  }
  return name
}

/** Pure: same cake + same meal always gives the same result. */
export function feed(cake: CakeState, meal: readonly Food[]): FeedResult {
  if (meal.length === 0) return { cake, gained: 0, leveledUp: false }

  const rawGain = meal.reduce((sum, food) => sum + food.gains, 0)
  // Combo bonus: three different protein foods in one meal.
  const proteins = new Set(meal.filter((f) => f.gains >= 10).map((f) => f.id))
  const gain = proteins.size >= 3 ? rawGain + 10 : rawGain

  const buff = clamp(cake.buff + gain)
  return {
    cake: { buff, meals: cake.meals + 1 },
    gained: buff - cake.buff,
    leveledUp: levelFor(buff) !== levelFor(cake.buff) && buff > cake.buff,
  }
}
