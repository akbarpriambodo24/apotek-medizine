# Website Apotek Medizine (Next.js, 1 halaman)

Semua data (kontak, jam buka, layanan, domain) diatur di **`site.config.js`**. File lain tidak perlu diubah.

## ✅ Wajib diisi sebelum go-live (di `site.config.js`)
1. `siteUrl` → domain asli Anda, misalnya `https://www.namadomain.com`
2. `hours` → jam buka ASLI (yang terisi sekarang masih contoh)
3. `whatsapp` dan/atau `phone` → tombol WhatsApp/Telepon baru muncul setelah diisi
4. `googleMapsUrl` dan `geo` → ambil dari profil Google Maps apotek
5. Opsional: `pharmacist`, `licenseNumber` (SIA), `social`

Alamat, nama, dan nomor telepon harus **sama persis** dengan yang ada di Google Business Profile.

## Coba di komputer sendiri (opsional)
Install Node.js 20+ dulu, lalu jalankan:
```
npm install
npm run dev
```
Buka http://localhost:3000

## Deploy gratis ke Vercel
1. Buat akun di github.com, lalu buat repository baru (misalnya `apotek-medizine`) dan upload semua isi folder ini (tanpa `node_modules` dan `.next`).
2. Masuk ke vercel.com pakai akun GitHub → **Add New → Project** → pilih repository tadi → **Deploy**. Pengaturan bawaan sudah benar.
3. Setiap kali `site.config.js` diubah di GitHub, Vercel otomatis deploy ulang.

## Menghubungkan domain
1. Di Vercel: Project → **Settings → Domains** → tambahkan `namadomain.com` dan `www.namadomain.com`.
2. Vercel akan menampilkan record DNS yang harus dibuat. Ikuti persis yang tertera di layar Vercel. Biasanya:
   - `A` record untuk `@` → IP dari Vercel
   - `CNAME` untuk `www` → alamat dari Vercel
3. Buat record tersebut di panel DNS tempat Anda membeli domain (Niagahoster, Rumahweb, Domainesia, dll).
4. Tunggu propagasi DNS (beberapa menit sampai 48 jam). SSL/HTTPS otomatis dari Vercel.
5. Pastikan `siteUrl` di `site.config.js` sama dengan domain utama (pilih versi www atau tanpa www, lalu konsisten).

## Agar muncul di Google (penting!)
Website saja tidak cukup untuk pencarian "apotek terdekat". Urutan prioritasnya:
1. **Google Business Profile** (business.google.com): klaim/verifikasi profil Apotek Medizine, kategori utama "Apotek", isi jam buka, foto, nomor telepon, dan masukkan link website ini. Ini faktor terbesar untuk muncul di Google Maps dan pencarian lokal.
2. **Google Search Console** (search.google.com/search-console): tambahkan domain, verifikasi lewat DNS, lalu kirim `https://domainanda/sitemap.xml`.
3. **Ulasan Google**: minta pelanggan memberi ulasan, dan balas setiap ulasan.
4. **Konsistensi NAP** (Nama, Alamat, Telepon) di semua tempat: Google, Instagram, Halodoc/GoApotik, direktori, dan website ini.
5. Cek data terstruktur di https://search.google.com/test/rich-results

## Yang sudah disiapkan di website
- Schema.org `Pharmacy` (alamat, jam buka, peta, area layanan) dan `FAQPage`
- Title, meta description, canonical, Open Graph (gambar pratinjau saat link dibagikan di WhatsApp)
- `sitemap.xml` dan `robots.txt` otomatis
- Peta Google tertanam, tombol petunjuk arah, tombol WhatsApp melayang
- Ramah HP, ringan, halaman statis
