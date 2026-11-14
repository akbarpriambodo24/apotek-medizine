import site from "../site.config";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.siteUrl}/sitemap.xml`,
  };
}
