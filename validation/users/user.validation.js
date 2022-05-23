// now not use , delete

const { user } = require("./user.schema");

module.exports = {
    addUserValidation: async(request, response, next) => {
        const value = await user.validate(request.body);
        if (value.error) {
            response.json({
                success: 0,
                message: value.error.details[0].message
            })
        }else{
            next();
        }
    }
};