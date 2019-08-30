const express = require('express');
const morgan = require('morgan');
require('./modules/db'); // setup mongodb
require('./middlewares/passport'); // initialize passport
const cors = require('cors');
const initializeRoutes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// load all the routes
initializeRoutes(app);

module.exports = app;
