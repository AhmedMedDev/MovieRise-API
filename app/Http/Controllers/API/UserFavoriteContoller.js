const ResponseServiceProvider = require("../../../Providers/ResponseServiceProvider");
const User = require("../../../Models/User");
const Cache = require("../../../../config/cache");
const UserFavoriteObserver = require("../../../Observers/UserFavoriteObserver");
const UserFavServiceProvider = require("../../../Providers/UserFavServiceProvider");

class UserFavoriteContoller
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
            // Get User Favs
            let userfavorites = await User
            .findById(req.payload.data.user_id)
            .select('favorites').populate('favorites')

                    
            return res.status(200).json({
                success : true,
                payload : userfavorites
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
            // Update Favs service provider 
            const provider = await UserFavServiceProvider.updateFavs (req, res)
            
            // Make sure that new recored is not repeated
            if (provider.isExist) 
                return ResponseServiceProvider
                        .badRequest(res, "Item is't exist")

            // Push new fav to user's favs
            provider.userFavs.push(req.body.favorites)

            // Save Changes
            await User.updateOne(
                {_id: provider.user_id},
                {$set: {
                    favorites: provider.userFavs
                }},
            );

            return res.status(201).json({success: true})

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
            // Update Favs service provider 
            const provider = await UserFavServiceProvider.updateFavs (req, res)
            
            // Make sure that new recored is exist
            if (!provider.isExist) 
                return ResponseServiceProvider
                        .badRequest(res, "Item is't exist")

            // Remove specific fav to user's favs
            provider.userFavs.splice(provider.index, 1)

            // Save Changes
            await User.updateOne(
                {_id: provider.user_id},
                {$set: {
                    favorites: provider.userFavs
                }},
            );

            return res.status(200).json({success: true})

        } catch (error) {
            return ResponseServiceProvider
                    .badRequest(res, error.message)
        }
    }
}

module.exports = new UserFavoriteContoller;