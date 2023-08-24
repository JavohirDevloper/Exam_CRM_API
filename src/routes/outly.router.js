const express = require('express');
const outlayController = require('../controllers/outly.contr');
const isLoggedIn = require('../../shared/auth/is-loggedin')
const router = express.Router();

router.get('/outlay',isLoggedIn,  outlayController.getAllOutlays);
router.post('/outlay',isLoggedIn,  outlayController.createOutlay);

module.exports = router;