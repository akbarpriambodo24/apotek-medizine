import Image from "next/image";
import site, { fullAddress } from "../site.config";

const DAY_NAMES = { Mo: "Senin", Tu: "Selasa", We: "Rabu", Th: "Kamis", Fr: "Jumat", Sa: "Sabtu", Su: "Minggu" };
const DAY_ORDER = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const SCHEMA_DAYS = { Mo: "Monday", Tu: "Tuesday", We: "Wednesday", Th: "Thursday", Fr: "Friday", Sa: "Saturday", Su: "Sunday" };

function dayLabel(days) {
  const sorted = [...days].sort((a, b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b));
  const contiguous = sorted.every((d, i) => i === 0 || DAY_ORDER.indexOf(d) === DAY_ORDER.indexOf(sorted[i - 1]) + 1);
  if (sorted.length > 2 && contiguous) return `${DAY_NAMES[sorted[0]]} – ${DAY_NAMES[sorted.at(-1)]}`;
  return sorted.map((d) => DAY_NAMES[d]).join(", ");
}
const timeLabel = (h) => (h.opens === "00:00" && h.closes === "23:59" ? "Buka 24 jam" : `${h.opens.replace(":", ".")} – ${h.closes.replace(":", ".")} WIB`);

export default function Home() {
  const address = fullAddress();
  const mapQuery = site.geo.lat && site.geo.lng ? `${site.geo.lat},${site.geo.lng}` : `${site.name}, ${address}`;
  const directionsUrl = site.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
  const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=17&output=embed`;
  const waUrl = site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Halo ${site.name}, saya ingin bertanya ketersediaan obat.`)}`
    : "";
  const telUrl = site.phone ? `tel:${site.phone.replace(/[^\d+]/g, "")}` : "";
  const areas = site.nearbyAreas;
  const sameAs = Object.values(site.social).filter(Boolean);

  const faqs = [
    {
      q: `Di mana lokasi ${site.name}?`,
      a: `${site.name} berada di ${address}. Lokasinya di area ruko lantai dasar Apartemen Sudirman Park, mudah dijangkau dari ${areas.slice(1, 4).join(", ")}.`,
    },
    site.hours.length > 0 && {
      q: `Jam berapa ${site.name} buka?`,
      a: site.hours.map((h) => `${dayLabel(h.days)}: ${timeLabel(h)}`).join(". ") + ".",
    },
    {
      q: "Apakah bisa menebus resep dokter dari luar?",
      a: "Bisa. Kami melayani resep dari dokter, rumah sakit, atau klinik mana pun. Bawa resep asli, apoteker kami akan menyiapkan dan menjelaskan cara pemakaiannya.",
    },
    waUrl && {
      q: "Apakah bisa cek ketersediaan obat lewat WhatsApp?",
      a: "Bisa. Kirim nama obat atau foto resep melalui WhatsApp kami untuk mengecek stok sebelum datang.",
    },
    {
      q: `Apakah ada apotek dekat ${areas[0]} dan ${areas[1]}?`,
      a: `Ya, ${site.name} berada tepat di ${areas[0]}, ${areas[1]}, Tanah Abang, Jakarta Pusat.`,
    },
  ].filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
    {
      "@type": "Pharmacy",
      "@id": `${site.siteUrl}/#apotek`,
      name: site.name,
      slogan: site.tagline,
      description: site.description,
      url: site.siteUrl,
      image: `${site.siteUrl}/tampak-depan-apotek-medizine.jpg`,
      ...(site.phone && { telephone: site.phone }),
      ...(site.email && { email: site.email }),
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: `${site.address.locality}, ${site.address.city}`,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country,
      },
      ...(site.geo.lat && site.geo.lng && {
        geo: { "@type": "GeoCoordinates", latitude: Number(site.geo.lat), longitude: Number(site.geo.lng) },
      }),
      hasMap: directionsUrl,
      openingHoursSpecification: site.hours.map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days.map((d) => SCHEMA_DAYS[d]),
        opens: h.opens,
        closes: h.closes,
      })),
      areaServed: areas.map((a) => ({ "@type": "Place", name: a })),
      ...(sameAs.length && { sameAs }),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="topbar">
        <div className="wrap topbar-inner">
          <a href="#" className="brand" aria-label={site.name}>
            <span className="brand-mark" aria-hidden="true">+</span>
            <span>
              <strong>MEDI<em>ZINE</em></strong>
              <small>APOTEK</small>
            </span>
          </a>
          <nav aria-label="Navigasi">
            <a href="#layanan">Layanan</a>
            <a href="#jam-buka">Jam Buka</a>
            <a href="#lokasi">Lokasi</a>
            <a href="#faq">FAQ</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <p className="eyebrow">Apotek di Sudirman Park · Karet Tengsin · Tanah Abang</p>
              <h1>{site.name} — apotek terdekat Anda di Sudirman Park, Jakarta Pusat</h1>
              <p className="lead">
                Obat resep dan obat bebas, vitamin, alat kesehatan, dan konsultasi langsung dengan apoteker.
                Berada di lantai dasar Rukan Apartemen Sudirman Park, dekat {areas[2]} dan {areas[3]}.
              </p>
              <div className="cta">
                {waUrl && <a className="btn btn-primary" href={waUrl} target="_blank" rel="noopener">Chat WhatsApp</a>}
                {telUrl && <a className="btn btn-outline" href={telUrl}>Telepon {site.phone}</a>}
                <a className="btn btn-outline" href={directionsUrl} target="_blank" rel="noopener">Petunjuk Arah</a>
              </div>
            </div>
            <figure className="hero-photo">
              <Image
                src="/tampak-depan-apotek-medizine.jpg"
                alt={`Tampak depan ${site.name} di Rukan Apartemen Sudirman Park, Karet Tengsin, Jakarta Pusat`}
                width={597}
                height={679}
                priority
                sizes="(max-width: 860px) 100vw, 420px"
              />
            </figure>
          </div>
        </section>

        <section id="layanan" className="section">
          <div className="wrap">
            <h2>Layanan {site.name}</h2>
            <ul className="cards">
              {site.services.map((s) => (
                <li key={s.title} className="card">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ul>
            {site.neighborClinic.name && (
              <p className="note"><strong>{site.neighborClinic.name}.</strong> {site.neighborClinic.text}</p>
            )}
          </div>
        </section>

        <section id="jam-buka" className="section alt">
          <div className="wrap two-col">
            <div>
              <h2>Jam Buka</h2>
              <table className="hours">
                <tbody>
                  {site.hours.map((h) => (
                    <tr key={h.days.join()}>
                      <th scope="row">{dayLabel(h.days)}</th>
                      <td>{timeLabel(h)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h2>Kontak</h2>
              <address className="contact">
                <p>{address}</p>
                {site.phone && <p>Telepon: <a href={telUrl}>{site.phone}</a></p>}
                {site.whatsapp && <p>WhatsApp: <a href={waUrl} target="_blank" rel="noopener">+{site.whatsapp}</a></p>}
                {site.email && <p>Email: <a href={`mailto:${site.email}`}>{site.email}</a></p>}
                {site.pharmacist && <p>Apoteker Penanggung Jawab: {site.pharmacist}</p>}
                {site.licenseNumber && <p>No. SIA: {site.licenseNumber}</p>}
              </address>
            </div>
          </div>
        </section>

        <section id="lokasi" className="section">
          <div className="wrap">
            <h2>Lokasi Apotek Medizine</h2>
            <p>
              Kami berada di <strong>Rukan Apartemen Sudirman Park, Blok Bougenville No.21, unit GF 01–02 (C21)</strong>,
              Karet Tengsin, Tanah Abang, Jakarta Pusat 10220. Melayani warga dan pekerja di sekitar{" "}
              {areas.join(", ")}.
            </p>
            <div className="map">
              <iframe
                title={`Peta lokasi ${site.name}`}
                src={mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <p><a className="btn btn-primary" href={directionsUrl} target="_blank" rel="noopener">Buka di Google Maps</a></p>
          </div>
        </section>

        <section id="faq" className="section alt">
          <div className="wrap narrow">
            <h2>Pertanyaan yang Sering Ditanyakan</h2>
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <p><strong>{site.name}</strong> — {site.tagline}</p>
          <p>{address}</p>
          {sameAs.length > 0 && (
            <p className="social">
              {site.social.instagram && <a href={site.social.instagram} rel="noopener" target="_blank">Instagram</a>}
              {site.social.facebook && <a href={site.social.facebook} rel="noopener" target="_blank">Facebook</a>}
              {site.social.tiktok && <a href={site.social.tiktok} rel="noopener" target="_blank">TikTok</a>}
            </p>
          )}
          <p className="small">© {new Date().getFullYear()} {site.name}. Informasi di situs ini bukan pengganti saran dokter.</p>
        </div>
      </footer>

      {waUrl && (
        <a className="wa-float" href={waUrl} target="_blank" rel="noopener" aria-label="Chat WhatsApp Apotek Medizine">
          WhatsApp
        </a>
      )}
    </>
  );
}
