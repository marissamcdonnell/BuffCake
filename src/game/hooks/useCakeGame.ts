import { useEffect, useState } from 'react'
import { getReaction } from '../api/getReaction.ts'
import { FLEX_MS, INITIAL_CAKE } from '../game.consts.ts'
import type { Food, Reaction } from '../game.types.ts'
import { feed } from '../utils/feed.ts'
import { levelFor } from '../utils/levelFor.ts'

export const useCakeGame = () => {
  const [cake, setCake] = useState(INITIAL_CAKE)
  const [meal, setMeal] = useState<Food[]>([])
  const [reaction, setReaction] = useState<Reaction | null>(null)
  const [eating, setEating] = useState(false)
  const [flexing, setFlexing] = useState(false)

  useEffect(() => {
    if (!flexing) return
    const timer = setTimeout(() => setFlexing(false), FLEX_MS)
    return () => clearTimeout(timer)
  }, [flexing])

  const toggleFood = (food: Food) => {
    setMeal((current) =>
      current.some((f) => f.id === food.id)
        ? current.filter((f) => f.id !== food.id)
        : [...current, food],
    )
  }

  const feedCake = async () => {
    const result = feed(cake, meal)
    setCake(result.cake)
    setEating(true)
    if (result.leveledUp) setFlexing(true)
    setReaction(await getReaction(meal, result.gained, levelFor(result.cake.buff)))
    setMeal([])
    setEating(false)
  }

  const reset = () => {
    setCake(INITIAL_CAKE)
    setMeal([])
    setReaction(null)
  }

  return {
    cake,
    meal,
    reaction,
    eating,
    flexing,
    level: levelFor(cake.buff),
    toggleFood,
    feedCake,
    reset,
  }
}
