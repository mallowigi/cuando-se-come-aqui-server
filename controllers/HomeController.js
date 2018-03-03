/**
 * Generate the HomeController
 */
exports = module.exports = function HomeControllerFactory(secrets, routes) {

  class HomeController {
    constructor() {
    }

    /**
     * Index Action
     * @param req
     * @param res
     * @returns {*}
     */
    index(req, res) {
      if (!req.user) {
        return res.redirect(routes.build('welcome'));
      }
      return res.render('landing/index', {title: 'Home'});
    }

    /**
     * Render the welcome page
     * @param req
     * @param res
     */
    welcome(req, res) {
      return res.render('account/welcome', {title: 'Login'})
    }

    /**
     * Redirect to home if user is authenticated
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    redirectLoggedIn(req, res, next) {
      if (req.user && req.isAuthenticated()) {
        return res.redirect(routes.build('home'));
      }
      return next();
    }
  }

  return new HomeController();
};

exports['@singleton'] = true;
exports['@require'] = ['config/secrets', 'config/routes'];
