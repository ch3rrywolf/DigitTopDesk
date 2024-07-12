const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware');
const permissionController = require('../controllers/admin/permissionController')

const { onlyAdminAccess } = require('../middlewares/adminMiddleware');
const { permissionAddValidator, permissionDeleteValidator, permissionUpdateValidator } = require('../helpers/adminValidator');

router.post('/add-permission', auth.verifyToken , onlyAdminAccess, permissionAddValidator, permissionController.addPermission);
router.get('/get-permission', auth.verifyToken, onlyAdminAccess, permissionController.getPermissions);
router.post('/delete-permission', auth.verifyToken, onlyAdminAccess, permissionDeleteValidator, permissionController.deletePermissions);
router.post('/update-permission', auth.verifyToken, onlyAdminAccess, permissionUpdateValidator, permissionController.updatePermissions);

module.exports = router;