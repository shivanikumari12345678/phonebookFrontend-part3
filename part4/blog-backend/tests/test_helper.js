import Blog from '../model/blog.js'
export const initialBlogs=[
    {
        title: 'hoping for well',
        author: 'shiva',
        url: 'http://www.hoping.com',
        likes: 5

    },
    {
        title: 'good to go',
        author: 'ram',
        url: 'http://www.good.com',
        likes: 10
    }
]


export const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

export const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
