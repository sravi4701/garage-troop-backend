const router = require('express').Router();
const authController = require('../controllers/auth');

router.post('/register', authController.handleRegister);
router.post('/login', authController.handleLogin);

module.exports = router;
