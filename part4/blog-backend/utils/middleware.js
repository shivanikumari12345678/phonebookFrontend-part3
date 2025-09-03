import jwt from 'jsonwebtoken'
export const tokenExtractor=(req,res,next) => {
  const authorization=req.get('authorization')
  if(authorization && authorization.startsWith('Bearer ')){
    req.token=authorization.replace('Bearer ', '')
  }else{
    req.token=null
  }
  next()
}
export const userExtractor = (req, res, next) => {
  if (!req.token) {
    return res.status(401).json({ error: 'token missing' })
  }
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!decodedToken.id) {
      return res.status(401).json({ error: 'invalid token' })
    }

    req.user = decodedToken.id   // store only the id
    next()

}

export const errorHandler=(e,req,res,next) => {
  if(e.name === 'CastError'){
    res.status(400).json({ error:e.message })
  }else if(e.name === 'ValidationError'){
    res.status(400).json({ error:e.message })
  }else if(e.name ==='MongoServerError' && e.message.includes('E11000 duplicate key error')){
    return res.status(400).json({'error':'expected `username` to be unique.'})
  }else if(e.name === 'JsonWebTokenError'){
    return res.status(401).json({error:'token invalid'})
  }

}
export const unknownPoint=(req,res,next) => {
  res.status(400).json({ error:'api endpoint doesn\'t exists' })

}

