/* eslint-disable class-methods-use-this */
const UserModel = require('../db_models/users');
const userService = require('../services/users');
const userOtpService = require('../services/user-otp');
const Utils = require('../utils');
const snsService = require('../services/aws/sns');
const STRINGS = require('../constants/strings');
const passport = require('passport');


class Auth {
    async handleRegister(req, res, next) {
        const { email, password } = req.body;
        try {
            const user = await userService.getOne({ email });
            if (!user) {
                // new user
                const userData = {
                    email,
                    password,
                    method: 'local'
                };
                const newUser = await new UserModel(userData).save();
                // send json web token
                const token = Utils.signJwt({ id: newUser._id.toString() });
                return res.send({ data: { token } });
            }
            // already existing user
            return res.status(400).send({ error: true, message: 'User Already Exists' });
        } catch (error) {
            return res.status(400).send({ error: true, message: error.message });
        }
    }

    handleLogin(user, req, res, next) {
        const token = Utils.signJwt({ id: user._id.toString() });
        res.send(Utils.getStandardResponse({ token }));
    }

    /**
     * This method send otp to new or existing users
     * if user is new then it creates a new user.
     * It stores the otp in the otp-model for verification.
    */
    async otpLogin(req, res, next) {
        const { phone } = req.body;
        if (!Utils.isValidPhoneNo(phone)) {
            return res.status(400).send({ error: true, message: 'Invalid Phone no.' });
        }
        try {
            let user = await userService.getOne({ phone });
            if (!user) {
                // add one
                user = await userService.addOne({ phone, method: 'otp' });
            }
            const userId = user._id;
            const otp = Utils.generateOTP();
            // store otp to otp model
            await userOtpService.updateOne({ user_id: userId }, { otp }, { user_id: userId }, { upsert: true });
            const message = STRINGS.OTP(otp);
            // send otp
            await snsService.sendMessage(`+91${phone}`, message);
            return res.send(Utils.getStandardResponse({ _id: userId }));
        } catch (error) {
            console.log('error', error);
            return res.status(400).send(Utils.getStandardErrorResponse(error.message));
        }
    }

    handleOtpLogin(req, res, next) {
        passport.authenticate('otp', { session: false }, (err, user, info) => {
            if (err) {
                return res.status(403).send(Utils.getStandardErrorResponse(err.message));
            }
            if (!user) {
                return res.status(403).send(Utils.getStandardErrorResponse('User not found'));
            }
            return this.handleLogin(user, req, res, next);
        })(req, res, next);
    }

    handleLocalLogin(req, res, next) {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err) {
                return res.status(403).send(Utils.getStandardErrorResponse(err.message));
            }
            if (!user) {
                return res.status(403).send(Utils.getStandardErrorResponse('User not found'));
            }
            return this.handleLogin(user, req, res, next);
        })(req, res, next);
    }
}

module.exports = new Auth();
