const router = require('express-promise-router')();

// Controller REST to authentication.
const AuthenticationController = require('../controllers/authentication')

/**
 * Route to Login.
 */
router.route('/login')
.post(AuthenticationController.login)

/**
 * Route to sign up a user.
 */
router.route('/signup')
.post(AuthenticationController.signup)

module.exports = router;

