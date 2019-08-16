const router = require('express').Router();
const authController = require('../controllers/auth');

router.post('/register', authController.handleRegister.bind(authController));
router.post('/login', authController.handleLocalLogin.bind(authController));

router.post('/send-otp', authController.otpLogin.bind(authController));
router.post('/verify-otp', authController.handleOtpLogin.bind(authController));

module.exports = router;
