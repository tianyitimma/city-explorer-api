'use strict';

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const weather = require('weather.json');

dotenv.config();
app.use(cors());

const PORT = process.env.PORT;

app.get('/weather', (req, res) =>{
  let lat = req.query.lat;
  let lon = req.query.lon;
  let q = req.query.searchQuery;

  
});
