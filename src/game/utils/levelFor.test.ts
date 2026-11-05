import { test } from 'node:test'
import assert from 'node:assert/strict'
import { levelFor } from './levelFor.ts'

test('levels unlock at their thresholds', () => {
  assert.equal(levelFor(0), 'Soft Sponge')
  assert.equal(levelFor(44), 'Toned Torte')
  assert.equal(levelFor(45), 'Swole Sponge')
  assert.equal(levelFor(100), 'Beef Cake')
})
