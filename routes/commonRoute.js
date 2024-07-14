const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware');

const { categoryAddValidator, categoryDeleteValidator } = require('../helpers/adminValidator');

const categoryController = require('../controllers/categoryController');

// category routes
router.post('/add-category', auth.verifyToken, categoryAddValidator, categoryController.addCategory);
router.get('/get-categories', auth.verifyToken, categoryController.getCategories);
router.post('/delete-category', auth.verifyToken, categoryDeleteValidator, categoryController.deleteCategory);

module.exports = router;