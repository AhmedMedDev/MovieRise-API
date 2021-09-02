const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    re_dec: {
        type: String,
        required: true,
        max: 150
    },
    re_rate: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },// Hidden at Update
    movie: { // On Delete Cascade // On Update Cascade
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,
    },// Hidden at Create , Update
    user: { // On Delete Set NULL // On Update Cascade
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

module.exports = mongoose.model('Review', reviewSchema , 'reviews')