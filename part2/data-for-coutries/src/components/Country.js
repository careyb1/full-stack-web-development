const Country = ({country}) => {
    return(
        <div>
            <h2>{country.name.common}</h2>
            <Data capital={country.capital} area={country.area}/>
            <Languages languages={country.languages}/>
            <Flag flagURL={country.flags.png}/>
        </div>
    )
}

const Data = ({capital, area}) => {
    return(
        <div>
            <p>capital {capital}</p>
            <p>area {area}</p>
        </div>
    )
}

const Languages = ({languages}) => {
    var languageArray = []
    for (let x in languages) {
        languageArray.push(languages[x])
    }
    return(
        <div>
            <h3>languages:</h3>
            <ul>
                {languageArray.map(language => 
                  <li key={language}>
                    {language}
                  </li>
                )}
            </ul>
        </div>
    )
}

const Flag = ({flagURL}) => <img src={flagURL} alt='Flag of country'/>

export default Country