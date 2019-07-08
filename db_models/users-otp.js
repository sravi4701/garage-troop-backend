const conn = require('../modules/db');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const userOtpSchema = new Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        unique: true
    }
});

module.exports = conn.model('users-otp', userOtpSchema);
