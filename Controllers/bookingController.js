const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const catchAsync = require('../Util/catchAsync');
const AppError = require('../Util/appError');
const handleFactor = require('./handlefactory');
const Product =require('../Models/productModel');
const Cart =require('../Models/cartItemsModel');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked tour
  const cart = await Cart.findById(req.params.cartId);

 let verity =cart.products;
 console.log(verity);
const productDetails = verity.map((el,i)=>{ 
  return({
     name :verity[i].productId.name,
     description : verity[i].productId.description,
     images : [`${req.protocol}://${req.get('host')}/img/${verity[i].productId.image}`],
     amount : (verity[i].quantity * verity[i].productId.price)*100,
     currency: 'inr',
     quantity :verity[i].quantity
  })
})

  //2)Create Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'], 
    success_url: `${req.protocol}://${req.get('host')}/api/v1/user`,
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


