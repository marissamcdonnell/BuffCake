import { FOODS, MAX_BITES, type Food } from '../game/foods.ts'

type Props = {
  meal: readonly Food[]
  onToggle: (food: Food) => void
  disabled: boolean
}

export function FoodPicker({ meal, onToggle, disabled }: Props) {
  const full = meal.length >= MAX_BITES

  return (
    <fieldset className="grid grid-cols-4 gap-2" disabled={disabled}>
      <legend className="mb-2 text-sm text-cocoa/70">
        Pick up to {MAX_BITES} foods ({meal.length}/{MAX_BITES})
      </legend>
      {FOODS.map((food) => {
        const picked = meal.some((f) => f.id === food.id)
        return (
          <button
            key={food.id}
            type="button"
            aria-pressed={picked}
            disabled={!picked && full}
            onClick={() => onToggle(food)}
            className={`flex flex-col items-center rounded-2xl border-2 p-2 transition
              ${picked ? 'border-berry bg-frosting' : 'border-transparent bg-white hover:border-frosting'}
              disabled:opacity-40`}
          >
            <span className="text-3xl" aria-hidden="true">
              {food.emoji}
            </span>
            <span className="text-xs capitalize">{food.name}</span>
          </button>
        )
      })}
    </fieldset>
  )
}
