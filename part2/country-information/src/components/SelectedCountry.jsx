import React, { useEffect, useState } from 'react'
import axios from 'axios'
const SelectedCountry=({filterData,languages,flagurl})=> {
    const [weather,setWeather]=useState({})
    const [temperature,setTemperature]=useState(null)
    const VITE_API_KEY=import.meta.env.VITE_WEATHER_KEY

    const cityName=filterData[0].capital
    
    

    useEffect(()=>{
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${VITE_API_KEY}&units=metric`)
        .then(response=>{
            setTemperature(response.data.main.temp)
            setWeather(response.data)
            
        })
        .catch((e)=>{
            alert(`not able to fetch weather api due to ${e}`)
        })
    },[cityName, VITE_API_KEY])

    
   const iconurl = weather?.weather?.[0]?.icon
  ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  : null;

  const windspeed=weather?.wind?.speed ;

  return (
    <>
        <div>
            <h2>{filterData[0].name.common}</h2>
            <div>
                <p>Capital {filterData[0].capital}</p>
                <p>Area {filterData[0].area}</p> 
            </div>
            <div>
                <h2>Languages</h2>
                <ul>
                    {
                        Object.entries(languages).map((entry,i)=>{
                            return <li key={i}>{entry[0]} {entry[1]}</li>
                        })
                    }
                </ul>
                <img src={flagurl} alt="flag"/>
                
            </div>
            <div>
                <h2>weather of {filterData[0].name.common}</h2>
                <p>Temperature: {temperature !== null ? `${temperature} °C` : "Loading..."}</p>
                {iconurl && <img src={iconurl} alt="weather icon" />}

            </div>
            <p>wind {windspeed} </p>

        </div>
    </>
  )
}

export default SelectedCountry
