const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A book need a title!'],
        unique: true
    },
    author: {
        type: String,
        required: [true, 'A book need a author']
    },
    year: {
        type: Number,
        required: [true, 'A book need a year of production']
    },
    rating: {
        type: Number,
        default: 4
    }
});
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;