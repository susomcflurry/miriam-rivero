// Liquid glass refraction. Each glass surface gets a displacement map shaped like its own bezel,
// so the backdrop bends at the rim the way a lens does. backdrop-filter: url() only renders in
// Chromium; other engines keep the plain blur from the stylesheet.

const NS = 'http://www.w3.org/2000/svg';

/* Red and green encode how far each pixel samples inward from the rim (128 = no shift) */
function bezelMap(w, h, r, bezel) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(w, h);
  const { data } = img;
  const hw = w / 2;
  const hh = h / 2;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = x + 0.5 - hw;
      const py = y + 0.5 - hh;
      const qx = Math.abs(px) - (hw - r);
      const qy = Math.abs(py) - (hh - r);
      let nx = 0;
      let ny = 0;
      let depth;
      if (qx > 0 && qy > 0) {
        const len = Math.hypot(qx, qy);
        depth = r - len;
        nx = (qx / len) * Math.sign(px);
        ny = (qy / len) * Math.sign(py);
      } else if (qx > qy) {
        depth = r - qx;
        nx = Math.sign(px);
      } else {
        depth = r - qy;
        ny = Math.sign(py);
      }
      const t = depth < bezel ? 1 - Math.max(depth, 0) / bezel : 0;
      const mag = t * t;
      const i = (y * w + x) * 4;
      data[i] = 128 - nx * mag * 127;
      data[i + 1] = 128 - ny * mag * 127;
      data[i + 2] = 128;
      data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL();
}

export function liquidGlass(root) {
  if (!('userAgentData' in navigator)) return () => {};
  if (matchMedia('(prefers-contrast: more)').matches) return () => {};

  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'position:absolute;width:0;height:0;pointer-events:none';
  document.body.append(svg);

  const filters = new Map();
  let count = 0;

  const filterFor = (el) => {
    if (filters.has(el)) return filters.get(el);
    const filter = document.createElementNS(NS, 'filter');
    filter.id = `glass-${++count}`;
    filter.setAttribute('filterUnits', 'userSpaceOnUse');
    filter.setAttribute('color-interpolation-filters', 'sRGB');
    const image = document.createElementNS(NS, 'feImage');
    image.setAttribute('result', 'map');
    image.setAttribute('preserveAspectRatio', 'none');
    const map = document.createElementNS(NS, 'feDisplacementMap');
    map.setAttribute('in', 'SourceGraphic');
    map.setAttribute('in2', 'map');
    map.setAttribute('xChannelSelector', 'R');
    map.setAttribute('yChannelSelector', 'G');
    filter.append(image, map);
    svg.append(filter);
    const entry = { filter, image, map, size: '' };
    filters.set(el, entry);
    return entry;
  };

  const paint = (el) => {
    const style = getComputedStyle(el);
    const w = Math.round(el.offsetWidth);
    const h = Math.round(el.offsetHeight);
    if (style.getPropertyValue('--glass').trim() !== '1' || !w || !h) {
      el.style.removeProperty('backdrop-filter');
      return;
    }
    const r = Math.min(parseFloat(style.borderTopLeftRadius) || 0, w / 2, h / 2);
    const bezel = Math.max(8, Math.min(r * 0.8, 24));
    const f = filterFor(el);
    const size = `${w}x${h}x${r}`;
    if (f.size !== size) {
      f.size = size;
      for (const node of [f.filter, f.image]) {
        node.setAttribute('x', '0');
        node.setAttribute('y', '0');
        node.setAttribute('width', String(w));
        node.setAttribute('height', String(h));
      }
      f.image.setAttribute('href', bezelMap(w, h, r, bezel));
      f.map.setAttribute('scale', String(Math.round(bezel * 1.6)));
    }
    const blur = style.getPropertyValue('--glass-blur').trim() || '12px';
    el.style.backdropFilter = `url(#${f.filter.id}) blur(${blur}) saturate(170%)`;
  };

  const ro = new ResizeObserver((entries) => entries.forEach((entry) => paint(entry.target)));
  root.querySelectorAll('[data-glass]').forEach((el) => ro.observe(el));

  return () => {
    ro.disconnect();
    filters.forEach((_, el) => el.style.removeProperty('backdrop-filter'));
    svg.remove();
  };
}
