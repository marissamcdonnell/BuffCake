import type { LevelName } from './game/cake.ts'
import type { Food } from './game/foods.ts'
import { cannedReaction } from './game/reactions.ts'

export type Reaction = { line: string; source: 'claude' | 'canned' }

/** Ask the cake how it feels. Falls back to a canned line if the API is missing or slow. */
export async function getReaction(
  meal: readonly Food[],
  gained: number,
  level: LevelName,
): Promise<Reaction> {
  try {
    const res = await fetch('/api/react', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ foods: meal.map((f) => f.id), gained, level }),
      signal: AbortSignal.timeout(8000),
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
