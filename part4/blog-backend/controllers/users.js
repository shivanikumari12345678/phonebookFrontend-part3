import bcrypt from 'bcrypt'
import User from '../model/user.js'
import express from 'express'
const usersRouter=express.Router();

usersRouter.post('/', async(request,response)=>{
   const {username,password,name}=request.body
   if(!password || password.length<3){
    return response.status(400).json({error:'Password must be at least 3 characters long'})
   }  
   const saltRound=10;
   const passwordHash=await bcrypt.hash(password,saltRound)
   const user=new User({
    username,
    passwordHash,
    name
   })

   const savedUser=await user.save()
   response.status(201).json(savedUser)
})

usersRouter.get('/', async (request,response)=>{
   const users=await User.find({}).populate('blogs',{title:1,author:1,url:1})
   response.status(200).json(users)
})

export default usersRouter