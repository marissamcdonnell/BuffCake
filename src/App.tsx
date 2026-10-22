import { useState } from 'react'
import { getReaction, type Reaction } from './api.ts'
import { Cake } from './components/Cake.tsx'
import { FoodPicker } from './components/FoodPicker.tsx'
import { feed, INITIAL_CAKE, levelFor, MAX_BUFF } from './game/cake.ts'
import type { Food } from './game/foods.ts'

export default function App() {
  const [cake, setCake] = useState(INITIAL_CAKE)
  const [meal, setMeal] = useState<Food[]>([])
  const [reaction, setReaction] = useState<Reaction | null>(null)
  const [eating, setEating] = useState(false)
  const [flexing, setFlexing] = useState(false)

  const level = levelFor(cake.buff)

  function toggle(food: Food) {
    setMeal((current) =>
      current.some((f) => f.id === food.id)
        ? current.filter((f) => f.id !== food.id)
        : [...current, food],
    )
  }

  async function feedCake() {
    const result = feed(cake, meal)
    setCake(result.cake)
    setEating(true)
    if (result.leveledUp) {
      setFlexing(true)
      setTimeout(() => setFlexing(false), 1200)
    }
    setReaction(await getReaction(meal, result.gained, levelFor(result.cake.buff)))
    setMeal([])
    setEating(false)
  }

  function reset() {
    setCake(INITIAL_CAKE)
    setMeal([])
    setReaction(null)
  }

  return (
    <main className="mx-auto flex min-h-svh max-w-md flex-col items-center gap-5 bg-[#fff8fb] px-4 py-8 text-cocoa">
      <header className="text-center">
        <h1 className="font-display text-4xl font-bold text-berry">BuffCake</h1>
        <p className="text-sm text-cocoa/70">Feed the cake. Watch it get buff.</p>
      </header>

      <Cake buff={cake.buff} flexing={flexing} />

      <section className="w-full" aria-live="polite">
        <div className="flex justify-between font-display text-lg">
          <span>{level}</span>
          <span>
            {cake.buff}/{MAX_BUFF}
          </span>
        </div>
        <div className="mt-1 h-3 overflow-hidden rounded-full bg-frosting">
          <div
            className="h-full rounded-full bg-berry transition-[width] duration-500"
            style={{ width: `${(cake.buff / MAX_BUFF) * 100}%` }}
          />
        </div>
        <p className="mt-3 min-h-12 rounded-2xl bg-white p-3 text-center italic shadow-sm">
          {eating ? 'nom nom nom…' : (reaction?.line ?? 'I am but a humble sponge. Feed me.')}
        </p>
      </section>

      <FoodPicker meal={meal} onToggle={toggle} disabled={eating} />

      <div className="flex w-full gap-2">
        <button
          type="button"
          onClick={feedCake}
          disabled={meal.length === 0 || eating}
          className="flex-1 rounded-full bg-berry py-3 font-display text-lg font-bold text-white disabled:opacity-40"
        >
          Feed the cake
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-full border-2 border-frosting px-4 font-display"
        >
          Reset
        </button>
      </div>

      <footer className="text-xs text-cocoa/50">
        {cake.meals} meals ·{' '}
        {reaction?.source === 'claude' ? 'reactions by Claude' : 'offline reactions'}
      </footer>
    </main>
  )
}
