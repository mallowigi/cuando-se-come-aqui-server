/**
 * Generate the HomeController
 */
exports = module.exports = function HomeControllerFactory (secrets, routes) {

  function HomeController () {
  }

  /**
   * Index Action
   * @param req
   * @param res
   * @returns {*}
   */
  HomeController.prototype.index = function home (req, res) {
    //if (!req.user) {
    //  return res.redirect(routes.build('welcome'));
    //}
    res.render('home', {title: 'Home'});
  };

  /**
   * Render the welcome page
   * @param req
   * @param res
   */
  HomeController.prototype.welcome = function welcome (req, res) {
    res.render('account/welcome', {title: 'Welcome to xxx'})
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
      return res.redirect(routes.build('home'));
    }
    next();
  };

  return new HomeController();
};

exports['@singleton'] = true;
exports['@require'] = ['config/secrets', 'config/routes'];
