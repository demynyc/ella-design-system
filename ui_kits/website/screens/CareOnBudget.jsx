// Care on a budget: how to get menopause care with little money or no insurance.

export function CareOnBudget({ lang, setRoute }) {
  const isEs = lang === 'es';

  const sections = isEs ? [
    {
      h: 'Centros de salud comunitarios',
      p: 'Atienden a todos, tengas o no seguro, y cobran según lo que ganas (tarifa variable). Muchos tienen personal que habla español.',
      links: [{ label: 'Busca un centro cerca de ti (HRSA)', href: 'https://findahealthcenter.hrsa.gov/?language=es' }],
    },
    {
      h: 'Medicamentos más baratos',
      p: 'Muchas recetas de menopausia vienen en versión genérica, que cuesta mucho menos. Antes de pagar, compara precios: pueden cambiar mucho de una farmacia a otra.',
      links: [
        { label: 'GoodRx (cupones de farmacia)', href: 'https://www.goodrx.com/' },
        { label: 'Mark Cuban Cost Plus Drug Company', href: 'https://costplusdrugs.com/' },
      ],
      ask: ['¿Hay una versión genérica?', '¿Me puede dar una receta para 90 días? Muchas veces sale más barato.'],
    },
    {
      h: 'Seguro médico de bajo costo',
      p: 'Según tus ingresos, puedes calificar para Medicaid o para un plan con ayuda del gobierno.',
      links: [
        { label: 'CuidadoDeSalud.gov', href: 'https://www.cuidadodesalud.gov/es/' },
        { label: 'Medicaid', href: 'https://www.medicaid.gov/' },
      ],
    },
    {
      h: 'Consultas por internet',
      p: 'Hay servicios de telemedicina para la menopausia con precio fijo, sin seguro. Antes de agendar, pregunta cuánto cuesta la consulta y cuánto cuestan las recetas.',
    },
    {
      h: 'Tu derecho a un intérprete',
      p: 'La mayoría de las clínicas y hospitales de EE. UU. que reciben fondos federales tienen que darte un intérprete gratis. Pídelo al hacer tu cita.',
      links: [{ label: 'Más información (HHS)', href: 'https://www.hhs.gov/civil-rights/for-individuals/special-topics/limited-english-proficiency/index.html' }],
    },
  ] : [
    {
      h: 'Community health centers',
      p: 'They see everyone, with or without insurance, and charge based on what you earn (sliding scale). Many have Spanish-speaking staff.',
      links: [{ label: 'Find a center near you (HRSA)', href: 'https://findahealthcenter.hrsa.gov/' }],
    },
    {
      h: 'Cheaper prescriptions',
      p: 'Many menopause prescriptions come in a generic version that costs much less. Before you pay, compare prices: they can vary a lot between pharmacies.',
      links: [
        { label: 'GoodRx (pharmacy coupons)', href: 'https://www.goodrx.com/' },
        { label: 'Mark Cuban Cost Plus Drug Company', href: 'https://costplusdrugs.com/' },
      ],
      ask: ['Is there a generic version?', 'Can you write it for 90 days? It’s often cheaper.'],
    },
    {
      h: 'Low-cost insurance',
      p: 'Depending on your income, you may qualify for Medicaid or a plan with government help.',
      links: [
        { label: 'HealthCare.gov', href: 'https://www.healthcare.gov/' },
        { label: 'Medicaid', href: 'https://www.medicaid.gov/' },
      ],
    },
    {
      h: 'Online visits',
      p: 'There are menopause telehealth services with flat self-pay prices, no insurance needed. Before booking, ask what the visit costs and what the prescriptions cost.',
    },
    {
      h: 'Your right to an interpreter',
      p: 'Most U.S. clinics and hospitals that receive federal funding must give you an interpreter for free. Ask for one when you book.',
      links: [{ label: 'Learn more (HHS)', href: 'https://www.hhs.gov/civil-rights/for-individuals/special-topics/limited-english-proficiency/index.html' }],
    },
  ];

  return (
    <div data-screen-label="13 Care on a budget">
      <section className="ella-section-tight">
        <div className="ella-container">
          <div style={{ maxWidth: 760 }}>
            <div className="ella-eyebrow">{isEs ? 'ATENCIÓN DE BAJO COSTO' : 'CARE ON A BUDGET'}</div>
            <h1 className="ella-page-title">{isEs ? 'Atención médica sin gastar de más.' : 'Getting care without overspending.'}</h1>
            <p className="ella-sym-lede">
              {isEs
                ? 'No tener seguro o tener poco dinero no debería impedirte recibir atención. Aquí tienes por dónde empezar.'
                : 'Not having insurance, or not having much money, shouldn’t keep you from care. Here’s where to start.'}
            </p>
          </div>
          <div className="ella-budget-list">
            {sections.map((s) => (
              <div key={s.h} className="ella-budget-item">
                <h2>{s.h}</h2>
                <p>{s.p}</p>
                {s.ask ? (
                  <div className="ella-budget-ask">
                    <span>{isEs ? 'PREGÚNTALE A TU MÉDICO' : 'ASK YOUR DOCTOR'}</span>
                    <ul>{s.ask.map((a) => <li key={a}>{a}</li>)}</ul>
                  </div>
                ) : null}
                {s.links ? (
                  <div className="ella-budget-links">
                    {s.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                        {l.label} <IconArrow width="13" height="13" style={{ transform: 'rotate(-45deg)' }} />
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <p className="ella-urgent-foot">
            {isEs
              ? 'Ella no gana nada por recomendar estos sitios. Los precios y requisitos cambian; confirma directamente con cada uno.'
              : 'Ella earns nothing from recommending these. Prices and requirements change; confirm directly with each one.'}
          </p>
        </div>
      </section>
    </div>
  );
}

window.CareOnBudget = CareOnBudget;
