const catchAsync = require('../Util/catchAsync');
const createError = require('http-errors');
const APIFeatures = require('../Util/apiFeatures');
const multer = require('multer');
const AppError = require('../Util/appError');


//Multer //////////////////////////////////////////
const multerStrorage = multer.diskStorage({
  destination:(req, file, cb)=>{
     cb(null, 'public/img');
  },
  filename:(req,file,cb)=>{
    const ext= file.mimetype.split('/')[1];
     cb(null,`product-${Date.now()}.${ext}`)
  }
})

const multerFilter = (req,file,cb)=>{
  if(file.mimetype.startsWith('image')){
    cb(null,true)
  }else{
    cb(new createError('Not an Image! Please upload only images',404),false)
  }
}

const upload = multer({
  storage:multerStrorage,
  fileFilter:multerFilter 
});



exports.ProductImage = upload.single('image');



exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new createError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new createError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
 
    // let doc;
    if(req.file){
      console.log('hooooooooooooooooooooo');
      // const filteredBody = filterObj(req.body,'name','category','description','price','rating');
      req.body.image = req.file.filename;
     
    }
      const doc = await Model.create(req.body);
    console.log(req.file);
    console.log(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new createError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    // const doc = await features.query.explain();
    const doc = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      } 
    });
    // res.status(200).render('index',{admin:false,login:true})
    // res.status(200).render('product',{admin:false,login:true})
  });