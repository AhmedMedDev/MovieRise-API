const { body } = require('express-validator');

class MovieRequest
{
    static roles () {
        return [
            // name roles
            body('name')
            .notEmpty()
            .withMessage('must be not Empty')
            .isLength({ min: 3 })
            .withMessage('must be at least 3 chars long'),
            // synpsis roles
            body('synpsis')
            .notEmpty()
            .withMessage('must be not Empty'),
            // rate roles
            body('rate')
            .notEmpty()
            .withMessage('must be not Empty')
            .isNumeric()
            .withMessage('must be Numeric'),
            // trail roles // file-> viedo 
            body('trail')
            .notEmpty()
            .withMessage('must be not Empty'),
            // poster roles
            body('poster') // file-> image 
            .notEmpty()
            .withMessage('must be not Empty'),
            // available roles
            body('available') 
            .notEmpty()
            .withMessage('must be not Empty')
            .isBoolean()
            .withMessage('must be Boolean'),
            // genres roles
            body('genres')
            .notEmpty()
            .withMessage('must be not Empty')
            .isArray()
            .withMessage('must be Array'),
            // genre's elems roles
            body('genres.*')
            .isString()
            .withMessage('must be String'),
            // genre's elems roles
            body('header')
            .optional()
            .isBoolean()
            .withMessage('must be Boolean'),
            // genre's elems roles
            body('runtime')
            .isString()
            .withMessage('must be String')
            
        ]
    }
}

module.exports = MovieRequest.roles()