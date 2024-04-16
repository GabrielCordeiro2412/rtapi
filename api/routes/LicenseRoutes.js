const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middlewares/auth')

const LicenseController = require('../controllers/LicenseController');

router
    .get('/license/check', jwtMiddleware, LicenseController.checkLicense)

module.exports = router;
