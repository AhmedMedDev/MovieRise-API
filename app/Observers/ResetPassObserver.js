const ResetPasswordEmail = require("../Mails/ResetPasswordEmail");
const ResetPassword = require("../Models/ResetPassword");


class ResetPassObserver
{
    createPincode (data) 
    {
        let resetPasswordEmail =  new ResetPasswordEmail({user:data.user, pincode: data.pincode})

        resetPasswordEmail.send();
    }

    async resetPassword (data) 
    {
       await ResetPassword.deleteMany({email: data.email})
    }
}

module.exports = new ResetPassObserver