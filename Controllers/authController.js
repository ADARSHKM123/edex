const User = require('../Models/userModel');
const catchAsync = require('../Util/catchAsync');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const AppError = require('../Util/appError');
const async = require('hbs/lib/async');
const {promisify} = require('util');
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


//Login/////////////////////////////////////////////
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



exports.protect=catchAsync(async(req,res,next)=>{
    let token;
   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
   {
     token =req.headers.authorization.split(' ')[1];

   }    
   console.log(`token:${token}`);
   if(!token){
       return next(createError('You are not logged in! please login to get access',401))
   }
 
   //Verification Token
  const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
   
  //Check if user still exist
   const currentUser =await User.findById(decoded.id);
   if (!currentUser) { 
    return next(
      createError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }


   // 4) Check if user changed password after the token was issued
   if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      createError('User recently changed password! Please log in again.', 401)
    );
  }

// GRANT ACCESS TO PROTECTED ROUTE
req.user = currentUser;
   next();
})       




exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        createError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};