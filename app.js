var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
//var formidable = require('express-formidable');
var multer  = require('multer');


global.info_connection = {
  host:"54.244.63.115",
  port: "3306",
  user:"lconder",
  password:"0112358",
  database:"iqbccomm_ibero"
};


global.url = 'http://intrauia.iberopuebla.mx/ServiceIberoPuebla/Service.svc';

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var login_web = require('./routes/login_web');
var business = require('./routes/business');
var business_test = require('./routes/business_test');
var agreement = require('./routes/agreement');
var student = require('./routes/student');
var files = require('./routes/files');
var promotion = require('./routes/promotion');
var promotion_business = require('./routes/promotion_business');
var branch = require('./routes/branch');
var credential = require('./routes/credential');
var map = require('./routes/map');
var report = require('./routes/report');
var categories = require('./routes/categories');
var state = require('./routes/state');
var device = require('./routes/device');
var settings = require('./routes/settings');
var rfc = require('./routes/rfc');

var app = express();
app.use(multer({ dest: 'public/temp'}));
app.locals.moment = require('moment');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({name: "session",keys: ["key-1","key-2"]}));
//app.use(formidable({ keepExtensions: true }));


app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/login_web', login_web);
app.use('/business_test', business_test);
app.use('/business', business);
app.use('/create', business);
app.use('/agreement', agreement);
app.use('/student', student);
app.use('/files', files);
app.use('/promotion', promotion);
app.use('/promotion_business', promotion_business);
app.use('/branch', branch);
app.use('/credential', credential);
app.use('/map', map);
app.use('/report', report);
app.use('/categories', categories);
app.use('/state', state);
app.use('/device', device);
app.use('/settings', settings);
app.use('/rfc', rfc);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
