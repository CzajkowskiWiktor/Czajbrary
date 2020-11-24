const { query } = require('express');
const AppError = require('../utils/appError');
const Book = require('./../models/bookModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const multer = require('multer');
const sharp = require('sharp');

// Multer and updating photo
// stored as a buffer - way more efficient
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images!', 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadBookPhoto = upload.single('imageCover');

exports.resizeBookPhoto = (req, res, next) => {
    if(!req.file) return next();

    req.file.filename = `book-${req.body.title}-${Date.now()}.jpeg`;

    sharp(req.file.buffer)
        .resize(350, 450)
        .toFormat('jpeg')
        .jpeg({quality: 100})
        .toFile(`frontend/img/books/${req.file.filename}`);

    next();
};

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

exports.createNewBook = catchAsync(async (req, res, next) => {
    //filtering not wanted fields
    const filteredBody = filterObj(req.body, 'title', 'author', 'genre', 'language', 'year', 'read', 'description');
    if(req.file) filteredBody.imageCover = req.file.filename;
    //update user document
    const newBook = await Book.create(filteredBody);

    res.status(201).json({
        status: 'success',
        data: {
            data: newBook
        }
    });
});


exports.aliasTopBooks = catchAsync(async (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '+language';
    req.query.fields = 'title,author,genre,language,read,year,description';
    next();
});

exports.getAllBooks = factory.getAll(Book);
exports.getBook = factory.getOne(Book, { path: 'reviews' });
// exports.createBook = factory.createOne(Book);
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
