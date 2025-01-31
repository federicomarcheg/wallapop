const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const CustomError = require('../utils/CustomError');
const crypto = require('crypto');
const transporter = require('../config/nodemailerConfig');
const { revokeTokens } = require('../middleware/authMiddleware');




const authController = {
    register: asyncHandler( async (req, res) => {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            throw new CustomError('Todos los campos son obligatorios', 400);
        }


        const user = await  User.create({ username, email, password });
        res.status(201).json({ success: true, data: user });
    }),


    login: asyncHandler(async (req, res) => {
        const { email, password } = req.body;


        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new CustomError('Credenciales invalidas', 401);
        }

        const token = jwt.sign({ id: user._id, role: user.role}, 'secret', {
            expiresIn: '1d',
        });

        res.status(200).json({ success: true, token})
    })
}

 


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};


const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ success: false, message: 'El usuario ya existe' });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      },
    });
  } else {
    res.status(400).json({ success: false, message: 'Datos de usuario no válidos' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      },
    });
  } else {
    res.status(401).json({ success: false, message: 'Credenciales inválidas' });
  }
};


const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res.status(404).json({ success: false, message: 'Usuario no encontrado' });
  }
};


const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      data: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } else {
    res.status(404).json({ success: false, message: 'Usuario no encontrado' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
};


exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).send('Usuario no encontrados');




  const token = crypto.randomBytes(32).toString('hex');
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 3600000;
  await user.save();


  const resetLink = `http://localhost:8080/reset-password/${token}`;



  await transporter.sendMail({
    to: user.email,
    subject: 'Recuperacion de contraseña',
    text: `Haz clic en este enlace para restablecer tu contraseña: ${resetLink}`
  });



  res.send('Correo de recuperacion enviado');

};


exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });


  if (!user) return res.status(400).send('Token invalido o expirado');



  user.password = newPassword;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();


  res.send('Contraseña restablecida');
};




exports.register = async (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password, isVerified: false });
  await user.save();



  const verificationToken = crypto.randomBytes(32).toString('hex');
  user.verificationToken = verificationToken;
  await user.save();


  const verificationLink = `http://localhost:8080/verify-email/${verificationToken}`



  await transporter.sendMail({
    to: user.email,
    subject: 'Verifica tu cuenta',
    text: `Haz clic en este enlace para verificar tu cuenta: ${verificationLink}`,
  });


  res.send('Usuario registrado. por favor verifica tu email.');
};


exports.verifyEmail = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ verifycationToken: token });


  if (!user) return res.status(400).send('Token invalido');

  user.isVerified = true;
  user.verifycationToken = undefined;
  await user.save();


  res.send('Email verificado exitosamente');
}


exports.logout = (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token) revokeToken(token);
  res.status(200).json({ message: 'Sesion cerrada y token revocado' });
};


