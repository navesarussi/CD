const express = require('express');
const route = express.Router();

const dashboard = require('../middlewares/dashboard');
const logout = require('../controllers/logout');

route.get('/dashboard',dashboard);
//route.get('/logout',logout);

module.exports = route;