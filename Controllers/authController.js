const User = require('../Models/userModel');
const catchAsync = require('../Util/catchAsync');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const AppError = require('../Util/appError');
const async = require('hbs/lib/async');
const {promisify} = require('util');
// const async = require('hbs/lib/async');
const sendEmail =require('../Util/email');
const crypto= require('crypto');


const signToken=id=>{
  return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  
  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined; 

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};


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
    createSendToken(newUser,200,res);
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
    createSendToken(user,200,res);
    //Send Cookie
})


///////////////////// ISLOGGEDIN //////////////////////////////////////////////
// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued 
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      req.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};



//Logout/////////////////////////////////////////
exports.logout = (req, res, next) => {
  res.cookie('jwt', 'logout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  })
  res.status(200).json({
    status: 'success'
  })
}



//PROTECT/////////////////////////////////////////////////////////////////
exports.protect=catchAsync(async(req,res,next)=>{
    let token;
   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
   {
     token =req.headers.authorization.split(' ')[1];

   }else if(req.cookies.jwt){
     token = req.cookies.jwt;
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



//REstrict To ////////////////////////////////////////////////////////
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        createError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};




///////////////////// FORDOT PASSWORD //////////////////////////////////////////////

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  
    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;
  
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
  
    try {
      await sendEmail({
        email: user.email,
        subject: 'Your password reset token (valid for 10 min)',
        message
      });
  
      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!'
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
  
      return next(
        createError('There was an error sending the email. Try again later!',err),
        500
      );
    }
});



///////////////////// RESET PSSWORD //////////////////////////////////////////////

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(createError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
});



///////////////////Updated Password ////////////////////////////////////

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});
