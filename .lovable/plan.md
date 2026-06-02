## Tujuan
Menambahkan ikon aplikasi berukuran 1024×1024 px agar Univers bisa disimpan sebagai shortcut beresolusi tinggi di home screen (iOS/Android/PWA install).

## Perubahan

1. **Generate ikon 1024×1024**
   - Resize logo sumber (`src/assets/logo.jpg`) menjadi `public/icon-1024.png` (PNG, 1024×1024, dengan padding aman agar tidak ke-crop saat maskable).
   - Regenerate juga `public/icon-512.png` & `public/icon-192.png` dari sumber 1024 supaya konsisten dan tajam.

2. **Update `public/manifest.webmanifest`**
   - Tambah entry icon 1024×1024 (`purpose: "any maskable"`).
   - Pertahankan entry 192 & 512 yang sudah ada.

3. **Update `src/routes/__root.tsx`**
   - Tambah `<link rel="icon" sizes="1024x1024" href="/icon-1024.png">`.
   - Ganti `apple-touch-icon` untuk menunjuk ke ikon 1024 (iOS akan auto-scale, hasil shortcut lebih tajam).

## Yang tidak diubah
UI, layout, warna, splash, dan semua fitur app tetap sama. Hanya aset ikon + referensi-nya yang diperbarui.
