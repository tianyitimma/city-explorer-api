'use strict';

const axios = require('axios');
const cache = require('./cache.js');

function getWeather(lat, lon) {
  const key = `weather-lat:${lat},lon:${lon}`;
  const API = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;

  if(!cache[key]) {
    cache[key] = {};
    cache[key].data = axios.get(API)
      .then(data => parseWeatherData(data.data));
  }
  return cache[key].data;
}
function parseWeatherData(data) {
  try{
    const weather = data.data.map(data => {
      return new Forecast(data);
    });
    return Promise.resolve(weather);
  } catch (err) {
    return Promise.reject(err);
  }
}

// {
//     let dailyForecast = response.data.data.results.map(data => new Forecast(data));
//     return Promise.resolve(dailyForecast);
//   })
//   .catch(err => Promise.reject(err));

class Forecast {
  constructor(data) {
    this.description = `Low of ${data.low_temp}, high of ${data.high_temp} with ${data.weather.description}`;
    this.date = data.datetime;
  }
}

module.exports = getWeather;
