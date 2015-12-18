/**
 * Created by eliorb on 10/12/2015.
 */
var ioc = require('electrolyte');

ioc.use('config', ioc.node('config'));
ioc.use('handlers', ioc.node('controllers'));
ioc.use('models', ioc.node('models'));
ioc.use(ioc.node('.'));

module.exports = ioc;
