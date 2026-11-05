import { Button } from '../../library/components/Button.tsx'
import { FOOD_NAMES } from '../game.strings.ts'
import type { Food, FoodId } from '../game.types.ts'

type FoodButtonProps = {
  food: Food
  picked: boolean
  disabled: boolean
  onToggle: (food: Food) => void
}

export const FoodButton = ({ food, picked, disabled, onToggle }: FoodButtonProps) => (
  <Button
    variant="tile"
    aria-pressed={picked}
    disabled={disabled}
    onClick={() => onToggle(food)}
  >
    <span className="text-3xl" aria-hidden="true">
      {food.emoji}
    </span>
    <span className="text-xs capitalize">{FOOD_NAMES[food.id as FoodId]}</span>
  </Button>
)
