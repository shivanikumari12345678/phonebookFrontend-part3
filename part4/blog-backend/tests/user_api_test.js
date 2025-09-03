import express from 'express'
import {test,after , describe , beforeEach} from 'node:test'
import assert from 'assert/strict'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import User from '../model/user.js'
import { initialUsers, usersInDb } from './user_helper.js'
const api=supertest(app)

describe('user post test',()=>{
    beforeEach( async()=>{
        await User.deleteMany({})
        await User.insertMany(initialUsers)
    })
   
    test('a valid users can be created', async ()=>{
        
        const user1={
            username:"testedUser",
            password:"4567",
            name:"random"
        }

        await api
         .post('/api/users')
         .send(user1)
         .expect(201)
         .expect('Content-Type',/application\/json/)

         const response=await api.get('/api/users')
         const usernames=response.body.map(u=>u.username)
        assert(usernames.includes(user1.username))
        assert.equal(response.body.length,initialUsers.length+1)
        
    })

    test('users missing required field cannot be created', async ()=>{
        const invalidUser={
            username:"sweety",
            password:"3424"
        }

        const initialUsers=await usersInDb()

        const response=await api
         .post('/api/users')
         .send(invalidUser)
         .expect(400)
         .expect({ error: 'User validation failed: name: Path `name` is required.' })

        const afterUsers=await usersInDb();
        assert.strictEqual(initialUsers.length,afterUsers.length)

        const usernamesInDb=afterUsers.map(user=>user.username)
        assert(!usernamesInDb.includes(invalidUser.username))
    })

    test('users with less username letters then required cannot be created ', async ()=>{

        const invalidUser={
            username:"s",
            password:"sjkh",
            name:"sfl sljj"
        }

        await api
         .post('/api/users')
         .send(invalidUser)
         .expect(400)
         

    })

    test('user with invalid passoword cannot be created', async ()=>{
        const invalidUser={
            username:"sgghhh",
            password:"s",
            name:"sfl sljj"
        }

        await api
         .post('/api/users')
         .send(invalidUser)
         .expect(400)
         .expect({error:'Password must be at least 3 characters long'})
    })


})

after(async ()=>{
   await mongoose.connection.close()
})