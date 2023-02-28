import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from  './Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [searchString, setSearchString] = useState('')
  const [notification, setNotification] = useState({type: null, message: null})

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])  

  const removePerson = id => {
    const personRemoved = persons.find(n => n.id === id)
    if(window.confirm(`Delete ${personRemoved.name}?`)){
      console.log(`removing ${personRemoved.name}`);
      personService
      .remove(personRemoved.id)
      .then(() => {
        setPersons(persons.filter(person => person !== personRemoved))
      })
    }
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchString.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={notification.type} message={notification.message}/>
      <Filter 
        searchString={searchString}
        setShowAll={setShowAll}
        setSearchString={setSearchString}
      />
        
      <h3>add a new</h3>

      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
      />
      <h3>Numbers</h3>

      <Persons persons={personsToShow} removePerson={removePerson}/>
    </div>
  )
}

const Filter = ({searchString, setShowAll, setSearchString}) => {
  
  const handleSearchStringChange = (event) => {
    if(event.target.value === ''){
      setShowAll(true)
    } else {
      setShowAll(false)
    }
    setSearchString(event.target.value)
  }

  return(
    <div>
      filter shown with
      <input value={searchString} onChange={handleSearchStringChange}/>
    </div>
  )
}

const PersonForm = ({persons, setPersons, setNotification}) => {

  const [newName, setNewName] = useState('')
  const handleNameChange = (event) => setNewName(event.target.value)

  const [newNumber, setNewNumber] = useState('')
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    const personExists = persons.find((person) => person.name === personObject.name)
    if (personExists){
      if(window.confirm(`${personExists.name} is already added to phonebook, replace the old number with a new one?`)){
        const changedPerson = {...personExists, number: personObject.number}
        personService
          .update(changedPerson.id, changedPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
            setNotification({
              type: `success`, 
              message: `Changed ${changedPerson.name}'s number`})
            setTimeout(() => {
              setNotification({type: null, message: null})
            }, 5000)
          })
          .catch(error => {
            setNotification({
              type: `failure`, 
              message: `Information of ${changedPerson.name} has already been removed from server`})
            setTimeout(() => {
              setNotification({type: null, message: null})
            }, 5000)
          })
      }
    } else {
      personService
        .add(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
          setNotification({
            type: `success`, 
            message: `Added ${newPerson.name}`})
          setTimeout(() => {
            setNotification({type: null, message: null})
          }, 5000)
        })
    }
  }

  return(
    <form onSubmit={addPerson}>
      <div>name: <input value={newName} onChange={handleNameChange}/></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Persons = ({persons, removePerson}) => {
  return(
    <div>
      {persons.map(person => 
        <Person key={person.id} person={person} removePerson={() => removePerson(person.id)}/>
      )}
  </div>
  )
}

const Person = ({person, removePerson}) => {
  return(
    <div>
      <p>
          {person.name}  {person.number}  <button onClick={removePerson}>delete</button>
      </p>
    </div>
  )
}

export default App