import { preload } from 'react-dom';
import { languages } from '../content.js';
import { creditsHtml, jsonLd } from '../site.js';
import Site from './Site.jsx';

// One prerendered page per language; the first stage photo is the LCP image.
export default function Page({ lang }) {
  preload(`/${languages[lang].stage1}`, { as: 'image', fetchPriority: 'high' });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(lang) }} />
      <Site initialLang={lang} creditsHtml={creditsHtml} />
    </>
  );
}
