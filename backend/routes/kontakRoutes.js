const express = require('express');
const router = express.Router();
const kontakController = require('../controllers/kontakController');
const { protect } = require('../middleware/auth');

// Public
router.post('/', kontakController.createPesan);

// Admin
router.get('/', protect, kontakController.getAllPesan);
router.get('/:id', protect, kontakController.getPesanById);
router.put('/:id/baca', protect, kontakController.tandaiDibaca);
router.delete('/:id', protect, kontakController.deletePesan);

module.exports = router;