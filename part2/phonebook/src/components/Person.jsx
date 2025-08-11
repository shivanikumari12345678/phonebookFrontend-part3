import React from 'react'


const Person=({persons,filter,deleteDetails})=> {
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
      
  return (
    <div>
      <ul>
        {  
          filteredPersons.map(person=>{
            return (
            <li key={person.id} className='note'>
              {person.name} {person.number} 
              <button onClick={()=>handleDelete(person.id)}>delete</button>
                    
            </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Person
