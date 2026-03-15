const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const beritaRoutes = require('./beritaRoutes');
const fasilitasRoutes = require('./fasilitasRoutes');
const galeriRoutes = require('./galeriRoutes');
const pendaftarRoutes = require('./pendaftarRoutes');
const kontakRoutes = require('./kontakRoutes');
const settingRoutes = require('./settingRoutes');

router.use('/auth', authRoutes);
router.use('/berita', beritaRoutes);
router.use('/fasilitas', fasilitasRoutes);
router.use('/galeri', galeriRoutes);
router.use('/pendaftar', pendaftarRoutes);
router.use('/kontak', kontakRoutes);
router.use('/settings', settingRoutes);

module.exports = router;