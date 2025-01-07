const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware'); 


router.post('/register', authController.registerUser); 
router.post('/login', authController.loginUser);       
router.get('/profile', protect, authController.getUserProfile); 
router.put('/profile', protect, authController.updateUserProfile); 


router.get('/users', protect, admin, authController.getAllUsers); 
router.delete('/users/:id', protect, admin, authController.deleteUser); 

module.exports = router;
