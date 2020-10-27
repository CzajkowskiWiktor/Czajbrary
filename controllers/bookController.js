const { query } = require('express');
const AppError = require('../utils/appError');
const Book = require('./../models/bookModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.aliasTopBooks = catchAsync(async (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '+language';
    req.query.fields = 'title,author,genre,language,read,year,description';
    next();
});

exports.getAllBooks = factory.getAll(Book);
exports.getBook = factory.getOne(Book, { path: 'reviews' });
exports.createBook = factory.createOne(Book);
exports.updateBook = factory.updateOne(Book);
exports.deleteBook = factory.deleteOne(Book);

//aggregation pipeline - book STATS
// exports.getBookStats = async (req, res) => {
//     try {
//         const stats = await Book.aggregate([
//             {
//                 $match: {
//                     language: 'english'
//                 }
//             },
//             {
//                 $group: {
//                     _id: null,

//                 }
//             }
//         ])

//         res.status(200).json({
//             status: 'success',
//             data: {
//                 stats
//             }
//         });

//     } catch (err) {
//         res.status(404).json({
//             status: 'fail',
//             message: err
//         });
//     }
// }
