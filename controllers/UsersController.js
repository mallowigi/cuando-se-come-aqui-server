var passport = require('passport');
var Q = require('q');

exports.login = function (req, res) {
  if (req.user) {
    return res.redirect('/');
  }

  res.render('account/login', {title: 'Login'});
};

exports.postLogin = function (req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/login');
  }

  // authenticate
  var auth = Q.ninvoke(passport, 'authenticate', 'local')
    .then(function (user, info) {
      console.log(user, info);
      return res.redirect('/');
    })
    .catch(function (err) {
      next(err);
    });

  return auth(req, res, next);


};
