import mongoose from 'mongoose'
import config from './utils/config.js'
import express from 'express'
import morgan from 'morgan'
import blogsRouter from './controllers/blogs.js'
import loginRouter from './controllers/login.js'
import usersRouter from './controllers/users.js'
//import requestLogger from './utils/loggers.js'
import {tokenExtractor,errorHandler,unknownPoint} from './utils/middleware.js'

const app = express()
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })

app.use(express.json())

//app.use(requestLogger)
app.use(morgan('tiny'))
app.use(tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login',loginRouter)
app.use(errorHandler)
app.use(unknownPoint)

export default app