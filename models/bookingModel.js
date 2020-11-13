const mongoose = require('mongoose');

const rentingSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
        required: [true, 'Renting must belong to a Book!']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Renting must belong to a User!']
    },
    price: {
        type: Number,
        required: [true, 'Renting must have a price']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    paid: {
        type: Boolean,
        default: true
    }
});

rentingSchema.pre(/^find/, function(next){
    this.populate('user').populate({
        path: 'book',
        seletct: 'title'
    });
    next();
})

const Renting = mongoose.model('Renting', rentingSchema);

module.exports = Renting;