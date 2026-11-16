# Design System & Website Specification — Klinik Utama SAMI

**Status:** Acuan implementasi setelah audit ekspor Stitch  
**Bahasa antarmuka:** Indonesia  
**Tujuan utama:** Membantu calon pasien memahami layanan, mengenal dokter, melihat jadwal, dan menghubungi admin melalui WhatsApp.  
**Rujukan visual:** Gambar referensi website dental yang diberikan pengguna; gunakan sebagai arah visual, bukan template untuk disalin.

## Keputusan terbaru dari pengguna

Pada tahap audit kode, pengguna mengonfirmasi data tambahan dalam ekspor: **empat dokter, sembilan layanan, jadwal praktik terperinci, serta foto dan testimoni asli klinik**. Keputusan ini memperbarui batas tiga dokter dan lima kategori layanan pada brief awal. Tiga dokter memiliki portrait; drg. Astriani Amanda, Sp.KG ditampilkan sebagai dokter mitra tanpa portrait rekaan.

Implementasi mempertahankan Tailwind CSS 3, Plus Jakarta Sans, dan Newsreader dari ekspor. Desktop dan mobile memakai satu dokumen responsif. Logo resmi yang diberikan pengguna dipakai di header, footer, dan favicon.

## 1. Prinsip produk

Website ini adalah pusat informasi dan jalur menuju reservasi melalui WhatsApp. Pengunjung harus dapat menjawab empat pertanyaan dalam waktu singkat:

1. Klinik ini melayani kebutuhan gigi apa?
2. Siapa dokter yang praktik?
3. Kapan dokter yang relevan tersedia?
4. Bagaimana menghubungi klinik atau menuju lokasinya?

Prioritaskan kejelasan, rasa percaya, dan kemudahan penggunaan di ponsel. Hindari fitur yang terlihat bekerja tetapi belum terhubung ke alur operasional klinik, seperti kalender reservasi dengan slot fiktif.

### Sasaran konversi

- **Utama:** Klik tombol WhatsApp untuk bertanya jadwal atau layanan.
- **Pendukung:** Klik petunjuk arah Google Maps, melihat profil dokter, dan membaca informasi layanan.
- **Pengukuran setelah rilis:** Jumlah klik WhatsApp, klik petunjuk arah, dan halaman layanan/dokter yang paling sering dibuka. Angka tersebut mengukur interaksi website, bukan jumlah pasien yang benar-benar datang.

**Penempatan CTA:** Tampilkan tombol WhatsApp utama pada header, hero, bagian jadwal, dan penutup halaman. Nomor WhatsApp tetap dapat ditautkan sebagai teks pada FAQ, kontak, dan footer. Tidak ada tombol reservasi pada setiap kartu layanan, kartu dokter, atau baris jadwal.

## 2. Fakta yang tersedia dan hal yang belum pasti

| Informasi | Status | Perlakuan dalam desain |
| --- | --- | --- |
| Nama pada logo dan Instagram: Klinik Utama SAMI | Tersedia dari materi pengguna | Gunakan sebagai merek utama. |
| Sukabumi Dental Care | Nama pendamping pada materi Maps dan ekspor pengguna | Klinik Utama SAMI tetap menjadi merek utama; Sukabumi Dental Care sebagai keterangan pendamping, tanpa klaim nama hukum. |
| Alamat: Jl. Gudang No.23, Kebonjati, Cikole, Kota Sukabumi, Jawa Barat 43113 | Tersedia dari Maps yang diberikan pengguna | Tampilkan di bagian lokasi dan footer; cocokkan lagi sebelum rilis. |
| Kontak: 0812-9346-1648 | Tersedia dari Maps dan profil Instagram pada materi pengguna | Gunakan untuk CTA WhatsApp; konfirmasi bahwa nomor menerima reservasi. |
| Empat dokter: drg. Lily Mustapa, Sp.KG; drg. Sammy; drg. Nenden Handayani; drg. Astriani Amanda, Sp.KG | Dikonfirmasi pengguna saat audit kode | Tiga kartu portrait dan satu profil dokter mitra. Foto latar belakang pendidikan belum tersedia sebagai aset terpisah. |
| Foto perawatan gigi | Dinyatakan pengguna | Gunakan sebagai gambar utama layanan, galeri, dan kemungkinan hero. |
| Jadwal praktik tiap dokter | Data ekspor dikonfirmasi pengguna | Pertahankan sebelas entri dalam enam kelompok hari dan tampilkan brosur; ketersediaan slot tetap dikonfirmasi admin. |
| Ulasan Google dan rating | Tangkapan Maps memperlihatkan 4,9 dari 74 ulasan pada saat diambil | Tautkan ke ulasan Google. Jangan menjadikan angka ini teks permanen tanpa mekanisme pembaruan. |
| Harga, asuransi/BPJS, akreditasi, jaminan hasil perawatan | Belum diberikan | Jangan menambahkan klaim. |
| Foto dan dua testimoni pasien | Dikonfirmasi pengguna sebagai materi asli klinik | Pertahankan kutipan dan atribusi dari ekspor; foto disimpan lokal. |

