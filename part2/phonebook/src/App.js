import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [showAll, setShowAll] = useState(true)
  
  const [searchString, setSearchString] = useState('')

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
      id: persons.length + 1
    }

    if (persons.find((person) => person.name === personObject.name)){
      window.alert(`${personObject.name} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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