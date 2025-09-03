import  Router  from 'express'
import Blog from '../model/blog.js'
import User from '../model/user.js'
import jwt from 'jsonwebtoken'

import {userExtractor} from '../utils/middleware.js'
const blogsRouter=Router()

blogsRouter.get('/', async (request, response,next) => {
  const blogs=await Blog.find({}).populate('user',{username:1,name:1})
      response.json(blogs)
})


blogsRouter.get('/:id', async(request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})



blogsRouter.post('/', userExtractor, async(request, response) => {
  const userId = request.user//req.user contains user id
  if(!userId){
    return response.status(401).json({error:'token missing or invalid'})
  }

  const user=await User.findById(userId)
  if(!user){
    return response.status(400).json({error:'user id is missing or not valid'})
  }

  const {title,author,url,likes}=request.body
  const blog=new Blog({
    title,
    author,
    url,
    likes:likes||0,
    user:user._id
  })
  
  const savedBlog=await blog.save()
  user.blogs=user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
    
})

blogsRouter.delete('/:id',userExtractor, async (request, response) => {
  
  const userId=request.user
  if(!userId){
    return response.status(401).json({error:'token missing or invalid'})
  }

  const blog= await Blog.findById(request.params.id)
  if(!blog){
    return response.status(404).json({error : 'blog not found'})
  }
  if(blog.user.toString() !== userId){
    return response.status(403).json({error : 'permission denied'})
  }
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
  
})

blogsRouter.put('/:id', async(request, response) => {
  const id = request.params.id
  const body=request.body
  const updatedNote=await Blog.findByIdAndUpdate(id,body,{new:true,runValidators:true,context:'query'})
  response.status(201).json(updatedNote)
})

export default blogsRouter
