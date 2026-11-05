import { BuffMeter } from './cake/BuffMeter.tsx'
import { Cake } from './cake/Cake.tsx'
import { ReactionBubble } from './cake/ReactionBubble.tsx'
import { GameStats } from './GameStats.tsx'
import { useCakeGame } from './hooks/useCakeGame.ts'
import { FeedControls } from './kitchen/FeedControls.tsx'
import { FoodPicker } from './kitchen/FoodPicker.tsx'

export const CakeGame = () => {
  const { cake, meal, reaction, eating, flexing, level, toggleFood, feedCake, reset } =
    useCakeGame()

  return (
    <>
      <Cake buff={cake.buff} flexing={flexing} />
      <section className="w-full" aria-live="polite">
        <BuffMeter level={level} buff={cake.buff} />
        <ReactionBubble eating={eating} line={reaction?.line} />
      </section>
      <FoodPicker meal={meal} onToggle={toggleFood} disabled={eating} />
      <FeedControls canFeed={meal.length > 0 && !eating} onFeed={feedCake} onReset={reset} />
      <GameStats meals={cake.meals} source={reaction?.source} />
    </>
  )
}
