import mongoose from 'mongoose'
const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type:String,
    required:true
  },
  url:{
    type:String,
    validate: {
      validator: function(v) {
        return /^(https?:\/\/)([\w\-]+\.)+[\w\-]{2,}(\/\S*)?$/.test(v)
      },
      message: props => `${props.value} is not a valid URL!`

    },
    required:true
  },
  likes: {
    type:Number,
    required:false
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
  
})

blogSchema.set('toJSON',{
  transform:(document,returnedObject) => {
    returnedObject.id=returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog=mongoose.model('Blog',blogSchema)
export default Blog