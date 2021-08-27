const { body } = require('express-validator');

class ConfirmPinRequest
{
    static roles () {
        return [
            // pincode roles
            body('pincode')
            .isNumeric()
            .withMessage('must be Numeric')
            .notEmpty()
            .withMessage('must be not empty'),
        ]
    }
}

module.exports = ConfirmPinRequest.roles()