const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settingController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public
router.get('/', settingController.getAllSettings);
router.get('/kategori/:kategori', settingController.getSettingsByKategori);

// Admin
router.put('/:key', protect, settingController.updateSetting);
router.post('/bulk', protect, settingController.updateBulk);
router.post('/logo', protect, upload.single('logo'), settingController.uploadLogo);

module.exports = router;