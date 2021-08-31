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
    },
    user: { // On Delete Set NULL // On Update Cascade
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})
/**
 * On Delete Review
 * - - > Delete It From Movie model 
 * 
 */

module.exports = mongoose.model('Review', reviewSchema , 'reviews')