const bcrypt = require('bcryptjs');
const db = require('./models');
const { User, Berita, Fasilitas, Galeri, Kontak, Pendaftar, Setting } = db;

async function seed() {
  try {
    // Sinkronisasi database (jika belum)
    await db.sequelize.sync({ force: false }); // jangan force, agar tidak hapus tabel

    // 1. Buat user admin jika belum ada
    const adminExists = await User.findOne({ where: { username: 'admin' } });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        username: 'admin',
        password: hashedPassword,
        nama: 'Administrator',
        role: 'superadmin'
      });
      console.log('Admin user created.');
    } else {
      console.log('Admin already exists.');
    }

    // 2. Setting default
    const defaultSettings = [
      { key: 'visi', value: 'Menjadi lembaga pendidikan unggulan yang membentuk generasi beriman, cerdas, dan berkarakter berdasarkan nilai-nilai Kristiani.', kategori: 'tentang', tipe: 'textarea' },
      { key: 'misi', value: 'Menyelenggarakan pembelajaran berkualitas, membina karakter Kristiani, mengembangkan potensi siswa secara holistik, dan menciptakan lingkungan sekolah yang aman dan menyenangkan.', kategori: 'tentang', tipe: 'textarea' },
      { key: 'tujuan', value: 'Menghasilkan lulusan yang beriman, cerdas, terampil, dan siap melanjutkan pendidikan ke jenjang yang lebih tinggi serta menjadi pemimpin masa depan.', kategori: 'tentang', tipe: 'textarea' },
      { key: 'alamat', value: 'Jl. Pendidikan No. 123, Tomohon, Sulawesi Utara', kategori: 'kontak', tipe: 'text' },
      { key: 'telepon', value: '(0431) 123456', kategori: 'kontak', tipe: 'text' },
      { key: 'email', value: 'info@smalokon.sch.id', kategori: 'kontak', tipe: 'text' },
      { key: 'jam_operasional', value: 'Senin - Jumat : 07.00 - 16.00', kategori: 'kontak', tipe: 'text' },
      { key: 'instagram', value: 'https://instagram.com/smalokon', kategori: 'sosmed', tipe: 'text' },
      { key: 'facebook', value: 'https://facebook.com/smalokon', kategori: 'sosmed', tipe: 'text' },
      { key: 'whatsapp', value: '+628123456789', kategori: 'sosmed', tipe: 'text' },
      { key: 'tiktok', value: 'https://tiktok.com/@smalokon', kategori: 'sosmed', tipe: 'text' },
      { key: 'youtube', value: 'https://youtube.com/smalokon', kategori: 'sosmed', tipe: 'text' },
      { key: 'logo', value: 'logo.png', kategori: 'umum', tipe: 'image' },
    ];

    for (const s of defaultSettings) {
      const [setting, created] = await Setting.findOrCreate({
        where: { key: s.key },
        defaults: s
      });
      if (created) console.log(`Setting ${s.key} created.`);
      else console.log(`Setting ${s.key} already exists.`);
    }

    // 3. Berita dummy
    const beritaCount = await Berita.count();
    if (beritaCount === 0) {
      const beritaDummy = [
        {
          judul: 'Siswa SMA Lokon Raih Medali Emas OSN 2026',
          slug: 'siswa-sma-lokon-raih-medali-emas-osn-2026',
          kategori: 'Prestasi',
          tanggal: '2026-02-25',
          konten: 'Prestasi membanggakan kembali diraih oleh siswa SMA Lokon Tomohon. Maria Angelina, siswi kelas XII IPA 1, berhasil meraih medali emas dalam Olimpiade Sains Nasional (OSN) 2026 bidang Biologi yang diselenggarakan di Jakarta pada 20-25 Februari 2026. Kompetisi tahunan ini diikuti oleh ribuan siswa terbaik dari seluruh Indonesia. Maria berhasil melewati babak penyisihan, semifinal, hingga final dengan nilai tertinggi.',
          gambar: 'berita1.jpg',
          status: 'Published',
          penulis: 'Admin',
          views: 0
        },
        {
          judul: 'Workshop Robotik bersama Alumni',
          slug: 'workshop-robotik-bersama-alumni',
          kategori: 'Kegiatan',
          tanggal: '2026-02-10',
          konten: 'Para siswa mengikuti workshop robotik yang diadakan oleh alumni yang berprofesi sebagai engineer. Workshop ini bertujuan untuk memperkenalkan dasar-dasar robotika dan pemrograman kepada siswa. Kegiatan berlangsung meriah di laboratorium komputer sekolah.',
          gambar: 'berita2.jpg',
          status: 'Published',
          penulis: 'Admin',
          views: 0
        },
        {
          judul: 'Bakti Sosial Paskah di Desa Kinilow',
          slug: 'bakti-sosial-paskah-di-desa-kinilow',
          kategori: 'Sosial',
          tanggal: '2026-02-05',
          konten: 'Kegiatan bakti sosial rutin SMA Lokon mengunjungi desa Kinilow untuk membantu masyarakat. Dalam kegiatan ini, siswa membersihkan lingkungan, membagikan sembako, dan mengadakan ibadah bersama.',
          gambar: 'berita3.jpg',
          status: 'Published',
          penulis: 'Admin',
          views: 0
        },
        {
          judul: 'Penerimaan Siswa Baru Dibuka',
          slug: 'penerimaan-siswa-baru-dibuka',
          kategori: 'Pengumuman',
          tanggal: '2026-01-08',
          konten: 'Pendaftaran siswa baru tahun ajaran 2026/2027 telah dibuka. Simak informasi lengkapnya di halaman Penerimaan.',
          gambar: 'berita4.jpg',
          status: 'Published',
          penulis: 'Admin',
          views: 0
        }
      ];
      await Berita.bulkCreate(beritaDummy);
      console.log('Berita dummy created.');
    } else {
      console.log('Berita already exists.');
    }

    // 4. Fasilitas dummy
    const fasilitasCount = await Fasilitas.count();
    if (fasilitasCount === 0) {
      const fasilitasDummy = [
        { nama: 'Laboratorium Sains', deskripsi: 'Lab Fisika, Kimia, dan Biologi dengan peralatan modern untuk praktikum siswa.', gambar: 'lab.jpg', icon: null, urutan: 1 },
        { nama: 'Perpustakaan', deskripsi: 'Koleksi ribuan buku, ruang baca nyaman, dan akses digital ke jurnal ilmiah.', gambar: 'library.jpg', icon: null, urutan: 2 },
        { nama: 'Lapangan Olahraga', deskripsi: 'Lapangan basket, voli, futsal, dan area atletik untuk pengembangan bakat olahraga.', gambar: 'field.jpg', icon: null, urutan: 3 },
        { nama: 'Ruang Kelas Smart', deskripsi: 'Kelas ber-AC dengan smart TV, akses Wi-Fi, dan desain interior yang mendukung kenyamanan belajar.', gambar: 'class.jpg', icon: null, urutan: 4 },
        { nama: 'Aula Serbaguna', deskripsi: 'Ruang pertemuan, seminar, dan kegiatan kesenian dengan kapasitas 500 orang.', gambar: 'hall.jpg', icon: null, urutan: 5 },
        { nama: 'Kantin Sehat', deskripsi: 'Menyediakan makanan bergizi dengan harga terjangkau, kebersihan terjaga.', gambar: 'canteen.jpg', icon: null, urutan: 6 },
        { nama: 'Area Parkir Luas', deskripsi: 'Parkir kendaraan roda dua dan empat yang aman dan tertata rapi.', gambar: null, icon: 'fas fa-parking', urutan: 7 },
        { nama: 'Lahan Hijau & Taman', deskripsi: 'Area taman yang asri untuk relaksasi dan kegiatan outdoor siswa.', gambar: null, icon: 'fas fa-tree', urutan: 8 },
      ];
      await Fasilitas.bulkCreate(fasilitasDummy);
      console.log('Fasilitas dummy created.');
    } else {
      console.log('Fasilitas already exists.');
    }

    // 5. Galeri dummy
    const galeriCount = await Galeri.count();
    if (galeriCount === 0) {
      const galeriDummy = [
        { judul: 'Kegiatan Belajar', deskripsi: 'Suasana kelas interaktif', kategori: 'Kegiatan', file_path: 'gallery1.jpg', urutan: 1 },
        { judul: 'Upacara Bendera', deskripsi: 'Setiap Senin pagi', kategori: 'Upacara', file_path: 'gallery2.jpg', urutan: 2 },
        { judul: 'Ekstrakurikuler Futsal', deskripsi: 'Futsal antar kelas', kategori: 'Olahraga', file_path: 'gallery3.jpg', urutan: 3 },
        { judul: 'Perpustakaan', deskripsi: 'Membaca di sudut literasi', kategori: 'Perpustakaan', file_path: 'gallery4.jpg', urutan: 4 },
        { judul: 'Gedung Sekolah', deskripsi: 'Area depan sekolah', kategori: 'Sekolah', file_path: 'gallery5.jpg', urutan: 5 },
        { judul: 'Praktikum', deskripsi: 'Kegiatan laboratorium', kategori: 'Praktikum', file_path: 'gallery6.jpg', urutan: 6 },
        { judul: 'Bakti Sosial', deskripsi: 'Kegiatan di masyarakat', kategori: 'Sosial', file_path: 'gallery7.jpg', urutan: 7 },
        { judul: 'Kelulusan', deskripsi: 'Wisuda angkatan 2025', kategori: 'Kegiatan', file_path: 'gallery8.jpg', urutan: 8 },
      ];
      await Galeri.bulkCreate(galeriDummy);
      console.log('Galeri dummy created.');
    } else {
      console.log('Galeri already exists.');
    }

    // 6. Kontak dummy (pesan masuk)
    const kontakCount = await Kontak.count();
    if (kontakCount === 0) {
      const kontakDummy = [
        { nama: 'John Doe', email: 'john@example.com', subjek: 'Tanya informasi pendaftaran', pesan: 'Apakah pendaftaran masih dibuka?', dibaca: false },
        { nama: 'Maria Wong', email: 'maria@example.com', subjek: 'Konfirmasi jadwal tes', pesan: 'Saya ingin konfirmasi jadwal tes tanggal 5 April', dibaca: true },
        { nama: 'Antonius', email: 'anton@example.com', subjek: 'Kerjasama kegiatan', pesan: 'Kami ingin mengajak kerjasama untuk kegiatan seminar', dibaca: false },
      ];
      await Kontak.bulkCreate(kontakDummy);
      console.log('Kontak dummy created.');
    } else {
      console.log('Kontak already exists.');
    }

    // 7. Pendaftar dummy
    const pendaftarCount = await Pendaftar.count();
    if (pendaftarCount === 0) {
      const pendaftarDummy = [
        { nama: 'Andi Saputra', asal_sekolah: 'SMP Negeri 1 Tomohon', email: 'andi@example.com', telepon: '081234567890', alamat: 'Jl. Merdeka No. 10', status: 'Menunggu' },
        { nama: 'Budi Santoso', asal_sekolah: 'SMP Katolik Tomohon', email: 'budi@example.com', telepon: '081234567891', alamat: 'Jl. Diponegoro No. 5', status: 'Diterima' },
        { nama: 'Cindy Wong', asal_sekolah: 'SMP Advent Tomohon', email: 'cindy@example.com', telepon: '081234567892', alamat: 'Jl. Sam Ratulangi No. 20', status: 'Ditolak' },
      ];
      await Pendaftar.bulkCreate(pendaftarDummy);
      console.log('Pendaftar dummy created.');
    } else {
      console.log('Pendaftar already exists.');
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();