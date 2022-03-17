const User = require('../Models/userModel');
const catchAsync = require('../Util/catchAsync');
const createError = require('http-errors');
const async = require('hbs/lib/async');


const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
  };
  

exports.getAllusers = catchAsync(async(req,res,next)=>{
    const users =await User.find();
    res.status(200).json({
        status:'success',
        data:{
            users
        }
    })
});



exports.updateMe = catchAsync(async (req, res, next) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        createError(
          'This route is not for password updates. Please use /updateMyPassword.',
          400
        )
      );
    }
  
    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email');
  
    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  });
  

  exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });
  
    res.status(204).json({
      status: 'success',
      data: null
    });
  });


exports.createUser = (req,res,next)=>{
    res.status(200).json({
        status:'fail',
        message:'This route is not yet defined'
    })
}


exports.getUser =catchAsync(async(req,res,next)=>{
  const user =await User.findById(req.params.id);
    res.status(200).json({
        status:'success',
        data:user
    })
})


exports.updateUser = (req,res,next)=>{
    res.status(200).json({
        status:'fail',
        message:'This route is not yet defined'
    })
}

exports.deleteUser = (req,res,next)=>{
    res.status(200).json({
        status:'fail',
        message:'This route is not yet defined'
    })
}



exports.login = catchAsync(async (req, res, next) => {
  res.status(200).render('users/login');
});
