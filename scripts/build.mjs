// Builds the public website into docs/ (what GitHub Pages serves).
//
//   npm run build
//
// What it does:
//   1. Compiles the JSX in ui_kits/website/ ahead of time into one small,
//      minified docs/app.js (no in-browser Babel, production React).
//   2. Merges the stylesheets into one docs/site.css.
//   3. Gives every page its own address (e.g. /es/articles/inflammation/) and
//      pre-renders it to real HTML (in jsdom, a browser simulation), with its own
//      <title>, description and sharing preview (Open Graph) tags.
//   4. Writes sitemap.xml, robots.txt, a language-detecting root page, 404.html,
//      and CNAME when the custom domain is switched on in site.config.json.
//
// Edit the site in ui_kits/website/ as before, then run the build.

import { readFile, writeFile, mkdir, rm, cp } from 'node:fs/promises';
import { join, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { transform } from 'esbuild';
import { JSDOM, VirtualConsole } from 'jsdom';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'ui_kits', 'website');
const OUT = join(ROOT, 'docs');
const config = JSON.parse(await readFile(join(ROOT, 'site.config.json'), 'utf8'));

// Where the site lives on the web. Canonical and sharing links are built from this.
const SITE_ORIGIN = config.useCustomDomain ? 'https://' + config.customDomain : config.githubPagesUrl.replace(/\/$/, '');
const SITE_BASE = config.useCustomDomain ? '/' : new URL(config.githubPagesUrl).pathname.replace(/\/?$/, '/');
const LANGS = ['en', 'es'];
const GOOGLE_FONTS = 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Nunito:ital,wght@0,300..900;1,300..900&display=swap';

