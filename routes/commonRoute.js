const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware');

const { categoryAddValidator, categoryDeleteValidator, categoryUpdateValidator, postCreateValidator, postDeleteValidator, postUpdateValidator } = require('../helpers/adminValidator');

const { createUserValidator, updateUserValidator, deleteUserValidator, postLikeUnlikeValidator } = require('../helpers/validator');

const categoryController = require('../controllers/categoryController');
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const likeController = require('../controllers/likeController');

// category routes
router.post('/add-category', auth.verifyToken, categoryAddValidator, categoryController.addCategory);
router.get('/get-categories', auth.verifyToken, categoryController.getCategories);
router.post('/delete-category', auth.verifyToken, categoryDeleteValidator, categoryController.deleteCategory);
router.post('/update-category', auth.verifyToken, categoryUpdateValidator, categoryController.updateCategory);

// post routes
router.post('/create-post', auth.verifyToken, postCreateValidator, postController.createPost);
router.get('/get-posts', auth.verifyToken, postController.getPosts);
router.post('/delete-post', auth.verifyToken, postDeleteValidator, postController.deletePost);
router.post('/update-post', auth.verifyToken, postUpdateValidator, postController.updatePost);

// user routes
router.post('/create-user', auth.verifyToken, createUserValidator, userController.createUser);
router.get('/get-users', auth.verifyToken, userController.getUsers);
router.post('/update-user', auth.verifyToken, updateUserValidator, userController.updateUser);
router.post('/delete-user', auth.verifyToken, deleteUserValidator, userController.deleteUser);

// like & unlike routes
router.post('/post-like', auth.verifyToken, postLikeUnlikeValidator, likeController.deleteUser);

module.exports = router;