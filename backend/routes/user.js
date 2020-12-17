const express = require('express');
const user = require('../controllers/user');
const Router = express.Router();

Router.post('/signup', user.signup);
Router.post('/signin', user.signin);

module.exports = Router;