/* @ds-bundle: {"format":4,"namespace":"EllaDesignSystem_313f80","components":[{"name":"Footer","sourcePath":"ui_kits/website/components/Footer.jsx"},{"name":"Header","sourcePath":"ui_kits/website/components/Header.jsx"},{"name":"Icons","sourcePath":"ui_kits/website/components/Icons.jsx"},{"name":"Photo","sourcePath":"ui_kits/website/components/Photo.jsx"},{"name":"SvgAssets","sourcePath":"ui_kits/website/components/SvgAssets.jsx"},{"name":"AboutJessica","sourcePath":"ui_kits/website/screens/AboutJessica.jsx"},{"name":"ArticleView","sourcePath":"ui_kits/website/screens/ArticleView.jsx"},{"name":"ArticlesHub","sourcePath":"ui_kits/website/screens/ArticlesHub.jsx"},{"name":"AwarenessQuiz","sourcePath":"ui_kits/website/screens/AwarenessQuiz.jsx"},{"name":"CareOnBudget","sourcePath":"ui_kits/website/screens/CareOnBudget.jsx"},{"name":"Glossary","sourcePath":"ui_kits/website/screens/Glossary.jsx"},{"name":"Homepage","sourcePath":"ui_kits/website/screens/Homepage.jsx"},{"name":"NutritionHub","sourcePath":"ui_kits/website/screens/NutritionHub.jsx"},{"name":"Privacy","sourcePath":"ui_kits/website/screens/Privacy.jsx"},{"name":"Resources","sourcePath":"ui_kits/website/screens/Resources.jsx"},{"name":"SupplementsHub","sourcePath":"ui_kits/website/screens/SupplementsHub.jsx"},{"name":"Symptoms","sourcePath":"ui_kits/website/screens/Symptoms.jsx"},{"name":"WhenToSeeDoctor","sourcePath":"ui_kits/website/screens/WhenToSeeDoctor.jsx"}],"sourceHashes":{"ui_kits/website/app.jsx":"7286c0433765","ui_kits/website/components/Footer.jsx":"110cfc60c301","ui_kits/website/components/Header.jsx":"3abfbe961902","ui_kits/website/components/Icons.jsx":"e14088d21aca","ui_kits/website/components/Photo.jsx":"6456013e3ae5","ui_kits/website/components/SvgAssets.jsx":"b7e9278f5dbe","ui_kits/website/components/i18n.jsx":"0316e0c26135","ui_kits/website/screens/AboutJessica.jsx":"bb43bd172304","ui_kits/website/screens/ArticleView.jsx":"d173ba813036","ui_kits/website/screens/ArticlesHub.jsx":"a906f7eea7f6","ui_kits/website/screens/AwarenessQuiz.jsx":"2f7cd0b5fe33","ui_kits/website/screens/CareOnBudget.jsx":"786fd3e6cbc0","ui_kits/website/screens/Glossary.jsx":"777f0a1a78a6","ui_kits/website/screens/Homepage.jsx":"57a6b6fedaae","ui_kits/website/screens/NutritionHub.jsx":"d0e826e2ef84","ui_kits/website/screens/Privacy.jsx":"52aa71b7c307","ui_kits/website/screens/Resources.jsx":"93ea17d8f44b","ui_kits/website/screens/SupplementsHub.jsx":"060dc3976643","ui_kits/website/screens/Symptoms.jsx":"1e4e26e4cb7a","ui_kits/website/screens/WhenToSeeDoctor.jsx":"724d22e81a1b","ui_kits/website/screens/articleData.jsx":"9f29499aac6f","ui_kits/website/screens/symptomData.jsx":"118e368c345b","ui_kits/website/tweaks-panel.jsx":"82c387552588","workbook-app.js":"5de5f895c7cf","workbook-data.js":"a4ef3835595c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.EllaDesignSystem_313f80 = window.EllaDesignSystem_313f80 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/website/app.jsx
try { (() => {
// Ella website kit, interactive prototype shell. Single-page router
// across the 5 screens, plus a Tweaks panel for color / type / hero
// variant / language.

// ---- Shared external links (replace placeholders with real ones) ----
// Fill these in and the matching buttons appear automatically.
// Empty = the button is hidden (or falls back to email for booking).
const ELLA_EMAIL = 'info@ellabienestar.com';
const ELLA_LINKS = {
  whatsapp: '',
  // e.g. 'https://wa.me/15551234567'
  whatsappChannel: '',
  // e.g. 'https://whatsapp.com/channel/XXXX'
  calendar: 'https://calendar.app.google/ocK2oisypCb66A4X9',
  instagram: '',
  // e.g. 'https://instagram.com/handle'
  email: ELLA_EMAIL
};
// Until a booking link exists, "Book" opens an email to Jessica.
ELLA_LINKS.booking = ELLA_LINKS.calendar || 'mailto:' + ELLA_EMAIL + '?subject=' + encodeURIComponent('Cita de 30 minutos / 30-minute appointment');
window.ELLA_LINKS = ELLA_LINKS;
const ELLA_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primary": "#7e5266",
  "displayFont": "DM Serif Display",
  "bodyFont": "Nunito",
  "heroVariant": "default",
  "showOrnaments": true,
  "lang": "en"
} /*EDITMODE-END*/;

// ---- URLs: every page gets its own address, e.g. #/es/articles/inflammation ----
const ELLA_ROUTES = ['home', 'articles', 'article', 'nutrition', 'supplements', 'resources', 'about', 'quiz', 'privacy', 'glossary', 'symptoms', 'urgent', 'budget'];
function parseEllaHash() {
  const parts = (window.location.hash || '').replace(/^#\/?/, '').split('/').filter(Boolean);
  let lang = null;
  if (parts[0] === 'es' || parts[0] === 'en') lang = parts.shift();
  let route = parts[0] || 'home',
    id = null;
  if (route === 'articles' && parts[1]) {
    route = 'article';
    id = decodeURIComponent(parts[1]);
  }
  if (route === 'symptoms' && parts[1]) {
    id = decodeURIComponent(parts[1]);
  }
  if (!ELLA_ROUTES.includes(route)) route = 'home';
  return {
    lang,
    route,
    id
  };
}
function buildEllaHash(lang, route, id) {
  const path = route === 'home' ? '' : route === 'article' ? 'articles/' + encodeURIComponent(id) : route === 'symptoms' && id ? 'symptoms/' + encodeURIComponent(id) : route;
  return '#/' + lang + (path ? '/' + path : '');
}
// First visit: Spanish-speaking browsers open in Spanish.
function initialEllaLang(fallback) {
  const fromUrl = parseEllaHash().lang;
  if (fromUrl) return fromUrl;
  try {
    const saved = localStorage.getItem('ella-lang');
    if (saved === 'es' || saved === 'en') return saved;
  } catch (e) {}
  const nav = navigator.languages && navigator.languages[0] || navigator.language || '';
  return /^es\b/i.test(nav) ? 'es' : fallback || 'en';
}
function App() {
  const [t, setTweak] = useTweaks(ELLA_TWEAK_DEFAULTS);
  const initial = React.useMemo(parseEllaHash, []);
  const [route, setRoute] = React.useState(initial.route);
  const [articleId, setArticleId] = React.useState(initial.route === 'article' && initial.id ? initial.id : 'menopause-vs-perimenopause');
  const [symptomId, setSymptomId] = React.useState(initial.route === 'symptoms' ? initial.id : null);
  function openSymptom(id) {
    setSymptomId(id);
    setRoute('symptoms');
    window.scrollTo({
      top: 0
    });
  }
  const [lang, setLangState] = React.useState(() => initialEllaLang(t.lang));
  const setLang = l => {
    setLangState(l);
    try {
      localStorage.setItem('ella-lang', l);
    } catch (e) {}
  };

  // Keep the address bar in step with the page (adds a history entry, so Back works).
  React.useEffect(() => {
    const want = buildEllaHash(lang, route, route === 'symptoms' ? symptomId : articleId);
    if (window.location.hash !== want) window.location.hash = want;
  }, [lang, route, articleId, symptomId]);

  // Back/forward buttons and pasted links.
  React.useEffect(() => {
    function onHash() {
      const p = parseEllaHash();
      if (p.lang && p.lang !== lang) setLangState(p.lang);
      setRoute(p.route);
      if (p.route === 'article' && p.id) setArticleId(p.id);
      if (p.route === 'symptoms') setSymptomId(p.id || null);
    }
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [lang]);
  const [articleCategory, setArticleCategory] = React.useState(null);
  const headerRef = React.useRef(null);
  function openArticle(id) {
    setArticleId(id);
    setRoute('article');
    window.scrollTo({
      top: 0
    });
  }
  function goToCategory(targetRoute, category) {
    setArticleCategory(category);
    setRoute(targetRoute);
  }

  // Apply tweaks to root CSS vars
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--ella-rose', t.primary);
    root.style.setProperty('--brand-primary', t.primary);
    // derive a darker hover/press shade from the chosen primary
    const dark = (hex, amt) => {
      const n = parseInt(hex.slice(1), 16);
      const cl = v => Math.max(0, Math.min(255, v));
      const r = cl((n >> 16 & 255) - amt),
        g = cl((n >> 8 & 255) - amt),
        b = cl((n & 255) - amt);
      return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
    };
    root.style.setProperty('--ella-rose-deep', dark(t.primary, 25));
    root.style.setProperty('--brand-primary-hover', dark(t.primary, 25));

    // font swap
    root.style.setProperty('--font-display', `'${t.displayFont}', 'Cormorant Garamond', Georgia, serif`);
    root.style.setProperty('--font-body', `'${t.bodyFont}', 'Avenir Next', 'Segoe UI', system-ui, sans-serif`);
  }, [t.primary, t.displayFont, t.bodyFont]);
  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Reset scroll on route change
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [route]);

  // Scroll-reveal: fade/slide sections in as they enter the viewport
  React.useEffect(() => {
    const targets = document.querySelectorAll('main section, main .ella-about-hero, main .ella-about-grid');
    if (!targets.length) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px'
    });
    targets.forEach((el, i) => {
      el.classList.add('ella-reveal');
      el.style.transitionDelay = (i === 0 ? 0 : Math.min(i, 3) * 60) + 'ms';
      io.observe(el);
    });
    return () => io.disconnect();
  }, [route]);
  let screen = null;
  if (route === 'home') screen = /*#__PURE__*/React.createElement(Homepage, {
    lang: lang,
    setRoute: setRoute,
    setArticleId: setArticleId,
    openSymptom: openSymptom,
    goToCategory: goToCategory,
    primaryColor: t.primary,
    heroVariant: t.heroVariant
  });else if (route === 'quiz') screen = /*#__PURE__*/React.createElement(AwarenessQuiz, {
    lang: lang,
    setRoute: setRoute,
    openArticle: openArticle
  });else if (route === 'article') screen = /*#__PURE__*/React.createElement(ArticleView, {
    lang: lang,
    setRoute: setRoute,
    articleId: articleId,
    setArticleId: setArticleId
  });else if (route === 'articles') screen = /*#__PURE__*/React.createElement(ArticlesHub, {
    lang: lang,
    setRoute: setRoute,
    setArticleId: setArticleId,
    initialCategory: articleCategory
  });else if (route === 'nutrition') screen = /*#__PURE__*/React.createElement(NutritionHub, {
    lang: lang,
    setRoute: setRoute,
    setArticleId: setArticleId
  });else if (route === 'resources') screen = /*#__PURE__*/React.createElement(Resources, {
    lang: lang,
    setRoute: setRoute
  });else if (route === 'supplements') screen = /*#__PURE__*/React.createElement(SupplementsHub, {
    lang: lang,
    setRoute: setRoute
  });else if (route === 'about') screen = /*#__PURE__*/React.createElement(AboutJessica, {
    lang: lang,
    setRoute: setRoute
  });else if (route === 'privacy') screen = /*#__PURE__*/React.createElement(Privacy, {
    lang: lang,
    setRoute: setRoute
  });else if (route === 'glossary') screen = /*#__PURE__*/React.createElement(Glossary, {
    lang: lang,
    setRoute: setRoute
  });else if (route === 'symptoms') screen = /*#__PURE__*/React.createElement(Symptoms, {
    lang: lang,
    setRoute: r => {
      if (r === 'symptoms') setSymptomId(null);
      setRoute(r);
    },
    symptomId: symptomId,
    openSymptom: openSymptom,
    openArticle: openArticle
  });else if (route === 'urgent') screen = /*#__PURE__*/React.createElement(WhenToSeeDoctor, {
    lang: lang,
    setRoute: setRoute
  });else if (route === 'budget') screen = /*#__PURE__*/React.createElement(CareOnBudget, {
    lang: lang,
    setRoute: setRoute
  });else screen = /*#__PURE__*/React.createElement(Homepage, {
    lang: lang,
    setRoute: setRoute,
    setArticleId: setArticleId,
    openSymptom: openSymptom,
    goToCategory: goToCategory,
    primaryColor: t.primary,
    heroVariant: t.heroVariant
  });
  return /*#__PURE__*/React.createElement("div", {
    className: t.showOrnaments ? '' : 'ella-no-ornaments'
  }, /*#__PURE__*/React.createElement(Header, {
    lang: lang,
    setLang: setLang,
    route: route,
    setRoute: setRoute,
    goToCategory: goToCategory,
    openArticle: openArticle,
    openSymptom: openSymptom
  }), /*#__PURE__*/React.createElement("main", {
    key: route,
    className: "ella-main-fade"
  }, screen), /*#__PURE__*/React.createElement(Footer, {
    lang: lang,
    setRoute: setRoute
  }), /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Brand"
  }, /*#__PURE__*/React.createElement(TweakColor, {
    label: "Primary color",
    value: t.primary,
    options: ['#7e5266', '#653f52', '#5f4a80', '#6f7e5d'],
    onChange: v => setTweak('primary', v)
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Hero copy",
    value: t.heroVariant,
    options: [{
      value: 'default',
      label: 'Default'
    }, {
      value: 'editorial',
      label: 'Editorial'
    }, {
      value: 'soft',
      label: 'Soft'
    }],
    onChange: v => setTweak('heroVariant', v)
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Show botanical ornaments",
    value: t.showOrnaments,
    onChange: v => setTweak('showOrnaments', v)
  })), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Type"
  }, /*#__PURE__*/React.createElement(TweakSelect, {
    label: "Display",
    value: t.displayFont,
    options: [{
      value: 'DM Serif Display',
      label: 'DM Serif Display'
    }, {
      value: 'Cormorant Garamond',
      label: 'Cormorant Garamond'
    }, {
      value: 'Fraunces',
      label: 'Fraunces (alt)'
    }, {
      value: 'Lora',
      label: 'Lora (soft serif)'
    }],
    onChange: v => setTweak('displayFont', v)
  }), /*#__PURE__*/React.createElement(TweakSelect, {
    label: "Body",
    value: t.bodyFont,
    options: [{
      value: 'Nunito',
      label: 'Nunito'
    }, {
      value: 'Manrope',
      label: 'Manrope'
    }, {
      value: 'Inter',
      label: 'Inter'
    }],
    onChange: v => setTweak('bodyFont', v)
  })), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Audience"
  }, /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Language",
    value: lang,
    options: [{
      value: 'en',
      label: 'English'
    }, {
      value: 'es',
      label: 'Espa\u00f1ol'
    }],
    onChange: v => setLang(v)
  })), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Jump to screen"
  }, /*#__PURE__*/React.createElement(TweakButton, {
    label: "Homepage",
    onClick: () => setRoute('home')
  }), /*#__PURE__*/React.createElement(TweakButton, {
    label: "About Jessica",
    onClick: () => setRoute('about'),
    secondary: true
  }), /*#__PURE__*/React.createElement(TweakButton, {
    label: "Articles hub",
    onClick: () => setRoute('articles'),
    secondary: true
  }), /*#__PURE__*/React.createElement(TweakButton, {
    label: "Nutrition hub",
    onClick: () => setRoute('nutrition'),
    secondary: true
  }), /*#__PURE__*/React.createElement(TweakButton, {
    label: "Awareness Quiz",
    onClick: () => setRoute('quiz'),
    secondary: true
  }), /*#__PURE__*/React.createElement(TweakButton, {
    label: "Supplements",
    onClick: () => setRoute('supplements'),
    secondary: true
  }), /*#__PURE__*/React.createElement(TweakButton, {
    label: "Resources",
    onClick: () => setRoute('resources'),
    secondary: true
  }), /*#__PURE__*/React.createElement(TweakButton, {
    label: "Privacy",
    onClick: () => setRoute('privacy'),
    secondary: true
  }), /*#__PURE__*/React.createElement(TweakButton, {
    label: "Glossary",
    onClick: () => setRoute('glossary'),
    secondary: true
  }), /*#__PURE__*/React.createElement(TweakButton, {
    label: "Symptoms",
    onClick: () => openSymptom(null),
    secondary: true
  }), /*#__PURE__*/React.createElement(TweakButton, {
    label: "When to see a doctor",
    onClick: () => setRoute('urgent'),
    secondary: true
  }), /*#__PURE__*/React.createElement(TweakButton, {
    label: "Care on a budget",
    onClick: () => setRoute('budget'),
    secondary: true
  }))));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/components/Footer.jsx
try { (() => {
// Footer, compact two-up: newsletter beside the link columns, then one
// bottom rule with brand, contact, copyright, and the medical disclaimer.

function Footer({
  lang,
  setRoute
}) {
  const t = useT(lang);
  const isEs = lang === 'es';
  const [email, setEmail] = React.useState('');
  const [sent, setSent] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  // Submits to Netlify Forms (form name "newsletter"). Sign-ups appear in the
  // Netlify dashboard under Forms, and Netlify can email each one to Jessica.
  async function subscribe(e) {
    e.preventDefault();
    if (!email.includes('@') || busy) return;
    setBusy(true);
    setFailed(false);
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          'form-name': 'newsletter',
          email,
          lang
        }).toString()
      });
      if (!res.ok) throw new Error('status ' + res.status);
      setSent(true);
    } catch (err) {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }
  const cols = [{
    title: isEs ? 'Explora' : 'Explore',
    links: [{
      label: isEs ? 'Artículos' : 'Articles',
      onClick: () => setRoute('articles')
    }, {
      label: isEs ? 'Suplementos' : 'Supplements',
      onClick: () => setRoute('supplements')
    }, {
      label: isEs ? 'Recursos' : 'Resources',
      onClick: () => setRoute('resources')
    }, {
      label: isEs ? 'Glosario' : 'Glossary',
      onClick: () => setRoute('glossary')
    }, {
      label: isEs ? 'Atención de bajo costo' : 'Care on a budget',
      onClick: () => setRoute('budget')
    }, {
      label: isEs ? 'Cuándo ir al médico' : 'When to see a doctor',
      onClick: () => setRoute('urgent')
    }]
  }, {
    title: 'Ella',
    links: [{
      label: isEs ? 'Sobre Jessica' : 'About Jessica',
      onClick: () => setRoute('about')
    }, {
      label: isEs ? 'Haz una cita' : 'Book a consultation',
      href: window.ELLA_LINKS && window.ELLA_LINKS.booking || '#'
    }, ...(window.ELLA_LINKS && window.ELLA_LINKS.instagram ? [{
      label: 'Instagram',
      href: window.ELLA_LINKS.instagram
    }] : []), ...(window.ELLA_LINKS && window.ELLA_LINKS.whatsappChannel ? [{
      label: isEs ? 'Canal de WhatsApp' : 'WhatsApp Channel',
      href: window.ELLA_LINKS.whatsappChannel
    }] : [])]
  }];
  return /*#__PURE__*/React.createElement("footer", {
    className: "ella-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-footer-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-footer-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-footer-newsletter-block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow",
    style: {
      color: 'var(--ella-rose-deep)'
    }
  }, isEs ? 'BOLET\u00cdN' : 'NEWSLETTER'), /*#__PURE__*/React.createElement("h2", {
    className: "ella-h2-italic"
  }, isEs ? /*#__PURE__*/React.createElement(React.Fragment, null, "Recibe mi nota ", /*#__PURE__*/React.createElement("em", null, "semanal.")) : /*#__PURE__*/React.createElement(React.Fragment, null, "Get the ", /*#__PURE__*/React.createElement("em", null, "weekly note."))), sent ? /*#__PURE__*/React.createElement("p", {
    className: "ella-newsletter-done"
  }, isEs ? '¡Gracias! Ya estás en la lista.' : 'Thank you, you’re on the list.') : /*#__PURE__*/React.createElement("form", {
    className: "ella-newsletter-form",
    onSubmit: subscribe
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    required: true,
    value: email,
    onChange: e => setEmail(e.target.value),
    placeholder: t('newsletter_placeholder'),
    "aria-label": "Email"
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "ella-btn ella-btn-primary",
    disabled: busy
  }, busy ? isEs ? 'Enviando…' : 'Sending…' : t('newsletter_cta'))), failed && !sent && /*#__PURE__*/React.createElement("p", {
    className: "ella-newsletter-error"
  }, isEs ? 'No se pudo enviar. Inténtalo de nuevo o escríbenos a ' : 'That didn’t go through. Try again, or email us at ', /*#__PURE__*/React.createElement("a", {
    href: 'mailto:' + (window.ELLA_LINKS && window.ELLA_LINKS.email || 'info@ellabienestar.com')
  }, window.ELLA_LINKS && window.ELLA_LINKS.email || 'info@ellabienestar.com'), "."), /*#__PURE__*/React.createElement("p", {
    className: "ella-newsletter-privacy"
  }, isEs ? 'Solo uso tu correo para mandarte la nota. Te puedes dar de baja cuando quieras. ' : 'I only use your email to send the note. Unsubscribe anytime. ', /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      setRoute('privacy');
    }
  }, isEs ? 'Privacidad' : 'Privacy'))), /*#__PURE__*/React.createElement("div", {
    className: "ella-footer-cols"
  }, cols.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.title,
    className: "ella-footer-col"
  }, /*#__PURE__*/React.createElement("h5", null, c.title), /*#__PURE__*/React.createElement("ul", null, c.links.map((l, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, l.href ? /*#__PURE__*/React.createElement("a", {
    href: l.href,
    target: "_blank",
    rel: "noopener noreferrer"
  }, l.label) : /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      l.onClick();
    }
  }, l.label)))))))), /*#__PURE__*/React.createElement("div", {
    className: "ella-footer-divider"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ella-footer-bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-footer-bottom-brand"
  }, /*#__PURE__*/React.createElement(LogoEllaSvg, {
    width: 92
  }), /*#__PURE__*/React.createElement("span", {
    className: "ella-footer-copy"
  }, "\xA9 ", new Date().getFullYear(), " \xB7 ", isEs ? 'Por Jessica Zavala' : 'By Jessica Zavala'), /*#__PURE__*/React.createElement("a", {
    href: 'mailto:' + (window.ELLA_LINKS && window.ELLA_LINKS.email || 'info@ellabienestar.com')
  }, window.ELLA_LINKS && window.ELLA_LINKS.email || 'info@ellabienestar.com')), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "ella-footer-privacy",
    onClick: e => {
      e.preventDefault();
      setRoute('privacy');
    }
  }, isEs ? 'Privacidad' : 'Privacy'), /*#__PURE__*/React.createElement("div", {
    className: "ella-footer-disclaim"
  }, isEs ? 'Solo informativo. No sustituye la consulta con tu médico.' : 'Informational only, does not replace medical advice.'))));
}
window.Footer = Footer;
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/components/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/components/Header.jsx
try { (() => {
// Header, sticky cream bar with logo, nav, search, language toggle.

function LangToggle({
  lang,
  setLang
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ella-langtoggle",
    role: "group",
    "aria-label": "Language"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-pressed": lang === 'es',
    className: lang === 'es' ? 'is-active' : '',
    onClick: () => setLang('es')
  }, "ES"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-pressed": lang === 'en',
    className: lang === 'en' ? 'is-active' : '',
    onClick: () => setLang('en')
  }, "EN"));
}

// Related-concept map. If a search matches any word in "match", the search
// also looks for the "related" words, so "fatigue" finds articles that talk
// about sleep, iron or thyroid even if they never say "fatigue".
// Words are lowercase without accents. Add to this list freely.
const ELLA_CONCEPTS = [{
  match: ['fatigue', 'tired', 'tiredness', 'exhausted', 'exhaustion', 'low energy', 'energy', 'fatiga', 'cansancio', 'cansada', 'agotamiento', 'agotada', 'energia', 'sin energia'],
  related: ['sleep', 'insomnia', 'night sweats', 'iron', 'anemia', 'thyroid', 'vitamin d', 'b12', 'magnesium', 'depression', 'mood', 'sueno', 'insomnio', 'sudores', 'hierro', 'tiroides', 'vitamina d', 'magnesio', 'animo', 'depresion']
}, {
  match: ['hot flash', 'hot flashes', 'flush', 'flushing', 'sweats', 'night sweats', 'sofoco', 'sofocos', 'bochorno', 'bochornos', 'calores', 'sudores'],
  related: ['estrogen', 'hormone', 'vasomotor', 'temperature', 'estrogeno', 'hormona', 'temperatura']
}, {
  match: ['sleep', 'insomnia', 'waking up', 'cant sleep', 'sueno', 'dormir', 'insomnio', 'despertar'],
  related: ['night sweats', 'magnesium', 'melatonin', 'anxiety', 'sudores', 'magnesio', 'melatonina', 'ansiedad']
}, {
  match: ['mood', 'anxiety', 'anxious', 'depression', 'depressed', 'irritable', 'irritability', 'sad', 'crying', 'animo', 'ansiedad', 'depresion', 'irritabilidad', 'tristeza', 'llorar'],
  related: ['sleep', 'brain fog', 'mental health', 'estrogen', 'serotonin', 'sueno', 'niebla', 'salud mental', 'estrogeno']
}, {
  match: ['brain fog', 'memory', 'forgetful', 'forgetting', 'focus', 'concentration', 'niebla', 'memoria', 'olvido', 'olvidos', 'concentracion'],
  related: ['sleep', 'estrogen', 'omega', 'magnesium', 'sueno', 'estrogeno', 'magnesio']
}, {
  match: ['weight', 'belly', 'metabolism', 'weight gain', 'peso', 'barriga', 'abdomen', 'panza', 'metabolismo'],
  related: ['muscle', 'protein', 'strength', 'insulin', 'creatine', 'musculo', 'proteina', 'fuerza', 'insulina', 'creatina']
}, {
  match: ['joint', 'joints', 'joint pain', 'aches', 'stiff', 'stiffness', 'articulaciones', 'dolor', 'rigidez'],
  related: ['inflammation', 'omega', 'turmeric', 'inflamacion', 'curcuma']
}, {
  match: ['bone', 'bones', 'osteoporosis', 'bone density', 'fracture', 'hueso', 'huesos', 'densidad osea', 'fractura'],
  related: ['calcium', 'vitamin d', 'k2', 'strength', 'calcio', 'vitamina d', 'fuerza']
}, {
  match: ['heart', 'cholesterol', 'blood pressure', 'corazon', 'colesterol', 'presion'],
  related: ['omega', 'fiber', 'inflammation', 'fibra', 'inflamacion']
}, {
  match: ['dryness', 'vaginal', 'sex', 'libido', 'intimacy', 'painful sex', 'sequedad', 'sexo', 'deseo', 'intimidad'],
  related: ['estrogen', 'lubricant', 'vaginal', 'estrogeno', 'lubricante']
}, {
  match: ['hair', 'skin', 'wrinkles', 'cabello', 'pelo', 'piel', 'arrugas'],
  related: ['collagen', 'estrogen', 'protein', 'colageno', 'estrogeno', 'proteina']
}, {
  match: ['period', 'periods', 'bleeding', 'irregular', 'cycle', 'regla', 'sangrado', 'ciclo', 'menstruacion'],
  related: ['perimenopause', 'perimenopausia']
}, {
  match: ['bloating', 'digestion', 'constipation', 'gut', 'hinchazon', 'digestion', 'estrenimiento', 'intestino'],
  related: ['fiber', 'probiotics', 'fibra', 'probioticos']
}];
function relatedTerms(term) {
  if (!term || term.length < 3) return [];
  const out = new Set();
  for (const c of ELLA_CONCEPTS) {
    const hit = c.match.some(w => w === term || term.length >= 4 && (w.startsWith(term) || term.startsWith(w)));
    if (hit) c.related.forEach(r => {
      if (r !== term && !term.includes(r)) out.add(r);
    });
  }
  return [...out];
}

