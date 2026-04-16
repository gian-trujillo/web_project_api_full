const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({}).orFail(() => {
    const error = new Error('No se ha encontrado ninguna tarjeta con esa id');
    error.statusCode = 404;
    throw error;
  })
    .then((cards) => {
      if (cards.length === 0) {
        const error = new Error('No se han encontrado tarjetas');
        error.statusCode = 404;
        throw error;
      }
      res.send(cards);
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((newCard) => res.status(201).send(newCard))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  Card.findById(cardId).orFail(() => {
    const error = new Error('No se ha encontrado ninguna tarjeta con esa id');
    error.statusCode = 404;
    throw error;
  })
    .then((card) => {
      if (card.owner.toString() !== userId) {
        const error = new Error('No puedes borrar tarjetas de otro usuario');
        error.statusCode = 403;
        throw error;
      }
      return Card.findByIdAndDelete(cardId);
    })
    .then(() => res.send({ message: 'Tarjeta eliminada exitosamente' }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  ).orFail(() => {
    const error = new Error('No se ha encontrado ninguna tarjeta con esa id');
    error.statusCode = 404;
    throw error;
  })
    .then((updatedCard) => res.send(updatedCard))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  ).orFail(() => {
    const error = new Error('No se ha encontrado ninguna tarjeta con esa id');
    error.statusCode = 404;
    throw error;
  })
    .then((updatedCard) => res.send(updatedCard))
    .catch(next);
};
