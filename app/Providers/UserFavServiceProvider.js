const User = require("../Models/User")
const ResponseServiceProvider = require("./ResponseServiceProvider")

class UserFavServiceProvider
{
    async updateFavs (req, res)
    {
        try {
            // Get User ID From Token
            const user_id = req.payload.data.user_id

            // Get User's Movies Favorite
            let userfavorites = await User.findById(user_id)
                                                .select('favorites')
                    
            // Check Fav element is exist or not
            const index = userfavorites.favorites.indexOf(req.body.favorites)
            const isExist = (index != -1) ? true : false

            return {
                user_id,
                isExist,
                index,
                userFavs: userfavorites.favorites
            }
            
        } catch (error) {
            return ResponseServiceProvider
                    .badRequest(res, error.message)
        }
    }
}

module.exports = new UserFavServiceProvider