const express = require('express');
const morgan = require('morgan');
require('./modules/db'); // setup mongodb

const app = express();


app.use(morgan('dev'));

app.get('/ping', (req, res) => {
    res.send('pong');
});

module.exports = app;
