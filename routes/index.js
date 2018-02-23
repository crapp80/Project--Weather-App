const express = require('express');

const weatherController = require('../controllers/weatherController.js');

const router = express.Router();

/* GET home page. */
router.get('/', weatherController.getWeather);

router.post('/', weatherController.getWeather);

module.exports = router;
