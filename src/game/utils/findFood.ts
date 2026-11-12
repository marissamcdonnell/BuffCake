import { FOODS } from '../game.consts.ts'
import type { Food } from '../game.types.ts'

export const findFood = (id: string): Food | undefined => FOODS.find((food) => food.id === id)
