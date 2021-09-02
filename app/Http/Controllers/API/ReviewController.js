const ResponseServiceProvider = require("../../../Providers/ResponseServiceProvider");
const Review = require("../../../Models/Review");
const Cache = require("../../../../config/cache");
const ReviewObserver = require("../../../Observers/ReviewObserver");
const ReviewPolicy = require("../../../Policies/ReviewPolicy");

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
                return ResponseServiceProvider
                                .cache(res, 'reviews')

            // Get All resource
            let reviews = await Review.find()
                .populate('movie').populate('user')
            
            // Cache response
            Cache.set("reviews", reviews)

            return res.status(200).json({
                success : true,
                payload : reviews
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
            // Inject user id 
            req.body.user = req.payload.data.user_id

            let review = await Review.create(req.body);

            // Inject Observer 
            ReviewObserver.created();

            return res.status(201).json({
                success : true,
                payload : review
            })

        } catch (error) {
            return ResponseServiceProvider
                    .badRequest(res, error.message)
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
            let review = await Review
                .find({_id: req.params.id})
                .populate('movie').populate('user')

            return res.status(200).json({
                success : true,
                payload : review
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
            // Update Permissions
            const authorized = await ReviewPolicy.update (req)

            if (!authorized) 
                return ResponseServiceProvider.unauthorized(res)
            
            await Review.updateOne(
            {_id: req.params.id},
            {$set: {
                re_dec: req.body.re_dec,
                re_rate: req.body.re_rate,
            }});

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
            // Destroy Permissions
            const authorized = await ReviewPolicy.destroy (req)

            if (!authorized) 
                return ResponseServiceProvider.unauthorized(res)

            await Review.deleteOne({_id: req.params.id});

            // Inject Observer 
            ReviewObserver.deleted();

            return res.status(200).json({success : true})

        } catch (error) {
            return ResponseServiceProvider
                    .badRequest(res, error.message)
        }
    }
}

module.exports = new ReviewController;
