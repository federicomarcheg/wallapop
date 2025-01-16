const express = require('express');
const { registerUser, loginUser } = require(('../controllers/usercontroller'));
const router = express.Router();
const joi = require('joi');
const validate = rquire('../middleware/validate');
const { createUser } = require('../controllers/usercotroller');
const apiLimiter = require('../config/rateLimiter');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.use('/register', apiLimiter);
router.post('/register', validate(userSchema), createUser);


module.exports = router;


const userSchema = join.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.ref('password'),
});

router.post('/register', validate(userSchema), createUser);

module.exports = router;
