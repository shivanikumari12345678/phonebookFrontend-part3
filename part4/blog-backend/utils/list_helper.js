export const dummy = (blogs) => {
  return 1
}

export const totalLikes=(blogs) => {
  const totallikes=blogs.reduce((acc,val) => acc+val.likes,0)
  return totallikes
}

export const favouriteBlog=(blogs) => {
  if(blogs.length === 0) {
    return 0
  }
  let max=0
  for(let blog of blogs){
    if(blog.likes > max){
      max=blog.likes
    }
  }
  return max
}


export const authorWithMostBlogs = (blogs) => {
  const authors = []

  // Collect unique authors
  for (const blog of blogs) {

    if (!authors.includes(blog.author)) {
      authors.push(blog.author)
    }
  }

  const ob = { name: '', maxb: 0 }

  // Count blogs for each author
  for (const author of authors) {
    let count = 0
    for (const blog of blogs) {
      if (author === blog.author) {
        count++
      }
    }

    if (count > ob.maxb) {
      ob.name = author
      ob.maxb = count
    }
  }

  return ob
}

export const authorWithMostLikes = (blogs) => {
  const authors = []

  // Collect unique authors
  for (const blog of blogs) {

    if (!authors.includes(blog.author)) {
      authors.push(blog.author)
    }
  }

  const ob = { name: '', maxL: 0 }

  // Count blogs for each author
  for (const author of authors) {
    let count = 0
    for (const blog of blogs) {
      if (author === blog.author) {
        count=count+blog.likes
      }
    }

    if (count > ob.maxL) {
      ob.name = author
      ob.maxL = count
    }
  }

  return ob
}








