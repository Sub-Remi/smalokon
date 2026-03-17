const { Pendaftar } = require("../models");

// @desc    Get all pendaftar
// @route   GET /api/pendaftar
exports.getAllPendaftar = async (req, res) => {
  try {
    const { limit } = req.query;
    const options = {
      order: [["createdAt", "DESC"]],
    };
    if (limit) {
      options.limit = parseInt(limit);
    }
    const pendaftar = await Pendaftar.findAll(options);
    res.json(pendaftar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.countPendaftar = async (req, res) => {
  try {
    const count = await Pendaftar.count();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get pendaftar by id
// @route   GET /api/pendaftar/:id
exports.getPendaftarById = async (req, res) => {
  try {
    const pendaftar = await Pendaftar.findByPk(req.params.id);
    if (!pendaftar) {
      return res.status(404).json({ message: "Pendaftar tidak ditemukan" });
    }
    res.json(pendaftar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create pendaftar (public)
// @route   POST /api/pendaftar
exports.createPendaftar = async (req, res) => {
  try {
    const { nama, asal_sekolah, email, telepon, alamat } = req.body;
    // Validasi sederhana
    if (!nama || !asal_sekolah) {
      return res
        .status(400)
        .json({ message: "Nama dan asal sekolah harus diisi" });
    }

    const pendaftar = await Pendaftar.create({
      nama,
      asal_sekolah,
      email,
      telepon,
      alamat,
      status: "Menunggu",
    });

    res.status(201).json({ message: "Pendaftaran berhasil", id: pendaftar.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update pendaftar (admin)
// @route   PUT /api/pendaftar/:id
exports.updatePendaftar = async (req, res) => {
  try {
    const pendaftar = await Pendaftar.findByPk(req.params.id);
    if (!pendaftar) {
      return res.status(404).json({ message: "Pendaftar tidak ditemukan" });
    }

    const { nama, asal_sekolah, email, telepon, alamat, status } = req.body;
    await pendaftar.update({
      nama: nama || pendaftar.nama,
      asal_sekolah: asal_sekolah || pendaftar.asal_sekolah,
      email: email || pendaftar.email,
      telepon: telepon || pendaftar.telepon,
      alamat: alamat || pendaftar.alamat,
      status: status || pendaftar.status,
    });

    res.json(pendaftar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete pendaftar
// @route   DELETE /api/pendaftar/:id
exports.deletePendaftar = async (req, res) => {
  try {
    const pendaftar = await Pendaftar.findByPk(req.params.id);
    if (!pendaftar) {
      return res.status(404).json({ message: "Pendaftar tidak ditemukan" });
    }
    await pendaftar.destroy();
    res.json({ message: "Pendaftar berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
