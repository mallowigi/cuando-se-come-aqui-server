/**
 * Created by eliorb on 10/12/2015.
 */
const ioc = require('electrolyte');

ioc.Container().use('config', ioc.dir('config'));
ioc.Container().use('handlers', ioc.dir('controllers'));
ioc.Container().use('models', ioc.dir('models'));
ioc.Container().use(ioc.dir('.'));

module.exports = ioc;
