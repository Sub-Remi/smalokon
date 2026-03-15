const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Berita = sequelize.define('Berita', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  judul: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING(200),
    unique: true,
  },
  kategori: {
    type: DataTypes.ENUM('Prestasi', 'Kegiatan', 'Sosial', 'Pengumuman'),
    allowNull: false,
  },
  tanggal: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
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
    type: DataTypes.STRING(100),
    defaultValue: 'Admin',
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'berita',
  timestamps: true,
});

// Hook untuk membuat slug dari judul
Berita.beforeCreate(async (berita) => {
  if (berita.judul) {
    berita.slug = berita.judul.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
  }
});

module.exports = Berita;