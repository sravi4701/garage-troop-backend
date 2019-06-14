const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../db_models/users');
const bcrypt = require('bcrypt');

passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    // get the user
    try {
        const user = await UserModel.findOne({ email });
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
