const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware'); 
const { requestPasswordReset } = rquire('../controllers/authController');
const passport = require('passport');

router.post('/register', authController.registerUser); 
router.post('/login', authController.loginUser);       
router.get('/profile', protect, authController.getUserProfile); 
router.put('/profile', protect, authController.updateUserProfile); 
router.post('/password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

router.get('/users', protect, admin, authController.getAllUsers); 
router.delete('/users/:id', protect, admin, authController.deleteUser); 

router.post('/register', register);
router.get('/verify-email/:token', verifyEmail);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/dashboard');
    }
);

module.exports = router;
