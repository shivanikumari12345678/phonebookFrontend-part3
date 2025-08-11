import React from 'react'

const Name=({value,name,onChange})=> {
  return (
    <div>
     name  <input value={value} name={name} onChange={onChange}/>
    </div>
  )
}

export default Name
