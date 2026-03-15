const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Kontak = sequelize.define('Kontak', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nama: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  subjek: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  pesan: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  dibaca: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  tanggal: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'kontak',
  timestamps: true,
});

module.exports = Kontak;