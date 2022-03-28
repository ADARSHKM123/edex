const Review = require('./../models/reviewModel');
const handle =require('../Controllers/handlefactory');



exports.getReview  =  handle.getOne(Review)
exports.createReview = handle.createOne(Review)
exports.updateReview = handle.updateOne(Review)
exports.deleteReview = handle.deleteOne(Review)
exports.getAllReviews = handle.getAll(Review);