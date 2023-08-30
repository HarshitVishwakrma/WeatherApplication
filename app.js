const express = require('express');
const path = require('path');
const http = require('https');
const bodyParser = require('body-parser');
const ipapi = require('ipapi.co');


const API_KEY = 'd31312f66a91062241f7f570c35c4c1a';


let lat, long;
const app = express();
// let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



function fetchToWeatherApi(req, res, next) {
   fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
         console.log(data)
         return {
            temperature: data.main.temp,
            minTemp: data.main.temp_min,
            maxTemp: data.main.temp_max,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            feel: data.main.feels_like,
            visibility: data.visibility,
            windSpeed: data.wind.speed,
            windSpeedDegree: data.wind.deg,
            clouds: data.weather[0].main,
            sunRise: new Date(+data.sys.sunrise*1000),
            sunSet: new Date(+data.sys.sunset*1000),
            city : data.name
         };
      }).then(data => {
         res.render('index', {
            temperature: ((JSON.stringify(data.temperature)) - 273.15).toFixed(2),
            pressure: data.pressure,
            humidity: data.humidity,
            minTemp : data.minTemp,
            maxTemp : data.maxTemp,
            feelsLike : ((JSON.stringify(data.feel)) - 273.15).toFixed(2),
            visibility : data.visibility,
            windSpeed : data.windSpeed,
            windSpeedDegree : data.windSpeedDegree,
            clouds : data.clouds,
            sunRise : data.sunRise,
            sunSet : data.sunSet,
            city : data.city
         })
      })
}

app.post('/', (req, res, next) => {

   const city = req.body.city;
   const country = req.body.country;
   // console.log(city, country);
   if (!city) {
      res.redirect('/')
   }

   const urlForCoords = ` https://geocode.maps.co/search?q={${city}}`;
   fetch(urlForCoords).then(response => response.json())
      .then(data => {
         lat = data[0].lat;
         long = data[0].lon;
         res.redirect('/');
      })
      .catch(err => console.log(err));


})


app.get('/', (req, res, next) => {

   if (lat === undefined && long === undefined) {

      fetch(`http://ip-api.com/json/?fields=61439`).then(response => response.json())
         .then(data => {
            lat = data.lat;
            long = data.lon;
            // console.log(data)
         }).then(() => {

            fetchToWeatherApi(req, res, next);
         })
   }
   else {
      fetchToWeatherApi(req, res, next);
   }


});


app.listen(3000);