const ResponseServiceProvider = require("../../../Providers/ResponseServiceProvider");
const Movie = require("../../../Models/Movie");
const Cache = require("../../../../config/cache");
const MovieObserver = require("../../../Observers/MovieObserver");

class MovieController
{
    /**
     * Display a listing of the resource.
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async index (req, res)
    {
        try {
            // Check cache
            if (Cache.has('movies'))
                return ResponseServiceProvider.cache(res, 'movies')

            // Get All resource
            let movies = await Movie.find().populate('reviews')
            
            // Cache response
            Cache.set("movies", movies)

            return res.status(200).json({
                success : true,
                payload : movies
            })

        } catch (error) {
            return ResponseServiceProvider.serverError(res, error)
        }
    }
 
    /**   
     * Store a newly created resource in storage.
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async store (req, res)
    {
        try {
            
            let movie = await Movie.create({
                name:       req.body.name,
                synpsis:    req.body.synpsis,
                rate:       req.body.rate,
                trail:      req.body.trail,
                poster:     req.body.poster,
                available:  req.body.available,
                genres:     req.body.genres,
                reviews:    req.body.reviews,
            });

            // Inject Observer 
            MovieObserver.created();

            return res.status(201).json({
                success : true,
                payload : movie
            })

        } catch (error) {
            return ResponseServiceProvider.serverError(res, error)
        }

    }

    /**
     * Display the specified resource.
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async show (req, res)
    {
        try {
            
            let movie = await Movie.find({_id: req.params.id})

            if (!movie[0]) 
                return ResponseServiceProvider.notFoundResource(res)

            return res.status(200).json({
                success : true,
                payload : movie
            })

        } catch (error) {
            return ResponseServiceProvider.serverError(res, error)
        }
    }

    /**
     * Update the specified resource in storage.
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async update (req, res)
    {
        try {

            let movie = await Movie.updateOne(
              {_id: req.params.id},
              {$set: {
                name:      req.body.name,
                synpsis:   req.body.synpsis,
                rate:      req.body.rate,
                trail:     req.body.trail,
                poster:    req.body.poster,
                available: req.body.available,
                genres:    req.body.genres,
              }},
            );

            if (!movie.acknowledged.modifiedCount) 
                return ResponseServiceProvider.notFoundResource(res)

            // Inject Observer 
            MovieObserver.updated();

            return res.status(200).json({
              success : true,
              requests : {
                type: 'GET',
                url: process.env.APP_URL +
                     '/api/v1/movies/' +
                     req.params.id
              }
          })

        } catch (error) {
            return ResponseServiceProvider.serverError(res, error)
        }
    }

    /**
     * Remove the specified resource from storage.
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async destroy (req, res)
    {
        try {
            
            let movie = await Movie.deleteOne({_id: req.params.id});

            if (!movie.acknowledged) 
                return ResponseServiceProvider.notFoundResource(res)

            // Inject Observer 
            MovieObserver.deleted();

            return res.status(200).json({success : true})

        } catch (error) {
            return ResponseServiceProvider.serverError(res, error)
        }
    }
}

module.exports = new MovieController;
