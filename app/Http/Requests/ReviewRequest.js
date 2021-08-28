const { body } = require('express-validator');

class ReviewRequest
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
        ]
    }
}

module.exports = ReviewRequest.roles()