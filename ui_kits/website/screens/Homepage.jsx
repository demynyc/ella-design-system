// Homepage, final Pause-Life-inspired editorial layout.
// Order: hero → "why this matters" intro → explore by topic → quiz banner →
//        consultation → info link grid.

export function Homepage({ lang, setRoute, setArticleId, openSymptom, goToCategory, primaryColor, heroVariant }) {
  const t = useT(lang);
  const isEs = lang === 'es';
  const articles = typeof getArticles === 'function' ? getArticles(lang) : [];
  const countIn = (cat) => articles.filter(a => a.category === cat).length;
  const goCat = (cat) => () => {
    if (goToCategory) goToCategory('articles', cat);
    else setRoute('articles');
    window.scrollTo({ top: 0 });
  };
  const topics = [
    { label: isEs ? 'Perimenopausia' : 'Perimenopause', tone: 'rose', icon: <IconLeaf width="19" height="19" />,
      count: countIn(isEs ? 'Perimenopausia' : 'Perimenopause'), onClick: goCat(isEs ? 'Perimenopausia' : 'Perimenopause') },
    { label: isEs ? 'Menopausia' : 'Menopause', tone: 'rose', icon: <IconSparkle width="19" height="19" />,
      count: countIn(isEs ? 'Menopausia' : 'Menopause'), onClick: goCat(isEs ? 'Menopausia' : 'Menopause') },
    { label: isEs ? 'Ejercicio' : 'Exercise', tone: 'sage', icon: <IconDumbbell width="19" height="19" />,
      count: countIn(isEs ? 'Ejercicio' : 'Exercise'), onClick: goCat(isEs ? 'Ejercicio' : 'Exercise') },
    { label: isEs ? 'Nutrición' : 'Nutrition', tone: 'sage', icon: <IconApple width="19" height="19" />,
      count: countIn(isEs ? 'Nutrición' : 'Nutrition'), onClick: goCat(isEs ? 'Nutrición' : 'Nutrition') },
    { label: isEs ? 'Salud mental' : 'Mental health', tone: 'plum', icon: <IconBrain width="19" height="19" />,
      count: countIn(isEs ? 'Salud mental' : 'Mental Health'), onClick: goCat(isEs ? 'Salud mental' : 'Mental Health') },
    { label: isEs ? 'Suplementos' : 'Supplements', tone: 'plum', icon: <IconDroplet width="19" height="19" />,
      count: -1, onClick: () => { setRoute('supplements'); window.scrollTo({ top: 0 }); } },
  ];

  // Parallax: the hero photo moves at about a third of the scroll speed.
  React.useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const photo = document.querySelector('.ella-hero-v3-photo');
    if (!photo) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      if (y > window.innerHeight * 1.2) return; // hero is off screen
      photo.style.setProperty('--py', Math.round(y * 0.32) + 'px');
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  function openArticle(id) {
    if (setArticleId) setArticleId(id);
    setRoute('article');
    window.scrollTo({ top: 0 });
  }

  return (
    <div data-screen-label="01 Homepage">
      {/* ============== HERO ==============
          Modeled on the Ella Wellness hero: full-bleed photo, large serif
          headline, one line of copy, two pill buttons, and a five-step path
          on the right. Everything rises in on load, staggered. */}
      <section className="ella-hero ella-hero-v3" data-screen-label="hero">
        <div className="ella-hero-v3-bg" aria-hidden="true"><div className="ella-hero-v3-photo" /></div>
        <div className="ella-container ella-hero-v3-inner">
          <div className="ella-hero-v3-copy">
            <h1>
              <span className="ella-rise ella-rise-1">{isEs ? 'De mujeres,' : 'By women,'}</span>
              <span className="ella-rise ella-rise-2">{isEs ? 'para mujeres.' : 'for women.'}</span>
            </h1>
            <p className="ella-rise ella-rise-4">
              {isEs
                ? 'Información y recursos confiables sobre la menopausia, en español y en inglés.'
                : 'Trusted information and resources on menopause, in English and Spanish.'}
            </p>
            <div className="ella-hero-v3-ctas ella-rise ella-rise-5">
              <button type="button" className="ella-hero-btn is-solid" onClick={() => setRoute('articles')}>
                {isEs ? 'Empieza a leer' : 'Start reading'}
              </button>
              <button type="button" className="ella-hero-btn is-ghost" onClick={() => setRoute('quiz')}>
                {isEs ? 'Haz el cuestionario' : 'Take the check-in'}
              </button>
            </div>
          </div>

          <ol className="ella-hero-path" aria-label={isEs ? 'Cómo usar Ella' : 'How to use Ella'}>
            {(isEs ? [
              ['Conoce tu etapa', () => goCat('Perimenopausia')()],
              ['Encuentra tus síntomas', () => openSymptom && openSymptom(null)],
              ['Haz el cuestionario', () => setRoute('quiz')],
              ['Lee lo que ayuda', () => setRoute('articles')],
              ['Haz una cita', () => { const el = document.getElementById('book'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }],
            ] : [
              ['Know your stage', () => goCat('Perimenopause')()],
              ['Find your symptoms', () => openSymptom && openSymptom(null)],
              ['Take the check-in', () => setRoute('quiz')],
              ['Read what helps', () => setRoute('articles')],
              ['Book a consultation', () => { const el = document.getElementById('book'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }],
            ]).map(([label, go], i) => (
              <li key={label} style={{ '--i': i }}>
                <button type="button" onClick={go}>
                  <span className="ella-hero-path-label">{label}</span>
                  <span className={'ella-hero-path-node' + (i === 0 ? ' is-first' : '')} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============== EXPLORE BY TOPIC ============== */}
      <section className="ella-section ella-bg-cream" data-screen-label="topics">
        <div className="ella-container">
          <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 28px' }}>
            <div className="ella-eyebrow">{isEs ? 'EXPLORA POR TEMA' : 'EXPLORE BY TOPIC'}</div>
            <h2 className="ella-h2-italic ella-section-title" style={{ marginTop: 8 }}>
              {isEs ? <>¿Por dónde <em>empiezo?</em></> : <>Where should I <em>start?</em></>}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ella-clay-700)', marginTop: 12 }}>
              {isEs
                ? 'Elige el tema que más tenga que ver contigo ahora. No tienes que leerlo todo ni en orden.'
                : 'Pick the one that fits what you’re going through. You don’t have to read everything, or in order.'}
            </p>
          </div>

          <div className="ella-topics">
            {topics.map((tp) => (
              <button
                key={tp.label}
                type="button"
                className={'ella-topic' + (tp.count === 0 ? ' is-soon' : '')}
                data-tone={tp.tone}
                onClick={tp.onClick}
              >
                <span className="ella-topic-icon">{tp.icon}</span>
                <span className="ella-topic-body">
                  <span className="ella-topic-label">{tp.label}</span>
                  <span className="ella-topic-count">
                    {tp.count === -1
                      ? (() => { const n = typeof window.getSupplementCount === 'function' ? window.getSupplementCount() : 0; return n + ' ' + (isEs ? 'suplementos' : 'supplements'); })()
                      : tp.count === 0
                        ? (isEs ? 'Pronto' : 'Coming soon')
                        : tp.count + ' ' + (tp.count === 1 ? (isEs ? 'artículo' : 'article') : (isEs ? 'artículos' : 'articles'))}
                  </span>
                </span>
                <IconArrow width="15" height="15" className="ella-topic-arrow" />
              </button>
            ))}
          </div>

          <div className="ella-hero-syms ella-topics-syms">
            <span className="ella-topics-syms-head">
              <strong>{isEs ? 'O empieza por un síntoma' : 'Or start with a symptom'}</strong>
              <em>{isEs ? 'Qué es, por qué pasa, qué ayuda y cuándo ir al médico.' : 'What it is, why it happens, what helps, and when to see a doctor.'}</em>
            </span>
            <div>
              {(typeof getSymptoms === 'function' ? getSymptoms(lang) : []).map((x) => (
                <button key={x.id} type="button" className="ella-hero-sym" onClick={() => openSymptom && openSymptom(x.id)}>
                  {x.name.split(/ (&|y) /)[0]}
                </button>
              ))}
              <button type="button" className="ella-hero-sym is-more" onClick={() => openSymptom && openSymptom(null)}>
                {isEs ? 'Ver todos' : 'See all'} →
              </button>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <button type="button" className="ella-btn ella-btn-secondary" onClick={() => setRoute('articles')}>
              {isEs ? 'Ver todos los artículos' : 'Browse the whole library'}
              <IconArrow width="17" height="17" />
            </button>
          </div>
        </div>
      </section>

      {/* ============== CHECK-IN BANNER ============== */}
      <section className="ella-section-tight" data-screen-label="checkin">
        <div className="ella-container">
          <div className="ella-checkin">
            <div className="ella-checkin-body">
              <div className="ella-eyebrow">{isEs ? 'CUESTIONARIO' : 'PERSONAL CHECK-IN'}</div>
              <h2 className="ella-h2-italic">
                {isEs ? <>¿Quieres una lista <em>hecha para ti?</em></> : <>Want a reading list <em>made for you?</em></>}
              </h2>
              <p>
                {isEs
                  ? 'Cinco preguntas sobre tu etapa, tus síntomas y lo que buscas. Al final te digo por dónde empezar a leer.'
                  : 'Five questions about your stage, your symptoms, and what you need. At the end you’ll know what to read first.'}
              </p>
              <button type="button" className="ella-btn ella-btn-primary" onClick={() => setRoute('quiz')}>
                {isEs ? 'Hacer el cuestionario' : 'Take the check-in'}
                <IconArrow width="18" height="18" />
              </button>
            </div>
            <ol className="ella-checkin-steps" aria-label={isEs ? 'Cómo funciona' : 'How it works'}>
              <li><span>01</span>{isEs ? 'Cuéntame en qué etapa crees que estás' : 'Tell us what stage you think you’re in'}</li>
              <li><span>02</span>{isEs ? 'Marca los síntomas que tienes' : 'Check off the symptoms you recognize'}</li>
              <li><span>03</span>{isEs ? 'Recibe tus recomendaciones' : 'Get your information'}</li>
            </ol>
          </div>
        </div>
      </section>

      {/* ============== CONSULTATION ============== */}
      <section className="ella-section" data-screen-label="consultation" id="book">
        <div className="ella-container">
          <div className="ella-consult ella-consult-solo">
            <div className="ella-consult-body">
              <h2 className="ella-h2-italic">
                {isEs ? 'Haz una cita' : 'Book a consultation'}
              </h2>
              <p>
                {isEs ? '30 minutos, en español o en inglés.' : '30 minutes, in English or Spanish.'}
              </p>
              <div className="ella-consult-actions">
                <a className="ella-btn ella-btn-primary" href={ELLA_LINKS.booking} target="_blank" rel="noopener noreferrer">
                  {isEs ? 'Hacer una cita' : 'Book a consultation'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>




    </div>
  );
}

window.Homepage = Homepage;
