const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    default: 'Explorador',
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    default: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: (props) => `${props.value} no es una URL valida.`,
    },
  },
  email: {
    type: String,
    required: [true, 'Correo electronico requirido'],
    lowercase: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Email inválido',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Correo electronico o contraseña invalidos'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Correo electronico o contraseña invalidos'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
