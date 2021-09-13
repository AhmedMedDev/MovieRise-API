const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 150
    },
    film: {
        type: String,
        default: 'uploads/movies/film/comming-soon.png',
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
    available: { // Comming Soon
        type: Boolean,
        default: false
    },
    genres: {
        type: Array,
        required: true
    },
    header: { // Landing Page movies
        type: Boolean,
        default: false
    },
    runtime: {
        type: String,
        required: true,
    }
})
/**
 * On Delete Movie 
 * - - > Cascade Review
 * - - > Cascade userFavs
 */

module.exports = mongoose.model('Movie', movieSchema , 'movies')