import { test,describe } from 'node:test'
import assert from 'node:assert/strict'
import { authorWithMostLikes } from '../utils/list_helper.js'

describe('author with most likes', () => {
  const Blogs=[
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },{
      _id: '5a422aa71b54a676234d17f86',
      title: 'second blog',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 4,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f86',
      title: 'third blog',
      author: 'W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 4,
      __v: 0
    },
  ]

  test('when the list has multiple blogs returns the author with most likes', () => {
    const result = authorWithMostLikes(Blogs)
    assert.deepStrictEqual(result, { name: 'Edsger W. Dijkstra', maxL: 9 })
  })
})