// Flattens an article body block into plain searchable text.
function blockText(b) {
  if (typeof b === 'string') return b;
  if (!b || typeof b !== 'object') return '';
  let out = b.text || b.title || '';
  if (Array.isArray(b.items)) out += ' ' + b.items.join(' ');
  if (Array.isArray(b.rows)) out += ' ' + b.rows.flat().join(' ');
  if (Array.isArray(b.headers)) out += ' ' + b.headers.join(' ');
  return out;
}
function Header({
  lang,
  setLang,
  route,
  setRoute,
  goToCategory,
  openArticle,
  openSymptom
}) {
  const t = useT(lang);
  const isEs = lang === 'es';
  const [scrolled, setScrolled] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scope, setScope] = React.useState('all');
  const dropRef = React.useRef(null);
  const SCOPES = [{
    id: 'all',
    label: isEs ? 'Todo' : 'All'
  }, {
    id: 'articles',
    label: isEs ? 'Artículos' : 'Articles'
  }, {
    id: 'syms',
    label: isEs ? 'Síntomas' : 'Symptoms'
  }, {
    id: 'supps',
    label: isEs ? 'Suplementos' : 'Supplements'
  }, {
    id: 'gloss',
    label: isEs ? 'Glosario' : 'Glossary'
  }];
  const SUGGEST = isEs ? ['Sofocos', 'Insomnio', 'Vitamina D', 'Magnesio', 'Niebla mental', 'Proteína'] : ['Hot flashes', 'Sleep', 'Vitamin D', 'Magnesium', 'Brain fog', 'Protein'];
  const show = k => scope === 'all' || scope === k;
  React.useEffect(() => {
    setMenuOpen(false);
  }, [route, lang]);
  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = e => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);
  const [q, setQ] = React.useState('');
  const inputRef = React.useRef(null);
  const searchRef = React.useRef(null);

  // Pages are searchable alongside articles so "supplements" finds the hub.
  const PAGES = isEs ? [{
    label: 'Suplementos',
    route: 'supplements',
    blurb: 'Los que investigué para mí, y qué buscar en la etiqueta.'
  }, {
    label: 'Recursos',
    route: 'resources',
    blurb: 'Fuentes confiables para leer más.'
  }, {
    label: 'Sobre Jessica',
    route: 'about',
    blurb: 'Por qué existe Ella, contado por Jessica.'
  }, {
    label: 'Artículos',
    route: 'articles',
    blurb: 'Todos los artículos.'
  }, {
    label: 'Nutrición',
    route: 'nutrition',
    blurb: 'Alimentación y movimiento en esta etapa.'
  }, {
    label: 'Glosario',
    route: 'glossary',
    blurb: 'Términos médicos en español y en inglés.'
  }, {
    label: 'Cuándo ir al médico',
    route: 'urgent',
    blurb: 'Síntomas que no pueden esperar.'
  }, {
    label: 'Atención de bajo costo',
    route: 'budget',
    blurb: 'Centros de salud, medicinas más baratas y seguro.'
  }, {
    label: 'Privacidad',
    route: 'privacy',
    blurb: 'Qué datos guardamos y cuáles no.'
  }] : [{
    label: 'Supplements',
    route: 'supplements',
    blurb: 'The ones I researched for myself, and the form to look for on the label.'
  }, {
    label: 'Resources',
    route: 'resources',
    blurb: 'Sources worth trusting when you want to read further.'
  }, {
    label: 'About Jessica',
    route: 'about',
    blurb: 'Why Ella exists, in her words.'
  }, {
    label: 'Articles',
    route: 'articles',
    blurb: 'The full library.'
  }, {
    label: 'Nutrition',
    route: 'nutrition',
    blurb: 'Food and movement at this stage.'
  }, {
    label: 'Glossary',
    route: 'glossary',
    blurb: 'Medical terms in Spanish and English.'
  }, {
    label: 'When to see a doctor',
    route: 'urgent',
    blurb: 'Symptoms that can’t wait.'
  }, {
    label: 'Care on a budget',
    route: 'budget',
    blurb: 'Health centers, cheaper prescriptions, and insurance.'
  }, {
    label: 'Privacy',
    route: 'privacy',
    blurb: 'What we keep, and what we don’t.'
  }];

  // ---- Search: matches words anywhere (titles, body, supplements, glossary), accent-insensitive ----
  const fold = s => (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const term = fold(q.trim());
  const related = React.useMemo(() => relatedTerms(term), [term]);
  const hlTerms = [term, ...related].filter(Boolean);

  // A short excerpt around the first match, so you can see where the word appears.
  function excerpt(text, max = 130, t = term) {
    const f = fold(text);
    const at = f.indexOf(t);
    if (at < 0) return null;
    let start = Math.max(0, at - 50);
    let end = Math.min(text.length, at + t.length + (max - 50));
    if (start > 0) {
      const sp = text.indexOf(' ', start);
      if (sp > -1 && sp < at) start = sp + 1;
    }
    if (end < text.length) {
      const sp = text.lastIndexOf(' ', end);
      if (sp > at + t.length) end = sp;
    }
    return (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
  }
  // Wraps every match in <mark>. Works char-by-char so accents line up.
  function hl(text) {
    if (!term || !text) return text;
    const f = fold(text);
    const out = [];
    let i = 0,
      k = 0;
    while (i < text.length) {
      let at = -1,
        len = 0;
      for (const t of hlTerms) {
        const p = f.indexOf(t, i);
        if (p > -1 && (at < 0 || p < at || p === at && t.length > len)) {
          at = p;
          len = t.length;
        }
      }
      if (at < 0) {
        out.push(text.slice(i));
        break;
      }
      if (at > i) out.push(text.slice(i, at));
      out.push(/*#__PURE__*/React.createElement("mark", {
        key: k++,
        className: "ella-search-mark"
      }, text.slice(at, at + len)));
      i = at + len;
    }
    return out;
  }
  // Direct match first; if none, the first related concept that appears.
  function firstHit(fields) {
    for (const t of fields) {
      if (t && fold(t).includes(term)) return {
        text: t,
        word: term,
        via: null
      };
    }
    for (const r of related) {
      for (const t of fields) {
        if (t && fold(t).includes(r)) return {
          text: t,
          word: r,
          via: r
        };
      }
    }
    return null;
  }
  const results = React.useMemo(() => {
    const empty = {
      articles: [],
      syms: [],
      supps: [],
      gloss: [],
      pages: []
    };
    if (term.length < 2) return empty;
    const all = window.ELLA_ARTICLES && window.ELLA_ARTICLES[lang] || [];
    const articles = all.map(a => {
      const inTitle = fold(a.title).includes(term);
      const pool = [a.lede, ...(a.takeaways || []), ...(a.body || []).map(blockText), ...(a.doctorQuestions || [])];
      const hit = firstHit([a.title, ...pool]);
      if (!inTitle && !hit && !fold(a.category).includes(term)) return null;
      const via = !inTitle && hit && hit.via ? hit.via : null;
      const w = hit ? hit.word : term;
      const count = pool.concat(a.title).reduce((n, t) => n + (fold(t).split(w).length - 1), 0);
      const snip = hit && hit.text !== a.title ? excerpt(hit.text, 130, hit.word) : a.lede;
      return {
        a,
        rank: inTitle ? 0 : via ? 2 : 1,
        count,
        snip,
        via
      };
    }).filter(Boolean).sort((x, y) => x.rank - y.rank || y.count - x.count).slice(0, 6);
    const suppList = typeof window.getSupplementItems === 'function' ? window.getSupplementItems(isEs) : [];
    const supps = suppList.map(s => {
      const pool = [s.name, s.tag, s.desc, s.food, s.form, s.caution, s.dose, ...(s.why || [])];
      const hit = firstHit(pool);
      return hit ? {
        s,
        via: hit.via,
        snip: hit.text === s.name ? s.desc : excerpt(hit.text, 130, hit.word)
      } : null;
    }).filter(Boolean).sort((x, y) => (x.via ? 1 : 0) - (y.via ? 1 : 0)).slice(0, 4);
    const symList = typeof window.getSymptoms === 'function' ? window.getSymptoms(lang) : [];
    const syms = symList.map(x => {
      const pool = [x.name, x.short, x.why, ...(x.habits || []), ...(x.natural || []), ...(x.treatment || []), ...(x.doctor || [])];
      const hit = firstHit(pool);
      return hit ? {
        x,
        via: hit.via,
        snip: hit.text === x.name ? x.short : excerpt(hit.text, 130, hit.word)
      } : null;
    }).filter(Boolean).sort((x, y) => (x.via ? 1 : 0) - (y.via ? 1 : 0)).slice(0, 4);
    const glossList = window.ELLA_GLOSSARY || [];
    const gloss = glossList.filter(r => fold(r[1] + ' ' + r[2] + ' ' + (isEs ? r[3] : r[4])).includes(term)).slice(0, 4);
    const pages = PAGES.filter(p => fold(p.label + ' ' + p.blurb).includes(term)).slice(0, 3);
    return {
      articles,
      syms,
      supps,
      gloss,
      pages
    };
  }, [q, lang, related]);
  const hasQuery = term.length >= 2;
  const relLabel = via => via ? isEs ? 'Relacionado · habla de «' + via + '»' : 'Related · mentions “' + via + '”' : null;
  const total = results.articles.length + results.syms.length + results.supps.length + results.gloss.length + results.pages.length;
  function goSupplement() {
    closeSearch();
    setRoute('supplements');
    window.scrollTo({
      top: 0
    });
  }
  function goGlossary() {
    window.__ellaGlossaryQuery = q.trim();
    closeSearch();
    setRoute('glossary');
    window.scrollTo({
      top: 0
    });
  }
  function closeSearch() {
    setSearchOpen(false);
    setQ('');
    setScope('all');
  }
  React.useEffect(() => {
    if (!searchOpen) return;
    const el = inputRef.current;
    if (el) el.focus();
    function onKey(e) {
      if (e.key === 'Escape') closeSearch();
    }
    function onDown(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) closeSearch();
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [searchOpen]);
  function goArticle(id) {
    closeSearch();
    if (openArticle) openArticle(id);
  }
  function goPage(r) {
    closeSearch();
    setRoute(r);
    window.scrollTo({
      top: 0
    });
  }
  React.useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 4);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  // Top-bar sections. Only routes with real content ship here, so no nav
  // item can land on an empty page. Nutrition and Mental Health return
  // once Jessica has articles in those categories.
  const items = [{
    id: 'home',
    label: isEs ? 'Inicio' : 'Home',
    route: 'home'
  }, {
    id: 'symptoms',
    label: isEs ? 'Síntomas' : 'Symptoms',
    route: 'symptoms'
  }, {
    id: 'articles',
    label: isEs ? 'Artículos' : 'Articles',
    route: 'articles'
  }, {
    id: 'supplements',
    label: t('nav_supplements'),
    route: 'supplements'
  }, {
    id: 'resources',
    label: isEs ? 'Recursos' : 'Resources',
    route: 'resources'
  }, {
    id: 'about',
    label: isEs ? 'Sobre' : 'About',
    route: 'about'
  }];
  function handleNav(it) {
    if (it.route === 'symptoms' && openSymptom) {
      openSymptom(null);
      return;
    }
    if (it.category) goToCategory(it.route, it.category);else setRoute(it.route);
  }
  return /*#__PURE__*/React.createElement("header", {
    className: 'ella-header' + (scrolled ? ' is-scrolled' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: 'ella-header-inner' + (searchOpen ? ' is-searching' : '')
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "ella-logo",
    onClick: e => {
      e.preventDefault();
      setRoute('home');
    },
    "aria-label": "Ella home"
  }, /*#__PURE__*/React.createElement(LogoMarkSvg, {
    size: 32
  }), /*#__PURE__*/React.createElement("span", {
    className: "ella-logo-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-logo-word"
  }, "Ella"), /*#__PURE__*/React.createElement("span", {
    className: "ella-logo-by"
  }, "Jessica Zavala"))), /*#__PURE__*/React.createElement("nav", {
    className: "ella-nav",
    "aria-label": "Primary"
  }, items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it.id,
    href: "#",
    className: 'ella-navlink' + (route === it.route && !it.category ? ' is-active' : ''),
    onClick: e => {
      e.preventDefault();
      handleNav(it);
    }
  }, it.label))), /*#__PURE__*/React.createElement("div", {
    className: "ella-header-end"
  }, /*#__PURE__*/React.createElement("div", {
    className: 'ella-search' + (searchOpen ? ' is-open' : ''),
    ref: searchRef
  }, /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    type: "search",
    className: "ella-search-input",
    value: q,
    onChange: e => setQ(e.target.value),
    onKeyDown: e => {
      if (e.key !== 'Enter') return;
      const first = dropRef.current && dropRef.current.querySelector('.ella-search-hit');
      if (first) {
        e.preventDefault();
        first.click();
      }
    },
    placeholder: isEs ? 'Busca síntomas, artículos, suplementos…' : 'Search symptoms, articles, supplements…',
    "aria-label": isEs ? 'Buscar' : 'Search',
    tabIndex: searchOpen ? 0 : -1
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-iconbtn",
    "aria-label": isEs ? 'Buscar' : 'Search',
    "aria-expanded": searchOpen,
    onClick: () => {
      if (searchOpen) closeSearch();else setSearchOpen(true);
    }
  }, /*#__PURE__*/React.createElement(IconSearch, {
    width: "20",
    height: "20"
  })), searchOpen && /*#__PURE__*/React.createElement("div", {
    className: "ella-search-drop",
    ref: dropRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-search-tabs",
    role: "tablist"
  }, SCOPES.map(sc => /*#__PURE__*/React.createElement("button", {
    key: sc.id,
    type: "button",
    role: "tab",
    "aria-selected": scope === sc.id,
    className: 'ella-search-tab' + (scope === sc.id ? ' is-active' : ''),
    onMouseDown: e => e.preventDefault(),
    onClick: () => setScope(sc.id)
  }, sc.label))), !hasQuery && /*#__PURE__*/React.createElement("div", {
    className: "ella-search-start"
  }, /*#__PURE__*/React.createElement("p", null, isEs ? 'Empieza a escribir para buscar.' : 'Start typing to search.'), /*#__PURE__*/React.createElement("div", {
    className: "ella-search-suggest"
  }, SUGGEST.map(w => /*#__PURE__*/React.createElement("button", {
    key: w,
    type: "button",
    onMouseDown: e => e.preventDefault(),
    onClick: () => {
      setQ(w);
      if (inputRef.current) inputRef.current.focus();
    }
  }, w)))), hasQuery && (scope === 'all' ? total : (results[scope] || []).length) === 0 && /*#__PURE__*/React.createElement("p", {
    className: "ella-search-empty"
  }, isEs ? 'Todavía no hay nada sobre «' : 'Nothing yet for “', q.trim(), isEs ? '».' : '.”'), hasQuery && related.length > 0 && /*#__PURE__*/React.createElement("p", {
    className: "ella-search-related"
  }, isEs ? 'También buscamos temas relacionados: ' : 'Also showing related topics: ', related.slice(0, 5).join(', ')), hasQuery && show('articles') && results.articles.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "ella-search-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-search-group-lbl"
  }, isEs ? 'ARTÍCULOS' : 'ARTICLES'), results.articles.map(({
    a,
    snip,
    count,
    via
  }) => /*#__PURE__*/React.createElement("button", {
    key: a.id,
    type: "button",
    className: "ella-search-hit",
    onClick: () => goArticle(a.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-search-hit-title"
  }, hl(a.title)), snip ? /*#__PURE__*/React.createElement("span", {
    className: "ella-search-hit-snip"
  }, hl(snip)) : null, /*#__PURE__*/React.createElement("span", {
    className: "ella-search-hit-meta"
  }, a.category, " \xB7 ", a.readTime, !via && count > 1 ? isEs ? ' · aparece ' + count + ' veces' : ' · ' + count + ' mentions' : ''), via ? /*#__PURE__*/React.createElement("span", {
    className: "ella-search-hit-rel"
  }, relLabel(via)) : null))), hasQuery && show('syms') && results.syms.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "ella-search-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-search-group-lbl"
  }, isEs ? 'SÍNTOMAS' : 'SYMPTOMS'), results.syms.map(({
    x,
    snip,
    via
  }) => /*#__PURE__*/React.createElement("button", {
    key: x.id,
    type: "button",
    className: "ella-search-hit",
    onClick: () => {
      closeSearch();
      if (openSymptom) openSymptom(x.id);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-search-hit-title"
  }, hl(x.name)), snip ? /*#__PURE__*/React.createElement("span", {
    className: "ella-search-hit-snip"
  }, hl(snip)) : null, via ? /*#__PURE__*/React.createElement("span", {
    className: "ella-search-hit-rel"
  }, relLabel(via)) : null))), hasQuery && show('supps') && results.supps.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "ella-search-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-search-group-lbl"
  }, isEs ? 'SUPLEMENTOS' : 'SUPPLEMENTS'), results.supps.map(({
    s,
    snip,
    via
  }) => /*#__PURE__*/React.createElement("button", {
    key: s.name,
    type: "button",
    className: "ella-search-hit",
    onClick: goSupplement
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-search-hit-title"
  }, hl(s.name)), snip ? /*#__PURE__*/React.createElement("span", {
    className: "ella-search-hit-snip"
  }, hl(snip)) : null, via ? /*#__PURE__*/React.createElement("span", {
    className: "ella-search-hit-rel"
  }, relLabel(via)) : null))), hasQuery && show('gloss') && results.gloss.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "ella-search-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-search-group-lbl"
  }, isEs ? 'GLOSARIO' : 'GLOSSARY'), results.gloss.map(r => /*#__PURE__*/React.createElement("button", {
    key: r[1],
    type: "button",
    className: "ella-search-hit",
    onClick: goGlossary
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-search-hit-title"
  }, hl(r[1]), " ", /*#__PURE__*/React.createElement("span", {
    className: "ella-search-hit-en"
  }, "\xB7 ", hl(r[2]))), /*#__PURE__*/React.createElement("span", {
    className: "ella-search-hit-snip"
  }, hl(isEs ? r[3] : r[4]))))), hasQuery && scope === 'all' && results.pages.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "ella-search-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-search-group-lbl"
  }, isEs ? 'PÁGINAS' : 'PAGES'), results.pages.map(p => /*#__PURE__*/React.createElement("button", {
    key: p.route,
    type: "button",
    className: "ella-search-hit",
    onClick: () => goPage(p.route)
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-search-hit-title"
  }, hl(p.label)), /*#__PURE__*/React.createElement("span", {
    className: "ella-search-hit-meta"
  }, hl(p.blurb))))), /*#__PURE__*/React.createElement("div", {
    className: "ella-search-foot"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("kbd", null, "\u21B5"), " ", isEs ? 'abrir' : 'open'), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("kbd", null, "Esc"), " ", isEs ? 'cerrar' : 'close')))), /*#__PURE__*/React.createElement("a", {
    href: window.ELLA_LINKS && window.ELLA_LINKS.booking || '#',
    target: "_blank",
    rel: "noopener noreferrer",
    className: "ella-btn ella-btn-primary ella-header-book"
  }, isEs ? 'Haz una cita' : 'Book a call'), /*#__PURE__*/React.createElement(LangToggle, {
    lang: lang,
    setLang: setLang
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-iconbtn ella-menu-btn",
    "aria-label": isEs ? 'Menú' : 'Menu',
    "aria-expanded": menuOpen,
    onClick: () => {
      setSearchOpen(false);
      setMenuOpen(v => !v);
    }
  }, menuOpen ? /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6L6 18"
  })) : /*#__PURE__*/React.createElement(IconMenu, {
    width: "22",
    height: "22"
  })))), menuOpen && (() => {
    const cats = [...new Set((window.ELLA_ARTICLES && window.ELLA_ARTICLES[lang] || []).map(a => a.category))];
    const syms = typeof window.getSymptoms === 'function' ? window.getSymptoms(lang) : [];
    const go = fn => e => {
      e.preventDefault();
      setMenuOpen(false);
      fn();
      window.scrollTo({
        top: 0
      });
    };
    const subs = {
      symptoms: syms.map(x => ({
        key: x.id,
        label: x.name,
        fn: () => openSymptom && openSymptom(x.id)
      })),
      articles: cats.map(ct => ({
        key: ct,
        label: ct,
        fn: () => goToCategory('articles', ct)
      }))
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "ella-mobile-menu",
      role: "dialog",
      "aria-label": isEs ? 'Menú' : 'Menu'
    }, /*#__PURE__*/React.createElement("nav", null, items.map(it => /*#__PURE__*/React.createElement("div", {
      key: it.id,
      className: "ella-mm-group"
    }, /*#__PURE__*/React.createElement("a", {
      href: "#",
      className: 'ella-mm-top' + (route === it.route ? ' is-active' : ''),
      onClick: go(() => handleNav(it))
    }, it.label), subs[it.id] && subs[it.id].length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "ella-mm-subs"
    }, subs[it.id].map(sb => /*#__PURE__*/React.createElement("a", {
      key: sb.key,
      href: "#",
      onClick: go(sb.fn)
    }, sb.label)))))), /*#__PURE__*/React.createElement("a", {
      className: "ella-btn ella-btn-primary ella-mobile-menu-book",
      href: window.ELLA_LINKS && window.ELLA_LINKS.booking || '#',
      target: "_blank",
      rel: "noopener noreferrer"
    }, isEs ? 'Haz una cita' : 'Book a call'));
  })());
}
window.Header = Header;
window.LangToggle = LangToggle;
Object.assign(__ds_scope, { Header });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/components/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/components/Icons.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Lucide-style icons used across the kit. 1.5px stroke, rounded caps.
// Inline JSX so they're tweakable from a component file rather than fetched.

const SVG_BASE = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};
const IconHeart = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
}));
const IconLeaf = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M2 21c0-3 1.85-5.36 5.08-6"
}));
const IconDumbbell = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "M14.4 14.4 9.6 9.6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z"
}), /*#__PURE__*/React.createElement("path", {
  d: "m21.5 21.5-1.4-1.4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3.9 3.9 2.5 2.5"
}), /*#__PURE__*/React.createElement("path", {
  d: "M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z"
}));
const IconBrain = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"
}));
const IconSun = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 2v2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 20v2"
}), /*#__PURE__*/React.createElement("path", {
  d: "m4.93 4.93 1.41 1.41"
}), /*#__PURE__*/React.createElement("path", {
  d: "m17.66 17.66 1.41 1.41"
}), /*#__PURE__*/React.createElement("path", {
  d: "M2 12h2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M20 12h2"
}), /*#__PURE__*/React.createElement("path", {
  d: "m6.34 17.66-1.41 1.41"
}), /*#__PURE__*/React.createElement("path", {
  d: "m19.07 4.93-1.41 1.41"
}));
const IconMoon = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
}));
const IconDroplet = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7Z"
}));
const IconApple = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "M12 8c-1.6-1.4-3.2-2-4.7-1.6C5 7 3.6 9.3 3.6 12.2c0 3.6 2.4 8.3 4.9 8.3 1 0 1.7-.4 2.4-.7.6-.3 1-.5 1.6-.5s1 .2 1.6.5c.7.3 1.4.7 2.4.7 2.5 0 4.9-4.7 4.9-8.3 0-2.9-1.4-5.2-3.7-5.8C16.2 6 14.6 6.6 13 8"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 8V5.5A2.5 2.5 0 0 1 14.5 3"
}));
const IconSparkle = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
}));
const IconCheck = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "10"
}), /*#__PURE__*/React.createElement("path", {
  d: "m9 12 2 2 4-4"
}));
const IconArrow = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "M5 12h14"
}), /*#__PURE__*/React.createElement("path", {
  d: "m12 5 7 7-7 7"
}));
const IconChevron = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "m9 18 6-6-6-6"
}));
const IconDown = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "m6 9 6 6 6-6"
}));
const IconMenu = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("line", {
  x1: "4",
  x2: "20",
  y1: "6",
  y2: "6"
}), /*#__PURE__*/React.createElement("line", {
  x1: "4",
  x2: "20",
  y1: "12",
  y2: "12"
}), /*#__PURE__*/React.createElement("line", {
  x1: "4",
  x2: "20",
  y1: "18",
  y2: "18"
}));
const IconSearch = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("circle", {
  cx: "11",
  cy: "11",
  r: "8"
}), /*#__PURE__*/React.createElement("path", {
  d: "m21 21-4.3-4.3"
}));
const IconDownload = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "7 10 12 15 17 10"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  x2: "12",
  y1: "15",
  y2: "3"
}));
const IconUsers = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "9",
  cy: "7",
  r: "4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M22 21v-2a4 4 0 0 0-3-3.87"
}), /*#__PURE__*/React.createElement("path", {
  d: "M16 3.13a4 4 0 0 1 0 7.75"
}));
const IconBookmark = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"
}));
const IconMail = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("rect", {
  width: "20",
  height: "16",
  x: "2",
  y: "4",
  rx: "2"
}), /*#__PURE__*/React.createElement("path", {
  d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
}));
const IconQuote = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
}));
const IconCalendar = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "M8 2v4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M16 2v4"
}), /*#__PURE__*/React.createElement("rect", {
  width: "18",
  height: "18",
  x: "3",
  y: "4",
  rx: "2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3 10h18"
}));
const IconWhatsApp = p => /*#__PURE__*/React.createElement("svg", _extends({}, p, {
  width: p.width || 24,
  height: p.height || 24,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.42 5.82c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.24-8.24zm4.52 10.43c-.06-.1-.22-.16-.46-.28-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.39-.4-.54-.41l-.46-.01c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.57.18 1.1.16 1.51.1.46-.07 1.43-.58 1.63-1.15.2-.56.2-1.05.14-1.15z"
}));
Object.assign(window, {
  IconApple,
  IconHeart,
  IconLeaf,
  IconDumbbell,
  IconBrain,
  IconSun,
  IconMoon,
  IconDroplet,
  IconSparkle,
  IconCheck,
  IconArrow,
  IconChevron,
  IconDown,
  IconMenu,
  IconSearch,
  IconDownload,
  IconUsers,
  IconBookmark,
  IconMail,
  IconQuote,
  IconCalendar,
  IconWhatsApp
});

// Single lookup-by-name entry point, for design-system export purposes.
const ICON_MAP = {
  heart: IconHeart,
  leaf: IconLeaf,
  apple: IconApple,
  dumbbell: IconDumbbell,
  brain: IconBrain,
  sun: IconSun,
  moon: IconMoon,
  droplet: IconDroplet,
  sparkle: IconSparkle,
  check: IconCheck,
  arrow: IconArrow,
  chevron: IconChevron,
  down: IconDown,
  menu: IconMenu,
  search: IconSearch,
  download: IconDownload,
  users: IconUsers,
  bookmark: IconBookmark,
  mail: IconMail,
  quote: IconQuote,
  calendar: IconCalendar,
  whatsapp: IconWhatsApp
};
function Icons({
  name = 'heart',
  ...rest
}) {
  const Cmp = ICON_MAP[name] || IconHeart;
  return /*#__PURE__*/React.createElement(Cmp, rest);
}
window.Icons = Icons;
Object.assign(__ds_scope, { Icons });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/components/Icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/components/Photo.jsx
try { (() => {
// Photo, renders a real photograph when given `src`, otherwise a warm,
// textured placeholder rectangle (a gradient with a loose figure suggestion
// and an optional caption). Production photography is women 45-70 in natural light.

function Photo({
  aspect = '4/3',
  caption,
  tint = 'rose',
  radius = '16px',
  className = '',
  style = {},
  src,
  alt,
  objectPosition = 'center'
}) {
  const tints = {
    rose: {
      from: '#e9dae1',
      to: '#efe7da',
      figure: '#7e5266'
    },
    cream: {
      from: '#efe7da',
      to: '#e4d9c7',
      figure: '#8b7c64'
    },
    sage: {
      from: '#e2e6d9',
      to: '#efe7da',
      figure: '#6f7e5d'
    },
    plum: {
      from: '#e8dde2',
      to: '#efe7da',
      figure: '#7e5266'
    }
  };
  const c = tints[tint] || tints.rose;
  return /*#__PURE__*/React.createElement("div", {
    "aria-label": alt || caption || 'Photograph',
    className: className,
    style: {
      aspectRatio: aspect,
      width: '100%',
      background: c.from,
      borderRadius: radius,
      position: 'relative',
      overflow: 'hidden',
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt || '',
    loading: "lazy",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition,
      display: 'block'
    }
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 400 300",
    preserveAspectRatio: "xMidYMid slice",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: `g-${tint}`,
    cx: "62%",
    cy: "50%",
    r: "55%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: c.figure,
    stopOpacity: "0.35"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "60%",
    stopColor: c.figure,
    stopOpacity: "0.06"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: c.figure,
    stopOpacity: "0"
  }))), /*#__PURE__*/React.createElement("rect", {
    width: "400",
    height: "300",
    fill: `url(#g-${tint})`
  }), /*#__PURE__*/React.createElement("g", {
    opacity: "0.22",
    fill: c.figure
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: "260",
    cy: "130",
    rx: "42",
    ry: "48"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 200 300 Q 210 200 260 195 Q 320 200 330 300 Z"
  }))), caption ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 10,
      left: 12,
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      fontWeight: 600,
      color: '#fff',
      background: 'rgba(47,38,29,0.55)',
      padding: '4px 10px',
      borderRadius: 999,
      letterSpacing: '0.04em'
    }
  }, caption) : null));
}
window.Photo = Photo;
Object.assign(__ds_scope, { Photo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/components/Photo.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/components/SvgAssets.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Inline SVG assets, used instead of <img src="..."> so the bundle is
// fully self-contained when shared as a single HTML file.

function LogoEllaSvg({
  width = 160,
  color = '#2f261d',
  accent = '#7e5266',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 320 96",
    width: width,
    height: width * (96 / 320)
  }, rest), /*#__PURE__*/React.createElement("g", {
    transform: "translate(8, 22)",
    fill: "none",
    stroke: accent,
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M28 50 Q28 28 28 8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M28 38 Q18 34 12 24"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M28 32 Q38 28 44 18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M28 24 Q22 20 18 12"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M28 18 Q34 14 38 6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "28",
    cy: "6",
    r: "2",
    fill: accent
  })), /*#__PURE__*/React.createElement("text", {
    x: "68",
    y: "68",
    style: {
      fontFamily: "'DM Serif Display', 'Cormorant Garamond', Georgia, serif",
      fontSize: 64,
      fill: color
    }
  }, "Ella"));
}
function LogoMarkSvg({
  size = 32,
  color = '#7e5266',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 64 64",
    width: size,
    height: size
  }, rest), /*#__PURE__*/React.createElement("g", {
    transform: "translate(18, 6)",
    fill: "none",
    stroke: color,
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14 52 Q14 30 14 6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 40 Q4 36 -2 26"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 34 Q24 30 30 20"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 26 Q8 22 4 14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 20 Q20 16 24 8"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "14",
    cy: "6",
    r: "2",
    fill: color
  })));
}
function IllustrationSprig({
  width = 120,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 120 80",
    width: width
  }, rest), /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M60 76 Q60 40 60 8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60 58 Q42 54 32 40"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60 50 Q78 46 88 32"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60 40 Q48 36 40 26"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60 30 Q72 26 80 16"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60 22 Q52 18 48 10"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "60",
    cy: "8",
    r: "2.4",
    fill: "currentColor"
  })));
}
function IllustrationBranch({
  width = 160,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 160 120",
    width: width
  }, rest), /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 100 C40 80 60 60 80 60 C100 60 120 60 140 40"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M50 78 Q56 70 54 60"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M70 66 Q76 56 74 46"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M90 60 Q96 50 100 40"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M110 54 Q118 50 124 42"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "40",
    cy: "92",
    rx: "10",
    ry: "4",
    transform: "rotate(-30 40 92)"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "60",
    cy: "74",
    rx: "9",
    ry: "3.5",
    transform: "rotate(-30 60 74)"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "80",
    cy: "64",
    rx: "9",
    ry: "3.5",
    transform: "rotate(-20 80 64)"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "105",
    cy: "56",
    rx: "8",
    ry: "3",
    transform: "rotate(-15 105 56)"
  })));
}
Object.assign(window, {
  LogoEllaSvg,
  LogoMarkSvg,
  IllustrationSprig,
  IllustrationBranch
});

