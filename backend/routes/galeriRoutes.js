const express = require("express");
const router = express.Router();
const galeriController = require("../controllers/galeriController");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");

// Public
router.get("/", galeriController.getAllGaleri);
router.get("/count", galeriController.countGaleri);
router.get("/:id", galeriController.getGaleriById);

// Admin
router.post(
  "/",
  protect,
  upload.single("gambar"),
  galeriController.createGaleri,
);
router.put(
  "/:id",
  protect,
  upload.single("gambar"),
  galeriController.updateGaleri,
);
router.delete("/:id", protect, galeriController.deleteGaleri);

module.exports = router;
