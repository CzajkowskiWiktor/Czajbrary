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
        enum: {
            values: ['yes', 'no'],
            message: 'Do you read? YES or NO'
        }
        // required: [true, 'Do you read a book?']
    },
    imageCover: {
        type: String,
        required: [true, 'A book need a cover image']
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
        max: [5, 'Rating must be below or equal 5']
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
});

//Document middleware
// bookSchema.pre('save', function(next) {
//     this.slug = slugify(this.title, {lower: true});
//     next();
// });

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