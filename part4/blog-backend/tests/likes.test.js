import { test,describe } from 'node:test'
import assert from 'node:assert/strict'
import { totalLikes } from '../utils/list_helper.js'
describe('total likes',() => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when the list has only one blog equals the like of that',() => {
    const result=totalLikes(listWithOneBlog)
    assert.strictEqual(result,5)
  })
})