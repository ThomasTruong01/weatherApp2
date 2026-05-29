import './App.css';
import CurrentWeather from './components/currentWeather/currentWeather';
import Forecast from "./components/forecast/forecast2";
import Search from './components/search/search';
import { WEATHER_API_KEY, WEATHER_API_URL } from "./components/api";
import { useState } from 'react';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    setError(null);

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`);
    const forecastWeatherFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`);

    Promise.all([currentWeatherFetch, forecastWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        if (weatherResponse.cod !== 200) {
          throw new Error(weatherResponse.message || "Failed to fetch weather data");
        }

        setCurrentWeather({city: searchData.label, ...weatherResponse});
        setForecastWeather({city: searchData.label, ...forecastResponse});
      })
      .catch(err => {
        console.error(err);
        setError("Could not load weather data. Please try again.");
      });
  }
  

  return (
    <div className="container">
      <Search
        onSearchChange={handleOnSearchChange}
      />
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      {currentWeather && <CurrentWeather data={currentWeather}/>}
      {forecastWeather && <Forecast data={forecastWeather}/>}

    </div>
  );
}

export default App;











