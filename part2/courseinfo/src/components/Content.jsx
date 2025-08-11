import React from 'react'
import Part from './Part'
import Total from './Total';
const Content=({parts})=> {
    
    let total=parts.reduce((acc,curr)=>{
        return acc+curr.exercises
    },0);

    console.log(total)
    
    
  return (
    <>
        {
            parts.map(part=>{
                return <Part key={part.id} name={part.name} exercises={part.exercises}/>
            })

        }
        <Total total={total}/>
        
    </>
  )
}

export default Content
