  
const express = require('express');

const router = express.Router();

const validate = require('../../app/Http/Middleware/validate.js')

const MovieController = require('../../app/Http/Controllers/API/MovieController.js');


router.get('/',MovieController.index);

router.post('/',  MovieController.store);

router.get('/:id',MovieController.show);

router.put('/:id', MovieController.update);

router.delete('/:id',MovieController.destroy);


module.exports = router;