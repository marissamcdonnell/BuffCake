import { COMBO, MAX_BUFF } from '../game.consts.ts'
import type { CakeState, FeedResult, Food } from '../game.types.ts'
import { levelFor } from './levelFor.ts'

const clampBuff = (value: number) => Math.min(MAX_BUFF, Math.max(0, value))

// Pure: the same cake and meal always give the same result.
export const feed = (cake: CakeState, meal: readonly Food[]): FeedResult => {
  if (meal.length === 0) return { cake, gained: 0, leveledUp: false }

  const rawGain = meal.reduce((sum, food) => sum + food.gains, 0)
  const proteins = new Set(meal.filter((f) => f.gains >= COMBO.minGains).map((f) => f.id))
  const gain = proteins.size >= COMBO.proteins ? rawGain + COMBO.bonus : rawGain

  const buff = clampBuff(cake.buff + gain)
  return {
    cake: { buff, meals: cake.meals + 1 },
    gained: buff - cake.buff,
    leveledUp: levelFor(buff) !== levelFor(cake.buff) && buff > cake.buff,
  }
}
