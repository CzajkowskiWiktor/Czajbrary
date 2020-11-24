const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const bookSchema = new mongoose.Schema({
        title: {
            type: String,
            required: [true, 'A book need a title!'],
            unique: true,
            trim: true
        },
        slug: String,
        author: {
            type: String,
            required: [true, 'A book need a author'],
            trim: true
        },
        genre: {
            type: String,
            required: [true, 'A book need a genre'],
            trim: true
        },
        language: {
            type: String,
            required: [true, 'Which language of a book'],
            trim: true
        },
        year: {
            type: Number,
            required: [true, 'A book need a year of production']
        },
        read: {
            type: String,
            required: [true, 'Do you read a book?'],
            enum: {
                values: ['yes', 'no'],
                message: 'Do you read? YES or NO'
            }
        },
        imageCover: {
            type: String,
            // required: [true, 'A book need a cover image'],
            default: 'default-imageCover.jpg'
        },
        description: {
            type: String,
            trim: true,
            required: [true, 'A book need description']
        },
        ratingsAverage: {
            type: Number,
            default: 4,
            min: [1, 'Rating must be above 1'],
            max: [5, 'Rating must be below or equal 5'],
            set: val => Math.round(val * 10) / 10
        },
        ratingsQuantity: {
            type: Number,
            default: 0
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false
        },
        price: {
            type: Number,
            default: 10
        }
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
);

// bookSchema.index({year: 1});
bookSchema.index({ ratingsAverage: -1 });
bookSchema.index({ slug: 1 });

//virtual populate
bookSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'book',
    localField: '_id'
});

//Document middleware
bookSchema.pre('save', function(next) {
    this.slug = slugify(this.title, {lower: true});
    next();
});

// bookSchema.post('save', function (doc, next) {

//     next();
// });

//query middlewawre
// bookSchema.pre(/^find/, function(next) {
//     this.find({language: {$ne: 'english'}});
//     this.start = Date.now();
//     next();
// });

// bookSchema.post(/^find/, function(docs, next) {
//     console.log(`Query took: ${Date.now() - this.start} ms`);
//     next();
// });


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;