const { body } = require('express-validator');

class ReviewStoreRequest
{
    static roles () {
        return [
            // re_dec roles
            body('re_dec')
            .notEmpty()
            .withMessage('must be not Empty')
            .isLength({ min: 10 })
            .withMessage('must be at least 10 chars long'),
            // re_rate roles
            body('re_rate')
            .notEmpty()
            .withMessage('must be not Empty')
            .isNumeric()
            .withMessage('must be Numeric'),
            // movie roles
            body('movie')
            .notEmpty()
            .withMessage('must be not Empty')
            .isString()
            .withMessage('must be String'),
            // user roles
            body('user')
            .notEmpty()
            .withMessage('must be not Empty')
            .isString()
            .withMessage('must be String'),
        ]
    }
}

module.exports = ReviewStoreRequest.roles()