const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Fasilitas = sequelize.define('Fasilitas', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nama: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  gambar: {
    type: DataTypes.STRING, // path file gambar atau ikon
    allowNull: true,
  },
  icon: {
    type: DataTypes.STRING(50), // untuk fasilitas tanpa gambar, misal 'fas fa-parking'
    allowNull: true,
  },
  urutan: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'fasilitas',
  timestamps: true,
});

module.exports = Fasilitas;