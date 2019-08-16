const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userService = require('../services/users');
const userOtpService = require('../services/user-otp');
const Utils = require('../utils');
const bcrypt = require('bcrypt');

passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    // get the user
    try {
        const user = await userService.getOne({ email });
        if (!user) {
            return done(new Error('User does not exists'));
        }
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (isPasswordCorrect) {
            return done(null, user);
        }
        return done(new Error('invalid password'));
    } catch (error) {
        return (done(error));
    }
}));

const otpStrategy = new LocalStrategy({
    usernameField: 'user_id',
    passwordField: 'otp'
}, async (userId, otp, done) => {
    try {
        // verify the user.
        const user = await userService.getOne({ _id: userId });
        if (!user) {
            return done(new Error('User does not exists'));
        }

        // no otp for staging or local development
        if (!Utils.isProd() && otp === '0000') {
            return done(null, user);
        }

        // check if otp is valid
        const userOtp = await userOtpService.getOne({ user_id: userId, otp });
        if (!userOtp) {
            return done(new Error('Invalid OTP'));
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
});

passport.use('otp', otpStrategy);
