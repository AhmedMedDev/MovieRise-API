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
    isAdmin: {// Hidden at register
        type: Boolean,
        default: false
    },
    verify_code: {// Hidden at register
        type: String,
        required: true
    },
    email_verified_at: {// Hidden at register
        type: Date,
    },
    favorites: {// Hidden at register
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Movie',
    }
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema, 'users')