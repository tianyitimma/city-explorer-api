'use strict';

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const weather = require('./data/weather.json');

dotenv.config();
app.use(cors());

let lat = '';
let lon = '';
let q = '';

const PORT = process.env.PORT;
const API = `http://localhost:${PORT}?lat=${lat}&lon=${lon}&searchQuery=${q}`;

app.get('/weather', (req, res) =>{
  let lat = req.query.lat;
  let lon = req.query.lon;
  let q = req.query.searchQuery;

  try {
    res.send(weather.city_name.find(q))
  } catch (error) {
    console.error(error);
  }
  
  
});
