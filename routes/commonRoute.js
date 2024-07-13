const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware');

const {  } = require('../helpers/adminValidator');

// category routes
router.post('/add-category', auth,);

module.exports = router;