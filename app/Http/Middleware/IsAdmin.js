const ResponseServiceProvider = require("../../Providers/ResponseServiceProvider")

class IsAdmin
{
    static handle(req, res, next) {

        const role = req.payload.data.role

        return (role == process.env.ADMIN_ROLE)
        ? next()
        : ResponseServiceProvider.unauthorized(res) 
    }
}

module.exports = IsAdmin