## 3. Arah visual

**Karakter:** modern, stylish, elegan, tenang, hangat, dan terasa lancar saat digunakan. Website harus terasa seperti klinik sungguhan di Sukabumi, bukan tema dental generik.

### Elemen yang diambil dari referensi

- Hero dengan judul editorial terpusat pada latar terang, diikuti foto perawatan besar di bawahnya.
- Navigasi putih berbentuk pill yang melayang di bagian atas halaman.
- Kombinasi huruf sans-serif modern dan aksen serif miring pada judul besar.
- Ruang kosong yang lega dan pergantian latar putih serta biru pucat.
- Kartu layanan bersudut membulat dengan teks yang mudah dipindai.

### Penyesuaian untuk SAMI

- Utamakan foto asli dokter dan tindakan yang disediakan pengguna.
- Gunakan warna biru logo SAMI sebagai dasar, dengan saturasi yang lebih terkendali daripada desain unggahan promosi.
- Buat halaman lebih ringkas daripada referensi. Bagian statistik besar, pricing, blog, dan newsletter tidak diperlukan untuk versi pertama.
- Hindari ikon gigi berulang, foto stok dokter, testimoni rekaan, dan angka keberhasilan yang tidak didukung data.

## 4. Token desain awal

Nilai di bawah adalah titik awal untuk Stitch dan implementasi. Sesuaikan secara kecil setelah foto dan logo asli ditempatkan; pertahankan kontras dan hierarki.

| Token | Nilai awal | Penggunaan |
| --- | --- | --- |
| `color.surface` | `#FFFFFF` | Latar utama dan kartu. |
| `color.surface-soft` | `#EEF5FC` | Bagian layanan, jadwal, dan FAQ. |
| `color.ink` | `#142231` | Teks utama dan footer gelap. |
| `color.muted` | `#5C6B7A` | Teks pendukung. |
| `color.brand` | `#0875D1` | Tombol utama dan aksen navigasi. |
| `color.brand-hover` | `#075EA8` | Hover tombol utama. |
| `color.border` | `#DDE6EF` | Garis pemisah dan batas kartu. |
| `font.sans` | `Plus Jakarta Sans`, sans-serif | Navigasi, paragraf, tombol, label. |
| `font.display` | `Newsreader`, Georgia, serif | Aksen judul, terutama kata/frasa miring. |
| `container.max` | `1280px` | Lebar konten desktop. |
| `radius.card` | `20–24px` | Kartu dan bingkai foto. |
| `radius.pill` | `999px` | Navigasi dan tombol. |

**Skala tipografi:** body 16–18px dengan tinggi baris sekitar 1,5–1,65; judul section desktop 48–64px dan mobile 34–42px; hero desktop 72–96px dan mobile 44–56px. Sesuaikan panjang kalimat agar judul tidak menjadi blok teks yang terlalu tinggi.

**Jarak:** gunakan kelipatan 8px; section desktop 96–144px dan mobile 64–88px. Beri ruang yang cukup antara judul, penjelasan, dan tindakan.

## 5. Struktur halaman beranda

### 5.1 Navigasi

- Desktop: pill putih melayang di area atas hero, logo kiri, tautan **Layanan**, **Dokter**, **Jadwal Praktik**, **Tentang Kami**, **Lokasi**, dan tombol **Hubungi Kami**.
- Mobile: logo, tombol menu yang mudah ditekan, serta akses WhatsApp yang tetap terlihat.
- Tautan navigasi menggulir ke section yang tepat. Header yang mengikuti scroll tidak boleh menutupi judul section.

### 5.2 Hero

