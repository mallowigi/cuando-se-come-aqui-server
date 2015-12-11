var express = require('express');
var router = express.Router();
var HomeCtrl = require('../controllers/HomeController');
var UserCtrl = require('../controllers/UsersController');

/* GET home page. */
router.get('/', HomeCtrl.index);

// Login page
router.get('/login', HomeCtrl.redirect, UserCtrl.login);
router.post('/login', UserCtrl.postLogin);

router.get('/logout', UserCtrl.logout);

router.get('/signup', HomeCtrl.redirect, UserCtrl.signup);
router.post('/signup', UserCtrl.postSignup);

router.get('/forgot', HomeCtrl.redirect, UserCtrl.forgot);
router.post('/forgot', UserCtrl.postForgot);



module.exports = router;
