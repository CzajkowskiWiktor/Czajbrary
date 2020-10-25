const { query } = require('express');
const AppError = require('../utils/appError');
const Book = require('./../models/bookModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');

exports.aliasTopBooks = catchAsync(async (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '+language';
    req.query.fields = 'title,author,genre,language,read,year,description';
    next();
});

exports.getAllBooks = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Book.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const books = await features.query;

    //send response
    res.status(200).json({
        status: 'success',
        results: books.length,
        data: {
            books
        }
    });
});

exports.getBook = catchAsync(async (req, res, next) => {
    const book = await Book.findById(req.params.id);

    if(!book){
        return next(new AppError('No book found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            book
        }
    });
});

exports.createBook = catchAsync(async (req, res, next) => {
    const newBook = await Book.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            book: newBook
        }
    });
});

exports.updateBook = catchAsync(async (req, res, next) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!book){
        return next(new AppError('No book found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            book
        }
    });
});

exports.deleteBook = catchAsync(async (req, res, next) => {
    const book = await Book.findOneAndDelete(req.params.id);

    if(!book){
        return next(new AppError('No book found with that ID', 404));
    }
    res.status(204).json({
        status: 'success',
        data: null
    });
});

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
