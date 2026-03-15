const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pendaftar = sequelize.define('Pendaftar', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nama: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  asal_sekolah: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  tanggal_daftar: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ENUM('Menunggu', 'Diterima', 'Ditolak'),
    defaultValue: 'Menunggu',
  },
  // Data tambahan (bisa diperluas)
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  telepon: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  alamat: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  // Berkas (opsional)
  ijazah: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kartu_keluarga: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pas_foto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  prestasi: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'pendaftar',
  timestamps: true,
});

module.exports = Pendaftar;