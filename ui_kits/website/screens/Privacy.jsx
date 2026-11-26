// Privacy, short plain-language note. Reflects how the site actually works today:
// no accounts, no tracking, check-in answers stay in the browser.

export function Privacy({ lang, setRoute }) {
  const isEs = lang === 'es';
  const email = (window.ELLA_LINKS && window.ELLA_LINKS.email) || 'info@ellabienestar.com';

  const sections = isEs ? [
    { h: 'Lo que guardo', p: 'Solo lo que tú me mandas: tu nombre y mensaje si me escribes o haces una cita. Lo uso únicamente para contestarte.' },
    { h: 'Lo que no guardo', p: 'Tus respuestas del cuestionario no se guardan ni se envían a ningún lado. Se quedan en tu navegador y desaparecen cuando cierras la página. El sitio no tiene cuentas ni publicidad.' },
    { h: 'No vendo tus datos', p: 'Nunca vendo, rento ni comparto tu información con nadie para fines de publicidad.' },
    { h: 'Sitios externos', p: 'Algunos enlaces llevan a otros sitios, como la página de citas o fuentes médicas. Cada uno tiene su propia política de privacidad.' },
    { h: 'Borrar tus datos', p: 'Si quieres que borre tu información, escríbeme y lo hago.' },
  ] : [
    { h: 'What I keep', p: 'Only what you send me: your name and message if you write to me or book a call. I use it only to reply to you.' },
    { h: 'What I don’t keep', p: 'Your check-in answers aren’t saved or sent anywhere. They stay in your browser and disappear when you close the page. The site has no accounts and no ads.' },
    { h: 'I don’t sell your data', p: 'I never sell, rent, or share your information with anyone for advertising.' },
    { h: 'Other websites', p: 'Some links go to other sites, like the booking page or medical sources. Each one has its own privacy policy.' },
    { h: 'Deleting your data', p: 'If you want your information deleted, email me and I’ll take care of it.' },
  ];

  return (
    <div data-screen-label="09 Privacy">
      <section className="ella-section-tight">
        <div className="ella-container">
          <div className="ella-privacy">
            <div className="ella-eyebrow">{isEs ? 'PRIVACIDAD' : 'PRIVACY'}</div>
            <h1 className="ella-page-title">{isEs ? 'Tu información, en pocas palabras.' : 'Your information, in plain terms.'}</h1>
            <div className="ella-privacy-list">
              {sections.map((s) => (
                <div key={s.h} className="ella-privacy-item">
                  <h2>{s.h}</h2>
                  <p>{s.p}</p>
                </div>
              ))}
            </div>
            <p className="ella-privacy-contact">
              {isEs ? 'Dudas: ' : 'Questions: '}
              <a href={'mailto:' + email}>{email}</a>
            </p>
            <p className="ella-privacy-updated">{isEs ? 'Actualizado en octubre de 2026' : 'Updated October 2026'}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

window.Privacy = Privacy;
