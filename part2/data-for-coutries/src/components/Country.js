import { useState , useEffect} from "react"
import axios from 'axios'
import Weather from "./Weather"

const Country = ({country}) => {    
    const [weatherLoaded, setWeatherLoaded] = useState(false)
    const [weather, setWeather] = useState({})

    useEffect(() => {
        const [lat,lng] = country.capitalInfo.latlng
        const apiKey = process.env.REACT_APP_API_KEY
        const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&appid='+apiKey+'&units=metric'
        axios
            .get(url)
            .then(response => {
            setWeather(response.data)
            setWeatherLoaded(true)
      })
    }, [country])

    return(
        <div>
            <h2>{country.name.common}</h2>
            <Data capital={country.capital} area={country.area}/>
            <Languages languages={country.languages}/>
            <Flag flagURL={country.flags.png}/>
            {weatherLoaded ? <Weather weather={weather}/> : <></>}
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