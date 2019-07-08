// by default load .env file in root directory
// can be loaded at run time
// node -r dotenv/config server.js dotenv_config_path=/custom/path/to/envs
// dotenv can't override already declared environment variables
require('dotenv').config();

const config = {
    app: {
        PORT: process.env.PORT,
        JWT_SECRET: process.env.JWT_SECRET
    },
    db: {
        DB_URI: process.env.DB_URI,
        DEBUG: true
    },
    sms: {
        SMS_API_KEY: process.env.SMS_API_KEY
    },
    aws: {
        AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
        AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
        AWS_SMS_REGION: process.env.AWS_SMS_REGION,
        AWS_REGION: process.env.AWS_REGION
    }
};

module.exports = config;
