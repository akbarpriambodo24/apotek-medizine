import "./globals.css";
import site from "../site.config";

const title = `${site.name} — Apotek di Sudirman Park, Karet Tengsin, Jakarta Pusat`;

export const metadata = {
  metadataBase: new URL(site.siteUrl),
  title,
  description: site.description,
  keywords: [
    "apotek Sudirman Park",
    "apotek Karet Tengsin",
    "apotek Tanah Abang",
    "apotek Benhil",
    "apotek Jakarta Pusat",
    "apotek terdekat",
    "Apotek Medizine",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, address: true },
};

export const viewport = {
  themeColor: "#4b3f9e",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
