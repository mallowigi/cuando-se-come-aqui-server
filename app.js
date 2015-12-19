var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var expressSession = require('express-session');
var cors = require('cors');
var lusca = require('lusca');
var flash = require('express-flash');
var expressValidator = require('express-validator');
var errorHandler = require('errorhandler');
var sass = require('node-sass-middleware');
var Router = require('named-routes');

// config the ioc
var ioc = require('./config/ioc');

// App config
var secrets = ioc.create('config/secrets');
var passportConf = ioc.create('config/passport');

// Load express
var app = express();

// connect to the database
var env = process.env.NODE_ENV || 'DEVELOPMENT';
mongoose.connect(secrets.db);
mongoose.connection.on('error', function () {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// middlewares
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(cookieParser());
app.use(cors());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  debug: true,
  outputStyle: 'expanded'
}));

// Session handling
app.use(expressSession({secret: secrets.sessionSecret, resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca({
  csrf: true,
  xframe: 'SAMEORIGIN',
  xssProtection: true
}));

// Used to display whether the user is logged in
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use(express.static(path.join(__dirname, 'public')));


// ROUTES
var router = new Router();
router.extendExpress(app);
router.registerAppHelpers(app);

// Append the route name to the locals
app.use(function (req, res, next) {
  res.locals.route = function () {
    return req.route.name;
  };
  next();
});

// error handlers
app.use(errorHandler());

exports = module.exports = app;

// Define routes here so we can have the named routes inside the controllers
require('./routes/homeRoutes')(app);
