const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Galeri = sequelize.define('Galeri', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  judul: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  kategori: {
    type: DataTypes.STRING(50), // misal: 'Kegiatan', 'Upacara', 'Olahraga', dll
    allowNull: true,
  },
  file_path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  urutan: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'galeri',
  timestamps: true,
});

module.exports = Galeri;