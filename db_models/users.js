const conn = require('../modules/db');
const mongoose = require('mongoose');

const { Schema } = mongoose;
const Utils = require('../utils');

const userSchema = new Schema({
    method: {
        type: String,
        enum: ['google', 'facebook', 'otp', 'local'],
        required: true
    },
    email: {
        type: String,
        validate: [Utils.validateEmail, 'Invalid email'],
        unique: true
    },
    phone: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    google: {},
    facebook: {},
    profile: {
        first_name: {
            type: String
        },
        last_name: {
            type: String
        },
        avatar: {
            type: String
        }
    }
});

module.exports = conn.Model('users', userSchema);
