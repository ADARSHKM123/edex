const Product = require('../Models/productModel');
const fs = require('fs');
const async = require('hbs/lib/async');

// const products =JSON.parse(fs.readFileSync(`dev-data/products.json`))



//Home
exports.home =async (req,res,next)=>{
    try{
        console.log(req.query);
        
        const products = await Product.find();
            res.status(200).json({
                results:products.length,
                data:{
                    products
                }
            })
    }catch(err){
        res.status(400).json({
            status:'fail',
            message:err.message
        })
    }
}




// exports.home = async (req, res) => {
//     try {
//       //1A)Filtering//////////////////////////////////////////////////
//       const queryObj = { ...req.query };
//       const excludedFields = ['page', 'sort', 'limit', 'fields'];
//       excludedFields.forEach((each) => delete queryObj[each]);
//       // console.log(req.query, queryObj);
//       // console.log(req.query, queryObj);
  
//       //1B)Advance Filtering//////////////////////////////////////////////////
//       let queryStr = JSON.stringify(queryObj);
//       queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
//       // console.log(JSON.parse(queryStr));
//       //  { duration: { gte: '5' }, difficulty: 'easy' }
//       //  { duration: { $gte: '5' }, difficulty: 'easy' }
//       // We have to replace gte to $gte and gt,lt,lte
//       // const query = Tour.find(queryObj);
//       let query = Product.find(JSON.parse(queryStr));
  
//       //2)Sorting//////////////////////////////////////////////////
//       if (req.query.sort) {
//         const sortBy = req.query.sort.split(',').join(' ');
//         console.log(`sorted: ${sortBy}`);
//         query = query.sort(sortBy);
//         //url -localhost:3000/api/v1/tours?sort=-price,ratingsAverage
//         //sort('price ratingAverage')
//       } else {
//         query = query.sort('-createdAt');
//       }
  
//       //3)Field Limiting//////////////////////////////////////////////////
//       if (req.query.fields) {
//         const fields = req.query.fields.split(',').join(' ');
//         query = query.select(fields);
//       }
//        else {
//         query = query.select('-__v');
//       }
  
//       //4)Pagination //////////////////////////////////////////////////
//       const page = +req.query.page  || 1 ;
//       const limit = +req.query.limit || 100 ;
//       const skip = (page -1) * limit;
//       //page=2&limit=10 page1 1-10, page2 11-20 
//       query = Product.find(query).skip(skip).limit(limit);
  
//       const products = await query;  
  
//       // const tours = await Tour.find()
//       //   .where('duration')
//       //   .equals(5)
//       //   .where('difficulty')
//       //   .equals('easy');
  
//       res.status(200).json({
//         status: 'success',
//         results: tours.length,
//         data: {
//           tours: products,
//         },
//       });
//     } catch (err) {
//       res.status(400).json({
//         status: 'fail',
//         message: err,
//       });
//     }
//   };

//Addproduct
exports.addProduct=async(req,res,next)=>{
    try{
        const newproduct =await Product.create(req.body);
        res.status(200).json({
            status:"Success",
            data:{
          product: newproduct
            }
        })

    }catch(err){
      res.status(400).json({
          status:'fail',
          message: err.message
      })
    }
}

//GetProduct
exports.getProduct=async(req,res,next)=>{
    try{
        const newproduct =await Product.findById(req.params.id);
        res.status(200).json({
            status:"Success",
            data:{
          product: newproduct
            }
        })

    }catch(err){
      res.status(400).json({
          status:'fail',
          message: err.message
      })
    }
}



//UpdateOne
exports.updateProduct=async(req,res,next)=>{
    try{
        const newproduct =await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
        if (!newproduct) {
            return next(new AppError('No document found with that ID', 404));
          }
      
          res.status(200).json({
            status: 'success',
            data: {
              data: newproduct
            }
          });

    }catch(err){
      res.status(400).json({
          status:'fail',
          message: err.message
      })
    }
}

//Delete Product
exports.deleteProduct=async(req,res,next)=>{
    try{
         await Product.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status:'success',
            data:null
        })

    }catch(err){ 
        res.status(400).json({
            status:'fail',
            message: err.message
        })
      }

}