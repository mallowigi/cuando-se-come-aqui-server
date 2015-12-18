exports = module.exports = function () {
  var app = require('../app');
  return app.namedRoutes;
};
exports['@singleton'] = true;
