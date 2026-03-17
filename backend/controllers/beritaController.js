const { Berita } = require("../models");
const fs = require("fs");
const path = require("path");
const { Op } = require("sequelize");

// @desc    Get all berita with filter, search, pagination
// @route   GET /api/berita
exports.getAllBerita = async (req, res) => {
  try {
    const { limit, page, kategori, search } = req.query;
    const where = {};

    if (kategori) {
      where.kategori = kategori;
    }
    if (search) {
      where.judul = { [Op.iLike]: `%${search}%` }; // pastikan Op diimpor dari sequelize
    }

    const options = {
      where,
      order: [
        ["tanggal", "DESC"],
        ["createdAt", "DESC"],
      ],
    };

    if (limit) {
      options.limit = parseInt(limit);
    }
    if (page && limit) {
      options.offset = (parseInt(page) - 1) * parseInt(limit);
    }

    const berita = await Berita.findAll(options);
    res.json(berita);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get total berita
// @route   GET /api/berita/count
exports.countBerita = async (req, res) => {
  try {
    const { kategori, search } = req.query;
    const where = {};

    if (kategori) {
      where.kategori = kategori;
    }
    if (search) {
      where.judul = { [Op.iLike]: `%${search}%` };
    }

    const count = await Berita.count({ where });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get berita by id
// @route   GET /api/berita/:id
exports.getBeritaById = async (req, res) => {
  try {
    const berita = await Berita.findByPk(req.params.id);
    if (!berita) {
      return res.status(404).json({ message: "Berita tidak ditemukan" });
    }
    // Increment views
    berita.views += 1;
    await berita.save();
    res.json(berita);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get berita by slug
// @route   GET /api/berita/slug/:slug
exports.getBeritaBySlug = async (req, res) => {
  try {
    const berita = await Berita.findOne({ where: { slug: req.params.slug } });
    if (!berita) {
      return res.status(404).json({ message: "Berita tidak ditemukan" });
    }
    berita.views += 1;
    await berita.save();
    res.json(berita);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create berita
// @route   POST /api/berita
exports.createBerita = async (req, res) => {
  try {
    const { judul, kategori, tanggal, konten, status, penulis } = req.body;
    const gambar = req.file ? req.file.filename : null;

    const berita = await Berita.create({
      judul,
      kategori,
      tanggal,
      konten,
      gambar,
      status,
      penulis: penulis || req.user?.nama || "Admin",
    });

    res.status(201).json(berita);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update berita
// @route   PUT /api/berita/:id
exports.updateBerita = async (req, res) => {
  try {
    const berita = await Berita.findByPk(req.params.id);
    if (!berita) {
      return res.status(404).json({ message: "Berita tidak ditemukan" });
    }

    const { judul, kategori, tanggal, konten, status, penulis } = req.body;
    let gambar = berita.gambar;

    // Jika ada file baru, hapus file lama
    if (req.file) {
      if (berita.gambar) {
        const oldPath = path.join(
          __dirname,
          "../public/uploads",
          berita.gambar,
        );
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      gambar = req.file.filename;
    }

    await berita.update({
      judul: judul || berita.judul,
      kategori: kategori || berita.kategori,
      tanggal: tanggal || berita.tanggal,
      konten: konten || berita.konten,
      gambar,
      status: status || berita.status,
      penulis: penulis || berita.penulis,
    });

    res.json(berita);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete berita
// @route   DELETE /api/berita/:id
exports.deleteBerita = async (req, res) => {
  try {
    const berita = await Berita.findByPk(req.params.id);
    if (!berita) {
      return res.status(404).json({ message: "Berita tidak ditemukan" });
    }

    // Hapus file gambar jika ada
    if (berita.gambar) {
      const filePath = path.join(__dirname, "../public/uploads", berita.gambar);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await berita.destroy();
    res.json({ message: "Berita berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
