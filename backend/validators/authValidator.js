const { Joi } = require('celebrate');
const validator = require('validator');

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const signupValidator = Joi.object({
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(10).max(50),
  avatar: Joi.string().custom(validateUrl),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const signinValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = { signupValidator, signinValidator };
