import { languages, shared } from '../src/content.js';

export const dynamic = 'force-static';

export default function sitemap() {
  const alternates = {
    languages: Object.fromEntries(Object.entries(languages).map(([l, c]) => [l, shared.siteUrl + c.path])),
  };
  return Object.values(languages).map((c) => ({
    url: shared.siteUrl + c.path,
    lastModified: new Date(),
    alternates,
  }));
}
