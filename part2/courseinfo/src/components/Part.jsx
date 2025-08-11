import React from 'react'
const Part=({name,exercises})=> {
    console.log("in Part ")
    console.log(name,exercises)
  return (
    <>
        <div>{name} {exercises}</div>
    </>
    
  )
}

export default Part
