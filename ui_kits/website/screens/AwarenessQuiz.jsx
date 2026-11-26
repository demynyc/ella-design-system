// Awareness Quiz, a gentle 5-question check-in. No score, no diagnosis.
// Answers (stage, symptoms, impact, goals, doctor history) feed a
// recommendation engine that points each woman to the right reading.

export function AwarenessQuiz({ lang, setRoute, openArticle }) {
  const t = useT(lang);
  const isEs = lang === 'es';
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState({});

  // ---- Question set. Bilingual labels live here so the engine can match
  // on stable answer KEYS regardless of language. ----
  const questions = [
    {
      id: 'stage', kind: 'single',
      text: isEs ? '¿En qué etapa estás?' : 'Where are you in your journey?',
      help: isEs ? 'No tienes que estar segura. Elige lo que más se parezca.' : 'No need to be certain. Pick whatever feels closest.',
      opts: [
        { key: 'regular',  label: isEs ? 'Mi regla sigue siendo regular' : 'My periods are still regular' },
        { key: 'changing', label: isEs ? 'Mi regla está cambiando o es irregular' : 'My periods are changing or irregular' },
        { key: 'post',     label: isEs ? 'Llevo 12 meses o más sin regla' : "It's been 12+ months since my last period" },
        { key: 'surgical', label: isEs ? 'Tuve menopausia por cirugía o tratamiento' : "I've had surgical or medical menopause" },
        { key: 'unsure',   label: isEs ? 'No sé en qué etapa estoy' : "I'm not sure where I am" },
      ],
    },
    {
      id: 'symptoms', kind: 'multi',
      text: isEs ? '¿Cuáles de estos has notado últimamente?' : "Which of these have you noticed lately?",
      help: isEs ? 'Marca todas las que apliquen. También puedes dejarlo en blanco.' : 'Choose all that apply. It is okay to leave it blank.',
      opts: [
        { key: 'hot',      label: isEs ? 'Bochornos o sudores nocturnos' : 'Hot flashes or night sweats' },
        { key: 'sleep',    label: isEs ? 'Duermes mal o tienes insomnio' : 'Sleep changes or insomnia' },
        { key: 'mood',     label: isEs ? 'Cambios de humor, ansiedad o tristeza' : 'Mood shifts, anxiety, or low mood' },
        { key: 'fog',      label: isEs ? 'Mente nublada u olvidos' : 'Brain fog or memory lapses' },
        { key: 'periods',  label: isEs ? 'Reglas irregulares o muy abundantes' : 'Irregular or heavy periods' },
        { key: 'intimacy', label: isEs ? 'Resequedad vaginal o cambios en el deseo sexual' : 'Vaginal dryness or changes in libido' },
        { key: 'body',     label: isEs ? 'Dolor en las articulaciones o cambios de peso' : 'Joint aches or weight changes' },
        { key: 'none',     label: isEs ? 'Ninguno por ahora' : 'None of these right now', exclusive: true },
      ],
    },
    {
      id: 'impact', kind: 'single',
      text: isEs ? '¿Qué tanto te está afectando en tu día a día?' : 'How much is this affecting your daily life?',
      opts: [
        { key: 'curious', label: isEs ? 'Apenas, tengo curiosidad' : "Barely, I'm mostly curious" },
        { key: 'some',    label: isEs ? 'Hay días más difíciles' : 'Some days are harder than others' },
        { key: 'lot',     label: isEs ? 'Mucho, ya no lo puedo ignorar' : "A lot, it's hard to ignore" },
        { key: 'unsure',  label: isEs ? 'Honestamente, no estoy segura' : "I'm honestly not sure" },
      ],
    },
    {
      id: 'goals', kind: 'multi',
      text: isEs ? '¿Qué te ayudaría más ahora?' : 'What would feel most helpful right now?',
      help: isEs ? 'Marca todas las que apliquen.' : 'Choose all that apply.',
      opts: [
        { key: 'understand',  label: isEs ? 'Entender qué le está pasando a mi cuerpo' : "Understanding what's happening to my body" },
        { key: 'nutrition',   label: isEs ? 'Alimentación y ejercicio para esta etapa' : 'Nutrition and exercise that fit this stage' },
        { key: 'supplements', label: isEs ? 'Saber qué suplementos sí valen la pena' : 'Knowing which supplements are worth it' },
        { key: 'hormones',    label: isEs ? 'Conocer las opciones de terapia hormonal' : 'Learning about hormone therapy options' },
        { key: 'doctor',      label: isEs ? 'Saber qué preguntarle a mi médico' : 'Knowing what to ask my doctor' },
        { key: 'support',     label: isEs ? 'Sentirme menos sola' : 'Feeling less alone in it' },
      ],
    },
    {
      id: 'care', kind: 'single',
      text: isEs ? '¿Ya hablaste de esto con un médico?' : 'Have you talked to a doctor about this?',
      opts: [
        { key: 'helpful',   label: isEs ? 'Sí, y me ayudó' : 'Yes, and it was helpful' },
        { key: 'dismissed', label: isEs ? 'Sí, pero no me hizo caso' : 'Yes, but I felt dismissed' },
        { key: 'notyet',    label: isEs ? 'Todavía no' : 'Not yet' },
        { key: 'how',       label: isEs ? 'No, no sé cómo sacar el tema' : "No, I'm not sure how to bring it up" },
      ],
    },
  ];

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
      setAnswers({ ...answers, [q.id]: next });
    } else {
      setAnswers({ ...answers, [q.id]: opt.key });
    }
  }

  const canAdvance = q && (q.kind === 'multi' ? true : !!selected);

  // ---------- Recommendation engine ----------
  function buildCards() {
    return {
      foundations: {
        icon: <IconSparkle width="26" height="26" />, tone: 'plum', route: 'article', articleId: 'menopause-vs-perimenopause',
        title: isEs ? 'Para empezar: menopausia y perimenopausia' : 'Start here: menopause vs. perimenopause',
        desc: isEs ? 'La diferencia, y por qué importa. 4 minutos.' : 'The difference, and why it changes what you do. 4 minutes.',
        cta: isEs ? 'Leer' : 'Read',
      },
      postLife: {
        icon: <IconHeart width="26" height="26" />, tone: 'rose', route: 'article', articleId: 'heart-health-menopause',
        title: isEs ? 'Salud del corazón después de la menopausia' : 'Heart health after menopause',
        desc: isEs ? 'El cambio más importante a largo plazo, y qué hacer.' : 'The most important long-term change, and what to do.',
        cta: isEs ? 'Leer' : 'Read',
      },
      hot: {
        icon: <IconHeart width="26" height="26" />, tone: 'rose', route: 'article', articleId: 'hrt-and-alternatives',
        title: isEs ? 'Bochornos: terapia hormonal y alternativas naturales' : 'Hot flashes: HRT and natural alternatives',
        desc: isEs ? 'Las opciones que sí tienes, explicadas.' : 'Your options, explained.',
        cta: isEs ? 'Leer' : 'Read',
      },
      sleep: {
        icon: <IconMoon width="26" height="26" />, tone: 'plum', route: 'supplements',
        title: isEs ? 'Sueño: el magnesio y otras ayudas' : 'Sleep: magnesium and other support',
        desc: isEs ? 'Lo que investigué, y qué buscar en la etiqueta.' : 'What I researched, and the form to look for.',
        cta: isEs ? 'Ver suplementos' : 'See supplements',
      },
      mood: {
        icon: <IconBrain width="26" height="26" />, tone: 'plum', route: 'article', articleId: 'estrogen-explained',
        title: isEs ? 'El estado de ánimo y el estrógeno' : 'Mood and estrogen: the connection',
        desc: isEs ? 'No es solo estrés. Todo lo que hace el estrógeno en el cuerpo.' : "It's not just stress. What estrogen does across the whole body.",
        cta: isEs ? 'Leer' : 'Read',
      },
      fog: {
        icon: <IconBrain width="26" height="26" />, tone: 'plum', route: 'article', articleId: 'inflammation',
        title: isEs ? 'Mente nublada e inflamación' : 'Brain fog and inflammation',
        desc: isEs ? 'Lo que está detrás de casi todos los síntomas.' : 'The mechanism behind almost every symptom.',
        cta: isEs ? 'Leer' : 'Read',
      },
      periods: {
        icon: <IconDownload width="26" height="26" />, tone: 'rose', route: 'resources',
        title: isEs ? 'Cuándo hablar con tu ginecólogo' : 'When to talk to your OB-GYN',
        desc: isEs ? 'Fuentes confiables para preparar tu cita.' : 'Trusted sources to prepare for your visit.',
        cta: isEs ? 'Ver recursos' : 'See resources',
      },
      intimacy: {
        icon: <IconHeart width="26" height="26" />, tone: 'rose', route: 'article', articleId: 'hrt-and-alternatives',
        title: isEs ? 'Intimidad y resequedad: tus opciones' : 'Intimacy & dryness: your options',
        desc: isEs ? 'Incluye por qué el estrógeno vaginal es diferente.' : 'Including why vaginal estrogen is different.',
        cta: isEs ? 'Leer' : 'Read',
      },
      body: {
        icon: <IconDumbbell width="26" height="26" />, tone: 'sage', route: 'article', articleId: 'bones-and-estrogen',
        title: isEs ? 'Huesos, músculo y fuerza' : 'Bones, muscle & strength',
        desc: isEs ? 'Por qué cambia el cuerpo y las dos cosas que sí funcionan.' : 'Why the body shifts, and the two things that reliably help.',
        cta: isEs ? 'Leer' : 'Read',
      },
      nutrition: {
        icon: <IconLeaf width="26" height="26" />, tone: 'sage', route: 'nutrition',
        title: isEs ? 'Qué comer en esta etapa' : 'Eating for hormonal change',
        desc: isEs ? 'Cambios sencillos que importan más ahora.' : 'Simple swaps that matter more at this stage.',
        cta: isEs ? 'Explorar' : 'Explore',
      },
      supplements: {
        icon: <IconDroplet width="26" height="26" />, tone: 'rose', route: 'supplements',
        title: isEs ? 'Los suplementos que vale la pena conocer' : 'The supplements worth knowing',
        desc: isEs ? 'Cuáles sí vale la pena tomar, y qué dice la evidencia.' : 'Which ones are worth taking, and the evidence behind them.',
        cta: isEs ? 'Ver suplementos' : 'See the list',
      },
      hormones: {
        icon: <IconHeart width="26" height="26" />, tone: 'rose', route: 'article', articleId: 'hrt-and-alternatives',
        title: isEs ? 'Terapia hormonal, en lenguaje claro' : 'Hormone therapy, in plain language',
        desc: isEs ? 'Las opciones, explicadas con claridad.' : 'Your options, explained.',
        cta: isEs ? 'Explorar opciones' : 'Explore options',
      },
      doctor: {
        icon: <IconDownload width="26" height="26" />, tone: 'rose', route: 'resources',
        title: isEs ? 'Recursos para tu próxima cita' : 'Resources for your next appointment',
        desc: isEs ? 'Enlaces confiables para que llegues preparada.' : 'Trusted links so you walk in prepared.',
        cta: isEs ? 'Ver recursos' : 'See resources',
      },
      specialist: {
        icon: <IconArrow width="26" height="26" />, tone: 'plum', route: 'resources',
        title: isEs ? 'Cómo encontrar un especialista en menopausia' : 'How to find a menopause specialist',
        desc: isEs ? 'Qué buscar cuando sientes que no te escuchan.' : "What to look for when your doctor isn't listening.",
        cta: isEs ? 'Aprender' : 'Learn how',
      },
      support: {
        icon: <IconUsers width="26" height="26" />, tone: 'sage', route: 'symptoms',
        title: isEs ? 'No estás sola en esto' : "You're not alone in this",
        desc: isEs ? 'Lo que sientes es común. Mira qué ayuda.' : 'What you\u2019re feeling is common. See what helps.',
        cta: isEs ? 'Ver síntomas' : 'See symptoms',
      },
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
    const add = (card) => {
      if (!card) return;
      const key = card.articleId || card.route;
      if (seen.has(key)) return;
      seen.add(key); recs.push(card);
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
      understand: cards.foundations, nutrition: cards.nutrition, supplements: cards.supplements,
      hormones: cards.hormones, doctor: cards.doctor, support: cards.support,
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
      return isEs
        ? 'Algo importante: cualquier sangrado después de la menopausia es motivo para llamar a tu médico, aunque casi siempre no sea nada grave.'
        : 'One important note: any bleeding after menopause is worth a call to your doctor, even though it is usually nothing serious. It is worth getting checked.';
    }
    return null;
  }

  function resultIntro() {
    const symptoms = (answers.symptoms || []).filter(k => k !== 'none');
    const impact = answers.impact;
    const care = answers.care;
    if (care === 'dismissed') {
      return isEs
        ? 'Que no te hagan caso pasa más de lo que debería, y no es tu culpa. Empecemos con herramientas para que la próxima cita sea diferente.'
        : "Being brushed off by a doctor happens a lot, and it's not your fault. Start with these so your next appointment goes better.";
    }
    if (impact === 'lot') {
      return isEs
        ? 'Suena a que estás cargando con mucho. Estas lecturas te pueden ayudar a sentir que tienes más control.'
        : "That sounds like a lot to deal with. These are good places to start.";
    }
    if (symptoms.length === 0) {
      return isEs
        ? 'No marcaste síntomas, y es buen momento para informarte antes de que las cosas cambien. Por aquí puedes empezar.'
        : "You didn't pick any symptoms, so this is a good time to learn what's coming. Start here.";
    }
    return isEs
      ? 'Según lo que me contaste, por aquí puedes empezar. No es un diagnóstico, solo un siguiente paso.'
      : "Based on your answers, start here. This isn't a diagnosis, just a next step.";
  }

  // Small human-readable recap of the answers.
  function recapChips() {
    const chips = [];
    const stageLabels = {
      regular: isEs ? 'Regla regular' : 'Regular periods',
      changing: isEs ? 'Regla cambiando' : 'Periods changing',
      post: isEs ? 'Posmenopausia' : 'Postmenopause',
      surgical: isEs ? 'Menopausia por tratamiento' : 'Medical menopause',
      unsure: isEs ? 'Etapa sin definir' : 'Stage to be determined',
    };
    if (answers.stage) chips.push(stageLabels[answers.stage]);
    const symCount = (answers.symptoms || []).filter(k => k !== 'none').length;
    if (symCount) chips.push(isEs ? `${symCount} síntoma${symCount > 1 ? 's' : ''}` : `${symCount} symptom${symCount > 1 ? 's' : ''}`);
    const impactLabels = {
      curious: isEs ? 'Por curiosidad' : 'Curious',
      some: isEs ? 'Algunos días difíciles' : 'Some hard days',
      lot: isEs ? 'Ya no lo puedo ignorar' : 'Hard to ignore',
      unsure: isEs ? 'No estoy segura' : 'Not sure yet',
    };
    if (answers.impact) chips.push(impactLabels[answers.impact]);
    return chips;
  }

  // ============ RESULTS ============
  if (done) {
    const recs = getRecommendations();
    const note = safetyNote();
    const chips = recapChips();
    return (
      <div data-screen-label="03 Quiz Results">
        <section className="ella-section">
          <div className="ella-container">
            <div className="ella-quiz">
              <div className="ella-eyebrow">{isEs ? 'GRACIAS POR CONTARME' : 'YOUR RESULTS'}</div>
              <h2 className="ella-quiz-q" style={{ marginTop: 14 }}>
                {isEs ? 'Por aquí puedes empezar.' : "Here's where to start."}
              </h2>

              {chips.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18, marginBottom: 4 }}>
                  {chips.map((c, i) => (
                    <span key={i} style={{
                      fontSize: 13, fontWeight: 700, letterSpacing: '0.02em',
                      color: 'var(--ella-clay-700)', background: 'var(--ella-cream-100)',
                      border: '1px solid var(--border-default)', borderRadius: 999, padding: '6px 14px',
                    }}>{c}</span>
                  ))}
                </div>
              )}

              <p style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--ella-clay-700)', maxWidth: '60ch', marginTop: 16 }}>
                {resultIntro()}
              </p>

              {note && (
                <div style={{
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  background: 'var(--ella-blush-50)', border: '1px solid var(--ella-blush-100)',
                  borderRadius: 14, padding: '16px 18px', margin: '20px 0 4px', maxWidth: '62ch',
                }}>
                  <span style={{ color: 'var(--ella-rose-deep)', flexShrink: 0, marginTop: 2 }}><IconHeart width="20" height="20" /></span>
                  <p style={{ fontSize: 15.5, lineHeight: 1.55, color: 'var(--ella-clay-700)', margin: 0 }}>{note}</p>
                </div>
              )}

              <div className="ella-pillars" style={{ marginTop: 32 }}>
                {recs.map((r, i) => (
                  <a key={i} className="ella-pillar-card" data-tone={r.tone} href="#" onClick={(e) => { e.preventDefault(); if (r.articleId && openArticle) openArticle(r.articleId); else { setRoute(r.route); window.scrollTo({ top: 0 }); } }}>
                    <div className="ella-pillar-icon">{r.icon}</div>
                    <h3>{r.title}</h3>
                    <p>{r.desc}</p>
                    <span className="ella-pillar-cta">{r.cta} <IconArrow width="16" height="16" /></span>
                  </a>
                ))}
              </div>

              <div style={{ marginTop: 32, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                <button type="button" className="ella-btn ella-btn-text" onClick={() => { setStep(0); setAnswers({}); }}>
                  {isEs ? 'Volver a hacer el cuestionario' : 'Retake the check-in'}
                </button>
                <button type="button" className="ella-btn ella-btn-text" onClick={() => setRoute('articles')}>
                  {isEs ? 'Ver todos los artículos' : 'Browse all articles'} <IconArrow width="16" height="16" />
                </button>
              </div>

              <p style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--ella-taupe-500)', marginTop: 28, maxWidth: '60ch' }}>
                {isEs
                  ? 'Esto es información general, no consejo médico ni un diagnóstico. Para tu caso, habla con tu médico.'
                  : 'This is general information, not medical advice or a diagnosis. For your specific situation, talk with your own doctor.'}
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ============ QUESTION ============
  const pct = Math.round((step / questions.length) * 100);
  return (
    <div data-screen-label="03 Quiz">
      <section className="ella-section">
        <div className="ella-container">
          <div className="ella-quiz">
            <div className="ella-quiz-progress">
              <span>{t('quiz_progress', { n: step + 1, total: questions.length })}</span>
              <span>{pct}%</span>
            </div>
            <div className="ella-quiz-bar">
              <div className="ella-quiz-bar-fill" style={{ width: `${pct}%` }} />
            </div>

            <h2 className="ella-quiz-q">{q.text}</h2>
            {q.help && (
              <p style={{ fontSize: 16, lineHeight: 1.5, color: 'var(--ella-taupe-500)', margin: '-4px 0 22px' }}>{q.help}</p>
            )}

            <div className="ella-quiz-opts">
              {q.opts.map((opt) => {
                const isSel = q.kind === 'multi' ? (selected || []).includes(opt.key) : selected === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    className={'ella-quiz-opt' + (isSel ? ' is-selected' : '')}
                    onClick={() => select(opt)}
                  >
                    <span className="ella-quiz-check" />
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="ella-quiz-nav">
              <button
                type="button"
                className="ella-btn ella-btn-text"
                onClick={() => (step === 0 ? setRoute('home') : setStep(step - 1))}
              >{'\u2190 '}{t('quiz_back')}</button>
              <button
                type="button"
                className="ella-btn ella-btn-primary"
                disabled={!canAdvance}
                style={!canAdvance ? { opacity: 0.45, cursor: 'not-allowed' } : null}
                onClick={() => canAdvance && setStep(step + 1)}
              >
                {step === questions.length - 1 ? t('quiz_finish') : t('quiz_next')}
                <IconArrow width="18" height="18" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

window.AwarenessQuiz = AwarenessQuiz;
