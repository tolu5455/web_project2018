var express = require('express');
var router = express.Router();
var auth = require("../controllers/AuthController.js");

//router.get('/', auth.home);

// route to register page
router.get('/register', auth.register);

// route for register action
router.post('/register', auth.doRegister);

router.get('/verify', auth.verify);
router.get('/verify2', auth.verify2);
// route to login page
router.get('/login', auth.login);

// route for login action
router.post('/login', auth.doLogin);

// route for logout action
router.get('/logout', auth.logout);

router.get('/forgot', auth.forgot);

router.post('/retrieve', auth.retrieve)

router.post('/themtk', auth.themtk);

router.post('/xoatk', auth.xoatk)

router.post('/suatk', auth.suatk)

module.exports = router;