const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Berita = sequelize.define('Berita', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  kategori: {
    type: DataTypes.ENUM('Prestasi', 'Kegiatan', 'Sosial', 'Pengumuman'),
    allowNull: false,
  },
  tanggal: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  konten: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  gambar: {
    type: DataTypes.STRING, // path file gambar
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Published', 'Draft'),
    defaultValue: 'Draft',
  },
  penulis: {
    type: DataTypes.STRING,
    defaultValue: 'Admin',
  },
}, {
  tableName: 'berita',
  timestamps: true, // createdAt, updatedAt
});

module.exports = Berita;