const db = require('../db');
const { validationResult } = require('express-validator'); 
const { crypto } = require('../SHA256.js');


class UserController {

    generateFormCreate = async function generateFormCreate(req, res) {
        res.render('new', {form: {}, errors: {}});
    }

    createUser = async function createUser(req, res) {
        const {password, nickname} = req.body;
        let errors = {};
        const errorsRegistration = validationResult(req); 
        if (!errorsRegistration.isEmpty()) {
            errorsRegistration.errors.forEach(err => 
                errors[err.param] = err.msg);
            res.status(402);
            res.render('new', { form: {}, errors: errors });
            return;
        } else {
            const hashPassword = await crypto(password);
            await db.query(`INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *`, [nickname, hashPassword]);
            res.redirect('/')
        }
    }

    generateFormAut = async function generateFormAut(req, res) {
        res.render('aut', {form: {}, errors: {}});
    }

    authenticationUser = async function authenticationUser(req, res) {
        let errors = {};
        const errorsAut = validationResult(req); 
        if (!errorsAut.isEmpty()) {
            errorsAut.errors.forEach(err => errors[err.param] = err.msg);
            res.status(402);
            res.render('aut', { form: {}, errors: errors });
            return;
        }
        else {
            const {nickname} = req.body
            req.session.user = nickname;
            res.render('regUser', {user: nickname});
        }
    }

    exit = async function exit(req, res) {
        req.session.destroy();
        res.redirect('/');
    }

};

module.exports = new UserController();
