const express = require('express');
const route = express.Router();


const welcome = require('../middlewares/welcome');

route.use('/welcome', welcome);

module.exports = route;