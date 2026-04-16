module.exports = (validator) => (req, res, next) => {
  const { error } = validator.validate(req.body);

  if (error) {
    return res.status(400).send({
      message: error.details[0].message,
    });
  }

  return next();
};

// remember to remove this file, no longer needed.
