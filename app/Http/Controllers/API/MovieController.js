const ResponseServiceProvider = require("../../../Providers/ResponseServiceProvider");
const Movie = require("../../../Models/Movie");
const Cache = require("../../../../config/cache");
const MovieObserver = require("../../../Observers/MovieObserver");
const MovieServiceProvider = require("../../../Providers/MovieServiceProvider");
const { saveFile } = require("../../../Helpers/Fileupload");

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
                return ResponseServiceProvider
                            .cache(res, 'movies')

            // Get All resource
            let movies = await Movie.find()
            
            // Cache response
            Cache.set("movies", movies)

            return res.status(200).json({
                success : true,
                payload : movies
            })

        } catch (error) {
            return ResponseServiceProvider
                    .serverError(res, error)
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
            req.body.poster = `uploads/movies/poster/${saveFile('movies/poster', req.files.poster)}`

            req.body.trail = `uploads/movies/trail/${saveFile('movies/trail', req.files.trail)}`

            if (req.files.film)
                req.body.film 
                = `uploads/movies/film/${saveFile('movies/film', req.files.film)}`

            let movie = await Movie.create(req.body);

            // Inject Observer 
            MovieObserver.created();

            return res.status(201).json({
                success : true,
                payload : movie
            })

        } catch (error) {
            return ResponseServiceProvider
                    .serverError(res, error)
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
            let movie = await Movie
                        .find({_id: req.params.id})

            return res.status(200).json({
                success : true,
                payload : movie
            })

        } catch (error) {
            return ResponseServiceProvider
                    .badRequest(res, error.message)
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
            await Movie.updateOne(
            {_id: req.params.id},
            {$set: req.body});

            // Inject Observer 
            MovieObserver.updated();

            return res.status(200).json({
              success : true,
              requests : {
                type: 'GET',
                url: process.env.APP_URL +
                     '/api/v1/movies/' +
                     req.params.id
            }})

        } catch (error) {
            return ResponseServiceProvider
                    .badRequest(res, error.message)
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
            // Movie Service Provider
            MovieServiceProvider.destroy (req, res)

            await Movie.deleteOne({_id: req.params.id});

            // Inject Observer 
            MovieObserver.deleted();

            return res.status(200).json({success : true})

        } catch (error) {
            return ResponseServiceProvider
                    .badRequest(res, error.message)
        }
    }
}

module.exports = new MovieController;
