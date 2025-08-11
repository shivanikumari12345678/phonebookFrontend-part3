import React from 'react'
import Header from './Header.jsx'
import Content from './Content.jsx'
const Course=({course})=> {
  console.log("course",course)
  return (
    <>
        <Header header={course.name}/>
        <Content parts={course.parts}/>
        
    </>
  )
}

export default Course
