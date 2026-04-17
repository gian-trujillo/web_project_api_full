const router = require('express').Router();
const { celebrate } = require('celebrate');
const
  {
    getUsers, getUserById, getMyUserProfile, updateUser, updateAvatar,
  } = require('../controllers/users');
const { userIdValidator, updateUserValidator, updateAvatarValidator } = require('../validators/userValidator');

router.get('/', getUsers);
router.get('/me', getMyUserProfile);
router.get('/:id', celebrate({ params: userIdValidator }), getUserById);
router.patch('/me', celebrate({ body: updateUserValidator }), updateUser);
router.patch('/me/avatar', celebrate({ body: updateAvatarValidator }), updateAvatar);
module.exports = router;
