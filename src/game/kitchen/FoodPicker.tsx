import { FOODS, MAX_BITES } from '../game.consts.ts'
import { GAME_LABELS } from '../game.strings.ts'
import type { Food } from '../game.types.ts'
import { FoodButton } from './FoodButton.tsx'

type FoodPickerProps = {
  meal: readonly Food[]
  onToggle: (food: Food) => void
  disabled: boolean
}

export const FoodPicker = ({ meal, onToggle, disabled }: FoodPickerProps) => {
  const full = meal.length >= MAX_BITES

  return (
    <fieldset className="grid grid-cols-4 gap-2" disabled={disabled}>
      <legend className="mb-2 text-sm text-cocoa/70">
        {GAME_LABELS.pickFoods(meal.length, MAX_BITES)}
      </legend>
      {FOODS.map((food) => {
        const picked = meal.some((f) => f.id === food.id)
        return (
          <FoodButton
            key={food.id}
            food={food}
            picked={picked}
            disabled={!picked && full}
            onToggle={onToggle}
          />
        )
      })}
    </fieldset>
  )
}
