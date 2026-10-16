'use client';

import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { languages, shared } from '../content.js';
import { picture, SIZES } from '../images.js';
import { liquidGlass } from '../glass.js';

const PairArrow = () => (
  <>
    <svg className="pairs__arrow" viewBox="0 0 40 24" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="square">
        <path className="to" d="M3 7h32m-7-5 7 5-7 5" />
        <path className="fro" d="M37 17H5m7-5-7 5 7 5" />
      </g>
    </svg>
    <span className="sr-only">⇄</span>
  </>
);

const WORK = [
  { id: '1', src: 'assets/img/work-fisu.webp' },
  { id: '2', src: 'assets/img/work-madrid.webp' },
  { id: '3', src: 'assets/img/work-koln.webp' },
];

const SERVICES = [
  { n: 1, src: 'assets/img/svc-conf.webp' },
  { n: 2, src: 'assets/img/svc-enlace.webp', flip: true },
  { n: 3, src: 'assets/img/svc-trad.webp' },
];

export default function Site({ initialLang, creditsHtml }) {
  const [lang, setLang] = useState(initialLang);
  const [stage, setStage] = useState('1');
  const [work, setWork] = useState('1');
  // The floating menu turns to dark text over the light bands, like iOS glass over a light page
  const [barLight, setBarLight] = useState(false);
  // The second river is only fetched once the visitor starts scrolling, so it never competes with the first
  const [stage2Wanted, setStage2Wanted] = useState(false);
  const [canCopy, setCanCopy] = useState(false);
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef(0);
  const root = useRef(null);
  const copy = languages[lang];

  /* Reveals: each section's parts arrive in reading order, once */
  useEffect(() => {
    const scope = root.current;
    const revealables = scope.querySelectorAll('[data-reveal], [data-reveal-group]');
    scope.querySelectorAll('[data-reveal-group]').forEach((group) => {
      [...group.children].forEach((child, i) => child.style.setProperty('--i', i));
    });
    if (!('IntersectionObserver' in window)) {
      revealables.forEach((el) => el.classList.add('is-in'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }),
      { rootMargin: '0px 0px -12% 0px' }
    );
    revealables.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Stage swaps rivers as the intro arrives; the menu reads the band beneath it */
  useEffect(() => {
    const trigger = root.current.querySelector('[data-stage-trigger]');
    const lightBands = [...root.current.querySelectorAll('[data-tone="light"]')];
    const bar = root.current.querySelector('.bar');
    let queued = false;
    const update = () => {
      queued = false;
      setStage(trigger.getBoundingClientRect().top < innerHeight * 0.55 ? '2' : '1');
      if (scrollY > 0) setStage2Wanted(true);
      const { top, bottom } = bar.getBoundingClientRect();
      const barY = (top + bottom) / 2;
      setBarLight(lightBands.some((band) => {
        const r = band.getBoundingClientRect();
        return r.top <= barY && r.bottom >= barY;
      }));
    };
    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    };
    addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => removeEventListener('scroll', onScroll);
  }, []);

  /* Copy the address: for desktops where mailto opens nothing */
  useEffect(() => {
    setCanCopy(Boolean(navigator.clipboard?.writeText));
    return () => clearTimeout(copiedTimer.current);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(shared.email);
    } catch {
      // Clipboard refused: select the address so it can still be copied by hand
      getSelection().selectAllChildren(root.current.querySelector('.card__rows a[href^="mailto:"]'));
      return;
    }
    setCopied(true);
    clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => setCopied(false), 2400);
  };

  /* Glass surfaces bend the backdrop at their rim (Chromium; elsewhere the blur stays) */
  useEffect(() => liquidGlass(root.current), []);

  /* Back and forward follow the URL's language */
  useEffect(() => {
    const onPop = () => {
      const segment = location.pathname.split('/')[1];
      const next = languages[segment] ? segment : 'es';
      setLang(next);
      document.documentElement.lang = next;
      document.title = languages[next].title;
    };
    addEventListener('popstate', onPop);
    return () => removeEventListener('popstate', onPop);
  }, []);

  /* Channels: switch the language in place, like changing channel on a receiver */
  const switchTo = async (event, next) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (next === lang) return;
    // An explicit choice outranks geolocation on later visits to "/" (see vercel.json)
    document.cookie = `lang=${next}; path=/; max-age=31536000; SameSite=Lax; Secure`;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = root.current.querySelectorAll('[data-t]');
    const fade = (from, to, duration) =>
      Promise.all(
        [...nodes].map(
          (el, i) =>
            el.animate([{ opacity: from }, { opacity: to }], {
              duration,
              delay: reduce ? 0 : Math.min(i, 24) * 6,
              easing: 'ease',
              fill: 'forwards',
            }).finished
        )
      );
    await fade(1, 0, 140);
    flushSync(() => setLang(next));
    document.documentElement.lang = next;
    document.title = languages[next].title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', languages[next].description);
    history.pushState(null, '', `/${languages[next].path}${location.hash}`);
    await fade(0, 1, 220);
    nodes.forEach((el) => el.getAnimations().forEach((a) => a.cancel()));
  };

  return (
    <div ref={root}>
      <a className="skip" href="#main" data-t>
        {copy.skip}
      </a>

      <div className="split">
        <figure className="stage">
          <div className="stage__frame">
            <img
              className={`stage__img${stage === '1' ? ' is-on' : ''}`}
              {...picture(copy.stage1)}
              sizes={SIZES.stage}
              alt=""
              fetchPriority="high"
            />
            {stage2Wanted && (
              <img
                className={`stage__img${stage === '2' ? ' is-on' : ''}`}
                {...picture(copy.stage2)}
                sizes={SIZES.stage}
                alt=""
                decoding="async"
              />
            )}
          </div>
          <figcaption className="stage__caption">
            <span className={stage === '1' ? 'is-on' : undefined} data-glass data-t>
              {copy.stage1Caption}
            </span>
            <span className={stage === '2' ? 'is-on' : undefined} data-glass data-t>
              {copy.stage2Caption}
            </span>
          </figcaption>
        </figure>

        <div className="column">
          <header className="hero" id="top">
            <nav
              className={`bar${barLight ? ' is-light' : ''}`}
              aria-label={copy.navLabel}
              data-glass
            >
              <div className="channels" role="group" aria-label={copy.channelsLabel}>
                {Object.entries(languages).map(([l, c]) => (
                  <a
                    key={l}
                    href={`/${c.path}`}
                    hrefLang={l}
                    data-lang={l}
                    lang={l}
                    aria-current={l === lang ? 'true' : 'false'}
                    onClick={(event) => switchTo(event, l)}
                    data-glass
                  >
                    {l.toUpperCase()}
                  </a>
                ))}
              </div>
              <ul className="bar__links">
                <li>
                  <a href="#services" data-t>
                    {copy.navServices}
                  </a>
                </li>
                <li>
                  <a href="#work" data-t>
                    {copy.navWork}
                  </a>
                </li>
                <li>
                  <a href="#about" data-t>
                    {copy.navAbout}
                  </a>
                </li>
              </ul>
              <a className="button button--small" href={copy.mailto} data-glass data-t>
                {copy.navAction}
              </a>
            </nav>

            <p className="hero__line" data-reveal data-t>
              {copy.heroLine}
            </p>
            <h1 className="wordmark">
              <span>
                <span className="w">
                  <span>Miriam</span>
                </span>{' '}
                <span className="w">
                  <span>Rivero</span>
                </span>
              </span>
            </h1>
          </header>

          <main id="main">
            <section className="intro" aria-label="Miriam Rivero" data-stage-trigger>
              <div className="intro__text" data-reveal-group>
                <p className="intro__lead" data-t>
                  {copy.intro1}
                </p>
                <p data-t>{copy.intro2}</p>
                <p>
                  <span data-t>{copy.intro3}</span>{' '}
                  <a className="textlink" href={copy.mailto} data-t>
                    {copy.introLink}
                  </a>
                </p>
              </div>
            </section>

            <figure className="plate" aria-hidden="true">
              <img {...picture(copy.plate)} sizes={SIZES.plate} alt="" loading="lazy" />
            </figure>

            <section className="pairs" aria-labelledby="pairs-title">
              <h2 className="sr-only" id="pairs-title">
                {copy.pairsTitle}
              </h2>
              <ul className="pairs__list" data-reveal-group>
                {[
                  [copy.langDe, copy.langEn],
                  [copy.langDe, copy.langEs],
                  [copy.langEn, copy.langEs],
                ].map(([a, b]) => (
                  <li key={`${a}-${b}`}>
                    <span data-t>{a}</span> <PairArrow /> <span data-t>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="pairs__note" data-reveal data-t>
                {copy.pairsNote}
              </p>
            </section>
          </main>
        </div>
      </div>

      <section className="services" id="services" aria-labelledby="services-title" data-tone="light">
        <h2 className="services__title" id="services-title" data-t>
          {copy.servicesTitle}
        </h2>
        <div className="services__blocks">
          {SERVICES.map(({ n, src, flip }) => (
            <article key={n} className={`svc${flip ? ' svc--flip' : ''}`} data-reveal-group>
              <h3 className="svc__title" data-t>
                {copy[`svc${n}Title`]}
              </h3>
              <div className="svc__row">
                <img className="svc__img" {...picture(src)} sizes={SIZES.svc} alt={copy[`svc${n}Alt`]} loading="lazy" />
                <ul className="svc__list" data-t>
                  {copy[`svc${n}List`].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="work" id="work" aria-labelledby="work-title" data-tone="light">
        <h2 className="work__title" id="work-title" data-reveal data-t>
          {copy.workTitle}
        </h2>
        <div className="work__grid">
          <ol className="work__list" data-reveal-group>
            {WORK.map(({ id, src }) => (
              <li key={id} className={`work__item${work === id ? ' is-active' : ''}`}>
                <img className="work__thumb" {...picture(src)} sizes={SIZES.workThumb} alt={copy[`work${id}Alt`]} loading="lazy" />
                <button
                  type="button"
                  className="work__name"
                  onPointerEnter={() => setWork(id)}
                  onFocus={() => setWork(id)}
                  onClick={() => setWork(id)}
                >
                  <span data-t>{copy[`work${id}Name`]}</span>
                </button>
                <span className="work__meta" data-t>
                  {copy[`work${id}Meta`]}
                </span>
              </li>
            ))}
          </ol>
          <div className="work__frame" aria-hidden="true">
            {WORK.map(({ id, src }) => (
              <img key={id} className={work === id ? 'is-on' : undefined} {...picture(src)} sizes={SIZES.workFrame} alt="" loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      <section className="about" id="about" aria-label={copy.navAbout} data-tone="light">
        <div className="letter" data-reveal-group>
          <img
            className="letter__portrait"
            {...picture('assets/img/miriam.webp')}
            sizes={SIZES.portrait}
            alt={copy.portraitAlt}
            loading="lazy"
          />
          <p data-t>{copy.about1}</p>
          <p data-t>{copy.about2}</p>
          <p data-t>{copy.about3}</p>
          <p className="letter__sign">
            Miriam Rivero<span data-t>{copy.aboutRole}</span>
          </p>
        </div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <img
          className="contact__img"
          {...picture('assets/img/contact.webp')}
          sizes={SIZES.contact}
          alt={copy.contactAlt}
          loading="lazy"
        />
        <div className="card" data-reveal data-glass>
          <h2 className="card__title" id="contact-title" data-t>
            {copy.contactTitle}
          </h2>
          <p className="card__where" data-t dangerouslySetInnerHTML={{ __html: copy.contactWhere }} />
          <dl className="card__rows">
            <div>
              <dt data-t>{copy.contactEmail}</dt>
              <dd>
                <a href={`mailto:${shared.email}`}>{shared.email}</a>
                {canCopy && (
                  <button type="button" className={`copy${copied ? ' is-copied' : ''}`} onClick={copyEmail}>
                    <span className="copy__idle" data-t aria-hidden={copied}>
                      {copy.contactCopy}
                    </span>
                    <span className="copy__done" data-t aria-hidden={!copied}>
                      {copy.contactCopied}
                    </span>
                  </button>
                )}
                <span className="sr-only" role="status">
                  {copied ? copy.contactCopied : ''}
                </span>
              </dd>
            </div>
            <div>
              <dt data-t>{copy.contactLinkedin}</dt>
              <dd>
                <a href={shared.linkedin} rel="noopener">
                  {shared.linkedinShort}
                </a>
              </dd>
            </div>
            <div>
              <dt data-t>{copy.contactLangs}</dt>
              <dd>DE · EN · ES</dd>
            </div>
          </dl>
          <a className="button card__button" href={copy.mailto} data-glass data-t>
            {copy.contactButton}
          </a>
        </div>
      </section>

      <footer className="footer">
        <img
          className="footer__img"
          {...picture('assets/img/footer.webp')}
          sizes={SIZES.footer}
          alt={copy.footerAlt}
          loading="lazy"
        />
        <div className="footer__side">
          <p className="footer__mark">Miriam Rivero</p>
          <ul className="footer__menu">
            <li>
              <a href="#services" data-t>
                {copy.navServices}
              </a>
            </li>
            <li>
              <a href="#work" data-t>
                {copy.navWork}
              </a>
            </li>
            <li>
              <a href="#about" data-t>
                {copy.navAbout}
              </a>
            </li>
            <li>
              <a href="#contact" data-t>
                {copy.footerContact}
              </a>
            </li>
          </ul>
          <div className="footer__blocks">
            <a href={`mailto:${shared.email}`}>{shared.email}</a>
            <a href={shared.linkedin} rel="noopener">
              LinkedIn
            </a>
          </div>
          <div className="footer__legal">
            <p data-t>{copy.legal}</p>
            <p className="credits">
              <span data-t>{copy.creditsLabel}</span>: <span dangerouslySetInnerHTML={{ __html: creditsHtml }} />
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
