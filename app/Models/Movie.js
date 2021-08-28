const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 150
    },
    synpsis: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    trail: {
        type: String,
        required: true,
        max: 150
    },
    poster: {
        type: String,
        required: true,
        max: 150
    },
    available: {
        type: Boolean,
        default: false
    },
    genres: {
        type: Array,
        required: true
    },
    reviews: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        required: true
    }
})


module.exports = mongoose.model('Movie', movieSchema , 'movies')