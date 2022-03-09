const User = require('../Models/userModel');
const catchAsync = require('../Util/catchAsync');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const AppError = require('../Util/appError');
// const async = require('hbs/lib/async');


const signToken=id=>{
  return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

exports.signup =catchAsync(async(req,res,next)=>{
    const newUser =await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        passwordChangedAt: req.body.passwordChangedAt,
        mobile:req.body.mobile,
        Address:req.body.Address,
        pin:req.body.pin,
        role: req.body.role
    })
    const token = signToken(newUser._id);
    res.status(200).json({
        status:'success',
        token,
        data:{
            newUser
        }
    })
});



exports.login=catchAsync(async(req,res,next)=>{
    const {email,password} =  req.body;

    if(!email || !password){
      return next(createError('please provide email and password',400));
    }
    const user = await User.findOne({email:email}).select('+password');
    // const correct =await user.correctPassword(password,user.password);
    if(!user || !await user.correctPassword(password,user.password)){
        return next(createError('Incorrect email or password'),400);
    }
    const token=signToken(user._id);
    res.status(200).json({
        status:'success',
        token
    })

})
