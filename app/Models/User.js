const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: "uploads/users/avatar/default.png"
    },// Hidden at Create
    isAdmin: {
        type: Boolean,
        default: false
    },// Hidden at Create
    verify_code: {
        type: String,
        required: true
    },// Hidden at Create
    email_verified_at: {
        type: Date,
    },// Hidden at Create
    favorites: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Movie',
    }
})

/**
 * On Delete User 
 * - - > Set NULL Review
 */

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema, 'users')