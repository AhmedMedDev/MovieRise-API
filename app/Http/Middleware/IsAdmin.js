
class IsAdmin
{
    static handle(req, res, next) {

        const isAdmin = req.payload.data.isAdmin

        return (isAdmin)
        ? next()
        : res.status(401).json({
            success: false,
            payload: 'Unauthorized'
        })
    }
}

module.exports = IsAdmin