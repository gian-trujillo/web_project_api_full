const { Joi } = require('celebrate');
const validator = require('validator');

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const cardValidator = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  link: Joi.string().custom(validateUrl).required(),
});

const cardIdValidator = Joi.object({
  cardId: Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/),
});

module.exports = { cardValidator, cardIdValidator };
