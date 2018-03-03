const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const expressSession = require('express-session');
const cors = require('cors');
const lusca = require('lusca');
const flash = require('express-flash');
const expressValidator = require('express-validator');
const errorHandler = require('errorhandler');
const sass = require('node-sass-middleware');
const Router = require('named-routes');

// config the ioc
const ioc = require('./config/ioc');

// App config
const secrets = ioc.create('config/secrets');
const passportConf = ioc.create('config/passport');

// Load express
const app = express();

// connect to the database
const env = process.env.NODE_ENV || 'DEVELOPMENT';
mongoose.connect(secrets.db);
mongoose.connection.on('error', () => {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middlewares
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use(express.static(path.join(__dirname, 'public')));


// ROUTES
const router = new Router();
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
require('./routes/authRoutes')(app);
