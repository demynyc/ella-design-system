// Footer, modeled on the Ella Wellness site: a deep band with a centered
// booking call-to-action, four link columns, then the legal notes and
// copyright row. The call-to-action is skipped on the homepage, which already
// ends with the consultation section.

export function Footer({ lang, setLang, route, setRoute }) {
  const isEs = lang === 'es';
  const L = window.ELLA_LINKS || {};
  const email = L.email || 'info@ellabienestar.com';
  const go = (r) => (e) => { e.preventDefault(); setRoute(r); window.scrollTo({ top: 0 }); };

  const explore = [
    { label: isEs ? 'Inicio' : 'Home', route: 'home' },
    { label: isEs ? 'Síntomas' : 'Symptoms', route: 'symptoms' },
    { label: isEs ? 'Artículos' : 'Articles', route: 'articles' },
    { label: isEs ? 'Suplementos' : 'Supplements', route: 'supplements' },
    { label: isEs ? 'Recursos' : 'Resources', route: 'resources' },
  ];
  const help = [
    { label: isEs ? 'Cuestionario personal' : 'Personal check-in', route: 'quiz' },
    { label: isEs ? 'Glosario' : 'Glossary', route: 'glossary' },
    { label: isEs ? 'Atención de bajo costo' : 'Care on a budget', route: 'budget' },
    { label: isEs ? 'Cuándo ir al médico' : 'When to see a doctor', route: 'urgent' },
  ];

  return (
    <footer className={'ella-ft' + (route === 'home' ? ' is-home' : '')}>
      {route !== 'home' ? (
        <div className="ella-ft-cta">
          <h2>{isEs ? 'Haz una cita' : 'Book a consultation'}</h2>
          <p>{isEs ? '30 minutos, en español o en inglés.' : '30 minutes, in English or Spanish.'}</p>
          <a className="ella-ft-cta-btn" href={L.booking || '#'} target="_blank" rel="noopener noreferrer">
            {isEs ? 'Hacer una cita' : 'Book a consultation'}
          </a>
        </div>
      ) : (
        <div className="ella-ft-sep" aria-hidden="true">
          <span className="ella-ft-sep-badge"><LogoMarkSvg size={26} color="#d9b3c4" center="#f6ece9" /></span>
        </div>
      )}

      <div className="ella-ft-inner">
        <div className="ella-ft-cols">
          <div className="ella-ft-brand">
            <div className="ella-ft-logo">
              <LogoEllaSvg width={150} color="#f6ece9" accent="#d9b3c4" />
              <span className="ella-ft-logo-by">Jessica Zavala</span>
            </div>
            <p>{isEs ? 'Información clara sobre la menopausia, en español y en inglés.' : 'Clear menopause information, in English and Spanish.'}</p>
            {setLang ? (
              <div className="ella-ft-lang">
                <button type="button" className={lang === 'en' ? 'is-active' : ''} onClick={() => setLang('en')}>English</button>
                <span aria-hidden="true">|</span>
                <button type="button" className={lang === 'es' ? 'is-active' : ''} onClick={() => setLang('es')}>Español</button>
              </div>
            ) : null}
          </div>

          <nav className="ella-ft-col" aria-label={isEs ? 'Explora' : 'Explore'}>
            <h3>{isEs ? 'Explora' : 'Explore'}</h3>
            <ul>{explore.map((l) => <li key={l.route}><a href={(window.ellaHref ? window.ellaHref(lang, l.route) : '#')} onClick={go(l.route)}>{l.label}</a></li>)}</ul>
          </nav>

          <nav className="ella-ft-col" aria-label={isEs ? 'Ayuda' : 'Help'}>
            <h3>{isEs ? 'Ayuda' : 'Help'}</h3>
            <ul>{help.map((l) => <li key={l.route}><a href={(window.ellaHref ? window.ellaHref(lang, l.route) : '#')} onClick={go(l.route)}>{l.label}</a></li>)}</ul>
          </nav>

          <div className="ella-ft-col">
            <h3>{isEs ? 'Contáctanos' : 'Reach us'}</h3>
            <ul>
              <li><a href={'mailto:' + email}>{email}</a></li>
              <li><a href={L.booking || '#'} target="_blank" rel="noopener noreferrer">{isEs ? 'Hacer una cita' : 'Book a consultation'}</a></li>
            </ul>
          </div>
        </div>

        <div className="ella-ft-rule" />

        <div className="ella-ft-legal">
          <p>{isEs
            ? 'Este sitio comparte información general sobre la menopausia. No sustituye la consulta, el diagnóstico ni el tratamiento de un profesional de la salud.'
            : 'This website shares general information about menopause. It does not replace consultation, diagnosis, or treatment by a healthcare professional.'}</p>
          <p>{isEs
            ? 'Si tienes una emergencia médica, llama al 911 o ve a la sala de emergencias más cercana.'
            : 'If you have a medical emergency, call 911 or go to the nearest emergency room.'}</p>
        </div>

        <div className="ella-ft-bottom">
          <span>© {new Date().getFullYear()} Ella Bienestar.{isEs ? ' Todos los derechos reservados.' : ' All rights reserved.'}</span>
          <a href={(window.ellaHref ? window.ellaHref(lang, 'privacy') : '#')} onClick={go('privacy')}>{isEs ? 'Privacidad' : 'Privacy policy'}</a>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
