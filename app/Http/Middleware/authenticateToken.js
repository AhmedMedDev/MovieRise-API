require('dotenv').config();

const jwt = require('jsonwebtoken')

class authenticateToken
{
    static handle(req, res, next) {

        try {
            const authHeader = req.headers['authorization']
    
            const token = authHeader && authHeader.split(' ')[1]

            const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
            req['payload'] = payload
    
            next()
    
        } catch (err) {
            return res.status(401).json({
                success: false,
                payload: 'Unauthorized'
            })
        }
    }
}

module.exports = authenticateToken