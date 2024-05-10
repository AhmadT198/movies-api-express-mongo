const Joi = require("joi")

function validateMovie(movie){
    const schema = Joi.object({
        title: Joi.string().min(1).max(250).required().label("Movie title"),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).default(0),
        dailyRentalRate: Joi.number().min(0).default(0)
    })

    return schema.validate(movie)
}


exports.validate = validateMovie