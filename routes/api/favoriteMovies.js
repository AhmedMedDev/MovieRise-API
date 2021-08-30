  
const express = require('express');

const router = express.Router();

const validate = require('../../app/Http/Middleware/validate.js')

const UserFavoriteContoller = require('../../app/Http/Controllers/API/UserFavoriteContoller.js');
const authenticateToken = require('../../app/Http/Middleware/authenticateToken.js');


router.get('/', authenticateToken.handle, UserFavoriteContoller.index);

router.post('/', authenticateToken.handle, UserFavoriteContoller.store);

router.delete('/', authenticateToken.handle, UserFavoriteContoller.destroy);



module.exports = router;