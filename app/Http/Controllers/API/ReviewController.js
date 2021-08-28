const ResponseServiceProvider = require("../../../Providers/ResponseServiceProvider");
const Review = require("../../../Models/Review");
const Cache = require("../../../../config/cache");
const ReviewObserver = require("../../../Observers/ReviewObserver");

class ReviewController
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
            if (Cache.has('reviews'))
                return ResponseServiceProvider.cache(res, 'reviews')

            // Get All resource
            let reviews = await Review.find();
            
            // Cache response
            Cache.set("reviews", reviews)

            return res.status(200).json({
                success : true,
                payload : reviews
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
            
            let review = await Review.create(req.body);

            // Inject Observer 
            ReviewObserver.created();

            return res.status(201).json({
                success : true,
                payload : review
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
            
            let review = await Review.find({_id: req.params.id})

            if (!review[0]) 
                return ResponseServiceProvider.notFoundResource(res)

            return res.status(200).json({
                success : true,
                payload : review
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

            let review = await Review.updateOne(
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

            if (!review.acknowledged.modifiedCount) 
                return ResponseServiceProvider.notFoundResource(res)

            // Inject Observer 
            ReviewObserver.updated();

            return res.status(200).json({
              success : true,
              requests : {
                type: 'GET',
                url: process.env.APP_URL +
                     '/api/v1/reviews/' +
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
            
            let review = await Review.deleteOne({_id: req.params.id});

            if (!review.acknowledged) 
                return ResponseServiceProvider.notFoundResource(res)

            // Inject Observer 
            ReviewObserver.deleted();

            return res.status(200).json({success : true})

        } catch (error) {
            return ResponseServiceProvider.serverError(res, error)
        }
    }
}

module.exports = new ReviewController;
