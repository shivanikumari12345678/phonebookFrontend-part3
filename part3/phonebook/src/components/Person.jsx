import React from 'react'
import { useState } from 'react';


const Person=({persons,filter,deleteDetails,editDetails})=> {
  const [editData,setEditData]=useState(false)
  const [editedName,setEditedName]=useState('')
  const [editedNumber,setEditedNumber]=useState('')
  const [editId,setEditId]=useState(null)
  const filteredPersons = filter.trim()
    ? persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  const handleDelete=id=>{
    if(window.confirm( `Delete ${persons.find(p=>p.id===id).name})?`)){
      deleteDetails(id)
    }
  }

  const handleEdit=(id)=>{
    setEditData(true)
    setEditId(id)
  }
  const handleEditedNameChange=(e)=>setEditedName(e.target.value)
  const handleEditedNumberChange=(e)=>setEditedNumber(e.target.value)

  const triggerEditForm=(e,editId,editedName,editedNumber)=>{
    e.preventDefault()
    setEditData(false)
    editDetails(editId,editedName,editedNumber)
  }
  

      
  return (
    <div>
      <ul>
        {  
          filteredPersons.map(person=>{
            return (
            <li key={person.id} className='note'>
              {person.name} {person.number} 
              <button onClick={()=>handleDelete(person.id)}>delete</button>
              <button onClick={()=>handleEdit(person.id)}>Edit</button>
              
                    
            </li>
            
            )
          })
        }
      </ul>
      {
              (editData) && (
                <form onSubmit={(e)=>triggerEditForm(e,editId,editedName,editedNumber)}>
                  name<input value={editedName} onChange={handleEditedNameChange}/>
                  number<input value={editedNumber} onChange={handleEditedNumberChange}/>
                  <button type="submit" >edit</button>
                </form>
                
              )
              
      }
    </div>
  )
}

export default Person
