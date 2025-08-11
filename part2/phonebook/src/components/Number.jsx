import React from 'react'

const Number=({value,name,onChange})=> {
  return (
    <div>
      number <input value={value} name={name} onChange={onChange}/>
    </div>
  )
}

export default Number
