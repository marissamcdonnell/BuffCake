import { MAX_BUFF } from '../game.consts.ts'
import type { LevelName } from '../game.types.ts'

type BuffMeterProps = {
  level: LevelName
  buff: number
}

export const BuffMeter = ({ level, buff }: BuffMeterProps) => (
  <>
    <div className="flex justify-between font-display text-lg">
      <span>{level}</span>
      <span>
        {buff}/{MAX_BUFF}
      </span>
    </div>
    <div className="mt-1 h-3 overflow-hidden rounded-full bg-frosting">
      <div
        className="h-full rounded-full bg-berry transition-[width] duration-500"
        style={{ width: `${(buff / MAX_BUFF) * 100}%` }}
      />
    </div>
  </>
)
