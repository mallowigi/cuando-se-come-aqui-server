/**
 * Created by eliorb on 10/12/2015.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').Strategy;

var secrets = require('./secrets');

var User = require('../models/User');

// Serialize
passport.serializeUser(function (user, done){
  done(null, user.id);
});

// When deserializing, find by id
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  })
});

/**
 * Sign in with email and password
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {
  email = email.toLowerCase();

  User.findOne({ email: email }, function(err, user) {
    if (!user) {
      return done(null, false, { message: 'Email ' + email + ' not found'});
    }
    user.comparePassword(password, function(err, isMatch) {
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid email or password.' });
      }
    });
  });
}));

/**
 * Sign in with Facebook
 */
//passport.use(new FacebookStrategy(secrets.facebook, function(req, accessToken, refreshToken, profile, done) {
//  if (req.user) {
//    User.findOne({ facebook: profile.id }, function(err, existingUser) {
//      if (existingUser) {
//        req.flash('errors', { msg: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
//        done(err);
//      } else {
//        User.findById(req.user.id, function(err, user) {
//          user.facebook = profile.id;
//          user.tokens.push({ kind: 'facebook', accessToken: accessToken });
//          user.profile.name = user.profile.name || profile.displayName;
//          user.profile.gender = user.profile.gender || profile._json.gender;
//          user.profile.picture = user.profile.picture || 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
//          user.save(function(err) {
//            req.flash('info', { msg: 'Facebook account has been linked.' });
//            done(err, user);
//          });
//        });
//      }
//    });
//  } else {
//    User.findOne({ facebook: profile.id }, function(err, existingUser) {
//      if (existingUser) {
//        return done(null, existingUser);
//      }
//      User.findOne({ email: profile._json.email }, function(err, existingEmailUser) {
//        if (existingEmailUser) {
//          req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.' });
//          done(err);
//        } else {
//          var user = new User();
//          user.email = profile._json.email;
//          user.facebook = profile.id;
//          user.tokens.push({ kind: 'facebook', accessToken: accessToken });
//          user.profile.name = profile.displayName;
//          user.profile.gender = profile._json.gender;
//          user.profile.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
//          user.profile.location = (profile._json.location) ? profile._json.location.name : '';
//          user.save(function(err) {
//            done(err, user);
//          });
//        }
//      });
//    });
//  }
//}));
//
///**
// * Sign in with Google.
// */
//passport.use(new GoogleStrategy(secrets.google, function(req, accessToken, refreshToken, profile, done) {
//  if (req.user) {
//    User.findOne({ google: profile.id }, function(err, existingUser) {
//      if (existingUser) {
//        req.flash('errors', { msg: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
//        done(err);
//      } else {
//        User.findById(req.user.id, function(err, user) {
//          user.google = profile.id;
//          user.tokens.push({ kind: 'google', accessToken: accessToken });
//          user.profile.name = user.profile.name || profile.displayName;
//          user.profile.gender = user.profile.gender || profile._json.gender;
//          user.profile.picture = user.profile.picture || profile._json.image.url;
//          user.save(function(err) {
//            req.flash('info', { msg: 'Google account has been linked.' });
//            done(err, user);
//          });
//        });
//      }
//    });
//  } else {
//    User.findOne({ google: profile.id }, function(err, existingUser) {
//      if (existingUser) {
//        return done(null, existingUser);
//      }
//      User.findOne({ email: profile.emails[0].value }, function(err, existingEmailUser) {
//        if (existingEmailUser) {
//          req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.' });
//          done(err);
//        } else {
//          var user = new User();
//          user.email = profile.emails[0].value;
//          user.google = profile.id;
//          user.tokens.push({ kind: 'google', accessToken: accessToken });
//          user.profile.name = profile.displayName;
//          user.profile.gender = profile._json.gender;
//          user.profile.picture = profile._json.image.url;
//          user.save(function(err) {
//            done(err, user);
//          });
//        }
//      });
//    });
//  }
//}));


/**
 * Login Required middleware.
 */
exports.isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = function(req, res, next) {
  var provider = req.path.split('/').slice(-1)[0];

  if (_.find(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect('/auth/' + provider);
  }
};
