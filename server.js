'use strict';

// import
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const weather = require('./data/weather.json');

// config
dotenv.config();
app.use(cors());
// app.use(express.json());

//setup the port constant
const PORT = process.env.PORT || 3333;

//const API = `http://localhost:${PORT}?lat=${lat}&lon=${lon}&city=${q}`;

// build the server page

app.listen(PORT, () =>{
  console.log('server page ', PORT);
});


app.get('/weather', (req, res) =>{
  let lat = req.query.lat;
  let lon = req.query.lon;
  let q = req.query.city;


  let cityWeather = weather.find(item => (
    item.city_name.toLowerCase() === q.toLowerCase() &&
    parseFloat(parseFloat(item.lon).toFixed(2)) === parseFloat(parseFloat(lon).toFixed(2)) &&
    parseFloat(parseFloat(item.lat).toFixed(2)) === parseFloat(parseFloat(lat).toFixed(2))
  ));
  let dailyForecast = cityWeather.data.map(data => new Forecast(data));
  res.send(dailyForecast);


});

class Forecast {
  constructor(data) {
    this.description = `Low of ${data.low_temp}, high of ${data.max_temp} with ${data.weather.description}`;
    this.date = data.datetime;
  }
}
