const mongoose = require('mongoose');
const Book = require('./bookModel');

const reviewSchema = new mongoose.Schema({
        review: {
            type: String,
            trim: true,
            required: [true, 'A review need a text!'],
        },
        rating: {
            type: Number,
            required: [true, 'A review need a rating!'],
            min: [1, 'Rating must be above 1'],
            max: [5, 'Rating must be below or equal 5']
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        book: {
            type: mongoose.Schema.ObjectId,
            ref: 'Book',
            required: [true, 'Review must belong to a book']
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Review must belong to a user']
        }
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
);

reviewSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'book',
        select: 'title author genre'
    }).populate({
        path: 'user',
        select: 'name photo'
    });

    next();
});

reviewSchema.statics.calcAverageRatings = async function(bookId) {
    console.log(bookId);
    const stats = await this.aggregate([
        {
            $match: {book: bookId}
        },
        {
            $group: {
                _id: '$book',
                nRating: { $sum: 1 },
                avgRating: { $avg: '$rating' }
            }
        }
    ]);
    console.log(stats);

    await Book.findByIdAndUpdate(bookId, {
        ratingsQuantity: stats[0].nRating,
        ratingsAverage: stats[0].avgRating
    });
};

reviewSchema.post('save', async function() {
    //this points to current review
    await this.constructor.calcAverageRatings(this.book);
});

reviewSchema.pre(/^findOneAnd/, async function(next) {
    this.rev = await this.findOne();
    console.log(this.rev);
    next();
});

reviewSchema.post(/^findOneAnd/, async function() {
    await this.rev.constructor.calcAverageRatings(this.rev.book);
});

// reviewSchema.post(/^findOneAnd/, async function(doc, next) {
//     await doc.constructor.calcAverageRatings(doc.book);
//     next();
// });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;