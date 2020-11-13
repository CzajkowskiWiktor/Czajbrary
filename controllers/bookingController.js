const Stripe = require('stripe');
const stripe = Stripe('sk_test_51Hmgu9LIwMvg7ascBXW9sP1p5itEfmpXsr0UMk8F2Eq6cgtZvFiPH8uKcNx9zu7hdYs3buN6lYc78BWFdQYZNemU0044EQABN6');
const AppError = require('../utils/appError');
const Book = require('../models/bookModel');
const Renting = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
    //get currently booked book
    const book = await Book.findById(req.params.bookId);
    console.log(book);

    //create checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${req.protocol}://${req.get('host')}/?book=${req.params.bookId}&user=${req.user.id}&price=${book.price}`,
        cancel_url: `${req.protocol}://${req.get('host')}/book/${book.slug}`,
        customer_email: req.user.email,
        client_reference_id: req.params.bookId,
        line_items: [
            {
                name: `${book.title} Book`,
                description: book.description,
                images: [],
                amount: book.price * 100,
                currency: 'usd',
                quantity: 1
            }
        ]
    });

    //create session as response
    res.status(200).json({
        status: 'success',
        session
    });
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
    const {book, user, price} = req.query;

    if(!book && !user && !price) return next();
    await Renting.create({book, user, price});

    res.redirect(req.originalUrl.split('?')[0]);
});

exports.createRenting = factory.createOne(Renting);
exports.getRenting = factory.getOne(Renting);
exports.getAllRentings = factory.getAll(Renting);
exports.updateRenting = factory.updateOne(Renting);
exports.deleteRenting = factory.deleteOne(Renting);