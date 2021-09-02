const { body } = require('express-validator');

class FavMoviesRequest
{
    static roles () {
        return [
            // favorites roles
            body('favorites')
            .notEmpty()
            .withMessage('must be not Empty')
            .isLength({ min: 24 })
            .withMessage('Invalid ID'),
        ]
    }
}

module.exports = FavMoviesRequest.roles()