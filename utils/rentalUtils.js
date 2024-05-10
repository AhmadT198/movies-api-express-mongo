const Joi = require("joi")
Joi.objectId = require("joi-objectid")(Joi); //Here require("joi-objectid") is a function, we then pass (Joi) as an argument to this function

function validateRental(rental){
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    })

    return schema.validate(rental)
}

exports.validate = validateRental