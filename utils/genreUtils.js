const Joi = require("joi");

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required().label("Genre Name"),
  });

  return schema.validate(genre);
}

module.exports.validateGenre = validateGenre;
