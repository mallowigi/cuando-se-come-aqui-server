var express = require('express');
var ioc = require('electrolyte');
var HomeCtrl = ioc.create('handlers/HomeController');
var UserCtrl = ioc.create('handlers/UsersController');

exports = module.exports = function (router) {
  router.get('/', 'home', HomeCtrl.index);
  router.get('/welcome', 'welcome', HomeCtrl.redirectLoggedIn, HomeCtrl.welcome);

  // Login page
  router.get('/login', 'login', HomeCtrl.redirectLoggedIn, UserCtrl.login);
  router.post('/login', 'login', UserCtrl.postLogin);

  router.get('/logout', 'logout', UserCtrl.logout);

  router.get('/signup', 'signup', HomeCtrl.redirectLoggedIn, UserCtrl.signup);
  router.post('/signup', 'signup', UserCtrl.postSignup);

  router.get('/forgot', 'forgot', HomeCtrl.redirectLoggedIn, UserCtrl.forgot);
  router.post('/forgot', 'forgot', UserCtrl.postForgot);

  router.get('/reset/:token', 'token', HomeCtrl.redirectLoggedIn, UserCtrl.reset);
  router.post('/reset/:token', 'token', UserCtrl.postReset);

  return router;
};
