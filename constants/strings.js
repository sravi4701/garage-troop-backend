const Enum = require('../classes/abstract_enum');

const STRINGS = new Enum({
    OTP: otp => `${otp} is your otp for SettleMyCar Login`
});

module.exports = STRINGS;
