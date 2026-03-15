const express = require('express');
const router = express.Router();
const fasilitasController = require('../controllers/fasilitasController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public
router.get('/', fasilitasController.getAllFasilitas);
router.get('/:id', fasilitasController.getFasilitasById);

// Admin
router.post('/', protect, upload.single('gambar'), fasilitasController.createFasilitas);
router.put('/:id', protect, upload.single('gambar'), fasilitasController.updateFasilitas);
router.delete('/:id', protect, fasilitasController.deleteFasilitas);

module.exports = router;