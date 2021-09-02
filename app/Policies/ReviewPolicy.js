const Review = require("../Models/Review")
const ResponseServiceProvider = require("../Providers/ResponseServiceProvider")

class ReviewPolicy
{
    async update (req, res, next)
    {
        const review = await Review
        .findById(req.params.id).select('user')

        return (review.user == req.payload.data.user_id) 
        ? next()
        : ResponseServiceProvider.unauthorized(res)
    }

    async destroy  (req, res, next)
    {
        const review = await Review
        .findById(req.params.id).select('user')
    
        return (review.user == req.payload.data.user_id) 
        ? next()
        : ResponseServiceProvider.unauthorized(res)    
    }
}

module.exports = new ReviewPolicy