const express = require('express');
const route = express.Router();


const { welcome } = require('../controllers/dashboard');
const enforceGuests = require('../middlewares/enforce-guests');

route.use('/welcome',enforceGuests,welcome);

module.exports = route;