/* eslint-disable class-methods-use-this */
class Auth {
    handleRegister(req, res, next) {
        res.send({ 'data': req.body });
    }

    handleLogin(req, res, next) {
        res.send({ 'data': req.body });
    }
}

module.exports = new Auth();
