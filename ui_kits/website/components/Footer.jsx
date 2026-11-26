// Footer: link columns, then one
// bottom rule with brand, contact, copyright, and the medical disclaimer.

export function Footer({ lang, setRoute }) {
  const isEs = lang === 'es';

  const cols = [
    {
      title: isEs ? 'Explora' : 'Explore',
      links: [
        { label: isEs ? 'Artículos' : 'Articles', onClick: () => setRoute('articles') },
        { label: isEs ? 'Suplementos' : 'Supplements', onClick: () => setRoute('supplements') },
        { label: isEs ? 'Recursos' : 'Resources', onClick: () => setRoute('resources') },
        { label: isEs ? 'Glosario' : 'Glossary', onClick: () => setRoute('glossary') },
        { label: isEs ? 'Atención de bajo costo' : 'Care on a budget', onClick: () => setRoute('budget') },
        { label: isEs ? 'Cuándo ir al médico' : 'When to see a doctor', onClick: () => setRoute('urgent') },
      ],
    },
    {
      title: 'Ella',
      links: [
        { label: isEs ? 'Haz una cita' : 'Book a consultation', href: (window.ELLA_LINKS && window.ELLA_LINKS.booking) || '#' },
        ...(window.ELLA_LINKS && window.ELLA_LINKS.instagram ? [{ label: 'Instagram', href: window.ELLA_LINKS.instagram }] : []),
        ...(window.ELLA_LINKS && window.ELLA_LINKS.whatsappChannel ? [{ label: isEs ? 'Canal de WhatsApp' : 'WhatsApp Channel', href: window.ELLA_LINKS.whatsappChannel }] : []),
      ],
    },
  ];

  return (
    <footer className="ella-footer">
      <div className="ella-footer-inner">

        <div className="ella-footer-top">
          <div className="ella-footer-cols">
            {cols.map((c) => (
              <div key={c.title} className="ella-footer-col">
                <h5>{c.title}</h5>
                <ul>
                  {c.links.map((l, i) => (
                    <li key={i}>
                      {l.href
                        ? <a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
                        : <a href="#" onClick={(e) => { e.preventDefault(); l.onClick(); }}>{l.label}</a>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="ella-footer-divider" />

        <div className="ella-footer-bottom">
          <div className="ella-footer-bottom-brand">
            <LogoEllaSvg width={92} />
            <span className="ella-footer-copy">
              © {new Date().getFullYear()} · {isEs ? 'Por Jessica Zavala' : 'By Jessica Zavala'}
            </span>
            <a href={'mailto:' + ((window.ELLA_LINKS && window.ELLA_LINKS.email) || 'info@ellabienestar.com')}>{(window.ELLA_LINKS && window.ELLA_LINKS.email) || 'info@ellabienestar.com'}</a>
          </div>
          <a href="#" className="ella-footer-privacy" onClick={(e) => { e.preventDefault(); setRoute('privacy'); }}>{isEs ? 'Privacidad' : 'Privacy'}</a>
          <div className="ella-footer-disclaim">
            {isEs
              ? 'Solo informativo. No sustituye la consulta con tu médico.'
              : 'Informational only, does not replace medical advice.'}
          </div>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
