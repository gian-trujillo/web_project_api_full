const jwt = require('jsonwebtoken');

const handleAuthError = (res) => {
  res.status(403).send({ message: 'Error de autorizacion' });
};

const { JWT_SECRET = 'dev-secret' } = process.env;

const extractBearerToken = (authorization) => authorization.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(res);
  }

  console.log(payload);
  req.user = payload;

  return next();
};
