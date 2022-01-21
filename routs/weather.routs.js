const Router = require('express');
const rout = new Router();
const weatherController = require('../controller/weather.controller.js');
const weatherDataSchema = require('../validation/weatherData.schema.js');
const { checkSchema } = require('express-validator'); 

rout.get('/getWeather/data', weatherController.generateFormWetherData);
rout.post('/getWeather', checkSchema(weatherDataSchema), weatherController.getDataWeather);

module.exports = rout;