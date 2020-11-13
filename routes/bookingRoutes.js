const express = require('express');
const bookingController = require('./../controllers/bookingController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/checkout-session/:bookId', bookingController.getCheckoutSession);

router.use(authController.restrictTo('admin'));

router.route('/')
    .get(bookingController.getAllRentings)
    .post(bookingController.createRenting);

router.route('/:id')
    .get(bookingController.getRenting)
    .patch(bookingController.updateRenting)
    .delete(bookingController.deleteRenting);

module.exports = router;