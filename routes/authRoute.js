const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');

const { registerValidator, loginValidator } = require('../helpers/validator');

router.post('/register', registerValidator, authController.registerUser);
router.post('/login', loginValidator, authController.loginUser);

router.get('/profile', authMiddleware.verifyToken, authController.getProfile);

module.exports = router;