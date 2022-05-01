import React, {useEffect, useState} from "react";
import '../Weather/WeatherStyles.css'
import Loader from "../Loader/Loader";


const Weather = () =>{

    //'https://api.openweathermap.org/data/2.5/weather?lat=19.298144&lon=-99.2453128&appid=acd78d5e91901fc2de911a051d76c265'
    //`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`

    const [weather, setWeather] = useState(null)
    const [loader, setIsLoader] = useState(<Loader />)   


    const key = "acd78d5e91901fc2de911a051d76c265"


    useEffect(() =>{

        const error = () => {
            alert('geolocation IS NOT available')
        }
   
       const succes = position => {
           setIsLoader(true)
           const lat = position.coords.latitude
           const lon = position.coords.longitude
           fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
           .then(response => response.json())
           .then(data => setWeather(data));
           setIsLoader(false)
       }    
       
       navigator.geolocation.getCurrentPosition(succes, error)   
    }, [])

    let handleChangeCent = () => {
        setTepm(false)
        setTepm((temp1 - 32) * 5/9)
        
    }

    let handleChangeFar = () => {
        setTepm(temp1)
    }

    const temp1 = weather?.main.temp
    const [temp, setTepm] = useState(temp1)

    return (
        <div className="card">
            <h2>Weather App</h2>
            <p>City: {weather?.sys.country} {weather?.name}</p>
            <div className="icon">
                <span>
                    <img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="weather-icon" />
                </span>
                <div className="paddL">
                    <p>{weather?.weather[0].description}</p>
                    <p>Clouds: {weather?.clouds.all}%</p>
                    <p>{temp}°</p>
                </div>
            </div>
                <button onClick={handleChangeFar}>Fahrenheit</button>
                <button className="marginL" onClick={handleChangeCent}>Centigrade</button>
        </div>
    )
}

export default Weather;