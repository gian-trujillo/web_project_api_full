module.exports.errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: 'Error de validación' });
  } if (err.name === 'CastError') {
    return res.status(400).send({ message: 'ID inválido' });
  } if (err.name === 'JsonWebTokenError') {
    return res.status(401).send({ message: 'Error de autenticación' });
  }
  const { statusCode = 500, message } = err;

  if (statusCode === 400) {
    return res.status(400).send({ message: message || 'Error de validación' });
  } if (statusCode === 401) {
    return res.status(401).send({ message: message || 'Error de autenticación' });
  } if (statusCode === 403) {
    return res.status(403).send({ message: message || 'Error de autorización' });
  } if (statusCode === 404) {
    return res.status(404).send({ message: message || 'Recurso no encontrado' });
  }
  return res.status(statusCode).send({ message: statusCode === 500 ? 'Error en el servidor' : message });
};
