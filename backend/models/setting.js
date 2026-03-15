const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Setting = sequelize.define('Setting', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  key: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tipe: {
    type: DataTypes.ENUM('text', 'textarea', 'image'),
    defaultValue: 'text',
  },
  kategori: {
    type: DataTypes.STRING(50), // misal: 'tentang', 'kontak', 'sosmed'
    allowNull: true,
  },
}, {
  tableName: 'settings',
  timestamps: true,
});

module.exports = Setting;