const Review = require("../Models/Review");
const ResponseServiceProvider = require("./ResponseServiceProvider");

class MovieServiceProvider
{
    static async destroy (req, res)
    {
        try {
            // Cascade Review
            await Review.deleteMany({movie: req.params.id});

        } catch (error) {
            return ResponseServiceProvider
                    .badRequest(res, error.message)
        }
    }

}

module.exports = MovieServiceProvider