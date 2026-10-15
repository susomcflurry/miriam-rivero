import Shell from '../../src/components/Shell.jsx';
import { buildMetadata, viewport as siteViewport } from '../../src/site.js';

export const metadata = buildMetadata('en');
export const viewport = siteViewport;

export default function Layout({ children }) {
  return <Shell lang="en">{children}</Shell>;
}
