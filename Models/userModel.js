const mongoose = require('mongoose');
const validator= require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Cart =require('../Models/cartItemsModel');


const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please tell us your name!']
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: String,
    role: {
      type: String,
      enum: ['user', 'guide', 'lead-guide', 'admin'],
      default: 'user'
    },
    mobile:{
      type:Number,
      required:[true,'Please Provide Your Mobile Number']
    },
    Address:{
      type:String,
      required:[true,'Please Provide Your Address']
    },
    pin:{
      type:Number,
      required:[true,'Please Provide Your Mobile Number'],
      min:[4,'Enter a valid Pin']
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function(el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!'
      }
    },
    cartId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Cart'
    },
    passwordChangedAt: Date, 
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false
    }
  });
  
  userSchema.pre(/^find/,function(next){
    this.populate({path:'cartId'});
    next()
  })

  // userSchema.pre(/^find/, async function(next){
  //   console.log(this.cart);
  //   // const newcart=await Cart.findById({this.cart});
  //   // console.log(newcart);
  //   // this.cart = newcart;
  //   next()
  // })


userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});



// userSchema.pre(/^find/,async function(next){
//   console.log(this.id);
//  const cart = await Cart.find({user:this.id});
//  console.log(cart);
//   next()
// }) 


userSchema.pre(/^find/, function(next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});


  userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,12);
    this.passwordConfirm = undefined;
    next();
  })


 userSchema.methods.correctPassword =async function(candidatePassword,userPassword){
   return await bcrypt.compare(candidatePassword,userPassword);
 }


 userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};


userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

  const User = mongoose.model('User',userSchema)

  module.exports = User;