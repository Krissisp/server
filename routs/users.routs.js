const Router = require('express');
const rout = new Router();
const usersController = require('../controller/user.controller.js');
const { checkSchema } = require('express-validator'); 
const regitrationUserSchema = require('../validation/registrationUser.schema.js');
const autentificationUserSchema = require('../validation/autentificationUser.schema.js');

rout.get('/user/new', usersController.generateFormCreate);
rout.post('/user', checkSchema(regitrationUserSchema), usersController.createUser);
rout.get('/user/terminal/aut', usersController.generateFormAut);
rout.post('/user/terminal', checkSchema(autentificationUserSchema), usersController.authenticationUser);
rout.get('/user/out', usersController.exit)

module.exports = rout;