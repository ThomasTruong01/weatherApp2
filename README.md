# Weather App 2.0

A React weather app that shows current conditions and a 5-day hourly forecast for US cities.

## Features

- Search US cities by name (min. population 100,000)
- Current weather: temperature, feels like, wind speed, humidity, pressure
- 5-day hourly forecast: temperature, conditions, precipitation chance, wind direction/speed, cloud coverage, rain amount
- Powered by [OpenWeatherMap](https://openweathermap.org/api) and [GeoDB Cities (RapidAPI)](https://rapidapi.com/wirefreethought/api/geodb-cities)

## Getting Started

### Prerequisites

- Node.js 16+
- npm

### Environment Variables

Create a `.env` file in the project root with the following:

```
REACT_APP_WEATHER_API=your_openweathermap_api_key
REACT_APP_RAPIDAPI_KEY=your_rapidapi_key
```

- Get a free OpenWeatherMap API key at https://openweathermap.org/api
- Get a RapidAPI key and subscribe to the GeoDB Cities API at https://rapidapi.com/wirefreethought/api/geodb-cities

### Install & Run

```bash
npm install
npm start
```

The app runs at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
```

Output is in the `build/` folder.

## Available Scripts

| Script | Description |
|---|---|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run tests |

## Tech Stack

- [React 18](https://react.dev/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Bootstrap 5](https://getbootstrap.com/)
- [react-select-async-paginate](https://github.com/vtaits/react-select-async-paginate)
- [OpenWeatherMap API](https://openweathermap.org/api) — current weather and forecast data
- [GeoDB Cities API](https://rapidapi.com/wirefreethought/api/geodb-cities) — city search
