import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cannedReaction } from './cannedReaction.ts'
import { findFood } from './findFood.ts'

const food = (id: string) => {
  const f = findFood(id)
  if (!f) throw new Error(`unknown food ${id}`)
  return f
}

test('canned reactions pick a fitting line', () => {
  const first = () => 0
  assert.match(cannedReaction([food('shoe')], 1, first), /shoe/i)
  assert.match(cannedReaction([food('donut')], -8, first), /regret/)
})
