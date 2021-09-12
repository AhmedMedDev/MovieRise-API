  
const express = require('express');

const router = express.Router();

const SpecificMoviesController = require('../../app/Http/Controllers/API/SpecificMoviesController.js');

router.get('/trending', 
SpecificMoviesController.trending);

router.get('/topRated', 
SpecificMoviesController.topRated);

router.get('/newArrivals', 
SpecificMoviesController.newArrivals);

router.get('/commingSoon', 
SpecificMoviesController.commingSoon);

router.get('/genres', 
SpecificMoviesController.specificGenres);


module.exports = router;