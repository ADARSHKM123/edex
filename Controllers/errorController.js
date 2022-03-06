
module.exports = (err, req, res, next) =>{
    
    err.status = err.status || 'error';
   
    res.status(err.status || 500);
    res.json({
      message:err.message,
    })
  }; 
  