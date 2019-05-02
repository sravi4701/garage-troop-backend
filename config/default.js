require('dotenv').config();

const config = {
    app: {
        PORT: process.env.PORT
    },
    db: {
        DB_URI: process.env.DB_URI,
        DEBUG: true
    }
};

module.exports = config;
