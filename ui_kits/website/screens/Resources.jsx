// Resources, curated external links organized by topic. Mirrors the
// "Click here for..." slots in Jessica's draft. Every link is an outside
// authority, Ella points, it doesn't republish.

export function Resources({ lang, setRoute }) {
  const t = useT(lang);
  const isEs = lang === 'es';

  const groups = isEs ? [
    {
      tone: 'rose',
      title: 'Empieza aquí',
      note: 'Lo básico, de fuentes que puedes mencionar en tu cita.',
      links: [
        { label: 'The Menopause Society', desc: 'La principal autoridad médica en menopausia', href: 'https://www.menopause.org/' },
        { label: 'Oficina para la Salud de la Mujer', desc: 'Guía del gobierno de EE. UU., clara y fácil de entender', href: 'https://www.womenshealth.gov/menopause' },
        { label: 'ACOG', desc: 'Colegio Estadounidense de Obstetras y Ginecólogos', href: 'https://www.acog.org/womens-health' },
      ],
    },
    {
      tone: 'sage',
      title: 'Huesos y suplementos',
      note: 'Hojas informativas basadas en evidencia, no publicidad.',
      links: [
        { label: 'NIH: suplementos alimenticios', desc: 'Calcio, vitamina D, K2, omega-3, magnesio', href: 'https://ods.od.nih.gov/factsheets/list-all/' },
        { label: 'Bone Health & Osteoporosis Foundation', desc: 'Densidad de los huesos y cómo prevenir fracturas', href: 'https://www.bonehealthandosteoporosis.org/' },
        { label: 'NIH: Calcio', desc: 'Cuánto necesitas y dónde encontrarlo', href: 'https://ods.od.nih.gov/factsheets/Calcium-Consumer/' },
      ],
    },
    {
      tone: 'rose',
      title: 'Corazón y ejercicio',
      note: 'Los 150 minutos a la semana, explicados.',
      links: [
        { label: 'American Heart Association', desc: 'Riesgo cardiovascular en la menopausia', href: 'https://www.heart.org/en/health-topics/consumer-healthcare/what-is-cardiovascular-disease/menopause-and-heart-disease' },
        { label: 'Guía de actividad física de EE. UU.', desc: 'La recomendación oficial de ejercicio', href: 'https://health.gov/our-work/nutrition-physical-activity/physical-activity-guidelines' },
        { label: 'Dieta mediterránea', desc: 'La forma de comer con más respaldo científico', href: 'https://www.nhlbi.nih.gov/education/dash-eating-plan' },
      ],
    },
    {
      tone: 'plum',
      title: 'Terapia hormonal (TRH)',
      note: 'Fuentes confiables para la conversación más importante.',
      links: [
        { label: 'The Menopause Society: TRH', desc: 'Postura oficial sobre la terapia hormonal', href: 'https://www.menopause.org/for-women' },
        { label: 'NIA: Terapia hormonal', desc: 'Instituto Nacional del Envejecimiento', href: 'https://www.nia.nih.gov/health/menopause' },
        { label: 'Buscar un especialista certificado', desc: 'Directorio de especialistas certificados en menopausia', href: 'https://www.menopause.org/for-women/find-a-menopause-practitioner' },
      ],
    },
    {
      tone: 'sage',
      title: 'En español',
      note: 'Recursos confiables en nuestro idioma. Por eso existe Ella.',
      links: [
        { label: 'MedlinePlus en español', desc: 'Biblioteca Nacional de Medicina de EE. UU.', href: 'https://medlineplus.gov/spanish/menopause.html' },
        { label: 'Salud de la mujer', desc: 'La versión en español de womenshealth.gov', href: 'https://espanol.womenshealth.gov/menopause' },
        { label: 'CDC en español', desc: 'Salud preventiva y tamizajes', href: 'https://www.cdc.gov/spanish/' },
      ],
    },
    {
      tone: 'plum',
      title: 'Salud mental',
      note: 'Si esta etapa se está volviendo demasiado pesada, pide ayuda.',
      links: [
        { label: 'Línea 988 de Prevención del Suicidio y Crisis', desc: 'Disponible 24/7, con atención en español al marcar 988', href: 'https://988lifeline.org/es/' },
        { label: 'NIMH', desc: 'Instituto Nacional de Salud Mental', href: 'https://www.nimh.nih.gov/health/topics/women-and-mental-health' },
        { label: 'Encontrar terapeuta', desc: 'Directorio con filtros por idioma y seguro médico', href: 'https://www.psychologytoday.com/us/therapists' },
      ],
    },
  ] : [
    {
      tone: 'rose',
      title: 'Start here',
      note: 'The basics, from sources you can cite in an appointment.',
      links: [
        { label: 'The Menopause Society', desc: 'The leading clinical authority on menopause', href: 'https://www.menopause.org/' },
        { label: 'Office on Women\u2019s Health', desc: 'U.S. government guidance, clear and jargon-free', href: 'https://www.womenshealth.gov/menopause' },
        { label: 'ACOG', desc: 'American College of Obstetricians and Gynecologists', href: 'https://www.acog.org/womens-health' },
      ],
    },
    {
      tone: 'sage',
      title: 'Bones and supplements',
      note: 'Evidence-based fact sheets, not marketing.',
      links: [
        { label: 'NIH: Dietary Supplements', desc: 'Calcium, vitamin D, K2, omega-3, magnesium', href: 'https://ods.od.nih.gov/factsheets/list-all/' },
        { label: 'Bone Health & Osteoporosis Foundation', desc: 'Bone density, fracture prevention', href: 'https://www.bonehealthandosteoporosis.org/' },
        { label: 'NIH: Calcium', desc: 'How much you need and where to get it', href: 'https://ods.od.nih.gov/factsheets/Calcium-Consumer/' },
      ],
    },
    {
      tone: 'rose',
      title: 'Heart and exercise',
      note: 'The 150 minutes a week, explained.',
      links: [
        { label: 'American Heart Association', desc: 'Cardiovascular risk through menopause', href: 'https://www.heart.org/en/health-topics/consumer-healthcare/what-is-cardiovascular-disease/menopause-and-heart-disease' },
        { label: 'U.S. Physical Activity Guidelines', desc: 'Where the official exercise recommendation comes from', href: 'https://health.gov/our-work/nutrition-physical-activity/physical-activity-guidelines' },
        { label: 'Heart-healthy eating', desc: 'The best-supported dietary pattern', href: 'https://www.nhlbi.nih.gov/education/dash-eating-plan' },
      ],
    },
    {
      tone: 'plum',
      title: 'Hormone therapy (HRT)',
      note: 'Trusted sources for the most important conversation.',
      links: [
        { label: 'The Menopause Society: HRT', desc: 'Official position on hormone therapy', href: 'https://www.menopause.org/for-women' },
        { label: 'NIA: Hormone therapy', desc: 'National Institute on Aging', href: 'https://www.nia.nih.gov/health/menopause' },
        { label: 'Find a certified practitioner', desc: 'Directory of menopause-certified providers', href: 'https://www.menopause.org/for-women/find-a-menopause-practitioner' },
      ],
    },
    {
      tone: 'sage',
      title: 'En español',
      note: 'Trusted resources in Spanish, the reason Ella exists.',
      links: [
        { label: 'MedlinePlus en español', desc: 'U.S. National Library of Medicine', href: 'https://medlineplus.gov/spanish/menopause.html' },
        { label: 'Salud de la mujer', desc: 'Spanish-language womenshealth.gov', href: 'https://espanol.womenshealth.gov/menopause' },
        { label: 'CDC en español', desc: 'Preventive health and screenings', href: 'https://www.cdc.gov/spanish/' },
      ],
    },
    {
      tone: 'plum',
      title: 'Mental health',
      note: 'If this stage feels heavier than hard, please reach out.',
      links: [
        { label: '988 Suicide & Crisis Lifeline', desc: 'Available 24/7, Spanish available', href: 'https://988lifeline.org/' },
        { label: 'NIMH', desc: 'National Institute of Mental Health', href: 'https://www.nimh.nih.gov/health/topics/women-and-mental-health' },
        { label: 'Find a therapist', desc: 'Directory filterable by language and insurance', href: 'https://www.psychologytoday.com/us/therapists' },
      ],
    },
  ];

  return (
    <div data-screen-label="05 Resources">
      <section className="ella-section-tight">
        <div className="ella-container">
          <div style={{ maxWidth: 780 }}>
            <div className="ella-eyebrow">{isEs ? 'RECURSOS' : 'RESOURCES'}</div>
            <h1 className="ella-h2-italic ella-page-title" style={{ marginTop: 12 }}>
              {isEs ? 'Dónde leer más.' : 'Where to read further.'}
            </h1>
          </div>
          <a href="#" className="ella-gloss-callout" onClick={(e) => { e.preventDefault(); setRoute('glossary'); window.scrollTo({ top: 0 }); }}>
            <span>
              <strong>{isEs ? 'Glosario español–inglés' : 'Spanish–English glossary'}</strong>
              {isEs ? 'Los términos que vas a escuchar en la cita, en los dos idiomas.' : 'The terms you’ll hear at the doctor, in both languages.'}
            </span>
            <IconArrow width="16" height="16" />
          </a>
          <div className="ella-resource-grid" style={{ marginTop: 30 }}>
            {groups.map((g) => (
              <div key={g.title} className="ella-resource-col" data-tone={g.tone}>
                <h2 className="ella-resource-title">{g.title}</h2>
                <p className="ella-resource-note">{g.note}</p>
                <ul className="ella-resource-list">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer">
                        <span className="ella-resource-label">
                          {l.label}
                          <IconArrow width="14" height="14" style={{ transform: 'rotate(-45deg)' }} />
                        </span>
                        <span className="ella-resource-desc">{l.desc}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 44, padding: '22px 26px', background: 'var(--ella-cream-100)', borderRadius: 16, fontSize: 14.5, color: 'var(--ella-clay-700)', fontStyle: 'italic', lineHeight: 1.6, maxWidth: 760 }}>
            {isEs
              ? 'Ella no controla el contenido de estos sitios y no gana nada por recomendarlos. Comparto información, no consejo médico. Habla con tu médico sobre tu caso.'
              : 'Ella doesn\u2019t control the content on these sites and earns nothing from linking them. I share information, not personalized medical advice. Always talk to your own doctor about your situation.'}
          </div>

          <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button type="button" className="ella-btn ella-btn-text" onClick={() => setRoute('articles')}>
              {isEs ? 'Ver los artículos de Ella →' : 'Browse Ella\u2019s library →'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

window.Resources = Resources;
