import { REACTION_TIMEOUT_MS } from '../game.consts.ts'
import type { Food, LevelName, Reaction } from '../game.types.ts'
import { cannedReaction } from '../utils/cannedReaction.ts'

// Falls back to a canned line if the API is missing, slow, or returns something unexpected.
export const getReaction = async (
  meal: readonly Food[],
  gained: number,
  level: LevelName,
): Promise<Reaction> => {
  try {
    const res = await fetch('/api/react', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ foods: meal.map((f) => f.id), gained, level }),
      signal: AbortSignal.timeout(REACTION_TIMEOUT_MS),
    })
    if (!res.ok) throw new Error(`status ${res.status}`)
    const data: unknown = await res.json()
    if (data && typeof data === 'object' && 'line' in data && typeof data.line === 'string') {
      return { line: data.line, source: 'claude' }
    }
    throw new Error('bad response')
  } catch {
    return { line: cannedReaction(meal, gained), source: 'canned' }
  }
}
