import React, { useState } from 'react'
import './App.css'

import { search, sun, moon, winter, cloud, rain, suny, fog, themeMoon, themeSun } from './assets/indexSvg'

const API_KEY = '3184b9b9632a4f8e3879652d5265d72b'


const dateBuilder = (d) => {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[d.getDay()];
  let time = d.getHours() + ":" + d.getMinutes()
  return `${day}, ${time}`
}




function conditions(props) {
  switch (props) {
    case "Clouds": return cloud
    case "Snow": return winter
    case "Fog": return fog
    case "Rain": return rain
    default: return suny
  }
}

function App() {
  const [value, setValue] = useState('');
  const [weather, setWeather] = useState({});
  const [theme, setTheme] = useState("");

  function searchCity(event) {
    if (event.key === "Enter") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&APPID=${API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
        });
    }
  }

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="swtichTheme">
        <img src={theme === "dark" ? themeMoon : themeSun} alt="theme" onClick={() => setTheme(theme === "dark" ? "" : "dark")} className="button" />
      </div>
      <div className="weather">

        <div className="weather__input">
          <i><img src={search} alt="search" /></i>
          <input
            type="text"
            placeholder="Найти город..."
            onChange={event => setValue(event.target.value)}
            onKeyPress={searchCity} />
        </div>

        <div className="infoWeather">
          <img src={theme === "dark" ? moon : sun} alt="weatherImg" />
          {(typeof weather.main != "undefined") ? (
            <div>
              <h1 className="info_temp">{Math.floor(weather.main.temp)} °C</h1>
              <p className="info_date">{dateBuilder(new Date())}</p>
              <hr />

              <div className="info_weather">
                <img src={conditions(weather.weather[0].main)} alt="conditionsImg"></img>
                <p>{weather.weather[0].main}</p>
              </div>
            </div>
          ) : ("")}
        </div>
      </div>
    </div>
  )
}


export default App