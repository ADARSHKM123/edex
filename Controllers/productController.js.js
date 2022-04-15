const Product = require('../Models/productModel');
const catchAsync = require('../Util/catchAsync');
const handle = require('../Controllers/handlefactory');





exports.getProduct = handle.getOne(Product,{ path:'reviews' });
exports.addProduct = handle.createOne(Product);
exports.getAllProduct = handle.getAll(Product);
exports.updateProduct = handle.updateOne(Product);
exports.deleteProduct = handle.deleteOne(Product);


exports.productlist = catchAsync(async (req, res, next) => {
   const products = await Product.find();
   res.status(200).render('admin/view-products',{admin:true,products});
}); 

