// const { query } = require('express');
const Review = require('./../models/reviewModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');

exports.setBookUserIds = (req, res, next) => {
    //allow nested routes
    if(!req.body.book) req.body.book = req.params.bookId;
    if(!req.body.user) req.body.user = req.user.id;
    next();
};

// exports.createReview = catchAsync(async (req, res, next) => {
//     const review = await Review.create()

//     res.status(201).json({
//         status: 'success',
//         data: {
//             data
//         }
//     });
// })

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);

