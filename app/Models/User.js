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
    },// Hidden at register
    isAdmin: {
        type: Boolean,
        default: false
    },// Hidden at register
    verify_code: {
        type: String,
        required: true
    },// Hidden at register
    email_verified_at: {
        type: Date,
    },// Hidden at register
    favorites: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Movie',
    }
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema, 'users')