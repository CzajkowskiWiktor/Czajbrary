const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController')
const bookingController = require('./../controllers/bookingController')

const router = express.Router();

router.get('/',bookingController.createBookingCheckout ,authController.isLoggedIn, viewsController.getOverview);
router.get('/book/:slug',authController.isLoggedIn, viewsController.getBook);
router.get('/login',authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup',authController.isLoggedIn, viewsController.getSignupForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/my-books', authController.protect, viewsController.getMyBooks);
router.get('/my-reviews', authController.protect, viewsController.getMyReviews);
router.get('/add-book', authController.protect, authController.restrictTo('admin'),viewsController.addNewBook);

router.post('/submit-user-data', authController.protect, viewsController.updateUserData);


module.exports = router;