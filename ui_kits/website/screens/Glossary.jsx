// Glossary, Spanish–English menopause terms plus phrases to use with an
// English-speaking doctor. Searchable in either language.

const ELLA_GLOSSARY = [
  // group, es term, en term, es definition, en definition
  ['stages', 'Menopausia', 'Menopause', 'Cuando llevas 12 meses seguidos sin regla.', 'When you have gone 12 months in a row without a period.'],
  ['stages', 'Perimenopausia', 'Perimenopause', 'Los años antes de la menopausia, cuando las hormonas suben y bajan.', 'The years before menopause, when hormones rise and fall.'],
  ['stages', 'Posmenopausia', 'Postmenopause', 'Todo lo que viene después de la menopausia.', 'Everything after menopause.'],
  ['stages', 'Menopausia quirúrgica', 'Surgical menopause', 'Menopausia causada por una cirugía en la que se quitan los ovarios.', 'Menopause caused by surgery that removes the ovaries.'],
  ['stages', 'Menopausia prematura', 'Early menopause', 'Menopausia antes de los 45 años.', 'Menopause before age 45.'],

  ['symptoms', 'Bochornos', 'Hot flashes', 'Calor repentino en la cara, el cuello o el pecho, a veces con sudor.', 'Sudden heat in the face, neck, or chest, sometimes with sweating.'],
  ['symptoms', 'Sudores nocturnos', 'Night sweats', 'Bochornos mientras duermes que te despiertan sudando.', 'Hot flashes during sleep that wake you up sweaty.'],
  ['symptoms', 'Mente nublada', 'Brain fog', 'Olvidos y dificultad para concentrarte.', 'Forgetfulness and trouble concentrating.'],
  ['symptoms', 'Insomnio', 'Insomnia', 'Dificultad para dormirte o para seguir dormida.', 'Trouble falling asleep or staying asleep.'],
  ['symptoms', 'Palpitaciones', 'Heart palpitations', 'Sentir el corazón acelerado o latiendo fuerte.', 'Feeling your heart race or pound.'],
  ['symptoms', 'Resequedad vaginal', 'Vaginal dryness', 'Menos humedad vaginal, que puede causar molestia o dolor.', 'Less vaginal moisture, which can cause discomfort or pain.'],
  ['symptoms', 'Dolor en las relaciones', 'Painful sex', 'Dolor durante las relaciones sexuales. El término médico es dispareunia.', 'Pain during sex. The medical term is dyspareunia.'],
  ['symptoms', 'Deseo sexual bajo', 'Low libido', 'Menos ganas de tener relaciones.', 'Less interest in sex.'],
  ['symptoms', 'Regla irregular', 'Irregular periods', 'Reglas que llegan antes, después, más o menos abundantes.', 'Periods that come earlier, later, heavier, or lighter.'],
  ['symptoms', 'Sangrado después de la menopausia', 'Postmenopausal bleeding', 'Cualquier sangrado después de 12 meses sin regla. Siempre díselo a tu médico.', 'Any bleeding after 12 months without a period. Always tell your doctor.'],
  ['symptoms', 'Dolor de articulaciones', 'Joint pain', 'Dolor o rigidez en rodillas, manos, hombros u otras articulaciones.', 'Pain or stiffness in knees, hands, shoulders, or other joints.'],

  ['body', 'Estrógeno', 'Estrogen', 'La hormona principal que baja en la menopausia.', 'The main hormone that drops in menopause.'],
  ['body', 'Progesterona', 'Progesterone', 'Hormona que protege el útero cuando tomas estrógeno.', 'A hormone that protects the uterus when you take estrogen.'],
  ['body', 'Testosterona', 'Testosterone', 'Hormona que también tienen las mujeres; influye en el deseo y la energía.', 'A hormone women have too; it affects desire and energy.'],
  ['body', 'FSH (hormona foliculoestimulante)', 'FSH (follicle-stimulating hormone)', 'Hormona que a veces se mide, aunque en la perimenopausia cambia mucho de un día a otro.', 'A hormone sometimes tested, though in perimenopause it changes a lot from day to day.'],
  ['body', 'Ovarios', 'Ovaries', 'Los órganos que producen estrógeno y progesterona.', 'The organs that make estrogen and progesterone.'],
  ['body', 'Útero (matriz)', 'Uterus (womb)', 'El órgano donde se forma la regla.', 'The organ where your period comes from.'],
  ['body', 'Tiroides', 'Thyroid', 'Glándula del cuello. Sus problemas pueden parecerse a la menopausia.', 'A gland in the neck. Its problems can look like menopause.'],
  ['body', 'Inflamación', 'Inflammation', 'La reacción de defensa del cuerpo. Sube cuando baja el estrógeno.', 'The body’s defense reaction. It rises when estrogen drops.'],

  ['treatment', 'Terapia de reemplazo hormonal (TRH)', 'Hormone replacement therapy (HRT)', 'Tratamiento que repone el estrógeno, y a veces la progesterona.', 'Treatment that replaces estrogen, and sometimes progesterone.'],
  ['treatment', 'Terapia hormonal', 'Hormone therapy (HT / MHT)', 'Otra forma de decir TRH. Los médicos usan los dos nombres.', 'Another name for HRT. Doctors use both.'],
  ['treatment', 'Estrógeno vaginal', 'Vaginal estrogen', 'Crema, anillo o tableta que actúa solo en la zona vaginal.', 'A cream, ring, or tablet that works only in the vaginal area.'],
  ['treatment', 'Parche', 'Patch', 'Estrógeno que se pega en la piel.', 'Estrogen that sticks to the skin.'],
  ['treatment', 'DIU hormonal', 'Hormonal IUD', 'Dispositivo en el útero que libera progesterona.', 'A device in the uterus that releases progesterone.'],
  ['treatment', 'Fitoestrógenos', 'Phytoestrogens', 'Sustancias de plantas, como la soya y la linaza, parecidas al estrógeno.', 'Plant substances, like soy and flax, similar to estrogen.'],
  ['treatment', 'Anticoagulante', 'Blood thinner', 'Medicamento que hace la sangre más líquida, como la warfarina.', 'A medication that thins the blood, like warfarin.'],
  ['treatment', 'Efectos secundarios', 'Side effects', 'Reacciones no deseadas de un medicamento.', 'Unwanted reactions to a medication.'],
  ['treatment', 'Receta', 'Prescription', 'La orden del médico para un medicamento.', 'A doctor’s order for a medication.'],

  ['tests', 'Análisis de sangre', 'Blood test', 'Muestra de sangre para medir hormonas, vitaminas u otros valores.', 'A blood sample to check hormones, vitamins, or other levels.'],
  ['tests', 'Densitometría ósea', 'Bone density scan (DEXA)', 'Estudio que mide qué tan fuertes están tus huesos.', 'A scan that measures how strong your bones are.'],
  ['tests', 'Osteoporosis', 'Osteoporosis', 'Huesos débiles que se rompen con más facilidad.', 'Weak bones that break more easily.'],
  ['tests', 'Mamografía', 'Mammogram', 'Radiografía de los senos para detectar cáncer.', 'An X-ray of the breasts to check for cancer.'],
  ['tests', 'Papanicolaou', 'Pap smear', 'Prueba del cuello del útero para detectar cambios o cáncer.', 'A test of the cervix to find changes or cancer.'],
  ['tests', 'Presión arterial', 'Blood pressure', 'La fuerza de la sangre en las arterias.', 'The force of blood in your arteries.'],
  ['tests', 'Colesterol', 'Cholesterol', 'Grasa en la sangre. Alto, aumenta el riesgo del corazón.', 'Fat in the blood. High levels raise heart risk.'],
  ['tests', 'Triglicéridos', 'Triglycerides', 'Otro tipo de grasa en la sangre.', 'Another type of fat in the blood.'],

  ['care', 'Ginecólogo', 'OB-GYN', 'Médico especialista en la salud de la mujer.', 'A doctor who specializes in women’s health.'],
  ['care', 'Médico de cabecera', 'Primary care doctor', 'Tu médico general.', 'Your general doctor.'],
  ['care', 'Especialista certificado en menopausia', 'Certified menopause practitioner (MSCP)', 'Profesional con formación especial en menopausia.', 'A clinician with special training in menopause.'],
  ['care', 'Referencia (pase)', 'Referral', 'Cuando tu médico te manda con un especialista.', 'When your doctor sends you to a specialist.'],
  ['care', 'Intérprete', 'Interpreter', 'Persona que traduce en la cita. En muchas clínicas de EE. UU. lo puedes pedir sin costo.', 'A person who translates at your visit. Many U.S. clinics provide one free if you ask.'],
];

