const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware');

const { categoryAddValidator, categoryDeleteValidator, categoryUpdateValidator, postCreateValidator, postDeleteValidator, postUpdateValidator } = require('../helpers/adminValidator');

const { createUserValidator, updateUserValidator, deleteUserValidator, postLikeUnlikeValidator, postLikeCountValidator } = require('../helpers/validator');

const categoryController = require('../controllers/categoryController');
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const likeController = require('../controllers/likeController');

const checkPermission = require('../middlewares/checkPermission');

// category routes
router.post('/add-category', auth.verifyToken, checkPermission, categoryAddValidator, categoryController.addCategory);
router.get('/get-categories', auth.verifyToken, checkPermission, categoryController.getCategories);
router.post('/delete-category', auth.verifyToken, checkPermission, categoryDeleteValidator, categoryController.deleteCategory);
router.post('/update-category', auth.verifyToken, checkPermission, categoryUpdateValidator, categoryController.updateCategory);

// post routes
router.post('/create-post', auth.verifyToken, checkPermission, postCreateValidator, postController.createPost);
router.get('/get-posts', auth.verifyToken, checkPermission, postController.getPosts);
router.post('/delete-post', auth.verifyToken, checkPermission, postDeleteValidator, postController.deletePost);
router.post('/update-post', auth.verifyToken, checkPermission, postUpdateValidator, postController.updatePost);

// user routes
router.post('/create-user', auth.verifyToken, checkPermission, createUserValidator, userController.createUser);
router.get('/get-users', auth.verifyToken, checkPermission, userController.getUsers);
router.post('/update-user', auth.verifyToken, checkPermission, updateUserValidator, userController.updateUser);
router.post('/delete-user', auth.verifyToken, checkPermission, deleteUserValidator, userController.deleteUser);

// like & unlike routes
router.post('/post-like', auth.verifyToken, checkPermission, postLikeUnlikeValidator, likeController.postLike);
router.post('/post-unlike', auth.verifyToken, checkPermission, postLikeUnlikeValidator, likeController.postUnLike);
router.post('/post-like-count', auth.verifyToken, checkPermission, postLikeCountValidator, likeController.postLikeCount);

module.exports = router;