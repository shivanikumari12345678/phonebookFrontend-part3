import { useState, useEffect } from 'react'

import axios from 'axios'
import Filter from './components/Filter'
import Personform from './components/Personform'
import Person from './components/Person'
import personServices from './services/person'
import MessageNotification from './components/MessageNotification'
const App = () => {
  
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [number,setNumber]=useState('')
  const [filter,setFilter]=useState('')
  const [notifications,setNotifications]=useState(null)

  useEffect(()=>{
    axios.get('/api/persons').then(response=>{
      setPersons(response.data)
    })
  },[])

  

  const handleNameChange=(e)=>{
    setNewName(e.target.value);
  }

  const handleNumberChange=(e)=>{
    setNumber(e.target.value);
  }

  const handleFilterChange=(e)=>{
    setFilter(e.target.value)
  }

  const checkExistence=()=>{
    const exists=persons.some(person=>person.name==newName)
    return exists
  }

const addDetails = (e) => {
  e.preventDefault();

  const exist = checkExistence();

  if (exist) {
    if (window.confirm(`${newName} already exists in the phonebook, replace old number with new number?`)) {
      const personToUpdate = persons.find(person => person.name === newName);
      const updatedPerson = { ...personToUpdate, number };

      personServices
        .replaceDetails(updatedPerson)
        .then(response => {
          setPersons(persons.map(person =>
            person.id !== personToUpdate.id ? person : response
          ));
          setNotifications(`Updated ${newName}'s number`);
          setTimeout(()=>{
            setNotifications(null)
          },2000)
        })
        .catch(error => {
          setNotifications(`Information of ${newName} has already been removed from the server`);
          setTimeout(()=>{
            setNotifications(null)
          },3000)
          
        });
    }
  } else {
    const newPerson = { name: newName, number:number };

    personServices
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response));
        setNotifications(`added ${response.name}`)
        setTimeout(()=>{
          setNotifications(null)
        },3000)
      })
      .catch(error => {
        setNotifications(`failed to add ${newName}`)
        setTimeout(()=>{
          setNotifications(null)
        },3000)
      });
  }

  setNewName('');
  setNumber('');
};


    const deleteDetails=(id)=>{
      const personToDelete=persons.find(person=>person.id===id);
      personServices
      .deleteDetail(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
        setNotifications(`Information of ${personToDelete.name} has deleted successfully`);
        setTimeout(() => {
          setNotifications(null);
        }, 3000);
      })
      .catch(error=>{
        setNotifications(`person with id ${personToDelete.name} has alredy been deleted`)
        setTimeout(() => {
          setNotifications(null);
        }, 3000);
        
      })
    }

    const editDetails=(id,editedName,editedNumber)=>{
      
      const personToEdit={
        id,
        name:editedName,
        number:editedNumber
      };
      personServices
       .replaceDetails(personToEdit)
       .then(editedPerson=>{
        setPersons(persons.map(p=>{
          return (p.id === editedPerson.id) ? editedPerson : p}))
        setNotifications(`person with id ${editedPerson.id} has been updated to newName ${editedPerson.name} and new number ${editedPerson.number}`)
        setTimeout(()=>{
          setNotifications(null)
        },2000)
       }
       
      )

    }
    
    
  

  return (
    <div>
      <h2>Phonebook</h2>
      <MessageNotification message={notifications}/>
      <Filter value={filter} onChange={handleFilterChange}/>

      <h3>Add a new note</h3>
      <Personform 
        onSubmit={addDetails}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        number={number} 
      />

     <h3>Numbers</h3>
      <Person persons={persons} filter={filter} deleteDetails={deleteDetails} addDetails={addDetails} editDetails={editDetails}/>
    </div>
  )
}

export default App