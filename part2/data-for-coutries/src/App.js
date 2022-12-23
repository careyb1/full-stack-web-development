import { useState} from 'react'
import Country from './components/Country'

const App = ({countries}) => {
  const [searchString, setSearchString] = useState('')

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchString.toLowerCase()))
  console.log('filteredCountries',filteredCountries);
  return(
    <div>
      <Filter searchString={searchString} setSearchString={setSearchString}/>
      <Display countries={filteredCountries}/>
    </div>
  )
}

const Filter = ({searchString, setSearchString}) => {
  const handleSearchStringChange = (event) => {
    setSearchString(event.target.value)
  }
  return(
    <div>
      find countries
      <input value={searchString} onChange={handleSearchStringChange}/>
    </div>
  )
}

const Display = ({countries}) => {
  var displayComponent
  if(countries.length === 1) {
    displayComponent = <Country country={countries[0]}/>
  } else if (countries.length < 11) {
    displayComponent = <Matches countries={countries}/>
  } else {
    displayComponent = <TooMany/>
  }

  return(
    <div>
      {displayComponent}
    </div>
  )
}

const Matches = ({countries}) => {
  return(
    <div>
      {countries.map(country => 
        <p key={country.cca2}>{country.name.common}</p>
      )}
    </div>
  )
}

const TooMany = () => <p>Too many matches, specify another filter</p>

export default App