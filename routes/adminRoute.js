const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware');
const permissionController = require('../controllers/admin/permissionController');
const roleController = require('../controllers/admin/roleController');
const routerController = require('../controllers/admin/routerController');

const { onlyAdminAccess } = require('../middlewares/adminMiddleware');
const { permissionAddValidator, permissionDeleteValidator, permissionUpdateValidator, storeRoleValidator, addRouterPermissionValidator, getRouterPermissionValidator } = require('../helpers/adminValidator');

// permission routes
router.post('/add-permission', auth.verifyToken , onlyAdminAccess, permissionAddValidator, permissionController.addPermission);
router.get('/get-permission', auth.verifyToken, onlyAdminAccess, permissionController.getPermissions);
router.post('/delete-permission', auth.verifyToken, onlyAdminAccess, permissionDeleteValidator, permissionController.deletePermissions);
router.post('/update-permission', auth.verifyToken, onlyAdminAccess, permissionUpdateValidator, permissionController.updatePermissions);

// role routes
router.post('/store-role', auth.verifyToken, onlyAdminAccess, storeRoleValidator, roleController.storeRole);
router.get('/get-roles', auth.verifyToken, onlyAdminAccess, roleController.getRoles);

// router permission routes
router.post('/add-router-permission', auth.verifyToken, onlyAdminAccess, addRouterPermissionValidator, routerController.addRouterPermission);
router.get('/get-router-permissions', auth.verifyToken, onlyAdminAccess, getRouterPermissionValidator, routerController.getRouterPermissions);

module.exports = router;