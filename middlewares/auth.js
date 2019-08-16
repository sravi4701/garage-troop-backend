const config = require('config');

class AuthMiddleware {
    isValidSecretKey(req, res, next) {
        const secretKey = req.headers.secret_key;
        if (config.get('app.SECRET_KEY') !== secretKey) {
            return res.status(403).send({ error: true, message: 'Not allowed to perform action' });
        }
        req.isValidSecret = true;
        return next();
    }
}

module.exports = new AuthMiddleware();
