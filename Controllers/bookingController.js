

const stripe = require('stripe')('sk_test_51Ki0l3SAJq8NpmmnpxmANEjsEG0ep1sm7fsdpmISOIeOnA2LRkpSqh1aCAt99njikdBXzTDirM0LEE5kAhkMqXr8000QRw38Ny');
const catchAsync = require('../Util/catchAsync');
const AppError = require('../Util/appError');
const handleFactor = require('./handlefactory');
const Product =require('../Models/productModel');
const Cart =require('../Models/cartItemsModel');
// const Booking = require('../models/bookingModel'); 

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked tour
  
  const cart = await Cart.findById(req.params.cartId);
// console.log(cart);

//  console.log(cart.products);
 let verity =cart.products;
//  console.log(mass.productId._id);
 console.log(verity[0].productId.name)
 const name =verity[0].productId.name;
 const description = verity[0].productId.description;
 const images = verity[0].productId.image;
 const quantity = verity[0].quantity;
 const price = verity[0].productId.price;
 console.log(images);

  //2)Create Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'], 
    success_url: `http://localhost:3000/api/v1/user`,
    //   }&user=${req.user.id}&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/user/mycart`,
    customer_email: req.user.email, 
    client_reference_id: req.params.cartId,
    line_items: [
      {
        name: name,
        description: description,
        images: [`http://localhost:3000/img/${images}`],
        amount: price*100,
        currency: 'inr',
        quantity: quantity
      }
    ]
  });

  //3)Create Session as response
  res.status(200).json({
    status: 'success',
    session
  });  
  
}) 


