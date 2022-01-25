const axios = require('axios');
const db = require('./db');


async function getWeather(city, language="ru") {
    const apiKey = "*****";
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=${language}&appid=${apiKey}`;
    
    const weather = await axios.get(url);
    const dateAndTimeInCity = await db.query(`SELECT city, dt FROM weatherInCity`);
    
    for (const weatherOf3hours of weather.data.list) {
        const dt = weatherOf3hours.dt;

        const filterParams = dateAndTimeInCity.rows.filter((element) => element.city === city && element.dt == dt);
        
        const date = weatherOf3hours.dt_txt.split(' ')[0];
        const time = weatherOf3hours.dt_txt.split(' ')[1];
        const temperature = weatherOf3hours.main.temp;
        const feels_like = weatherOf3hours.main.feels_like;
        const humidity = weatherOf3hours.main.humidity;
        const clouds = weatherOf3hours.clouds.all;
        const speed_wind = weatherOf3hours.wind.speed;
        const description = weatherOf3hours.weather[0].description;

        if(filterParams.length !== 0) {
            await db.query(`UPDATE weatherInCity SET temperature = ${temperature}, feels_like = ${feels_like}, humidity = ${humidity}, 
            clouds = ${clouds}, speed_wind = ${speed_wind}, description = '${description}' WHERE dt = ${dt}`);
        }
        else {
            await db.query(`INSERT INTO weatherInCity (city, dt, datestr, time, temperature, feels_like, humidity, clouds, speed_wind, description) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`, [city, dt, date, time, temperature, feels_like, humidity, clouds, speed_wind, description]);
        }
    }
    return weather;
};

module.exports = { getWeather };