var express = require('express');
var router = express.Router();
var HomeCtrl = require('../controllers/HomeController');
var UserCtrl = require('../controllers/UsersController');

/* GET home page. */
router.get('/', HomeCtrl.index);

// Login page
router.get('/login', UserCtrl.login);
router.post('/login', UserCtrl.postLogin);

module.exports = router;
