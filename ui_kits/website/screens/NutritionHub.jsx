// NutritionHub, nutrition-focused landing. Pre-filters articles to Nutrition
// + Exercise and links out to supplements.

export function NutritionHub({ lang, setRoute, setArticleId }) {
  const isEs = lang === 'es';
  const all = getArticles(lang);
  const nutrition = all.filter(a =>
    a.category === 'Nutrition' || a.category === 'Nutrición'
    || a.category === 'Exercise' || a.category === 'Ejercicio'
  );

  function open(id) { setArticleId(id); setRoute('article'); window.scrollTo({ top: 0 }); }

  return (
    <div data-screen-label="04 Nutrition Hub">
      {/* Hero */}
      <section className="ella-section-tight">
        <div className="ella-container">
          <div className="ella-section-head" style={{ maxWidth: 820, margin: 0 }}>
            <div className="ella-eyebrow" style={{ color: 'var(--ella-sage-700)' }}>{isEs ? 'ALIMENTACIÓN Y MOVIMIENTO' : 'FOOD AND MOVEMENT'}</div>
            <h1 className="ella-h2-italic ella-page-title">
              {isEs ? 'Cómo cuidar tu cuerpo ahora' : 'Caring for your body now'}
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ella-clay-700)', marginTop: 16, maxWidth: '62ch' }}>
              {isEs
                ? 'Después de los 45 perdemos músculo más rápido, y el músculo es lo que protege tus huesos, tu metabolismo y tu independencia. Sin dietas, solo lo que tu cuerpo necesita más en esta etapa.'
                : 'After 45 we lose muscle faster, and muscle is what protects your bones, your metabolism, and your independence. No meal plans, just what your body needs more of now.'}
            </p>
          </div>
        </div>
      </section>

      {/* Article cards */}
      <section className="ella-section-tight">
        <div className="ella-container">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 27, color: 'var(--ella-clay-900)', margin: 0 }}>
              {isEs ? 'Artículos' : 'Reading'}
            </h2>
          </div>
          <div className="ella-article-grid">
            {nutrition.map((a) => (
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

          <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button type="button" className="ella-btn ella-btn-primary" onClick={() => setRoute('supplements')}>
              {isEs ? 'Ver suplementos recomendados' : 'See recommended supplements'}
              <IconArrow width="18" height="18" />
            </button>
            <button type="button" className="ella-btn ella-btn-text" onClick={() => setRoute('resources')}>
              {isEs ? 'Recursos y enlaces →' : 'Resources and links →'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

window.NutritionHub = NutritionHub;
