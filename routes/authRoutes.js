var express = require('express');
var ioc = require('electrolyte');
var passport = require('passport');

exports = module.exports = function (router) {

  router.get('/auth/facebook', 'facebook', passport.authenticate('facebook', {scope: ['email', 'user_location']}));
  router.get('/auth/facebook/callback', 'facebookCb', passport.authenticate('facebook', {failureRedirect: '/login'}), function (req, res) {
    res.redirect(req.session.returnTo || '/');
  });

  router.get('/auth/google', 'google', passport.authenticate('google', { scope: 'profile email' }));
  router.get('/auth/google/callback', 'googleCb', passport.authenticate('google', {failureRedirect: '/login'}), function (req, res) {
    res.redirect(req.session.returnTo || '/');
  });

  return router;
};
