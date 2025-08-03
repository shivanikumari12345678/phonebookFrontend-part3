import React from 'react'

const Greeting=(props)=> {
    const {name,age}=props.person;
    const findBorn=()=>{
        const yearNow=new Date().getFullYear();
        return yearNow-age;
    }
  return (
    <div>
      <p>Hello {name} you are {age} years old</p>
      <p>So you are probably born in {findBorn()}</p>
    </div>
  )
}

export default Greeting
