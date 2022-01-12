const express = require('express');
const db = require('./db')
const app = express();
const { Router } = require('express');
const rout = new Router();
let bodyParser = require('body-parser');

app.set('view engine', 'pug');

//var jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', async (req, res) => {
    res.end({})
    res.render('layouts/app')
})


app.get('/users/new', async (req, res) => {
    res.render('new', {form: {}, errors: {}});
});

app.get('/users/terminal/aut', async (req, res) => {
    res.render('aut', {form: {}, errors: {}})
});

app.post('/users', urlencodedParser, async (req, res) => {
    let errors = {};
    const { nickname, password } = req.body;
    const users = await db.query('SELECT * FROM users');
    const errorName = users.rows.filter((user) => user.name === nickname);
    if (errorName.length !== 0 || nickname === '') {
        errors.nickname = 'Никнейм должен быть уникален и не пустым';
        res.status(402);
        res.render('new', { form: {}, errors: errors });
        return;
    } else {
        await db.query(`INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *`, [nickname, password]);
        res.redirect('/')
    }
});

app.post('/users/terminal', urlencodedParser, async (req, res) => {
    let errors = {};
    const { nickname, password } = req.body;
    const users = await db.query('SELECT * FROM users');
    const errorName = users.rows.filter((user) => user.name === nickname);
    if (errorName.length === 0) {
        errors.nickname = 'Пользователь не найден';
        res.status(402);
        res.render('aut', { form: {}, errors: errors });
        return;
    }
    else if(errorName[0].password !== password) {
        errors.password = 'Неверный пароль';
        res.status(402);
        res.render('aut', { form: {}, errors: errors });
        return;
    }
    else {
        res.render('regUser');
    }
})




app.listen(process.env.PORT || 8000, () => {
    console.log(`Server has started`);
});