const router = require('express').Router();
const authController = require('../controllers/auth');
const passport = require('passport');

router.post('/register', authController.handleRegister.bind(authController));
router.post('/login', passport.authenticate('local', { session: false }), authController.handleLogin.bind(authController));
router.post('/send-otp', authController.otpLogin.bind(authController));

module.exports = router;
