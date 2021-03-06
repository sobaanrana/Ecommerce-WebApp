var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var ordersRouter = require('./routes/orders');
var contactRouter = require('./routes/contactus')

var mongoose = require('mongoose');
var config = require('config');
//const bodyparser = require('body-parser);
const cloudinary = require('cloudinary');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(bodyparser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/contact',contactRouter);

//Setting up cloudinary configuration
cloudinary.config({
  cloud_name : config.get("cloudinary_cloud_name"),
  api_key : config.get("cloudinary_api_key"),
  api_secret : config.get("cloudinary_api_secret")
});


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
