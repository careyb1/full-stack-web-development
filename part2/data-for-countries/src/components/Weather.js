const Weather = ({weather}) => {
    return(
        <>
            <h3>Weather in {weather.name}</h3>
            <Temperature temp={weather.main.temp}/>
            <WeatherIcon iconCode={weather.weather[0].icon}/>
            <Wind wind={weather.wind.speed}/>
        </>
    )
}

const Temperature = ({temp}) => <p>temperature {temp} Celcius</p>

const WeatherIcon = ({iconCode}) => {
    const iconURL = 'http://openweathermap.org/img/wn/'+iconCode+'@2x.png'
    return(<img src={iconURL} alt='Weather Icon'/>)
}

const Wind = ({wind}) => <p>wind {wind} m/s</p>

export default Weather