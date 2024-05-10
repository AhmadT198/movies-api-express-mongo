const Joi = require("joi")

const phoneNumberAllowed = /^\+?([0-9]{1,4})?[-.\s]?\(?([0-9]{1,4})?\)?[-.\s]?([0-9]{1,4})?[-.\s]?([0-9]{1,4})[-.\s]?([0-9]{1,9})$/


function validateCustomer(customer) {
    const schema = Joi.object({
        name : Joi.string().min(3).max(50).required().label("Customer name"),
        phone : Joi.string().min(10).max(50).required().regex(phoneNumberAllowed).label("Customer phonenumber"),
        isGold : Joi.bool().required()
    })

    return schema.validate(customer)
}

module.exports.validateCustomer = validateCustomer