const createError = require('http-errors');
const morgan = require('morgan');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs=require('express-handlebars');
const AppError = require('./Util/appError');
const globalErrorHandler = require('./Controllers/errorController');


const productRoutes = require('./routes/productRoutes');
const usersRouter = require('./routes/userRoutes');
const addToCartRouter = require('./routes/addToCartRouter');  
const { error } = require('console');


const app = express();

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
app.use('/api/v1/users', usersRouter); 
app.use('/api/v1/addToCart', addToCartRouter);  

// app.all('*',(req,res,next)=>{

//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// error handler
app.use(globalErrorHandler.errorCreate);
app.use(globalErrorHandler.errormsg);





module.exports = app;
