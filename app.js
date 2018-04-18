var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Promise = require('bluebird');
var indexRouter = require('./routes/index');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/daffodilDBTest');
var utility = require('./lib/utility');
var path = require('path');
var jsonParser = require('./lib/jsonBodyParser');
var urlEncodedBodyParser = require('./lib/urlEncodedBodyParser');
var cors = require('cors');
var app = express();
// allow cross origin
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
// parse json body
// app.use(jsonParser());
app.use(jsonParser({limit: '50mb'}));

// parse urlEncoded data
// app.use(urlEncodedBodyParser({ extended: true }));
app.use(urlEncodedBodyParser({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// mount roots
utility.walkModulesSync(path.join(__dirname, 'routes'), require('./lib/Route'), function (route) {
    route.mount(app);
});
app.use('/', indexRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// handle errors
app.use(require('./lib/errorHandler'));


module.exports = app;
