const { body } = require('express-validator');
const { image, optionalVideo } = require('../../Helpers/Validation/common');

class MovieRequest
{
    static roles () {
        return [
            // name roles
            body('name')
            .notEmpty()
            .withMessage('Must be not Empty')
            .isLength({ min: 3 })
            .withMessage('Must be at least 3 chars long'),
            // film roles // file-> viedo 
            body('film')
            .custom ((value, {req}) => optionalVideo (req.files, req.files.film))
            .withMessage('Must be an video with MP4 , MOV , WMV'),
            // synpsis roles
            body('synpsis')
            .notEmpty()
            .withMessage('Must be not Empty'),
            // rate roles
            body('rate')
            .notEmpty()
            .withMessage('Must be not Empty')
            .isNumeric()
            .withMessage('Must be Numeric'),
            // trailer roles // file-> viedo 
            body('trailer')
            .custom ((value , {req}) => video (req.files, req.files.trailer))
            .withMessage('Must be an video with MP4 , MOV , WMV'),
            // poster roles
            body('poster') // file-> image 
            .custom ((value, {req}) => image (req.files, req.files.poster))
            .withMessage('Must be an image with jpeg , png , gif'),
            // available roles
            body('available') 
            .notEmpty()
            .withMessage('Must be not Empty')
            .isBoolean()
            .withMessage('Must be Boolean'),
            // genres roles
            body('genres')
            .notEmpty()
            .withMessage('Must be not Empty')
            .isArray()
            .withMessage('Must be Array'),
            // genre's elems roles
            body('genres.*')
            .isString()
            .withMessage('Must be String'),
            // genre's elems roles
            body('header')
            .optional()
            .isBoolean()
            .withMessage('Must be Boolean'),
            // genre's elems roles
            body('runtime')
            .isString()
            .withMessage('Must be String')
        ]
    }
}

module.exports = MovieRequest.roles()