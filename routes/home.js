var express = require('express');
var router = express.Router();
var HomeCtrl = require('../controllers/HomeController');
var UserCtrl = require('../controllers/UsersController');

/* GET home page. */
router.get('/', HomeCtrl.index);

// Login page
router.get('/login', HomeCtrl.redirectLoggedIn, UserCtrl.login);
router.post('/login', UserCtrl.postLogin);

router.get('/logout', UserCtrl.logout);

router.get('/signup', HomeCtrl.redirectLoggedIn, UserCtrl.signup);
router.post('/signup', UserCtrl.postSignup);

router.get('/forgot', HomeCtrl.redirectLoggedIn, UserCtrl.forgot);
router.post('/forgot', UserCtrl.postForgot);

router.get('/reset/:token', HomeCtrl.redirectLoggedIn, UserCtrl.reset);
router.post('/reset/:token', UserCtrl.postReset);

module.exports = router;
