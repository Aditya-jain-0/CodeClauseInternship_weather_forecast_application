import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [temperature, setTemperature] = useState(null);
  const [cityName, setCityName] = useState("");
  const [errmsg, seterrmsg] = useState("");

  const handleChange = (e) => {
    setCityName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid={API_KEY}`);
    try {
      const data = await response.json();
      if (response.ok) {
        const temperatureInCelsius = (parseFloat(data.main.temp) - 273.15).toFixed(2);
        setTemperature(temperatureInCelsius);
      } else {
        setTemperature(null);
        seterrmsg("No Data Found !")
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="weather-app">
      <h1 className="app-heading">Weather Forecasting Application</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} placeholder="Enter city name" />
        <button type="submit">Check</button>
      </form>
      {temperature !== null && (
        <h1 className="temperature">{`${temperature} °C`}</h1>
      )}
      {errmsg !== "" && (<h1>No Data Found</h1>)}
    </div>
  );
}
