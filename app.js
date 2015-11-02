var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var express   = require('express')
    , http    = require('http')
    , async   = require('async')
    , multer  = require('multer')
    , upload  = multer({ dest: './uploads/' })
    , easyimg = require('easyimage')
    , _       = require('lodash');

var cv      = require('opencv');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(express.bodyParser({uploadDir:'./uploads'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// MIME types for image uploads
var exts = {
    'image/jpeg': '.jpg',
    'image/png' : '.png',
    'image/gif' : '.gif'
};

//app.all('/', routes);
app.use('/', routes);
app.use('/users', users);

app.post('/upload', upload.single('file'), function(req, res, next){

    console.log(">>>>>>>>>>1");
    console.log(req.body);
    console.log(req.body.file);
    console.log(">>>>>>>>>>2");

    //var filename = req.body.file
    //// and source and destination filepaths
    //    , src = __dirname + '/' + req.file.path
    //    , dst = __dirname + '/public/images/' + filename;

});

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