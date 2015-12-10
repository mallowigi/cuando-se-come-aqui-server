var express = require('express');
var router = express.Router();
var HomeCtrl = require('../controllers/HomeController');

/* GET home page. */
router.get('/', HomeCtrl.index);

module.exports = router;
