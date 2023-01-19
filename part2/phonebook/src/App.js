import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])  

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchString.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        searchString={searchString}
        setShowAll={setShowAll}
        setSearchString={setSearchString}
      />
        
      <h3>add a new</h3>

      <PersonForm
        persons={persons}
        setPersons={setPersons}
      />
      <h3>Numbers</h3>

      <Persons persons={personsToShow}/>
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

const PersonForm = ({persons, setPersons}) => {

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

    if (persons.find((person) => person.name === personObject.name)){
      window.alert(`${personObject.name} is already added to phonebook`);
    } else {
      // do the axios post request
      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
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

const Persons = ({persons}) => {
  return(
    <div>
      {persons.map(person => 
        <Person key={person.id} person={person}/>
      )}
  </div>
  )
}

const Person = ({person}) => <p>{person.name} {person.number}</p>

export default App