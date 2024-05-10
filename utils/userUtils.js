const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity');

const complexityOptions = {
    min: 5,
    max: 250,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    // requirementCount: 2,
  };


const validateUser = (user) => {
    const schema = Joi.object({
        name : Joi.string().min(3).max(255).required(),
        email : Joi.string().email().min(3).max(255).required(),
        password : passwordComplexity(complexityOptions)
    })

    return schema.validate(user)
}

exports.validate = validateUser