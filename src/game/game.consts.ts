import type { CakeState, Food } from './game.types.ts'

export const MAX_BUFF = 100

export const LEVELS = [
  { min: 0, name: 'Soft Sponge' },
  { min: 20, name: 'Toned Torte' },
  { min: 45, name: 'Swole Sponge' },
  { min: 70, name: 'Mighty Muffin' },
  { min: 100, name: 'Beef Cake' },
] as const

export const INITIAL_CAKE: CakeState = { buff: 0, meals: 0 }

export const MAX_BITES = 3

// Gains are per bite. Negative foods make the cake softer.
export const FOODS = [
  { id: 'egg', emoji: '🥚', gains: 12 },
  { id: 'chicken', emoji: '🍗', gains: 15 },
  { id: 'broccoli', emoji: '🥦', gains: 8 },
  { id: 'peanut', emoji: '🥜', gains: 10 },
  { id: 'banana', emoji: '🍌', gains: 6 },
  { id: 'sprinkles', emoji: '🌈', gains: -5 },
  { id: 'donut', emoji: '🍩', gains: -8 },
  { id: 'shoe', emoji: '👟', gains: 1 },
] as const satisfies readonly Food[]

// Three different foods with at least this many gains count as proteins and earn the bonus.
export const COMBO = { proteins: 3, minGains: 10, bonus: 10 } as const

export const SWEATBAND_BUFF = 70
export const BIG_SMILE_BUFF = 45

export const FLEX_MS = 1200
export const REACTION_TIMEOUT_MS = 8000
