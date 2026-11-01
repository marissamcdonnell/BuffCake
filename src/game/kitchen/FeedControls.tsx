import { Button } from '../../library/components/Button.tsx'
import { GAME_LABELS } from '../game.strings.ts'

type FeedControlsProps = {
  canFeed: boolean
  onFeed: () => void
  onReset: () => void
}

export const FeedControls = ({ canFeed, onFeed, onReset }: FeedControlsProps) => (
  <div className="flex w-full gap-2">
    <Button className="flex-1" onClick={onFeed} disabled={!canFeed}>
      {GAME_LABELS.feed}
    </Button>
    <Button variant="outline" onClick={onReset}>
      {GAME_LABELS.reset}
    </Button>
  </div>
)
