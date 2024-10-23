import React, { useState } from 'react';
import MainWeather from './MainWeather';
import WeatherDetails from './WeatherDetails';
import axios from 'axios';
import background from './images/background.jpg'
import backgroundClear from './images/bg-clear.jpg';
import backgroundRain from './images/bg-rain.jpg';
import backgroundCloud from './images/bg-cloud.jpg';
import backgroundSnow from './images/bg-snow.jpg';
import backgroundThunder from './images/bg-thunder.jpg';
import backgroundFog from './images/bg-fog.jpg';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('');
    const [error, setError] = useState('');

    const apiKey = '18dd4eee21ca4c3f92274514242310';
    
    const fetchWeather = () => {
      if (city) {
          axios
              .get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`)


             

              .then((response) => {
                  setWeatherData(response.data);
                  setError('');
                  console.log(response.data);
                  
              })
              .catch((err) => {
                  setError('Không tìm thấy thành phố');
                  setWeatherData(null);
              });
      } else {
          setError("Vui lòng nhập tên thành phố");
      }
  };const getBackgroundImage = (weatherMain) => {
    switch (weatherMain) {
        case 'Clear':
            return `url(${backgroundClear})`;
        case 'Rain':
            return `url(${backgroundRain})`;
        case 'Clouds':
            return `url(${backgroundCloud})`;
        case 'Snow':
            return `url(${backgroundSnow})`;
        case 'Thunderstorm':
            return `url(${backgroundThunder})`;
        case 'Fog':
        case 'Mist':
            return `url(${backgroundFog})`;
        default:
            return `url(${background})`;
    }
};
const backgroundStyle = weatherData
? { backgroundImage: getBackgroundImage(weatherData.current.condition.text) }
: { backgroundImage: `url(${background})` };




    return (
        <div className="w-full h-screen flex items-start justify-center bg-gray-100">
            <div className="max-w-6xl w-full bg-white border border-blue-500 shadow-lg rounded-lg p-6 mt-6 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-4xl font-bold">Weather</h2>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search... "
                            className="border border-gray-300 rounded-lg p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 cursor-pointer"
                            onClick={fetchWeather}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                            />
                        </svg>
                        {error && <p className="text-red-500 text-center">{error}</p> }
                    </div>
                </div>
                {weatherData &&  (
                    <>
                        <MainWeather 
                         temperature={Math.round(weatherData.current.temp_c)}
                         cityName={weatherData.location.name}
                         iconWeather={<img src={weatherData.current.condition.icon} alt="weather icon" />}
                         date={new Date().toLocaleDateString()}
                         time={new Date().toLocaleTimeString()}
                        backgroundWeather={backgroundStyle}
                        />
                        <WeatherDetails 
                        humidity={weatherData.current.humidity}
                        speedWind={weatherData.current.wind_kph}
                        sunrise={weatherData.forecast.forecastday[0].astro.sunrise}
                        sunset={weatherData.forecast.forecastday[0].astro.sunset} 
                        dailyForecast={weatherData.forecast.forecastday.map(day => ({
                          day: new Date(day.date).toLocaleDateString('vi-VN', { weekday: 'long' }),
                          iconWeather: day.day.condition.icon, 
                          temperature: Math.round(day.day.avgtemp_c) 
                        }))}
                        />
                      
                    </>
                )}
            </div>
        </div>
    );
};

export default Weather;
