from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.lib.utils import simpleSplit
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'output' / 'pdf' / 'proposal-website-klinik-sami.pdf'
OUT.parent.mkdir(parents=True, exist_ok=True)
pdfmetrics.registerFont(TTFont('Regular', 'C:/Windows/Fonts/segoeui.ttf'))
pdfmetrics.registerFont(TTFont('Bold', 'C:/Windows/Fonts/segoeuib.ttf'))
W, H = A4
navy = HexColor('#132b43')
blue = HexColor('#075ea8')
muted = HexColor('#4c6071')
light = HexColor('#eaf3fb')
c = canvas.Canvas(str(OUT), pagesize=A4)
c.setTitle('Proposal Website Klinik Utama SAMI')
c.setAuthor('Jaka Kelana')

def text(x, y, value, font='Regular', size=10, color=navy):
    c.setFillColor(color); c.setFont(font, size); c.drawString(x, y, value)

def para(value, x, y, width=495, size=10, leading=15, color=muted, font='Regular'):
    for line in simpleSplit(value, font, size, width):
        text(x, y, line, font, size, color); y -= leading
    return y

def section(title, y):
    text(50, y, title, 'Bold', 12, navy)
    return y - 20

def bullet(value, y):
    text(52, y, '•', 'Bold', 10, blue)
    return para(value, 67, y, width=478, size=9.6, leading=14) - 3

def footer(page):
    c.setStrokeColor(HexColor('#dbe5ee')); c.line(50, 43, W-50, 43)
    text(50, 27, 'JAKA KELANA  /  WEB DEVELOPER', 'Bold', 7.5, muted)
    c.setFont('Regular', 8); c.setFillColor(muted); c.drawRightString(W-50, 27, str(page))

# Page 1
c.setFillColor(navy); c.rect(0, H-185, W, 185, fill=1, stroke=0)
text(50, H-48, 'PROPOSAL WEBSITE', 'Bold', 9, HexColor('#8bcafa'))
text(50, H-86, 'Klinik Utama SAMI', 'Bold', 25, white)
text(50, H-111, 'Sukabumi Dental Care', 'Regular', 12, HexColor('#d1e4f4'))
text(50, H-151, 'Disiapkan oleh Jaka Kelana  |  Web Developer', 'Regular', 9.5, white)
y = H-222
y = section('Website yang memudahkan pasien', y)
y = para('Website dapat melengkapi informasi yang sudah dibagikan Klinik SAMI melalui media sosial, sehingga calon pasien dapat melihat layanan, profil dokter, jadwal praktik, lokasi, dan kontak dalam satu tempat.', 50, y)
y -= 7
y = para('Contoh tampilan telah disiapkan secara mandiri sebagai bahan diskusi. Isi dan tampilannya dapat disesuaikan dan akan dikonfirmasi bersama klinik sebelum menjadi website resmi.', 50, y)
y -= 5
text(50, y, 'Lihat demo: klinikutami.vercel.app', 'Bold', 10, blue)
c.linkURL('https://klinikutami.vercel.app/', (50, y-3, 255, y+13), relative=0)
y -= 37
y = section('Yang termasuk dalam website', y)
for item in [
    'Profil klinik serta daftar layanan perawatan gigi.',
    'Profil dokter dan jadwal praktik berdasarkan informasi yang disetujui klinik.',
    'Foto, ulasan, lokasi Google Maps, dan tombol WhatsApp untuk menghubungi admin.',
    'Tampilan responsif untuk ponsel, tablet, dan komputer.',
    'Pengaturan SEO dasar, pemasangan domain, dan bantuan publikasi.',
]: y = bullet(item, y)
y -= 3
y = para('Jadwal bersifat informatif dan dikonfirmasi melalui admin. Sistem reservasi otomatis, pembayaran, akun pasien, dan penyimpanan rekam medis tidak termasuk.', 50, y, size=9, leading=13)
c.setFillColor(light); c.roundRect(50, 66, W-100, 68, 10, fill=1, stroke=0)
text(66, 110, 'INVESTASI', 'Bold', 8, blue)
text(66, 84, 'Rp1.750.000', 'Bold', 20, navy)
text(260, 103, 'Termasuk satu domain .my.id', 'Bold', 10, navy)
text(260, 86, 'untuk tahun pertama', 'Regular', 9, muted)
footer(1); c.showPage()

# Page 2
text(50, H-52, 'RINCIAN PENAWARAN', 'Bold', 9, blue)
text(50, H-82, 'Dari konsep hingga publikasi', 'Bold', 19, navy)
y = H-116
y = section('Domain dan hosting', y)
y = para('Harga mencakup satu domain .my.id selama tahun pertama. Nama domain disepakati bersama dan bergantung pada ketersediaan. Domain premium atau ekstensi lain dapat dibahas terpisah.', 50, y)
y -= 3
y = para('Perpanjangan domain mulai tahun kedua menjadi tanggung jawab klinik, mengikuti tarif penyedia. Data pemilik dan akses pengelolaan domain akan disepakati dan diserahkan kepada klinik.', 50, y)
y -= 3
y = para('Pilihan hosting dan biaya berlangganan, apabila ada, disepakati sebelum publikasi. Harga ini belum termasuk biaya hosting berbayar.', 50, y)
y -= 15
y = section('Tahapan pengerjaan', y)
for item in [
    'Diskusi kebutuhan, penyesuaian demo, dan pemilihan domain.',
    'Pengumpulan dan persetujuan logo, foto, profil dokter, layanan, jadwal, dan kontak.',
    'Penyesuaian website dengan maksimal 2 putaran revisi sesuai cakupan.',
    'Pemeriksaan akhir oleh klinik, publikasi, dan penghubungan domain.',
]: y = bullet(item, y)
y -= 2
y = para('Estimasi 5-10 hari kerja setelah kebutuhan, pembayaran awal, dan materi lengkap diterima. Waktu dapat berubah jika ada tambahan kebutuhan atau materi dan persetujuan belum tersedia.', 50, y, size=9, leading=13)
y -= 13
y = section('Pembayaran dan dukungan', y)
y = para('Usulan pembayaran: 50% di awal (Rp875.000) dan 50% setelah website disetujui, sebelum publikasi atau serah terima (Rp875.000).', 50, y)
y -= 3
y = para('Termasuk dukungan 30 hari setelah publikasi untuk memperbaiki kesalahan teknis pada pekerjaan yang disepakati. Perubahan konten setelah persetujuan, fitur tambahan, dan pemeliharaan rutin dibahas terpisah.', 50, y)
y -= 15
y = section('Langkah selanjutnya', y)
y = para('Apabila Bapak/Ibu berkenan, saya siap menjelaskan demo dan mendiskusikan kebutuhan Klinik Utama SAMI. Pengerjaan dapat dimulai setelah cakupan, domain, dan biaya terkait disepakati.', 50, y)
y -= 13
text(50, y, 'Hormat saya,', 'Regular', 9, muted)
text(50, y-18, 'Jaka Kelana', 'Bold', 11, navy)
text(50, y-33, 'Web Developer', 'Regular', 9, muted)
assert y-33 > 53, f'Page 2 content overflows footer: {y}'
footer(2); c.save()
print(OUT)