- Letakkan judul, penjelasan singkat, dan dua tindakan di tengah; foto perawatan besar berada di bawah konten seperti pada referensi terbaru.
- Foto harus tetap menampilkan konteks perawatan secara wajar; jangan memotong wajah/tindakan dengan canggung.
- Gunakan gradien lembut hanya di bagian bawah foto agar label kecil terbaca.
- Contoh judul: **“Perawatan gigi yang terasa lebih nyaman.”**
- Contoh subjudul: **“Kenali layanan dan tim dokter Klinik Utama SAMI di Sukabumi. Tanyakan jadwal kunjungan dengan mudah melalui WhatsApp.”**
- CTA primer: **Tanya Jadwal via WhatsApp**. CTA sekunder: **Jelajahi Layanan**.
- Tampilkan petunjuk lokasi singkat: **Jl. Gudang No.23, Kota Sukabumi**.

### 5.3 Tentang klinik

- Blok editorial singkat dengan satu foto asli yang relevan.
- Fokus pada informasi yang membantu pasien mengenal klinik, tanpa klaim fasilitas, teknologi, atau mutu layanan yang belum dikonfirmasi.
- Teks final disetujui oleh klinik.

### 5.4 Layanan

Kategori dari ekspor yang sudah dikonfirmasi pengguna:

1. Perawatan gigi estetik
2. Bedah gigi dan mulut
3. Perawatan gigi preventif
4. Ortodontik
5. Endodontik
6. Prostodontik
7. Perawatan restoratif
8. Perawatan gusi dan jaringan penyangga
9. Perawatan gigi anak

Tampilkan sebagai kartu modular berisi nama layanan dan penjelasan singkat dengan bahasa awam. CTA WhatsApp tersedia di titik utama halaman, bukan pada setiap kartu. Cocokkan isi tiap kategori dengan klinik sebelum rilis. Jangan menambahkan implan, rincian prosedur, harga, atau janji hasil hanya karena muncul pada gambar referensi desain.

### 5.5 Tim dokter

- Tampilkan **empat dokter**: tiga kartu portrait dan satu profil dokter mitra, sesuai materi yang tersedia.
- Setiap profil memiliki: foto portrait bila tersedia, nama lengkap, gelar dan bidang praktik yang terverifikasi, ringkasan latar belakang, serta jadwal singkat. Penjelasan profil dapat dibuka tanpa tombol reservasi berulang.
- Jika tiga foto tambahan yang berisi latar belakang dokter disertakan kemudian, gunakan sebagai **sumber informasi**. Informasi penting ditulis ulang sebagai teks asli website agar mudah dibaca, dicari, dan diakses; gambar berisi teks tidak menjadi satu-satunya cara membaca profil.
- Jika detail pada foto tidak terbaca, tandai sebagai **[perlu konfirmasi klinik]** pada bahan kerja. Jangan menebak.
- Pada mobile, kartu ditumpuk vertikal; hindari carousel yang menyembunyikan dokter lain.

### 5.6 Jadwal praktik dokter

- Bedakan secara eksplisit **jam operasional klinik** dan **jadwal dokter**.
- Kelompokkan sebelas jadwal berdasarkan enam hari praktik; tampilkan nama dokter dan jam dalam baris yang mudah dipindai. Brosur asli berada di samping pada desktop dan di bawah jadwal pada ponsel.
- Jika detail belum tersedia dalam aset yang diberikan, tampilkan pada draft: **“Jadwal dikonfirmasi melalui WhatsApp.”**
- Satu CTA di bagian atas jadwal: **Konfirmasi jadwal via WhatsApp**.
- Desain mobile berupa daftar/kartu; jangan memakai tabel lebar yang memerlukan gulir horizontal.

### 5.7 Galeri perawatan

- Susun foto perawatan asli menjadi grid editorial yang teratur, dengan variasi ukuran yang tetap rapi.
- Beri caption hanya bila tindakan pada foto sudah jelas dan disetujui klinik.
- Jangan membuat klaim sebelum/sesudah atau menampilkan identitas pasien tanpa persetujuan yang sesuai.

### 5.8 Ulasan dan kepercayaan

- Sediakan tautan **Lihat ulasan di Google Maps**.
- Jika klinik memberikan kutipan ulasan yang boleh dipakai, tampilkan maksimal dua atau tiga kutipan asli dengan atribusi yang disetujui.
- Hindari foto pasien, rating dinamis palsu, dan angka jumlah ulasan yang dibiarkan usang.

### 5.9 FAQ praktis

Gunakan accordion ringkas untuk pertanyaan logistik: cara membuat janji, kemungkinan datang tanpa janji, cara memastikan jadwal dokter, lokasi, dan persiapan sebelum berkunjung. Jawaban yang belum dipastikan klinik harus tetap menjadi placeholder editorial, bukan pernyataan publik.

### 5.10 Lokasi dan penutup

