import { test,describe } from 'node:test'
import { dummy } from '../utils/list_helper.js'
import assert from 'node:assert/strict'
describe('size',() => {
  test('always returns 1',() => {
    const blogs = []

    const result = dummy(blogs)
    assert.strictEqual(result, 1)
  })
})