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
    },
    isAdmin: {// Hidden
        type: Boolean,
        default: false
    },
    verify_code: {// Hidden
        type: String,
        required: true
    },
    email_verified_at: {// Hidden
        type: Date,
    }
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema, 'users')