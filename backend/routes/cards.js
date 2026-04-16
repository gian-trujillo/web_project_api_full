const router = require('express').Router();
const { celebrate } = require('celebrate');
const { cardValidator, cardIdValidator } = require('../validators/cardValidator');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', celebrate({ body: cardValidator }), createCard);
router.delete('/:cardId', celebrate({ params: cardIdValidator }), deleteCard);
router.put('/:cardId/likes', celebrate({ params: cardIdValidator }), likeCard);
router.delete('/:cardId/likes', celebrate({ params: cardIdValidator }), dislikeCard);

module.exports = router;
