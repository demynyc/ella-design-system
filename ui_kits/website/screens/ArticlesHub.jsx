// ArticlesHub, grid of all Ella articles, filterable by category.

export function ArticlesHub({ lang, setRoute, setArticleId, initialCategory }) {
  const isEs = lang === 'es';
  const articles = getArticles(lang);
  const CATEGORY_ORDER = isEs
    ? ['Perimenopausia', 'Menopausia', 'Nutrici\u00f3n', 'Ejercicio', 'Salud mental']
    : ['Perimenopause', 'Menopause', 'Nutrition', 'Exercise', 'Mental Health'];
  const present = new Set(articles.map(a => a.category));
  const categories = ['All', ...CATEGORY_ORDER];
  const allLabel = isEs ? 'Todos' : 'All';

  const [filter, setFilter] = React.useState(initialCategory || 'All');
  React.useEffect(() => { if (initialCategory) setFilter(initialCategory); }, [initialCategory]);

  const PER_PAGE = 9;
  const [page, setPage] = React.useState(1);
  React.useEffect(() => { setPage(1); }, [filter, lang]);

  const matching = filter === 'All' ? articles : articles.filter(a => a.category === filter);
  const pageCount = Math.max(1, Math.ceil(matching.length / PER_PAGE));
  const current = Math.min(page, pageCount);
  const shown = matching.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  function goPage(n) {
    setPage(n);
    const top = document.querySelector('[data-screen-label="04 Articles Hub"]');
    if (top) window.scrollTo({ top: top.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
  }

  function open(id) {
    setArticleId(id);
    setRoute('article');
    window.scrollTo({ top: 0 });
  }

  return (
    <div data-screen-label="04 Articles Hub">
      <section className="ella-section-tight">
        <div className="ella-container">
          <div style={{ maxWidth: 820, marginBottom: 32 }}>
            <h1 className="ella-h2-italic ella-page-title" style={{ marginTop: 12 }}>
              {filter === 'All' ? (isEs ? 'Artículos' : 'The Library') : filter}
            </h1>
          </div>

          {/* Filter chips */}
          <div className="ella-article-filters">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={'ella-article-filter' + (filter === c ? ' is-active' : '') + (c !== 'All' && !present.has(c) ? ' is-empty' : '')}
                onClick={() => setFilter(c)}
              >{c === 'All' ? allLabel : c}</button>
            ))}
          </div>

          {/* Article grid */}
          <div className="ella-article-grid">
            {shown.map((a) => (
              <article key={a.id} className="ella-article-card" data-tone={a.tone}>
                <button type="button" className="ella-article-card-inner" onClick={() => open(a.id)}>
                  <div className="ella-article-card-cat">{a.category} · {a.readTime}</div>
                  <h3 className="ella-article-card-title">{a.title}</h3>
                  <p className="ella-article-card-lede">{a.lede}</p>
                  <span className="ella-article-card-cta">
                    {isEs ? 'Leer' : 'Read'} <IconArrow width="14" height="14" />
                  </span>
                </button>
              </article>
            ))}
          </div>

          {matching.length > 0 ? (
            <nav className="ella-pager" aria-label={isEs ? 'Paginación' : 'Pagination'}>
              <button
                type="button"
                className="ella-pager-arrow"
                onClick={() => goPage(current - 1)}
                disabled={current === 1}
                aria-label={isEs ? 'Página anterior' : 'Previous page'}
              >
                <IconChevron width="15" height="15" style={{ transform: 'rotate(180deg)' }} />
              </button>

              <div className="ella-pager-nums">
                {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={'ella-pager-num' + (n === current ? ' is-active' : '')}
                    onClick={() => goPage(n)}
                    aria-current={n === current ? 'page' : undefined}
                  >{n}</button>
                ))}
              </div>

              <button
                type="button"
                className="ella-pager-arrow"
                onClick={() => goPage(current + 1)}
                disabled={current === pageCount}
                aria-label={isEs ? 'Página siguiente' : 'Next page'}
              >
                <IconChevron width="15" height="15" />
              </button>

              <span className="ella-pager-count">
                {isEs
                  ? 'Página ' + current + ' de ' + pageCount
                  : 'Page ' + current + ' of ' + pageCount}
              </span>
            </nav>
          ) : null}

          {shown.length === 0 ? (
            <div className="ella-empty-cat">
              <h2>{isEs ? 'Todavía no hay artículos aquí.' : 'Nothing here yet.'}</h2>
              <p>
                {isEs
                  ? 'Jessica está escribiendo sobre ' + filter.toLowerCase() + '. Regresa pronto.'
                  : 'Jessica is writing about ' + filter.toLowerCase() + '. Check back soon.'}
              </p>
              <button type="button" className="ella-btn ella-btn-secondary" onClick={() => setFilter('All')}>
                {isEs ? 'Ver todos los artículos' : 'See all articles'}
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

window.ArticlesHub = ArticlesHub;
