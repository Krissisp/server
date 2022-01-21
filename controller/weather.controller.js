const db = require('../db');
const {getWeather} = require('../weather.js');
const { validationResult } = require('express-validator'); 

class WeatherController {

    generateFormWetherData = async function generateFormWetherData(req, res) {
        res.render('formDataWeather', {form: {}, errors: {}});
    }

    getDataWeather = async function getDataWether(req, res) {
        let errors = {};
        const {city, date} = req.body
        try {
            const errorsWeatherData = validationResult(req); 
            if (!errorsWeatherData.isEmpty()) {
                errorsWeatherData.errors.forEach(err => 
                    errors[err.param] = err.msg);
                res.status(402);
                res.render('formDataWeather', { form: {}, errors: errors});
                return;
            }
        await getWeather(city);
        const weatherAtDate = await db.query(`SELECT * FROM weatherInCity WHERE datestr = '${date}' AND city = '${city}' ORDER BY time`);
        res.render('weather');

    } catch(e) {
        errors.city = 'Incorrect city name or the city was not found';
        res.status(402);
        res.render('formDataWeather', { form: {}, errors: errors});
      }
    }
};

module.exports = new WeatherController();