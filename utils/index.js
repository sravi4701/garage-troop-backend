const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

class Utils {
    static schemaTypes() {
        return {
            MANDATORY_STRING: {
                type: String,
                required: true
            },
            OPTIONAL_STRING: {
                type: String
            },
            MANDATORY_NUMBER: {
                type: Number,
                required: true
            },
            OPTIONAL_NUMBER: {
                type: Number
            },
            POINT_COORDINATES: {
                type: { type: String, required: false, default: 'Point' },
                coordinates: { type: [Number], validate: [Utils.validateLatLog, 'Invalid coordinates'] } // Long, Lat
            },
            MANDATORY_OBJECT_IDS: { type: [mongoose.Schema.Types.ObjectId], required: true }
        };
    }

    static validateLatLog(coordinates) {
        const long = coordinates[0];
        const lat = coordinates[1];
        if ((long >= -180 && long <= 180) && (lat >= -90 && lat <= 90)) {
            return true;
        }
        return false;
    }

    static validateEmail(email) {
        const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; // eslint-disable-line no-useless-escape
        return re.test(email);
    }

    static signJwt(paylod) {
        const secret = config.get('app.JWT_SECRET');
        const signOptions = {
            issuer: 'smc',
            expiresIn: '10 days'
        };
        const token = jwt.sign(paylod, secret, signOptions);
        return token;
    }

    static verifyJwt(token) {
        const secret = config.get('app.JWT_SECRET');
        const verifyOptions = {
            issuer: 'smc',
            expiresIn: '10 days'
        };
        const decoded = jwt.verify(token, secret, verifyOptions);
        return decoded;
    }

    static getEnv() {
        return process.env.NODE_ENV;
    }

    static isProd() {
        return process.env.NODE_ENV === 'production';
    }

    static isStaging() {
        return process.env.NODE_ENV === 'staging';
    }

    static isValidPhoneNo(phoneNo) {
        if (typeof phoneNo !== 'string' || phoneNo.length !== 10) {
            return false;
        }

        if (!Number(phoneNo)) {
            return false;
        }

        return true;
    }

    static generateOTP() {
        const digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 4; i += 1) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }

    static getStandardResponse(data, meta) {
        return {
            data,
            meta
        };
    }

    static getStandardErrorResponse(message) {
        return {
            error: true,
            message
        };
    }
}

module.exports = Utils;
