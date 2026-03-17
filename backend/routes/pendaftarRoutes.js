const express = require("express");
const router = express.Router();
const pendaftarController = require("../controllers/pendaftarController");
const { protect } = require("../middleware/auth");

// Public
router.post("/", pendaftarController.createPendaftar);
router.get("/count", pendaftarController.countPendaftar);
// Admin
router.get("/", protect, pendaftarController.getAllPendaftar);
router.get("/:id", protect, pendaftarController.getPendaftarById);
router.put("/:id", protect, pendaftarController.updatePendaftar);
router.delete("/:id", protect, pendaftarController.deletePendaftar);

module.exports = router;
