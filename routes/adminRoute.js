const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const permissionController = require('../controllers/admin/permissionController')

const { permissionAddValidator, permissionDeleteValidator } = require('../helpers/adminValidator');

router.post('/add-permission', authMiddleware.verifyToken, permissionAddValidator, permissionController.addPermission);
router.get('/get-permission', authMiddleware.verifyToken, permissionController.getPermissions);
router.get('/delete-permission', authMiddleware.verifyToken, permissionDeleteValidator, permissionController.deletePermissions);

module.exports = router;