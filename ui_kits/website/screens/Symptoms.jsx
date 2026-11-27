// Symptoms: hub (list) when no symptomId, detail page otherwise.

export function Symptoms({ lang, setRoute, symptomId, openSymptom, openArticle }) {
  const isEs = lang === 'es';
  const list = getSymptoms(lang);
  const s = symptomId ? list.find((x) => x.id === symptomId) : null;
  const articles = typeof getArticles === 'function' ? getArticles(lang) : [];

  if (!s) {
    return (
      <div data-screen-label="11 Symptoms">
        <section className="ella-section-tight">
          <div className="ella-container">
            <div style={{ maxWidth: 720 }}>
              <div className="ella-eyebrow">{isEs ? 'SÍNTOMAS' : 'SYMPTOMS'}</div>
              <h1 className="ella-page-title">{isEs ? '¿Qué es lo que más te está afectando?' : 'What’s bothering you most?'}</h1>
              <p className="ella-sym-lede">
                {isEs
                  ? 'Elige un síntoma. Te explico por qué pasa, qué ayuda y cuándo ir al médico.'
                  : 'Pick a symptom. You’ll see why it happens, what helps, and when to see a doctor.'}
              </p>
            </div>
            <div className="ella-sym-grid">
              {list.map((x) => (
                <button key={x.id} type="button" className="ella-sym-card" data-tone={x.tone} onClick={() => openSymptom(x.id)}>
                  <span className="ella-sym-card-name">{x.name}</span>
                  <span className="ella-sym-card-short">{x.short}</span>
                  <span className="ella-sym-card-cta">{isEs ? 'Ver qué ayuda' : 'See what helps'} <IconArrow width="14" height="14" /></span>
                </button>
              ))}
            </div>
            <a href={(window.ellaHref ? window.ellaHref(lang, 'urgent') : '#')} className="ella-urgent-strip" onClick={(e) => { e.preventDefault(); setRoute('urgent'); window.scrollTo({ top: 0 }); }}>
              <IconHeart width="18" height="18" />
              <span>{isEs ? 'Algunos síntomas no pueden esperar. Ve cuándo ir al médico de inmediato.' : 'Some symptoms can’t wait. See when to get care right away.'}</span>
              <IconArrow width="15" height="15" />
            </a>
          </div>
        </section>
      </div>
    );
  }

  const related = articles.find((a) => a.id === s.article);
  const block = (title, items) => items && items.length ? (
    <div className="ella-sym-block">
      <h3>{title}</h3>
      <ul>{items.map((t, i) => <li key={i}>{t}</li>)}</ul>
    </div>
  ) : null;

  return (
    <div data-screen-label="11 Symptom">
      <section className="ella-section-tight">
        <div className="ella-container">
          <div className="ella-sym-detail">
            <a href={(window.ellaHref ? window.ellaHref(lang, 'symptoms') : '#')} className="ella-article-back" onClick={(e) => { e.preventDefault(); openSymptom(null); }}>
              <IconChevron width="16" height="16" style={{ transform: 'rotate(180deg)' }} />
              {isEs ? 'Todos los síntomas' : 'All symptoms'}
            </a>
            <div className="ella-eyebrow" style={{ marginTop: 14 }}>{isEs ? 'SÍNTOMA' : 'SYMPTOM'}</div>
            <h1 className="ella-page-title">{s.name}</h1>

            <div className="ella-sym-why">
              <h2>{isEs ? 'Por qué pasa' : 'Why it happens'}</h2>
              <p>{s.why}</p>
            </div>

            <h2 className="ella-sym-sub">{isEs ? 'Qué ayuda' : 'What helps'}</h2>
            <div className="ella-sym-blocks">
              {block(isEs ? 'En tu día a día' : 'Day to day', s.habits)}
              {block(isEs ? 'Opciones naturales' : 'Natural options', s.natural)}
              {block(isEs ? 'Tratamientos para hablar con tu médico' : 'Treatments to ask about', s.treatment)}
            </div>

            <div className="ella-sym-doctor">
              <h2>{isEs ? 'Ve al médico si…' : 'See a doctor if…'}</h2>
              <ul>{s.doctor.map((t, i) => <li key={i}>{t}</li>)}</ul>
              <a href={(window.ellaHref ? window.ellaHref(lang, 'urgent') : '#')} onClick={(e) => { e.preventDefault(); setRoute('urgent'); window.scrollTo({ top: 0 }); }}>
                {isEs ? 'Cuándo ir de inmediato →' : 'When to get care right away →'}
              </a>
            </div>

            <div className="ella-sym-next">
              {related ? (
                <button type="button" className="ella-btn ella-btn-primary" onClick={() => openArticle(related.id)}>
                  {isEs ? 'Leer: ' : 'Read: '}{related.title.replace(/\.$/, '')}
                  <IconArrow width="17" height="17" />
                </button>
              ) : null}
              {s.supp ? (
                <button type="button" className="ella-btn ella-btn-secondary" onClick={() => { setRoute('supplements'); window.scrollTo({ top: 0 }); }}>
                  {isEs ? 'Ver suplementos' : 'See supplements'}
                </button>
              ) : null}
              <button type="button" className="ella-btn ella-btn-text" onClick={() => { setRoute('glossary'); window.scrollTo({ top: 0 }); }}>
                {isEs ? 'Glosario de términos →' : 'Spanish–English glossary →'}
              </button>
            </div>

            <section className="ella-refs">
              <h2 className="ella-refs-hd">{isEs ? 'Fuentes' : 'Sources'}</h2>
              <ol>
                {s.sources.map((r, i) => (
                  <li key={i}>
                    <span className="ella-ref-src">{r.source}</span>{' '}
                    <a href={r.href} target="_blank" rel="noopener noreferrer">{r.title}</a>
                  </li>
                ))}
              </ol>
            </section>

            <aside className="ella-disclaimer" style={{ marginTop: 24 }}>
              <p>
                {isEs
                  ? 'Esto es información general, no consejo médico. Para tu caso, habla con tu médico.'
                  : 'This is general information, not medical advice. For your situation, talk to your doctor.'}
              </p>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

window.Symptoms = Symptoms;
