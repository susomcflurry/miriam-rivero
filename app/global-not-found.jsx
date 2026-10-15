import Shell from '../src/components/Shell.jsx';
import { picture } from '../src/images.js';
import { creditHtmlFor } from '../src/site.js';

export const metadata = {
  title: 'Miriam Rivero · 404',
  robots: { index: false, follow: true },
  icons: { icon: { url: '/favicon.svg', type: 'image/svg+xml' } },
};

// One 404 for the three languages: no route tells us which one the visitor reads
const LOST = [
  { lang: 'es', line: 'Esta página no existe.', home: 'Ir al inicio', href: '/' },
  { lang: 'en', line: 'This page doesn’t exist.', home: 'Go to the home page', href: '/en/' },
  { lang: 'de', line: 'Diese Seite gibt es nicht.', home: 'Zur Startseite', href: '/de/' },
];

export default function GlobalNotFound() {
  return (
    <Shell lang="es">
      <main className="lost">
        <figure className="lost__stage">
          <img {...picture('assets/img/footer.webp')} sizes="(max-width: 820px) 100vw, 47vw" alt="" fetchPriority="high" />
        </figure>
        <div className="lost__side">
          <ul className="lost__lines">
            {LOST.map(({ lang, line, home, href }) => (
              <li key={lang} lang={lang}>
                <p>{line}</p>
                <a className="textlink" href={href}>
                  {home}
                </a>
              </li>
            ))}
          </ul>
          <h1 className="lost__mark">Miriam Rivero</h1>
          <p className="lost__credit" dangerouslySetInnerHTML={{ __html: creditHtmlFor('assets/hohenzollernbrucke-koln.jpg') }} />
        </div>
      </main>
    </Shell>
  );
}
