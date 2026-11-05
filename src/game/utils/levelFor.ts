import { LEVELS } from '../game.consts.ts'
import type { LevelName } from '../game.types.ts'

export const levelFor = (buff: number): LevelName => {
  let name: LevelName = LEVELS[0].name
  for (const level of LEVELS) {
    if (buff >= level.min) name = level.name
  }
  return name
}
