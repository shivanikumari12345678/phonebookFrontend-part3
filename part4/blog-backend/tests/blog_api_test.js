import {test,after,beforeEach,describe} from 'node:test';
import jwt from 'jsonwebtoken'
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';
import User from '../model/user.js';
import {initialBlogs, nonExistingId, blogsInDb} from './test_helper.js';
import Blog from '../model/blog.js';
import { title } from 'node:process';
const api=supertest(app);


describe('updating a blog like', () => {
  test('a blog can be updated', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedBlogData = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,  
      likes:99
    }
    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlogData)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(updatedBlog.body.likes, 99)
  
})
})
describe('when there is initially some blogs saved', () => {
  
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })
   test('blog are required as json', async()=>{
     await api
         .get('/api/blogs')
         .expect(200)
         .expect('Content-Type', /application\/json/)
      })
    test('all blogs are returned',async()=>{
      const response = await api.get('/api/blogs');
      assert.strictEqual(response.body.length,initialBlogs.length)
    })
    test('identifying field of returned blog is id', async ()=>{
      const response=await api.get('/api/blogs')
      const blogs=response.body
      blogs.forEach(note => {
        assert(note.id)
      })
    })
    test('a specific blog is within the returned blogs', async()=>{
      const response = await api.get('/api/blogs')
      const contents=response.body.map(r=>r.title)
      assert(contents.includes('good to go'))
    })
    test('a specific blog can be viewed', async () => {
      const blogsAtStart = await blogsInDb()
      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultBlog.body, blogToView)
    })

})

describe('addition of a new blog',()=>{
    let token
    beforeEach(async () => {
        
        await Blog.deleteMany({})
        await Blog.insertMany(initialBlogs)
        const user= await User.findOne({username:'admin'})
        const userForToken={
          username:user.username,
          id:user._id
        }
        token =jwt.sign(userForToken,process.env.SECRET)
      })

    test('blog without title is not added', async () => {
        const newBlog = {
          author:"sagj sdgjj",
          url: 'http://www.noauthor.com',
          likes: 3
        }

        await api
          .post('/api/blogs')
          .set('Authorization', `Bearer ${token}`)
          .send(newBlog)
          .expect(400)

        const blogsAtEnd = await blogsInDb()
        assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
   
    })
    test('blog without likes is defaulted to 0', async () => {
      const newBlog = {
        title: 'blog without likes',
        author:"sagj sdgjj",
        url: 'http://www.nolikes.com'
      }
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      const blogsAtEnd = await blogsInDb()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)  
      const addedBlog = blogsAtEnd.find(b => b.title === 'blog without likes')
      assert.strictEqual(addedBlog.likes, 0)
      })

      test('blog without title or url is responded with 400 Bad Request', async () => {
        const newBlog={
          author:"donald",
          likes:1
        }

        await api
        .post('/api/blogs')
        .set('Authorization',  `Bearer ${token}`)
        .send(newBlog)
        .expect(400)

        const blogsAtEnd = await blogsInDb()
        assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
      })
      test('a valid blog can be added',async()=>{
        const newBlog={
            title: 'new blog',
            author:"shivani",
            url: 'http://www.newblog.com',
            likes: 15
        }

        await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await blogsInDb()
        assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)

        const title = blogsAtEnd.map(n => n.title)
        assert(title.includes('good to go'))
    })
    test('fails with status code 401 if token is not provided', async () => {
        const newBlog = {
          title: 'Blog without token',
          author: 'Test Author',
          url: 'http://example.com/blog',
          likes: 5,
        }

        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(401)
          .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await blogsInDb()
        assert.strictEqual(blogsAtEnd.length,initialBlogs.length)
        
        
      })
  })

  describe('deletion of blog',()=>{
      let token
      beforeEach(async () => {
        console.log('in beforeeach')
        await Blog.deleteMany({})
        await Blog.insertMany(initialBlogs)
        const user= await User.findOne({username:'admin'})
        if(!user) throw new Error('NO user admin found')
        const userForToken={
          username: user.username,
          id:user._id
        }
        token=jwt.sign(userForToken,process.env.SECRET)
      })
      test('a blog can be deleted', async () => {
        const blogsAtStart = await blogsInDb()
        const blogToDelete = blogsAtStart[0]
        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(204)

        const blogsAtEnd = await blogsInDb()
        const title = blogsAtEnd.map(n => n.title)
        assert(!title.includes(blogToDelete.title))

        assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1)
      })
})





after(async ()=>{
    await mongoose.connection.close()
})