const express = require('express');
const app = express();
const http = require('http');
const PORT = '3000';

const config = require('config');

const users = require('./routes/users');
const guests = require('./routes/guests');
const github = require('./routes/github');


console.log('app name :',config.get("app.host"));
// Set the view engine to EJS
app.set('view engine', 'ejs');
// Specify the views directory
app.set('views', __dirname + '/views');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth/github',github)
app.use('/',users);
app.use('/',guests);


app.listen(PORT, () => {
    console.log(`Server is running on http://:${PORT}`);
});