/* eslint-disable class-methods-use-this */
const UserModel = require('../db_models/users');
const Utils = require('../utils');

class Auth {
    async handleRegister(req, res, next) {
        const { email, password } = req.body;
        try {
            const user = await UserModel.findOne({ email });
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
}

module.exports = new Auth();
