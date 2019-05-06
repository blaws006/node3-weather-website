// Core Modules
const path = require('path');

// NPM Modules
const express = require('express');
const hbs = require('hbs');

// Custom Modules
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handles engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Brandon Lawson'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Brandon Lawson'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'If you need help, follow these instructions ...',
    title: 'Help',
    name: 'Brandon Lawson'
  })
})


// Endpoint
app.get('/weather', (req, res) =>{
  if (!req.query.address){
    return res.send({
      error: 'You must provide an address!'
    })
  }
  
  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({ error })
    } 
    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send({ error })
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    })
  }) 
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  console.log(req.query.search)
  res.send({
    products: []
  })
})


app.get('/help/*', (req, res) => {
  res.render('error', {
    message: 'Help article not found',
    title: '404',
    name: 'Brandon Lawson'
  })
})

app.get('*', (req, res) => {
  res.render('error', {
    message: 'Page not found',
    title: '404',
    name: 'Brandon Lawson'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});