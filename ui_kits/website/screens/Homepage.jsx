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

  function openArticle(id) {
    if (setArticleId) setArticleId(id);
    setRoute('article');
    window.scrollTo({ top: 0 });
  }

  return (
    <div data-screen-label="01 Homepage">
      {/* ============== HERO ============== */}
      <section className="ella-hero" data-screen-label="hero">
        <div className="ella-container">
          <div className="ella-hero-grid">
            <div>
              <h1>
                {isEs ? <>De mujeres, <em>para mujeres.</em></> : <>By women, <em>for women.</em></>}
              </h1>
              <p>
                {isEs
                  ? <><b>Todo lo que necesitas saber sobre la menopausia.</b> Nutrición, suplementos, ejercicio, salud mental y las preguntas que debes hacerle a tu médico.</>
                  : <><b>Everything you need to know about menopause.</b> Nutrition, supplements, exercise, mental health, and the questions to ask your doctor.</>}
              </p>
              <div className="ella-hero-why">
                <div className="ella-eyebrow">{isEs ? 'POR QUÉ IMPORTA' : 'WHY THIS MATTERS'}</div>
                <p>
                  {isEs
                    ? 'Todas las mujeres pasamos por la menopausia, y aun así la mayoría de las carreras de medicina le dedican menos de una hora. Por eso tantas nos sentimos perdidas durante todo el proceso.'
                    : 'Every woman goes through menopause, yet most medical schools spend less than an hour on it. That’s why so many of us feel lost the whole way through.'}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 6 }}>
                <button type="button" className="ella-btn ella-btn-primary ella-btn-lg" onClick={() => setRoute('articles')}>
                  {isEs ? 'Empieza a leer' : 'Start reading'}
                  <IconArrow width="20" height="20" />
                </button>
              </div>
              <div className="ella-hero-cred" aria-label="About the author">
                <div className="ella-hero-cred-avatar" />
                <div>
                  <strong>Jessica Zavala</strong> · {isEs ? 'Certificado en bienestar femenino' : "Women's wellness certificate"}
                </div>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <IllustrationSprig width={120} className="ella-hero-ornament tl" />
              <Photo aspect="4/5" tint="rose" src="assets/photos/portrait-terrace.jpg" objectPosition="68% center" alt={isEs ? 'Mujer sonriendo en una terraza' : 'Woman smiling on a terrace in natural light'} radius="24px">
                <IllustrationBranch width={160} className="ella-hero-ornament br" />
              </Photo>
            </div>
          </div>
          <div style={{ height: 24 }} />
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

      {/* ============== CONSULTATION / WORK WITH JESSICA ============== */}
      <section className="ella-section" data-screen-label="consultation" id="book">
        <div className="ella-container">
          <div className="ella-consult">
            <div className="ella-consult-art">
              <Photo aspect="4/5" tint="sage" alt={isEs ? 'Retrato de Jessica' : 'Warm portrait of Jessica'} radius="22px" />
              <div className="ella-consult-badge">
                <span className="ella-consult-badge-min">30</span>
                <span className="ella-consult-badge-lbl">{isEs ? 'min' : 'min'}</span>
              </div>
            </div>
            <div className="ella-consult-body">
              <div className="ella-eyebrow">{isEs ? 'TRABAJA CONMIGO' : 'WORK WITH ME'}</div>
              <h2 className="ella-h2-italic">
                {isEs ? <>Haz una <em>cita</em> de 30 minutos.</> : <>Book a 30-minute <em>consultation.</em></>}
              </h2>
              <p>
                {isEs
                  ? 'Una llamada contigo y Jessica, en español o en inglés, para hablar de tus síntomas y de cuál es el siguiente paso.'
                  : 'A one-on-one call with Jessica, in English or Spanish, to talk through your symptoms and where to go next.'}
              </p>
              <ul className="ella-consult-list">
                <li>
                  <strong>{isEs ? 'Por dónde empezar' : 'Where to start'}</strong>
                  {isEs ? 'Qué atender primero, según tu etapa' : 'What to prioritize first, based on your stage'}
                </li>
                <li>
                  <strong>{isEs ? 'Qué preguntarle a tu médico' : 'What to ask your doctor'}</strong>
                  {isEs ? 'Que salgas de la cita con respuestas' : 'Leave your appointment with real answers'}
                </li>
                <li>
                  <strong>{isEs ? 'Cómo entender los estudios' : 'How to read the research'}</strong>
                  {isEs ? 'Distinguir la evidencia de la publicidad' : 'Telling evidence apart from marketing'}
                </li>
              </ul>
              <p className="ella-consult-note">
                {isEs
                  ? 'Ella comparte información, no consejo médico. Esta llamada no sustituye a tu médico y no incluye diagnósticos ni recetas.'
                  : 'Ella shares information, not medical advice. This call doesn’t replace your doctor and doesn’t include a diagnosis or prescriptions.'}
              </p>
              <div className="ella-consult-actions">
                <a className="ella-btn ella-btn-primary" href={ELLA_LINKS.booking} target="_blank" rel="noopener noreferrer">
                  <IconCalendar width="18" height="18" />
                  {isEs ? 'Hacer una cita' : 'Book 30 minutes'}
                </a>
                {ELLA_LINKS.whatsapp ? (
                  <a className="ella-btn ella-btn-whatsapp" href={ELLA_LINKS.whatsapp} target="_blank" rel="noopener noreferrer">
                    <IconWhatsApp width="18" height="18" />
                    {isEs ? 'Escríbeme por WhatsApp' : 'Message me on WhatsApp'}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>




    </div>
  );
}

window.Homepage = Homepage;