- Tampilkan alamat lengkap, tombol **Buka Google Maps**, nomor **0812-9346-1648**, dan CTA WhatsApp.
- Bagian penutup memakai latar navy gelap dengan teks terang dan ruang lega.
- Footer sederhana: logo/nama, navigasi pendek, alamat, kontak, dan tautan Instagram resmi setelah URL dikonfirmasi.

## 6. Perilaku responsif dan interaksi

- Rancang dan periksa paling tidak pada lebar sekitar **390px**, **768px**, dan **1440px**.
- Desktop memakai grid fleksibel hingga 12 kolom; mobile memakai satu kolom dengan urutan konten yang masuk akal.
- Tombol utama tetap mudah ditemukan di ponsel. Sticky WhatsApp boleh digunakan bila tidak menutupi konten atau kontrol lain.
- Animasi: transisi halus sekitar 180–300ms untuk hover/focus; reveal section yang ringan dan tidak menghambat baca. Hindari parallax berat dan auto-playing carousel.
- Hormati preferensi `prefers-reduced-motion`.
- Pastikan kontras teks kuat, indikator fokus terlihat, area sentuh minimal sekitar 44px, teks alternatif foto bermakna, dan tidak ada overflow horizontal.
- Optimalkan foto untuk web tanpa menghilangkan detail penting; siapkan ukuran yang sesuai desktop dan mobile.

## 7. Komponen yang perlu disiapkan

- `SiteHeader` dan `MobileMenu`
- `Hero`
- `SectionHeading`
- `ServiceCard`
- `DoctorCard` / `DoctorProfile`
- `DoctorScheduleItem`
- `TreatmentGallery`
- `ReviewLink` / `ApprovedReviewCard`
- `FAQItem`
- `WhatsAppCTA`
- `LocationBlock` dan `SiteFooter`

Konten dokter, layanan, jadwal, FAQ, dan galeri sebaiknya disimpan sebagai data terstruktur agar mudah diperbarui tanpa mengubah layout.

## 8. Tautan dan konten final

- WhatsApp awal: `https://wa.me/6281293461648`. Pastikan nomor dan alur reservasinya sebelum rilis.
- Google Maps: gunakan tautan tempat yang diberikan pengguna, lalu uji bahwa tujuan akhirnya benar-benar lokasi klinik.
- Tautan Instagram: konfirmasi akun resmi sebelum memasangnya.
- Tidak ada formulir yang meminta keluhan atau data kesehatan pada versi pertama. Percakapan awal diarahkan ke WhatsApp klinik.
- Metadata halaman dan informasi bisnis lokal dapat ditambahkan setelah nama resmi, alamat, jam operasional, dan URL final dikonfirmasi.

## 9. Kriteria selesai untuk desain

Desain dianggap siap diimplementasikan bila:

1. Beranda desktop dan mobile lengkap, dengan hierarki yang konsisten.
2. Empat dokter tampil; tiga memakai portrait asli yang tersedia, dokter mitra memakai profil teks; jadwal konsisten pada semua ukuran layar.
3. Semua foto asli yang dipilih memiliki peran jelas dan crop yang layak.
4. Semua CTA menuju tindakan nyata: WhatsApp, section halaman, atau Maps.
5. Tidak ada nama dokter, gelar, jadwal, testimoni, statistik, harga, atau klaim layanan rekaan.
6. Konten yang perlu persetujuan klinik ditandai jelas dalam bahan kerja.
7. Layout tetap nyaman dibaca dan digunakan pada ponsel.

## 10. Materi yang perlu dikumpulkan sebelum konten final

- Logo resmi sudah tersedia; panduan warna merek dapat ditambahkan bila klinik memilikinya.
- Tiga portrait dokter dan tiga foto latar belakang/profil dokter, dengan pasangan file yang jelas.
- Pertahankan nama, gelar, dan jadwal dari ekspor yang sudah dikonfirmasi pengguna; perbarui bila klinik mengumumkan perubahan.
- Foto perawatan sudah tersedia dari ekspor dan dikonfirmasi pengguna; tambahkan foto lain bila diperlukan.
- Foto klinik/interior bila tersedia, khususnya untuk bagian hero atau tentang klinik.
- Konfirmasi nama hukum bila diperlukan untuk dokumen resmi; website memakai SAMI sebagai merek utama dan Sukabumi Dental Care sebagai nama pendamping sesuai materi.
- Jam operasional klinik, alur reservasi, akun Instagram resmi, serta tautan Google Maps final.
- Teks pengantar klinik dan FAQ yang disetujui pemilik.
