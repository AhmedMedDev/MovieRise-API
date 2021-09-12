const ResponseServiceProvider = require("../../../Providers/ResponseServiceProvider");
const Movie = require("../../../Models/Movie");

class SpecificMoviesController
{
    /**
     * Trending Movies Algorithm
     * is movie has rate +3 && recently added
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async trending (req, res)
    {
        try {
            const trending = await Movie
                    .find({rate: {$gt: 3}})
                    .sort({_id: -1}).limit(15)

            return res.status(201).json({
                success : true,
                payload : trending
            })

        } catch (error) {
            return ResponseServiceProvider
                        .serverError(res, error)
        }
    }

    /**
     * Top Rated Movies Algorithm
     * is movie has rate +4.5 && recently added
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async topRated (req, res)
    {
        try {
            const topRated = await Movie
            .find({rate: {$gt: 4.5}}).sort({_id: -1})

            return res.status(201).json({
                success : true,
                payload : topRated
            })

        } catch (error) {
            return ResponseServiceProvider
                        .serverError(res, error)
        }
    }

    /**
     * New Arrivals Algorithm
     * is movie recently added
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async newArrivals (req, res)
    {
        try {
            const newArrivals = await Movie
            .find().sort({_id: -1}).limit(15)

            return res.status(201).json({
                success : true,
                payload : newArrivals
            })

        } catch (error) {
            return ResponseServiceProvider
                        .serverError(res, error)
        }
    }

    /**
     * Comming Soon 
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async commingSoon (req, res)
    {
        try {
            const commingSoon = await Movie.find({available: false})

            return res.status(201).json({
                success : true,
                payload : commingSoon
            })

        } catch (error) {
            return ResponseServiceProvider
                        .serverError(res, error)
        }
    }

    /**
     * Specified Geres
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async specificGenres (req, res)
    {
        try {
            const movieGeres = await Movie
            .find({'genres[*]': req.body.genres})

            return res.status(201).json({
                success : true,
                payload : movieGeres
            })

        } catch (error) {
            return ResponseServiceProvider
                        .serverError(res, error)
        }
    }

}

module.exports = new SpecificMoviesController;
