const sequelize = require('../config/database');
const User = require('./user');
const Berita = require('./berita');
const Fasilitas = require('./fasilitas');
const Galeri = require('./galeri');
const Pendaftar = require('./pendaftar');
const Kontak = require('./kontak');
const Setting = require('./setting');

// Definisikan relasi jika diperlukan
// Contoh: User.hasMany(Berita, { foreignKey: 'penulisId' });
// Berita.belongsTo(User, { foreignKey: 'penulisId' });

const db = {
  sequelize,
  User,
  Berita,
  Fasilitas,
  Galeri,
  Pendaftar,
  Kontak,
  Setting,
};

module.exports = db;