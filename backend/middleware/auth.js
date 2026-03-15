const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Anda tidak memiliki akses' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User tidak ditemukan' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token tidak valid' });
  }
};