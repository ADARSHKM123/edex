const createError = require('http-errors');
const morgan = require('morgan');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('express-handlebars');
const AppError = require('./Util/appError');
const globalErrorHandler = require('./Controllers/errorController');
const compression = require('compression');

const productRoutes = require('./routes/productRoutes');
const usersRouter = require('./routes/userRoutes');
const addToCartRouter = require('./routes/addToCartRouter');
const adminRouter = require('./routes/adminRouter');
const userCartRouter = require('./routes/userCartRouter');
const viewRouter = require('./routes/viewRouter');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRouter');

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const Handlebars = require('handlebars')






const { error } = require('console');


const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}




// view engine setup 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layout', partialssDir: __dirname + '/views/partials', handlebars: allowInsecurePrototypeAccess(Handlebars) }));



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(compression()); 
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  // console.log(req.cookies);
  next()
})


app.use('/api/v1/products', productRoutes);
app.use('/api/v1/cart', addToCartRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/mycart', userCartRouter);
app.use('/api/v1/user', viewRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/booking', bookingRouter);


app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  const err = error.message
  let msg;
  if (err === 'jwt must be provided')
    msg = `You are not loggedIn`
  res.status(500).render('error', { msg })
})

app.use(globalErrorHandler.errorCreate);
app.use(globalErrorHandler.errormsg);


module.exports = app;
