const { Fasilitas } = require("../models");
const fs = require("fs");
const path = require("path");

// @desc    Get all fasilitas
// @route   GET /api/fasilitas
exports.getAllFasilitas = async (req, res) => {
  try {
    const fasilitas = await Fasilitas.findAll({ order: [["urutan", "ASC"]] });
    res.json(fasilitas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.countFasilitas = async (req, res) => {
  try {
    const count = await Fasilitas.count();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get fasilitas by id
// @route   GET /api/fasilitas/:id
exports.getFasilitasById = async (req, res) => {
  try {
    const fasilitas = await Fasilitas.findByPk(req.params.id);
    if (!fasilitas) {
      return res.status(404).json({ message: "Fasilitas tidak ditemukan" });
    }
    res.json(fasilitas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create fasilitas
// @route   POST /api/fasilitas
exports.createFasilitas = async (req, res) => {
  try {
    const { nama, deskripsi, icon, urutan } = req.body;
    const gambar = req.file ? req.file.filename : null;

    const fasilitas = await Fasilitas.create({
      nama,
      deskripsi,
      gambar,
      icon,
      urutan: urutan || 0,
    });

    res.status(201).json(fasilitas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update fasilitas
// @route   PUT /api/fasilitas/:id
exports.updateFasilitas = async (req, res) => {
  try {
    const fasilitas = await Fasilitas.findByPk(req.params.id);
    if (!fasilitas) {
      return res.status(404).json({ message: "Fasilitas tidak ditemukan" });
    }

    const { nama, deskripsi, icon, urutan } = req.body;
    let gambar = fasilitas.gambar;

    if (req.file) {
      if (fasilitas.gambar) {
        const oldPath = path.join(
          __dirname,
          "../public/uploads",
          fasilitas.gambar,
        );
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      gambar = req.file.filename;
    }

    await fasilitas.update({
      nama: nama || fasilitas.nama,
      deskripsi: deskripsi || fasilitas.deskripsi,
      gambar,
      icon: icon || fasilitas.icon,
      urutan: urutan !== undefined ? urutan : fasilitas.urutan,
    });

    res.json(fasilitas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete fasilitas
// @route   DELETE /api/fasilitas/:id
exports.deleteFasilitas = async (req, res) => {
  try {
    const fasilitas = await Fasilitas.findByPk(req.params.id);
    if (!fasilitas) {
      return res.status(404).json({ message: "Fasilitas tidak ditemukan" });
    }

    if (fasilitas.gambar) {
      const filePath = path.join(
        __dirname,
        "../public/uploads",
        fasilitas.gambar,
      );
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await fasilitas.destroy();
    res.json({ message: "Fasilitas berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
