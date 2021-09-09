const AuthServiceProvider = require("../../../Providers/AuthServiceProvider");
const jwtServiceProvider = require("../../../Providers/jWTServiceProvider");
const ResponseServiceProvider = require("../../../Providers/ResponseServiceProvider");

class LoginController
{
    /**
     * Login :
     * - - Check credentials
     * - - Inject User data in payload
     * - - Generate token 
     * - - Response with token  
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async login (req, res) 
    {
        // Check Credentials
        const result = await AuthServiceProvider.attempt(req.body)

        if (!result.auth) return ResponseServiceProvider.unauthorized(res)

        // Generate Payload 
        const payload = AuthServiceProvider.generatePayload (result)

        // Generate Token 
        const accessToken = jwtServiceProvider.generateAccessToken(payload)

        return jwtServiceProvider.respondWithToken(accessToken, result.user, res)
    }
}

module.exports = new LoginController