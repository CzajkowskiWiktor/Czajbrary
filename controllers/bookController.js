const Book = require('./../models/bookModel');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();

        res.status(200).json({
            status: 'success',
            results: books.length,
            data: {
                books
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Invalid'
        });
    }

};

exports.getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                book
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Invalid'
        });
    }
};

exports.createBook = async (req, res) => {
    try {
        const newBook = await Book.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                book: newBook
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent'
        });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                book
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findOneAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};