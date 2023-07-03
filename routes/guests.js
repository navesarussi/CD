const express = require('express');
const route = express.Router();


const welcome = require('../middlewares/welcome');
const enforceGuests = require('../middlewares/enforce-guests');

route.use('/welcome', welcome);

module.exports = route;