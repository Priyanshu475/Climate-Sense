import React, { useState } from 'react'
import axios from 'axios'
import Forecast from './weatherforecast'



const App = ({city})=> {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=f556851a92b9041eaef2fcab14203f9e`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <center><h1>Climate Sense</h1></center> 
      <center><h3>Your current loaction : {city}</h3></center>
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{(((data.main.temp-32)*5) / 9).toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{(((data.main.feels_like-32)*5) / 9 ).toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{(1.609*(data.wind.speed)).toFixed(2)} KMPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
      <Forecast name={data.name} />
    </div>
  );
}


export default App;