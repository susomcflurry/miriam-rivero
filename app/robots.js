import { shared } from '../src/content.js';

export const dynamic = 'force-static';

export default function robots() {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${shared.siteUrl}sitemap.xml` };
}
