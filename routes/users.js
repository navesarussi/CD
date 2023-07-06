const express = require('express');
const route = express.Router();

const { dashboard, addSymbol, logout, removeSymbol} = require('../controllers/dashboard');
const enforceAuth = require('../middlewares/enforce-auth');

route.get('/dashboard',enforceAuth,dashboard);
route.post('/addSymbol',enforceAuth,addSymbol);
route.post('/removeSymbol',enforceAuth,removeSymbol);
route.get('/logout',logout);

module.exports = route;