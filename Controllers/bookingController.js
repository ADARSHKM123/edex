const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const stripe = require('stripe')('sk_test_51Ki0l3SAJq8NpmmnpxmANEjsEG0ep1sm7fsdpmISOIeOnA2LRkpSqh1aCAt99njikdBXzTDirM0LEE5kAhkMqXr8000QRw38Ny');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const catchAsync = require('../Util/catchAsync');
const AppError = require('../Util/appError');
const handleFactor = require('./handlefactory');
const Product =require('../Models/productModel');
const Cart =require('../Models/cartItemsModel');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked tour
  const cart = await Cart.findById(req.params.cartId);

 let verity =cart.products;
const productDetails = verity.map((el,i)=>{
  return({
     name :verity[i].productId.name,
     description : verity[i].productId.description,
     images : [`http://localhost:3000/img/${verity[i].productId.image}`],
     amount : (verity[i].quantity * verity[i].productId.price)*100,
     currency: 'inr',
     quantity :verity[i].quantity
  })
})

  //2)Create Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'], 
    success_url: `http://localhost:3000/api/v1/user`,
    cancel_url: `${req.protocol}://${req.get('host')}/user/mycart`,
    customer_email: req.user.email, 
    client_reference_id: req.params.cartId,
    line_items: productDetails
  });

  res.status(200).json({ 
    status: 'success',
    session
  });   
  
}) 


