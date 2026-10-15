import { Young_Serif, Source_Serif_4 } from 'next/font/google';
import '../../app/styles.css';

const display = Young_Serif({ weight: '400', subsets: ['latin'], variable: '--font-display', display: 'swap' });
const text = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-text',
  display: 'swap',
});

// The <html> shell shared by the three per-language root layouts.
export default function Shell({ lang, children }) {
  return (
    <html lang={lang} className={`${display.variable} ${text.variable}`} suppressHydrationWarning>
      <head>
        {/* Reveals only hide content when script runs */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
