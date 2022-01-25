const Router = require('express');
const route = new Router();
const usersController = require('../controller/user.controller.js');
const { checkSchema } = require('express-validator'); 
const regitrationUserSchema = require('../validation/registrationUser.schema.js');
const autentificationUserSchema = require('../validation/autentificationUser.schema.js');

route.get('/user/new', usersController.generateFormCreate);
route.post('/user', checkSchema(regitrationUserSchema), usersController.createUser);
route.get('/user/terminal/aut', usersController.generateFormAut);
route.post('/user/terminal', checkSchema(autentificationUserSchema), usersController.authenticationUser);
route.get('/user/out', usersController.exit)

module.exports = route;