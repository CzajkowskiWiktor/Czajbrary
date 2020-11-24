const Book = require('./../models/bookModel');
const User = require('./../models/userModel');
const Review = require('./../models/reviewModel');
const Renting = require('./../models/bookingModel');
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

exports.getMyBooks = catchAsync(async (req, res, next) => {
    //finding all bookings
    const rentings = await Renting.find({user: req.user.id});

    //finding books with the returned ID
    const bookIDs = rentings.map(el => el.book);
    const books = await Book.find({ _id: { $in: bookIDs } });

    // console.log(books);

    res.status(200).render('myRentedBooks', {
        title: 'My rented books',
        books
    });
});

//reviews on account
exports.getMyReviews = catchAsync(async (req, res, next) => {
    //finding all reviews
    const reviews = await Review.find({user: req.user.id});

    // console.log(reviews);

    //finding books with the returned ID
    // const bookIDs = reviews.map(el => el.book);
    // const books = await Book.find({ _id: { $in: bookIDs } });

    res.status(200).render('myReviews', {
        title: 'My reviews',
        reviews
    });
});

exports.addNewBook = (req, res) => {
    res.status(200).render('createBook', {
        title: 'Add new Book'
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