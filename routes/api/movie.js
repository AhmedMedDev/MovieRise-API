  
const express = require('express');

const router = express.Router();

const validate = require('../../app/Http/Middleware/validate.js')

const MovieController = require('../../app/Http/Controllers/API/MovieController.js');
const MovieRequest = require('../../app/Http/Requests/MovieRequest.js');


router.get('/', MovieController.index);

router.post('/', validate(MovieRequest), MovieController.store);

router.get('/:id', MovieController.show);

router.put('/:id', validate(MovieRequest), MovieController.update);

router.delete('/:id',MovieController.destroy);


module.exports = router;