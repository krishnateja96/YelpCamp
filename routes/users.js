const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync')
const usersController = require('../controllers/users');

router.route('/register')
    .get(usersController.renderRegisterForm)
    .post(catchAsync(usersController.registerUser));

router.route('/login')
    .get(usersController.renderLoginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), usersController.login);

router.get('/logout', usersController.logout);

module.exports = router;