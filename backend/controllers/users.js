const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({}).orFail(() => {
    const error = new Error('No se ha encontrado ningún usuario');
    error.statusCode = 404;
    throw error;
  })
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { id } = req.params;
  User.findById(id).orFail(() => {
    const error = new Error('Usuario no encontrado');
    error.statusCode = 404;
    throw error;
  })
    .then((user) => {
      // if (!user) {
      //   res.status(404).send({ message: 'ID de usuario no encontrado' });
      //   return;
      // }
      res.send(user);
    })
    .catch(next);
};

module.exports.getMyUserProfile = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId).orFail(() => {
    const error = new Error('Usuario no encontrado');
    error.statusCode = 404;
    throw error;
  })
    .then((user) => {
      // if (!user) {
      //   const error = new Error('Usuario no encontrado');
      //   error.statusCode = 404;
      //   throw error;
      // }

      res.send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((newUser) => {
      res.status(201).send({
        name: newUser.name,
        about: newUser.about,
        avatar: newUser.avatar,
        email: newUser.email,
      });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('No se ha encontrado ningún usuario con esa id');
      error.statusCode = 404;
      throw error;
    })
    .then((updatedUser) => res.send(updatedUser))
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('No se ha encontrado ningún usuario con esa id');
      error.statusCode = 404;
      throw error;
    })
    .then((updatedUser) => res.send(updatedUser))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id.toString() }, 'temporary-strong-secret', { expiresIn: '7d' }),
      });
    })
    .catch(() => {
      const error = new Error('Credenciales inválidas');
      error.statusCode = 401;
      next(error);
    });
};
