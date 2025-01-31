const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const CustomError = require('../utils/CustomError');
const User = require('../models/User');


const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Token requerido' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;


res.status(401).json({ message: 'Unauthorized' });


exports.protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];


  if (!token) {
    throw new CustomError('No autorizado', 401);
  }



  const decoded = jwt.verify(token, 'secret');
  req.user = decoded;

  next();
});


exports.restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    throw new CustomError('No tienes permisos para realizar esta accion', 403);
  }
  next();
};





const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ success: false, message: 'No autorizado, token inválido' });
    }
  }

  if (!token) {
    res.status(401).json({ success: false, message: 'No autorizado, no se envió un token' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ success: false, message: 'No autorizado, requiere rol de administrador' });
  }
};



const revokedTokens = new set();

exports.validateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });



  if (revokedTokens.has(token)) {
    return res.status(403).json({ error: 'Token revocado' });
  }



  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token invalido' });
    req.user = decoded;
    next();
  });
};


exports.revokeToken = (token) => {
  revokedTokens.add(token);
};



module.exports = { protect, admin };
