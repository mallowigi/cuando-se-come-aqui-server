var passport = require('passport');
var User = require('../models/User');
var Q = require('Q');

exports.login = function login (req, res) {
  res.render('account/login', {title: 'Login'});
};

exports.postLogin = function postLogin (req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/login');
  }

  // authenticate
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('errors', {msg: info.message});
      return res.redirect('/login');
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      req.flash('success', {msg: 'Success! You are logged in.'});
      res.redirect(req.session.returnTo || '/');
    });
  })(req, res, next);
};


exports.logout = function logout (req, res, next) {
  req.logout();
  res.redirect('/');
};

exports.signup = function signup (req, res, next) {
  res.render('account/signup', {title: 'Sign Up'});
};

exports.postSignup = function postSignup (req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/signup');
  }

  var user = new User({
    email: req.body.email,
    password: req.body.password
  });

  User.findOne({email: req.body.email}).exec()
    .then(function (existingUser) {
      if (existingUser) {
        req.flash('errors', {msg: 'There is already an account with that address'});
        return res.redirect('/signup');
      }
      return existingUser;
    })
    .then(function () {
      return user.save()
        .then(function () {
          return Q.ninvoke(req, 'logIn', user);
        })
        .then(function () {
          return res.redirect('/');
        })
        .then(undefined, function (err) {
          return next(err);
        })
        ;
    })
    .then(undefined, function (err) {
      req.flash('errors', {msg: 'There was a problem registering this user: '});
      return next(err);
    })
};

exports.forgot = function forgot (req, res, next) {
  return res.render('account/forgot', {title: 'Forgot your password'});
};

exports.postForgot = function postForgot (req, res, next) {

};
