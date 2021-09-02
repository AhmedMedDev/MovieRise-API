  
const express = require('express');

const router = express.Router();

const validate = require('../../app/Http/Middleware/validate.js')

const UserFavoriteContoller = require('../../app/Http/Controllers/API/UserFavoriteContoller.js');
const AuthenticateToken = require('../../app/Http/Middleware/AuthenticateToken.js');
const FavMoviesRequest = require('../../app/Http/Requests/FavMoviesRequest.js');


router.get('/', AuthenticateToken.handle, UserFavoriteContoller.index);

router.post('/', validate(FavMoviesRequest), AuthenticateToken.handle, UserFavoriteContoller.store);

router.delete('/', validate(FavMoviesRequest), AuthenticateToken.handle, UserFavoriteContoller.destroy);



module.exports = router;