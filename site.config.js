// ============================================================
//  SEMUA DATA APOTEK ADA DI FILE INI.
//  Ganti nilai di bawah, lalu deploy ulang. Tidak perlu ubah file lain.
//  Field yang dikosongkan ("") akan otomatis disembunyikan dari website.
// ============================================================

const siteConfig = {
  // Domain Anda (tanpa garis miring di akhir). WAJIB diganti sebelum go-live.
  siteUrl: "https://www.medizine.co.id",

  name: "Apotek Medizine",
  tagline: "Medicine for a better life",
  description:
    "Apotek Medizine di Rukan Apartemen Sudirman Park, Karet Tengsin, Tanah Abang, Jakarta Pusat. Melayani obat resep dokter, obat bebas, vitamin, alat kesehatan, dan konsultasi dengan apoteker.",

  // Kontak — isi dengan nomor asli. Format WhatsApp: kode negara tanpa "+" (contoh 6281234567890)
  phone: "", // contoh: "021-12345678"
  whatsapp: "", // contoh: "6281234567890"
  email: "",

  // Alamat (sesuai yang terdaftar di Google Business Profile — harus SAMA PERSIS)
  address: {
    street:
      "Rukan Apartemen Sudirman Park, Blok Bougenville No.21, GF 01-02 No. C21, RT.12/RW.11",
    locality: "Karet Tengsin, Tanah Abang",
    city: "Jakarta Pusat",
    region: "DKI Jakarta",
    postalCode: "10220",
    country: "ID",
  },

  // Koordinat dari Google Maps (klik kanan titik lokasi → salin angka). Kosongkan jika belum ada.
  geo: { lat: "", lng: "" },

  // Link "Bagikan" dari profil Google Maps apotek Anda (contoh: https://maps.app.goo.gl/xxxx)
  googleMapsUrl: "",

  // Jam buka — WAJIB DIGANTI dengan jam asli. Hari: Mo Tu We Th Fr Sa Su
  // Untuk buka 24 jam pakai opens "00:00" closes "23:59".
  hours: [
    { days: ["Mo", "Tu", "We", "Th", "Fr", "Sa"], opens: "08:00", closes: "21:00" },
    { days: ["Su"], opens: "09:00", closes: "18:00" },
  ],

  // Nama Apoteker Penanggung Jawab & nomor izin (menambah kepercayaan). Opsional.
  pharmacist: "",
  licenseNumber: "", // Nomor SIA

  // Layanan — sesuaikan. Jangan cantumkan yang tidak benar-benar tersedia.
  services: [
    { title: "Obat Resep Dokter", text: "Tebus resep dari dokter atau klinik mana pun, disiapkan dan dijelaskan oleh apoteker." },
    { title: "Obat Bebas & Bebas Terbatas", text: "Obat flu, batuk, demam, maag, alergi, dan keluhan ringan sehari-hari." },
    { title: "Konsultasi Apoteker", text: "Tanya cara minum obat, efek samping, dan interaksi obat secara langsung." },
    { title: "Vitamin & Suplemen", text: "Vitamin, suplemen, dan produk penunjang daya tahan tubuh." },
    { title: "Alat Kesehatan", text: "Termometer, tensimeter, masker, perban, dan kebutuhan P3K." },
    { title: "Produk Ibu & Anak", text: "Kebutuhan kesehatan ibu, bayi, dan anak." },
  ],

  // Klinik di lokasi yang sama (tampil sebagai info tambahan). Kosongkan name untuk menyembunyikan.
  neighborClinic: {
    name: "Klinik Utama Kirana Alpha Medika",
    text: "Apotek Medizine berada satu lokasi dengan Klinik Utama Kirana Alpha Medika, sehingga resep dari klinik bisa langsung ditebus di tempat.",
  },

  // Area sekitar — dipakai di teks & FAQ agar relevan untuk pencarian "apotek dekat ..."
  nearbyAreas: [
    "Sudirman Park",
    "Karet Tengsin",
    "Bendungan Hilir (Benhil)",
    "Jl. KH Mas Mansyur",
    "Karet",
    "Tanah Abang",
    "Sudirman",
  ],

  // Media sosial (opsional) — isi URL lengkap
  social: {
    instagram: "",
    facebook: "",
    tiktok: "",
  },
};

export default siteConfig;

export const fullAddress = (a = siteConfig.address) =>
  `${a.street}, ${a.locality}, ${a.city}, ${a.region} ${a.postalCode}`;
