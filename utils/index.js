const jwt = require('jsonwebtoken');
const config = require('config');

class Utils {
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
}

module.exports = Utils;
