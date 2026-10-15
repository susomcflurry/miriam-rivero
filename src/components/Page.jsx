import { preload } from 'react-dom';
import { languages } from '../content.js';
import { picture, SIZES } from '../images.js';
import { creditsHtml, jsonLd } from '../site.js';
import Site from './Site.jsx';

// One prerendered page per language; the first stage photo is the LCP image.
export default function Page({ lang }) {
  const { src, srcSet } = picture(languages[lang].stage1);
  preload(src, { as: 'image', fetchPriority: 'high', imageSrcSet: srcSet, imageSizes: SIZES.stage });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(lang) }} />
      <Site initialLang={lang} creditsHtml={creditsHtml} />
    </>
  );
}
