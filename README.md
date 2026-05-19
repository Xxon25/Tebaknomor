# Syamaira Browser VIP - License Generator Dashboard

Dashboard premium yang elegan dan portable untuk membuat dan mengelola lisensi akses VIP Syamaira Browser. Dashboard ini terhubung langsung ke basis data Supabase Anda.

## 🚀 Fitur Utama
- **VIP Key Generator**: Membuat lisensi VIP tunggal atau massal (hingga 100 key sekali klik) dengan custom prefix.
- **Real-time Synchronization**: Menampilkan daftar lisensi secara langsung dari tabel `license_keys` di database Supabase.
- **Reset Device Binding**: Melepas ikatan (binding) perangkat pada lisensi tertentu agar dapat digunakan kembali di perangkat baru.
- **Blokir & Aktifkan Lisensi**: Nonaktifkan akses lisensi secara instan untuk membatasi akses ilegal atau memulihkannya kembali.
- **Export Data**: Ekspor lisensi yang dihasilkan ke format **TXT** (list key saja) atau **JSON** (lengkap beserta statusnya) dalam sekali klik.
- **Interactive UI**: Didesain dengan dark mode modern glassmorphism kelas atas yang responsif dan memanjakan mata, dilengkapi dengan efek mikro-animasi, notifikasi toast, konfeti keberhasilan, dan dialog interaktif (SweetAlert2).

---

## 🛠️ Cara Penggunaan Lokal
Karena dashboard ini 100% portable (Single HTML + Vanilla JS + Tailwind CDN), Anda dapat menjalankannya dengan sangat mudah:

1. **Buka Langsung di Browser**:
   Cukup klik ganda (double-click) file `index.html` di komputer Anda, atau buka melalui browser pilihan Anda.

2. **Gunakan Live Server (VS Code)**:
   Jika Anda membuka folder ini di VS Code, klik kanan pada file `index.html` dan pilih **Open with Live Server** untuk pengalaman pengembangan/penggunaan real-time.

---

## 🗄️ Konfigurasi Database Supabase
Dashboard ini telah otomatis dikonfigurasi dengan kredensial Supabase yang Anda sediakan:
- **Supabase URL**: `https://prkobxfnnxdaopgpzfrx.supabase.co`
- **Role**: `service_role` (untuk hak akses penuh administrasi)

> 💡 **Tips Keamanan**: Jika Anda ingin menggunakan database lain, Anda dapat menekan tombol **Database Config** di pojok kanan atas dashboard untuk mengubah URL dan API Key secara dinamis yang akan disimpan aman di LocalStorage browser Anda.
