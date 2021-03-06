const catchAsync = require('../Util/catchAsync');
const createError = require('http-errors');
const async = require('hbs/lib/async');
const User = require('../Models/userModel');
const handle = require('../Controllers/handlefactory');


const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
  };


  exports.getMe= (req,res,next)=>{
    req.params.id = req.user.id;
    next();
  }
  

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

exports.getUser=handle.getOne(User);
// exports.getUser=handle.getOne(User,{ path:'mycart' });
exports.getAllusers = handle.getAll(User);
exports.updateUser = handle.updateOne(User);
exports.deleteUser = handle.deleteOne(User);
