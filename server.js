const express = require('express');
const app = express();
const routUsers = require('./routs/users.routs.js');
const routeWeather = require('./routs/weather.routs.js');
const bodyParser = require('body-parser');
const session = require('express-session');


app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(session({
    resave: false,
    secret: 'some secret key',
    cookie: { maxAge: 1000 * 60 * 24 * 60 }, // one day
    saveUninitialized: true
}));

app.get('/', async (req, res) => {
    if(req.session.user) {
        res.render('regUser', {user: req.session.user});
    } else {
        res.render('layouts/app')
    }
})

app.use('/', routUsers);
app.use('/', routeWeather);

app.listen(process.env.PORT || 80, () => {
    console.log(`Server has started`);
});