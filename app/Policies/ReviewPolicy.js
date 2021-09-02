const Review = require("../Models/Review")
const ResponseServiceProvider = require("../Providers/ResponseServiceProvider")

class ReviewPolicy
{
    async update (req)
    {
        const review = await Review
        .findById(req.params.id).select('user')
    
        return (review.user == req.payload.data.user_id)
    }

    async destroy (req)
    {
        const review = await Review
        .findById(req.params.id).select('user')
    
        return (review.user == req.payload.data.user_id)
    }
}

module.exports = new ReviewPolicy