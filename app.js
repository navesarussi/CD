const express = require('express');
const app = express();
const http = require('http');
const PORT = '3000';

const routeusers = require('./routes/routeusers');
const routeguests = require('./routes/routeguests');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',routeusers);
app.use('/',routeguests);


app.listen(PORT, () => {
    console.log(`Server is running on http://:${PORT}`);
});