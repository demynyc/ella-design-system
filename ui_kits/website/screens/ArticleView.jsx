// ArticleView, long-form article reader. Structure follows an editorial
// health-blog format: category → title → lede → author byline → meta →
// share → cover → key takeaways → numbered TOC → body → disclaimer →
// author card → references → keep reading.

function slugify(s) {
  return String(s).toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim().replace(/\s+/g, '-');
}

export function ArticleView({ lang, setRoute, articleId, setArticleId }) {
  const t = useT(lang);
  const isEs = lang === 'es';
  const article = getArticle(articleId || 'protein-after-45', lang);
  const [copied, setCopied] = React.useState(false);
  const [activeId, setActiveId] = React.useState(null);

  const toneColor = article.tone === 'sage' ? 'var(--ella-sage-700)'
                  : article.tone === 'plum' ? 'var(--ella-plum-500)'
                  : 'var(--ella-rose-deep)';

  // Table of contents from h2 blocks
  const sections = article.body
    .filter(b => b.kind === 'h2')
    .map(b => ({ text: b.text, id: slugify(b.text) }));

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
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [articleId, lang]);

  function jump(e, id) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
  }

  function copyLink() {
    const url = window.location.href;
    if (navigator.clipboard) navigator.clipboard.writeText(url).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div data-screen-label="04 Article">
      <section className="ella-section-tight">
        <div className="ella-container">
          <div className="ella-article-layout">
          <div className="ella-article">
            <a className="ella-article-back" href="#"
              onClick={(e) => { e.preventDefault(); setRoute('articles'); }}>
              <IconChevron width="16" height="16" style={{ transform: 'rotate(180deg)' }} />
              {t('article_back')}
            </a>

            <div className="ella-eyebrow" style={{ color: toneColor }}>
              {article.category.toUpperCase()}
            </div>
            <h1>{article.title}</h1>
            <p className="ella-article-lede">{article.lede}</p>

            {/* Author byline card */}
            <div className="ella-byline">
              <span className="ella-byline-avatar" aria-hidden="true" />
              <span className="ella-byline-text">
                <span className="ella-byline-name">{isEs ? 'Por ' : 'By '}<strong>Jessica Zavala</strong></span>
              </span>
            </div>

            <div className="ella-article-meta">
              <span>{article.published}</span>
              {article.updated && article.updated !== article.published ? (<><span className="dot" /><span>{isEs ? 'Actualizado ' : 'Updated '}{article.updated}</span></>) : null}
              <span className="dot" />
              <span>{article.readTime}</span>
            </div>

            {/* Share row */}
            <div className="ella-share-row">
              <span className="ella-share-lbl">{isEs ? 'Compartir' : 'Share'}</span>
              <a className="ella-share-btn" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"
                href={'https://wa.me/?text=' + encodeURIComponent(article.title + ' ' + window.location.href)}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.42 5.82c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.24-8.24z"/></svg>
              </a>
              <a className="ella-share-btn" aria-label="Facebook" target="_blank" rel="noopener noreferrer"
                href={'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href)}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12z"/></svg>
              </a>
              <a className="ella-share-btn" aria-label="Email" target="_blank" rel="noopener noreferrer"
                href={'mailto:?subject=' + encodeURIComponent(article.title) + '&body=' + encodeURIComponent(window.location.href)}>
                <IconMail width="17" height="17" />
              </a>
              <button type="button" className="ella-share-btn" onClick={copyLink} aria-label={isEs ? 'Copiar enlace' : 'Copy link'}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </button>
              {copied ? <span className="ella-share-copied">{isEs ? '¡Copiado!' : 'Copied!'}</span> : null}
            </div>

            {/* Key takeaways */}
            {article.takeaways && article.takeaways.length ? (
              <aside className="ella-takeaways">
                <div className="ella-takeaways-hd">{isEs ? 'Lo importante en 30 segundos' : 'The short version'}</div>
                <ul>
                  {article.takeaways.map((k, i) => <li key={i}>{k}</li>)}
                </ul>
              </aside>
            ) : null}

            {/* Table of contents */}
            {sections.length > 2 ? (
              <nav className="ella-toc" aria-label={isEs ? 'En este artículo' : 'In this article'}>
                <div className="ella-toc-hd">{isEs ? 'En este artículo' : 'In this article'}</div>
                <ol>
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a href={'#' + s.id} onClick={(e) => jump(e, s.id)}>
                        <span className="ella-toc-num">{String(i + 1).padStart(2, '0')}</span>
                        <span>{s.text}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}

            <div className="ella-article-body">
              {article.body.map((block, i) => {
                if (block.kind === 'p')    return <p key={i}>{block.text}</p>;
                if (block.kind === 'h2')   return <h2 key={i} id={slugify(block.text)}>{block.text}</h2>;
                if (block.kind === 'pull') return <div key={i} className="ella-article-pull">{block.text}</div>;
                if (block.kind === 'ul')   return (
                  <ul key={i} style={{ fontSize: 18, lineHeight: 1.75, color: 'var(--ella-clay-700)', paddingLeft: 22 }}>
                    {block.items.map((it, j) => <li key={j}>{it}</li>)}
                  </ul>
                );
                if (block.kind === 'table') return (
                  <table key={i} className="ella-protein-table">
                    <thead><tr>{block.headers.map((h, j) => <th key={j}>{h}</th>)}</tr></thead>
                    <tbody>{block.rows.map((row, j) => (
                      <tr key={j}>{row.map((cell, k) => <td key={k}>{cell}</td>)}</tr>
                    ))}</tbody>
                  </table>
                );
                return null;
              })}
            </div>

            {/* Questions to bring to the doctor */}
            {article.doctorQuestions && article.doctorQuestions.length ? (
              <section className="ella-docq" aria-labelledby="docq-hd">
                <div className="ella-docq-top">
                  <h2 id="docq-hd">{isEs ? 'Preguntas para tu médico' : 'Questions for your doctor'}</h2>
                  <button type="button" className="ella-docq-print" onClick={() => window.print()}>
                    {isEs ? 'Imprimir' : 'Print'}
                  </button>
                </div>
                <p className="ella-docq-note">
                  {isEs ? 'Llévalas a tu próxima cita, en papel o en tu teléfono.' : 'Take these to your next appointment, on paper or on your phone.'}
                </p>
                <ol>
                  {article.doctorQuestions.map((dq, i) => <li key={i}>{dq}</li>)}
                </ol>
                <a href="#" className="ella-docq-gloss" onClick={(e) => { e.preventDefault(); setRoute('glossary'); window.scrollTo({ top: 0 }); }}>
                  {isEs ? '¿Tu médico habla inglés? Ve el glosario de términos →' : 'Doctor speaks English only? See the Spanish–English glossary →'}
                </a>
              </section>
            ) : null}

            {/* Medical disclaimer */}
            <aside className="ella-disclaimer">
              <div className="ella-disclaimer-hd">{isEs ? 'Aviso médico' : 'Medical notice'}</div>
              <p>
                {isEs
                  ? 'Este contenido es solo informativo. No sustituye la consulta, el diagnóstico ni el tratamiento de un profesional de la salud. Habla con tu médico antes de tomar decisiones sobre tu salud, sobre todo si tomas medicamentos.'
                  : 'This content is informational and educational. It does not replace consultation, diagnosis, or treatment by a healthcare professional. Always talk to your own doctor before making decisions about your health, especially if you take medication.'}
              </p>
            </aside>

            {/* References */}
            {article.references && article.references.length ? (
              <section className="ella-refs">
                <h2 className="ella-refs-hd">{isEs ? 'Referencias' : 'References'}</h2>
                <ol>
                  {article.references.map((r, i) => (
                    <li key={i}>
                      <span className="ella-ref-src">{r.source}</span>
                      {r.href
                        ? <a href={r.href} target="_blank" rel="noopener noreferrer">{r.title}<IconArrow width="13" height="13" style={{ transform: 'rotate(-45deg)' }} /></a>
                        : <span>{r.title}</span>}
                      {r.note ? <span className="ella-ref-note">{r.note}</span> : null}
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}

            {/* Share again */}
            <div className="ella-share-row" style={{ marginTop: 36 }}>
              <span className="ella-share-lbl">{isEs ? '¿Te sirvió? Compártelo' : 'Was this useful? Share it'}</span>
              <a className="ella-share-btn" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"
                href={'https://wa.me/?text=' + encodeURIComponent(article.title + ' ' + window.location.href)}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.42 5.82c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.24-8.24z"/></svg>
              </a>
              <a className="ella-share-btn" aria-label="Email" target="_blank" rel="noopener noreferrer"
                href={'mailto:?subject=' + encodeURIComponent(article.title) + '&body=' + encodeURIComponent(window.location.href)}>
                <IconMail width="17" height="17" />
              </a>
            </div>

            {/* More to read */}
            <div style={{ marginTop: 72, paddingTop: 40, borderTop: '1px solid var(--border-default)' }}>
              <div className="ella-eyebrow" style={{ marginBottom: 16 }}>{isEs ? 'SIGUE LEYENDO' : 'KEEP READING'}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                {getArticles(lang).filter(a => a.id !== article.id).slice(0, 3).map((a) => (
                  <a key={a.id} href="#" className="ella-article-mini"
                    onClick={(e) => { e.preventDefault(); setArticleId(a.id); window.scrollTo({ top: 0 }); }}>
                    <div className="ella-article-mini-cat">{a.category}</div>
                    <div className="ella-article-mini-title">{a.title}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {sections.length > 1 ? (
            <aside className="ella-toc-rail" aria-label={isEs ? 'En este artículo' : 'In this article'}>
              <div className="ella-toc-rail-hd">{isEs ? 'En este artículo' : 'In this article'}</div>
              <ol>
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={'#' + s.id}
                      className={activeId === s.id ? 'is-active' : ''}
                      onClick={(e) => jump(e, s.id)}>
                      <span className="ella-toc-rail-num">{String(i + 1).padStart(2, '0')}</span>
                      <span>{s.text}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </aside>
          ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

window.ArticleView = ArticleView;
