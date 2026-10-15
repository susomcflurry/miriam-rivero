// Responsive widths for the crops in public/assets/img. Each crop ships at its own width (the file
// without a suffix) plus the smaller variants listed here as name-<width>.webp, written by
// scripts/resize-images.mjs. Run that script again after replacing or adding a crop.

export const IMAGES = {
  'stage-madrid': { w: 1120, h: 1400, variants: [560, 840] },
  'stage-koln': { w: 1120, h: 1400, variants: [560, 840] },
  'plate-madrid': { w: 1400, h: 1050, variants: [700, 1050] },
  'plate-koln': { w: 1400, h: 1050, variants: [700, 1050] },
  'svc-conf': { w: 675, h: 900, variants: [240, 450] },
  'svc-enlace': { w: 675, h: 900, variants: [240, 450] },
  'svc-trad': { w: 675, h: 900, variants: [240, 450] },
  'work-fisu': { w: 1040, h: 1300, variants: [520, 780] },
  'work-madrid': { w: 799, h: 1000, variants: [520] },
  'work-koln': { w: 1040, h: 1300, variants: [520, 780] },
  contact: { w: 1920, h: 1440, variants: [800, 1280] },
  footer: { w: 1200, h: 982, variants: [600, 900] },
  miriam: { w: 480, h: 600, variants: [256] },
};

// How wide each picture is drawn, per the layout in app/styles.css (phone composition at 820px and below)
export const SIZES = {
  stage: '(max-width: 820px) calc(100vw - 24px), 47vw',
  plate: '100vw',
  svc: '(max-width: 820px) 96px, clamp(160px, 15vw, 220px)',
  workThumb: 'calc(100vw - 40px)',
  workFrame: '33vw',
  contact: '(max-width: 820px) 94vh, max(100vw, 134vh)',
  footer: '(max-width: 820px) 100vw, max(50vw, 122vh)',
  portrait: '128px',
};

const nameOf = (path) => path.match(/([^/]+)\.webp$/)[1];

// { src, srcSet, width, height } for an <img>, from a path such as 'assets/img/stage-madrid.webp'
export function picture(path) {
  const name = nameOf(path);
  const { w, h, variants } = IMAGES[name];
  const dir = path.slice(0, path.lastIndexOf('/') + 1);
  const srcSet = [...variants.map((v) => `/${dir}${name}-${v}.webp ${v}w`), `/${path} ${w}w`].join(', ');
  return { src: `/${path}`, srcSet, width: w, height: h };
}
