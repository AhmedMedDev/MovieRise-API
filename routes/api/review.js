  
const express = require('express');

const router = express.Router();

const validate = require('../../app/Http/Middleware/validate.js')
const AuthenticateToken = require('../../app/Http/Middleware/AuthenticateToken.js');
const ReviewController = require('../../app/Http/Controllers/API/ReviewController.js');
const ReviewStoreRequest = require('../../app/Http/Requests/Review/ReviewStoreRequest.js');
const ReviewUpdateRequest = require('../../app/Http/Requests/Review/ReviewUpdateRequest.js');


router.get('/', ReviewController.index);

router.post('/', 
AuthenticateToken.handle, validate(ReviewStoreRequest), 
ReviewController.store);

router.get('/:id', ReviewController.show);

router.put('/:id', 
AuthenticateToken.handle, validate(ReviewUpdateRequest), 
ReviewController.update);

router.delete('/:id', 
AuthenticateToken.handle,
ReviewController.destroy);


module.exports = router;