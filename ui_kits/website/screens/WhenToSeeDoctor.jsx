// When to see a doctor right away. Short, scannable, both languages.

export function WhenToSeeDoctor({ lang, setRoute }) {
  const isEs = lang === 'es';

  const now = isEs ? [
    'Dolor u opresión en el pecho, falta de aire, o dolor que se pasa al brazo, la espalda o la mandíbula.',
    'Debilidad repentina en un lado del cuerpo, la cara caída, o no poder hablar bien.',
    'Dolor de cabeza muy fuerte y repentino, el peor de tu vida.',
    'Sangrado tan fuerte que empapas una toalla femenina cada hora por más de dos horas, o te sientes mareada o débil.',
  ] : [
    'Chest pain or pressure, shortness of breath, or pain spreading to your arm, back, or jaw.',
    'Sudden weakness on one side of your body, a drooping face, or trouble speaking.',
    'A sudden, severe headache, the worst of your life.',
    'Bleeding so heavy you soak a pad every hour for more than two hours, or you feel dizzy or faint.',
  ];

  const soon = isEs ? [
    'Cualquier sangrado después de llevar 12 meses sin regla. Casi siempre no es grave, pero siempre hay que revisarlo.',
    'Dolor, hinchazón o calor en una pierna, sobre todo si tomas terapia hormonal.',
    'Una bolita nueva en el seno, o cambios en la piel o el pezón.',
    'Palpitaciones con mareo o desmayo.',
    'Tristeza o falta de ganas de todo por más de dos semanas.',
  ] : [
    'Any bleeding after 12 months without a period. It’s usually not serious, but it always needs to be checked.',
    'Pain, swelling, or warmth in one leg, especially if you take hormone therapy.',
    'A new breast lump, or changes in the skin or nipple.',
    'Heart palpitations with dizziness or fainting.',
    'Feeling down or losing interest in things for more than two weeks.',
  ];

  return (
    <div data-screen-label="12 When to see a doctor">
      <section className="ella-section-tight">
        <div className="ella-container">
          <div style={{ maxWidth: 760 }}>
            <div className="ella-eyebrow">{isEs ? 'CUÁNDO IR AL MÉDICO' : 'WHEN TO SEE A DOCTOR'}</div>
            <h1 className="ella-page-title">{isEs ? 'Estos síntomas no pueden esperar.' : 'These symptoms can’t wait.'}</h1>
            <p className="ella-sym-lede">
              {isEs
                ? 'La mayoría de los cambios de la menopausia no son una emergencia. Estos sí necesitan atención.'
                : 'Most menopause changes aren’t an emergency. These need attention.'}
            </p>
          </div>

          <div className="ella-urgent-box is-now">
            <h2>{isEs ? 'Llama al 911 o ve a urgencias' : 'Call 911 or go to the ER'}</h2>
            <ul>{now.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>

          <div className="ella-urgent-box is-crisis">
            <h2>{isEs ? 'Si piensas en hacerte daño' : 'If you’re thinking of hurting yourself'}</h2>
            <p>
              {isEs
                ? 'Llama o manda mensaje al 988, a cualquier hora. Hay atención en español. No estás sola.'
                : 'Call or text 988, any time of day. Help is available in Spanish. You are not alone.'}
            </p>
            <a className="ella-btn ella-btn-primary" href="tel:988">{isEs ? 'Llamar al 988' : 'Call 988'}</a>
          </div>

          <div className="ella-urgent-box is-soon">
            <h2>{isEs ? 'Haz una cita pronto (en días, no semanas)' : 'Make an appointment soon (days, not weeks)'}</h2>
            <ul>{soon.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>

          <p className="ella-urgent-foot">
            {isEs ? '¿No tienes seguro o médico? ' : 'No insurance or doctor? '}
            <a href="#" onClick={(e) => { e.preventDefault(); setRoute('budget'); window.scrollTo({ top: 0 }); }}>
              {isEs ? 'Así puedes conseguir atención de bajo costo →' : 'Here’s how to find low-cost care →'}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

window.WhenToSeeDoctor = WhenToSeeDoctor;
