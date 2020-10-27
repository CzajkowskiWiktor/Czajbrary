const express = require('express');
const bookController = require('./../controllers/bookController');
const authController = require('./../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:bookId/reviews', reviewRouter);

router.route('/top-5-english').get(bookController.aliasTopBooks, bookController.getAllBooks);

// router.route('/book-stats').get(bookController.getBookStats);

router.route('/')
    .get(bookController.getAllBooks)
    .post(authController.protect, authController.restrictTo('admin'), bookController.createBook);

router.route('/:id')
    .get(bookController.getBook)
    .patch(authController.protect, authController.restrictTo('admin'),bookController.updateBook)
    .delete(authController.protect, authController.restrictTo('admin'), bookController.deleteBook);

module.exports = router;