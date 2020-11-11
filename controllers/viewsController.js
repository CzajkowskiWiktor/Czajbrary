const Book = require('./../models/bookModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
    //get book data from collection
    const books = await Book.find();

    res.status(200).render('overview', {
        title: 'Explore books',
        books
    });
});

exports.getBook = catchAsync(async (req, res, next) => {
    //get data for the requested book
    const book = await Book.findOne({slug: req.params.slug}).populate({
        path: 'reviews',
        fields: 'review rating user'
    });

    if(!book) {
        return next(new AppError('There is no book with that title.', 404));
    }

    res.status(200).render('book', {
        title: `${book.title}`,
        book
    });
});

exports.getLoginForm = (req, res) => {
    res.status(200).render('login', {
        title: 'Log into your account'
    });
};

exports.getSignupForm = (req, res) => {
    res.status(200).render('signup', {
        title: 'Signup to Czajbrary'
    });
};

exports.getAccount = (req, res) => {
    res.status(200).render('setting', {
        title: 'My account'
    });
};

exports.updateUserData = catchAsync(async (req, res) => {
    console.log('UPDATING USER', req.body);
    const updatedUser = await User.findByIdAndUpdate(req.user.id, {
        name: req.body.name,
        email: req.body.email
    },
    {
        new: true,
        runValidators: true
    });

    res.status(200).render('setting', {
        title: 'My account',
        user: updatedUser
    });
});