# 📖 QuranApp Digital

Aplikasi Al-Quran Digital modern yang dirancang dengan pendekatan *mobile-first*, menghadirkan pengalaman membaca Al-Quran yang premium, nyaman, dan kaya akan fitur Islami pendukung. 

Dibangun menggunakan **React 19**, **Tailwind CSS v4**, dan **Vite**, aplikasi ini mengusung desain eksklusif **"Luxe Serenity"** (Dark Mode Only) yang memadukan warna *Deep Forest Green*, *Rich Gold*, dan *Ivory* untuk kenyamanan mata pengguna.

## ✨ Fitur Utama

- **📖 Al-Quran Digital**: 114 Surah lengkap dengan teks Arab (Amiri font), transliterasi Latin, dan terjemahan Bahasa Indonesia.
- **🎧 Audio Murottal**: Pemutar audio terintegrasi (*floating mini-player*) dengan pilihan Qari ternama dan kontrol kecepatan (*playback rate*).
- **📚 Tafsir Ringkas**: Disediakan tafsir ringkas dari Kemenag untuk setiap ayat.
- **🔖 Bookmark & Terakhir Dibaca**: Simpan ayat favorit dan otomatis melacak ayat terakhir yang dibaca (tersimpan di *local storage*).
- **🕌 Jadwal Sholat & Doa**: Waktu sholat *real-time* berbasis lokasi (Aladhan API) beserta hitung mundur, dan kumpulan Doa Harian.
- **📿 Tasbih Digital**: Penghitung dzikir dengan target hitungan, efek getar (*haptic feedback*), dan mode suara.
- **💰 Kalkulator Zakat**: Hitung kewajiban Zakat Fitrah dan Zakat Maal dengan mudah.
- **🌙 Asmaul Husna & Tahlil**: Daftar 99 Asmaul Husna dan bacaan susunan Tahlil & Wirid.

## 🎨 Design System: "Luxe Serenity"

Aplikasi ini menggunakan sistem desain *dark-mode exclusive* tanpa *toggle* mode terang, menggunakan token warna semantik:
- **Background/Surface**: Nuansa gelap eksklusif (`#0F1711`, `#162117`).
- **Accent**: Hijau *Forest* (`#5cb87a`) untuk elemen interaktif primer.
- **Gold**: Emas elegan (`#d9a44a`, `#C5A059`) untuk ornamen islami, teks Arab, dan *highlight*.
- **Typography**: `Playfair Display` (Headings), `Inter` (UI/Body), dan `Amiri` (Arabic).

## 🛠️ Teknologi yang Digunakan

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 + Vanilla CSS Variables
- **State Management**: Zustand (untuk Settings, Bookmarks, Audio, dan Last Read)
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router DOM (dengan *lazy loading*)
- **Audio**: Howler.js
- **Icons**: Lucide React
- **PWA**: Vite PWA Plugin

## 🚀 Cara Menjalankan Project

1. **Clone repository ini**
   ```bash
   git clone <repo-url>
   cd QuranApp
   ```

2. **Install dependensi**
   Gunakan `pnpm` (direkomendasikan) atau `npm`/`yarn`.
   ```bash
   pnpm install
   ```

3. **Jalankan Development Server**
   ```bash
   pnpm dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173` (atau port lain yang tersedia).

4. **Build untuk Production**
   ```bash
   pnpm build
   ```

## 📝 Lisensi

Aplikasi ini bersifat *Open Source*. Silakan gunakan, pelajari, dan modifikasi sesuai kebutuhan Anda.

---
*Dibuat dengan ❤️ untuk memudahkan akses umat muslim membaca Al-Quran dan beribadah.*
