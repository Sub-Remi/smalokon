const express = require("express");
const router = express.Router();
const beritaController = require("../controllers/beritaController");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");

// Public
router.get("/", beritaController.getAllBerita);
router.get("/count", beritaController.countBerita);
router.get("/:id", beritaController.getBeritaById);
router.get("/slug/:slug", beritaController.getBeritaBySlug);

// Admin
router.post(
  "/",
  protect,
  upload.single("gambar"),
  beritaController.createBerita,
);
router.put(
  "/:id",
  protect,
  upload.single("gambar"),
  beritaController.updateBerita,
);
router.delete("/:id", protect, beritaController.deleteBerita);

module.exports = router;
