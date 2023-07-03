const express = require('express');
const route = express.Router();

const dashboard = require('../middlewares/dashboard');
const logout = require('../controllers/logout');
const enforceAuth = require('../middlewares/enforce-auth');


route.get('/dashboard',enforceAuth,dashboard);
//route.get('/logout',logout);

module.exports = route;