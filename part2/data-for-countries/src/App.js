import { useState} from 'react'
import Display from './components/Display'

const App = ({countries}) => {

  const [searchString, setSearchString] = useState('')
  const handleSearchStringChange = (event) => {
    setShowCountry('')
    setSearchString(event.target.value)
  }

  const [showCountry, setShowCountry] = useState('')
  const handleShowCountry = (countryCca2) => {
      setShowCountry(countryCca2)
  }

  const filteredCountries = showCountry === '' 
    ? countries.filter(country => country.name.common.toLowerCase().includes(searchString.toLowerCase()))
    : [countries.find(c => c.cca2 === showCountry)]
  return(
    <div>
      <Filter searchString={searchString} handleSearchStringChange={handleSearchStringChange}/>
      <Display countries={filteredCountries} handleShowCountry={handleShowCountry}/>
    </div>
  )
}

const Filter = ({searchString, handleSearchStringChange}) => {
  return(
    <div>
      find countries
      <input value={searchString} onChange={handleSearchStringChange}/>
    </div>
  )
}

export default App