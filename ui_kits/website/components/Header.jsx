// Header, sticky cream bar with logo, nav, search, language toggle.

function LangToggle({ lang, setLang }) {
  return (
    <div className="ella-langtoggle" role="group" aria-label="Language">
      <button
        type="button"
        aria-pressed={lang === 'es'}
        className={lang === 'es' ? 'is-active' : ''}
        onClick={() => setLang('es')}
      >ES</button>
      <button
        type="button"
        aria-pressed={lang === 'en'}
        className={lang === 'en' ? 'is-active' : ''}
        onClick={() => setLang('en')}
      >EN</button>
    </div>
  );
}

// Related-concept map. If a search matches any word in "match", the search
// also looks for the "related" words, so "fatigue" finds articles that talk
// about sleep, iron or thyroid even if they never say "fatigue".
// Words are lowercase without accents. Add to this list freely.
const ELLA_CONCEPTS = [
  { match: ['fatigue','tired','tiredness','exhausted','exhaustion','low energy','energy','fatiga','cansancio','cansada','agotamiento','agotada','energia','sin energia'],
    related: ['sleep','insomnia','night sweats','iron','anemia','thyroid','vitamin d','b12','magnesium','depression','mood','sueno','insomnio','sudores','hierro','tiroides','vitamina d','magnesio','animo','depresion'] },
  { match: ['hot flash','hot flashes','flush','flushing','sweats','night sweats','sofoco','sofocos','bochorno','bochornos','calores','sudores'],
    related: ['estrogen','hormone','vasomotor','temperature','estrogeno','hormona','temperatura'] },
  { match: ['sleep','insomnia','waking up','cant sleep','sueno','dormir','insomnio','despertar'],
    related: ['night sweats','magnesium','melatonin','anxiety','sudores','magnesio','melatonina','ansiedad'] },
  { match: ['mood','anxiety','anxious','depression','depressed','irritable','irritability','sad','crying','animo','ansiedad','depresion','irritabilidad','tristeza','llorar'],
    related: ['sleep','brain fog','mental health','estrogen','serotonin','sueno','niebla','salud mental','estrogeno'] },
  { match: ['brain fog','memory','forgetful','forgetting','focus','concentration','niebla','memoria','olvido','olvidos','concentracion'],
    related: ['sleep','estrogen','omega','magnesium','sueno','estrogeno','magnesio'] },
  { match: ['weight','belly','metabolism','weight gain','peso','barriga','abdomen','panza','metabolismo'],
    related: ['muscle','protein','strength','insulin','creatine','musculo','proteina','fuerza','insulina','creatina'] },
  { match: ['joint','joints','joint pain','aches','stiff','stiffness','articulaciones','dolor','rigidez'],
    related: ['inflammation','omega','turmeric','inflamacion','curcuma'] },
  { match: ['bone','bones','osteoporosis','bone density','fracture','hueso','huesos','densidad osea','fractura'],
    related: ['calcium','vitamin d','k2','strength','calcio','vitamina d','fuerza'] },
  { match: ['heart','cholesterol','blood pressure','corazon','colesterol','presion'],
    related: ['omega','fiber','inflammation','fibra','inflamacion'] },
  { match: ['dryness','vaginal','sex','libido','intimacy','painful sex','sequedad','sexo','deseo','intimidad'],
    related: ['estrogen','lubricant','vaginal','estrogeno','lubricante'] },
  { match: ['hair','skin','wrinkles','cabello','pelo','piel','arrugas'],
    related: ['collagen','estrogen','protein','colageno','estrogeno','proteina'] },
  { match: ['period','periods','bleeding','irregular','cycle','regla','sangrado','ciclo','menstruacion'],
    related: ['perimenopause','perimenopausia'] },
  { match: ['bloating','digestion','constipation','gut','hinchazon','digestion','estrenimiento','intestino'],
    related: ['fiber','probiotics','fibra','probioticos'] },
];
function relatedTerms(term) {
  if (!term || term.length < 3) return [];
  const out = new Set();
  for (const c of ELLA_CONCEPTS) {
    const hit = c.match.some((w) => w === term || (term.length >= 4 && (w.startsWith(term) || term.startsWith(w))));
    if (hit) c.related.forEach((r) => { if (r !== term && !term.includes(r)) out.add(r); });
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

export function Header({ lang, setLang, route, setRoute, goToCategory, openArticle, openSymptom }) {
  const t = useT(lang);
  const isEs = lang === 'es';
  const [scrolled, setScrolled] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scope, setScope] = React.useState('all');
  const dropRef = React.useRef(null);
  const SCOPES = [
    { id: 'all',         label: isEs ? 'Todo' : 'All' },
    { id: 'articles',    label: isEs ? 'Artículos' : 'Articles' },
    { id: 'syms',        label: isEs ? 'Síntomas' : 'Symptoms' },
    { id: 'supps',       label: isEs ? 'Suplementos' : 'Supplements' },
    { id: 'gloss',       label: isEs ? 'Glosario' : 'Glossary' },
  ];
  const SUGGEST = isEs
    ? ['Sofocos', 'Insomnio', 'Vitamina D', 'Magnesio', 'Niebla mental', 'Proteína']
    : ['Hot flashes', 'Sleep', 'Vitamin D', 'Magnesium', 'Brain fog', 'Protein'];
  const show = (k) => scope === 'all' || scope === k;
  React.useEffect(() => { setMenuOpen(false); }, [route, lang]);
  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);
  const [q, setQ] = React.useState('');
  const inputRef = React.useRef(null);
  const searchRef = React.useRef(null);

  // Pages are searchable alongside articles so "supplements" finds the hub.
  const PAGES = isEs ? [
    { label:'Suplementos', route:'supplements', blurb:'Los que investigué para mí, y qué buscar en la etiqueta.' },
    { label:'Recursos',    route:'resources',   blurb:'Fuentes confiables para leer más.' },
    { label:'Artículos',   route:'articles',    blurb:'Todos los artículos.' },
    { label:'Nutrición',   route:'nutrition',   blurb:'Alimentación y movimiento en esta etapa.' },
    { label:'Glosario',    route:'glossary',    blurb:'Términos médicos en español y en inglés.' },
    { label:'Cuándo ir al médico', route:'urgent', blurb:'Síntomas que no pueden esperar.' },
    { label:'Atención de bajo costo', route:'budget', blurb:'Centros de salud, medicinas más baratas y seguro.' },
    { label:'Privacidad',  route:'privacy',     blurb:'Qué datos guardamos y cuáles no.' },
  ] : [
    { label:'Supplements', route:'supplements', blurb:'The ones I researched for myself, and the form to look for on the label.' },
    { label:'Resources',   route:'resources',   blurb:'Sources worth trusting when you want to read further.' },
    { label:'Articles',    route:'articles',    blurb:'The full library.' },
    { label:'Nutrition',   route:'nutrition',   blurb:'Food and movement at this stage.' },
    { label:'Glossary',    route:'glossary',    blurb:'Medical terms in Spanish and English.' },
    { label:'When to see a doctor', route:'urgent', blurb:'Symptoms that can’t wait.' },
    { label:'Care on a budget', route:'budget', blurb:'Health centers, cheaper prescriptions, and insurance.' },
    { label:'Privacy',     route:'privacy',     blurb:'What we keep, and what we don’t.' },
  ];

  // ---- Search: matches words anywhere (titles, body, supplements, glossary), accent-insensitive ----
  const fold = (s) => (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
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
    if (start > 0) { const sp = text.indexOf(' ', start); if (sp > -1 && sp < at) start = sp + 1; }
    if (end < text.length) { const sp = text.lastIndexOf(' ', end); if (sp > at + t.length) end = sp; }
    return (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
  }
  // Wraps every match in <mark>. Works char-by-char so accents line up.
  function hl(text) {
    if (!term || !text) return text;
    const f = fold(text);
    const out = []; let i = 0, k = 0;
    while (i < text.length) {
      let at = -1, len = 0;
      for (const t of hlTerms) {
        const p = f.indexOf(t, i);
        if (p > -1 && (at < 0 || p < at || (p === at && t.length > len))) { at = p; len = t.length; }
      }
      if (at < 0) { out.push(text.slice(i)); break; }
      if (at > i) out.push(text.slice(i, at));
      out.push(<mark key={k++} className="ella-search-mark">{text.slice(at, at + len)}</mark>);
      i = at + len;
    }
    return out;
  }
  // Direct match first; if none, the first related concept that appears.
  function firstHit(fields) {
    for (const t of fields) { if (t && fold(t).includes(term)) return { text: t, word: term, via: null }; }
    for (const r of related) {
      for (const t of fields) { if (t && fold(t).includes(r)) return { text: t, word: r, via: r }; }
    }
    return null;
  }

  const results = React.useMemo(() => {
    const empty = { articles: [], syms: [], supps: [], gloss: [], pages: [] };
    if (term.length < 2) return empty;

    const all = (window.ELLA_ARTICLES && window.ELLA_ARTICLES[lang]) || [];
    const articles = all.map((a) => {
      const inTitle = fold(a.title).includes(term);
      const pool = [a.lede, ...(a.takeaways || []), ...(a.body || []).map(blockText), ...(a.doctorQuestions || [])];
      const hit = firstHit([a.title, ...pool]);
      if (!inTitle && !hit && !fold(a.category).includes(term)) return null;
      const via = !inTitle && hit && hit.via ? hit.via : null;
      const w = hit ? hit.word : term;
      const count = pool.concat(a.title).reduce((n, t) => n + (fold(t).split(w).length - 1), 0);
      const snip = hit && hit.text !== a.title ? excerpt(hit.text, 130, hit.word) : a.lede;
      return { a, rank: inTitle ? 0 : via ? 2 : 1, count, snip, via };
    }).filter(Boolean).sort((x, y) => x.rank - y.rank || y.count - x.count).slice(0, 6);

    const suppList = typeof window.getSupplementItems === 'function' ? window.getSupplementItems(isEs) : [];
    const supps = suppList.map((s) => {
      const pool = [s.name, s.tag, s.desc, s.food, s.form, s.caution, s.dose, ...(s.why || [])];
      const hit = firstHit(pool);
      return hit ? { s, via: hit.via, snip: hit.text === s.name ? s.desc : excerpt(hit.text, 130, hit.word) } : null;
    }).filter(Boolean).sort((x, y) => (x.via ? 1 : 0) - (y.via ? 1 : 0)).slice(0, 4);

    const symList = typeof window.getSymptoms === 'function' ? window.getSymptoms(lang) : [];
    const syms = symList.map((x) => {
      const pool = [x.name, x.short, x.why, ...(x.habits || []), ...(x.natural || []), ...(x.treatment || []), ...(x.doctor || [])];
      const hit = firstHit(pool);
      return hit ? { x, via: hit.via, snip: hit.text === x.name ? x.short : excerpt(hit.text, 130, hit.word) } : null;
    }).filter(Boolean).sort((x, y) => (x.via ? 1 : 0) - (y.via ? 1 : 0)).slice(0, 4);

    const glossList = window.ELLA_GLOSSARY || [];
    const gloss = glossList.filter((r) => fold(r[1] + ' ' + r[2] + ' ' + (isEs ? r[3] : r[4])).includes(term)).slice(0, 4);

    const pages = PAGES.filter((p) => fold(p.label + ' ' + p.blurb).includes(term)).slice(0, 3);
    return { articles, syms, supps, gloss, pages };
  }, [q, lang, related]);

  const hasQuery = term.length >= 2;
  const relLabel = (via) => via ? (isEs ? 'Relacionado · habla de «' + via + '»' : 'Related · mentions “' + via + '”') : null;
  const total = results.articles.length + results.syms.length + results.supps.length + results.gloss.length + results.pages.length;

  function goSupplement() { closeSearch(); setRoute('supplements'); window.scrollTo({ top: 0 }); }
  function goGlossary() { window.__ellaGlossaryQuery = q.trim(); closeSearch(); setRoute('glossary'); window.scrollTo({ top: 0 }); }

  function closeSearch() { setSearchOpen(false); setQ(''); setScope('all'); }

  React.useEffect(() => {
    if (!searchOpen) return;
    const el = inputRef.current;
    if (el) el.focus();
    function onKey(e) { if (e.key === 'Escape') closeSearch(); }
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
    window.scrollTo({ top: 0 });
  }

  React.useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 4); }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  // Top-bar sections. Only routes with real content ship here, so no nav
  // item can land on an empty page. Nutrition and Mental Health return
  // once Jessica has articles in those categories.
  const items = [
    { id: 'home',        label: isEs ? 'Inicio'     : 'Home',           route: 'home' },
    { id: 'symptoms',    label: isEs ? 'Síntomas'   : 'Symptoms',       route: 'symptoms' },
    { id: 'articles',    label: isEs ? 'Artículos'  : 'Articles',       route: 'articles' },
    { id: 'supplements', label: t('nav_supplements'),                   route: 'supplements' },
    { id: 'resources',   label: isEs ? 'Recursos'   : 'Resources',      route: 'resources' },
  ];

  function handleNav(it) {
    if (it.route === 'symptoms' && openSymptom) { openSymptom(null); return; }
    if (it.category) goToCategory(it.route, it.category);
    else setRoute(it.route);
  }

  return (
    <header className={'ella-header' + (scrolled ? ' is-scrolled' : '')}>
      <div className={'ella-header-inner' + (searchOpen ? ' is-searching' : '')}>
        <a
          href="#"
          className="ella-logo"
          onClick={(e) => { e.preventDefault(); setRoute('home'); }}
          aria-label="Ella home"
        >
          <LogoMarkSvg size={32} />
          <span className="ella-logo-text">
            <span className="ella-logo-word">Ella</span>
            <span className="ella-logo-by">Jessica Zavala</span>
          </span>
        </a>
        <nav className="ella-nav" aria-label="Primary">
          {items.map((it) => (
            <a
              key={it.id}
              href="#"
              className={'ella-navlink' + (route === it.route && !it.category ? ' is-active' : '')}
              onClick={(e) => { e.preventDefault(); handleNav(it); }}
            >{it.label}</a>
          ))}
        </nav>
        <div className="ella-header-end">
          <div className={'ella-search' + (searchOpen ? ' is-open' : '')} ref={searchRef}>
            <input
              ref={inputRef}
              type="search"
              className="ella-search-input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return;
                const first = dropRef.current && dropRef.current.querySelector('.ella-search-hit');
                if (first) { e.preventDefault(); first.click(); }
              }}
              placeholder={isEs ? 'Busca síntomas, artículos, suplementos…' : 'Search symptoms, articles, supplements…'}
              aria-label={isEs ? 'Buscar' : 'Search'}
              tabIndex={searchOpen ? 0 : -1}
            />
            <button
              type="button"
              className="ella-iconbtn"
              aria-label={isEs ? 'Buscar' : 'Search'}
              aria-expanded={searchOpen}
              onClick={() => { if (searchOpen) closeSearch(); else setSearchOpen(true); }}
            >
              <IconSearch width="20" height="20" />
            </button>

            {searchOpen && (
              <div className="ella-search-drop" ref={dropRef}>
                <div className="ella-search-tabs" role="tablist">
                  {SCOPES.map((sc) => (
                    <button key={sc.id} type="button" role="tab" aria-selected={scope === sc.id}
                      className={'ella-search-tab' + (scope === sc.id ? ' is-active' : '')}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => setScope(sc.id)}>{sc.label}</button>
                  ))}
                </div>
                {!hasQuery && (
                  <div className="ella-search-start">
                    <p>{isEs ? 'Empieza a escribir para buscar.' : 'Start typing to search.'}</p>
                    <div className="ella-search-suggest">
                      {SUGGEST.map((w) => (
                        <button key={w} type="button" onMouseDown={(e) => e.preventDefault()}
                          onClick={() => { setQ(w); if (inputRef.current) inputRef.current.focus(); }}>{w}</button>
                      ))}
                    </div>
                  </div>
                )}
                {hasQuery && (scope === 'all' ? total : (results[scope] || []).length) === 0 && (
                  <p className="ella-search-empty">
                    {isEs ? 'Todavía no hay nada sobre «' : 'Nothing yet for “'}{q.trim()}{isEs ? '».' : '.”'}
                  </p>
                )}
                {hasQuery && related.length > 0 && (
                  <p className="ella-search-related">
                    {isEs ? 'También buscamos temas relacionados: ' : 'Also showing related topics: '}
                    {related.slice(0, 5).join(', ')}
                  </p>
                )}
                {hasQuery && show('articles') && results.articles.length > 0 && (
                  <div className="ella-search-group">
                    <span className="ella-search-group-lbl">{isEs ? 'ARTÍCULOS' : 'ARTICLES'}</span>
                    {results.articles.map(({ a, snip, count, via }) => (
                      <button key={a.id} type="button" className="ella-search-hit" onClick={() => goArticle(a.id)}>
                        <span className="ella-search-hit-title">{hl(a.title)}</span>
                        {snip ? <span className="ella-search-hit-snip">{hl(snip)}</span> : null}
                        <span className="ella-search-hit-meta">
                          {a.category} · {a.readTime}
                          {!via && count > 1 ? (isEs ? ' · aparece ' + count + ' veces' : ' · ' + count + ' mentions') : ''}
                        </span>
                        {via ? <span className="ella-search-hit-rel">{relLabel(via)}</span> : null}
                      </button>
                    ))}
                  </div>
                )}
                {hasQuery && show('syms') && results.syms.length > 0 && (
                  <div className="ella-search-group">
                    <span className="ella-search-group-lbl">{isEs ? 'SÍNTOMAS' : 'SYMPTOMS'}</span>
                    {results.syms.map(({ x, snip, via }) => (
                      <button key={x.id} type="button" className="ella-search-hit" onClick={() => { closeSearch(); if (openSymptom) openSymptom(x.id); }}>
                        <span className="ella-search-hit-title">{hl(x.name)}</span>
                        {snip ? <span className="ella-search-hit-snip">{hl(snip)}</span> : null}
                        {via ? <span className="ella-search-hit-rel">{relLabel(via)}</span> : null}
                      </button>
                    ))}
                  </div>
                )}
                {hasQuery && show('supps') && results.supps.length > 0 && (
                  <div className="ella-search-group">
                    <span className="ella-search-group-lbl">{isEs ? 'SUPLEMENTOS' : 'SUPPLEMENTS'}</span>
                    {results.supps.map(({ s, snip, via }) => (
                      <button key={s.name} type="button" className="ella-search-hit" onClick={goSupplement}>
                        <span className="ella-search-hit-title">{hl(s.name)}</span>
                        {snip ? <span className="ella-search-hit-snip">{hl(snip)}</span> : null}
                        {via ? <span className="ella-search-hit-rel">{relLabel(via)}</span> : null}
                      </button>
                    ))}
                  </div>
                )}
                {hasQuery && show('gloss') && results.gloss.length > 0 && (
                  <div className="ella-search-group">
                    <span className="ella-search-group-lbl">{isEs ? 'GLOSARIO' : 'GLOSSARY'}</span>
                    {results.gloss.map((r) => (
                      <button key={r[1]} type="button" className="ella-search-hit" onClick={goGlossary}>
                        <span className="ella-search-hit-title">{hl(r[1])} <span className="ella-search-hit-en">· {hl(r[2])}</span></span>
                        <span className="ella-search-hit-snip">{hl(isEs ? r[3] : r[4])}</span>
                      </button>
                    ))}
                  </div>
                )}
                {hasQuery && scope === 'all' && results.pages.length > 0 && (
                  <div className="ella-search-group">
                    <span className="ella-search-group-lbl">{isEs ? 'PÁGINAS' : 'PAGES'}</span>
                    {results.pages.map((p) => (
                      <button key={p.route} type="button" className="ella-search-hit" onClick={() => goPage(p.route)}>
                        <span className="ella-search-hit-title">{hl(p.label)}</span>
                        <span className="ella-search-hit-meta">{hl(p.blurb)}</span>
                      </button>
                    ))}
                  </div>
                )}
                <div className="ella-search-foot">
                  <span><kbd>↵</kbd> {isEs ? 'abrir' : 'open'}</span>
                  <span><kbd>Esc</kbd> {isEs ? 'cerrar' : 'close'}</span>
                </div>
              </div>
            )}
          </div>
          <a
            href={(window.ELLA_LINKS && window.ELLA_LINKS.booking) || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="ella-btn ella-btn-primary ella-header-book"
          >{isEs ? 'Haz una cita' : 'Book a call'}</a>
          <LangToggle lang={lang} setLang={setLang} />
          <button
            type="button"
            className="ella-iconbtn ella-menu-btn"
            aria-label={isEs ? 'Menú' : 'Menu'}
            aria-expanded={menuOpen}
            onClick={() => { setSearchOpen(false); setMenuOpen((v) => !v); }}
          >
            {menuOpen
              ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
              : <IconMenu width="22" height="22" />}
          </button>
        </div>
      </div>

      {menuOpen && (() => {
        const cats = [...new Set(((window.ELLA_ARTICLES && window.ELLA_ARTICLES[lang]) || []).map((a) => a.category))];
        const syms = typeof window.getSymptoms === 'function' ? window.getSymptoms(lang) : [];
        const go = (fn) => (e) => { e.preventDefault(); setMenuOpen(false); fn(); window.scrollTo({ top: 0 }); };
        const subs = {
          symptoms: syms.map((x) => ({ key: x.id, label: x.name, fn: () => openSymptom && openSymptom(x.id) })),
          articles: cats.map((ct) => ({ key: ct, label: ct, fn: () => goToCategory('articles', ct) })),
        };
        return (
          <div className="ella-mobile-menu" role="dialog" aria-label={isEs ? 'Menú' : 'Menu'}>
            <nav>
              {items.map((it) => (
                <div key={it.id} className="ella-mm-group">
                  <a href="#" className={'ella-mm-top' + (route === it.route ? ' is-active' : '')} onClick={go(() => handleNav(it))}>
                    {it.label}
                  </a>
                  {subs[it.id] && subs[it.id].length > 0 && (
                    <div className="ella-mm-subs">
                      {subs[it.id].map((sb) => (
                        <a key={sb.key} href="#" onClick={go(sb.fn)}>{sb.label}</a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <a className="ella-btn ella-btn-primary ella-mobile-menu-book" href={(window.ELLA_LINKS && window.ELLA_LINKS.booking) || '#'} target="_blank" rel="noopener noreferrer">
              {isEs ? 'Haz una cita' : 'Book a call'}
            </a>
          </div>
        );
      })()}
    </header>
  );
}

window.Header = Header;
window.LangToggle = LangToggle;
