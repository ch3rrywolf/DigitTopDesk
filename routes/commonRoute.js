const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware');

const { categoryAddValidator, categoryDeleteValidator, categoryUpdateValidator } = require('../helpers/adminValidator');

const categoryController = require('../controllers/categoryController');
const postController = require('../controllers/postController');

// category routes
router.post('/add-category', auth.verifyToken, categoryAddValidator, categoryController.addCategory);
router.get('/get-categories', auth.verifyToken, categoryController.getCategories);
router.post('/delete-category', auth.verifyToken, categoryDeleteValidator, categoryController.deleteCategory);
router.post('/update-category', auth.verifyToken, categoryUpdateValidator, categoryController.updateCategory);

// post routes
router.post('/create-post', auth.verifyToken, postController);

module.exports = router;