// const dotenv = require('dotenv')
// const path = require('path');

// dotenv.config({path:'./config.env'})
// console.log(process.env.NAME);


exports.home = (req,res,next)=>{
    res.render('index',{admin:false});
}

