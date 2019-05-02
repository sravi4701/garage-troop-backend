// by default load .env file in root directory
// can be loaded at run time
// node -r dotenv/config server.js dotenv_config_path=/custom/path/to/envs
// dotenv can't override already declared environment variables
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
