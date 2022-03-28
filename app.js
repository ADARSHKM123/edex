const createError = require('http-errors');
const morgan = require('morgan');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs=require('express-handlebars');
const AppError = require('./Util/appError');
const globalErrorHandler = require('./Controllers/errorController');
const ratelimit = require('express-rate-limit');

const productRoutes = require('./routes/productRoutes');
const usersRouter = require('./routes/userRoutes');
const addToCartRouter = require('./routes/addToCartRouter');  
const adminRouter = require('./routes/adminRouter');  
const userCartRouter = require('./routes/userCartRouter');
const viewRouter=require('./routes/viewRouter');
const reviewRouter = require('./routes/reviewRoutes');


const { error } = require('console');


const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// const limiter =ratelimit({
//   max:100,
//   windowMs:60*60*1000,
//   message:'Too many request from this IP, try again after 1  hour!'
// })
// app.use('/',limiter);



   
// view engine setup 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({extname: 'hbs',defaultLayout: 'layout', layoutsDir:__dirname + '/views/layout',partialssDir:__dirname + '/views/partials'}));





app.use(logger('dev'));         
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());  
app.use(express.static(path.join(__dirname, 'public'))); 


app.use((req,res,next)=>{
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  // console.log(req.cookies);
  next()
})
 
 
app.use('/', productRoutes); 
app.use('/api/v1/cart', addToCartRouter);  
app.use('/api/v1/users', usersRouter); 
app.use('/api/v1/admin', adminRouter);  
app.use('/api/v1/mycart', userCartRouter);  
app.use('/api/v1/user', viewRouter);  
app.use('/api/v1/reviews', reviewRouter);  
 


// app.all('*',(req,res,next)=>{

//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// error handler
app.use(globalErrorHandler.errorCreate); 
app.use(globalErrorHandler.errormsg);


module.exports = app;
