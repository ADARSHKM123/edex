const mongoose = require('mongoose');
const validator= require('validator');
const bcrypt = require('bcryptjs');


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
    passwordChangedAt: Date, 
    passwordResetToken: String,
    passwordResetExpires: Date,
    
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

  const User = mongoose.model('User',userSchema)

  module.exports = User;