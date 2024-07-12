const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const permissionController = require('../controllers/admin/permissionController')

const { permissionAddValidator } = require('../helpers/adminValidator');

router.post('/add-permission', authMiddleware.verifyToken, permissionAddValidator, permissionController.addPermission);

module.exports = router;