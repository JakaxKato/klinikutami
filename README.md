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
- `assets/images/logo-sami.png`: logo resmi asli dari pengguna; digunakan sebagai favicon.
- `assets/images/logo-sami.webp` dan `assets/images/hero-perawatan.webp`: versi ringan untuk tampilan halaman.
- `assets/fonts/`: tiga font WOFF2 lokal untuk teks editorial, teks utama, dan 29 ikon yang digunakan. Asal file tercatat di `sources.json`; lisensinya ada di `licenses/fonts/`.
- `assets/sources.json`: asal URL gambar, untuk jejak sumber.
- `reference/stitch-export.html`: ekspor asli sebelum perubahan, disimpan sebagai cadangan dan tidak disajikan server preview.
- `design.md`: brief yang diperbarui berdasarkan konfirmasi pengguna.
- `vercel.json`: perintah build dan direktori hasil deploy untuk Vercel.
- `scripts/prepare-vercel.cjs`: menyalin hanya halaman dan aset yang diperlukan ke `dist/`.

FAQ dan profil dokter menggunakan elemen HTML `details`, sehingga tetap bisa dibuka tanpa JavaScript. Jadwal mingguan dikelompokkan menurut hari; konfirmasi slot tetap melalui WhatsApp. Google Maps dimuat setelah tombol “Tampilkan peta” ditekan, dengan tautan lokasi eksternal tetap tersedia. Peta memerlukan jaringan; font halaman disajikan dari aset lokal.

Font Material Symbols dibatasi pada 29 ikon yang digunakan. Bila menambah ikon baru, buat ulang subset font di `assets/fonts/` agar ligatur ikon baru tersedia.

## Verifikasi

```sh
npm test
```

Pengujian Playwright menggunakan Microsoft Edge yang terpasang di Windows. Pengujian meliputi sebelas entri jadwal dalam enam kelompok hari, jumlah CTA WhatsApp, menu ponsel, FAQ melalui keyboard, tautan anchor, pemuatan gambar, reduced motion, dan overflow pada lebar 360, 390, 768, 1024, dan 1440 piksel. Tangkapan layar tersimpan di `test-results/`.

## Deploy ke Vercel lewat GitHub

Proyek ini tidak memerlukan database atau variabel lingkungan. `vercel.json` sudah menentukan build `npm run build:vercel` dan Output Directory `dist`. Folder `dist/` dibuat saat build dan tidak perlu di-commit.

1. Di PowerShell, simpan perubahan ke repo GitHub:

   ```powershell
   cd C:\Users\wijay\Documents\klinikutamasami
   npm.cmd ci
   npm.cmd run build:vercel
   git add .
   git commit -m "Siapkan deploy Vercel"
   git push origin main
   ```

   Jika `git commit` mengatakan tidak ada perubahan, lanjutkan ke langkah berikutnya. Pastikan `npm.cmd run build:vercel` selesai tanpa error sebelum push.

2. Masuk ke [dashboard Vercel](https://vercel.com/dashboard), pilih **Add New → Project**, hubungkan akun GitHub jika diminta, lalu **Import** repo `JakaxKato/klinikutami`.
3. Di konfigurasi proyek, pilih **Framework Preset: Other** dan **Root Directory: `./`**. Periksa Build Command `npm run build:vercel` dan Output Directory `dist`; keduanya sudah berasal dari `vercel.json`. Biarkan Install Command pada pengaturan otomatis. Tidak perlu menambahkan Environment Variables.
4. Klik **Deploy**. Setelah status **Ready**, buka URL `*.vercel.app` yang ditampilkan. Periksa hero, foto dokter, jadwal praktik, tautan WhatsApp, dan tampilan ponsel.

Push berikutnya ke branch `main` akan membuat deploy produksi baru secara otomatis. Jika muncul 404, periksa **Build Logs** dan pastikan Output Directory tetap `dist` serta `dist/index.html` dibuat oleh build.

## Catatan konten

Pengguna mengonfirmasi nama dokter, sembilan layanan, jadwal, foto, dan testimoni dalam ekspor sebagai materi asli klinik. Tiga portrait tersedia untuk drg. Lily, drg. Sammy, dan drg. Nenden; drg. Astriani ditampilkan sebagai dokter mitra tanpa portrait rekaan. Foto latar belakang pendidikan yang disebut dalam brief awal belum disertakan sebagai file terpisah; website memakai uraian fokus perawatan dari ekspor.

Logo resmi dari pengguna kini ditampilkan di header, footer, dan favicon. Instagram mengikuti tangkapan akun yang diberikan pengguna: `klinikutamasami.id`.

## Ringkasan perbaikan

- Menghapus duplikasi dua dokumen HTML dan konflik skrip desktop/mobile.
- Mempertahankan konten yang dikonfirmasi pengguna; memperbarui brief dari tiga menjadi empat dokter dan dari lima menjadi sembilan layanan.
- Mendekatkan hero ke referensi fotografi, merapikan navigasi pill, tipografi editorial, spacing, warna tombol, serta tampilan ponsel.
- Menampilkan sebelas jadwal dalam enam kelompok hari bersama brosur asli.
- Menata ulang hero dan jadwal mengikuti dua tangkapan referensi serta membatasi CTA WhatsApp utama pada header, hero, jadwal, dan penutup.
- Mengganti gambar peta dengan akses Google Maps, memperbaiki alt text, fokus keyboard, disclosure FAQ/profil, dan target navigasi.
- Memindahkan CSS serta interaksi ke file terpisah dan menyimpan aset lokal. Halaman tidak lagi memuat formulir duplikat yang meminta data pasien.

Website telah dipublikasikan pengguna di [klinikutami.vercel.app](https://klinikutami.vercel.app/). Perubahan lokal berikutnya perlu di-push agar Vercel menerbitkannya.
