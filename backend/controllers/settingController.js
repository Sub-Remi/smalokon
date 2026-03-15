const { Setting } = require('../models');
const fs = require('fs');
const path = require('path');

// @desc    Get all settings (public)
// @route   GET /api/settings
exports.getAllSettings = async (req, res) => {
  try {
    const settings = await Setting.findAll();
    // Ubah menjadi object key-value untuk kemudahan frontend
    const result = {};
    settings.forEach(s => {
      result[s.key] = s.value;
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get settings by kategori (opsional)
// @route   GET /api/settings/kategori/:kategori
exports.getSettingsByKategori = async (req, res) => {
  try {
    const settings = await Setting.findAll({ where: { kategori: req.params.kategori } });
    const result = {};
    settings.forEach(s => {
      result[s.key] = s.value;
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update setting (admin)
// @route   PUT /api/settings/:key
exports.updateSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    const setting = await Setting.findOne({ where: { key } });
    if (!setting) {
      return res.status(404).json({ message: 'Setting tidak ditemukan' });
    }

    await setting.update({ value });
    res.json(setting);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update multiple settings (untuk form)
// @route   POST /api/settings/bulk
exports.updateBulk = async (req, res) => {
  try {
    const updates = req.body; // object { key: value }
    const keys = Object.keys(updates);
    for (const key of keys) {
      await Setting.update({ value: updates[key] }, { where: { key } });
    }
    res.json({ message: 'Settings berhasil diperbarui' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Upload logo (khusus tipe image)
// @route   POST /api/settings/logo
exports.uploadLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'File logo harus diupload' });
    }

    const setting = await Setting.findOne({ where: { key: 'logo' } });
    if (!setting) {
      // Buat jika belum ada
      await Setting.create({ key: 'logo', value: req.file.filename, tipe: 'image', kategori: 'umum' });
    } else {
      // Hapus file lama
      if (setting.value) {
        const oldPath = path.join(__dirname, '../public/uploads', setting.value);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      await setting.update({ value: req.file.filename });
    }

    res.json({ message: 'Logo berhasil diupload', filename: req.file.filename });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};