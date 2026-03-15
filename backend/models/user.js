const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nama: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('superadmin', 'admin'),
    defaultValue: 'admin',
  },
}, {
  tableName: 'users',
  timestamps: true,
});

module.exports = User;