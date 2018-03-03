/**
 * Created by eliorb on 10/12/2015.
 */
var ioc = require('electrolyte');

ioc.use('config', ioc.dir('config'));
ioc.use('handlers', ioc.dir('controllers'));
ioc.use('models', ioc.dir('models'));
ioc.use(ioc.dir('.'));

exports = module.exports = ioc;
