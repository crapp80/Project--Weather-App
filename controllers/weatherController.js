const axios = require('axios');
const moment = require('moment');
const random = require('random-world');
const lookup = require('country-code-lookup');
const _ = require('lodash');

module.exports.getWeather = (req, res) => {
  const { location } = req.body;
  const mapquestKey = 'yDl8NlyYiE4z97XIDqAELIFIFm6kCBZN';
  const geocodeUrl = `http://open.mapquestapi.com/geocoding/v1/address?key=${mapquestKey}&location=${location || random.city()}`;

  axios.get(geocodeUrl)
    .then((response) => {
      const { lat, lng } = response.data.results[0].locations[0].latLng;
      const openweatherKey = '5ff4373af85b0a26cdf022d418bd2cf8';
      const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&id=524901&APPID=${openweatherKey}`;
      return axios.get(weatherUrl).then((response) => {
        const locationCountry = lookup.byIso(response.data.sys.country);
        const weatherData = {
          description: response.data.weather[0].description,
          time: moment.unix(response.data.dt).format('ddd, MMM Do YYYY, HH:mm'),
          temp: _.round(response.data.main.temp, 1),
          tempMin: _.round(response.data.main.temp_min, 1),
          tempMax: _.round(response.data.main.temp_max, 1),
          sunrise: moment.unix(response.data.sys.sunrise).format('HH:mm'),
          sunset: moment.unix(response.data.sys.sunset).format('HH:mm'),
          locationCity: response.data.name,
          locationCountry: locationCountry.country,
        };
        console.log(weatherData);
        res.render('index', {
          title: 'Hows the weather in ... ?',
          message: 'A simple weather app, written in node.js',
          weatherData,
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
