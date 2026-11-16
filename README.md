# Klinik Utama SAMI

Website statis berbahasa Indonesia. Desain dari ekspor Stitch dirapikan menjadi satu halaman responsif, menggunakan Tailwind CSS 3 dan JavaScript tanpa framework.

## Menjalankan proyek

```sh
npm install
npm run build
npm run dev
```

Buka alamat yang tercetak setelah `SAMI preview:` (biasanya `http://127.0.0.1:4173`). Jika port 4173 sedang dipakai, server otomatis mencoba port berikutnya hingga 4178. Muat ulang browser setelah mengedit. Jalankan kembali `npm run build` bila HTML, kelas Tailwind, konfigurasi tema, atau CSS berubah.

## File utama

- `index.html`: seluruh konten, empat dokter, sembilan layanan, sebelas sesi jadwal, foto, dan tautan. Satu dokumen untuk semua ukuran layar.
- `styles.css`: styling tambahan dan aturan responsif.
- `tailwind.config.cjs`: token tema dari ekspor, termasuk Plus Jakarta Sans dan Newsreader.
- `scripts/site.js`: menu mobile dan pemuatan peta atas permintaan.
- `assets/site.css`: hasil build CSS yang dipakai langsung oleh halaman; tidak membutuhkan Tailwind CDN saat dibuka.
- `assets/images/`: foto dan brosur yang disimpan lokal dari ekspor.
- `assets/sources.json`: asal URL gambar, untuk jejak sumber.
- `reference/stitch-export.html`: ekspor asli sebelum perubahan, disimpan sebagai cadangan dan tidak disajikan server preview.
- `design.md`: brief yang diperbarui berdasarkan konfirmasi pengguna.

FAQ dan profil dokter menggunakan elemen HTML `details`, sehingga tetap bisa dibuka tanpa JavaScript. Jadwal mingguan dikelompokkan menurut hari; konfirmasi slot tetap melalui WhatsApp. Google Maps dimuat setelah tombol “Tampilkan peta” ditekan, dengan tautan lokasi eksternal tetap tersedia. Peta dan Google Fonts memerlukan jaringan.

## Verifikasi

```sh
npm test
```

Pengujian Playwright menggunakan Microsoft Edge yang terpasang di Windows. Pengujian meliputi sebelas entri jadwal dalam enam kelompok hari, jumlah CTA WhatsApp, menu ponsel, FAQ melalui keyboard, tautan anchor, pemuatan gambar, reduced motion, dan overflow pada lebar 360, 390, 768, 1024, dan 1440 piksel. Tangkapan layar tersimpan di `test-results/`.

## Catatan konten

Pengguna mengonfirmasi nama dokter, sembilan layanan, jadwal, foto, dan testimoni dalam ekspor sebagai materi asli klinik. Tiga portrait tersedia untuk drg. Lily, drg. Sammy, dan drg. Nenden; drg. Astriani ditampilkan sebagai dokter mitra tanpa portrait rekaan. Foto latar belakang pendidikan yang disebut dalam brief awal belum disertakan sebagai file terpisah; website memakai uraian fokus perawatan dari ekspor.

URL logo dalam ekspor mengarah ke halaman login Google. Header, footer, dan favicon sementara memakai monogram teks “S”; ganti dengan file logo asli saat tersedia. Instagram mengikuti tangkapan akun yang diberikan pengguna: `klinikutamasami.id`.

## Ringkasan perbaikan

- Menghapus duplikasi dua dokumen HTML dan konflik skrip desktop/mobile.
- Mempertahankan konten yang dikonfirmasi pengguna; memperbarui brief dari tiga menjadi empat dokter dan dari lima menjadi sembilan layanan.
- Mendekatkan hero ke referensi fotografi, merapikan navigasi pill, tipografi editorial, spacing, warna tombol, serta tampilan ponsel.
- Menampilkan sebelas jadwal dalam enam kelompok hari bersama brosur asli.
- Menata ulang hero dan jadwal mengikuti dua tangkapan referensi serta membatasi CTA WhatsApp utama pada header, hero, jadwal, dan penutup.
- Mengganti gambar peta dengan akses Google Maps, memperbaiki alt text, fokus keyboard, disclosure FAQ/profil, dan target navigasi.
- Memindahkan CSS serta interaksi ke file terpisah dan menyimpan aset lokal. Halaman tidak lagi memuat formulir duplikat yang meminta data pasien.

Website masih berupa proyek lokal dan belum dipublikasikan.
