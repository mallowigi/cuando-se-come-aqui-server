/**
 * Created by eliorb on 10/12/2015.
 */
exports.index = function home (req, res) {
  if (!req.user) {
    return res.redirect('/login');
  }
  res.render('home', {title: 'Home'});
};

exports.redirectLoggedIn = function redirectLoggedIn (req, res, next) {
  if (req.user && req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
};
