'use strict';

// import
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

const axios = require('axios');
// config
dotenv.config();
app.use(cors());
app.use(express.json());

//setup the port constant
const PORT = process.env.PORT || 3333;


// build the server page

app.listen(PORT, () =>{
  console.log('server page ', PORT);
});



app.get('/weather', (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;

  const API = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;

  axios.get(API)
    .then(response => {
      let dailyForecast = response.data.data.map(data => new Forecast(data));
      res.send(dailyForecast);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Sorry, something went wrong');
    });

});

class Forecast {
  constructor(data) {
    this.description = `Low of ${data.low_temp}, high of ${data.high_temp} with ${data.weather.description}`;
    this.date = data.datetime;
  }
}

app.get('/movies', (req, res) =>{
  let city = req.query.city;
  const API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;

  axios.get(API)
    .then(response => {
      let movies = response.data.results.map(data => new Movies(data));
      res.send(movies);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Sorry, something went wrong');
    });



});

class Movies {
  constructor(data){
    this.title = data.title,
    this.overview = data.overview,
    this.average_votes = data.vote_average,
    this.total_votes = data.vote_count,
    this.image_url = data.poster_path,
    this.popularity = data.popularity,
    this.released_on = data.release_date;
  }
}
