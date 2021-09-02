  
const express = require('express');

const router = express.Router();

const validate = require('../../app/Http/Middleware/validate.js')

const UserFavoriteContoller = require('../../app/Http/Controllers/API/UserFavoriteContoller.js');
const AuthenticateToken = require('../../app/Http/Middleware/AuthenticateToken.js');


router.get('/', AuthenticateToken.handle, UserFavoriteContoller.index);

router.post('/', AuthenticateToken.handle, UserFavoriteContoller.store);

router.delete('/', AuthenticateToken.handle, UserFavoriteContoller.destroy);



module.exports = router;