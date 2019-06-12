const express = require('express');
const morgan = require('morgan');
require('./modules/db'); // setup mongodb
const initializeRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('dev'));

// load all the routes
initializeRoutes(app);

module.exports = app;
