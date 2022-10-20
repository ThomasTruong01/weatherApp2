import './App.css';
import CurrentWeather from './components/currentWeather/currentWeather';
import Forecast from "./components/forecast/forecast";
import Search from './components/search/search';
import { WEATHER_API_KEY, WEATHER_API_URL } from "./components/api";
import { useState } from 'react';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);


  const handleOnSearchChange = (searchData) => {
    const [lat, lon]  = searchData.value.split(" ");
    
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`);
    const forecastWeatherFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`);

    Promise.all([currentWeatherFetch, forecastWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({city: searchData.label, ...weatherResponse});
        setForecastWeather({city: searchData.label, ...forecastResponse});
      })
      .catch(err => console.log(err));
      console.log('app forecast', forecastWeather)
  }
  

  return (
    <div className="container">
      <Search 
        onSearchChange={handleOnSearchChange}
      />
      {currentWeather && <CurrentWeather data={currentWeather}/>}
      {forecastWeather && <Forecast data={forecastWeather}/>}

    </div>
  );
}

export default App;











