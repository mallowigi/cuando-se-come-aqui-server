/**
 * Generate the HomeController
 */
exports = module.exports = function HomeControllerFactory (secrets) {
  function HomeController () {

  }

  /**
   * Index Action
   * @param req
   * @param res
   * @returns {*}
   */
  HomeController.prototype.index = function home (req, res) {
    if (!req.user) {
      return res.redirect('/login');
    }
    res.render('home', {title: 'Home'});
  };

  /**
   * Redirect to home if user is authenticated
   * @param req
   * @param res
   * @param next
   * @returns {*}
   */
  HomeController.prototype.redirectLoggedIn = function redirectLoggedIn (req, res, next) {
    if (req.user && req.isAuthenticated()) {
      return res.redirect('/');
    }
    next();
  };

  return new HomeController();
};

exports['@singleton'] = true;
exports['@require'] = ['config/secrets'];
