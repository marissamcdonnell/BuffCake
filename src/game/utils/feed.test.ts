import { test } from 'node:test'
import assert from 'node:assert/strict'
import { INITIAL_CAKE, MAX_BUFF } from '../game.consts.ts'
import { feed } from './feed.ts'
import { findFood } from './findFood.ts'

const food = (id: string) => {
  const f = findFood(id)
  if (!f) throw new Error(`unknown food ${id}`)
  return f
}

test('an empty meal changes nothing', () => {
  const result = feed(INITIAL_CAKE, [])
  assert.equal(result.cake, INITIAL_CAKE)
  assert.equal(result.gained, 0)
})

test('protein makes the cake buffer and counts the meal', () => {
  const result = feed(INITIAL_CAKE, [food('egg'), food('broccoli')])
  assert.equal(result.cake.buff, 20)
  assert.equal(result.cake.meals, 1)
  assert.equal(result.leveledUp, true) // 0 → 20 is Soft Sponge → Toned Torte
})

test('three different proteins earn a combo bonus', () => {
  const result = feed(INITIAL_CAKE, [food('egg'), food('chicken'), food('peanut')])
  assert.equal(result.gained, 12 + 15 + 10 + 10)
})

test('buff never drops below 0 or goes over the max', () => {
  assert.equal(feed(INITIAL_CAKE, [food('donut')]).cake.buff, 0)
  const almost = { buff: 95, meals: 9 }
  const result = feed(almost, [food('chicken')])
  assert.equal(result.cake.buff, MAX_BUFF)
  assert.equal(result.gained, 5)
})

test('losing buff is never a level up', () => {
  const result = feed({ buff: 22, meals: 1 }, [food('donut')])
  assert.equal(result.leveledUp, false)
})
