import React from 'react'
import Name from "./Name"
import Number from './Number'
import Button from './Button'
const Personform=({onSubmit,handleNameChange,handleNumberChange,newName,number})=> {
  return (
    <div>
      <form onSubmit={onSubmit}>
        
        <Name value={newName} name="name" onChange={handleNameChange}/>
        <Number value={number} name="number" onChange={handleNumberChange}/>
        <Button text="add"/>
        
      </form>
    </div>
  )
}

export default Personform
