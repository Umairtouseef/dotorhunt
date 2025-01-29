const express = require('express');
const passport = require('passport');
const { userController } = require('../Controllers');
const { jwtAuth,sessionAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', userController.createUser);
router.post('/login', passport.authenticate('local'), userController.loginUser);
router.get('/profile', jwtAuth, userController.checkAuth);
router.get('/profile/session', sessionAuth, userController.checkAuth);
router.get('/logout', userController.logout);

module.exports = router;
