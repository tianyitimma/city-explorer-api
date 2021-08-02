'use strict';

// import
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
//const axios = require('axios');

const getWeather = require('./weather.js');
const getMovies = require('./movies.js');

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

//app.use('*', notFund);


app.get('/weather', weatherHandler);

function weatherHandler(req, res){
  const lat = req.query.lat;
  const lon = req.query.lon;
  getWeather(lat, lon)
    .then(weather => res.send(weather))
    .catch(err => console.error(err));
}

// function notFund(req, res){
//   res.status(404).send('route not found');
// }



app.get('/movies', movieHandler);

function movieHandler(req, res) {
  const location = req.query.city;

  getMovies(location)
    .then(moviesList => res.send(moviesList))
    .catch(err => console.error(err));
}




