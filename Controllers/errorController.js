// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
//   }); 
  
//   // error handler
//   app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     // res.locals.message = err.message;
//     // res.locals.error = req.app.get('env') === 'development' ? err : {};
  
//     // render the error page
//     res.status(err.status || 500);
//     res.json({
//       status:'fail',
//       message:err.message
//     })
//   });





exports.errorCreate = function(req, res, next) {
    next(createError(404));
  }; 

  

exports.errormsg = function(err, req, res, next) {
    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    if(err.message === 'invalid signature') 
    res.json({
      status:'fail',
      message:"Invalid Token Please Login Again!"
    })
    if(err.message === 'jwt expired') 
    res.json({
      status:'fail',
      message:"Your Token has Expired. Please login again!"
    })
    
    res.status(err.status || 500);
    res.json({
      status:'fail',
      message:err.message
    })
  };

  


  
// module.exports = (err, req, res, next) =>{
    
//     err.status = err.status || 'error';
   
//     res.status(err.status || 500);
//     res.json({
//       message:err.message,
//     })
//   }; 
  
