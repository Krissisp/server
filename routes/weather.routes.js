const Router = require('express');
const route = new Router();
const weatherController = require('../controller/weather.controller.js');
const weatherDataSchema = require('../validation/weatherData.schema.js');
const { checkSchema } = require('express-validator'); 

route.get('/getWeather/data', weatherController.generateFormWetherData);
route.post('/getWeather', checkSchema(weatherDataSchema), weatherController.getDataWeather);

module.exports = route;