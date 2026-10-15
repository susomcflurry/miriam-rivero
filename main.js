(() => {
  const doc = document.documentElement;
  const rootURL = new URL(doc.dataset.root || './', location.href);
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ——— Reveals: each section's parts arrive in reading order, once ——— */
  const revealables = document.querySelectorAll('[data-reveal], [data-reveal-group]');
  document.querySelectorAll('[data-reveal-group]').forEach((group) => {
    [...group.children].forEach((child, i) => child.style.setProperty('--i', i));
  });
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }),
      { rootMargin: '0px 0px -12% 0px' }
    );
    revealables.forEach((el) => io.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add('is-in'));
  }

  /* ——— Stage: the first river gives way to the second as the story moves on ——— */
  const stageItems = document.querySelectorAll('[data-stage]');
  const trigger = document.querySelector('[data-stage-trigger]');
  let stageNow = '1';
  const setStage = (name) => {
    if (name === stageNow) return;
    stageNow = name;
    stageItems.forEach((el) => el.classList.toggle('is-on', el.dataset.stage === name));
  };
  if (trigger) {
    let ticking = false;
    const check = () => {
      ticking = false;
      setStage(trigger.getBoundingClientRect().top < innerHeight * 0.55 ? '2' : '1');
    };
    addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(check); }
    }, { passive: true });
    check();
  }

  /* ——— Dock: the action stays under the thumb from the services to the contact card ——— */
  const dock = document.querySelector('.dock');
  const services = document.querySelector('#services');
  const contact = document.querySelector('#contact');
  if (dock && services && contact) {
    let queued = false;
    const update = () => {
      queued = false;
      const reached = services.getBoundingClientRect().top < innerHeight * 0.6;
      const atContact = contact.getBoundingClientRect().top < innerHeight;
      const show = reached && !atContact;
      if (show === dock.classList.contains('is-shown')) return;
      dock.classList.toggle('is-shown', show);
      dock.setAttribute('aria-hidden', String(!show));
      dock.tabIndex = show ? 0 : -1;
    };
    addEventListener('scroll', () => {
      if (!queued) { queued = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ——— Work: the name under the hand shows its place ——— */
  const items = document.querySelectorAll('.work__item');
  const frames = document.querySelectorAll('.work__frame img');
  const activate = (item) => {
    const id = item.dataset.work;
    items.forEach((it) => {
      const on = it === item;
      it.classList.toggle('is-active', on);
      it.querySelector('.work__name').setAttribute('aria-pressed', String(on));
    });
    frames.forEach((img) => img.classList.toggle('is-on', img.dataset.work === id));
  };
  items.forEach((item) => {
    const button = item.querySelector('.work__name');
    button.addEventListener('pointerenter', () => activate(item));
    button.addEventListener('focus', () => activate(item));
    button.addEventListener('click', () => activate(item));
  });

  /* ——— Channels: switch the language in place, like changing channel on a receiver ——— */
  const channels = document.querySelectorAll('.channels a[data-lang]');
  let dictionary = null;
  const loadDictionary = () =>
    dictionary
      ? Promise.resolve(dictionary)
      : fetch(new URL('i18n.json', rootURL)).then((r) => {
          if (!r.ok) throw new Error('i18n');
          return r.json();
        }).then((d) => (dictionary = d));

  const markCurrent = (lang) => {
    channels.forEach((a) => a.setAttribute('aria-current', String(a.dataset.lang === lang)));
  };
  markCurrent(doc.lang);

  const textNodes = () => document.querySelectorAll('[data-i18n], [data-i18n-html], [data-i18n-list]');

  const apply = (lang) => {
    const copy = dictionary[lang];
    document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = copy[el.dataset.i18n]; });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => { el.innerHTML = copy[el.dataset.i18nHtml]; });
    document.querySelectorAll('[data-i18n-list]').forEach((el) => {
      el.replaceChildren(...copy[el.dataset.i18nList].map((text) => {
        const li = document.createElement('li');
        li.textContent = text;
        return li;
      }));
    });
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      const [attr, key] = el.dataset.i18nAttr.split(':');
      el.setAttribute(attr, copy[key]);
    });
    document.querySelectorAll('[data-i18n-href]').forEach((el) => { el.href = copy[el.dataset.i18nHref]; });
    document.querySelectorAll('[data-i18n-src]').forEach((el) => { el.src = new URL(copy[el.dataset.i18nSrc], rootURL).href; });
    doc.lang = lang;
    document.title = copy.title;
    document.querySelector('meta[name="description"]').setAttribute('content', copy.description);
    markCurrent(lang);
  };

  const fade = (els, from, to, duration) =>
    Promise.all([...els].map((el, i) =>
      el.animate([{ opacity: from }, { opacity: to }], {
        duration,
        delay: reduceMotion ? 0 : Math.min(i, 24) * 6,
        easing: 'ease',
        fill: 'forwards',
      }).finished
    ));

  const switchTo = async (lang, push) => {
    if (lang === doc.lang) return;
    try { await loadDictionary(); } catch { location.href = new URL(languagesPath(lang), rootURL).href; return; }
    // Pin every relative resource to an absolute URL before the document URL changes.
    document.querySelectorAll('img[src]').forEach((img) => img.setAttribute('src', img.src));
    const nodes = textNodes();
    await fade(nodes, 1, 0, 140);
    apply(lang);
    if (push) history.pushState({ lang }, '', new URL(dictionary[lang].path, rootURL).href + location.hash);
    await fade(nodes, 0, 1, 220);
    nodes.forEach((el) => el.getAnimations().forEach((a) => a.cancel()));
  };
  const languagesPath = (lang) => (lang === 'es' ? '' : `${lang}/`);

  channels.forEach((a) => {
    a.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      switchTo(a.dataset.lang, true);
    });
  });
  addEventListener('popstate', () => {
    const rel = location.href.slice(rootURL.href.length);
    const lang = rel.startsWith('en/') ? 'en' : rel.startsWith('de/') ? 'de' : 'es';
    switchTo(lang, false);
  });
})();
