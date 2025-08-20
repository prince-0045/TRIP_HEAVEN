const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { saveRedirectUrl, isLoggedIn } = require('../middleware.js');
const userController = require('../controllers/users.js');

router.route('/signup')
    .get(userController.showSignupForm)
    .post(wrapAsync(userController.signup));

router.route('/login')
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true}), userController.login);

router.get('/logout', userController.logout);

// Profile route - requires authentication
router.get('/profile', isLoggedIn, wrapAsync(userController.showProfile));

// Debug route to test if user routes are working
router.get('/test', (req, res) => {
    res.send('User routes are working!');
});

module.exports = router;