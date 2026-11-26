// Ella website kit, interactive prototype shell. Single-page router
// across the 5 screens, plus a Tweaks panel for color / type / hero
// variant / language.

// ---- Shared external links (replace placeholders with real ones) ----
// Booking falls back to email if the calendar link is ever removed.
const ELLA_EMAIL = 'info@ellabienestar.com';
const ELLA_LINKS = {
  calendar: 'https://calendar.app.google/ocK2oisypCb66A4X9',
  email: ELLA_EMAIL,
};
// Until a booking link exists, "Book" opens an email to Jessica.
ELLA_LINKS.booking = ELLA_LINKS.calendar ||
  ('mailto:' + ELLA_EMAIL + '?subject=' + encodeURIComponent('Cita de 30 minutos / 30-minute appointment'));
window.ELLA_LINKS = ELLA_LINKS;

const ELLA_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primary": "#8a5d72",
  "displayFont": "DM Serif Display",
  "bodyFont": "Nunito",
  "heroVariant": "default",
  "showOrnaments": true,
  "lang": "en"
}/*EDITMODE-END*/;

// ---- URLs: every page gets its own address ----
// The built site (window.ELLA_STATIC) uses real paths, e.g. /es/articles/inflammation/.
// The editable prototype (this folder served as-is) uses #/es/articles/inflammation.
const ELLA_ROUTES = ['home', 'articles', 'article', 'nutrition', 'supplements', 'resources', 'quiz', 'privacy', 'glossary', 'symptoms', 'urgent', 'budget'];
const ELLA_PATH_MODE = !!window.ELLA_STATIC;
const ELLA_BASE = window.ELLA_BASE || '/';
function parseEllaParts(parts) {
  let lang = null;
  if (parts[0] === 'es' || parts[0] === 'en') lang = parts.shift();
  let route = parts[0] || 'home', id = null;
  if (route === 'articles' && parts[1]) { route = 'article'; id = decodeURIComponent(parts[1]); }
  if (route === 'symptoms' && parts[1]) { id = decodeURIComponent(parts[1]); }
  if (!ELLA_ROUTES.includes(route)) route = 'home';
  return { lang, route, id };
}
function ellaHashParts() {
  return (window.location.hash || '').replace(/^#\/?/, '').split('/').filter(Boolean);
}
function parseEllaHash() {
  if (ELLA_PATH_MODE) {
    // An old #/en/... link still works: it is read once, then the address is rewritten.
    if (/^#\//.test(window.location.hash || '')) return parseEllaParts(ellaHashParts());
    const rel = window.location.pathname.startsWith(ELLA_BASE)
      ? window.location.pathname.slice(ELLA_BASE.length) : window.location.pathname;
    return parseEllaParts(rel.split('/').filter((x) => x && x !== 'index.html'));
  }
  return parseEllaParts(ellaHashParts());
}
function buildEllaPath(lang, route, id) {
  const path = route === 'home' ? '' : route === 'article' ? 'articles/' + encodeURIComponent(id)
    : (route === 'symptoms' && id) ? 'symptoms/' + encodeURIComponent(id) : route;
  return ELLA_PATH_MODE
    ? ELLA_BASE + lang + '/' + (path ? path + '/' : '')
    : '#/' + lang + (path ? '/' + path : '');
}
window.ellaPath = (lang, route, id) => buildEllaPath(lang, route, id);
// First visit: Spanish-speaking browsers open in Spanish.
function initialEllaLang(fallback) {
  const fromUrl = parseEllaHash().lang;
  if (fromUrl) return fromUrl;
  try { const saved = localStorage.getItem('ella-lang'); if (saved === 'es' || saved === 'en') return saved; } catch (e) {}
  const nav = (navigator.languages && navigator.languages[0]) || navigator.language || '';
  return /^es\b/i.test(nav) ? 'es' : (fallback || 'en');
}

function App() {
  const [t, setTweak] = useTweaks(ELLA_TWEAK_DEFAULTS);
  const initial = React.useMemo(parseEllaHash, []);
  const [route, setRoute] = React.useState(initial.route);
  const [articleId, setArticleId] = React.useState(initial.route === 'article' && initial.id ? initial.id : 'menopause-vs-perimenopause');
  const [symptomId, setSymptomId] = React.useState(initial.route === 'symptoms' ? initial.id : null);
  function openSymptom(id) { setSymptomId(id); setRoute('symptoms'); window.scrollTo({ top: 0 }); }
  const [lang, setLangState] = React.useState(() => initialEllaLang(t.lang));
  const setLang = (l) => { setLangState(l); try { localStorage.setItem('ella-lang', l); } catch (e) {} };

  // Keep the address bar in step with the page (adds a history entry, so Back works).
  const firstSync = React.useRef(true);
  React.useEffect(() => {
    const want = buildEllaPath(lang, route, route === 'symptoms' ? symptomId : articleId);
    if (ELLA_PATH_MODE) {
      const here = window.location.pathname + window.location.hash;
      if (here !== want) {
        if (firstSync.current) window.history.replaceState(null, '', want);
        else window.history.pushState(null, '', want);
      }
      const page = window.ELLA_PAGE_META && window.ELLA_PAGE_META[want.slice(ELLA_BASE.length)];
      if (page) document.title = page;
    } else if (window.location.hash !== want) {
      window.location.hash = want;
    }
    firstSync.current = false;
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
    const evt = ELLA_PATH_MODE ? 'popstate' : 'hashchange';
    window.addEventListener(evt, onHash);
    return () => window.removeEventListener(evt, onHash);
  }, [lang]);
  const [articleCategory, setArticleCategory] = React.useState(null);
  const headerRef = React.useRef(null);

  function openArticle(id) {
    setArticleId(id);
    setRoute('article');
    window.scrollTo({ top: 0 });
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
      const cl = (v) => Math.max(0, Math.min(255, v));
      const r = cl(((n >> 16) & 255) - amt), g = cl(((n >> 8) & 255) - amt), b = cl((n & 255) - amt);
      return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
    };
    root.style.setProperty('--ella-rose-deep', dark(t.primary, 25));
    root.style.setProperty('--brand-primary-hover', dark(t.primary, 25));

    // font swap
    root.style.setProperty('--font-display', `'${t.displayFont}', 'Cormorant Garamond', Georgia, serif`);
    root.style.setProperty('--font-body', `'${t.bodyFont}', 'Avenir Next', 'Segoe UI', system-ui, sans-serif`);
  }, [t.primary, t.displayFont, t.bodyFont]);

  React.useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  // Reset scroll on route change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [route]);

  // Scroll-reveal: fade/slide sections in as they enter the viewport
  React.useEffect(() => {
    // Only sections that start below the fold fade in, and they start just
    // before they scroll into view, so nothing on screen is ever hidden.
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const fold = window.innerHeight;
    const targets = [...document.querySelectorAll('main section:not(.ella-hero)')]
      .filter((el) => el.getBoundingClientRect().top > fold);
    if (!targets.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px 12% 0px' });
    targets.forEach((el) => {
      el.classList.add('ella-reveal');
      io.observe(el);
    });
    return () => io.disconnect();
  }, [route]);


  let screen = null;
  if (route === 'home')        screen = <Homepage lang={lang} setRoute={setRoute} setArticleId={setArticleId} openSymptom={openSymptom} goToCategory={goToCategory} primaryColor={t.primary} heroVariant={t.heroVariant} />;
  else if (route === 'quiz')   screen = <AwarenessQuiz lang={lang} setRoute={setRoute} openArticle={openArticle} />;
  else if (route === 'article')screen = <ArticleView lang={lang} setRoute={setRoute} articleId={articleId} setArticleId={setArticleId} />;
  else if (route === 'articles') screen = <ArticlesHub lang={lang} setRoute={setRoute} setArticleId={setArticleId} initialCategory={articleCategory} />;
  else if (route === 'nutrition') screen = <NutritionHub lang={lang} setRoute={setRoute} setArticleId={setArticleId} />;
  else if (route === 'resources') screen = <Resources lang={lang} setRoute={setRoute} />;
  else if (route === 'supplements') screen = <SupplementsHub lang={lang} setRoute={setRoute} />;
  else if (route === 'privacy') screen = <Privacy lang={lang} setRoute={setRoute} />;
  else if (route === 'glossary') screen = <Glossary lang={lang} setRoute={setRoute} />;
  else if (route === 'symptoms') screen = <Symptoms lang={lang} setRoute={(r) => { if (r === 'symptoms') setSymptomId(null); setRoute(r); }} symptomId={symptomId} openSymptom={openSymptom} openArticle={openArticle} />;
  else if (route === 'urgent') screen = <WhenToSeeDoctor lang={lang} setRoute={setRoute} />;
  else if (route === 'budget') screen = <CareOnBudget lang={lang} setRoute={setRoute} />;
  else screen = <Homepage lang={lang} setRoute={setRoute} setArticleId={setArticleId} openSymptom={openSymptom} goToCategory={goToCategory} primaryColor={t.primary} heroVariant={t.heroVariant} />;

  return (
    <div className={t.showOrnaments ? '' : 'ella-no-ornaments'}>
      <Header lang={lang} setLang={setLang} route={route} setRoute={setRoute} goToCategory={goToCategory} openArticle={openArticle} openSymptom={openSymptom} />
      <main key={route} className="ella-main-fade">{screen}</main>
      <Footer lang={lang} setLang={setLang} route={route} setRoute={setRoute} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Brand">
          <TweakColor
            label="Primary color"
            value={t.primary}
            options={['#7e5266', '#653f52', '#5f4a80', '#6f7e5d']}
            onChange={(v) => setTweak('primary', v)}
          />
          <TweakRadio
            label="Hero copy"
            value={t.heroVariant}
            options={[
              { value: 'default',   label: 'Default' },
              { value: 'editorial', label: 'Editorial' },
              { value: 'soft',      label: 'Soft' },
            ]}
            onChange={(v) => setTweak('heroVariant', v)}
          />
          <TweakToggle
            label="Show botanical ornaments"
            value={t.showOrnaments}
            onChange={(v) => setTweak('showOrnaments', v)}
          />
        </TweakSection>

        <TweakSection label="Type">
          <TweakSelect
            label="Display"
            value={t.displayFont}
            options={[
              { value: 'DM Serif Display', label: 'DM Serif Display' },
              { value: 'Cormorant Garamond', label: 'Cormorant Garamond' },
              { value: 'Fraunces', label: 'Fraunces (alt)' },
              { value: 'Lora', label: 'Lora (soft serif)' },
            ]}
            onChange={(v) => setTweak('displayFont', v)}
          />
          <TweakSelect
            label="Body"
            value={t.bodyFont}
            options={[
              { value: 'Nunito', label: 'Nunito' },
              { value: 'Manrope', label: 'Manrope' },
              { value: 'Inter', label: 'Inter' },
            ]}
            onChange={(v) => setTweak('bodyFont', v)}
          />
        </TweakSection>

        <TweakSection label="Audience">
          <TweakRadio
            label="Language"
            value={lang}
            options={[
              { value: 'en', label: 'English' },
              { value: 'es', label: 'Espa\u00f1ol' },
            ]}
            onChange={(v) => setLang(v)}
          />
        </TweakSection>

        <TweakSection label="Jump to screen">
          <TweakButton label="Homepage"           onClick={() => setRoute('home')} />
          <TweakButton label="Articles hub"       onClick={() => setRoute('articles')} secondary />
          <TweakButton label="Nutrition hub"      onClick={() => setRoute('nutrition')} secondary />
          <TweakButton label="Awareness Quiz"     onClick={() => setRoute('quiz')} secondary />
          <TweakButton label="Supplements"        onClick={() => setRoute('supplements')} secondary />
          <TweakButton label="Resources"          onClick={() => setRoute('resources')} secondary />
          <TweakButton label="Privacy"            onClick={() => setRoute('privacy')} secondary />
          <TweakButton label="Glossary"           onClick={() => setRoute('glossary')} secondary />
          <TweakButton label="Symptoms"           onClick={() => openSymptom(null)} secondary />
          <TweakButton label="When to see a doctor" onClick={() => setRoute('urgent')} secondary />
          <TweakButton label="Care on a budget"   onClick={() => setRoute('budget')} secondary />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