const ELLA_PHRASES = [
  ['Creo que estoy en la perimenopausia.', 'I think I’m in perimenopause.'],
  ['Mi regla ha cambiado.', 'My periods have changed.'],
  ['Tengo bochornos y sudores nocturnos.', 'I’m having hot flashes and night sweats.'],
  ['No estoy durmiendo bien.', 'I’m not sleeping well.'],
  ['Me gustaría hablar de la terapia hormonal.', 'I’d like to talk about hormone therapy.'],
  ['¿Me puede mandar con un especialista en menopausia?', 'Can you refer me to a menopause specialist?'],
  ['¿Qué riesgos tiene esto para mí?', 'What are the risks for me?'],
  ['¿Me lo puede explicar más despacio?', 'Could you explain that more slowly?'],
  ['Necesito un intérprete, por favor.', 'I need an interpreter, please.'],
];

window.ELLA_GLOSSARY = ELLA_GLOSSARY;

export function Glossary({ lang, setRoute }) {
  const isEs = lang === 'es';
  // Arriving from the header search pre-fills the same word.
  const [q, setQ] = React.useState(() => { const v = window.__ellaGlossaryQuery || ''; window.__ellaGlossaryQuery = ''; return v; });

  const groups = isEs ? [
    ['stages', 'Etapas'], ['symptoms', 'Síntomas'], ['body', 'Hormonas y cuerpo'],
    ['treatment', 'Tratamientos'], ['tests', 'Estudios y resultados'], ['care', 'En la cita'],
  ] : [
    ['stages', 'Stages'], ['symptoms', 'Symptoms'], ['body', 'Hormones & body'],
    ['treatment', 'Treatments'], ['tests', 'Tests & results'], ['care', 'At the appointment'],
  ];

  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const term = norm(q.trim());
  const match = (row) => !term || norm(row.slice(1).join(' ')).includes(term);
  const total = ELLA_GLOSSARY.filter(match).length;

  return (
    <div data-screen-label="10 Glossary">
      <section className="ella-section-tight">
        <div className="ella-container">
          <div style={{ maxWidth: 760 }}>
            <div className="ella-eyebrow">{isEs ? 'GLOSARIO' : 'GLOSSARY'}</div>
            <h1 className="ella-page-title">{isEs ? 'Las palabras que vas a escuchar en la cita.' : 'The words you’ll hear at the doctor.'}</h1>
            <p className="ella-gloss-lede">
              {isEs
                ? 'Si tu médico habla inglés, aquí tienes cada término en los dos idiomas, con una explicación sencilla.'
                : 'If your doctor speaks English, here is each term in both languages, with a plain explanation.'}
            </p>
            <input
              type="search"
              className="ella-gloss-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={isEs ? 'Busca una palabra en español o en inglés…' : 'Search a word in Spanish or English…'}
              aria-label={isEs ? 'Buscar en el glosario' : 'Search the glossary'}
            />
          </div>

          {total === 0 && (
            <p className="ella-gloss-empty">{isEs ? 'No encontré esa palabra todavía.' : 'That word isn’t in the glossary yet.'}</p>
          )}

          {groups.map(([key, label]) => {
            const rows = ELLA_GLOSSARY.filter((r) => r[0] === key && match(r));
            if (!rows.length) return null;
            return (
              <div key={key} className="ella-gloss-group">
                <h2 className="ella-section-title">{label}</h2>
                <dl className="ella-gloss-list">
                  {rows.map((r) => (
                    <div key={r[1]} className="ella-gloss-row">
                      <dt>
                        <span className="ella-gloss-es" lang="es">{r[1]}</span>
                        <span className="ella-gloss-en" lang="en">{r[2]}</span>
                      </dt>
                      <dd>{isEs ? r[3] : r[4]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            );
          })}

          {!term && (
            <div className="ella-gloss-group">
              <h2 className="ella-section-title">{isEs ? 'Frases útiles para la cita' : 'Useful phrases for your visit'}</h2>
              <ul className="ella-gloss-phrases">
                {ELLA_PHRASES.map(([es, en]) => (
                  <li key={en}>
                    <span lang="es">{es}</span>
                    <span lang="en">{en}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

window.Glossary = Glossary;
