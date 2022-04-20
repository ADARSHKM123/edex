
exports.errorCreate = function(req, res, next) {
    next(createError(404));
  }; 

  

exports.errormsg = function(err, req, res, next) {
  if(err.message === 'createError is not defined'){
    const message = 'Page not found!'
    res.status(500).render('error',{message})
  }
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
    if(err.message === 'jwt malformed'){
      const message = 'You are not loggedIn, Please Perform this action after login'
      res.status(500).render('error',{message})
    }
    if(err.message === 'You are not logged in! please login to get access'){
      const message = 'You are not loggedIn, Please Perform this action after login'
      res.status(500).render('error',{message})
    }
    
    res.status(err.status || 500);
    res.json({
      status:'fail',
      message:err.message
    }) 
  };

  
