const express = require('express');

const weatherController = require('../controllers/weatherController.js');

const router = express.Router();

/* GET home page AND perform API calls. */
router.all('/', weatherController.getWeather);

module.exports = router;
