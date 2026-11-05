import { GAME_LABELS } from './game.strings.ts'
import type { Reaction } from './game.types.ts'

type GameStatsProps = {
  meals: number
  source?: Reaction['source']
}

export const GameStats = ({ meals, source }: GameStatsProps) => (
  <footer className="text-xs text-cocoa/50">
    {GAME_LABELS.meals(meals)} ·{' '}
    {source === 'claude' ? GAME_LABELS.claudeSource : GAME_LABELS.cannedSource}
  </footer>
)
