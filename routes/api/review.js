  
const express = require('express');

const router = express.Router();

const validate = require('../../app/Http/Middleware/validate.js')

const ReviewController = require('../../app/Http/Controllers/API/ReviewController.js');
const ReviewRequest = require('../../app/Http/Requests/ReviewRequest.js');


router.get('/', ReviewController.index);

router.post('/', validate(ReviewRequest), ReviewController.store);

router.get('/:id', ReviewController.show);

router.put('/:id', validate(ReviewRequest), ReviewController.update);

router.delete('/:id',ReviewController.destroy);


module.exports = router;