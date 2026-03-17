const { Kontak } = require("../models");

// @desc    Get all pesan
// @route   GET /api/kontak
exports.getAllPesan = async (req, res) => {
  try {
    const { limit } = req.query;
    const options = {
      order: [["createdAt", "DESC"]],
    };
    if (limit) {
      options.limit = parseInt(limit);
    }
    const pesan = await Kontak.findAll(options);
    res.json(pesan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.countPesan = async (req, res) => {
  try {
    const count = await Kontak.count();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get pesan by id
// @route   GET /api/kontak/:id
exports.getPesanById = async (req, res) => {
  try {
    const pesan = await Kontak.findByPk(req.params.id);
    if (!pesan) {
      return res.status(404).json({ message: "Pesan tidak ditemukan" });
    }
    res.json(pesan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create pesan (public)
// @route   POST /api/kontak
exports.createPesan = async (req, res) => {
  try {
    const { nama, email, subjek, pesan } = req.body;
    if (!nama || !email || !subjek || !pesan) {
      return res.status(400).json({ message: "Semua field harus diisi" });
    }

    const kontak = await Kontak.create({
      nama,
      email,
      subjek,
      pesan,
      dibaca: false,
    });

    res.status(201).json({ message: "Pesan terkirim", id: kontak.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Tandai pesan telah dibaca (admin)
// @route   PUT /api/kontak/:id/baca
exports.tandaiDibaca = async (req, res) => {
  try {
    const pesan = await Kontak.findByPk(req.params.id);
    if (!pesan) {
      return res.status(404).json({ message: "Pesan tidak ditemukan" });
    }
    await pesan.update({ dibaca: true });
    res.json({ message: "Pesan ditandai telah dibaca" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete pesan
// @route   DELETE /api/kontak/:id
exports.deletePesan = async (req, res) => {
  try {
    const pesan = await Kontak.findByPk(req.params.id);
    if (!pesan) {
      return res.status(404).json({ message: "Pesan tidak ditemukan" });
    }
    await pesan.destroy();
    res.json({ message: "Pesan berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
