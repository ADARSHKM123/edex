var createError = require('http-errors');
const morgan = require('morgan');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs=require('express-handlebars');
const AppError = require('./Util/appError');
const globalErrorHandler = require('./Controllers/errorController');


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
app.use('/api/v1/products/users', usersRouter); 

app.all('*',(req,res,next)=>{

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler)

// error handler

module.exports = app;
