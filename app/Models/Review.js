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
    }
})


module.exports = mongoose.model('Review', reviewSchema , 'reviews')