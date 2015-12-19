var passport = require('passport');
var Q = require('Q');
var crypto = require('crypto');
var Mailgun = require('mailgun').Mailgun;

/**
 * Generate the UsersController
 * @requires secrets The secrets
 * @requires {User} The User Model
 */
exports = module.exports = function UsersControllerFactory (secrets, routes, User) {

  // Init Mailgun
  var mailgun = new Mailgun(secrets.mailgun.key);

  /**
   * Users Controller
   * @constructor
   */
  function UsersController () {

  }

  /**
   * Render the login page
   * @param req
   * @param res
   */
  UsersController.prototype.login = function login (req, res) {
    res.render('account/login', {title: 'Login'});
  };

  /**
   * Post a login request
   * @param req
   * @param res
   * @param next
   */
  UsersController.prototype.postLogin = function postLogin (req, res, next) {
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
        return res.redirect(routes.build('login'));
      }

      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        req.flash('success', {msg: 'Success! You are logged in.'});
        res.redirect(req.session.returnTo || routes.build('home'));
      });
    })(req, res, next);
  };

  /**
   * Logout and Render the logout page
   * @param req
   * @param res
   * @param next
   */
  UsersController.prototype.logout = function logout (req, res, next) {
    req.logout();
    res.redirect(routes.build('welcome'));
  };

  /**
   * Render the signup page
   * @param req
   * @param res
   * @param next
   */
  UsersController.prototype.signup = function signup (req, res, next) {
    res.render('account/signup', {title: 'Sign Up'});
  };

  /**
   * Sign up an user
   * @param req
   * @param res
   * @param next
   */
  UsersController.prototype.postSignup = function postSignup (req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
      req.flash('errors', errors);
      return res.redirect(routes.build('signup'));
    }

    var user = new User({
      email: req.body.email,
      password: req.body.password
    });

    User.findOne({email: req.body.email}).exec()
      .then(function (existingUser) {
        if (existingUser) {
          req.flash('errors', {msg: 'There is already an account with that address'});
          return res.redirect(routes.build('signup'));
        }
        return existingUser;
      })
      .then(function () {
        return user.save()
          .then(function () {
            return Q.ninvoke(req, 'logIn', user);
          })
          .then(function () {
            return res.redirect(routes.build('home'));
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

  /**
   * Render the forgot page
   * @param req
   * @param res
   * @param next
   */
  UsersController.prototype.forgot = function forgot (req, res, next) {
    return res.render('account/forgot', {title: 'Forgot your password'});
  };

  /**
   * Post a forgot password request
   * @param req
   * @param res
   * @param next
   * @returns {*}
   */
  UsersController.prototype.postForgot = function postForgot (req, res, next) {
    req.assert('email', 'Please enter a valid email address').isEmail();
    var errors = req.validationErrors();
    if (errors) {
      req.flash('errors', errors);
      return res.redirect(routes.build('forgot'));
    }

    var _token,
        _user;

    return Q.ninvoke(crypto, 'randomBytes', 16)
      .then(function (buf) {
        return buf.toString('hex');
      })
      .then(function (token) {
        _token = token;
        return User.findOne({email: req.body.email.toLowerCase()});
      })
      .then(function (user) {
        if (!user) {
          req.flash('errors', {msg: 'There is no account with this email address'});
          return res.redirect(routes.build('forgot'));
        }

        _user = user;
        user.resetPasswordToken = _token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        return user.save();
      })
      .then(function () {
        var subject = 'Reset your password';
        var body = 'You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + _token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n';

        return Q.ninvoke(mailgun, 'sendText', secrets.mailgun.user, req.body.email, subject, body);
      })
      .then(function () {
        req.flash('info', {msg: 'An email has been sent to ' + req.body.email + ' with further instructions'});
        return res.redirect(routes.build('forgot'));
      })
      .then(undefined, function (err) {
        req.flash('errors', {msg: 'An error occured when trying to reset the password'});
        return res.redirect(routes.build('forgot'));
      })
  };

  /**
   * Render the reset page for users asking for reset password
   * @param req
   * @param res
   * @param next
   * @returns {IPromise<TResult>}
   */
  UsersController.prototype.reset = function reset (req, res, next) {
    return User.findOne({resetPasswordToken: req.params.token})
      .where('resetPasswordExpires').gt(Date.now())
      .exec()
      .then(function (user) {
        if (!user) {
          req.flash('errors', {msg: 'Password reset token is invalid or has expired'});
          return res.redirect(routes.build('forgot'));
        }

        res.render('account/reset', {title: 'Password Reset'});
      })
      .then(undefined, function (err) {
        req.flash('errors', err);
        return res.redirect(routes.build('forgot'));
      })
  };

  /**
   * Post a reset password request
   * @param req
   * @param res
   * @param next
   */
  UsersController.prototype.postReset = function postReset (req, res, next) {
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirm', 'Passwords must match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
      req.flash('errors', errors);
      return res.redirect('back');
    }

    // First find the user with the given reset token
    User.findOne({resetPasswordToken: req.params.token})
      .where('resetPasswordExpires').gt(Date.now())
      .exec()
      .then(function (user) {
        if (!user) {
          req.flash('errors', {msg: 'Password reset token is invalid or has expired'});
          return res.redirect(routes.build('forgot'));
        }

        // reset the password
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        return user.save().then(function () {
          return req.logIn(user, function (err) {
            if (err) {
              return next(err);
            }
            return user;
          });
        });
      })
      .then(function () {
        var subject = 'Password change confirmation';
        var body = 'Your password has been changed';

        return Q.ninvoke(mailgun, 'sendText', secrets.mailgun.user, req.body.email, subject, body);
      })
      .then(function () {
        req.flash('success', {msg: 'Your password has been changed'});
        return res.redirect(routes.build('home'));
      })
      .then(undefined, function (err) {
        req.flash('errors', {msg: err.message});
        return res.redirect(routes.build('forgot'));
      })
  };

  return new UsersController();
};

exports['@singleton'] = true;
exports['@require'] = ['config/secrets', 'config/routes', 'models/User'];
