const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const permissionController = require('../controllers/admin/permissionController')

const { permissionAddValidator, permissionDeleteValidator, permissionUpdateValidator } = require('../helpers/adminValidator');

router.post('/add-permission', authMiddleware.verifyToken, permissionAddValidator, permissionController.addPermission);
router.get('/get-permission', authMiddleware.verifyToken, permissionController.getPermissions);
router.post('/delete-permission', authMiddleware.verifyToken, permissionDeleteValidator, permissionController.deletePermissions);
router.post('/update-permission', authMiddleware.verifyToken, permissionUpdateValidator, permissionController.updatePermissions);

module.exports = router;