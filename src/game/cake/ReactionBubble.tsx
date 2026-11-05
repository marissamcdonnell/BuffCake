import { GAME_LABELS } from '../game.strings.ts'

type ReactionBubbleProps = {
  eating: boolean
  line?: string
}

export const ReactionBubble = ({ eating, line }: ReactionBubbleProps) => (
  <p className="mt-3 min-h-12 rounded-2xl bg-white p-3 text-center italic shadow-sm">
    {eating ? GAME_LABELS.eating : (line ?? GAME_LABELS.idle)}
  </p>
)
