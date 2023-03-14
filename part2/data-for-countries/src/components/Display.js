import Country from './Country'

const Display = ({countries, handleShowCountry}) => setDisplayComponent(countries, handleShowCountry)

function setDisplayComponent (countries, handleShowCountry) {
    const elements = countries.length
    return elements > 10 ? <TooMany />
        : elements === 1 ? <Country country={countries[0]} />
        : elements === 0 ? <p>no matches</p>
        : <Matches countries={countries} handleShowCountry={handleShowCountry} />
}

const Matches = ({countries, handleShowCountry}) => {
    return(
        <div>
            {countries.map(country => 
                <Match key={country.cca2} country={country} handleShowCountry={handleShowCountry}/>
            )}
        </div>
    )
}

const Match = ({country, handleShowCountry}) => {
  return(
      <div>
          <p>{country.name.common}
                <button onClick={()=>handleShowCountry(country.cca2)}>show</button>
          </p>
      </div>
  )
}

const TooMany = () => <p>Too many matches, specify another filter</p>

export default Display