const PAGES = {
  home:        { en: ['Ella Bienestar · Menopause information in English and Spanish', 'Clear, cited information about perimenopause and menopause, in English and Spanish: symptoms, supplements, nutrition, and what helps.'],
                 es: ['Ella Bienestar · Información sobre la menopausia en español e inglés', 'Información clara y con fuentes sobre la perimenopausia y la menopausia, en español e inglés: síntomas, suplementos, nutrición y qué ayuda.'] },
  articles:    { en: ['Articles', 'Every Ella article on perimenopause, menopause, exercise and hormone therapy, in plain language with sources.'],
                 es: ['Artículos', 'Todos los artículos de Ella sobre perimenopausia, menopausia, ejercicio y terapia hormonal, en palabras claras y con fuentes.'] },
  nutrition:   { en: ['Nutrition', 'Food and movement at this stage of life: what helps during perimenopause and menopause.'],
                 es: ['Nutrición', 'Alimentación y movimiento en esta etapa: qué ayuda durante la perimenopausia y la menopausia.'] },
  supplements: { en: ['Supplements', 'The supplements worth knowing about during menopause: what each does, the food to get it from first, and the form to look for.'],
                 es: ['Suplementos', 'Los suplementos que vale la pena conocer en la menopausia: para qué sirve cada uno, de qué alimento sacarlo y qué forma buscar.'] },
  resources:   { en: ['Resources', 'Trusted outside sources on menopause, in English and Spanish.'],
                 es: ['Recursos', 'Fuentes confiables sobre la menopausia, en español y en inglés.'] },
  quiz:        { en: ['Personal check-in', 'Five questions about your stage and symptoms. At the end you will know what to read first.'],
                 es: ['Cuestionario personal', 'Cinco preguntas sobre tu etapa y tus síntomas. Al final sabrás por dónde empezar a leer.'] },
  privacy:     { en: ['Privacy', 'What Ella keeps, and what it does not, in plain terms.'],
                 es: ['Privacidad', 'Qué guarda Ella y qué no, en pocas palabras.'] },
  glossary:    { en: ['Spanish–English glossary', 'Menopause terms and phrases in Spanish and English, to use at the doctor.'],
                 es: ['Glosario español–inglés', 'Términos y frases sobre la menopausia en español e inglés, para usar con tu médico.'] },
  symptoms:    { en: ['Symptoms', 'Common menopause symptoms: why they happen, what helps, and when to see a doctor.'],
                 es: ['Síntomas', 'Síntomas comunes de la menopausia: por qué pasan, qué ayuda y cuándo ir al médico.'] },
  urgent:      { en: ['When to see a doctor', 'Symptoms during menopause that need care right away.'],
                 es: ['Cuándo ir al médico', 'Síntomas en la menopausia que necesitan atención de inmediato.'] },
  budget:      { en: ['Care on a budget', 'Low-cost menopause care: community health centers, cheaper prescriptions, insurance and interpreters.'],
                 es: ['Atención de bajo costo', 'Atención de bajo costo para la menopausia: centros de salud, medicinas más baratas, seguro e intérpretes.'] },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const clip = (s, n = 158) => { s = String(s).replace(/\s+/g, ' ').trim(); return s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…'; };
const pathFor = (lang, route, id) => lang + '/' + (route === 'home' ? '' : route === 'article' ? 'articles/' + id + '/' : (route === 'symptoms' && id) ? 'symptoms/' + id + '/' : route + '/');

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  // ---- 1. Styles: one file, fonts loaded directly instead of a chain of @imports
  const tokens = (await readFile(join(ROOT, 'colors_and_type.css'), 'utf8')).replace(/@import[^;]+;/g, '');
  const fontVars = (await readFile(join(ROOT, 'fonts', 'fonts.css'), 'utf8')).replace(/@import[^;]+;/g, '');
  const site = (await readFile(join(SRC, 'style.css'), 'utf8')).replace(/@import[^;]+;/g, '');
  const css = await transform(fontVars + tokens + site, { loader: 'css', minify: true });
  await writeFile(join(OUT, 'site.css'), css.code);

  // ---- 2. Script: compile every JSX file in the order index.html loads them
  const indexHtml = await readFile(join(SRC, 'index.html'), 'utf8');
  const files = [...indexHtml.matchAll(/'((?:components|screens)\/[\w.-]+\.jsx|[\w.-]+\.jsx)'/g)].map((m) => m[1]);
  let bundle = '';
  for (const f of files) {
    const code = await readFile(join(SRC, f), 'utf8');
    const out = await transform(code, { loader: 'jsx', format: 'cjs', jsx: 'transform', jsxFactory: 'React.createElement', jsxFragment: 'React.Fragment', sourcefile: f });
    bundle += `\n/* ${f} */\n;(function(){var module={exports:{}};var exports=module.exports;\n${out.code}\n;Object.assign(window,module.exports);})();\n`;
  }
  const js = await transform(bundle, { loader: 'js', minify: true, target: 'es2019' });
  await writeFile(join(OUT, 'app.js'), js.code);

  // ---- 3. Static files
  await cp(join(SRC, 'assets'), join(OUT, 'assets'), { recursive: true });
  await mkdir(join(OUT, 'vendor'), { recursive: true });
  await cp(join(ROOT, 'node_modules/react/umd/react.production.min.js'), join(OUT, 'vendor/react.production.min.js'));
  await cp(join(ROOT, 'node_modules/react-dom/umd/react-dom.production.min.js'), join(OUT, 'vendor/react-dom.production.min.js'));
  await writeFile(join(OUT, '.nojekyll'), '');

  // ---- 4. Find every page (articles and symptoms come from the site's own data)
  const vendor = [
    await readFile(join(OUT, 'vendor/react.production.min.js'), 'utf8'),
    await readFile(join(OUT, 'vendor/react-dom.production.min.js'), 'utf8'),
  ];
  const appJs = js.code;
  const render = (path) => renderPage(path, vendor, appJs);

  // ---- 4. Find every page (articles and symptoms come from the site's own data)
  const probe = await render('en/');
  const data = probe.data;

  const pages = [];
  for (const lang of LANGS) {
    for (const route of Object.keys(PAGES)) {
      const [t, d] = PAGES[route][lang];
      pages.push({ lang, route, id: null, title: route === 'home' ? t : t + ' · Ella Bienestar', desc: d, type: 'website' });
    }
    for (const a of data.articles[lang]) pages.push({ lang, route: 'article', id: a.id, title: a.title.replace(/\.$/, '') + ' · Ella Bienestar', desc: clip(a.lede), type: 'article' });
    for (const s of data.symptoms[lang]) pages.push({ lang, route: 'symptoms', id: s.id, title: s.name + ' · Ella Bienestar', desc: clip(s.why), type: 'article' });
  }
  for (const p of pages) p.path = pathFor(p.lang, p.route, p.id);
  // Lets the app update the tab title as people move between pages.
  const titleMap = Object.fromEntries(pages.map((p) => [p.path, p.title]));

  // ---- 5. Pre-render each page and write it with its own head tags
  for (const p of pages) {
    const dir = join(OUT, ...p.path.split('/').filter(Boolean));
    await mkdir(dir, { recursive: true });
    const relBase = relative(dir, OUT).split(sep).join('/') + '/';
    const r = await render(p.path);
    if (r.errors.length) throw new Error(`Errors on /${p.path}:\n  ` + r.errors.join('\n  '));
    if (r.pathname !== '/' + p.path) throw new Error(`/${p.path} routed to ${r.pathname}`);
    await writeFile(join(dir, 'index.html'), pageHtml({ lang: p.lang, relBase, title: p.title, desc: p.desc,
      canonicalPath: p.path, alternates: pairPath(p), type: p.type, titleMap, root: r.html }));
  }

  // ---- 6. Root page (sends people to their language), 404, sitemap, robots, CNAME
  await writeFile(join(OUT, 'index.html'), rootHtml());
  await writeFile(join(OUT, '404.html'), pageHtml({ lang: 'en', relBase: SITE_BASE, title: 'Page not found · Ella Bienestar', desc: '', canonicalPath: null, titleMap, root: '', noindex: true }));
  await writeFile(join(OUT, 'sitemap.xml'), sitemap(pages));
  await writeFile(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`);
  if (config.useCustomDomain) await writeFile(join(OUT, 'CNAME'), config.customDomain + '\n');

  console.log(`Built ${pages.length} pages into docs/ for ${SITE_ORIGIN}/`);

  function pairPath(p) {
    return Object.fromEntries(LANGS.map((l) => [l, pathFor(l, p.route, p.id)]));
  }
}

function pageHtml({ lang, relBase, title, desc, canonicalPath, alternates, type = 'website', titleMap = {}, root, noindex }) {
  const url = canonicalPath == null ? null : SITE_ORIGIN + '/' + canonicalPath;
  const image = SITE_ORIGIN + '/assets/photos/hands-flower.jpg';
  const alt = alternates ? Object.entries(alternates).map(([l, p]) => `<link rel="alternate" hreflang="${l}" href="${SITE_ORIGIN}/${p}">`).join('\n  ')
    + `\n  <link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}/${alternates.en}">` : '';
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <base href="${relBase}">
  <title>${esc(title)}</title>
  ${desc ? `<meta name="description" content="${esc(desc)}">` : ''}
  ${noindex ? '<meta name="robots" content="noindex">' : ''}
  ${url ? `<link rel="canonical" href="${url}">` : ''}
  ${alt}
  <meta property="og:site_name" content="Ella Bienestar">
  <meta property="og:type" content="${type}">
  <meta property="og:title" content="${esc(title)}">
  ${desc ? `<meta property="og:description" content="${esc(desc)}">` : ''}
  ${url ? `<meta property="og:url" content="${url}">` : ''}
  <meta property="og:image" content="${image}">
  <meta property="og:locale" content="${lang === 'es' ? 'es_US' : 'en_US'}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#fbf8f5">
  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="${GOOGLE_FONTS}">
  <link rel="stylesheet" href="site.css">
  <link rel="preload" as="image" href="assets/photos/hands-flower.jpg">
  <script>
    window.ELLA_STATIC = true;
    window.ELLA_BASE = new URL(document.baseURI).pathname;
    window.ELLA_PAGE_META = ${JSON.stringify(titleMap)};
    // Links that only point at a spot on the page (#section) scroll there
    // instead of following the <base> to the home page.
    window.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      e.preventDefault();
      var id = a.getAttribute('href').slice(1);
      var el = id && document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  </script>
  <script defer src="vendor/react.production.min.js"></script>
  <script defer src="vendor/react-dom.production.min.js"></script>
  <script defer src="app.js"></script>
</head>
<body>
  <div id="root">${root}</div>
</body>
</html>
`;
}

function rootHtml() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(PAGES.home.en[0])}</title>
  <meta name="description" content="${esc(PAGES.home.en[1])}">
  <link rel="canonical" href="${SITE_ORIGIN}/en/">
  <link rel="alternate" hreflang="en" href="${SITE_ORIGIN}/en/">
  <link rel="alternate" hreflang="es" href="${SITE_ORIGIN}/es/">
  <link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}/en/">
  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
  <meta name="theme-color" content="#fbf8f5">
  <script>
    (function () {
      var lang = 'en';
      try { var saved = localStorage.getItem('ella-lang'); if (saved === 'es' || saved === 'en') lang = saved; } catch (e) {}
      if (lang === 'en') {
        var nav = (navigator.languages && navigator.languages[0]) || navigator.language || '';
        if (/^es\\b/i.test(nav)) lang = 'es';
      }
      location.replace(lang + '/' + location.hash);
    })();
  </script>
  <noscript><meta http-equiv="refresh" content="0; url=en/"></noscript>
</head>
<body style="background:#ece0de;font-family:system-ui,sans-serif">
  <p style="text-align:center;margin-top:30vh"><a href="en/">English</a> · <a href="es/">Español</a></p>
</body>
</html>
`;
}

function sitemap(pages) {
  const byKey = {};
  for (const p of pages) (byKey[p.route + ':' + (p.id || '')] ||= []).push(p);
  const urls = pages.map((p) => {
    const alts = byKey[p.route + ':' + (p.id || '')].map((q) => `    <xhtml:link rel="alternate" hreflang="${q.lang}" href="${SITE_ORIGIN}/${q.path}"/>`).join('\n');
    return `  <url>\n    <loc>${SITE_ORIGIN}/${p.path}</loc>\n${alts}\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
}

// Runs the compiled site in jsdom at the given address and returns the HTML
// React rendered into #root (plus the article/symptom lists, for the page list).
async function renderPage(path, vendor, appJs) {
  const errors = [];
  const vc = new VirtualConsole();
  vc.on('error', (...a) => errors.push(a.map(String).join(' ')));
  vc.on('jsdomError', (e) => errors.push(String(e && e.message || e)));
  const dom = new JSDOM('<!doctype html><html><head></head><body><div id="root"></div></body></html>',
    { url: 'http://localhost/' + path, runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole: vc });
  const w = dom.window;
  const noop = () => {};
  w.scrollTo = noop;
  w.Element.prototype.scrollIntoView = noop;
  w.matchMedia = () => ({ matches: false, addListener: noop, removeListener: noop, addEventListener: noop, removeEventListener: noop });
  w.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
  w.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
  w.ELLA_STATIC = true;
  w.ELLA_BASE = '/';
  w.ELLA_PAGE_META = {};
  try {
    for (const src of vendor) w.eval(src);
    w.eval(appJs);
  } catch (e) { errors.push(e.stack || String(e)); }
  // Let React finish rendering (it schedules work asynchronously).
  for (let i = 0; i < 40 && !w.document.querySelector('#root header'); i++) await new Promise((r) => setTimeout(r, 25));
  await new Promise((r) => setTimeout(r, 60));
  const root = w.document.getElementById('root');
  root.querySelectorAll('.ella-reveal, .is-visible, .is-scrolled, .ella-rv').forEach((el) => {
    el.classList.remove('ella-reveal', 'is-visible', 'is-scrolled', 'ella-rv', 'is-in', 'rv-card', 'rv-photo', 'rv-head', 'rv-text', 'rv-foot');
    el.style.removeProperty('transition-delay');
    el.style.removeProperty('--rv-delay');
  });
  root.querySelectorAll('[style*="--py"]').forEach((el) => el.style.removeProperty('--py'));
  const data = w.eval(`({
    articles: { en: getArticles('en').map((a) => ({ id: a.id, title: a.title, lede: a.lede })),
                es: getArticles('es').map((a) => ({ id: a.id, title: a.title, lede: a.lede })) },
    symptoms: { en: getSymptoms('en').map((s) => ({ id: s.id, name: s.name, why: s.why })),
                es: getSymptoms('es').map((s) => ({ id: s.id, name: s.name, why: s.why })) },
  })`);
  const out = { html: root.innerHTML, pathname: w.location.pathname, errors, data: JSON.parse(JSON.stringify(data)) };
  w.close();
  return out;
}

await main();
