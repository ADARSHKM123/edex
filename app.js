var createError = require('http-errors');
const morgan = require('morgan');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs=require('express-handlebars');


var productRoutes = require('./routes/productRoutes');
var usersRouter = require('./routes/users');

var app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
  
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({extname: 'hbs',defaultLayout: 'layout', layoutsDir:__dirname + '/views/layout',partialssDir:__dirname + '/views/partials'}));

app.use(logger('dev'));         
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());  
app.use(express.static(path.join(__dirname, 'public'))); 
 
app.use('/', productRoutes); 
app.use('/users', usersRouter); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
