
class IsAdmin
{
    static handle(req, res, next) {

        const role = req.payload.data.role

        return (role == process.env.ADMIN_ROLE)
        ? next()
        : res.status(401).json({
            success: false,
            payload: 'Unauthorized'
        })
    }
}

module.exports = IsAdmin