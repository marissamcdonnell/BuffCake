import type { FOODS, LEVELS } from './game.consts.ts'

export type Food = {
  id: string
  emoji: string
  gains: number
}

export type FoodId = (typeof FOODS)[number]['id']

export type LevelName = (typeof LEVELS)[number]['name']

export type CakeState = {
  buff: number
  meals: number
}

export type FeedResult = {
  cake: CakeState
  gained: number
  leveledUp: boolean
}

export type Reaction = {
  line: string
  source: 'claude' | 'canned'
}