// Single lookup-by-name entry point, for design-system export purposes.
const SVG_MAP = {
  logo: LogoEllaSvg,
  mark: LogoMarkSvg,
  sprig: IllustrationSprig,
  branch: IllustrationBranch
};
function SvgAssets({
  name = 'logo',
  ...rest
}) {
  const Cmp = SVG_MAP[name] || LogoEllaSvg;
  return /*#__PURE__*/React.createElement(Cmp, rest);
}
window.SvgAssets = SvgAssets;
Object.assign(__ds_scope, { SvgAssets });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/components/SvgAssets.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/components/i18n.jsx
try { (() => {
// Simple EN/ES dictionary used throughout the kit.
// Real translations would be commissioned alongside English, not auto-translated.

const T_DICT = {
  en: {
    nav_learn: 'Learn',
    nav_supplements: 'Supplements',
    nav_doctor: 'Ask your doctor',
    nav_quiz: 'Where am I?',
    nav_about: 'About Jessica',
    nav_hormones: 'Hormonal therapy',
    cta_start: 'Start exploring',
    cta_watch: "Watch Jessica's intro",
    eyebrow_intro: 'A NOTE FROM JESSICA',
    hero_title: 'You\u2019re not imagining it.',
    awareness_eyebrow: 'WHERE AM I?',
    awareness_title: 'A short, gentle check-in.',
    awareness_sub: 'Five quick questions. No score, no judgment, just a clearer picture of what stage your body is in and what to read next.',
    awareness_start: 'Begin the check-in',
    pillars_eyebrow: 'WHAT WE COVER',
    pillars_title: 'Everything in one trusted place.',
    pillar_nutrition: 'Nutrition',
    pillar_nutrition_desc: 'Foods to include, protein needs during menopause, healthier swaps. No meal plans, just real information.',
    pillar_supplements: 'Supplements',
    pillar_supplements_desc: 'Creatine, omega-3, vitamin D3 and K2, magnesium L-threonate, turmeric, fiber, probiotics. What\u2019s worth taking, and why.',
    pillar_exercise: 'Exercise',
    pillar_exercise_desc: 'Strength training, walking, yoga. Light weights count. Less cardio, more muscle.',
    pillar_mental: 'Mental health',
    pillar_mental_desc: 'Support groups, meetups, resource links. You\u2019re not alone, and the data backs that up.',
    pillar_skin: 'Skin care',
    pillar_skin_desc: 'What hormonal changes do to your skin, and what actually helps.',
    pillar_hormones: 'Hormonal therapy',
    pillar_hormones_desc: 'HRT options explained in plain English. No endorsements, just clarity.',
    doctor_eyebrow: 'PRINTABLE',
    doctor_title: 'Questions to bring to your next OB-GYN visit.',
    doctor_sub: 'Most doctors don\u2019t focus on menopause. This printable list helps you walk in prepared, covering perimenopause, HRT options, and how to find a menopause specialist.',
    doctor_cta: 'Download the list (PDF)',
    newsletter_title: 'Get the weekly note.',
    newsletter_sub: 'Short, useful, no spam.',
    newsletter_placeholder: 'you@example.com',
    newsletter_cta: 'Subscribe',
    footer_tagline: 'For women going through every stage of menopause.',
    footer_about: 'About Jessica',
    footer_credentials: 'Credentials',
    footer_contact: 'Contact',
    footer_privacy: 'Privacy',
    quiz_q1: 'What do you know about perimenopause vs. menopause?',
    quiz_q1_a1: 'I know the difference well',
    quiz_q1_a2: 'I\u2019ve heard the terms but I\u2019m unsure',
    quiz_q1_a3: 'Honestly, not much',
    quiz_q2: 'Are you experiencing any of these symptoms?',
    quiz_q2_a1: 'Hot flashes or night sweats',
    quiz_q2_a2: 'Sleep changes or insomnia',
    quiz_q2_a3: 'Mood shifts, anxiety, or low mood',
    quiz_q2_a4: 'Brain fog or memory lapses',
    quiz_q2_a5: 'Irregular or heavy periods',
    quiz_q2_a6: 'None of the above',
    quiz_q3: 'Does thinking about these symptoms cause you stress or embarrassment?',
    quiz_q3_a1: 'Yes, a lot',
    quiz_q3_a2: 'Sometimes',
    quiz_q3_a3: 'Not really',
    quiz_back: 'Back',
    quiz_next: 'Next',
    quiz_finish: 'See what to read next',
    quiz_progress: 'Question {n} of {total}',
    article_back: 'All articles',
    article_save: 'Save',
    article_share: 'Share',
    article_reading: '8 min read'
  },
  es: {
    nav_about: 'Sobre Jessica',
    nav_learn: 'Aprende',
    nav_supplements: 'Suplementos',
    nav_doctor: 'Pregunta a tu m\u00e9dico',
    nav_quiz: '\u00bfD\u00f3nde estoy?',
    nav_hormones: 'Terapia hormonal',
    cta_start: 'Empieza a explorar',
    cta_watch: 'Mira la introducci\u00f3n de Jessica',
    eyebrow_intro: 'UN MENSAJE DE JESSICA',
    hero_title: 'No te lo estás imaginando.',
    awareness_eyebrow: '\u00bfD\u00d3NDE ESTOY?',
    awareness_title: 'Un cuestionario corto, sin presión.',
    awareness_sub: 'Cinco preguntas rápidas. Sin calificación y sin juicios, solo una idea más clara de en qué etapa estás y qué leer después.',
    awareness_start: 'Comenzar',
    pillars_eyebrow: 'LO QUE CUBRIMOS',
    pillars_title: 'Todo en un solo lugar.',
    pillar_nutrition: 'Nutrici\u00f3n',
    pillar_nutrition_desc: 'Qué alimentos incluir, cuánta proteína necesitas en la menopausia y qué cambios valen la pena. Sin dietas, solo información.',
    pillar_supplements: 'Suplementos',
    pillar_supplements_desc: 'Creatina, omega-3, vitamina D3 y K2, magnesio L-treonato, cúrcuma, fibra y probióticos. Cuáles vale la pena tomar y por qué.',
    pillar_exercise: 'Ejercicio',
    pillar_exercise_desc: 'Pesas, caminar, yoga. Las pesas ligeras también cuentan. Menos cardio y más músculo.',
    pillar_mental: 'Salud mental',
    pillar_mental_desc: 'Grupos de apoyo y recursos. No estás sola.',
    pillar_skin: 'Cuidado de la piel',
    pillar_skin_desc: 'Cómo cambian las hormonas tu piel y qué sí ayuda.',
    pillar_hormones: 'Terapia hormonal',
    pillar_hormones_desc: 'Las opciones de terapia hormonal, explicadas con claridad.',
    doctor_eyebrow: 'IMPRIMIBLE',
    doctor_title: 'Preguntas para tu próxima cita con el ginecólogo.',
    doctor_sub: 'La mayor\u00eda de los m\u00e9dicos no se enfocan en la menopausia. Esta lista imprimible te ayuda a llegar preparada, cubre la perimenopausia, opciones de TRH, y c\u00f3mo encontrar un especialista en menopausia.',
    doctor_cta: 'Descargar la lista (PDF)',
    newsletter_title: 'Recibe mi nota semanal.',
    newsletter_sub: 'Útil, breve y sin spam.',
    newsletter_placeholder: 'tu@ejemplo.com',
    newsletter_cta: 'Suscribirme',
    footer_tagline: 'Mujeres que acompañan a otras mujeres en cada etapa.',
    footer_about: 'Sobre Jessica',
    footer_credentials: 'Credenciales',
    footer_contact: 'Contacto',
    footer_privacy: 'Privacidad',
    quiz_q1: '¿Sabes la diferencia entre perimenopausia y menopausia?',
    quiz_q1_a1: 'Sí, la conozco bien',
    quiz_q1_a2: 'He oído los términos, pero no estoy segura',
    quiz_q1_a3: 'La verdad, no mucho',
    quiz_q2: '¿Tienes alguno de estos síntomas?',
    quiz_q2_a1: 'Bochornos o sudores nocturnos',
    quiz_q2_a2: 'Duermes mal o tienes insomnio',
    quiz_q2_a3: 'Cambios de humor, ansiedad o tristeza',
    quiz_q2_a4: 'Mente nublada u olvidos',
    quiz_q2_a5: 'Reglas irregulares o muy abundantes',
    quiz_q2_a6: 'Ninguno',
    quiz_q3: '¿Te estresa o te da pena hablar de estos síntomas?',
    quiz_q3_a1: 'S\u00ed, mucho',
    quiz_q3_a2: 'A veces',
    quiz_q3_a3: 'En realidad no',
    quiz_back: 'Atr\u00e1s',
    quiz_next: 'Siguiente',
    quiz_finish: 'Ver qué leer',
    quiz_progress: 'Pregunta {n} de {total}',
    article_back: 'Todos los art\u00edculos',
    article_save: 'Guardar',
    article_share: 'Compartir',
    article_reading: '8 min de lectura'
  }
};
function useT(lang) {
  return React.useCallback((key, vars) => {
    let s = T_DICT[lang] && T_DICT[lang][key] || T_DICT.en[key] || key;
    if (vars) for (const k in vars) s = s.replace('{' + k + '}', vars[k]);
    return s;
  }, [lang]);
}
window.useT = useT;
window.T_DICT = T_DICT;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/components/i18n.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens/AboutJessica.jsx
try { (() => {
// About Jessica, rebuilt on an editorial model: hook → hero portrait →
// large pull quote → alternating photo/text bands → what I believe →
// closing CTA. Scroll-staggered reveals; her words, restructured.

function AboutJessica({
  lang,
  setRoute
}) {
  const t = useT(lang);
  const isEs = lang === 'es';
  const beliefs = isEs ? [{
    t: 'Todo con fuentes',
    d: 'Cada artículo dice de dónde sale la información. Si no lo puedo respaldar, no lo escribo.'
  }, {
    t: 'En los dos idiomas',
    d: 'Nada de esto debería estar solo en inglés. Todo Ella está en español y en inglés.'
  }, {
    t: 'Tu médico decide',
    d: 'Ella te ayuda a llegar preparada a la cita. No sustituye a tu médico.'
  }] : [{
    t: 'Everything cited',
    d: 'Every article shows where it came from. If I can\u2019t back it up, I don\u2019t write it.'
  }, {
    t: 'In both languages',
    d: 'None of this should exist only in English. Every page of Ella is in Spanish and English.'
  }, {
    t: 'Your doctor decides',
    d: 'Ella gets you ready for that appointment. It doesn\u2019t replace it.'
  }];
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "07 About Jessica"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight ella-about-v2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-abt-hero ella-stagger"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-abt-hero-text"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow"
  }, isEs ? 'CONOCE A LA FUNDADORA' : 'MEET THE FOUNDER'), /*#__PURE__*/React.createElement("h1", {
    className: "ella-abt-h1"
  }, isEs ? 'Hola, soy Jessica.' : 'Hi, I\u2019m Jessica.'), /*#__PURE__*/React.createElement("p", {
    className: "ella-abt-lede"
  }, isEs ? 'Empecé la perimenopausia más tarde que la mayoría. Por eso no la tomé en serio hasta que me pegó de lleno, y cuando llegó, no se parecía en nada a lo que me habían dicho.' : 'I started perimenopause later than most women do. That\u2019s part of why I didn\u2019t take it seriously until it hit, and when it came, none of it looked like what I\u2019d been told to expect.'), /*#__PURE__*/React.createElement("p", {
    className: "ella-abt-body"
  }, isEs ? 'Casi todas las mujeres empiezan a finales de los cuarenta. Yo no, así que pasé años pensando que todavía me faltaba mucho. No le puse atención cuando debía.' : 'Most women start in their late forties. I didn\u2019t, so I spent years assuming it was still far off. I wasn\u2019t paying attention when I should have been.'), /*#__PURE__*/React.createElement("p", {
    className: "ella-abt-body"
  }, isEs ? 'Y quiero decir para quién es esto. Nací en Estados Unidos, en una familia de inmigrantes, y hablo los dos idiomas. Las mujeres que hablan español no tienen los mismos recursos a la mano, y merecen información completa, no versiones recortadas ni mal traducidas.' : 'And I want to say something about who this is for. I was born in the United States to an immigrant family, and I speak both languages. Spanish-speaking women don\u2019t have the same resources within reach, and they deserve real education, not simplified versions or half-finished translations.')), /*#__PURE__*/React.createElement("div", {
    className: "ella-abt-hero-photo"
  }, /*#__PURE__*/React.createElement(Photo, {
    aspect: "4/5",
    tint: "rose",
    src: "./img_9953-msmdchef-e47h.png",
    alt: isEs ? 'Retrato de Jessica' : 'Portrait of Jessica',
    radius: "20px"
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight ella-about-v2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-abt-band ella-stagger"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-abt-band-photo"
  }, /*#__PURE__*/React.createElement(Photo, {
    aspect: "1/1",
    tint: "sage",
    alt: "",
    radius: "18px"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ella-abt-band-text"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-abt-kicker"
  }, isEs ? '01 · LO QUE ME PASÓ' : '01 · WHAT HAPPENED'), /*#__PURE__*/React.createElement("h2", null, isEs ? 'Mis síntomas no venían en la lista.' : 'My symptoms weren\u2019t on the list.'), /*#__PURE__*/React.createElement("p", null, isEs ? 'No subí mucho de peso. Nada se parecía a lo que todo el mundo menciona: los bochornos, la libido, el peso.' : 'I didn\u2019t have the dramatic weight gain. Nothing matched the usual list everyone mentions, the hot flashes, the libido, the weight.'), /*#__PURE__*/React.createElement("p", null, isEs ? 'Ahí entendí algo importante: la menopausia no empieza igual para todas. Puede llegar desde los 40 o hasta pasados los 55. Y si nadie te lo dice, pasas años pensando que lo que sientes no tiene nombre.' : 'That\u2019s when it hit me: menopause doesn\u2019t start the same way for every woman. It can begin as early as 40, or as late as your mid-50s. And if nobody tells you that, you spend years thinking what you feel doesn\u2019t have a name.'))))), /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight ella-about-v2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-abt-band is-reversed ella-stagger"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-abt-band-photo"
  }, /*#__PURE__*/React.createElement(Photo, {
    aspect: "1/1",
    tint: "rose",
    alt: "",
    radius: "18px"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ella-abt-band-text"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-abt-kicker"
  }, isEs ? '02 · POR QUÉ ELLA' : '02 · WHY ELLA'), /*#__PURE__*/React.createElement("h2", null, isEs ? 'Hice la investigación que nadie me dio.' : 'I did the research nobody handed me.'), /*#__PURE__*/React.createElement("p", null, isEs ? 'Eso me motivó a acompañar a otras mujeres que se sienten tan perdidas como yo me sentí. Hoy me siento bien, y no quiero que la próxima tenga que empezar de cero.' : 'That experience pushed me to guide other women who feel as lost as I once did. I feel good now, and I don\u2019t want the next woman to start from zero.'), /*#__PURE__*/React.createElement("p", null, isEs ? 'Juntar toda esta información toma tiempo, y no todas lo tenemos. Es el doble de difícil cuando el idioma también es una barrera. Casi todo lo bueno sobre la menopausia está en inglés y escrito con palabras que nadie usa.' : 'Pulling all this research together takes time, and not everyone has it. That weighs double when language is in the way too. Nearly everything good on menopause is in English, written in a vocabulary that isn\u2019t anyone\u2019s.'), /*#__PURE__*/React.createElement("p", null, isEs ? 'Por eso Ella está en los dos idiomas, y por eso cada artículo termina con preguntas para tu médico. No para discutir con él, sino para que llegues sabiendo qué preguntar.' : 'That\u2019s why Ella exists in both languages, and why every article ends with questions you can take to your doctor. Not to argue with her, but so you walk in knowing what to ask.'))))), /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight ella-bg-cream ella-about-v2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-stagger"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      maxWidth: 560,
      margin: '0 auto 26px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow"
  }, isEs ? 'CÓMO TRABAJO' : 'HOW I WORK'), /*#__PURE__*/React.createElement("h2", {
    className: "ella-h2-italic ella-section-title",
    style: {
      marginTop: 8
    }
  }, isEs ? /*#__PURE__*/React.createElement(React.Fragment, null, "Tres reglas que ", /*#__PURE__*/React.createElement("em", null, "no rompo.")) : /*#__PURE__*/React.createElement(React.Fragment, null, "Three rules I ", /*#__PURE__*/React.createElement("em", null, "don\u2019t break.")))), /*#__PURE__*/React.createElement("div", {
    className: "ella-abt-beliefs"
  }, beliefs.map((b, i) => /*#__PURE__*/React.createElement("div", {
    key: b.t,
    className: "ella-abt-belief"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-abt-belief-num"
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, b.t), /*#__PURE__*/React.createElement("p", null, b.d)))))))), /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight ella-about-v2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-abt-cta ella-stagger"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, isEs ? '¿Por dónde empiezo?' : 'Where do you start?'), /*#__PURE__*/React.createElement("p", null, isEs ? 'Si no sabes qué leer primero, empieza por los artículos. Si prefieres platicarlo con alguien, haz una cita.' : 'If you don\u2019t know what to read first, start with the library. If you\u2019d rather talk it through, book a call.')), /*#__PURE__*/React.createElement("div", {
    className: "ella-abt-cta-actions"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-btn ella-btn-primary",
    onClick: () => {
      setRoute('articles');
      window.scrollTo({
        top: 0
      });
    }
  }, isEs ? 'Ver los artículos' : 'Browse the library', /*#__PURE__*/React.createElement(IconArrow, {
    width: "17",
    height: "17"
  })), /*#__PURE__*/React.createElement("a", {
    className: "ella-btn ella-btn-secondary",
    href: ELLA_LINKS.booking,
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement(IconCalendar, {
    width: "17",
    height: "17"
  }), isEs ? 'Hacer una cita' : 'Book 30 minutes')), /*#__PURE__*/React.createElement("p", {
    className: "ella-abt-cta-mail"
  }, isEs ? 'O escríbeme a ' : 'Or email me at ', /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@ellabienestar.com"
  }, "info@ellabienestar.com"))))));
}
window.AboutJessica = AboutJessica;
Object.assign(__ds_scope, { AboutJessica });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens/AboutJessica.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens/ArticleView.jsx
try { (() => {
// ArticleView, long-form article reader. Structure follows an editorial
// health-blog format: category → title → lede → author byline → meta →
// share → cover → key takeaways → numbered TOC → body → disclaimer →
// author card → references → keep reading.

function slugify(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}
function ArticleView({
  lang,
  setRoute,
  articleId,
  setArticleId
}) {
  const t = useT(lang);
  const isEs = lang === 'es';
  const article = getArticle(articleId || 'protein-after-45', lang);
  const [copied, setCopied] = React.useState(false);
  const [activeId, setActiveId] = React.useState(null);
  const toneColor = article.tone === 'sage' ? 'var(--ella-sage-700)' : article.tone === 'plum' ? 'var(--ella-plum-500)' : 'var(--ella-rose-deep)';

  // Table of contents from h2 blocks
  const sections = article.body.filter(b => b.kind === 'h2').map(b => ({
    text: b.text,
    id: slugify(b.text)
  }));
  React.useEffect(() => {
    const ids = article.body.filter(b => b.kind === 'h2').map(b => slugify(b.text));
    if (!ids.length) return;
    function onScroll() {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActiveId(current);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, [articleId, lang]);
  function jump(e, id) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 90,
      behavior: 'smooth'
    });
  }
  function copyLink() {
    const url = window.location.href;
    if (navigator.clipboard) navigator.clipboard.writeText(url).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "04 Article"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-article-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-article"
  }, /*#__PURE__*/React.createElement("a", {
    className: "ella-article-back",
    href: "#",
    onClick: e => {
      e.preventDefault();
      setRoute('articles');
    }
  }, /*#__PURE__*/React.createElement(IconChevron, {
    width: "16",
    height: "16",
    style: {
      transform: 'rotate(180deg)'
    }
  }), t('article_back')), /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow",
    style: {
      color: toneColor
    }
  }, article.category.toUpperCase()), /*#__PURE__*/React.createElement("h1", null, article.title), /*#__PURE__*/React.createElement("p", {
    className: "ella-article-lede"
  }, article.lede), /*#__PURE__*/React.createElement("a", {
    className: "ella-byline",
    href: "#",
    onClick: e => {
      e.preventDefault();
      setRoute('about');
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-byline-avatar",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "ella-byline-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-byline-name"
  }, isEs ? 'Por ' : 'By ', /*#__PURE__*/React.createElement("strong", null, "Jessica Zavala")))), /*#__PURE__*/React.createElement("div", {
    className: "ella-article-meta"
  }, /*#__PURE__*/React.createElement("span", null, article.published), article.updated && article.updated !== article.published ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", null, isEs ? 'Actualizado ' : 'Updated ', article.updated)) : null, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", null, article.readTime)), /*#__PURE__*/React.createElement("div", {
    className: "ella-share-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-share-lbl"
  }, isEs ? 'Compartir' : 'Share'), /*#__PURE__*/React.createElement("a", {
    className: "ella-share-btn",
    "aria-label": "WhatsApp",
    target: "_blank",
    rel: "noopener noreferrer",
    href: 'https://wa.me/?text=' + encodeURIComponent(article.title + ' ' + window.location.href)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.42 5.82c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.24-8.24z"
  }))), /*#__PURE__*/React.createElement("a", {
    className: "ella-share-btn",
    "aria-label": "Facebook",
    target: "_blank",
    rel: "noopener noreferrer",
    href: 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12z"
  }))), /*#__PURE__*/React.createElement("a", {
    className: "ella-share-btn",
    "aria-label": "Email",
    target: "_blank",
    rel: "noopener noreferrer",
    href: 'mailto:?subject=' + encodeURIComponent(article.title) + '&body=' + encodeURIComponent(window.location.href)
  }, /*#__PURE__*/React.createElement(IconMail, {
    width: "17",
    height: "17"
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-share-btn",
    onClick: copyLink,
    "aria-label": isEs ? 'Copiar enlace' : 'Copy link'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
  }))), copied ? /*#__PURE__*/React.createElement("span", {
    className: "ella-share-copied"
  }, isEs ? '¡Copiado!' : 'Copied!') : null), article.takeaways && article.takeaways.length ? /*#__PURE__*/React.createElement("aside", {
    className: "ella-takeaways"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-takeaways-hd"
  }, isEs ? 'Lo importante en 30 segundos' : 'The short version'), /*#__PURE__*/React.createElement("ul", null, article.takeaways.map((k, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, k)))) : null, sections.length > 2 ? /*#__PURE__*/React.createElement("nav", {
    className: "ella-toc",
    "aria-label": isEs ? 'En este artículo' : 'In this article'
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-toc-hd"
  }, isEs ? 'En este artículo' : 'In this article'), /*#__PURE__*/React.createElement("ol", null, sections.map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: s.id
  }, /*#__PURE__*/React.createElement("a", {
    href: '#' + s.id,
    onClick: e => jump(e, s.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-toc-num"
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", null, s.text)))))) : null, /*#__PURE__*/React.createElement("div", {
    className: "ella-article-body"
  }, article.body.map((block, i) => {
    if (block.kind === 'p') return /*#__PURE__*/React.createElement("p", {
      key: i
    }, block.text);
    if (block.kind === 'h2') return /*#__PURE__*/React.createElement("h2", {
      key: i,
      id: slugify(block.text)
    }, block.text);
    if (block.kind === 'pull') return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "ella-article-pull"
    }, block.text);
    if (block.kind === 'ul') return /*#__PURE__*/React.createElement("ul", {
      key: i,
      style: {
        fontSize: 18,
        lineHeight: 1.75,
        color: 'var(--ella-clay-700)',
        paddingLeft: 22
      }
    }, block.items.map((it, j) => /*#__PURE__*/React.createElement("li", {
      key: j
    }, it)));
    if (block.kind === 'table') return /*#__PURE__*/React.createElement("table", {
      key: i,
      className: "ella-protein-table"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, block.headers.map((h, j) => /*#__PURE__*/React.createElement("th", {
      key: j
    }, h)))), /*#__PURE__*/React.createElement("tbody", null, block.rows.map((row, j) => /*#__PURE__*/React.createElement("tr", {
      key: j
    }, row.map((cell, k) => /*#__PURE__*/React.createElement("td", {
      key: k
    }, cell))))));
    return null;
  })), article.doctorQuestions && article.doctorQuestions.length ? /*#__PURE__*/React.createElement("section", {
    className: "ella-docq",
    "aria-labelledby": "docq-hd"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-docq-top"
  }, /*#__PURE__*/React.createElement("h2", {
    id: "docq-hd"
  }, isEs ? 'Preguntas para tu médico' : 'Questions for your doctor'), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-docq-print",
    onClick: () => window.print()
  }, isEs ? 'Imprimir' : 'Print')), /*#__PURE__*/React.createElement("p", {
    className: "ella-docq-note"
  }, isEs ? 'Llévalas a tu próxima cita, en papel o en tu teléfono.' : 'Take these to your next appointment, on paper or on your phone.'), /*#__PURE__*/React.createElement("ol", null, article.doctorQuestions.map((dq, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, dq))), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "ella-docq-gloss",
    onClick: e => {
      e.preventDefault();
      setRoute('glossary');
      window.scrollTo({
        top: 0
      });
    }
  }, isEs ? '¿Tu médico habla inglés? Ve el glosario de términos →' : 'Doctor speaks English only? See the Spanish–English glossary →')) : null, /*#__PURE__*/React.createElement("aside", {
    className: "ella-disclaimer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-disclaimer-hd"
  }, isEs ? 'Aviso médico' : 'Medical notice'), /*#__PURE__*/React.createElement("p", null, isEs ? 'Este contenido es solo informativo. No sustituye la consulta, el diagnóstico ni el tratamiento de un profesional de la salud. Habla con tu médico antes de tomar decisiones sobre tu salud, sobre todo si tomas medicamentos.' : 'This content is informational and educational. It does not replace consultation, diagnosis, or treatment by a healthcare professional. Always talk to your own doctor before making decisions about your health, especially if you take medication.')), article.references && article.references.length ? /*#__PURE__*/React.createElement("section", {
    className: "ella-refs"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "ella-refs-hd"
  }, isEs ? 'Referencias' : 'References'), /*#__PURE__*/React.createElement("ol", null, article.references.map((r, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-ref-src"
  }, r.source), r.href ? /*#__PURE__*/React.createElement("a", {
    href: r.href,
    target: "_blank",
    rel: "noopener noreferrer"
  }, r.title, /*#__PURE__*/React.createElement(IconArrow, {
    width: "13",
    height: "13",
    style: {
      transform: 'rotate(-45deg)'
    }
  })) : /*#__PURE__*/React.createElement("span", null, r.title), r.note ? /*#__PURE__*/React.createElement("span", {
    className: "ella-ref-note"
  }, r.note) : null)))) : null, /*#__PURE__*/React.createElement("div", {
    className: "ella-share-row",
    style: {
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-share-lbl"
  }, isEs ? '¿Te sirvió? Compártelo' : 'Was this useful? Share it'), /*#__PURE__*/React.createElement("a", {
    className: "ella-share-btn",
    "aria-label": "WhatsApp",
    target: "_blank",
    rel: "noopener noreferrer",
    href: 'https://wa.me/?text=' + encodeURIComponent(article.title + ' ' + window.location.href)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.42 5.82c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.24-8.24z"
  }))), /*#__PURE__*/React.createElement("a", {
    className: "ella-share-btn",
    "aria-label": "Email",
    target: "_blank",
    rel: "noopener noreferrer",
    href: 'mailto:?subject=' + encodeURIComponent(article.title) + '&body=' + encodeURIComponent(window.location.href)
  }, /*#__PURE__*/React.createElement(IconMail, {
    width: "17",
    height: "17"
  }))), /*#__PURE__*/React.createElement("aside", {
    className: "ella-authorcard"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-authorcard-photo",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ella-authorcard-kicker"
  }, isEs ? 'Escrito por' : 'Written by'), /*#__PURE__*/React.createElement("div", {
    className: "ella-authorcard-name"
  }, "Jessica Zavala"), /*#__PURE__*/React.createElement("p", null, isEs ? 'Tengo 53 años, soy mamá de tres y estoy en la menopausia. Hice la investigación que nadie me dio y comparto lo que encontré, en español y en inglés, para que otra mujer no tenga que empezar de cero.' : 'I\u2019m 53, a mother of three, and I\u2019m going through menopause. I did the research nobody handed me, and I share what I found, in English and Spanish, so the next woman doesn\u2019t have to start from zero.'), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      setRoute('about');
    }
  }, isEs ? 'Conoce mi historia →' : 'Read my story →'))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 72,
      paddingTop: 40,
      borderTop: '1px solid var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow",
    style: {
      marginBottom: 16
    }
  }, isEs ? 'SIGUE LEYENDO' : 'KEEP READING'), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: 16
    }
  }, getArticles(lang).filter(a => a.id !== article.id).slice(0, 3).map(a => /*#__PURE__*/React.createElement("a", {
    key: a.id,
    href: "#",
    className: "ella-article-mini",
    onClick: e => {
      e.preventDefault();
      setArticleId(a.id);
      window.scrollTo({
        top: 0
      });
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-article-mini-cat"
  }, a.category), /*#__PURE__*/React.createElement("div", {
    className: "ella-article-mini-title"
  }, a.title)))))), sections.length > 1 ? /*#__PURE__*/React.createElement("aside", {
    className: "ella-toc-rail",
    "aria-label": isEs ? 'En este artículo' : 'In this article'
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-toc-rail-hd"
  }, isEs ? 'En este artículo' : 'In this article'), /*#__PURE__*/React.createElement("ol", null, sections.map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: s.id
  }, /*#__PURE__*/React.createElement("a", {
    href: '#' + s.id,
    className: activeId === s.id ? 'is-active' : '',
    onClick: e => jump(e, s.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-toc-rail-num"
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", null, s.text)))))) : null))));
}
window.ArticleView = ArticleView;
Object.assign(__ds_scope, { ArticleView });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens/ArticleView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens/ArticlesHub.jsx
try { (() => {
// ArticlesHub, grid of all Ella articles, filterable by category.

function ArticlesHub({
  lang,
  setRoute,
  setArticleId,
  initialCategory
}) {
  const isEs = lang === 'es';
  const articles = getArticles(lang);
  const CATEGORY_ORDER = isEs ? ['Perimenopausia', 'Menopausia', 'Nutrici\u00f3n', 'Ejercicio', 'Salud mental'] : ['Perimenopause', 'Menopause', 'Nutrition', 'Exercise', 'Mental Health'];
  const present = new Set(articles.map(a => a.category));
  const categories = ['All', ...CATEGORY_ORDER];
  const allLabel = isEs ? 'Todos' : 'All';
  const [filter, setFilter] = React.useState(initialCategory || 'All');
  React.useEffect(() => {
    if (initialCategory) setFilter(initialCategory);
  }, [initialCategory]);
  const PER_PAGE = 9;
  const [page, setPage] = React.useState(1);
  React.useEffect(() => {
    setPage(1);
  }, [filter, lang]);
  const matching = filter === 'All' ? articles : articles.filter(a => a.category === filter);
  const pageCount = Math.max(1, Math.ceil(matching.length / PER_PAGE));
  const current = Math.min(page, pageCount);
  const shown = matching.slice((current - 1) * PER_PAGE, current * PER_PAGE);
  function goPage(n) {
    setPage(n);
    const top = document.querySelector('[data-screen-label="04 Articles Hub"]');
    if (top) window.scrollTo({
      top: top.getBoundingClientRect().top + window.scrollY - 90,
      behavior: 'smooth'
    });
  }
  function open(id) {
    setArticleId(id);
    setRoute('article');
    window.scrollTo({
      top: 0
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "04 Articles Hub"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 820,
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "ella-h2-italic ella-page-title",
    style: {
      marginTop: 12
    }
  }, filter === 'All' ? isEs ? 'Artículos' : 'The Library' : filter)), /*#__PURE__*/React.createElement("div", {
    className: "ella-article-filters"
  }, categories.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    type: "button",
    className: 'ella-article-filter' + (filter === c ? ' is-active' : '') + (c !== 'All' && !present.has(c) ? ' is-empty' : ''),
    onClick: () => setFilter(c)
  }, c === 'All' ? allLabel : c))), /*#__PURE__*/React.createElement("div", {
    className: "ella-article-grid"
  }, shown.map(a => /*#__PURE__*/React.createElement("article", {
    key: a.id,
    className: "ella-article-card",
    "data-tone": a.tone
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-article-card-inner",
    onClick: () => open(a.id)
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-article-card-cat"
  }, a.category, " \xB7 ", a.readTime), /*#__PURE__*/React.createElement("h3", {
    className: "ella-article-card-title"
  }, a.title), /*#__PURE__*/React.createElement("p", {
    className: "ella-article-card-lede"
  }, a.lede), /*#__PURE__*/React.createElement("span", {
    className: "ella-article-card-cta"
  }, isEs ? 'Leer' : 'Read', " ", /*#__PURE__*/React.createElement(IconArrow, {
    width: "14",
    height: "14"
  })))))), matching.length > 0 ? /*#__PURE__*/React.createElement("nav", {
    className: "ella-pager",
    "aria-label": isEs ? 'Paginación' : 'Pagination'
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-pager-arrow",
    onClick: () => goPage(current - 1),
    disabled: current === 1,
    "aria-label": isEs ? 'Página anterior' : 'Previous page'
  }, /*#__PURE__*/React.createElement(IconChevron, {
    width: "15",
    height: "15",
    style: {
      transform: 'rotate(180deg)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "ella-pager-nums"
  }, Array.from({
    length: pageCount
  }, (_, i) => i + 1).map(n => /*#__PURE__*/React.createElement("button", {
    key: n,
    type: "button",
    className: 'ella-pager-num' + (n === current ? ' is-active' : ''),
    onClick: () => goPage(n),
    "aria-current": n === current ? 'page' : undefined
  }, n))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-pager-arrow",
    onClick: () => goPage(current + 1),
    disabled: current === pageCount,
    "aria-label": isEs ? 'Página siguiente' : 'Next page'
  }, /*#__PURE__*/React.createElement(IconChevron, {
    width: "15",
    height: "15"
  })), /*#__PURE__*/React.createElement("span", {
    className: "ella-pager-count"
  }, isEs ? 'Página ' + current + ' de ' + pageCount : 'Page ' + current + ' of ' + pageCount)) : null, shown.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "ella-empty-cat"
  }, /*#__PURE__*/React.createElement("h2", null, isEs ? 'Todavía no hay artículos aquí.' : 'Nothing here yet.'), /*#__PURE__*/React.createElement("p", null, isEs ? 'Jessica está escribiendo sobre ' + filter.toLowerCase() + '. Regresa pronto, o suscríbete abajo y te aviso cuando esté listo.' : 'Jessica is writing about ' + filter.toLowerCase() + '. Check back soon, or subscribe below and I\u2019ll let you know when it\u2019s up.'), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-btn ella-btn-secondary",
    onClick: () => setFilter('All')
  }, isEs ? 'Ver todos los artículos' : 'See all articles')) : null)));
}
window.ArticlesHub = ArticlesHub;
Object.assign(__ds_scope, { ArticlesHub });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens/ArticlesHub.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens/AwarenessQuiz.jsx
try { (() => {
// Awareness Quiz, a gentle 5-question check-in. No score, no diagnosis.
// Answers (stage, symptoms, impact, goals, doctor history) feed a
// recommendation engine that points each woman to the right reading.

function AwarenessQuiz({
  lang,
  setRoute,
  openArticle
}) {
  const t = useT(lang);
  const isEs = lang === 'es';
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState({});

  // ---- Question set. Bilingual labels live here so the engine can match
  // on stable answer KEYS regardless of language. ----
  const questions = [{
    id: 'stage',
    kind: 'single',
    text: isEs ? '¿En qué etapa estás?' : 'Where are you in your journey?',
    help: isEs ? 'No tienes que estar segura. Elige lo que más se parezca.' : 'No need to be certain. Pick whatever feels closest.',
    opts: [{
      key: 'regular',
      label: isEs ? 'Mi regla sigue siendo regular' : 'My periods are still regular'
    }, {
      key: 'changing',
      label: isEs ? 'Mi regla está cambiando o es irregular' : 'My periods are changing or irregular'
    }, {
      key: 'post',
      label: isEs ? 'Llevo 12 meses o más sin regla' : "It's been 12+ months since my last period"
    }, {
      key: 'surgical',
      label: isEs ? 'Tuve menopausia por cirugía o tratamiento' : "I've had surgical or medical menopause"
    }, {
      key: 'unsure',
      label: isEs ? 'No sé en qué etapa estoy' : "I'm not sure where I am"
    }]
  }, {
    id: 'symptoms',
    kind: 'multi',
    text: isEs ? '¿Cuáles de estos has notado últimamente?' : "Which of these have you noticed lately?",
    help: isEs ? 'Marca todas las que apliquen. También puedes dejarlo en blanco.' : 'Choose all that apply. It is okay to leave it blank.',
    opts: [{
      key: 'hot',
      label: isEs ? 'Bochornos o sudores nocturnos' : 'Hot flashes or night sweats'
    }, {
      key: 'sleep',
      label: isEs ? 'Duermes mal o tienes insomnio' : 'Sleep changes or insomnia'
    }, {
      key: 'mood',
      label: isEs ? 'Cambios de humor, ansiedad o tristeza' : 'Mood shifts, anxiety, or low mood'
    }, {
      key: 'fog',
      label: isEs ? 'Mente nublada u olvidos' : 'Brain fog or memory lapses'
    }, {
      key: 'periods',
      label: isEs ? 'Reglas irregulares o muy abundantes' : 'Irregular or heavy periods'
    }, {
      key: 'intimacy',
      label: isEs ? 'Resequedad vaginal o cambios en el deseo sexual' : 'Vaginal dryness or changes in libido'
    }, {
      key: 'body',
      label: isEs ? 'Dolor en las articulaciones o cambios de peso' : 'Joint aches or weight changes'
    }, {
      key: 'none',
      label: isEs ? 'Ninguno por ahora' : 'None of these right now',
      exclusive: true
    }]
  }, {
    id: 'impact',
    kind: 'single',
    text: isEs ? '¿Qué tanto te está afectando en tu día a día?' : 'How much is this affecting your daily life?',
    opts: [{
      key: 'curious',
      label: isEs ? 'Apenas, tengo curiosidad' : "Barely, I'm mostly curious"
    }, {
      key: 'some',
      label: isEs ? 'Hay días más difíciles' : 'Some days are harder than others'
    }, {
      key: 'lot',
      label: isEs ? 'Mucho, ya no lo puedo ignorar' : "A lot, it's hard to ignore"
    }, {
      key: 'unsure',
      label: isEs ? 'Honestamente, no estoy segura' : "I'm honestly not sure"
    }]
  }, {
    id: 'goals',
    kind: 'multi',
    text: isEs ? '¿Qué te ayudaría más ahora?' : 'What would feel most helpful right now?',
    help: isEs ? 'Marca todas las que apliquen.' : 'Choose all that apply.',
    opts: [{
      key: 'understand',
      label: isEs ? 'Entender qué le está pasando a mi cuerpo' : "Understanding what's happening to my body"
    }, {
      key: 'nutrition',
      label: isEs ? 'Alimentación y ejercicio para esta etapa' : 'Nutrition and exercise that fit this stage'
    }, {
      key: 'supplements',
      label: isEs ? 'Saber qué suplementos sí valen la pena' : 'Knowing which supplements are worth it'
    }, {
      key: 'hormones',
      label: isEs ? 'Conocer las opciones de terapia hormonal' : 'Learning about hormone therapy options'
    }, {
      key: 'doctor',
      label: isEs ? 'Saber qué preguntarle a mi médico' : 'Knowing what to ask my doctor'
    }, {
      key: 'support',
      label: isEs ? 'Sentirme menos sola' : 'Feeling less alone in it'
    }]
  }, {
    id: 'care',
    kind: 'single',
    text: isEs ? '¿Ya hablaste de esto con un médico?' : 'Have you talked to a doctor about this?',
    opts: [{
      key: 'helpful',
      label: isEs ? 'Sí, y me ayudó' : 'Yes, and it was helpful'
    }, {
      key: 'dismissed',
      label: isEs ? 'Sí, pero no me hizo caso' : 'Yes, but I felt dismissed'
    }, {
      key: 'notyet',
      label: isEs ? 'Todavía no' : 'Not yet'
    }, {
      key: 'how',
      label: isEs ? 'No, no sé cómo sacar el tema' : "No, I'm not sure how to bring it up"
    }]
  }];
  const done = step >= questions.length;
  const q = questions[step];
  const selected = answers[q?.id] || (q?.kind === 'multi' ? [] : null);
  function select(opt) {
    if (q.kind === 'multi') {
      let next;
      if (opt.exclusive) {
        next = selected.includes(opt.key) ? [] : [opt.key];
      } else {
        const base = selected.filter(k => {
          const o = q.opts.find(x => x.key === k);
          return !(o && o.exclusive); // picking a real option clears "none"
        });
        next = base.includes(opt.key) ? base.filter(o => o !== opt.key) : [...base, opt.key];
      }
      setAnswers({
        ...answers,
        [q.id]: next
      });
    } else {
      setAnswers({
        ...answers,
        [q.id]: opt.key
      });
    }
  }
  const canAdvance = q && (q.kind === 'multi' ? true : !!selected);

  // ---------- Recommendation engine ----------
  function buildCards() {
    return {
      foundations: {
        icon: /*#__PURE__*/React.createElement(IconSparkle, {
          width: "26",
          height: "26"
        }),
        tone: 'plum',
        route: 'article',
        articleId: 'menopause-vs-perimenopause',
        title: isEs ? 'Para empezar: menopausia y perimenopausia' : 'Start here: menopause vs. perimenopause',
        desc: isEs ? 'La diferencia, y por qué importa. 4 minutos.' : 'The difference, and why it changes what you do. 4 minutes.',
        cta: isEs ? 'Leer' : 'Read'
      },
      postLife: {
        icon: /*#__PURE__*/React.createElement(IconHeart, {
          width: "26",
          height: "26"
        }),
        tone: 'rose',
        route: 'article',
        articleId: 'heart-health-menopause',
        title: isEs ? 'Salud del corazón después de la menopausia' : 'Heart health after menopause',
        desc: isEs ? 'El cambio más importante a largo plazo, y qué hacer.' : 'The most important long-term change, and what to do.',
        cta: isEs ? 'Leer' : 'Read'
      },
      hot: {
        icon: /*#__PURE__*/React.createElement(IconHeart, {
          width: "26",
          height: "26"
        }),
        tone: 'rose',
        route: 'article',
        articleId: 'hrt-and-alternatives',
        title: isEs ? 'Bochornos: terapia hormonal y alternativas naturales' : 'Hot flashes: HRT and natural alternatives',
        desc: isEs ? 'Las opciones que sí tienes, explicadas.' : 'Your options, explained.',
        cta: isEs ? 'Leer' : 'Read'
      },
      sleep: {
        icon: /*#__PURE__*/React.createElement(IconMoon, {
          width: "26",
          height: "26"
        }),
        tone: 'plum',
        route: 'supplements',
        title: isEs ? 'Sueño: el magnesio y otras ayudas' : 'Sleep: magnesium and other support',
        desc: isEs ? 'Lo que investigué, y qué buscar en la etiqueta.' : 'What I researched, and the form to look for.',
        cta: isEs ? 'Ver suplementos' : 'See supplements'
      },
      mood: {
        icon: /*#__PURE__*/React.createElement(IconBrain, {
          width: "26",
          height: "26"
        }),
        tone: 'plum',
        route: 'article',
        articleId: 'estrogen-explained',
        title: isEs ? 'El estado de ánimo y el estrógeno' : 'Mood and estrogen: the connection',
        desc: isEs ? 'No es solo estrés. Todo lo que hace el estrógeno en el cuerpo.' : "It's not just stress. What estrogen does across the whole body.",
        cta: isEs ? 'Leer' : 'Read'
      },
      fog: {
        icon: /*#__PURE__*/React.createElement(IconBrain, {
          width: "26",
          height: "26"
        }),
        tone: 'plum',
        route: 'article',
        articleId: 'inflammation',
        title: isEs ? 'Mente nublada e inflamación' : 'Brain fog and inflammation',
        desc: isEs ? 'Lo que está detrás de casi todos los síntomas.' : 'The mechanism behind almost every symptom.',
        cta: isEs ? 'Leer' : 'Read'
      },
      periods: {
        icon: /*#__PURE__*/React.createElement(IconDownload, {
          width: "26",
          height: "26"
        }),
        tone: 'rose',
        route: 'resources',
        title: isEs ? 'Cuándo hablar con tu ginecólogo' : 'When to talk to your OB-GYN',
        desc: isEs ? 'Fuentes confiables para preparar tu cita.' : 'Trusted sources to prepare for your visit.',
        cta: isEs ? 'Ver recursos' : 'See resources'
      },
      intimacy: {
        icon: /*#__PURE__*/React.createElement(IconHeart, {
          width: "26",
          height: "26"
        }),
        tone: 'rose',
        route: 'article',
        articleId: 'hrt-and-alternatives',
        title: isEs ? 'Intimidad y resequedad: tus opciones' : 'Intimacy & dryness: your options',
        desc: isEs ? 'Incluye por qué el estrógeno vaginal es diferente.' : 'Including why vaginal estrogen is different.',
        cta: isEs ? 'Leer' : 'Read'
      },
      body: {
        icon: /*#__PURE__*/React.createElement(IconDumbbell, {
          width: "26",
          height: "26"
        }),
        tone: 'sage',
        route: 'article',
        articleId: 'bones-and-estrogen',
        title: isEs ? 'Huesos, músculo y fuerza' : 'Bones, muscle & strength',
        desc: isEs ? 'Por qué cambia el cuerpo y las dos cosas que sí funcionan.' : 'Why the body shifts, and the two things that reliably help.',
        cta: isEs ? 'Leer' : 'Read'
      },
      nutrition: {
        icon: /*#__PURE__*/React.createElement(IconLeaf, {
          width: "26",
          height: "26"
        }),
        tone: 'sage',
        route: 'nutrition',
        title: isEs ? 'Qué comer en esta etapa' : 'Eating for hormonal change',
        desc: isEs ? 'Cambios sencillos que importan más ahora.' : 'Simple swaps that matter more at this stage.',
        cta: isEs ? 'Explorar' : 'Explore'
      },
      supplements: {
        icon: /*#__PURE__*/React.createElement(IconDroplet, {
          width: "26",
          height: "26"
        }),
        tone: 'rose',
        route: 'supplements',
        title: isEs ? 'Los suplementos que vale la pena conocer' : 'The supplements worth knowing',
        desc: isEs ? 'Cuáles sí vale la pena tomar, y qué dice la evidencia.' : 'Which ones are worth taking, and the evidence behind them.',
        cta: isEs ? 'Ver suplementos' : 'See the list'
      },
      hormones: {
        icon: /*#__PURE__*/React.createElement(IconHeart, {
          width: "26",
          height: "26"
        }),
        tone: 'rose',
        route: 'article',
        articleId: 'hrt-and-alternatives',
        title: isEs ? 'Terapia hormonal, en lenguaje claro' : 'Hormone therapy, in plain language',
        desc: isEs ? 'Las opciones, explicadas con claridad.' : 'Your options, explained.',
        cta: isEs ? 'Explorar opciones' : 'Explore options'
      },
      doctor: {
        icon: /*#__PURE__*/React.createElement(IconDownload, {
          width: "26",
          height: "26"
        }),
        tone: 'rose',
        route: 'resources',
        title: isEs ? 'Recursos para tu próxima cita' : 'Resources for your next appointment',
        desc: isEs ? 'Enlaces confiables para que llegues preparada.' : 'Trusted links so you walk in prepared.',
        cta: isEs ? 'Ver recursos' : 'See resources'
      },
      specialist: {
        icon: /*#__PURE__*/React.createElement(IconArrow, {
          width: "26",
          height: "26"
        }),
        tone: 'plum',
        route: 'resources',
        title: isEs ? 'Cómo encontrar un especialista en menopausia' : 'How to find a menopause specialist',
        desc: isEs ? 'Qué buscar cuando sientes que no te escuchan.' : "What to look for when your doctor isn't listening.",
        cta: isEs ? 'Aprender' : 'Learn how'
      },
      support: {
        icon: /*#__PURE__*/React.createElement(IconUsers, {
          width: "26",
          height: "26"
        }),
        tone: 'sage',
        route: 'about',
        title: isEs ? 'No estás sola en esto' : "You're not alone in this",
        desc: isEs ? 'Conoce a Jessica y por qué creó Ella.' : 'Meet Jessica and why Ella exists.',
        cta: isEs ? 'Conocer' : 'Meet Jessica'
      }
    };
  }
  function getRecommendations() {
    const cards = buildCards();
    const stage = answers.stage;
    const symptoms = (answers.symptoms || []).filter(k => k !== 'none');
    const goals = answers.goals || [];
    const impact = answers.impact;
    const care = answers.care;
    const recs = [];
    const seen = new Set();
    const add = card => {
      if (!card) return;
      const key = card.articleId || card.route;
      if (seen.has(key)) return;
      seen.add(key);
      recs.push(card);
    };

    // 1. If she felt dismissed or hasn't raised it yet, lead with advocacy tools.
    if ((care === 'dismissed' || care === 'how') && (symptoms.length || impact === 'lot' || impact === 'some')) {
      add(cards.doctor);
      if (care === 'dismissed') add(cards.specialist);
    }

    // 2. Symptom-specific reading, in the order she selected.
    symptoms.forEach(s => add(cards[s]));

    // 3. Honor what she said she's looking for.
    const goalMap = {
      understand: cards.foundations,
      nutrition: cards.nutrition,
      supplements: cards.supplements,
      hormones: cards.hormones,
      doctor: cards.doctor,
      support: cards.support
    };
    goals.forEach(g => add(goalMap[g]));

    // 4. Stage-aware foundations.
    if (stage === 'unsure' || stage === 'regular' || stage === 'changing') add(cards.foundations);
    if (stage === 'post' || stage === 'surgical') add(cards.postLife);

    // 5. Make sure she leaves with at least three doors open.
    [cards.foundations, cards.nutrition, cards.supplements].forEach(add);
    return recs.slice(0, 4);
  }

  // Responsible flag: postmenopausal bleeding is always worth a doctor visit.
  function safetyNote() {
    const stage = answers.stage;
    const symptoms = answers.symptoms || [];
    if ((stage === 'post' || stage === 'surgical') && symptoms.includes('periods')) {
      return isEs ? 'Algo importante: cualquier sangrado después de la menopausia es motivo para llamar a tu médico, aunque casi siempre no sea nada grave.' : 'One important note: any bleeding after menopause is worth a call to your doctor, even though it is usually nothing serious. It is worth getting checked.';
    }
    return null;
  }
  function resultIntro() {
    const symptoms = (answers.symptoms || []).filter(k => k !== 'none');
    const impact = answers.impact;
    const care = answers.care;
    if (care === 'dismissed') {
      return isEs ? 'Que no te hagan caso pasa más de lo que debería, y no es tu culpa. Empecemos con herramientas para que la próxima cita sea diferente.' : "Being brushed off by a doctor happens a lot, and it's not your fault. Start with these so your next appointment goes better.";
    }
    if (impact === 'lot') {
      return isEs ? 'Suena a que estás cargando con mucho. Estas lecturas te pueden ayudar a sentir que tienes más control.' : "That sounds like a lot to deal with. These are good places to start.";
    }
    if (symptoms.length === 0) {
      return isEs ? 'No marcaste síntomas, y es buen momento para informarte antes de que las cosas cambien. Por aquí puedes empezar.' : "You didn't pick any symptoms, so this is a good time to learn what's coming. Start here.";
    }
    return isEs ? 'Según lo que me contaste, por aquí puedes empezar. No es un diagnóstico, solo un siguiente paso.' : "Based on your answers, start here. This isn't a diagnosis, just a next step.";
  }

  // Small human-readable recap of the answers.
  function recapChips() {
    const chips = [];
    const stageLabels = {
      regular: isEs ? 'Regla regular' : 'Regular periods',
      changing: isEs ? 'Regla cambiando' : 'Periods changing',
      post: isEs ? 'Posmenopausia' : 'Postmenopause',
      surgical: isEs ? 'Menopausia por tratamiento' : 'Medical menopause',
      unsure: isEs ? 'Etapa sin definir' : 'Stage to be determined'
    };
    if (answers.stage) chips.push(stageLabels[answers.stage]);
    const symCount = (answers.symptoms || []).filter(k => k !== 'none').length;
    if (symCount) chips.push(isEs ? `${symCount} síntoma${symCount > 1 ? 's' : ''}` : `${symCount} symptom${symCount > 1 ? 's' : ''}`);
    const impactLabels = {
      curious: isEs ? 'Por curiosidad' : 'Curious',
      some: isEs ? 'Algunos días difíciles' : 'Some hard days',
      lot: isEs ? 'Ya no lo puedo ignorar' : 'Hard to ignore',
      unsure: isEs ? 'No estoy segura' : 'Not sure yet'
    };
    if (answers.impact) chips.push(impactLabels[answers.impact]);
    return chips;
  }

  // ============ RESULTS ============
  if (done) {
    const recs = getRecommendations();
    const note = safetyNote();
    const chips = recapChips();
    return /*#__PURE__*/React.createElement("div", {
      "data-screen-label": "03 Quiz Results"
    }, /*#__PURE__*/React.createElement("section", {
      className: "ella-section"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ella-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ella-quiz"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ella-eyebrow"
    }, isEs ? 'GRACIAS POR CONTARME' : 'YOUR RESULTS'), /*#__PURE__*/React.createElement("h2", {
      className: "ella-quiz-q",
      style: {
        marginTop: 14
      }
    }, isEs ? 'Por aquí puedes empezar.' : "Here's where to start."), chips.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 18,
        marginBottom: 4
      }
    }, chips.map((c, i) => /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: '0.02em',
        color: 'var(--ella-clay-700)',
        background: 'var(--ella-cream-100)',
        border: '1px solid var(--border-default)',
        borderRadius: 999,
        padding: '6px 14px'
      }
    }, c))), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 18,
        lineHeight: 1.65,
        color: 'var(--ella-clay-700)',
        maxWidth: '60ch',
        marginTop: 16
      }
    }, resultIntro()), note && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
        background: 'var(--ella-blush-50)',
        border: '1px solid var(--ella-blush-100)',
        borderRadius: 14,
        padding: '16px 18px',
        margin: '20px 0 4px',
        maxWidth: '62ch'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--ella-rose-deep)',
        flexShrink: 0,
        marginTop: 2
      }
    }, /*#__PURE__*/React.createElement(IconHeart, {
      width: "20",
      height: "20"
    })), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 15.5,
        lineHeight: 1.55,
        color: 'var(--ella-clay-700)',
        margin: 0
      }
    }, note)), /*#__PURE__*/React.createElement("div", {
      className: "ella-pillars",
      style: {
        marginTop: 32
      }
    }, recs.map((r, i) => /*#__PURE__*/React.createElement("a", {
      key: i,
      className: "ella-pillar-card",
      "data-tone": r.tone,
      href: "#",
      onClick: e => {
        e.preventDefault();
        if (r.articleId && openArticle) openArticle(r.articleId);else {
          setRoute(r.route);
          window.scrollTo({
            top: 0
          });
        }
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ella-pillar-icon"
    }, r.icon), /*#__PURE__*/React.createElement("h3", null, r.title), /*#__PURE__*/React.createElement("p", null, r.desc), /*#__PURE__*/React.createElement("span", {
      className: "ella-pillar-cta"
    }, r.cta, " ", /*#__PURE__*/React.createElement(IconArrow, {
      width: "16",
      height: "16"
    }))))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 32,
        display: 'flex',
        gap: 16,
        flexWrap: 'wrap',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "ella-btn ella-btn-text",
      onClick: () => {
        setStep(0);
        setAnswers({});
      }
    }, isEs ? 'Volver a hacer el cuestionario' : 'Retake the check-in'), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "ella-btn ella-btn-text",
      onClick: () => setRoute('articles')
    }, isEs ? 'Ver todos los artículos' : 'Browse all articles', " ", /*#__PURE__*/React.createElement(IconArrow, {
      width: "16",
      height: "16"
    }))), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13.5,
        lineHeight: 1.5,
        color: 'var(--ella-taupe-500)',
        marginTop: 28,
        maxWidth: '60ch'
      }
    }, isEs ? 'Esto es información general, no consejo médico ni un diagnóstico. Para tu caso, habla con tu médico.' : 'This is general information, not medical advice or a diagnosis. For your specific situation, talk with your own doctor.')))));
  }

  // ============ QUESTION ============
  const pct = Math.round(step / questions.length * 100);
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "03 Quiz"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ella-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-quiz"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-quiz-progress"
  }, /*#__PURE__*/React.createElement("span", null, t('quiz_progress', {
    n: step + 1,
    total: questions.length
  })), /*#__PURE__*/React.createElement("span", null, pct, "%")), /*#__PURE__*/React.createElement("div", {
    className: "ella-quiz-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-quiz-bar-fill",
    style: {
      width: `${pct}%`
    }
  })), /*#__PURE__*/React.createElement("h2", {
    className: "ella-quiz-q"
  }, q.text), q.help && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.5,
      color: 'var(--ella-taupe-500)',
      margin: '-4px 0 22px'
    }
  }, q.help), /*#__PURE__*/React.createElement("div", {
    className: "ella-quiz-opts"
  }, q.opts.map(opt => {
    const isSel = q.kind === 'multi' ? (selected || []).includes(opt.key) : selected === opt.key;
    return /*#__PURE__*/React.createElement("button", {
      key: opt.key,
      type: "button",
      className: 'ella-quiz-opt' + (isSel ? ' is-selected' : ''),
      onClick: () => select(opt)
    }, /*#__PURE__*/React.createElement("span", {
      className: "ella-quiz-check"
    }), /*#__PURE__*/React.createElement("span", null, opt.label));
  })), /*#__PURE__*/React.createElement("div", {
    className: "ella-quiz-nav"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-btn ella-btn-text",
    onClick: () => step === 0 ? setRoute('home') : setStep(step - 1)
  }, '\u2190 ', t('quiz_back')), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-btn ella-btn-primary",
    disabled: !canAdvance,
    style: !canAdvance ? {
      opacity: 0.45,
      cursor: 'not-allowed'
    } : null,
    onClick: () => canAdvance && setStep(step + 1)
  }, step === questions.length - 1 ? t('quiz_finish') : t('quiz_next'), /*#__PURE__*/React.createElement(IconArrow, {
    width: "18",
    height: "18"
  })))))));
}
window.AwarenessQuiz = AwarenessQuiz;
Object.assign(__ds_scope, { AwarenessQuiz });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens/AwarenessQuiz.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens/CareOnBudget.jsx
try { (() => {
// Care on a budget: how to get menopause care with little money or no insurance.

function CareOnBudget({
  lang,
  setRoute
}) {
  const isEs = lang === 'es';
  const sections = isEs ? [{
    h: 'Centros de salud comunitarios',
    p: 'Atienden a todos, tengas o no seguro, y cobran según lo que ganas (tarifa variable). Muchos tienen personal que habla español.',
    links: [{
      label: 'Busca un centro cerca de ti (HRSA)',
      href: 'https://findahealthcenter.hrsa.gov/?language=es'
    }]
  }, {
    h: 'Medicamentos más baratos',
    p: 'Muchas recetas de menopausia vienen en versión genérica, que cuesta mucho menos. Antes de pagar, compara precios: pueden cambiar mucho de una farmacia a otra.',
    links: [{
      label: 'GoodRx (cupones de farmacia)',
      href: 'https://www.goodrx.com/'
    }, {
      label: 'Mark Cuban Cost Plus Drug Company',
      href: 'https://costplusdrugs.com/'
    }],
    ask: ['¿Hay una versión genérica?', '¿Me puede dar una receta para 90 días? Muchas veces sale más barato.']
  }, {
    h: 'Seguro médico de bajo costo',
    p: 'Según tus ingresos, puedes calificar para Medicaid o para un plan con ayuda del gobierno.',
    links: [{
      label: 'CuidadoDeSalud.gov',
      href: 'https://www.cuidadodesalud.gov/es/'
    }, {
      label: 'Medicaid',
      href: 'https://www.medicaid.gov/'
    }]
  }, {
    h: 'Consultas por internet',
    p: 'Hay servicios de telemedicina para la menopausia con precio fijo, sin seguro. Antes de agendar, pregunta cuánto cuesta la consulta y cuánto cuestan las recetas.'
  }, {
    h: 'Tu derecho a un intérprete',
    p: 'La mayoría de las clínicas y hospitales de EE. UU. que reciben fondos federales tienen que darte un intérprete gratis. Pídelo al hacer tu cita.',
    links: [{
      label: 'Más información (HHS)',
      href: 'https://www.hhs.gov/civil-rights/for-individuals/special-topics/limited-english-proficiency/index.html'
    }]
  }] : [{
    h: 'Community health centers',
    p: 'They see everyone, with or without insurance, and charge based on what you earn (sliding scale). Many have Spanish-speaking staff.',
    links: [{
      label: 'Find a center near you (HRSA)',
      href: 'https://findahealthcenter.hrsa.gov/'
    }]
  }, {
    h: 'Cheaper prescriptions',
    p: 'Many menopause prescriptions come in a generic version that costs much less. Before you pay, compare prices: they can vary a lot between pharmacies.',
    links: [{
      label: 'GoodRx (pharmacy coupons)',
      href: 'https://www.goodrx.com/'
    }, {
      label: 'Mark Cuban Cost Plus Drug Company',
      href: 'https://costplusdrugs.com/'
    }],
    ask: ['Is there a generic version?', 'Can you write it for 90 days? It’s often cheaper.']
  }, {
    h: 'Low-cost insurance',
    p: 'Depending on your income, you may qualify for Medicaid or a plan with government help.',
    links: [{
      label: 'HealthCare.gov',
      href: 'https://www.healthcare.gov/'
    }, {
      label: 'Medicaid',
      href: 'https://www.medicaid.gov/'
    }]
  }, {
    h: 'Online visits',
    p: 'There are menopause telehealth services with flat self-pay prices, no insurance needed. Before booking, ask what the visit costs and what the prescriptions cost.'
  }, {
    h: 'Your right to an interpreter',
    p: 'Most U.S. clinics and hospitals that receive federal funding must give you an interpreter for free. Ask for one when you book.',
    links: [{
      label: 'Learn more (HHS)',
      href: 'https://www.hhs.gov/civil-rights/for-individuals/special-topics/limited-english-proficiency/index.html'
    }]
  }];
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "13 Care on a budget"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow"
  }, isEs ? 'ATENCIÓN DE BAJO COSTO' : 'CARE ON A BUDGET'), /*#__PURE__*/React.createElement("h1", {
    className: "ella-page-title"
  }, isEs ? 'Atención médica sin gastar de más.' : 'Getting care without overspending.'), /*#__PURE__*/React.createElement("p", {
    className: "ella-sym-lede"
  }, isEs ? 'No tener seguro o tener poco dinero no debería impedirte recibir atención. Aquí tienes por dónde empezar.' : 'Not having insurance, or not having much money, shouldn’t keep you from care. Here’s where to start.')), /*#__PURE__*/React.createElement("div", {
    className: "ella-budget-list"
  }, sections.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.h,
    className: "ella-budget-item"
  }, /*#__PURE__*/React.createElement("h2", null, s.h), /*#__PURE__*/React.createElement("p", null, s.p), s.ask ? /*#__PURE__*/React.createElement("div", {
    className: "ella-budget-ask"
  }, /*#__PURE__*/React.createElement("span", null, isEs ? 'PREGÚNTALE A TU MÉDICO' : 'ASK YOUR DOCTOR'), /*#__PURE__*/React.createElement("ul", null, s.ask.map(a => /*#__PURE__*/React.createElement("li", {
    key: a
  }, a)))) : null, s.links ? /*#__PURE__*/React.createElement("div", {
    className: "ella-budget-links"
  }, s.links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.href,
    href: l.href,
    target: "_blank",
    rel: "noopener noreferrer"
  }, l.label, " ", /*#__PURE__*/React.createElement(IconArrow, {
    width: "13",
    height: "13",
    style: {
      transform: 'rotate(-45deg)'
    }
  })))) : null))), /*#__PURE__*/React.createElement("p", {
    className: "ella-urgent-foot"
  }, isEs ? 'Ella no gana nada por recomendar estos sitios. Los precios y requisitos cambian; confirma directamente con cada uno.' : 'Ella earns nothing from recommending these. Prices and requirements change; confirm directly with each one.'))));
}
window.CareOnBudget = CareOnBudget;
Object.assign(__ds_scope, { CareOnBudget });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens/CareOnBudget.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens/Glossary.jsx
try { (() => {
// Glossary, Spanish–English menopause terms plus phrases to use with an
// English-speaking doctor. Searchable in either language.

const ELLA_GLOSSARY = [
// group, es term, en term, es definition, en definition
['stages', 'Menopausia', 'Menopause', 'Cuando llevas 12 meses seguidos sin regla.', 'When you have gone 12 months in a row without a period.'], ['stages', 'Perimenopausia', 'Perimenopause', 'Los años antes de la menopausia, cuando las hormonas suben y bajan.', 'The years before menopause, when hormones rise and fall.'], ['stages', 'Posmenopausia', 'Postmenopause', 'Todo lo que viene después de la menopausia.', 'Everything after menopause.'], ['stages', 'Menopausia quirúrgica', 'Surgical menopause', 'Menopausia causada por una cirugía en la que se quitan los ovarios.', 'Menopause caused by surgery that removes the ovaries.'], ['stages', 'Menopausia prematura', 'Early menopause', 'Menopausia antes de los 45 años.', 'Menopause before age 45.'], ['symptoms', 'Bochornos', 'Hot flashes', 'Calor repentino en la cara, el cuello o el pecho, a veces con sudor.', 'Sudden heat in the face, neck, or chest, sometimes with sweating.'], ['symptoms', 'Sudores nocturnos', 'Night sweats', 'Bochornos mientras duermes que te despiertan sudando.', 'Hot flashes during sleep that wake you up sweaty.'], ['symptoms', 'Mente nublada', 'Brain fog', 'Olvidos y dificultad para concentrarte.', 'Forgetfulness and trouble concentrating.'], ['symptoms', 'Insomnio', 'Insomnia', 'Dificultad para dormirte o para seguir dormida.', 'Trouble falling asleep or staying asleep.'], ['symptoms', 'Palpitaciones', 'Heart palpitations', 'Sentir el corazón acelerado o latiendo fuerte.', 'Feeling your heart race or pound.'], ['symptoms', 'Resequedad vaginal', 'Vaginal dryness', 'Menos humedad vaginal, que puede causar molestia o dolor.', 'Less vaginal moisture, which can cause discomfort or pain.'], ['symptoms', 'Dolor en las relaciones', 'Painful sex', 'Dolor durante las relaciones sexuales. El término médico es dispareunia.', 'Pain during sex. The medical term is dyspareunia.'], ['symptoms', 'Deseo sexual bajo', 'Low libido', 'Menos ganas de tener relaciones.', 'Less interest in sex.'], ['symptoms', 'Regla irregular', 'Irregular periods', 'Reglas que llegan antes, después, más o menos abundantes.', 'Periods that come earlier, later, heavier, or lighter.'], ['symptoms', 'Sangrado después de la menopausia', 'Postmenopausal bleeding', 'Cualquier sangrado después de 12 meses sin regla. Siempre díselo a tu médico.', 'Any bleeding after 12 months without a period. Always tell your doctor.'], ['symptoms', 'Dolor de articulaciones', 'Joint pain', 'Dolor o rigidez en rodillas, manos, hombros u otras articulaciones.', 'Pain or stiffness in knees, hands, shoulders, or other joints.'], ['body', 'Estrógeno', 'Estrogen', 'La hormona principal que baja en la menopausia.', 'The main hormone that drops in menopause.'], ['body', 'Progesterona', 'Progesterone', 'Hormona que protege el útero cuando tomas estrógeno.', 'A hormone that protects the uterus when you take estrogen.'], ['body', 'Testosterona', 'Testosterone', 'Hormona que también tienen las mujeres; influye en el deseo y la energía.', 'A hormone women have too; it affects desire and energy.'], ['body', 'FSH (hormona foliculoestimulante)', 'FSH (follicle-stimulating hormone)', 'Hormona que a veces se mide, aunque en la perimenopausia cambia mucho de un día a otro.', 'A hormone sometimes tested, though in perimenopause it changes a lot from day to day.'], ['body', 'Ovarios', 'Ovaries', 'Los órganos que producen estrógeno y progesterona.', 'The organs that make estrogen and progesterone.'], ['body', 'Útero (matriz)', 'Uterus (womb)', 'El órgano donde se forma la regla.', 'The organ where your period comes from.'], ['body', 'Tiroides', 'Thyroid', 'Glándula del cuello. Sus problemas pueden parecerse a la menopausia.', 'A gland in the neck. Its problems can look like menopause.'], ['body', 'Inflamación', 'Inflammation', 'La reacción de defensa del cuerpo. Sube cuando baja el estrógeno.', 'The body’s defense reaction. It rises when estrogen drops.'], ['treatment', 'Terapia de reemplazo hormonal (TRH)', 'Hormone replacement therapy (HRT)', 'Tratamiento que repone el estrógeno, y a veces la progesterona.', 'Treatment that replaces estrogen, and sometimes progesterone.'], ['treatment', 'Terapia hormonal', 'Hormone therapy (HT / MHT)', 'Otra forma de decir TRH. Los médicos usan los dos nombres.', 'Another name for HRT. Doctors use both.'], ['treatment', 'Estrógeno vaginal', 'Vaginal estrogen', 'Crema, anillo o tableta que actúa solo en la zona vaginal.', 'A cream, ring, or tablet that works only in the vaginal area.'], ['treatment', 'Parche', 'Patch', 'Estrógeno que se pega en la piel.', 'Estrogen that sticks to the skin.'], ['treatment', 'DIU hormonal', 'Hormonal IUD', 'Dispositivo en el útero que libera progesterona.', 'A device in the uterus that releases progesterone.'], ['treatment', 'Fitoestrógenos', 'Phytoestrogens', 'Sustancias de plantas, como la soya y la linaza, parecidas al estrógeno.', 'Plant substances, like soy and flax, similar to estrogen.'], ['treatment', 'Anticoagulante', 'Blood thinner', 'Medicamento que hace la sangre más líquida, como la warfarina.', 'A medication that thins the blood, like warfarin.'], ['treatment', 'Efectos secundarios', 'Side effects', 'Reacciones no deseadas de un medicamento.', 'Unwanted reactions to a medication.'], ['treatment', 'Receta', 'Prescription', 'La orden del médico para un medicamento.', 'A doctor’s order for a medication.'], ['tests', 'Análisis de sangre', 'Blood test', 'Muestra de sangre para medir hormonas, vitaminas u otros valores.', 'A blood sample to check hormones, vitamins, or other levels.'], ['tests', 'Densitometría ósea', 'Bone density scan (DEXA)', 'Estudio que mide qué tan fuertes están tus huesos.', 'A scan that measures how strong your bones are.'], ['tests', 'Osteoporosis', 'Osteoporosis', 'Huesos débiles que se rompen con más facilidad.', 'Weak bones that break more easily.'], ['tests', 'Mamografía', 'Mammogram', 'Radiografía de los senos para detectar cáncer.', 'An X-ray of the breasts to check for cancer.'], ['tests', 'Papanicolaou', 'Pap smear', 'Prueba del cuello del útero para detectar cambios o cáncer.', 'A test of the cervix to find changes or cancer.'], ['tests', 'Presión arterial', 'Blood pressure', 'La fuerza de la sangre en las arterias.', 'The force of blood in your arteries.'], ['tests', 'Colesterol', 'Cholesterol', 'Grasa en la sangre. Alto, aumenta el riesgo del corazón.', 'Fat in the blood. High levels raise heart risk.'], ['tests', 'Triglicéridos', 'Triglycerides', 'Otro tipo de grasa en la sangre.', 'Another type of fat in the blood.'], ['care', 'Ginecólogo', 'OB-GYN', 'Médico especialista en la salud de la mujer.', 'A doctor who specializes in women’s health.'], ['care', 'Médico de cabecera', 'Primary care doctor', 'Tu médico general.', 'Your general doctor.'], ['care', 'Especialista certificado en menopausia', 'Certified menopause practitioner (MSCP)', 'Profesional con formación especial en menopausia.', 'A clinician with special training in menopause.'], ['care', 'Referencia (pase)', 'Referral', 'Cuando tu médico te manda con un especialista.', 'When your doctor sends you to a specialist.'], ['care', 'Intérprete', 'Interpreter', 'Persona que traduce en la cita. En muchas clínicas de EE. UU. lo puedes pedir sin costo.', 'A person who translates at your visit. Many U.S. clinics provide one free if you ask.']];
const ELLA_PHRASES = [['Creo que estoy en la perimenopausia.', 'I think I’m in perimenopause.'], ['Mi regla ha cambiado.', 'My periods have changed.'], ['Tengo bochornos y sudores nocturnos.', 'I’m having hot flashes and night sweats.'], ['No estoy durmiendo bien.', 'I’m not sleeping well.'], ['Me gustaría hablar de la terapia hormonal.', 'I’d like to talk about hormone therapy.'], ['¿Me puede mandar con un especialista en menopausia?', 'Can you refer me to a menopause specialist?'], ['¿Qué riesgos tiene esto para mí?', 'What are the risks for me?'], ['¿Me lo puede explicar más despacio?', 'Could you explain that more slowly?'], ['Necesito un intérprete, por favor.', 'I need an interpreter, please.']];
window.ELLA_GLOSSARY = ELLA_GLOSSARY;
function Glossary({
  lang,
  setRoute
}) {
  const isEs = lang === 'es';
  // Arriving from the header search pre-fills the same word.
  const [q, setQ] = React.useState(() => {
    const v = window.__ellaGlossaryQuery || '';
    window.__ellaGlossaryQuery = '';
    return v;
  });
  const groups = isEs ? [['stages', 'Etapas'], ['symptoms', 'Síntomas'], ['body', 'Hormonas y cuerpo'], ['treatment', 'Tratamientos'], ['tests', 'Estudios y resultados'], ['care', 'En la cita']] : [['stages', 'Stages'], ['symptoms', 'Symptoms'], ['body', 'Hormones & body'], ['treatment', 'Treatments'], ['tests', 'Tests & results'], ['care', 'At the appointment']];
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const term = norm(q.trim());
  const match = row => !term || norm(row.slice(1).join(' ')).includes(term);
  const total = ELLA_GLOSSARY.filter(match).length;
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "10 Glossary"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow"
  }, isEs ? 'GLOSARIO' : 'GLOSSARY'), /*#__PURE__*/React.createElement("h1", {
    className: "ella-page-title"
  }, isEs ? 'Las palabras que vas a escuchar en la cita.' : 'The words you’ll hear at the doctor.'), /*#__PURE__*/React.createElement("p", {
    className: "ella-gloss-lede"
  }, isEs ? 'Si tu médico habla inglés, aquí tienes cada término en los dos idiomas, con una explicación sencilla.' : 'If your doctor speaks English, here is each term in both languages, with a plain explanation.'), /*#__PURE__*/React.createElement("input", {
    type: "search",
    className: "ella-gloss-search",
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: isEs ? 'Busca una palabra en español o en inglés…' : 'Search a word in Spanish or English…',
    "aria-label": isEs ? 'Buscar en el glosario' : 'Search the glossary'
  })), total === 0 && /*#__PURE__*/React.createElement("p", {
    className: "ella-gloss-empty"
  }, isEs ? 'No encontré esa palabra todavía.' : 'That word isn’t in the glossary yet.'), groups.map(([key, label]) => {
    const rows = ELLA_GLOSSARY.filter(r => r[0] === key && match(r));
    if (!rows.length) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      className: "ella-gloss-group"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "ella-section-title"
    }, label), /*#__PURE__*/React.createElement("dl", {
      className: "ella-gloss-list"
    }, rows.map(r => /*#__PURE__*/React.createElement("div", {
      key: r[1],
      className: "ella-gloss-row"
    }, /*#__PURE__*/React.createElement("dt", null, /*#__PURE__*/React.createElement("span", {
      className: "ella-gloss-es",
      lang: "es"
    }, r[1]), /*#__PURE__*/React.createElement("span", {
      className: "ella-gloss-en",
      lang: "en"
    }, r[2])), /*#__PURE__*/React.createElement("dd", null, isEs ? r[3] : r[4])))));
  }), !term && /*#__PURE__*/React.createElement("div", {
    className: "ella-gloss-group"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "ella-section-title"
  }, isEs ? 'Frases útiles para la cita' : 'Useful phrases for your visit'), /*#__PURE__*/React.createElement("ul", {
    className: "ella-gloss-phrases"
  }, ELLA_PHRASES.map(([es, en]) => /*#__PURE__*/React.createElement("li", {
    key: en
  }, /*#__PURE__*/React.createElement("span", {
    lang: "es"
  }, es), /*#__PURE__*/React.createElement("span", {
    lang: "en"
  }, en))))))));
}
window.Glossary = Glossary;
Object.assign(__ds_scope, { Glossary });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens/Glossary.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens/Homepage.jsx
try { (() => {
// Homepage, final Pause-Life-inspired editorial layout.
// Order: hero → "why this matters" intro → explore by topic → quiz banner →
//        consultation → info link grid.

function Homepage({
  lang,
  setRoute,
  setArticleId,
  openSymptom,
  goToCategory,
  primaryColor,
  heroVariant
}) {
  const t = useT(lang);
  const isEs = lang === 'es';
  const articles = typeof getArticles === 'function' ? getArticles(lang) : [];
  const countIn = cat => articles.filter(a => a.category === cat).length;
  const goCat = cat => () => {
    if (goToCategory) goToCategory('articles', cat);else setRoute('articles');
    window.scrollTo({
      top: 0
    });
  };
  const topics = [{
    label: isEs ? 'Perimenopausia' : 'Perimenopause',
    tone: 'rose',
    icon: /*#__PURE__*/React.createElement(IconLeaf, {
      width: "19",
      height: "19"
    }),
    count: countIn(isEs ? 'Perimenopausia' : 'Perimenopause'),
    onClick: goCat(isEs ? 'Perimenopausia' : 'Perimenopause')
  }, {
    label: isEs ? 'Menopausia' : 'Menopause',
    tone: 'rose',
    icon: /*#__PURE__*/React.createElement(IconSparkle, {
      width: "19",
      height: "19"
    }),
    count: countIn(isEs ? 'Menopausia' : 'Menopause'),
    onClick: goCat(isEs ? 'Menopausia' : 'Menopause')
  }, {
    label: isEs ? 'Ejercicio' : 'Exercise',
    tone: 'sage',
    icon: /*#__PURE__*/React.createElement(IconDumbbell, {
      width: "19",
      height: "19"
    }),
    count: countIn(isEs ? 'Ejercicio' : 'Exercise'),
    onClick: goCat(isEs ? 'Ejercicio' : 'Exercise')
  }, {
    label: isEs ? 'Nutrición' : 'Nutrition',
    tone: 'sage',
    icon: /*#__PURE__*/React.createElement(IconApple, {
      width: "19",
      height: "19"
    }),
    count: countIn(isEs ? 'Nutrición' : 'Nutrition'),
    onClick: goCat(isEs ? 'Nutrición' : 'Nutrition')
  }, {
    label: isEs ? 'Salud mental' : 'Mental health',
    tone: 'plum',
    icon: /*#__PURE__*/React.createElement(IconBrain, {
      width: "19",
      height: "19"
    }),
    count: countIn(isEs ? 'Salud mental' : 'Mental Health'),
    onClick: goCat(isEs ? 'Salud mental' : 'Mental Health')
  }, {
    label: isEs ? 'Suplementos' : 'Supplements',
    tone: 'plum',
    icon: /*#__PURE__*/React.createElement(IconDroplet, {
      width: "19",
      height: "19"
    }),
    count: -1,
    onClick: () => {
      setRoute('supplements');
      window.scrollTo({
        top: 0
      });
    }
  }];
  function openArticle(id) {
    if (setArticleId) setArticleId(id);
    setRoute('article');
    window.scrollTo({
      top: 0
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "01 Homepage"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ella-hero",
    "data-screen-label": "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-hero-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, isEs ? /*#__PURE__*/React.createElement(React.Fragment, null, "De mujeres, ", /*#__PURE__*/React.createElement("em", null, "para mujeres.")) : /*#__PURE__*/React.createElement(React.Fragment, null, "By women, ", /*#__PURE__*/React.createElement("em", null, "for women."))), /*#__PURE__*/React.createElement("p", null, isEs ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, "Todo lo que necesitas saber sobre la menopausia."), " Nutrici\xF3n, suplementos, ejercicio, salud mental y las preguntas que debes hacerle a tu m\xE9dico.") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, "Everything you need to know about menopause."), " Nutrition, supplements, exercise, mental health, and the questions to ask your doctor.")), /*#__PURE__*/React.createElement("div", {
    className: "ella-hero-why"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow"
  }, isEs ? 'POR QUÉ IMPORTA' : 'WHY THIS MATTERS'), /*#__PURE__*/React.createElement("p", null, isEs ? 'Todas las mujeres pasamos por la menopausia, y aun así la mayoría de las carreras de medicina le dedican menos de una hora. Por eso tantas nos sentimos perdidas durante todo el proceso.' : 'Every woman goes through menopause, yet most medical schools spend less than an hour on it. That’s why so many of us feel lost the whole way through.')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap',
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-btn ella-btn-primary ella-btn-lg",
    onClick: () => setRoute('articles')
  }, isEs ? 'Empieza a leer' : 'Start reading', /*#__PURE__*/React.createElement(IconArrow, {
    width: "20",
    height: "20"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "ella-hero-cred",
    "aria-label": "About the author"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-hero-cred-avatar"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Jessica Zavala"), " \xB7 ", isEs ? 'Certificado en bienestar femenino' : "Women's wellness certificate"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(IllustrationSprig, {
    width: 120,
    className: "ella-hero-ornament tl"
  }), /*#__PURE__*/React.createElement(Photo, {
    aspect: "4/5",
    tint: "rose",
    src: "assets/photos/portrait-terrace.jpg",
    objectPosition: "68% center",
    alt: isEs ? 'Mujer sonriendo en una terraza' : 'Woman smiling on a terrace in natural light',
    radius: "24px"
  }, /*#__PURE__*/React.createElement(IllustrationBranch, {
    width: 160,
    className: "ella-hero-ornament br"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 24
    }
  }))), /*#__PURE__*/React.createElement("section", {
    className: "ella-section ella-bg-cream",
    "data-screen-label": "topics"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      maxWidth: 620,
      margin: '0 auto 28px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow"
  }, isEs ? 'EXPLORA POR TEMA' : 'EXPLORE BY TOPIC'), /*#__PURE__*/React.createElement("h2", {
    className: "ella-h2-italic ella-section-title",
    style: {
      marginTop: 8
    }
  }, isEs ? /*#__PURE__*/React.createElement(React.Fragment, null, "\xBFPor d\xF3nde ", /*#__PURE__*/React.createElement("em", null, "empiezo?")) : /*#__PURE__*/React.createElement(React.Fragment, null, "Where should I ", /*#__PURE__*/React.createElement("em", null, "start?"))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.6,
      color: 'var(--ella-clay-700)',
      marginTop: 12
    }
  }, isEs ? 'Elige el tema que más tenga que ver contigo ahora. No tienes que leerlo todo ni en orden.' : 'Pick the one that fits what you’re going through. You don’t have to read everything, or in order.')), /*#__PURE__*/React.createElement("div", {
    className: "ella-topics"
  }, topics.map(tp => /*#__PURE__*/React.createElement("button", {
    key: tp.label,
    type: "button",
    className: 'ella-topic' + (tp.count === 0 ? ' is-soon' : ''),
    "data-tone": tp.tone,
    onClick: tp.onClick
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-topic-icon"
  }, tp.icon), /*#__PURE__*/React.createElement("span", {
    className: "ella-topic-body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-topic-label"
  }, tp.label), /*#__PURE__*/React.createElement("span", {
    className: "ella-topic-count"
  }, tp.count === -1 ? (() => {
    const n = typeof window.getSupplementCount === 'function' ? window.getSupplementCount() : 0;
    return n + ' ' + (isEs ? 'suplementos' : 'supplements');
  })() : tp.count === 0 ? isEs ? 'Pronto' : 'Coming soon' : tp.count + ' ' + (tp.count === 1 ? isEs ? 'artículo' : 'article' : isEs ? 'artículos' : 'articles'))), /*#__PURE__*/React.createElement(IconArrow, {
    width: "15",
    height: "15",
    className: "ella-topic-arrow"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "ella-hero-syms ella-topics-syms"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-topics-syms-head"
  }, /*#__PURE__*/React.createElement("strong", null, isEs ? 'O empieza por un síntoma' : 'Or start with a symptom'), /*#__PURE__*/React.createElement("em", null, isEs ? 'Qué es, por qué pasa, qué ayuda y cuándo ir al médico.' : 'What it is, why it happens, what helps, and when to see a doctor.')), /*#__PURE__*/React.createElement("div", null, (typeof getSymptoms === 'function' ? getSymptoms(lang) : []).map(x => /*#__PURE__*/React.createElement("button", {
    key: x.id,
    type: "button",
    className: "ella-hero-sym",
    onClick: () => openSymptom && openSymptom(x.id)
  }, x.name.split(/ (&|y) /)[0])), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-hero-sym is-more",
    onClick: () => openSymptom && openSymptom(null)
  }, isEs ? 'Ver todos' : 'See all', " \u2192"))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-btn ella-btn-secondary",
    onClick: () => setRoute('articles')
  }, isEs ? 'Ver todos los artículos' : 'Browse the whole library', /*#__PURE__*/React.createElement(IconArrow, {
    width: "17",
    height: "17"
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight",
    "data-screen-label": "checkin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-checkin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-checkin-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow"
  }, isEs ? 'CUESTIONARIO' : 'PERSONAL CHECK-IN'), /*#__PURE__*/React.createElement("h2", {
    className: "ella-h2-italic"
  }, isEs ? /*#__PURE__*/React.createElement(React.Fragment, null, "\xBFQuieres una lista ", /*#__PURE__*/React.createElement("em", null, "hecha para ti?")) : /*#__PURE__*/React.createElement(React.Fragment, null, "Want a reading list ", /*#__PURE__*/React.createElement("em", null, "made for you?"))), /*#__PURE__*/React.createElement("p", null, isEs ? 'Cinco preguntas sobre tu etapa, tus síntomas y lo que buscas. Al final te digo por dónde empezar a leer.' : 'Five questions about your stage, your symptoms, and what you need. At the end you’ll know what to read first.'), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-btn ella-btn-primary",
    onClick: () => setRoute('quiz')
  }, isEs ? 'Hacer el cuestionario' : 'Take the check-in', /*#__PURE__*/React.createElement(IconArrow, {
    width: "18",
    height: "18"
  }))), /*#__PURE__*/React.createElement("ol", {
    className: "ella-checkin-steps",
    "aria-label": isEs ? 'Cómo funciona' : 'How it works'
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", null, "01"), isEs ? 'Cuéntame en qué etapa crees que estás' : 'Tell us what stage you think you’re in'), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", null, "02"), isEs ? 'Marca los síntomas que tienes' : 'Check off the symptoms you recognize'), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", null, "03"), isEs ? 'Recibe tus recomendaciones' : 'Get your information'))))), /*#__PURE__*/React.createElement("section", {
    className: "ella-section",
    "data-screen-label": "consultation",
    id: "book"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-consult"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-consult-art"
  }, /*#__PURE__*/React.createElement(Photo, {
    aspect: "4/5",
    tint: "sage",
    alt: isEs ? 'Retrato de Jessica' : 'Warm portrait of Jessica',
    radius: "22px"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ella-consult-badge"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-consult-badge-min"
  }, "30"), /*#__PURE__*/React.createElement("span", {
    className: "ella-consult-badge-lbl"
  }, isEs ? 'min' : 'min'))), /*#__PURE__*/React.createElement("div", {
    className: "ella-consult-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow"
  }, isEs ? 'TRABAJA CONMIGO' : 'WORK WITH ME'), /*#__PURE__*/React.createElement("h2", {
    className: "ella-h2-italic"
  }, isEs ? /*#__PURE__*/React.createElement(React.Fragment, null, "Haz una ", /*#__PURE__*/React.createElement("em", null, "cita"), " de 30 minutos.") : /*#__PURE__*/React.createElement(React.Fragment, null, "Book a 30-minute ", /*#__PURE__*/React.createElement("em", null, "consultation."))), /*#__PURE__*/React.createElement("p", null, isEs ? 'Una llamada contigo y Jessica, en español o en inglés, para hablar de tus síntomas y de cuál es el siguiente paso.' : 'A one-on-one call with Jessica, in English or Spanish, to talk through your symptoms and where to go next.'), /*#__PURE__*/React.createElement("ul", {
    className: "ella-consult-list"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, isEs ? 'Por dónde empezar' : 'Where to start'), isEs ? 'Qué atender primero, según tu etapa' : 'What to prioritize first, based on your stage'), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, isEs ? 'Qué preguntarle a tu médico' : 'What to ask your doctor'), isEs ? 'Que salgas de la cita con respuestas' : 'Leave your appointment with real answers'), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, isEs ? 'Cómo entender los estudios' : 'How to read the research'), isEs ? 'Distinguir la evidencia de la publicidad' : 'Telling evidence apart from marketing')), /*#__PURE__*/React.createElement("p", {
    className: "ella-consult-note"
  }, isEs ? 'Ella comparte información, no consejo médico. Esta llamada no sustituye a tu médico y no incluye diagnósticos ni recetas.' : 'Ella shares information, not medical advice. This call doesn’t replace your doctor and doesn’t include a diagnosis or prescriptions.'), /*#__PURE__*/React.createElement("div", {
    className: "ella-consult-actions"
  }, /*#__PURE__*/React.createElement("a", {
    className: "ella-btn ella-btn-primary",
    href: ELLA_LINKS.booking,
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement(IconCalendar, {
    width: "18",
    height: "18"
  }), isEs ? 'Hacer una cita' : 'Book 30 minutes'), ELLA_LINKS.whatsapp ? /*#__PURE__*/React.createElement("a", {
    className: "ella-btn ella-btn-whatsapp",
    href: ELLA_LINKS.whatsapp,
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement(IconWhatsApp, {
    width: "18",
    height: "18"
  }), isEs ? 'Escríbeme por WhatsApp' : 'Message me on WhatsApp') : null))))));
}
window.Homepage = Homepage;
Object.assign(__ds_scope, { Homepage });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens/Homepage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens/NutritionHub.jsx
try { (() => {
// NutritionHub, nutrition-focused landing. Pre-filters articles to Nutrition
// + Exercise and links out to supplements.

function NutritionHub({
  lang,
  setRoute,
  setArticleId
}) {
  const isEs = lang === 'es';
  const all = getArticles(lang);
  const nutrition = all.filter(a => a.category === 'Nutrition' || a.category === 'Nutrición' || a.category === 'Exercise' || a.category === 'Ejercicio');
  function open(id) {
    setArticleId(id);
    setRoute('article');
    window.scrollTo({
      top: 0
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "04 Nutrition Hub"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-section-head",
    style: {
      maxWidth: 820,
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow",
    style: {
      color: 'var(--ella-sage-700)'
    }
  }, isEs ? 'ALIMENTACIÓN Y MOVIMIENTO' : 'FOOD AND MOVEMENT'), /*#__PURE__*/React.createElement("h1", {
    className: "ella-h2-italic ella-page-title"
  }, isEs ? 'Cómo cuidar tu cuerpo ahora' : 'Caring for your body now'), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.6,
      color: 'var(--ella-clay-700)',
      marginTop: 16,
      maxWidth: '62ch'
    }
  }, isEs ? 'Después de los 45 perdemos músculo más rápido, y el músculo es lo que protege tus huesos, tu metabolismo y tu independencia. Sin dietas, solo lo que tu cuerpo necesita más en esta etapa.' : 'After 45 we lose muscle faster, and muscle is what protects your bones, your metabolism, and your independence. No meal plans, just what your body needs more of now.')))), /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 27,
      color: 'var(--ella-clay-900)',
      margin: 0
    }
  }, isEs ? 'Artículos' : 'Reading')), /*#__PURE__*/React.createElement("div", {
    className: "ella-article-grid"
  }, nutrition.map(a => /*#__PURE__*/React.createElement("article", {
    key: a.id,
    className: "ella-article-card",
    "data-tone": a.tone
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-article-card-inner",
    onClick: () => open(a.id)
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-article-card-cat"
  }, a.category, " \xB7 ", a.readTime), /*#__PURE__*/React.createElement("h3", {
    className: "ella-article-card-title"
  }, a.title), /*#__PURE__*/React.createElement("p", {
    className: "ella-article-card-lede"
  }, a.lede), /*#__PURE__*/React.createElement("span", {
    className: "ella-article-card-cta"
  }, isEs ? 'Leer' : 'Read', " ", /*#__PURE__*/React.createElement(IconArrow, {
    width: "14",
    height: "14"
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-btn ella-btn-primary",
    onClick: () => setRoute('supplements')
  }, isEs ? 'Ver suplementos recomendados' : 'See recommended supplements', /*#__PURE__*/React.createElement(IconArrow, {
    width: "18",
    height: "18"
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-btn ella-btn-text",
    onClick: () => setRoute('resources')
  }, isEs ? 'Recursos y enlaces →' : 'Resources and links →')))));
}
window.NutritionHub = NutritionHub;
Object.assign(__ds_scope, { NutritionHub });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens/NutritionHub.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens/Privacy.jsx
try { (() => {
// Privacy, short plain-language note. Reflects how the site actually works today:
// no accounts, no tracking, check-in answers stay in the browser.

function Privacy({
  lang,
  setRoute
}) {
  const isEs = lang === 'es';
  const email = window.ELLA_LINKS && window.ELLA_LINKS.email || 'info@ellabienestar.com';
  const sections = isEs ? [{
    h: 'Lo que guardo',
    p: 'Solo lo que tú me mandas: tu correo si te suscribes a la nota semanal, y tu nombre y mensaje si me escribes o haces una cita. Lo uso únicamente para mandarte la nota o contestarte.'
  }, {
    h: 'Lo que no guardo',
    p: 'Tus respuestas del cuestionario no se guardan ni se envían a ningún lado. Se quedan en tu navegador y desaparecen cuando cierras la página. El sitio no tiene cuentas ni publicidad.'
  }, {
    h: 'No vendo tus datos',
    p: 'Nunca vendo, rento ni comparto tu información con nadie para fines de publicidad.'
  }, {
    h: 'Sitios externos',
    p: 'Algunos enlaces llevan a otros sitios, como la página de citas o fuentes médicas. Cada uno tiene su propia política de privacidad.'
  }, {
    h: 'Borrar tus datos',
    p: 'Si quieres darte de baja o que borre tu información, escríbeme y lo hago.'
  }] : [{
    h: 'What I keep',
    p: 'Only what you send me: your email if you sign up for the weekly note, and your name and message if you write to me or book a call. I use it only to send you the note or reply to you.'
  }, {
    h: 'What I don’t keep',
    p: 'Your check-in answers aren’t saved or sent anywhere. They stay in your browser and disappear when you close the page. The site has no accounts and no ads.'
  }, {
    h: 'I don’t sell your data',
    p: 'I never sell, rent, or share your information with anyone for advertising.'
  }, {
    h: 'Other websites',
    p: 'Some links go to other sites, like the booking page or medical sources. Each one has its own privacy policy.'
  }, {
    h: 'Deleting your data',
    p: 'If you want to unsubscribe or have your information deleted, email me and I’ll take care of it.'
  }];
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "09 Privacy"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-privacy"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow"
  }, isEs ? 'PRIVACIDAD' : 'PRIVACY'), /*#__PURE__*/React.createElement("h1", {
    className: "ella-page-title"
  }, isEs ? 'Tu información, en pocas palabras.' : 'Your information, in plain terms.'), /*#__PURE__*/React.createElement("div", {
    className: "ella-privacy-list"
  }, sections.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.h,
    className: "ella-privacy-item"
  }, /*#__PURE__*/React.createElement("h2", null, s.h), /*#__PURE__*/React.createElement("p", null, s.p)))), /*#__PURE__*/React.createElement("p", {
    className: "ella-privacy-contact"
  }, isEs ? 'Dudas: ' : 'Questions: ', /*#__PURE__*/React.createElement("a", {
    href: 'mailto:' + email
  }, email)), /*#__PURE__*/React.createElement("p", {
    className: "ella-privacy-updated"
  }, isEs ? 'Actualizado en octubre de 2026' : 'Updated October 2026')))));
}
window.Privacy = Privacy;
Object.assign(__ds_scope, { Privacy });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens/Privacy.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens/Resources.jsx
try { (() => {
// Resources, curated external links organized by topic. Mirrors the
// "Click here for..." slots in Jessica's draft. Every link is an outside
// authority, Ella points, it doesn't republish.

function Resources({
  lang,
  setRoute
}) {
  const t = useT(lang);
  const isEs = lang === 'es';
  const groups = isEs ? [{
    tone: 'rose',
    title: 'Empieza aquí',
    note: 'Lo básico, de fuentes que puedes mencionar en tu cita.',
    links: [{
      label: 'The Menopause Society',
      desc: 'La principal autoridad médica en menopausia',
      href: 'https://www.menopause.org/'
    }, {
      label: 'Oficina para la Salud de la Mujer',
      desc: 'Guía del gobierno de EE. UU., clara y fácil de entender',
      href: 'https://www.womenshealth.gov/menopause'
    }, {
      label: 'ACOG',
      desc: 'Colegio Estadounidense de Obstetras y Ginecólogos',
      href: 'https://www.acog.org/womens-health'
    }]
  }, {
    tone: 'sage',
    title: 'Huesos y suplementos',
    note: 'Hojas informativas basadas en evidencia, no publicidad.',
    links: [{
      label: 'NIH: suplementos alimenticios',
      desc: 'Calcio, vitamina D, K2, omega-3, magnesio',
      href: 'https://ods.od.nih.gov/factsheets/list-all/'
    }, {
      label: 'Bone Health & Osteoporosis Foundation',
      desc: 'Densidad de los huesos y cómo prevenir fracturas',
      href: 'https://www.bonehealthandosteoporosis.org/'
    }, {
      label: 'NIH: Calcio',
      desc: 'Cuánto necesitas y dónde encontrarlo',
      href: 'https://ods.od.nih.gov/factsheets/Calcium-Consumer/'
    }]
  }, {
    tone: 'rose',
    title: 'Corazón y ejercicio',
    note: 'Los 150 minutos a la semana, explicados.',
    links: [{
      label: 'American Heart Association',
      desc: 'Riesgo cardiovascular en la menopausia',
      href: 'https://www.heart.org/en/health-topics/consumer-healthcare/what-is-cardiovascular-disease/menopause-and-heart-disease'
    }, {
      label: 'Guía de actividad física de EE. UU.',
      desc: 'La recomendación oficial de ejercicio',
      href: 'https://health.gov/our-work/nutrition-physical-activity/physical-activity-guidelines'
    }, {
      label: 'Dieta mediterránea',
      desc: 'La forma de comer con más respaldo científico',
      href: 'https://www.nhlbi.nih.gov/education/dash-eating-plan'
    }]
  }, {
    tone: 'plum',
    title: 'Terapia hormonal (TRH)',
    note: 'Fuentes confiables para la conversación más importante.',
    links: [{
      label: 'The Menopause Society: TRH',
      desc: 'Postura oficial sobre la terapia hormonal',
      href: 'https://www.menopause.org/for-women'
    }, {
      label: 'NIA: Terapia hormonal',
      desc: 'Instituto Nacional del Envejecimiento',
      href: 'https://www.nia.nih.gov/health/menopause'
    }, {
      label: 'Buscar un especialista certificado',
      desc: 'Directorio de especialistas certificados en menopausia',
      href: 'https://www.menopause.org/for-women/find-a-menopause-practitioner'
    }]
  }, {
    tone: 'sage',
    title: 'En español',
    note: 'Recursos confiables en nuestro idioma. Por eso existe Ella.',
    links: [{
      label: 'MedlinePlus en español',
      desc: 'Biblioteca Nacional de Medicina de EE. UU.',
      href: 'https://medlineplus.gov/spanish/menopause.html'
    }, {
      label: 'Salud de la mujer',
      desc: 'La versión en español de womenshealth.gov',
      href: 'https://espanol.womenshealth.gov/menopause'
    }, {
      label: 'CDC en español',
      desc: 'Salud preventiva y tamizajes',
      href: 'https://www.cdc.gov/spanish/'
    }]
  }, {
    tone: 'plum',
    title: 'Salud mental',
    note: 'Si esta etapa se está volviendo demasiado pesada, pide ayuda.',
    links: [{
      label: 'Línea 988 de Prevención del Suicidio y Crisis',
      desc: 'Disponible 24/7, con atención en español al marcar 988',
      href: 'https://988lifeline.org/es/'
    }, {
      label: 'NIMH',
      desc: 'Instituto Nacional de Salud Mental',
      href: 'https://www.nimh.nih.gov/health/topics/women-and-mental-health'
    }, {
      label: 'Encontrar terapeuta',
      desc: 'Directorio con filtros por idioma y seguro médico',
      href: 'https://www.psychologytoday.com/us/therapists'
    }]
  }] : [{
    tone: 'rose',
    title: 'Start here',
    note: 'The basics, from sources you can cite in an appointment.',
    links: [{
      label: 'The Menopause Society',
      desc: 'The leading clinical authority on menopause',
      href: 'https://www.menopause.org/'
    }, {
      label: 'Office on Women\u2019s Health',
      desc: 'U.S. government guidance, clear and jargon-free',
      href: 'https://www.womenshealth.gov/menopause'
    }, {
      label: 'ACOG',
      desc: 'American College of Obstetricians and Gynecologists',
      href: 'https://www.acog.org/womens-health'
    }]
  }, {
    tone: 'sage',
    title: 'Bones and supplements',
    note: 'Evidence-based fact sheets, not marketing.',
    links: [{
      label: 'NIH: Dietary Supplements',
      desc: 'Calcium, vitamin D, K2, omega-3, magnesium',
      href: 'https://ods.od.nih.gov/factsheets/list-all/'
    }, {
      label: 'Bone Health & Osteoporosis Foundation',
      desc: 'Bone density, fracture prevention',
      href: 'https://www.bonehealthandosteoporosis.org/'
    }, {
      label: 'NIH: Calcium',
      desc: 'How much you need and where to get it',
      href: 'https://ods.od.nih.gov/factsheets/Calcium-Consumer/'
    }]
  }, {
    tone: 'rose',
    title: 'Heart and exercise',
    note: 'The 150 minutes a week, explained.',
    links: [{
      label: 'American Heart Association',
      desc: 'Cardiovascular risk through menopause',
      href: 'https://www.heart.org/en/health-topics/consumer-healthcare/what-is-cardiovascular-disease/menopause-and-heart-disease'
    }, {
      label: 'U.S. Physical Activity Guidelines',
      desc: 'Where the official exercise recommendation comes from',
      href: 'https://health.gov/our-work/nutrition-physical-activity/physical-activity-guidelines'
    }, {
      label: 'Heart-healthy eating',
      desc: 'The best-supported dietary pattern',
      href: 'https://www.nhlbi.nih.gov/education/dash-eating-plan'
    }]
  }, {
    tone: 'plum',
    title: 'Hormone therapy (HRT)',
    note: 'Trusted sources for the most important conversation.',
    links: [{
      label: 'The Menopause Society: HRT',
      desc: 'Official position on hormone therapy',
      href: 'https://www.menopause.org/for-women'
    }, {
      label: 'NIA: Hormone therapy',
      desc: 'National Institute on Aging',
      href: 'https://www.nia.nih.gov/health/menopause'
    }, {
      label: 'Find a certified practitioner',
      desc: 'Directory of menopause-certified providers',
      href: 'https://www.menopause.org/for-women/find-a-menopause-practitioner'
    }]
  }, {
    tone: 'sage',
    title: 'En español',
    note: 'Trusted resources in Spanish, the reason Ella exists.',
    links: [{
      label: 'MedlinePlus en español',
      desc: 'U.S. National Library of Medicine',
      href: 'https://medlineplus.gov/spanish/menopause.html'
    }, {
      label: 'Salud de la mujer',
      desc: 'Spanish-language womenshealth.gov',
      href: 'https://espanol.womenshealth.gov/menopause'
    }, {
      label: 'CDC en español',
      desc: 'Preventive health and screenings',
      href: 'https://www.cdc.gov/spanish/'
    }]
  }, {
    tone: 'plum',
    title: 'Mental health',
    note: 'If this stage feels heavier than hard, please reach out.',
    links: [{
      label: '988 Suicide & Crisis Lifeline',
      desc: 'Available 24/7, Spanish available',
      href: 'https://988lifeline.org/'
    }, {
      label: 'NIMH',
      desc: 'National Institute of Mental Health',
      href: 'https://www.nimh.nih.gov/health/topics/women-and-mental-health'
    }, {
      label: 'Find a therapist',
      desc: 'Directory filterable by language and insurance',
      href: 'https://www.psychologytoday.com/us/therapists'
    }]
  }];
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "05 Resources"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 780
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow"
  }, isEs ? 'RECURSOS' : 'RESOURCES'), /*#__PURE__*/React.createElement("h1", {
    className: "ella-h2-italic ella-page-title",
    style: {
      marginTop: 12
    }
  }, isEs ? 'Dónde leer más.' : 'Where to read further.')), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "ella-gloss-callout",
    onClick: e => {
      e.preventDefault();
      setRoute('glossary');
      window.scrollTo({
        top: 0
      });
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, isEs ? 'Glosario español–inglés' : 'Spanish–English glossary'), isEs ? 'Los términos que vas a escuchar en la cita, en los dos idiomas.' : 'The terms you’ll hear at the doctor, in both languages.'), /*#__PURE__*/React.createElement(IconArrow, {
    width: "16",
    height: "16"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ella-resource-grid",
    style: {
      marginTop: 30
    }
  }, groups.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.title,
    className: "ella-resource-col",
    "data-tone": g.tone
  }, /*#__PURE__*/React.createElement("h2", {
    className: "ella-resource-title"
  }, g.title), /*#__PURE__*/React.createElement("p", {
    className: "ella-resource-note"
  }, g.note), /*#__PURE__*/React.createElement("ul", {
    className: "ella-resource-list"
  }, g.links.map(l => /*#__PURE__*/React.createElement("li", {
    key: l.href
  }, /*#__PURE__*/React.createElement("a", {
    href: l.href,
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-resource-label"
  }, l.label, /*#__PURE__*/React.createElement(IconArrow, {
    width: "14",
    height: "14",
    style: {
      transform: 'rotate(-45deg)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "ella-resource-desc"
  }, l.desc)))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 44,
      padding: '22px 26px',
      background: 'var(--ella-cream-100)',
      borderRadius: 16,
      fontSize: 14.5,
      color: 'var(--ella-clay-700)',
      fontStyle: 'italic',
      lineHeight: 1.6,
      maxWidth: 760
    }
  }, isEs ? 'Ella no controla el contenido de estos sitios y no gana nada por recomendarlos. Comparto información, no consejo médico. Habla con tu médico sobre tu caso.' : 'Ella doesn\u2019t control the content on these sites and earns nothing from linking them. I share information, not personalized medical advice. Always talk to your own doctor about your situation.'), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-btn ella-btn-text",
    onClick: () => setRoute('articles')
  }, isEs ? 'Ver los artículos de Ella →' : 'Browse Ella\u2019s library →')))));
}
window.Resources = Resources;
Object.assign(__ds_scope, { Resources });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens/Resources.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens/SupplementsHub.jsx
try { (() => {
// Supplements hub, list of supplements Ella discusses. Click any card to
// expand the full "why", dosing notes, and the research backing it up.

// The list lives outside the component so other pages can count it.
function buildSupplementItems(isEs) {
  return [{
    name: 'Creatine',
    food: isEs ? 'Carne roja, arenque, salmón. Para sacar 3 g solo de la comida necesitarías casi medio kilo de carne al día, por eso la mayoría toma suplemento.' : 'Red meat, herring, salmon. Getting 3 g from food alone means roughly a pound of beef a day, which is why most women supplement.',
    form: isEs ? 'Monohidrato de creatina. Es la más barata y la que se usó en casi todos los estudios. Las mezclas y la "HCL" cuestan más y no tienen mejor evidencia.' : 'Creatine monohydrate. It is the cheapest form and the one nearly every study used. Blends and "HCL" versions cost more without better evidence.',
    caution: isEs ? 'Si tienes alguna enfermedad de los riñones, pregunta primero. Al principio puedes subir medio kilo: es agua dentro del músculo, no grasa.' : 'Ask first if you have kidney disease. Expect a pound or two of water weight early. That is water inside the muscle, not fat.',
    group: 'muscle',
    tag: isEs ? 'M\u00daSCULO \u00b7 FUERZA' : 'MUSCLE \u00b7 STRENGTH',
    desc: isEs ? 'Ayuda a mantener la masa muscular y la fuerza, junto con las pesas.' : 'Supports muscle mass and strength, alongside strength training.',
    tone: 'rose',
    why: isEs ? ['Después de la menopausia se pierde músculo más rápido. La creatina, junto con las pesas, ayuda a mantener el músculo y la fuerza.', 'Estudios recientes sugieren que también ayuda con la energía y la memoria en mujeres de mediana edad.'] : ['Muscle loss speeds up after menopause. Creatine, combined with strength training, helps maintain muscle and strength.', 'Newer research suggests added benefits for energy and cognitive function in midlife women.'],
    dose: isEs ? '~3–5 g al día de monohidrato de creatina.' : '~3\u20135 g a day of creatine monohydrate.',
    research: isEs ? 'Resumen con evidencia de los Institutos Nacionales de Salud (NIH).' : 'Evidence summary from the U.S. National Institutes of Health (NIH).',
    source: {
      label: 'NIH Office of Dietary Supplements',
      href: 'https://ods.od.nih.gov/factsheets/'
    }
  }, {
    name: 'Omega-3',
    food: isEs ? 'Salmón, sardinas, macarela, anchoas. Con dos o tres porciones a la semana, la mayoría no necesita cápsulas.' : 'Salmon, sardines, mackerel, anchovies. Two or three servings a week covers most people without a capsule.',
    form: isEs ? 'Lee la parte de atrás, no la de enfrente. "Aceite de pescado 1000 mg" es lo que pesa la cápsula; busca cuánto EPA + DHA trae y que tenga pruebas independientes de metales pesados.' : 'Read the back, not the front. "Fish oil 1000 mg" is the capsule weight; you want the EPA + DHA numbers. Look for third-party purity testing for heavy metals.',
    caution: isEs ? 'En dosis altas puede hacer la sangre más líquida. Avísale a tu médico si tomas anticoagulantes o te van a operar.' : 'High doses have a mild blood-thinning effect. Tell your doctor if you take blood thinners or have surgery coming up.',
    group: 'inflam',
    tag: isEs ? 'CORAZ\u00d3N \u00b7 CEREBRO' : 'HEART \u00b7 BRAIN',
    desc: isEs ? 'Antiinflamatorio. Ayuda al corazón, al cerebro y al estado de ánimo.' : 'Anti-inflammatory. Supports heart, brain, and mood.',
    tone: 'sage',
    why: isEs ? ['El estrógeno protege el corazón; cuando baja, sube el riesgo cardiovascular. Los omega-3 (EPA/DHA) ayudan a controlar los triglicéridos y la inflamación.', 'El DHA es parte de la estructura del cerebro y puede ayudar con la memoria y el estado de ánimo en esta etapa.', 'También pueden aliviar la rigidez en las articulaciones que muchas mujeres notan en la perimenopausia.'] : ['Estrogen protects the heart, as it drops, cardiovascular risk rises. Omega-3s (EPA/DHA) help keep triglycerides and inflammation in check.', 'DHA is a structural building block of the brain and may support memory and mood through the transition.', 'They can also ease the joint stiffness many women notice in perimenopause.'],
    dose: isEs ? 'Busca ~1–2 g de EPA + DHA en total al día, con comida.' : 'Aim for ~1\u20132 g combined EPA + DHA per day, with food.',
    research: isEs ? 'Resumen con evidencia de los Institutos Nacionales de Salud (NIH).' : 'Evidence summary from the U.S. National Institutes of Health (NIH).',
    source: {
      label: 'NIH Office of Dietary Supplements',
      href: 'https://ods.od.nih.gov/factsheets/Omega3FattyAcids-Consumer/'
    }
  }, {
    name: 'Vitamin D3',
    food: isEs ? 'Pescado graso, yema de huevo, leche fortificada. Con la comida casi nunca alcanza: la fuente principal es el sol, y en invierno baja.' : 'Fatty fish, egg yolks, fortified milk. Food rarely gets you there on its own. Sunlight is the main source, and it drops off in winter.',
    form: isEs ? 'D3 (colecalciferol), no D2. Tómala con una comida que tenga grasa, junto con K2.' : 'D3 (cholecalciferol), not D2. Take it with a meal that contains fat, and pair it with K2.',
    caution: isEs ? 'Se guarda en la grasa del cuerpo y se acumula. Es la que conviene medir antes y después, en vez de adivinar.' : 'Fat-soluble, so it builds up in the body. This is the one to test before and after rather than guess at.',
    group: 'muscle',
    tag: isEs ? 'HUESOS \u00b7 INMUNIDAD' : 'BONES \u00b7 IMMUNITY',
    desc: isEs ? 'A la mayoría de las mujeres de 45+ les falta. Pídele a tu médico que te la mida.' : 'Most women 45+ are deficient. Ask your doctor to test your levels first.',
    tone: 'sage',
    why: isEs ? ['Después de la menopausia se pierde hueso más rápido. La vitamina D es necesaria para absorber el calcio y proteger los huesos.', 'Tenerla baja se relaciona con cansancio, dolor muscular y desánimo, síntomas que se confunden fácilmente con la menopausia.', 'Es muy común que falte en mujeres mayores de 45, sobre todo donde hay poco sol.'] : ['Bone loss speeds up after menopause. Vitamin D is required to absorb calcium and protect your bones.', 'Low levels are linked to fatigue, muscle aches, and low mood, symptoms easy to mistake for menopause itself.', 'Deficiency is very common in women over 45, especially in low-sunlight climates.'],
    dose: isEs ? 'Primero hazte un análisis de sangre. Muchos médicos recomiendan 1000–2000 UI al día según el resultado.' : 'Get a blood test first. Many providers suggest 1000\u20132000 IU/day depending on your result.',
    research: isEs ? 'Hoja informativa basada en evidencia del NIH.' : 'Evidence-based fact sheet from the NIH.',
    source: {
      label: 'NIH Office of Dietary Supplements',
      href: 'https://ods.od.nih.gov/factsheets/VitaminD-Consumer/'
    }
  }, {
    name: 'Vitamin K2',
    food: isEs ? 'Natto, quesos añejos, yema de huevo. Las verduras de hoja verde tienen K1, que es parecida pero no es lo mismo.' : 'Natto, aged cheeses, egg yolks. Dark leafy greens give you K1, which is related but not the same thing.',
    form: isEs ? 'La MK-7 dura activa mucho más tiempo que la MK-4. Muchas veces ya viene en un buen suplemento de D3, así que revisa antes de comprar las dos.' : 'MK-7 stays active in the body far longer than MK-4. It is often already included in a good D3 supplement, so check before buying both.',
    caution: isEs ? 'Si tomas warfarina, no empieces la K2 sin hablar con tu médico. La vitamina K cambia directamente cómo funciona ese medicamento.' : 'If you take warfarin, do not add K2 without talking to your doctor. Vitamin K directly affects how that medication works.',
    group: 'muscle',
    tag: isEs ? 'HUESOS' : 'BONES',
    desc: isEs ? 'Trabaja junto con la vitamina D para mandar el calcio a donde debe ir.' : 'Pairs with Vit D to get calcium where it belongs.',
    tone: 'plum',
    why: isEs ? ['La vitamina K ayuda a mandar el calcio a los huesos y a mantenerlo fuera de las arterias.', 'Funciona junto con la vitamina D, así que tiene más sentido tomarlas juntas.'] : ['Vitamin K helps direct calcium into your bones and keep it out of your arteries.', 'It works hand-in-hand with vitamin D, taking them together makes more sense than either alone.'],
    dose: isEs ? 'Muchas veces viene combinada con la vitamina D en un solo suplemento (como K2/MK-7).' : 'Often combined with vitamin D in a single supplement (K2/MK-7 form).',
    research: isEs ? 'Hoja informativa basada en evidencia del NIH.' : 'Evidence-based fact sheet from the NIH.',
    source: {
      label: 'NIH Office of Dietary Supplements',
      href: 'https://ods.od.nih.gov/factsheets/VitaminK-Consumer/'
    }
  }, {
    name: 'Magnesium L-Threonate',
    food: isEs ? 'Semillas de calabaza, almendras, espinacas, frijoles negros, chocolate amargo.' : 'Pumpkin seeds, almonds, spinach, black beans, dark chocolate.',
    form: isEs ? 'El L-treonato es el que se ha estudiado para el cerebro y el sueño. El glicinato es más suave y más barato para uso general. Evita el óxido de magnesio: se absorbe mal y sirve más que nada como laxante.' : 'L-threonate is the one studied for brain and sleep. Glycinate is gentler and cheaper for general use. Skip magnesium oxide. It is poorly absorbed and mostly a laxative.',
    caution: isEs ? 'Puede aflojar el estómago; empieza con una dosis baja. Si tienes alguna enfermedad de los riñones, pregunta primero.' : 'Can loosen stools, so start at a low dose. Ask first if you have kidney disease.',
    group: 'calm',
    tag: isEs ? 'SUE\u00d1O \u00b7 ESTR\u00c9S' : 'SLEEP \u00b7 STRESS',
    desc: isEs ? 'Llega mejor al cerebro. Ayuda con el sueño, la calma y la memoria.' : 'Crosses into the brain better. Supports sleep, calm, and memory.',
    tone: 'plum',
    why: isEs ? ['El magnesio ayuda a regular el sistema nervioso, a relajar los músculos y a dormir, tres cosas que la menopausia suele alterar.', 'El L-treonato llega al cerebro mejor que otras formas, por eso se relaciona más con la memoria y la concentración.', 'También ayuda a los huesos y a controlar el azúcar en la sangre.'] : ['Magnesium helps regulate the nervous system, muscle relaxation, and sleep, three things menopause tends to disrupt.', 'The L-threonate form crosses the blood-brain barrier better than other forms, so it\u2019s more associated with cognitive and memory benefits.', 'It also plays a role in bone health and blood-sugar regulation.'],
    dose: isEs ? 'Sigue la dosis del producto; suele ser ~1–2 g al día de magnesio L-treonato.' : 'Follow the product dosing, typically ~1\u20132 g a day of magnesium L-threonate.',
    research: isEs ? 'Hoja informativa basada en evidencia del NIH.' : 'Evidence-based fact sheet from the NIH.',
    source: {
      label: 'NIH Office of Dietary Supplements',
      href: 'https://ods.od.nih.gov/factsheets/Magnesium-Consumer/'
    }
  }, {
    name: 'Turmeric',
    food: isEs ? 'Cúrcuma en la comida, siempre con pimienta negra y un poco de grasa: así se absorbe.' : 'Turmeric in cooking, always with black pepper and a little fat. That is what makes it absorbable.',
    form: isEs ? 'Un extracto estandarizado de curcumina con piperina, o en forma de fosfolípido. Las cápsulas de "cúrcuma en polvo" son casi puro relleno.' : 'A standardized curcumin extract with piperine, or a phospholipid form. Plain "turmeric powder" capsules are mostly filler.',
    caution: isEs ? 'En dosis altas hace la sangre más líquida y puede caer pesada con el estómago vacío. Evítala si tienes piedras en la vesícula.' : 'Mildly blood-thinning at high doses and hard on an empty stomach. Avoid it if you have gallstones.',
    group: 'inflam',
    tag: isEs ? 'INFLAMACI\u00d3N \u00b7 ARTICULACIONES' : 'INFLAMMATION \u00b7 JOINTS',
    desc: isEs ? 'Antiinflamatorio natural. Ayuda con el dolor y la inflamación de las articulaciones.' : 'Natural anti-inflammatory. Helps with joint pain and swelling.',
    tone: 'sage',
    why: isEs ? ['La curcumina, el compuesto activo de la cúrcuma, es antiinflamatoria y puede ayudar con el dolor de articulaciones tan común en la perimenopausia.', 'Algunos estudios sugieren que también ayuda al estado de ánimo y al corazón.'] : ['Curcumin, turmeric\u2019s active compound, has anti-inflammatory properties that may help with the joint pain common in perimenopause.', 'Some studies suggest added benefits for mood and cardiovascular health.'],
    dose: isEs ? 'Busca curcumina con piperina o una forma que se absorba bien, ~500–1000 mg al día.' : 'Look for curcumin with piperine or a bioavailable form, ~500\u20131000 mg a day.',
    research: isEs ? 'La evidencia es prometedora, pero todavía es poca. Habla con tu médico.' : 'Evidence is promising but still limited; talk to your doctor.',
    source: null
  }, {
    name: 'Fiber',
    food: isEs ? 'Frijoles, lentejas, avena, moras, chía, verduras. Aquí la comida le gana al suplemento.' : 'Beans, lentils, oats, berries, chia, vegetables. This is the one where food genuinely beats a supplement.',
    form: isEs ? 'Si tomas suplemento, la cáscara de psyllium es la que tiene más evidencia. Tómala con un vaso grande de agua.' : 'If you do supplement, psyllium husk has the most evidence behind it. Take it with a full glass of water.',
    caution: isEs ? 'Súbele poco a poco o te vas a inflamar. Tómala un par de horas antes o después de cualquier medicamento.' : 'Increase slowly or you will bloat. Take it a couple of hours apart from any medication so it does not block absorption.',
    group: 'calm',
    tag: isEs ? 'DIGESTI\u00d3N \u00b7 HORMONAS' : 'GUT \u00b7 HORMONES',
    desc: isEs ? 'La meta es 25 g al día. Ayuda a que el cuerpo elimine bien el estrógeno.' : 'Aim for 25 g a day. Helps estrogen leave the body the way it should.',
    tone: 'sage',
    why: isEs ? ['La fibra alimenta a las bacterias del intestino que ayudan a procesar y eliminar el estrógeno de forma equilibrada.', 'Ayuda a controlar el azúcar en la sangre y a sentirte llena, algo útil cuando el metabolismo cambia en la menopausia.', 'Ayuda al corazón porque ayuda a controlar el colesterol.'] : ['Fiber feeds the gut bacteria that help metabolize and clear estrogen in a balanced way.', 'It steadies blood sugar and fullness, helpful when metabolism shifts in menopause.', 'It supports heart health by helping manage cholesterol.'],
    dose: isEs ? 'La meta es ~25 g al día, de preferencia de la comida; un suplemento puede completar lo que falte.' : 'Aim for ~25 g a day, ideally from food; a supplement can fill the gap.',
    research: isEs ? 'Recomendaci\u00f3n general de salud p\u00fablica.' : 'General public-health guidance.',
    source: null
  }, {
    name: 'Probiotics',
    food: isEs ? 'Yogur, kéfir, chucrut, kimchi, miso. Comer fermentados todos los días hace más que una cápsula de vez en cuando.' : 'Yogurt, kefir, sauerkraut, kimchi, miso. Fermented food daily does more than an occasional capsule.',
    form: isEs ? 'Busca cepas con nombre, no solo "mezcla probiótica". Fíjate en las UFC y en la fecha de vencimiento: los cultivos vivos se mueren en el anaquel.' : 'Look for named strains, not just "probiotic blend." The CFU count and an expiry date matter, because live cultures die on the shelf.',
    caution: isEs ? 'Si tienes las defensas bajas, consulta primero.' : 'Check with your doctor first if you are immunocompromised.',
    group: 'calm',
    tag: isEs ? 'DIGESTI\u00d3N \u00b7 INMUNIDAD' : 'GUT \u00b7 IMMUNITY',
    desc: isEs ? 'Ayuda a la salud del intestino, que influye en las hormonas, las defensas y el estado de ánimo.' : 'Supports gut health, which influences hormones, immunity, and mood.',
    tone: 'plum',
    why: isEs ? ['Las bacterias del intestino ayudan a procesar el estrógeno y pueden influir en cómo te sientes en esta etapa.', 'Un intestino sano también se relaciona con mejores defensas y menos inflamación.'] : ['The gut microbiome helps metabolize estrogen and can influence how the body feels through the transition.', 'A balanced gut is also linked to better immunity and lower inflammation.'],
    dose: isEs ? 'Busca una cepa con estudios que la respalden y sigue la dosis del producto.' : 'Look for a well-researched strain, follow the product\u2019s dosing.',
    research: isEs ? 'La evidencia cambia según la cepa; habla con tu médico.' : 'Evidence varies by strain; talk to your doctor.',
    source: null
  }];
}
window.getSupplementCount = () => buildSupplementItems(false).length;
window.getSupplementItems = isEs => buildSupplementItems(isEs);
function SupplementsHub({
  lang,
  setRoute
}) {
  const t = useT(lang);
  const isEs = lang === 'es';
  const [open, setOpen] = React.useState(null); // index of open supplement

  const items = buildSupplementItems(isEs);
  const GROUPS = isEs ? [{
    key: 'muscle',
    tone: 'rose',
    title: 'Músculo y hueso',
    note: 'Lo que protege la fuerza y los huesos cuando baja el estrógeno.'
  }, {
    key: 'inflam',
    tone: 'sage',
    title: 'Inflamación y corazón',
    note: 'Cuando baja el estrógeno, la inflamación aumenta. Estos ayudan a controlarla.'
  }, {
    key: 'calm',
    tone: 'plum',
    title: 'Intestino, sueño y ánimo',
    note: 'El intestino procesa el estrógeno, y dormir bien lo cambia todo.'
  }] : [{
    key: 'muscle',
    tone: 'rose',
    title: 'Muscle & bone',
    note: 'What protects strength and bone density once estrogen drops.'
  }, {
    key: 'inflam',
    tone: 'sage',
    title: 'Inflammation & heart',
    note: 'Low estrogen means unchecked inflammation. These help keep it in check.'
  }, {
    key: 'calm',
    tone: 'plum',
    title: 'Gut, sleep & mood',
    note: 'The gut metabolizes estrogen, and sleep changes everything.'
  }];
  const PRINCIPLES = isEs ? [{
    t: 'Primero la comida',
    d: 'Los suplementos ayudan con lo que falta, no sustituyen la comida. Cuando un alimento sirve, te lo digo.'
  }, {
    t: 'La forma importa tanto como el nombre',
    d: 'El óxido de magnesio y el glicinato no son lo mismo. Te digo cuál buscar.'
  }, {
    t: 'Si hay poca evidencia, te lo digo',
    d: 'Algunos están bien estudiados. Otros son prometedores, pero todavía falta investigación. Mereces saber cuál es cuál.'
  }] : [{
    t: 'Food first, always',
    d: 'Supplements fill gaps, they don\u2019t replace a plate. Where a food source works, I say so.'
  }, {
    t: 'The form matters as much as the name',
    d: 'Magnesium oxide and magnesium glycinate are not the same purchase. I tell you which form to look for.'
  }, {
    t: 'If the evidence is thin, I say so',
    d: 'Some of these are well established. Others are promising and early. You deserve to know which is which.'
  }];
  const FAQS = isEs ? [{
    q: '¿Necesito suplementos si como bien?',
    a: 'La comida es la base. Pero a esta edad es común que falten algunas cosas aunque comas bien: vitamina D en los meses con poco sol, omega-3 si no comes pescado dos o tres veces a la semana, magnesio si vives con mucho estrés, y fibra (casi todas comemos la mitad de lo recomendado). Un análisis de sangre te dice más que adivinar.'
  }, {
    q: '¿Cómo sé si un suplemento es bueno?',
    a: 'Fíjate en tres cosas. La forma: D3 y no D2, magnesio glicinato o L-treonato y no óxido, y que diga cuánto EPA y DHA trae. La dosis, comparada con la que se usó en los estudios. Y los ingredientes extra: pocos y que los reconozcas. Las marcas serias publican análisis de laboratorios independientes.'
  }, {
    q: '¿En cuánto tiempo voy a notar algo?',
    a: 'Depende. El magnesio para dormir se puede notar en días. La vitamina D tarda de seis a ocho semanas en subir en la sangre. El omega-3 para la inflamación, de ocho a doce. Ser constante importa más que la dosis.'
  }, {
    q: '¿Los puedo tomar con mis medicamentos?',
    a: 'Algunos sí interactúan: la K2 con la warfarina, el omega-3 y la cúrcuma con los anticoagulantes, y la fibra con el horario de casi cualquier pastilla. Lleva los frascos a tu próxima cita y revísalos con tu médico.'
  }] : [{
    q: 'Do I need supplements if I eat well?',
    a: 'Food is the base. But a few gaps are common at this stage even on a good diet: vitamin D in low-sunlight months, omega-3 if you don\u2019t eat oily fish two or three times a week, magnesium under sustained stress, and fiber (most people get about half of what\u2019s recommended). A blood test tells you more than guessing.'
  }, {
    q: 'How do I tell a good supplement from a bad one?',
    a: 'Three checks. The form of the active ingredient: D3 not D2, magnesium glycinate or L-threonate rather than oxide, EPA and DHA listed by amount. The dose compared to what the studies actually used. And the excipient list, which should be short and recognizable. Serious brands publish third-party certificates of analysis.'
  }, {
    q: 'How long before I notice anything?',
    a: 'It depends. Magnesium for sleep can show up within days. Vitamin D takes six to eight weeks to move your blood levels. Omega-3 for inflammation, eight to twelve. Consistency matters more than the size of the dose.'
  }, {
    q: 'Can I take these with my medication?',
    a: 'Some interact. K2 with warfarin, omega-3 and turmeric with blood thinners, fiber with the timing of almost any pill. Bring the actual bottles to your next appointment and go through them with your doctor.'
  }];
  const toneBg = tone => tone === 'rose' ? 'var(--ella-blush-50)' : tone === 'plum' ? 'var(--ella-plum-100)' : 'var(--ella-sage-100)';
  const toneFg = tone => tone === 'rose' ? 'var(--ella-rose)' : tone === 'plum' ? 'var(--ella-plum-500)' : 'var(--ella-sage-500)';
  const tagFg = tone => tone === 'rose' ? 'var(--ella-terracotta)' : tone === 'plum' ? 'var(--ella-plum-700)' : 'var(--ella-sage-700)';
  const s = open != null ? items[open] : null;
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "06 Supplements"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-section-head",
    style: {
      maxWidth: 720
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow"
  }, t('nav_supplements').toUpperCase()), /*#__PURE__*/React.createElement("h2", null, isEs ? 'En esta etapa, más importantes que un multivitamínico.' : 'More important than a multivitamin, at this stage.'), /*#__PURE__*/React.createElement("p", {
    className: "ella-supp-lede"
  }, isEs ? 'Estos son los que investigué para mí. No vendo ninguno. De cada uno te digo para qué sirve, de qué alimento sacarlo primero, qué buscar en la etiqueta y cuándo tener cuidado.' : 'These are the ones I researched for myself. I don\u2019t sell any of them. For each one you get what it does, the food to get it from first, the form to look for on the label, and when to be careful.')), /*#__PURE__*/React.createElement("ol", {
    className: "ella-supp-principles"
  }, PRINCIPLES.map((p, i) => /*#__PURE__*/React.createElement("li", {
    key: p.t
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-supp-principle-num"
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("h3", null, p.t), /*#__PURE__*/React.createElement("p", null, p.d)))), /*#__PURE__*/React.createElement("div", {
    className: "ella-supp-sections"
  }, GROUPS.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.key,
    className: "ella-supp-section",
    "data-tone": g.tone
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-supp-section-head"
  }, /*#__PURE__*/React.createElement("h2", null, g.title), /*#__PURE__*/React.createElement("p", null, g.note)), /*#__PURE__*/React.createElement("div", {
    className: "ella-supp-cards"
  }, items.map((sup, idx) => sup.group === g.key ? /*#__PURE__*/React.createElement("button", {
    key: sup.name,
    type: "button",
    className: "ella-supp-card",
    "data-tone": sup.tone,
    onClick: () => setOpen(idx),
    "aria-haspopup": "dialog"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-supp-card-icon"
  }, /*#__PURE__*/React.createElement(IconDroplet, {
    width: "18",
    height: "18"
  })), /*#__PURE__*/React.createElement("span", {
    className: "ella-supp-card-name"
  }, sup.name), /*#__PURE__*/React.createElement("span", {
    className: "ella-supp-card-desc"
  }, sup.desc), /*#__PURE__*/React.createElement("span", {
    className: "ella-supp-card-more"
  }, isEs ? 'Ver más' : 'Read more', /*#__PURE__*/React.createElement(IconArrow, {
    width: "13",
    height: "13"
  }))) : null))))), /*#__PURE__*/React.createElement("div", {
    className: "ella-supp-faq"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "ella-section-title"
  }, isEs ? 'Lo que más me preguntan' : 'What people ask me most.'), /*#__PURE__*/React.createElement("div", {
    className: "ella-supp-faq-list"
  }, FAQS.map(f => /*#__PURE__*/React.createElement("details", {
    key: f.q
  }, /*#__PURE__*/React.createElement("summary", null, f.q, /*#__PURE__*/React.createElement(IconDown, {
    width: "16",
    height: "16"
  })), /*#__PURE__*/React.createElement("p", null, f.a))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      padding: '20px 24px',
      background: 'var(--ella-cream-100)',
      borderRadius: 16,
      fontSize: 14,
      color: 'var(--ella-clay-700)',
      fontStyle: 'italic',
      lineHeight: 1.5
    }
  }, isEs ? 'Habla con tu médico antes de empezar cualquier suplemento, sobre todo si tomas medicamentos. Ella comparte información, no consejo médico.' : 'Talk to your doctor before starting any supplement, especially if you take medication. Ella shares information, not personalized medical advice.'))), s && /*#__PURE__*/React.createElement("div", {
    className: "ella-supp-modal-overlay",
    onClick: () => setOpen(null),
    role: "dialog",
    "aria-modal": "true",
    "aria-label": s.name
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-supp-modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-supp-modal-close",
    "aria-label": isEs ? 'Cerrar' : 'Close',
    onClick: () => setOpen(null)
  }, "\xD7"), /*#__PURE__*/React.createElement("div", {
    className: "ella-supp-modal-head"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 14,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: toneBg(s.tone),
      color: toneFg(s.tone),
      flex: '0 0 52px'
    }
  }, /*#__PURE__*/React.createElement(IconDroplet, {
    width: "26",
    height: "26"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "ella-supp-tag",
    style: {
      background: toneBg(s.tone),
      color: tagFg(s.tone)
    }
  }, s.tag), /*#__PURE__*/React.createElement("h3", null, s.name))), /*#__PURE__*/React.createElement("div", {
    className: "ella-supp-modal-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-supp-modal-col"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "ella-supp-modal-sub"
  }, isEs ? 'Por qué importa en esta etapa' : 'Why it matters now'), /*#__PURE__*/React.createElement("ul", {
    className: "ella-supp-why"
  }, s.why.map((w, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, w))), /*#__PURE__*/React.createElement("div", {
    className: "ella-supp-facts"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-supp-fact"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-supp-fact-lbl"
  }, isEs ? 'PRIMERO, LA COMIDA' : 'GET IT FROM FOOD FIRST'), /*#__PURE__*/React.createElement("p", null, s.food)), /*#__PURE__*/React.createElement("div", {
    className: "ella-supp-fact"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-supp-fact-lbl"
  }, isEs ? 'QU\u00c9 BUSCAR EN LA ETIQUETA' : 'WHAT TO LOOK FOR ON THE LABEL'), /*#__PURE__*/React.createElement("p", null, s.form)))), /*#__PURE__*/React.createElement("div", {
    className: "ella-supp-modal-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-supp-dose"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-supp-dose-lbl"
  }, isEs ? 'CU\u00c1NTO' : 'HOW MUCH'), /*#__PURE__*/React.createElement("p", null, s.dose)), /*#__PURE__*/React.createElement("div", {
    className: "ella-supp-caution"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-supp-fact-lbl"
  }, isEs ? 'TEN CUIDADO SI' : 'BE CAREFUL IF'), /*#__PURE__*/React.createElement("p", null, s.caution)), /*#__PURE__*/React.createElement("div", {
    className: "ella-supp-evidence"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-supp-fact-lbl"
  }, isEs ? 'LA EVIDENCIA' : 'THE EVIDENCE'), /*#__PURE__*/React.createElement("p", null, s.research), s.source && /*#__PURE__*/React.createElement("a", {
    className: "ella-supp-source",
    href: s.source.href,
    target: "_blank",
    rel: "noopener noreferrer"
  }, s.source.label, /*#__PURE__*/React.createElement(IconArrow, {
    width: "15",
    height: "15",
    style: {
      transform: 'rotate(-45deg)'
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "ella-supp-modal-disc"
  }, isEs ? 'Información general, no consejo médico. Habla con tu médico antes de empezar, sobre todo si tomas medicamentos.' : 'General information, not medical advice. Talk to your doctor before starting, especially if you take medication.'))));
}
window.SupplementsHub = SupplementsHub;
Object.assign(__ds_scope, { SupplementsHub });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens/SupplementsHub.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens/Symptoms.jsx
try { (() => {
// Symptoms: hub (list) when no symptomId, detail page otherwise.

function Symptoms({
  lang,
  setRoute,
  symptomId,
  openSymptom,
  openArticle
}) {
  const isEs = lang === 'es';
  const list = getSymptoms(lang);
  const s = symptomId ? list.find(x => x.id === symptomId) : null;
  const articles = typeof getArticles === 'function' ? getArticles(lang) : [];
  if (!s) {
    return /*#__PURE__*/React.createElement("div", {
      "data-screen-label": "11 Symptoms"
    }, /*#__PURE__*/React.createElement("section", {
      className: "ella-section-tight"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ella-container"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 720
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ella-eyebrow"
    }, isEs ? 'SÍNTOMAS' : 'SYMPTOMS'), /*#__PURE__*/React.createElement("h1", {
      className: "ella-page-title"
    }, isEs ? '¿Qué es lo que más te está afectando?' : 'What’s bothering you most?'), /*#__PURE__*/React.createElement("p", {
      className: "ella-sym-lede"
    }, isEs ? 'Elige un síntoma. Te explico por qué pasa, qué ayuda y cuándo ir al médico.' : 'Pick a symptom. You’ll see why it happens, what helps, and when to see a doctor.')), /*#__PURE__*/React.createElement("div", {
      className: "ella-sym-grid"
    }, list.map(x => /*#__PURE__*/React.createElement("button", {
      key: x.id,
      type: "button",
      className: "ella-sym-card",
      "data-tone": x.tone,
      onClick: () => openSymptom(x.id)
    }, /*#__PURE__*/React.createElement("span", {
      className: "ella-sym-card-name"
    }, x.name), /*#__PURE__*/React.createElement("span", {
      className: "ella-sym-card-short"
    }, x.short), /*#__PURE__*/React.createElement("span", {
      className: "ella-sym-card-cta"
    }, isEs ? 'Ver qué ayuda' : 'See what helps', " ", /*#__PURE__*/React.createElement(IconArrow, {
      width: "14",
      height: "14"
    }))))), /*#__PURE__*/React.createElement("a", {
      href: "#",
      className: "ella-urgent-strip",
      onClick: e => {
        e.preventDefault();
        setRoute('urgent');
        window.scrollTo({
          top: 0
        });
      }
    }, /*#__PURE__*/React.createElement(IconHeart, {
      width: "18",
      height: "18"
    }), /*#__PURE__*/React.createElement("span", null, isEs ? 'Algunos síntomas no pueden esperar. Ve cuándo ir al médico de inmediato.' : 'Some symptoms can’t wait. See when to get care right away.'), /*#__PURE__*/React.createElement(IconArrow, {
      width: "15",
      height: "15"
    })))));
  }
  const related = articles.find(a => a.id === s.article);
  const block = (title, items) => items && items.length ? /*#__PURE__*/React.createElement("div", {
    className: "ella-sym-block"
  }, /*#__PURE__*/React.createElement("h3", null, title), /*#__PURE__*/React.createElement("ul", null, items.map((t, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, t)))) : null;
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "11 Symptom"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-sym-detail"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "ella-article-back",
    onClick: e => {
      e.preventDefault();
      openSymptom(null);
    }
  }, /*#__PURE__*/React.createElement(IconChevron, {
    width: "16",
    height: "16",
    style: {
      transform: 'rotate(180deg)'
    }
  }), isEs ? 'Todos los síntomas' : 'All symptoms'), /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow",
    style: {
      marginTop: 14
    }
  }, isEs ? 'SÍNTOMA' : 'SYMPTOM'), /*#__PURE__*/React.createElement("h1", {
    className: "ella-page-title"
  }, s.name), /*#__PURE__*/React.createElement("div", {
    className: "ella-sym-why"
  }, /*#__PURE__*/React.createElement("h2", null, isEs ? 'Por qué pasa' : 'Why it happens'), /*#__PURE__*/React.createElement("p", null, s.why)), /*#__PURE__*/React.createElement("h2", {
    className: "ella-sym-sub"
  }, isEs ? 'Qué ayuda' : 'What helps'), /*#__PURE__*/React.createElement("div", {
    className: "ella-sym-blocks"
  }, block(isEs ? 'En tu día a día' : 'Day to day', s.habits), block(isEs ? 'Opciones naturales' : 'Natural options', s.natural), block(isEs ? 'Tratamientos para hablar con tu médico' : 'Treatments to ask about', s.treatment)), /*#__PURE__*/React.createElement("div", {
    className: "ella-sym-doctor"
  }, /*#__PURE__*/React.createElement("h2", null, isEs ? 'Ve al médico si…' : 'See a doctor if…'), /*#__PURE__*/React.createElement("ul", null, s.doctor.map((t, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, t))), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      setRoute('urgent');
      window.scrollTo({
        top: 0
      });
    }
  }, isEs ? 'Cuándo ir de inmediato →' : 'When to get care right away →')), /*#__PURE__*/React.createElement("div", {
    className: "ella-sym-next"
  }, related ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-btn ella-btn-primary",
    onClick: () => openArticle(related.id)
  }, isEs ? 'Leer: ' : 'Read: ', related.title.replace(/\.$/, ''), /*#__PURE__*/React.createElement(IconArrow, {
    width: "17",
    height: "17"
  })) : null, s.supp ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-btn ella-btn-secondary",
    onClick: () => {
      setRoute('supplements');
      window.scrollTo({
        top: 0
      });
    }
  }, isEs ? 'Ver suplementos' : 'See supplements') : null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-btn ella-btn-text",
    onClick: () => {
      setRoute('glossary');
      window.scrollTo({
        top: 0
      });
    }
  }, isEs ? 'Glosario de términos →' : 'Spanish–English glossary →')), /*#__PURE__*/React.createElement("section", {
    className: "ella-refs"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "ella-refs-hd"
  }, isEs ? 'Fuentes' : 'Sources'), /*#__PURE__*/React.createElement("ol", null, s.sources.map((r, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-ref-src"
  }, r.source), ' ', /*#__PURE__*/React.createElement("a", {
    href: r.href,
    target: "_blank",
    rel: "noopener noreferrer"
  }, r.title))))), /*#__PURE__*/React.createElement("aside", {
    className: "ella-disclaimer",
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("p", null, isEs ? 'Esto es información general, no consejo médico. Para tu caso, habla con tu médico.' : 'This is general information, not medical advice. For your situation, talk to your doctor.'))))));
}
window.Symptoms = Symptoms;
Object.assign(__ds_scope, { Symptoms });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens/Symptoms.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens/WhenToSeeDoctor.jsx
try { (() => {
// When to see a doctor right away. Short, scannable, both languages.

function WhenToSeeDoctor({
  lang,
  setRoute
}) {
  const isEs = lang === 'es';
  const now = isEs ? ['Dolor u opresión en el pecho, falta de aire, o dolor que se pasa al brazo, la espalda o la mandíbula.', 'Debilidad repentina en un lado del cuerpo, la cara caída, o no poder hablar bien.', 'Dolor de cabeza muy fuerte y repentino, el peor de tu vida.', 'Sangrado tan fuerte que empapas una toalla femenina cada hora por más de dos horas, o te sientes mareada o débil.'] : ['Chest pain or pressure, shortness of breath, or pain spreading to your arm, back, or jaw.', 'Sudden weakness on one side of your body, a drooping face, or trouble speaking.', 'A sudden, severe headache, the worst of your life.', 'Bleeding so heavy you soak a pad every hour for more than two hours, or you feel dizzy or faint.'];
  const soon = isEs ? ['Cualquier sangrado después de llevar 12 meses sin regla. Casi siempre no es grave, pero siempre hay que revisarlo.', 'Dolor, hinchazón o calor en una pierna, sobre todo si tomas terapia hormonal.', 'Una bolita nueva en el seno, o cambios en la piel o el pezón.', 'Palpitaciones con mareo o desmayo.', 'Tristeza o falta de ganas de todo por más de dos semanas.'] : ['Any bleeding after 12 months without a period. It’s usually not serious, but it always needs to be checked.', 'Pain, swelling, or warmth in one leg, especially if you take hormone therapy.', 'A new breast lump, or changes in the skin or nipple.', 'Heart palpitations with dizziness or fainting.', 'Feeling down or losing interest in things for more than two weeks.'];
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "12 When to see a doctor"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow"
  }, isEs ? 'CUÁNDO IR AL MÉDICO' : 'WHEN TO SEE A DOCTOR'), /*#__PURE__*/React.createElement("h1", {
    className: "ella-page-title"
  }, isEs ? 'Estos síntomas no pueden esperar.' : 'These symptoms can’t wait.'), /*#__PURE__*/React.createElement("p", {
    className: "ella-sym-lede"
  }, isEs ? 'La mayoría de los cambios de la menopausia no son una emergencia. Estos sí necesitan atención.' : 'Most menopause changes aren’t an emergency. These need attention.')), /*#__PURE__*/React.createElement("div", {
    className: "ella-urgent-box is-now"
  }, /*#__PURE__*/React.createElement("h2", null, isEs ? 'Llama al 911 o ve a urgencias' : 'Call 911 or go to the ER'), /*#__PURE__*/React.createElement("ul", null, now.map(t => /*#__PURE__*/React.createElement("li", {
    key: t
  }, t)))), /*#__PURE__*/React.createElement("div", {
    className: "ella-urgent-box is-crisis"
  }, /*#__PURE__*/React.createElement("h2", null, isEs ? 'Si piensas en hacerte daño' : 'If you’re thinking of hurting yourself'), /*#__PURE__*/React.createElement("p", null, isEs ? 'Llama o manda mensaje al 988, a cualquier hora. Hay atención en español. No estás sola.' : 'Call or text 988, any time of day. Help is available in Spanish. You are not alone.'), /*#__PURE__*/React.createElement("a", {
    className: "ella-btn ella-btn-primary",
    href: "tel:988"
  }, isEs ? 'Llamar al 988' : 'Call 988')), /*#__PURE__*/React.createElement("div", {
    className: "ella-urgent-box is-soon"
  }, /*#__PURE__*/React.createElement("h2", null, isEs ? 'Haz una cita pronto (en días, no semanas)' : 'Make an appointment soon (days, not weeks)'), /*#__PURE__*/React.createElement("ul", null, soon.map(t => /*#__PURE__*/React.createElement("li", {
    key: t
  }, t)))), /*#__PURE__*/React.createElement("p", {
    className: "ella-urgent-foot"
  }, isEs ? '¿No tienes seguro o médico? ' : 'No insurance or doctor? ', /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      setRoute('budget');
      window.scrollTo({
        top: 0
      });
    }
  }, isEs ? 'Así puedes conseguir atención de bajo costo →' : 'Here’s how to find low-cost care →')))));
}
window.WhenToSeeDoctor = WhenToSeeDoctor;
Object.assign(__ds_scope, { WhenToSeeDoctor });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens/WhenToSeeDoctor.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens/articleData.jsx
try { (() => {
// Article data store, Jessica's articles.
// Each article has: id, category, tone, title, lede, readTime, body (array of
// block objects). Bilingual via lang parameter.
//
// Body block kinds:
//   { kind: 'p',    text }
//   { kind: 'h2',   text }
//   { kind: 'pull', text }
//   { kind: 'ul',   items: [...] }
//   { kind: 'table', headers: [...], rows: [[...], ...] }

const ELLA_ARTICLES = {
  en: [{
    id: 'menopause-vs-perimenopause',
    category: 'Perimenopause',
    tone: 'rose',
    title: 'Menopause and perimenopause: what\u2019s the difference?',
    lede: 'These two words get used interchangeably, and they shouldn\u2019t be. Knowing which one you\u2019re in changes what you do about it.',
    readTime: '4 min read',
    published: 'August 2026',
    updated: 'August 2026',
    takeaways: ["Menopause is 12 consecutive months without a period. Everything before that is perimenopause.", "Perimenopause usually happens naturally between 45 and 56, but surgery or chemotherapy can bring it on earlier.", "Symptoms live in perimenopause, because that is where hormones fluctuate.", "Perimenopause is also the window where hormone therapy is safest and most effective to start."],
    doctorQuestions: ["Based on my symptoms, do you think I’m in perimenopause?", "Do I need any tests, or can you tell from my symptoms?", "Is now a good time for me to consider hormone therapy?", "Which symptoms should make me come back sooner?"],
    references: [{
      source: "The Menopause Society",
      title: "Menopause information for women",
      href: "https://www.menopause.org/for-women"
    }, {
      source: "U.S. Office on Women’s Health",
      title: "Menopause",
      href: "https://www.womenshealth.gov/menopause"
    }, {
      source: "National Institute on Aging (NIH)",
      title: "What Is Menopause?",
      href: "https://www.nia.nih.gov/health/menopause"
    }, {
      source: "American College of Obstetricians and Gynecologists",
      title: "Women’s Health",
      href: "https://www.acog.org/womens-health"
    }],
    body: [{
      kind: 'p',
      text: 'The purpose of this website is to make this journey as easy as possible for you. I have done the research, and I will keep going as new developments come out. If I can help even one person spend less energy on this and more on the rest of her life, it is worth it.'
    }, {
      kind: 'h2',
      text: 'Menopause'
    }, {
      kind: 'p',
      text: 'Menopause is the point when menstruation has stopped for at least 12 consecutive months, because the ovaries are no longer producing estrogen, progesterone, and other hormones. It is a single marker in time, looking backward.'
    }, {
      kind: 'h2',
      text: 'Perimenopause'
    }, {
      kind: 'p',
      text: 'Perimenopause is everything before that. It runs from the onset of significant fluctuations in ovarian function to one year after your final menstrual period. This usually happens naturally between the ages of 45 and 56, but it can also be brought on by surgery or by treatments for other conditions, like chemotherapy.'
    }, {
      kind: 'pull',
      text: '\u201cMost women are in perimenopause far longer than they realize, and that is the stretch where the symptoms live.\u201d'
    }, {
      kind: 'h2',
      text: 'Why the distinction matters'
    }, {
      kind: 'p',
      text: 'Perimenopause is where the fluctuation happens, and fluctuation is what causes symptoms. It is also the window where hormone therapy is most effective and safest to start. If you are having symptoms in your forties and your periods are still coming, you are almost certainly perimenopausal, and that is useful information to walk into an appointment with.'
    }]
  }, {
    id: 'inflammation',
    category: 'Menopause',
    tone: 'rose',
    title: 'Inflammation: the thing I wish someone had explained first.',
    lede: 'Almost everything that changes in menopause traces back to one mechanism. Understanding it made every other decision easier for me.',
    readTime: '6 min read',
    published: 'August 2026',
    updated: 'August 2026',
    takeaways: ["Inflammation is a normal defense system. It evolved to protect us from infection and injury.", "One of estrogen’s jobs is reducing inflammation, so when estrogen drops, that brake comes off.", "Unchecked inflammation connects heart disease, brain fog, joint pain, GI issues, mood changes, and weight changes.", "Reducing inflammation is the single lens worth organizing your decisions around."],
    doctorQuestions: ["Could inflammation be connected to the symptoms I’m having?", "Is there a blood test that shows inflammation, like CRP?", "Which changes in food, exercise, or sleep would help me most?", "Do any of my medications affect inflammation?"],
    references: [{
      source: "The Menopause Society",
      title: "Menopause information for women",
      href: "https://www.menopause.org/for-women"
    }, {
      source: "National Institute on Aging (NIH)",
      title: "What Is Menopause?",
      href: "https://www.nia.nih.gov/health/menopause"
    }, {
      source: "American Heart Association",
      title: "Menopause and Heart Disease",
      href: "https://www.heart.org/en/health-topics/consumer-healthcare/what-is-cardiovascular-disease/menopause-and-heart-disease"
    }, {
      source: "U.S. Office on Women’s Health",
      title: "Menopause",
      href: "https://www.womenshealth.gov/menopause"
    }],
    body: [{
      kind: 'p',
      text: 'Before anything else, I have to talk about inflammation. It is the thread that connects nearly every symptom, and once I understood it, everything else I did made more sense.'
    }, {
      kind: 'h2',
      text: 'Why we evolved to be inflammatory'
    }, {
      kind: 'p',
      text: 'Inflammation is an essential part of our defense system. It evolved to protect us from infection, injury, and toxins. Without it, we would quickly succumb to infections and that would be the end of it. A fever is a good example: it is an inflammatory response, and it helps us fight infection. So inflammation exists for a good reason.'
    }, {
      kind: 'h2',
      text: 'Where estrogen comes in'
    }, {
      kind: 'p',
      text: 'Here is the part that surprised me most. One of estrogen\u2019s roles is reducing inflammation. So imagine what happens when estrogen drops, or stops altogether. The brake comes off.'
    }, {
      kind: 'pull',
      text: '\u201cOne of estrogen\u2019s jobs is to keep inflammation in check. When estrogen leaves, inflammation stops being managed.\u201d'
    }, {
      kind: 'h2',
      text: 'What unchecked inflammation looks like'
    }, {
      kind: 'ul',
      items: ['Heart disease and cardiovascular risk', 'Memory fog and difficulty concentrating', 'Joint pain and morning stiffness', 'Digestive and GI problems', 'Mental health changes, anxiety and low mood', 'Weight changes that do not respond the way they used to']
    }, {
      kind: 'p',
      text: 'From day one, my whole approach has been organized around a single question: how do I reduce as much inflammation as possible? Diet, movement, supplements, sleep, and hormone therapy all sit underneath that question. That is the lens I use for everything on this site.'
    }]
  }, {
    id: 'estrogen-explained',
    category: 'Menopause',
    tone: 'plum',
    title: 'Estrogen: what it actually does.',
    lede: 'Most of us learned estrogen was about reproduction. It is doing far more than that, which is why losing it affects so much.',
    readTime: '5 min read',
    published: 'August 2026',
    updated: 'August 2026',
    takeaways: ["Estrogen is not only about reproduction. It supports bone, heart, and brain health, plus mood regulation.", "It also has an anti-inflammatory role, which is why losing it affects so many systems at once.", "In perimenopause levels fluctuate; in menopause the ovaries stop producing it.", "This is why symptoms feel scattered and unrelated. They are related."],
    doctorQuestions: ["Could my symptoms, like joint pain, brain fog, or mood changes, be from lower estrogen?", "Should we check other things that can look like menopause, like my thyroid?", "What are my options for replacing estrogen, and are they safe for me?", "How will we know if a treatment is working?"],
    references: [{
      source: "National Institute on Aging (NIH)",
      title: "What Is Menopause?",
      href: "https://www.nia.nih.gov/health/menopause"
    }, {
      source: "The Menopause Society",
      title: "Menopause information for women",
      href: "https://www.menopause.org/for-women"
    }, {
      source: "U.S. Office on Women’s Health",
      title: "Menopause",
      href: "https://www.womenshealth.gov/menopause"
    }, {
      source: "Bone Health & Osteoporosis Foundation",
      title: "Osteoporosis and bone health",
      href: "https://www.bonehealthandosteoporosis.org/"
    }],
    body: [{
      kind: 'p',
      text: 'Estrogen is a hormone produced in the ovaries, primarily known for its role in regulating the female reproductive system. That is the version most of us were taught, and it is incomplete.'
    }, {
      kind: 'h2',
      text: 'The jobs nobody mentions'
    }, {
      kind: 'p',
      text: 'Estrogen is key for bone health, heart health, and brain health, as well as mood regulation. And, as covered elsewhere on this site, it reduces inflammation.'
    }, {
      kind: 'h2',
      text: 'So what happens when it declines'
    }, {
      kind: 'p',
      text: 'During perimenopause, levels start decreasing and fluctuating. In menopause, the ovaries stop producing estrogen altogether. All of those important functions, the ones above, become chaotic. Inflammation takes over.'
    }, {
      kind: 'pull',
      text: '\u201cIt is not that one system breaks. It is that the hormone quietly supporting several systems at once is no longer there.\u201d'
    }, {
      kind: 'p',
      text: 'This is why menopause symptoms feel so scattered and so hard to explain to a doctor in a ten-minute visit. Joint pain, brain fog, a racing heart, and low mood do not sound related. They are.'
    }]
  }, {
    id: 'bones-and-estrogen',
    category: 'Exercise',
    tone: 'sage',
    title: 'Your bones after estrogen.',
    lede: 'Bone loss accelerates sharply after menopause. Here is the mechanism, and the two things that reliably help.',
    readTime: '6 min read',
    published: 'August 2026',
    updated: 'August 2026',
    takeaways: ["Estrogen keeps bone remodeling in balance. When it drops, the brake on bone breakdown comes off.", "Accelerated bone loss is osteoporosis, and it means higher fracture risk.", "Calcium, vitamin D, and vitamin K2 all play distinct roles in bone health.", "Combine weight-bearing, resistance, balance, and impact work. Consistency beats intensity."],
    doctorQuestions: ["Should I get a bone density scan (DEXA), and when?", "Do I need calcium, vitamin D, or K2, and how much?", "What kind of exercise is safe for me to start with?", "With my family history, what is my fracture risk?"],
    references: [{
      source: "Bone Health & Osteoporosis Foundation",
      title: "Osteoporosis and bone health",
      href: "https://www.bonehealthandosteoporosis.org/"
    }, {
      source: "NIH Office of Dietary Supplements",
      title: "Calcium: Consumer Fact Sheet",
      href: "https://ods.od.nih.gov/factsheets/Calcium-Consumer/"
    }, {
      source: "NIH Office of Dietary Supplements",
      title: "Vitamin D: Consumer Fact Sheet",
      href: "https://ods.od.nih.gov/factsheets/VitaminD-Consumer/"
    }, {
      source: "NIH Office of Dietary Supplements",
      title: "Vitamin K: Consumer Fact Sheet",
      href: "https://ods.od.nih.gov/factsheets/VitaminK-Consumer/"
    }, {
      source: "U.S. Department of Health and Human Services",
      title: "Physical Activity Guidelines for Americans",
      href: "https://health.gov/our-work/nutrition-physical-activity/physical-activity-guidelines"
    }],
    body: [{
      kind: 'p',
      text: 'Bone is not static. It is constantly being broken down and rebuilt, in a finely tuned balance. Estrogen is part of what keeps that balance steady.'
    }, {
      kind: 'h2',
      text: 'What happens when estrogen declines'
    }, {
      kind: 'p',
      text: 'When circulating estrogen declines significantly, that balance is severely disrupted. This most commonly happens after menopause, when ovarian function ceases and estrogen production drops sharply. The lack of estrogen removes the brake on osteoclast activity, the cells that break bone down, leading to accelerated bone loss. That condition is called osteoporosis, and it means a higher risk of fractures and breaks.'
    }, {
      kind: 'h2',
      text: 'Supplements that support bone'
    }, {
      kind: 'p',
      text: 'Calcium and vitamin D are crucial for bone health in menopausal and postmenopausal women, for exactly the reason above. Calcium aids in building and maintaining strong bones, while vitamin D improves calcium absorption. Vitamin K2 also plays a role in bone metabolism, helping direct calcium into bone rather than into arteries.'
    }, {
      kind: 'h2',
      text: 'Exercise that supports bone'
    }, {
      kind: 'p',
      text: 'A balanced program combining weight-bearing, resistance, balance, and impact activities is most effective for maintaining and improving bone health during and after menopause. Consistency, gradual progression, and attention to safety are what reduce fracture risk over time.'
    }, {
      kind: 'pull',
      text: '\u201cConsistency matters more than intensity. Bone responds to being asked to do something, regularly.\u201d'
    }, {
      kind: 'ul',
      items: ['Weight-bearing: walking, hiking, stair climbing, dancing', 'Resistance: bands, dumbbells, bodyweight movements', 'Balance: single-leg work, tai chi, yoga', 'Impact: light hopping or jumping, if your joints allow it']
    }]
  }, {
    id: 'heart-health-menopause',
    category: 'Menopause',
    tone: 'rose',
    title: 'Heart health after menopause.',
    lede: 'Cardiovascular risk rises meaningfully after menopause, because you have lost years of estrogen\u2019s protective effect. This is the most actionable part.',
    readTime: '6 min read',
    published: 'August 2026',
    updated: 'August 2026',
    takeaways: ["Cardiovascular risk rises after menopause because you lose 5 to 10 years of estrogen’s protective effect.", "A Mediterranean-style eating pattern is the best-supported dietary approach.", "Target 150 minutes of vigorous exercise weekly, with strength training on alternate days.", "Strength training is about combating muscle loss, not bodybuilding. It also protects bone.", "10,000 steps daily has been shown to reduce belly fat."],
    doctorQuestions: ["What are my blood pressure and cholesterol numbers, and are they healthy?", "How does menopause change my risk for heart disease?", "How much exercise should I aim for, with my health?", "Do omega-3 or vitamin D make sense for me?"],
    references: [{
      source: "American Heart Association",
      title: "Menopause and Heart Disease",
      href: "https://www.heart.org/en/health-topics/consumer-healthcare/what-is-cardiovascular-disease/menopause-and-heart-disease"
    }, {
      source: "National Heart, Lung, and Blood Institute (NIH)",
      title: "Heart-healthy eating patterns",
      href: "https://www.nhlbi.nih.gov/education/dash-eating-plan"
    }, {
      source: "U.S. Department of Health and Human Services",
      title: "Physical Activity Guidelines for Americans",
      href: "https://health.gov/our-work/nutrition-physical-activity/physical-activity-guidelines"
    }, {
      source: "NIH Office of Dietary Supplements",
      title: "Omega-3 Fatty Acids: Consumer Fact Sheet",
      href: "https://ods.od.nih.gov/factsheets/Omega3FattyAcids-Consumer/"
    }],
    body: [{
      kind: 'p',
      text: 'Menopause increases your risk of cardiovascular events, like a heart attack, significantly. The reason is straightforward: you have lost five to ten years of the protective effect of estrogen. Estrogen protects our heart and our blood vessels, and once it is gone, that protection goes with it.'
    }, {
      kind: 'h2',
      text: 'Diet'
    }, {
      kind: 'p',
      text: 'A heart-healthy diet, such as the Mediterranean diet, is the most well-supported dietary pattern here. It is not a restrictive plan, it is a shift toward olive oil, fish, legumes, vegetables, and whole grains.'
    }, {
      kind: 'h2',
      text: 'Supplements'
    }, {
      kind: 'p',
      text: 'Omega-3 reduces inflammation and supports heart health. Vitamin D also plays a role. Both are covered in more detail in the supplements section.'
    }, {
      kind: 'h2',
      text: 'Exercise'
    }, {
      kind: 'p',
      text: 'The recommendation is 150 minutes of vigorous exercise each week. That should include moderate to high intensity aerobic activity at least three times a week, combined with strength training on other days.'
    }, {
      kind: 'pull',
      text: '\u201cStrength training is not about powerlifting or bodybuilding. It is about combating muscle loss so you can stay active and keep doing everyday things as you age.\u201d'
    }, {
      kind: 'p',
      text: 'It has also been shown that muscle strength protects our skeletal system and our bones, so strength work is doing double duty.'
    }, {
      kind: 'h2',
      text: 'Walking'
    }, {
      kind: 'p',
      text: 'At least 10,000 steps daily has been shown to reduce belly fat. It is the most accessible intervention on this page, and it requires nothing but time.'
    }]
  }, {
    id: 'hrt-and-alternatives',
    category: 'Menopause',
    tone: 'plum',
    title: 'HRT and natural alternatives.',
    lede: 'Hormone therapy is the most effective and best-studied treatment for menopause symptoms. Here are the forms, the timing that matters, and one critical safety point.',
    readTime: '7 min read',
    published: 'August 2026',
    updated: 'August 2026',
    takeaways: ["HRT is the most effective and best-studied treatment for perimenopause and menopause symptoms.", "It is safest and most effective started during perimenopause or within 10 years of menopause onset.", "Critical: if you still have a uterus and take estrogen, you must also take progesterone to protect against uterine cancer.", "Phytoestrogens (soy, flax, legumes) and adaptogens (Rhodiola, Ashwagandha) are alternatives worth discussing with your doctor."],
    doctorQuestions: ["Am I a good candidate for hormone therapy?", "Which form would you suggest for me: pill, patch, gel, or vaginal?", "I still have my uterus. Will I take progesterone too?", "What are the risks for me, and how often will we review it?", "Are phytoestrogens or adaptogens safe with my medications?"],
    references: [{
      source: "The Menopause Society",
      title: "Menopause information for women",
      href: "https://www.menopause.org/for-women"
    }, {
      source: "National Institute on Aging (NIH)",
      title: "What Is Menopause?",
      href: "https://www.nia.nih.gov/health/menopause"
    }, {
      source: "American College of Obstetricians and Gynecologists",
      title: "Women’s Health",
      href: "https://www.acog.org/womens-health"
    }, {
      source: "The Menopause Society",
      title: "Find a Menopause Society certified practitioner",
      href: "https://www.menopause.org/for-women/find-a-menopause-practitioner"
    }],
    body: [{
      kind: 'p',
      text: 'Hormone replacement therapy, or HRT, is the most effective and well-studied treatment for perimenopause and menopause symptoms. It comes in multiple delivery options and has a strong safety profile when tailored to your individual health needs.'
    }, {
      kind: 'h2',
      text: 'Timing matters'
    }, {
      kind: 'p',
      text: 'HRT is most effective and safest when started during perimenopause, or within ten years of menopause onset. This window is one of the most important things to know, because it is often the difference between HRT being a straightforward option and a more complicated conversation.'
    }, {
      kind: 'h2',
      text: 'Forms of estrogen'
    }, {
      kind: 'ul',
      items: ['Pills', 'Creams and other topicals', 'Patches']
    }, {
      kind: 'h2',
      text: 'The critical safety point'
    }, {
      kind: 'pull',
      text: '\u201cIf you still have a uterus and you are taking estrogen, it is critical to also take progesterone. This protects you from developing uterine cancer.\u201d'
    }, {
      kind: 'p',
      text: 'This is not optional and it is not a detail. If a provider offers you estrogen alone and you still have a uterus, ask about progesterone.'
    }, {
      kind: 'h2',
      text: 'Forms of progesterone'
    }, {
      kind: 'ul',
      items: ['Pills', 'Creams and other topicals', 'An IUD that contains progesterone']
    }, {
      kind: 'h2',
      text: 'Natural alternatives'
    }, {
      kind: 'p',
      text: 'Natural alternatives to hormone replacement therapy include phytoestrogens and adaptogens, which offer symptom relief through distinct but complementary mechanisms.'
    }, {
      kind: 'p',
      text: 'Phytoestrogens, found in soy, flax seeds, and legumes, modulate estrogen receptors and may reduce hot flashes and bone loss. Adaptogens like Rhodiola and Ashwagandha improve stress resilience and hormonal balance.'
    }, {
      kind: 'p',
      text: 'These options support holistic, individualized care, with an emphasis on safety and monitoring. They are worth discussing with your doctor rather than starting alone.'
    }]
  }],
  es: [{
    id: 'menopause-vs-perimenopause',
    category: 'Perimenopausia',
    tone: 'rose',
    title: 'Menopausia y perimenopausia: \u00bfcu\u00e1l es la diferencia?',
    lede: 'Mucha gente usa estas dos palabras como si fueran lo mismo, pero no lo son. Saber en cuál estás cambia lo que puedes hacer.',
    readTime: '4 min de lectura',
    published: 'Agosto 2026',
    updated: 'Agosto 2026',
    takeaways: ["La menopausia es cuando llevas 12 meses seguidos sin regla. Todo lo que pasa antes es la perimenopausia.", "La perimenopausia normalmente llega entre los 45 y los 56 años, pero una cirugía o la quimioterapia pueden adelantarla.", "Los síntomas aparecen en la perimenopausia, porque es cuando las hormonas suben y bajan.", "La perimenopausia también es el mejor momento para empezar la terapia hormonal, porque es cuando es más segura y funciona mejor."],
    doctorQuestions: ["Por mis síntomas, ¿cree que estoy en la perimenopausia?", "¿Necesito algún análisis, o se puede saber por mis síntomas?", "¿Es buen momento para pensar en la terapia hormonal?", "¿Con qué síntomas debo regresar antes?"],
    references: [{
      source: "The Menopause Society",
      title: "Menopause information for women",
      href: "https://www.menopause.org/for-women"
    }, {
      source: "U.S. Office on Women’s Health",
      title: "Menopause",
      href: "https://www.womenshealth.gov/menopause"
    }, {
      source: "National Institute on Aging (NIH)",
      title: "What Is Menopause?",
      href: "https://www.nia.nih.gov/health/menopause"
    }, {
      source: "American College of Obstetricians and Gynecologists",
      title: "Women’s Health",
      href: "https://www.acog.org/womens-health"
    }],
    body: [{
      kind: 'p',
      text: 'Este sitio existe para hacerte este camino lo más fácil posible. Yo ya hice la investigación, y voy a seguir al tanto de lo nuevo que salga. Si logro que aunque sea una mujer gaste menos energía en esto y más en el resto de su vida, vale la pena.'
    }, {
      kind: 'h2',
      text: 'Menopausia'
    }, {
      kind: 'p',
      text: 'La menopausia es cuando ya llevas al menos 12 meses seguidos sin regla, porque los ovarios dejaron de producir estrógeno, progesterona y otras hormonas. Es un solo momento, y solo se sabe mirando hacia atrás.'
    }, {
      kind: 'h2',
      text: 'Perimenopausia'
    }, {
      kind: 'p',
      text: 'La perimenopausia es todo lo que pasa antes. Empieza cuando los ovarios comienzan a cambiar de verdad y termina un año después de tu última regla. Normalmente pasa entre los 45 y los 56 años, pero también la puede provocar una cirugía o el tratamiento de otra enfermedad, como la quimioterapia.'
    }, {
      kind: 'pull',
      text: '«Casi todas las mujeres pasan mucho más tiempo en la perimenopausia de lo que creen, y ahí es donde están los síntomas.»'
    }, {
      kind: 'h2',
      text: 'Por qué importa la diferencia'
    }, {
      kind: 'p',
      text: 'En la perimenopausia las hormonas suben y bajan, y eso es lo que provoca los síntomas. También es el mejor momento para empezar la terapia hormonal, porque es cuando es más segura y funciona mejor. Si tienes síntomas a los cuarenta y todavía te baja la regla, lo más probable es que estés en la perimenopausia, y eso es algo útil para decirle a tu médico.'
    }]
  }, {
    id: 'inflammation',
    category: 'Menopausia',
    tone: 'rose',
    title: 'Inflamación: lo que me hubiera gustado que alguien me explicara primero.',
    lede: 'Casi todo lo que cambia en la menopausia tiene que ver con lo mismo. Cuando lo entendí, todas las demás decisiones se me hicieron más fáciles.',
    readTime: '6 min de lectura',
    published: 'Agosto 2026',
    updated: 'Agosto 2026',
    takeaways: ["La inflamación es una defensa normal del cuerpo. Existe para protegernos de infecciones y heridas.", "Una de las funciones del estrógeno es bajar la inflamación. Por eso, cuando el estrógeno baja, la inflamación se queda sin freno.", "La inflamación sin control está detrás de las enfermedades del corazón, la mente nublada, el dolor de articulaciones, los problemas digestivos, el estado de ánimo y el peso.", "Bajar la inflamación es la mejor guía para tomar tus decisiones."],
    doctorQuestions: ["¿La inflamación puede tener que ver con mis síntomas?", "¿Hay algún análisis de sangre que mida la inflamación, como la proteína C reactiva?", "¿Qué cambios en la comida, el ejercicio o el sueño me ayudarían más?", "¿Alguno de mis medicamentos afecta la inflamación?"],
    references: [{
      source: "The Menopause Society",
      title: "Menopause information for women",
      href: "https://www.menopause.org/for-women"
    }, {
      source: "National Institute on Aging (NIH)",
      title: "What Is Menopause?",
      href: "https://www.nia.nih.gov/health/menopause"
    }, {
      source: "American Heart Association",
      title: "Menopause and Heart Disease",
      href: "https://www.heart.org/en/health-topics/consumer-healthcare/what-is-cardiovascular-disease/menopause-and-heart-disease"
    }, {
      source: "U.S. Office on Women’s Health",
      title: "Menopause",
      href: "https://www.womenshealth.gov/menopause"
    }],
    body: [{
      kind: 'p',
      text: 'Antes que nada, tengo que hablar de la inflamación. Es lo que une casi todos los síntomas, y cuando lo entendí, todo lo demás que hice tuvo más sentido.'
    }, {
      kind: 'h2',
      text: 'Por qué nuestro cuerpo se inflama'
    }, {
      kind: 'p',
      text: 'La inflamación es una parte esencial de las defensas del cuerpo. Existe para protegernos de infecciones, heridas y toxinas. Sin ella, cualquier infección acabaría con nosotros muy rápido. La fiebre es un buen ejemplo: es una reacción inflamatoria que nos ayuda a combatir una infección. O sea, la inflamación existe por una buena razón.'
    }, {
      kind: 'h2',
      text: 'Qué tiene que ver el estrógeno'
    }, {
      kind: 'p',
      text: 'Esta es la parte que más me sorprendió. Una de las funciones del estrógeno es bajar la inflamación. Imagínate lo que pasa cuando el estrógeno baja, o cuando ya no se produce. La inflamación se queda sin freno.'
    }, {
      kind: 'pull',
      text: '«Uno de los trabajos del estrógeno es mantener la inflamación bajo control. Cuando el estrógeno se va, la inflamación se descontrola.»'
    }, {
      kind: 'h2',
      text: 'Cómo se nota la inflamación sin control'
    }, {
      kind: 'ul',
      items: ['Enfermedades del corazón y más riesgo de infarto', 'Mente nublada y problemas para concentrarte', 'Dolor articular y rigidez matutina', 'Problemas digestivos y gastrointestinales', 'Cambios en la salud emocional, ansiedad y desánimo', 'Cambios de peso que ya no responden como antes']
    }, {
      kind: 'p',
      text: 'Desde el primer día, todo lo que hice giró alrededor de una sola pregunta: ¿cómo bajo la inflamación lo más posible? La alimentación, el ejercicio, los suplementos, el sueño y la terapia hormonal salen de esa pregunta. Es la guía que uso para todo en este sitio.'
    }]
  }, {
    id: 'estrogen-explained',
    category: 'Menopausia',
    tone: 'plum',
    title: 'Estrógeno: lo que de verdad hace.',
    lede: 'A casi todas nos enseñaron que el estrógeno solo tiene que ver con tener hijos. Hace mucho más que eso, y por eso perderlo nos afecta tanto.',
    readTime: '5 min de lectura',
    published: 'Agosto 2026',
    updated: 'Agosto 2026',
    takeaways: ["El estrógeno no solo tiene que ver con tener hijos. También cuida los huesos, el corazón, el cerebro y el estado de ánimo.", "También baja la inflamación, y por eso perderlo afecta tantas partes del cuerpo al mismo tiempo.", "En la perimenopausia los niveles suben y bajan; en la menopausia los ovarios dejan de producirlo.", "Por eso los síntomas parecen no tener nada que ver entre sí. Pero sí tienen que ver."],
    doctorQuestions: ["¿Mis síntomas, como el dolor de articulaciones, la mente nublada o los cambios de humor, pueden ser por el estrógeno bajo?", "¿Debemos revisar otras cosas que se parecen a la menopausia, como la tiroides?", "¿Qué opciones tengo para reponer el estrógeno, y son seguras para mí?", "¿Cómo vamos a saber si un tratamiento está funcionando?"],
    references: [{
      source: "National Institute on Aging (NIH)",
      title: "What Is Menopause?",
      href: "https://www.nia.nih.gov/health/menopause"
    }, {
      source: "The Menopause Society",
      title: "Menopause information for women",
      href: "https://www.menopause.org/for-women"
    }, {
      source: "U.S. Office on Women’s Health",
      title: "Menopause",
      href: "https://www.womenshealth.gov/menopause"
    }, {
      source: "Bone Health & Osteoporosis Foundation",
      title: "Osteoporosis and bone health",
      href: "https://www.bonehealthandosteoporosis.org/"
    }],
    body: [{
      kind: 'p',
      text: 'El estrógeno es una hormona que se produce en los ovarios, y es conocida sobre todo por regular el sistema reproductivo. Esa es la versión que nos enseñaron, y está incompleta.'
    }, {
      kind: 'h2',
      text: 'Lo que nadie te dice'
    }, {
      kind: 'p',
      text: 'El estrógeno es clave para la salud de los huesos, del corazón y del cerebro, y también para el estado de ánimo. Y, como explico en otra parte del sitio, baja la inflamación.'
    }, {
      kind: 'h2',
      text: 'Qué pasa cuando baja'
    }, {
      kind: 'p',
      text: 'En la perimenopausia los niveles empiezan a bajar y a subir sin control. En la menopausia, los ovarios dejan de producir estrógeno por completo. Todas esas funciones importantes se desordenan, y la inflamación toma el control.'
    }, {
      kind: 'pull',
      text: '«No es que algo en tu cuerpo se descomponga. Es que la hormona que sostenía varias cosas a la vez ya no está.»'
    }, {
      kind: 'p',
      text: 'Por eso los síntomas de la menopausia parecen tan sueltos y son tan difíciles de explicar en una cita de diez minutos. El dolor de articulaciones, la mente nublada, las palpitaciones y el desánimo no parecen tener relación. Pero sí la tienen.'
    }]
  }, {
    id: 'bones-and-estrogen',
    category: 'Ejercicio',
    tone: 'sage',
    title: 'Tus huesos cuando baja el estrógeno.',
    lede: 'Después de la menopausia los huesos se debilitan mucho más rápido. Aquí te explico por qué, y las dos cosas que sí ayudan.',
    readTime: '6 min de lectura',
    published: 'Agosto 2026',
    updated: 'Agosto 2026',
    takeaways: ["El estrógeno mantiene en equilibrio la forma en que el hueso se renueva. Cuando baja, el hueso se desgasta más rápido de lo que se reconstruye.", "Cuando el hueso se pierde así de rápido se llama osteoporosis, y aumenta el riesgo de fracturas.", "El calcio, la vitamina D y la vitamina K2 cumplen funciones distintas en la salud de los huesos.", "Combina ejercicios con peso, de fuerza, de equilibrio y de impacto. Ser constante importa más que la intensidad."],
    doctorQuestions: ["¿Me debo hacer una densitometría ósea, y cuándo?", "¿Necesito calcio, vitamina D o K2, y cuánto?", "¿Con qué tipo de ejercicio puedo empezar sin riesgo?", "Con mis antecedentes familiares, ¿qué tan alto es mi riesgo de fracturas?"],
    references: [{
      source: "Bone Health & Osteoporosis Foundation",
      title: "Osteoporosis and bone health",
      href: "https://www.bonehealthandosteoporosis.org/"
    }, {
      source: "NIH Office of Dietary Supplements",
      title: "Calcium: Consumer Fact Sheet",
      href: "https://ods.od.nih.gov/factsheets/Calcium-Consumer/"
    }, {
      source: "NIH Office of Dietary Supplements",
      title: "Vitamin D: Consumer Fact Sheet",
      href: "https://ods.od.nih.gov/factsheets/VitaminD-Consumer/"
    }, {
      source: "NIH Office of Dietary Supplements",
      title: "Vitamin K: Consumer Fact Sheet",
      href: "https://ods.od.nih.gov/factsheets/VitaminK-Consumer/"
    }, {
      source: "U.S. Department of Health and Human Services",
      title: "Physical Activity Guidelines for Americans",
      href: "https://health.gov/our-work/nutrition-physical-activity/physical-activity-guidelines"
    }],
    body: [{
      kind: 'p',
      text: 'El hueso no se queda igual. Todo el tiempo se desgasta y se vuelve a formar, en un equilibrio muy delicado. El estrógeno es parte de lo que mantiene ese equilibrio.'
    }, {
      kind: 'h2',
      text: 'Qué pasa cuando baja el estrógeno'
    }, {
      kind: 'p',
      text: 'Cuando el estrógeno baja mucho, ese equilibrio se rompe. Casi siempre pasa después de la menopausia, cuando los ovarios dejan de funcionar y el estrógeno cae de golpe. Sin estrógeno, los osteoclastos, las células que desgastan el hueso, trabajan sin freno, y el hueso se pierde más rápido. Eso se llama osteoporosis, y aumenta el riesgo de fracturas.'
    }, {
      kind: 'h2',
      text: 'Suplementos para los huesos'
    }, {
      kind: 'p',
      text: 'El calcio y la vitamina D son muy importantes para los huesos durante y después de la menopausia, justo por lo que expliqué arriba. El calcio ayuda a formar y mantener huesos fuertes, y la vitamina D ayuda a que el cuerpo absorba el calcio. La vitamina K2 también ayuda, porque manda el calcio a los huesos en vez de a las arterias.'
    }, {
      kind: 'h2',
      text: 'Ejercicio para los huesos'
    }, {
      kind: 'p',
      text: 'Lo que mejor funciona para cuidar y fortalecer los huesos durante y después de la menopausia es una rutina que combine ejercicios con peso, de fuerza, de equilibrio y de impacto. Ser constante, ir subiendo poco a poco y cuidarte de no lastimarte es lo que baja el riesgo de fracturas con el tiempo.'
    }, {
      kind: 'pull',
      text: '«Ser constante importa más que la intensidad. El hueso responde cuando le pides que trabaje, una y otra vez.»'
    }, {
      kind: 'ul',
      items: ['Carga: caminar, senderismo, subir escaleras, bailar', 'Fuerza: ligas, mancuernas, ejercicios con tu propio peso', 'Equilibrio: ejercicios en una pierna, tai chi, yoga', 'Impacto: saltos ligeros, si tus articulaciones lo permiten']
    }]
  }, {
    id: 'heart-health-menopause',
    category: 'Menopausia',
    tone: 'rose',
    title: 'Salud del coraz\u00f3n despu\u00e9s de la menopausia.',
    lede: 'Después de la menopausia, el riesgo de problemas del corazón sube bastante, porque pierdes años de la protección que te daba el estrógeno.',
    readTime: '6 min de lectura',
    published: 'Agosto 2026',
    updated: 'Agosto 2026',
    takeaways: ["Después de la menopausia el riesgo del corazón sube porque pierdes de 5 a 10 años de la protección del estrógeno.", "La dieta mediterránea es la forma de comer con más respaldo científico.", "La meta es 150 minutos de ejercicio intenso a la semana, con pesas en días alternos.", "Las pesas sirven para no perder músculo, no para ser fisicoculturista. También protegen los huesos.", "Está comprobado que caminar 10,000 pasos al día ayuda a bajar la grasa del abdomen."],
    doctorQuestions: ["¿Cómo están mi presión y mi colesterol? ¿Están en un rango sano?", "¿Cómo cambia la menopausia mi riesgo de enfermedades del corazón?", "Con mi salud, ¿cuánto ejercicio debo hacer?", "¿Me conviene tomar omega-3 o vitamina D?"],
    references: [{
      source: "American Heart Association",
      title: "Menopause and Heart Disease",
      href: "https://www.heart.org/en/health-topics/consumer-healthcare/what-is-cardiovascular-disease/menopause-and-heart-disease"
    }, {
      source: "National Heart, Lung, and Blood Institute (NIH)",
      title: "Heart-healthy eating patterns",
      href: "https://www.nhlbi.nih.gov/education/dash-eating-plan"
    }, {
      source: "U.S. Department of Health and Human Services",
      title: "Physical Activity Guidelines for Americans",
      href: "https://health.gov/our-work/nutrition-physical-activity/physical-activity-guidelines"
    }, {
      source: "NIH Office of Dietary Supplements",
      title: "Omega-3 Fatty Acids: Consumer Fact Sheet",
      href: "https://ods.od.nih.gov/factsheets/Omega3FattyAcids-Consumer/"
    }],
    body: [{
      kind: 'p',
      text: 'La menopausia aumenta bastante el riesgo de problemas del corazón, como un infarto. La razón es sencilla: pierdes de cinco a diez años de la protección del estrógeno. El estrógeno cuida el corazón y las venas, y cuando se va, esa protección se va con él.'
    }, {
      kind: 'h2',
      text: 'Dieta'
    }, {
      kind: 'p',
      text: 'Una dieta buena para el corazón, como la mediterránea, es la que tiene más respaldo. No es una dieta estricta, es comer más aceite de oliva, pescado, frijoles y lentejas, verduras y granos enteros.'
    }, {
      kind: 'h2',
      text: 'Suplementos'
    }, {
      kind: 'p',
      text: 'El omega-3 baja la inflamación y cuida el corazón. La vitamina D también ayuda. Los dos los explico con más detalle en la sección de suplementos.'
    }, {
      kind: 'h2',
      text: 'Ejercicio'
    }, {
      kind: 'p',
      text: 'Lo recomendado son 150 minutos de ejercicio intenso a la semana. Eso incluye ejercicio aeróbico de intensidad moderada a alta al menos tres veces por semana, y pesas los otros días.'
    }, {
      kind: 'pull',
      text: '«Hacer pesas no es para ser fisicoculturista. Es para no perder músculo, seguir activa y poder hacer tus cosas del día a día conforme pasan los años.»'
    }, {
      kind: 'p',
      text: 'Además, está comprobado que tener músculos fuertes protege los huesos, así que las pesas te ayudan por partida doble.'
    }, {
      kind: 'h2',
      text: 'Caminar'
    }, {
      kind: 'p',
      text: 'Está comprobado que caminar al menos 10,000 pasos al día ayuda a bajar la grasa del abdomen. Es lo más fácil de toda esta página, y solo necesitas tiempo.'
    }]
  }, {
    id: 'hrt-and-alternatives',
    category: 'Menopausia',
    tone: 'plum',
    title: 'TRH y alternativas naturales.',
    lede: 'La terapia hormonal es el tratamiento que mejor funciona y el más estudiado para los síntomas de la menopausia. Aquí te explico las opciones, por qué importa cuándo empezar y algo muy importante de seguridad.',
    readTime: '7 min de lectura',
    published: 'Agosto 2026',
    updated: 'Agosto 2026',
    takeaways: ["La terapia de reemplazo hormonal (TRH) es el tratamiento que mejor funciona y el más estudiado para los síntomas de la perimenopausia y la menopausia.", "Es más segura y funciona mejor si la empiezas en la perimenopausia o en los primeros 10 años de la menopausia.", "Muy importante: si todavía tienes útero y tomas estrógeno, también tienes que tomar progesterona para protegerte del cáncer de útero.", "Los fitoestrógenos (soya, linaza, frijoles y lentejas) y los adaptógenos (rhodiola, ashwagandha) son alternativas que vale la pena platicar con tu médico."],
    doctorQuestions: ["¿Soy buena candidata para la terapia hormonal?", "¿Qué forma me recomienda: pastilla, parche, gel o vaginal?", "Todavía tengo útero. ¿También voy a tomar progesterona?", "¿Qué riesgos tiene para mí, y cada cuánto lo vamos a revisar?", "¿Los fitoestrógenos o los adaptógenos son seguros con mis medicamentos?"],
    references: [{
      source: "The Menopause Society",
      title: "Menopause information for women",
      href: "https://www.menopause.org/for-women"
    }, {
      source: "National Institute on Aging (NIH)",
      title: "What Is Menopause?",
      href: "https://www.nia.nih.gov/health/menopause"
    }, {
      source: "American College of Obstetricians and Gynecologists",
      title: "Women’s Health",
      href: "https://www.acog.org/womens-health"
    }, {
      source: "The Menopause Society",
      title: "Find a Menopause Society certified practitioner",
      href: "https://www.menopause.org/for-women/find-a-menopause-practitioner"
    }],
    body: [{
      kind: 'p',
      text: 'La terapia de reemplazo hormonal, o TRH, es el tratamiento que mejor funciona y el más estudiado para los síntomas de la perimenopausia y la menopausia. Hay varias formas de usarla, y es segura cuando se ajusta a tu salud y a tus necesidades.'
    }, {
      kind: 'h2',
      text: 'El momento importa'
    }, {
      kind: 'p',
      text: 'La TRH funciona mejor y es más segura cuando se empieza en la perimenopausia, o en los primeros diez años de la menopausia. Este momento es una de las cosas más importantes que debes saber, porque muchas veces es la diferencia entre que la TRH sea una opción sencilla o una conversación más complicada.'
    }, {
      kind: 'h2',
      text: 'Tipos de estrógeno'
    }, {
      kind: 'ul',
      items: ['Pastillas', 'Cremas y otros productos para la piel', 'Parches']
    }, {
      kind: 'h2',
      text: 'Lo más importante de seguridad'
    }, {
      kind: 'pull',
      text: '«Si todavía tienes útero y estás tomando estrógeno, es muy importante que también tomes progesterona. Esto te protege del cáncer de útero.»'
    }, {
      kind: 'p',
      text: 'Esto no es opcional ni es un detalle. Si te ofrecen solo estrógeno y todavía tienes útero, pregunta por la progesterona.'
    }, {
      kind: 'h2',
      text: 'Tipos de progesterona'
    }, {
      kind: 'ul',
      items: ['Pastillas', 'Cremas y otros productos para la piel', 'Un DIU con progesterona']
    }, {
      kind: 'h2',
      text: 'Alternativas naturales'
    }, {
      kind: 'p',
      text: 'Las alternativas naturales a la terapia hormonal incluyen los fitoestrógenos y los adaptógenos, que ayudan con los síntomas de formas distintas y se pueden complementar.'
    }, {
      kind: 'p',
      text: 'Los fitoestrógenos, que están en la soya, la linaza, los frijoles y las lentejas, actúan sobre los receptores de estrógeno y pueden bajar los bochornos y la pérdida de hueso. Los adaptógenos como la rhodiola y la ashwagandha ayudan a manejar mejor el estrés y a equilibrar las hormonas.'
    }, {
      kind: 'p',
      text: 'Estas opciones son parte de un cuidado completo y hecho a tu medida, siempre con seguridad y seguimiento. Vale la pena platicarlas con tu médico en vez de empezarlas por tu cuenta.'
    }]
  }]
};
function getArticles(lang) {
  return ELLA_ARTICLES[lang] || ELLA_ARTICLES.en;
}
function getArticle(id, lang) {
  return getArticles(lang).find(a => a.id === id) || getArticles(lang)[0];
}
window.getArticles = getArticles;
window.getArticle = getArticle;
window.ELLA_ARTICLES = ELLA_ARTICLES;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens/articleData.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens/symptomData.jsx
try { (() => {
// Symptom pages. One entry per symptom: why it happens, what helps, when to
// see a doctor. Drafted for Jessica's review; sources are general patient pages.

const SRC = {
  nams: {
    source: 'The Menopause Society',
    title: 'Menopause information for women',
    href: 'https://www.menopause.org/for-women'
  },
  nia: {
    source: 'National Institute on Aging (NIH)',
    title: 'Menopause',
    href: 'https://www.nia.nih.gov/health/menopause'
  },
  mpEn: {
    source: 'MedlinePlus',
    title: 'Menopause',
    href: 'https://medlineplus.gov/menopause.html'
  },
  mpEs: {
    source: 'MedlinePlus en español',
    title: 'Menopausia',
    href: 'https://medlineplus.gov/spanish/menopause.html'
  },
  owh: {
    source: 'U.S. Office on Women’s Health',
    title: 'Menopause symptoms and relief',
    href: 'https://www.womenshealth.gov/menopause/menopause-symptoms-and-relief'
  },
  nimh: {
    source: 'National Institute of Mental Health',
    title: 'Depression',
    href: 'https://www.nimh.nih.gov/health/topics/depression'
  }
};
const ELLA_SYMPTOMS = {
  en: [{
    id: 'hot-flashes',
    name: 'Hot flashes & night sweats',
    tone: 'rose',
    article: 'hrt-and-alternatives',
    short: 'Sudden heat, sweating, and waking up drenched.',
    why: 'As estrogen drops, the part of the brain that controls body temperature becomes more sensitive. Small changes in temperature set off a flash of heat to cool you down. Night sweats are the same thing while you sleep.',
    habits: ['Dress in layers you can take off fast, and keep your bedroom cool.', 'Notice your triggers. Alcohol, spicy food, caffeine, and stress are common ones.', 'Slow, deep breathing when a flash starts can make it shorter.'],
    natural: ['Phytoestrogens like soy and flax help some women. Talk to your doctor first.'],
    treatment: ['Hormone therapy is the most effective treatment for hot flashes.', 'There are also non-hormonal prescription options if hormones aren’t right for you.'],
    doctor: ['They’re keeping you from sleeping or working.', 'They start after age 60, or come with fever or weight loss you can’t explain.'],
    sources: [SRC.nams, SRC.nia]
  }, {
    id: 'sleep',
    name: 'Trouble sleeping',
    tone: 'plum',
    article: 'inflammation',
    supp: true,
    short: 'Can’t fall asleep, or waking up at 3 a.m.',
    why: 'Falling estrogen and progesterone affect sleep directly, and night sweats wake you up. Stress and mood changes at this stage make it harder to fall back asleep.',
    habits: ['Go to bed and wake up at the same time, even on weekends.', 'Keep the room cool and dark, and put your phone away an hour before bed.', 'Avoid caffeine after noon and alcohol close to bedtime.'],
    natural: ['Magnesium helps some women relax and sleep better. See the Supplements page for which form to look for.'],
    treatment: ['If night sweats are what wake you, treating them often fixes the sleep too.', 'Ask about therapy for insomnia (CBT-I). It works well and has no side effects.'],
    doctor: ['You’ve slept badly most nights for more than a few weeks.', 'You snore loudly or stop breathing in your sleep. That can be sleep apnea, which becomes more common after menopause.'],
    sources: [SRC.nia, SRC.mpEn]
  }, {
    id: 'mood',
    name: 'Mood changes & anxiety',
    tone: 'plum',
    article: 'estrogen-explained',
    short: 'Irritable, anxious, or down, and you don’t know why.',
    why: 'Estrogen affects the brain chemicals that keep your mood steady. When it rises and falls in perimenopause, many women feel more anxious, irritable, or sad, even if they never did before.',
    habits: ['Move your body most days. Even a 20-minute walk helps mood.', 'Protect your sleep. Poor sleep makes anxiety worse.', 'Tell someone you trust how you’re feeling.'],
    natural: ['Omega-3 may help with low mood. Ask your doctor if it makes sense for you.'],
    treatment: ['Hormone therapy can help mood in perimenopause.', 'Talk therapy and antidepressants are also effective. Asking for help is not weakness.'],
    doctor: ['You’ve felt down or lost interest in things for more than two weeks.', 'You have any thoughts of hurting yourself. Call or text 988 right away.'],
    sources: [SRC.nimh, SRC.nams]
  }, {
    id: 'brain-fog',
    name: 'Brain fog & forgetfulness',
    tone: 'plum',
    article: 'inflammation',
    short: 'Losing words, forgetting why you walked in the room.',
    why: 'Estrogen supports memory and focus. When it drops, many women notice forgetfulness and trouble concentrating. For most, it improves after the transition. Poor sleep makes it much worse.',
    habits: ['Sleep comes first. Fixing sleep often clears the fog.', 'Exercise improves blood flow to the brain.', 'Use lists and reminders, and don’t blame yourself.'],
    natural: ['Reducing inflammation through food and exercise helps the whole body, including the brain.'],
    treatment: ['Treating hot flashes and sleep problems often helps memory too.'],
    doctor: ['It’s getting worse over time, or other people are noticing.', 'You get lost in familiar places or have trouble with everyday tasks.'],
    sources: [SRC.nia, SRC.nams]
  }, {
    id: 'vaginal-dryness',
    name: 'Vaginal dryness & painful sex',
    tone: 'rose',
    article: 'hrt-and-alternatives',
    short: 'Dryness, itching, burning, or pain during sex.',
    why: 'Less estrogen makes the tissue in and around the vagina thinner and drier. Unlike hot flashes, this usually doesn’t go away on its own, but it is very treatable.',
    habits: ['Use a water- or silicone-based lubricant during sex.', 'A vaginal moisturizer used a few times a week helps with daily dryness.', 'Avoid scented soaps and douches.'],
    natural: [],
    treatment: ['Vaginal estrogen (cream, ring, or tablet) works very well and acts mostly in that area.', 'Pelvic floor physical therapy helps with pain.'],
    doctor: ['Sex is painful, or you have burning or itching that won’t go away.', 'You have any bleeding after menopause.'],
    sources: [SRC.nams, SRC.owh]
  }, {
    id: 'joint-pain',
    name: 'Joint pain & stiffness',
    tone: 'sage',
    article: 'inflammation',
    short: 'Aching knees, hands, and shoulders, stiff in the morning.',
    why: 'Estrogen helps control inflammation and keeps joints and tissues healthy. When it drops, many women feel new aches and stiffness, especially in the morning.',
    habits: ['Keep moving. Strength training and walking protect joints.', 'Stretch in the morning to ease stiffness.', 'Foods that fight inflammation, like fish, olive oil, and vegetables, help.'],
    natural: ['Omega-3 and turmeric may ease joint pain. See the Supplements page.'],
    treatment: ['Hormone therapy helps joint pain for some women.'],
    doctor: ['A joint is red, hot, or swollen.', 'The pain keeps you from your daily activities.'],
    sources: [SRC.nams, SRC.mpEn]
  }, {
    id: 'weight',
    name: 'Weight changes',
    tone: 'sage',
    article: 'heart-health-menopause',
    short: 'Weight around the middle that won’t move like before.',
    why: 'After menopause the body stores more fat around the belly, and we lose muscle faster. Less muscle means a slower metabolism. This isn’t a lack of willpower.',
    habits: ['Lift weights or do resistance exercise 2–3 times a week to keep muscle.', 'Eat enough protein at every meal.', 'Walking 10,000 steps a day has been shown to reduce belly fat.'],
    natural: ['Fiber and protein help you feel full longer.'],
    treatment: ['Ask your doctor about your blood pressure, sugar, and cholesterol. Belly fat raises heart risk.'],
    doctor: ['You gain or lose weight quickly without trying.', 'You’re always tired, cold, or losing hair. That can be your thyroid.'],
    sources: [SRC.nia, SRC.mpEn]
  }],
  es: [{
    id: 'hot-flashes',
    name: 'Bochornos y sudores nocturnos',
    tone: 'rose',
    article: 'hrt-and-alternatives',
    short: 'Calor de repente, sudor, y despertar empapada.',
    why: 'Cuando baja el estrógeno, la parte del cerebro que controla la temperatura se vuelve más sensible. Un cambio pequeño de temperatura provoca una ola de calor para enfriarte. Los sudores nocturnos son lo mismo, pero mientras duermes.',
    habits: ['Vístete en capas que te puedas quitar rápido y mantén fresca tu recámara.', 'Fíjate qué te los provoca. El alcohol, el picante, la cafeína y el estrés son comunes.', 'Respirar lento y profundo cuando empieza un bochorno puede hacerlo más corto.'],
    natural: ['Los fitoestrógenos, como la soya y la linaza, le ayudan a algunas mujeres. Habla primero con tu médico.'],
    treatment: ['La terapia hormonal es el tratamiento que mejor funciona para los bochornos.', 'También hay medicamentos sin hormonas si las hormonas no son para ti.'],
    doctor: ['No te dejan dormir o trabajar.', 'Empiezan después de los 60, o vienen con fiebre o pérdida de peso sin explicación.'],
    sources: [SRC.mpEs, SRC.nams]
  }, {
    id: 'sleep',
    name: 'Problemas para dormir',
    tone: 'plum',
    article: 'inflammation',
    supp: true,
    short: 'No te puedes dormir, o te despiertas a las 3 de la mañana.',
    why: 'La baja del estrógeno y la progesterona afecta el sueño directamente, y los sudores nocturnos te despiertan. El estrés y los cambios de ánimo de esta etapa hacen más difícil volver a dormirte.',
    habits: ['Acuéstate y levántate a la misma hora, también los fines de semana.', 'Mantén el cuarto fresco y oscuro, y deja el celular una hora antes de dormir.', 'Evita la cafeína después del mediodía y el alcohol antes de acostarte.'],
    natural: ['El magnesio le ayuda a algunas mujeres a relajarse y dormir mejor. En la página de Suplementos te digo qué forma buscar.'],
    treatment: ['Si lo que te despierta son los sudores nocturnos, tratarlos casi siempre mejora el sueño.', 'Pregunta por la terapia para el insomnio (TCC-I). Funciona muy bien y no tiene efectos secundarios.'],
    doctor: ['Llevas varias semanas durmiendo mal casi todas las noches.', 'Roncas fuerte o dejas de respirar dormida. Puede ser apnea del sueño, que es más común después de la menopausia.'],
    sources: [SRC.mpEs, SRC.nia]
  }, {
    id: 'mood',
    name: 'Cambios de ánimo y ansiedad',
    tone: 'plum',
    article: 'estrogen-explained',
    short: 'Irritable, ansiosa o triste, sin saber por qué.',
    why: 'El estrógeno afecta las sustancias del cerebro que mantienen estable el ánimo. Cuando sube y baja en la perimenopausia, muchas mujeres se sienten más ansiosas, irritables o tristes, aunque nunca les había pasado.',
    habits: ['Mueve el cuerpo casi todos los días. Hasta una caminata de 20 minutos ayuda.', 'Cuida tu sueño. Dormir mal empeora la ansiedad.', 'Cuéntale a alguien de confianza cómo te sientes.'],
    natural: ['El omega-3 puede ayudar con el desánimo. Pregúntale a tu médico si te conviene.'],
    treatment: ['La terapia hormonal puede ayudar con el ánimo en la perimenopausia.', 'La terapia psicológica y los antidepresivos también funcionan. Pedir ayuda no es debilidad.'],
    doctor: ['Llevas más de dos semanas triste o sin ganas de nada.', 'Tienes cualquier pensamiento de hacerte daño. Llama o manda mensaje al 988 de inmediato.'],
    sources: [SRC.mpEs, SRC.nimh]
  }, {
    id: 'brain-fog',
    name: 'Mente nublada y olvidos',
    tone: 'plum',
    article: 'inflammation',
    short: 'Se te van las palabras, olvidas a qué entraste al cuarto.',
    why: 'El estrógeno ayuda a la memoria y a la concentración. Cuando baja, muchas mujeres notan olvidos y les cuesta concentrarse. Para la mayoría mejora después de la transición. Dormir mal lo empeora mucho.',
    habits: ['Primero el sueño. Dormir bien muchas veces despeja la mente.', 'El ejercicio mejora el flujo de sangre al cerebro.', 'Usa listas y recordatorios, y no te culpes.'],
    natural: ['Bajar la inflamación con la comida y el ejercicio ayuda a todo el cuerpo, también al cerebro.'],
    treatment: ['Tratar los bochornos y los problemas de sueño muchas veces mejora la memoria.'],
    doctor: ['Va empeorando con el tiempo, o otras personas lo notan.', 'Te pierdes en lugares conocidos o te cuestan las tareas de todos los días.'],
    sources: [SRC.mpEs, SRC.nia]
  }, {
    id: 'vaginal-dryness',
    name: 'Resequedad vaginal y dolor en las relaciones',
    tone: 'rose',
    article: 'hrt-and-alternatives',
    short: 'Resequedad, comezón, ardor o dolor al tener relaciones.',
    why: 'Con menos estrógeno, la piel dentro y alrededor de la vagina se vuelve más delgada y seca. A diferencia de los bochornos, esto casi nunca se quita solo, pero tiene muy buen tratamiento.',
    habits: ['Usa un lubricante a base de agua o de silicón al tener relaciones.', 'Un hidratante vaginal unas veces por semana ayuda con la resequedad diaria.', 'Evita jabones perfumados y duchas vaginales.'],
    natural: [],
    treatment: ['El estrógeno vaginal (crema, anillo o tableta) funciona muy bien y actúa casi solo en esa zona.', 'La terapia física del piso pélvico ayuda con el dolor.'],
    doctor: ['Te duele tener relaciones, o tienes ardor o comezón que no se quita.', 'Tienes cualquier sangrado después de la menopausia.'],
    sources: [SRC.mpEs, SRC.nams]
  }, {
    id: 'joint-pain',
    name: 'Dolor y rigidez en las articulaciones',
    tone: 'sage',
    article: 'inflammation',
    short: 'Te duelen rodillas, manos y hombros, y amaneces tiesa.',
    why: 'El estrógeno ayuda a controlar la inflamación y a mantener sanas las articulaciones. Cuando baja, muchas mujeres sienten dolores nuevos y rigidez, sobre todo en la mañana.',
    habits: ['Sigue moviéndote. Las pesas y caminar protegen las articulaciones.', 'Estírate en la mañana para aflojar la rigidez.', 'Los alimentos que bajan la inflamación, como el pescado, el aceite de oliva y las verduras, ayudan.'],
    natural: ['El omega-3 y la cúrcuma pueden aliviar el dolor. Ve la página de Suplementos.'],
    treatment: ['A algunas mujeres la terapia hormonal les ayuda con el dolor de articulaciones.'],
    doctor: ['Una articulación está roja, caliente o hinchada.', 'El dolor no te deja hacer tus cosas de todos los días.'],
    sources: [SRC.mpEs, SRC.nams]
  }, {
    id: 'weight',
    name: 'Cambios de peso',
    tone: 'sage',
    article: 'heart-health-menopause',
    short: 'Peso en la cintura que ya no baja como antes.',
    why: 'Después de la menopausia el cuerpo guarda más grasa en el abdomen y perdemos músculo más rápido. Menos músculo significa un metabolismo más lento. No es falta de fuerza de voluntad.',
    habits: ['Haz pesas o ejercicios de fuerza 2 o 3 veces por semana para no perder músculo.', 'Come suficiente proteína en cada comida.', 'Está comprobado que caminar 10,000 pasos al día ayuda a bajar la grasa del abdomen.'],
    natural: ['La fibra y la proteína te ayudan a sentirte llena por más tiempo.'],
    treatment: ['Pídele a tu médico que revise tu presión, tu azúcar y tu colesterol. La grasa del abdomen sube el riesgo del corazón.'],
    doctor: ['Subes o bajas de peso rápido sin intentarlo.', 'Siempre estás cansada, con frío o se te cae el pelo. Puede ser la tiroides.'],
    sources: [SRC.mpEs, SRC.nia]
  }]
};
function getSymptoms(lang) {
  return ELLA_SYMPTOMS[lang] || ELLA_SYMPTOMS.en;
}
window.ELLA_SYMPTOMS = ELLA_SYMPTOMS;
window.getSymptoms = getSymptoms;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens/symptomData.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/tweaks-panel.jsx
try { (() => {
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// workbook-app.js
try { (() => {
/* Ella Content Workbook — renderer, autosave, and export. Vanilla JS. */
(function () {
  var STORE = 'ella_wb_v1__';
  var flags = {
    source: {
      txt: 'NEEDS A SOURCE',
      cls: 'flag-source'
    },
    real: {
      txt: 'MUST BE REAL',
      cls: 'flag-real'
    },
    scope: {
      txt: 'PENDING SCOPE (Q1)',
      cls: 'flag-scope'
    }
  };
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function key(id) {
    return STORE + id;
  }
  var allSlots = [];
  WORKBOOK.forEach(function (sec) {
    sec.slots.forEach(function (s) {
      allSlots.push(s);
    });
  });
  function filledCount() {
    var n = 0;
    allSlots.forEach(function (s) {
      if ((localStorage.getItem(key(s.id)) || '').trim()) n++;
    });
    return n;
  }
  function updateProgress() {
    var done = filledCount(),
      total = allSlots.length;
    var pct = Math.round(done / total * 100);
    document.getElementById('wb-count').textContent = done + ' / ' + total + ' slots written';
    document.getElementById('wb-bar-fill').style.width = pct + '%';
  }
  function autosize(ta) {
    ta.style.height = 'auto';
    ta.style.height = Math.max(ta.scrollHeight, 44) + 'px';
  }
  function render() {
    var root = document.getElementById('wb-sections');
    WORKBOOK.forEach(function (sec, si) {
      var secEl = el('section', 'wb-sec');
      secEl.id = 'sec-' + si;
      var head = el('div', 'wb-sec-head');
      head.appendChild(el('h2', null, esc(sec.page)));
      if (sec.blurb) head.appendChild(el('p', 'wb-sec-blurb', esc(sec.blurb)));
      secEl.appendChild(head);
      sec.slots.forEach(function (slot) {
        var card = el('div', 'wb-slot');
        var top = el('div', 'wb-slot-top');
        top.appendChild(el('span', 'wb-slot-label', esc(slot.label)));
        if (slot.flag && flags[slot.flag]) {
          top.appendChild(el('span', 'wb-flag ' + flags[slot.flag].cls, flags[slot.flag].txt));
        }
        card.appendChild(top);
        if (slot.guide) card.appendChild(el('p', 'wb-guide', esc(slot.guide)));
        if (slot.current) {
          var cur = el('div', 'wb-current');
          cur.appendChild(el('span', 'wb-current-tag', 'On the site now'));
          cur.appendChild(el('div', 'wb-current-text', esc(slot.current).replace(/\n/g, '<br>')));
          card.appendChild(cur);
        }
        var ta = el('textarea', 'wb-input');
        ta.placeholder = 'Your words…';
        ta.value = localStorage.getItem(key(slot.id)) || '';
        ta.addEventListener('input', function () {
          localStorage.setItem(key(slot.id), ta.value);
          autosize(ta);
          updateProgress();
        });
        card.appendChild(ta);
        secEl.appendChild(card);
        // size after insert
        requestAnimationFrame(function () {
          autosize(ta);
        });
      });
      root.appendChild(secEl);
    });
    updateProgress();
  }
  function buildExport() {
    var out = ['ELLA — CONTENT WORKBOOK', 'Filled: ' + filledCount() + ' / ' + allSlots.length, ''];
    WORKBOOK.forEach(function (sec) {
      out.push('========================================');
      out.push(sec.page.toUpperCase());
      out.push('========================================');
      sec.slots.forEach(function (s) {
        var v = (localStorage.getItem(key(s.id)) || '').trim();
        out.push('');
        out.push('— ' + s.label + (s.flag ? '  [' + (flags[s.flag] ? flags[s.flag].txt : s.flag) + ']' : ''));
        out.push(v ? v : '(not yet written)');
      });
      out.push('');
    });
    return out.join('\n');
  }
  function flash(msg) {
    var t = document.getElementById('wb-toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(flash._t);
    flash._t = setTimeout(function () {
      t.classList.remove('show');
    }, 2200);
  }
  document.addEventListener('DOMContentLoaded', function () {
    render();
    document.getElementById('wb-copy').addEventListener('click', function () {
      var text = buildExport();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          flash('Copied! Paste it back to me in the chat.');
        }, function () {
          fallbackCopy(text);
        });
      } else {
        fallbackCopy(text);
      }
    });
    function fallbackCopy(text) {
      var ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        flash('Copied! Paste it back to me in the chat.');
      } catch (e) {
        flash('Press Ctrl/Cmd+C to copy.');
      }
      document.body.removeChild(ta);
    }
    document.getElementById('wb-download').addEventListener('click', function () {
      var blob = new Blob([buildExport()], {
        type: 'text/plain'
      });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'ella-content.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      flash('Downloaded ella-content.txt');
    });
    document.getElementById('wb-clear').addEventListener('click', function () {
      if (!confirm('Clear everything you\u2019ve written here? This can\u2019t be undone.')) return;
      allSlots.forEach(function (s) {
        localStorage.removeItem(key(s.id));
      });
      document.querySelectorAll('.wb-input').forEach(function (ta) {
        ta.value = '';
        autosize(ta);
      });
      updateProgress();
      flash('Cleared.');
    });
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "workbook-app.js", error: String((e && e.message) || e) }); }

// workbook-data.js
try { (() => {
/* Ella Content Workbook — slot data.
   Each section maps to a place on the site. Each slot has:
   id      stable key (used to save your words locally)
   label   what this piece of text is
   guide   how long + what tone (a guide, not a rule)
   current the placeholder that's on the site right now (reference only)
   long    true → big multi-line field
   flag    optional banner: 'source' (needs a citation) | 'real' (must be real, not invented) | 'scope' (pending the menopause-vs-wellness decision)
*/
window.WORKBOOK = [{
  page: 'Global (appears on every page)',
  blurb: 'The little persistent bits — the top strip, the footer, the newsletter.',
  slots: [{
    id: 'promo',
    label: 'Rotating top strip',
    long: true,
    guide: '4 short nudges, ~5–9 words each, each ending in an action. These rotate at the very top of every page.',
    current: 'New: Free doctor-visit checklist (PDF)\nGet Jessica\u2019s weekly note in your inbox\nTake the 5-question check-in\nAvailable in English / Espa\u00f1ol'
  }, {
    id: 'footer_tagline',
    label: 'Footer tagline',
    guide: 'One warm line, ~8–14 words. Your mission in a single breath.',
    current: 'Women supporting women through every hormonal stage of life.'
  }, {
    id: 'newsletter',
    label: 'Newsletter block (title · subtitle · button)',
    long: true,
    guide: 'Title ~3–5 words, subtitle ~4–8 words, button 1–2 words. This is your main list-building moment.',
    current: 'Get the weekly note.\nHonest, useful, never spammy.\nSubscribe'
  }]
}, {
  page: 'Homepage — Hero',
  blurb: 'The first screen. ~90% of the decision to stay happens here. Every word earns its place.',
  slots: [{
    id: 'hero_eyebrow',
    label: 'Eyebrow (tiny label above the headline)',
    guide: '2–4 words, ALL CAPS. Your positioning in a breath. (Currently "BY WOMEN, FOR WOMEN".)',
    current: 'BY WOMEN, FOR WOMEN'
  }, {
    id: 'hero_h1',
    label: 'Main headline',
    guide: '3–6 words. The emotional hook — what she feels, not what you sell. One word can be italic for emphasis.',
    current: 'You\u2019re not imagining it.'
  }, {
    id: 'hero_sub',
    label: 'Sub-headline',
    guide: '1–2 sentences, ~25–40 words. What Ella is + who it\u2019s for. Plain, calm, specific.',
    current: 'Honest, plainspoken information about menopause, nutrition, supplements, exercise, mental health, and the questions to ask your doctor. Built by a physician assistant for women who deserve answers.'
  }, {
    id: 'hero_afford',
    label: 'Affordability line (the highlighted quote)',
    guide: '1 sentence. The accessibility promise.',
    current: 'Everything you need to know about menopause without breaking the bank. Built to be affordable and accessible.'
  }, {
    id: 'hero_ctas',
    label: 'The two buttons',
    guide: 'Two labels, 1–3 words each. One primary action, one softer.',
    current: 'Start reading  /  Meet Jessica'
  }, {
    id: 'hero_cred',
    label: 'Credential line (under the buttons)',
    flag: 'source',
    guide: 'Factual, verifiable credentials only. This is the trust anchor — keep it true.',
    current: 'Jessica Zavala, PA-C · OB-GYN background · Women\u2019s wellness certificate'
  }]
}, {
  page: 'Homepage — Why this matters',
  blurb: 'The "why should I care" section. Sets the stakes for menopause specifically.',
  slots: [{
    id: 'why_eyebrow',
    label: 'Eyebrow',
    guide: '2–4 words, caps.',
    current: 'WHY THIS MATTERS'
  }, {
    id: 'why_h2',
    label: 'Section headline',
    guide: '1 line, can wrap to two. A reframe or a truth. Italic emphasis allowed.',
    current: 'Menopause isn\u2019t the end of anything. It just doesn\u2019t get talked about.'
  }, {
    id: 'why_p1',
    label: 'Paragraph 1',
    long: true,
    flag: 'source',
    guide: '~40–60 words. The problem. Any statistic here needs a source (see the Sources page).',
    current: 'About half of all women will go through menopause — and yet most medical curricula spend less than an hour on it. The result: millions of women navigate a decade of hormonal change with almost no real guidance.'
  }, {
    id: 'why_p2',
    label: 'Paragraph 2',
    long: true,
    guide: '~40–60 words. The turn toward hope / agency. End on what Ella does.',
    current: 'Knowing what\u2019s happening, what\u2019s worth doing about it, and what questions to ask your doctor — that\u2019s the difference between feeling lost and feeling in charge. Ella is for the second one.'
  }, {
    id: 'why_stats',
    label: 'Two stats',
    long: true,
    flag: 'source',
    guide: 'Two punchy numbers + labels. EACH NEEDS A SOURCE. Replace with stats you can stand behind.',
    current: '7–14 yrs — Average length of perimenopause\nless than 1 hour — Typical medical-school coverage of menopause'
  }]
}, {
  page: 'Homepage — What we cover (the 6 pillars)',
  blurb: 'The content map. If Ella becomes menopause-only, some of these get reframed or cut (see your Q1 decision).',
  slots: [{
    id: 'pillars_eyebrow',
    label: 'Eyebrow',
    guide: '2–4 words, caps.',
    current: 'WHAT WE COVER'
  }, {
    id: 'pillars_h2',
    label: 'Section headline',
    guide: '1 short line.',
    current: 'Everything in one trusted place.'
  }, {
    id: 'pillar_nutrition',
    label: 'Pillar 1 — Nutrition (title + 1 line)',
    guide: 'Title 1–2 words, description ~12–18 words. Frame it through the menopause lens.',
    current: 'Nutrition — Foods to include, protein needs during menopause, healthier swaps. No meal plans, just real information.'
  }, {
    id: 'pillar_supplements',
    label: 'Pillar 2 — Supplements (title + 1 line)',
    flag: 'scope',
    guide: 'Same shape. Note: this is the most likely future revenue area — keep it honest, "what\u2019s worth it" not "buy this".',
    current: 'Supplements — Omega-3, Vit D, Vit K, collagen, magnesium glycinate, fiber. What\u2019s worth taking, with links to buy.'
  }, {
    id: 'pillar_exercise',
    label: 'Pillar 3 — Exercise (title + 1 line)',
    guide: 'Same shape.',
    current: 'Exercise — Strength training, walking, yoga. Light weights count. Less cardio, more muscle.'
  }, {
    id: 'pillar_mental',
    label: 'Pillar 4 — Mental health (title + 1 line)',
    guide: 'Same shape.',
    current: 'Mental health — Support groups, meetups, resource links. You\u2019re not alone, and the data backs that up.'
  }, {
    id: 'pillar_skin',
    label: 'Pillar 5 — Skin care (title + 1 line)',
    flag: 'scope',
    guide: 'Pending Q1: if Ella is menopause-only, this may get cut or folded into another pillar.',
    current: 'Skin care — What hormonal changes do to your skin, and what actually helps.'
  }, {
    id: 'pillar_hormones',
    label: 'Pillar 6 — Hormonal therapy (title + 1 line)',
    guide: 'Same shape. Keep the "options, not endorsements" stance.',
    current: 'Hormonal therapy — HRT options explained in plain English. No endorsements, just clarity.'
  }]
}, {
  page: 'Homepage — Check-in banner',
  blurb: 'Invites her into the quiz.',
  slots: [{
    id: 'checkin_eyebrow',
    label: 'Eyebrow',
    guide: '2–3 words, caps.',
    current: 'PERSONAL CHECK-IN'
  }, {
    id: 'checkin_h2',
    label: 'Headline',
    guide: 'A question or invitation, ~3–6 words.',
    current: 'Not sure where to start?'
  }, {
    id: 'checkin_p',
    label: 'Paragraph',
    long: true,
    guide: '~20–30 words. What the quiz does and why it\u2019s safe (no score, no judgment).',
    current: 'Answer a few quick questions and we\u2019ll point you to the right reading, based on what you\u2019re actually experiencing.'
  }, {
    id: 'checkin_btn',
    label: 'Button label',
    guide: '2–4 words.',
    current: 'Take the check-in'
  }]
}, {
  page: 'Homepage — Work with Jessica (consultation)',
  blurb: 'The soft sell: a 15-minute call. Keep low-pressure.',
  slots: [{
    id: 'consult_eyebrow',
    label: 'Eyebrow',
    guide: '2–3 words, caps.',
    current: 'WORK WITH ME'
  }, {
    id: 'consult_h2',
    label: 'Headline',
    guide: '~4–8 words. Name the offer plainly.',
    current: 'Book a 15-minute wellness consultation.'
  }, {
    id: 'consult_p',
    label: 'Paragraph',
    long: true,
    guide: '~30–45 words. What the call is, what it isn\u2019t. No pressure.',
    current: 'A short, no-pressure call with Jessica to talk through your symptoms, your questions, and where to go next. No commitment, just clarity.'
  }, {
    id: 'consult_list',
    label: 'Three bullet points',
    long: true,
    guide: 'Three short outcomes, ~4–7 words each.',
    current: 'Personalized guidance for your stage\nWhat to ask your own doctor\nWhere to start, without the overwhelm'
  }]
}, {
  page: 'Homepage — Testimonials',
  blurb: 'Social proof. These build or break trust instantly.',
  slots: [{
    id: 'testi_eyebrow',
    label: 'Eyebrow',
    guide: '2–5 words, caps.',
    current: 'IN THEIR OWN WORDS'
  }, {
    id: 'testi_h2',
    label: 'Headline',
    guide: '~2–4 words.',
    current: 'Feeling seen, finally.'
  }, {
    id: 'testi_quotes',
    label: 'The quotes',
    long: true,
    flag: 'real',
    guide: 'These are INVENTED right now. Use only REAL quotes (with permission). One per line: "quote" — First name L., age. Start with 2–3 real ones; better few-and-true than many-and-fake.',
    current: '"For the first time I feel like I have real information." — Marta R., 52\n"I brought the list to my OB-GYN and we had a real conversation." — Elena G., 48\n"Having it in Spanish makes all the difference." — Carolina M., 50\n"I didn\u2019t feel judged. I felt heard." — Patricia D., 55\n"The check-in helped me understand where I am." — Lorena S., 46'
  }]
}, {
  page: 'Homepage — Everything you need (link grid)',
  blurb: 'The closing directory of quick jumps. Pure navigation.',
  slots: [{
    id: 'info_eyebrow',
    label: 'Eyebrow',
    guide: '2–4 words, caps.',
    current: 'EVERYTHING YOU NEED'
  }, {
    id: 'info_h2',
    label: 'Headline',
    guide: '~3–5 words.',
    current: 'The information you need.'
  }, {
    id: 'info_cols',
    label: 'Three columns (title + link labels)',
    long: true,
    guide: 'Three groupings, each a title + 4–5 link labels. These should mirror your real sections.',
    current: 'Nutrition & exercise: Protein after 45 · Healthier swaps · Strength training for beginners · Yoga for mental health\nPeri/Menopause: Hormonal therapy options · OB-GYN visit checklist · Find a specialist · Supplements to know\nReproductive health: HPV, what to know · Screening schedule · Symptoms not to brush off · Skin care and hormones'
  }]
}, {
  page: 'The Check-in Quiz',
  blurb: '5 questions → a personalized reading list. Tone: gentle, no score, no diagnosis.',
  slots: [{
    id: 'quiz_intro',
    label: 'Quiz intro (title + subtitle)',
    long: true,
    guide: 'Title ~4–6 words, subtitle ~15–25 words. Reassure: short, no judgment.',
    current: 'A short, gentle check-in.\nFive quick questions. No score, no judgment, just a clearer picture of what stage your body is in and what to read next.'
  }, {
    id: 'quiz_q1',
    label: 'Q1 — Stage (question + 5 options)',
    long: true,
    guide: 'Question + 5 options, one per line. Keep it kind and uncertain-friendly.',
    current: 'Where are you in your journey?\n• My periods are still regular\n• My periods are changing or irregular\n• It\u2019s been 12+ months since my last period\n• I\u2019ve had surgical or medical menopause\n• I\u2019m not sure where I am'
  }, {
    id: 'quiz_q2',
    label: 'Q2 — Symptoms (question + 8 options, multi-select)',
    long: true,
    guide: 'Question + up to 8 options + a "none" option. One per line.',
    current: 'Which of these have you noticed lately?\n• Hot flashes or night sweats\n• Sleep changes or insomnia\n• Mood shifts, anxiety, or low mood\n• Brain fog or memory lapses\n• Irregular or heavy periods\n• Vaginal dryness or changes in libido\n• Joint aches or weight changes\n• None of these right now'
  }, {
    id: 'quiz_q3',
    label: 'Q3 — Daily impact (question + 4 options)',
    long: true,
    guide: 'Question + 4 options.',
    current: 'How much is this affecting your daily life?\n• Barely, I\u2019m mostly curious\n• Some days are harder than others\n• A lot, it\u2019s hard to ignore\n• I\u2019m honestly not sure'
  }, {
    id: 'quiz_q4',
    label: 'Q4 — Goals (question + 6 options, multi-select)',
    long: true,
    guide: 'Question + 6 options.',
    current: 'What would feel most helpful right now?\n• Understanding what\u2019s happening to my body\n• Nutrition and exercise that fit this stage\n• Knowing which supplements are worth it\n• Learning about hormone therapy options\n• Knowing what to ask my doctor\n• Feeling less alone in it'
  }, {
    id: 'quiz_q5',
    label: 'Q5 — Doctor history (question + 4 options)',
    long: true,
    guide: 'Question + 4 options.',
    current: 'Have you talked to a doctor about this?\n• Yes, and it was helpful\n• Yes, but I felt dismissed\n• Not yet\n• No, I\u2019m not sure how to bring it up'
  }, {
    id: 'quiz_result',
    label: 'Results headline + disclaimer',
    long: true,
    flag: 'source',
    guide: 'Headline ~5–8 words. Keep the medical disclaimer (general info, not advice).',
    current: 'Here\u2019s a starting place, just for you.\n[Disclaimer] This is general information, not medical advice or a diagnosis. For your specific situation, talk with your own doctor.'
  }]
}, {
  page: 'About Jessica',
  blurb: 'The founder page. For this audience, this page is the trust engine. Write it in first person.',
  slots: [{
    id: 'about_eyebrow',
    label: 'Eyebrow',
    guide: '2–4 words, caps.',
    current: 'MEET THE FOUNDER'
  }, {
    id: 'about_h1',
    label: 'Headline',
    guide: 'A warm hello, ~2–4 words.',
    current: 'Hi, I\u2019m Jessica.'
  }, {
    id: 'about_lede',
    label: 'Opening paragraph',
    long: true,
    guide: '~40–60 words. Who you are + the moment that made you build Ella.',
    current: 'I\u2019m a physician assistant with an OB-GYN background. I built Ella because, over and over, I watched women in their forties and fifties walk into the clinic exhausted, scared, and without answers. You shouldn\u2019t have to piece this together alone.'
  }, {
    id: 'about_creds',
    label: 'Credentials (list)',
    long: true,
    flag: 'source',
    guide: 'Real, verifiable credentials only. One per line.',
    current: 'Physician Assistant, Certified (PA-C)\nClinical training in obstetrics and gynecology\nWomen\u2019s Wellness certificate\nYears of personal research in women\u2019s hormonal health'
  }, {
    id: 'about_why',
    label: '"Why Ella" paragraph',
    long: true,
    flag: 'source',
    guide: '~40–60 words. The gap Ella fills. (Stat about med-school coverage needs a source.)',
    current: 'Most medical curricula spend under an hour on menopause. That means millions of women are navigating a decade of hormonal change with almost no guidance. That gap is exactly why Ella exists.'
  }, {
    id: 'about_promise',
    label: 'Your promise (pull-quote)',
    long: true,
    guide: '1 sentence, quotable. Your core stance.',
    current: 'My promise is simple: honest information, no alarmism, no selling you anything you don\u2019t need.'
  }, {
    id: 'about_isnt',
    label: '"What Ella isn\u2019t" paragraph',
    long: true,
    guide: '~30–45 words. Sets boundaries: not a doctor, no diagnosis, no endorsements.',
    current: 'Ella doesn\u2019t replace your doctor. It doesn\u2019t diagnose. It doesn\u2019t endorse any specific brand, hormone protocol, or therapy. What it does: help you understand your options and walk into your next appointment with the right questions.'
  }, {
    id: 'about_contact',
    label: 'Contact line + email',
    flag: 'real',
    guide: 'One line + a real email address.',
    current: 'Question, idea, or collaboration? Reach me at jessica@ellahealth.com'
  }]
}, {
  page: 'Articles (6)',
  blurb: 'Each article = a title, a one-line lede, and the body. Rewrite the body in your voice — aim for ~4–8 short sections with one pull-quote. Any number/claim needs a source.',
  slots: [{
    id: 'art_protein',
    label: 'Article — Protein after 45 (Nutrition)',
    long: true,
    flag: 'source',
    guide: 'Title + lede + body. Current sections: How much do you need · Foods to add this week. The protein numbers need sources.',
    current: 'Title: Protein after 45: why it suddenly matters so much.\nLede: Your body starts losing muscle faster than before, and protein is the single most useful tool to slow it down.'
  }, {
    id: 'art_peri',
    label: 'Article — What is perimenopause (Perimenopause)',
    long: true,
    flag: 'source',
    guide: 'Title + lede + body. Current sections: The hormone shift in plain English · Common signs.',
    current: 'Title: What is perimenopause, really?\nLede: The years before menopause are often the loudest. Here\u2019s what\u2019s actually happening, when it usually starts, and what to expect.'
  }, {
    id: 'art_swaps',
    label: 'Article — Five food swaps (Nutrition)',
    long: true,
    guide: 'Title + lede + body. List of 5 swaps.',
    current: 'Title: Five food swaps your hormones will thank you for.\nLede: Small changes, not a meal plan. Five swaps that nudge your nutrition in the right direction.'
  }, {
    id: 'art_sleep',
    label: 'Article — Sleep & hormones (Mental health)',
    long: true,
    flag: 'source',
    guide: 'Title + lede + body. Keep claims sourced.',
    current: 'Title: Sleep, hormones, and what actually helps.\nLede: Sleep changes in perimenopause are real, frustrating, and fixable.'
  }, {
    id: 'art_strength',
    label: 'Article — Strength training for beginners (Exercise)',
    long: true,
    guide: 'Title + lede + body.',
    current: 'Title: Strength training when you\u2019ve never lifted before.\nLede: You don\u2019t need a gym, a coach, or any equipment to start.'
  }, {
    id: 'art_hotflash',
    label: 'Article — The truth about hot flashes (Perimenopause)',
    long: true,
    flag: 'source',
    guide: 'Title + lede + body.',
    current: 'Title: The truth about hot flashes.\nLede: Why they happen, why they feel different at 3 a.m., and the surprisingly long menu of things that help.'
  }]
}, {
  page: 'Other pages (longer — outline these)',
  blurb: 'These hold more content. For now, give me the headline + the list of items/sections you want; we\u2019ll draft the bodies together.',
  slots: [{
    id: 'sec_supplements',
    label: 'Supplements hub',
    long: true,
    flag: 'scope',
    guide: 'Intro headline + which supplements to feature + your stance on each. (Future revenue area — keep it "what\u2019s worth it".)',
    current: 'Currently lists: Omega-3, Vitamin D, Vitamin K, collagen, magnesium glycinate, fiber — each with a "why", dosing notes, and research backing.'
  }, {
    id: 'sec_hormones',
    label: 'Hormonal therapy page',
    long: true,
    flag: 'source',
    guide: 'Intro headline + the options you want to explain. Keep "options, not endorsements". Link authoritative sources.',
    current: 'Currently: explains HRT options + external links, framed as options-only, never endorsing.'
  }, {
    id: 'sec_doctor',
    label: 'Doctor-visit checklist (printable)',
    long: true,
    guide: 'The actual questions you want women to bring to their OB-GYN. This is a flagship freebie — make it genuinely useful.',
    current: 'Currently: a printable/downloadable list covering perimenopause, HRT options, and finding a menopause specialist.'
  }, {
    id: 'sec_cancer',
    label: 'Cancer & HPV page',
    long: true,
    flag: 'scope',
    guide: 'PENDING your Q1 scope call. If Ella stays menopause-only, this likely gets cut or folded into a single "screenings still matter" article.',
    current: 'Currently: a full screen on reproductive cancers, HPV, screening, and where to learn more.'
  }]
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "workbook-data.js", error: String((e && e.message) || e) }); }

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.Header = __ds_scope.Header;

__ds_ns.Icons = __ds_scope.Icons;

__ds_ns.Photo = __ds_scope.Photo;

__ds_ns.SvgAssets = __ds_scope.SvgAssets;

__ds_ns.AboutJessica = __ds_scope.AboutJessica;

__ds_ns.ArticleView = __ds_scope.ArticleView;

__ds_ns.ArticlesHub = __ds_scope.ArticlesHub;

__ds_ns.AwarenessQuiz = __ds_scope.AwarenessQuiz;

__ds_ns.CareOnBudget = __ds_scope.CareOnBudget;

__ds_ns.Glossary = __ds_scope.Glossary;

__ds_ns.Homepage = __ds_scope.Homepage;

__ds_ns.NutritionHub = __ds_scope.NutritionHub;

__ds_ns.Privacy = __ds_scope.Privacy;

__ds_ns.Resources = __ds_scope.Resources;

__ds_ns.SupplementsHub = __ds_scope.SupplementsHub;

__ds_ns.Symptoms = __ds_scope.Symptoms;

__ds_ns.WhenToSeeDoctor = __ds_scope.WhenToSeeDoctor;

})();
