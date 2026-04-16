const { Joi } = require('celebrate');
const validator = require('validator');

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const userIdValidator = Joi.object({
  id: Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/),
});

const updateUserValidator = Joi.object({
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(10).max(50),
});

const updateAvatarValidator = Joi.object({
  avatar: Joi.string().custom(validateUrl),
});

module.exports = { userIdValidator, updateUserValidator, updateAvatarValidator };
