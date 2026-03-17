const { Galeri } = require("../models");
const fs = require("fs");
const path = require("path");

// @desc    Get all galeri
// @route   GET /api/galeri
exports.getAllGaleri = async (req, res) => {
  try {
    const { limit } = req.query;
    const options = {
      order: [
        ["urutan", "ASC"],
        ["createdAt", "DESC"],
      ],
    };
    if (limit) {
      options.limit = parseInt(limit);
    }
    const galeri = await Galeri.findAll(options);
    res.json(galeri);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.countGaleri = async (req, res) => {
  try {
    const count = await Galeri.count();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get galeri by id
// @route   GET /api/galeri/:id
exports.getGaleriById = async (req, res) => {
  try {
    const galeri = await Galeri.findByPk(req.params.id);
    if (!galeri) {
      return res.status(404).json({ message: "Galeri tidak ditemukan" });
    }
    res.json(galeri);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create galeri
// @route   POST /api/galeri
exports.createGaleri = async (req, res) => {
  try {
    const { judul, deskripsi, kategori, urutan } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "File gambar harus diupload" });
    }
    const file_path = req.file.filename;

    const galeri = await Galeri.create({
      judul,
      deskripsi,
      kategori,
      file_path,
      urutan: urutan || 0,
    });

    res.status(201).json(galeri);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update galeri
// @route   PUT /api/galeri/:id
exports.updateGaleri = async (req, res) => {
  try {
    const galeri = await Galeri.findByPk(req.params.id);
    if (!galeri) {
      return res.status(404).json({ message: "Galeri tidak ditemukan" });
    }

    const { judul, deskripsi, kategori, urutan } = req.body;
    let file_path = galeri.file_path;

    if (req.file) {
      // Hapus file lama
      const oldPath = path.join(
        __dirname,
        "../public/uploads",
        galeri.file_path,
      );
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
      file_path = req.file.filename;
    }

    await galeri.update({
      judul: judul || galeri.judul,
      deskripsi: deskripsi || galeri.deskripsi,
      kategori: kategori || galeri.kategori,
      file_path,
      urutan: urutan !== undefined ? urutan : galeri.urutan,
    });

    res.json(galeri);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete galeri
// @route   DELETE /api/galeri/:id
exports.deleteGaleri = async (req, res) => {
  try {
    const galeri = await Galeri.findByPk(req.params.id);
    if (!galeri) {
      return res.status(404).json({ message: "Galeri tidak ditemukan" });
    }

    // Hapus file
    const filePath = path.join(
      __dirname,
      "../public/uploads",
      galeri.file_path,
    );
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await galeri.destroy();
    res.json({ message: "Galeri berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
