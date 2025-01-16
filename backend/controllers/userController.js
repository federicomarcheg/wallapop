const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../config/logger');





exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json(err);
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res,json({ token, user });

    } catch (error) {
        res.status(500).json(error);
    }
};


exports.createUser = async (req, res) => {
    try {
        const user = { id: 1, ...req.body };
        logger.info(`Usuario creado: ${JSON.stringify(user)}`);
        res.status(201).send(user);
    } catch (error) {
        logger.error(`Error creando usuario: ${error.message}`);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
};
