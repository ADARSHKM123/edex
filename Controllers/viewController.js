const catchAsync = require('../Util/catchAsync');




exports.login = catchAsync(async (req, res, next) => {
    res.status(200).render('users/login');
  });
  