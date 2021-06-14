var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var mongoose = require('mongoose');
var config = require('config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if(err.message == 'CastError') {
    res.locals.message = 'Resource not found. Invalid:';
    res.status(400).message(res.locals.message);
  }
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Connecting MongoDB
mongoose
.connect(config.get("db"),{
    useNewUrlParser: true, 
    useUnifiedTopology:true,
    useCreateIndex: true 
  })
.then(() => console.log(`MongoDB is connected to Host ${config.get("host")}`))
.catch((error) => console.log(error.message))



module.exports = app;
