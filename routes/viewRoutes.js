const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController')

const router = express.Router();

router.get('/',authController.isLoggedIn, viewsController.getOverview);
router.get('/book/:slug',authController.isLoggedIn, viewsController.getBook);
router.get('/login',authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup',authController.isLoggedIn, viewsController.getSignupForm);
router.get('/me', authController.protect, viewsController.getAccount);

router.post('/submit-user-data', authController.protect, viewsController.updateUserData);


module.exports = router;