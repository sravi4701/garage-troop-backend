/* eslint-disable class-methods-use-this */
const UserModel = require('../db_models/users');
const userService = require('../services/users');
const userOtpService = require('../services/user-otp');
const Utils = require('../utils');
const snsService = require('../services/aws/sns');
const STRINGS = require('../constants/strings');


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

    handleLogin(req, res, next) {
        res.send({ 'data': req.user });
    }

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
}

module.exports = new Auth();
