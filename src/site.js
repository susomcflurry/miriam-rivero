// Server-side helpers: metadata, structured data and photo credits for each language page.
import { languages, shared } from './content.js';
import credits from '../assets/credits.json';

export const LANGS = Object.keys(languages);

export function buildMetadata(lang) {
  const copy = languages[lang];
  const url = shared.siteUrl + copy.path;
  return {
    metadataBase: new URL(shared.siteUrl),
    title: copy.title,
    description: copy.description,
    authors: [{ name: 'Miriam Rivero' }],
    robots: { index: true, follow: true, 'max-image-preview': 'large' },
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(LANGS.map((l) => [l, shared.siteUrl + languages[l].path])),
        'x-default': shared.siteUrl,
      },
    },
    openGraph: {
      type: 'profile',
      siteName: 'Miriam Rivero',
      title: copy.title,
      description: copy.description,
      url,
      locale: copy.ogLocale,
      firstName: 'Miriam',
      lastName: 'Rivero',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Miriam Rivero' }],
    },
    twitter: { card: 'summary_large_image' },
    icons: { icon: { url: '/favicon.svg', type: 'image/svg+xml' } },
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#11151c',
  colorScheme: 'light',
};

export function jsonLd(lang) {
  const copy = languages[lang];
  const pageUrl = shared.siteUrl + copy.path;
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${shared.siteUrl}#miriam-rivero`,
        name: 'Miriam Rivero',
        givenName: 'Miriam',
        familyName: 'Rivero',
        jobTitle: copy.jobTitle,
        description: copy.description,
        url: shared.siteUrl,
        email: `mailto:${shared.email}`,
        sameAs: [shared.linkedin],
        knowsLanguage: ['de', 'en', 'es'],
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'TH Köln', alternateName: 'Technische Hochschule Köln' },
        address: { '@type': 'PostalAddress', addressLocality: 'Madrid', addressCountry: 'ES' },
      },
      {
        '@type': 'WebSite',
        '@id': `${shared.siteUrl}#website`,
        url: shared.siteUrl,
        name: 'Miriam Rivero',
        inLanguage: LANGS,
        publisher: { '@id': `${shared.siteUrl}#miriam-rivero` },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${pageUrl}#page`,
        url: pageUrl,
        name: copy.title,
        inLanguage: lang,
        isPartOf: { '@id': `${shared.siteUrl}#website` },
        mainEntity: { '@id': `${shared.siteUrl}#miriam-rivero` },
      },
    ],
  }).replaceAll('<', '\\u003c');
}

const credit = (c) =>
  `<a href="${c.page}">${c.title}</a>, ${(c.creator ?? '').replace(/\(\s*/g, '(').replace(/\s*\)/g, ')')} (<a href="${c.licenseUrl}">${c.license}</a>)`;

// Footer credit line: every open-licence photograph the page shows
export const creditsHtml = credits.map(credit).join('; ');

// The credit for one photograph, by its source file in assets/credits.json
export const creditHtmlFor = (file) => credit(credits.find((c) => c.file === file));
