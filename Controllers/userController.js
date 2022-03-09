const User = require('../Models/userModel');
const catchAsync = require('../Util/catchAsync');
const createError = require('http-errors');


exports.getAllusers = catchAsync(async(req,res,next)=>{
    const users =await User.find();
    res.status(200).json({
        status:'success',
        data:{
            users
        }
    })
});


exports.createUser = (req,res,next)=>{
    res.status(200).json({
        status:'fail',
        message:'This route is not yet defined'
    })
}


exports.getUser = (req,res,next)=>{
    res.status(200).json({
        status:'fail',
        message:'This route is not yet defined'
    })
}


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


