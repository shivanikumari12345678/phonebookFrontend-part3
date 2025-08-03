import React from 'react'
import Part from './contentParts/Part'
const Content=(props)=> {
  console.log(props.course.parts[0].name)

  return (
    <>
      <div>
          <Part part={props.course.parts}/>
      </div>
    </>
  )
}

export default Content
