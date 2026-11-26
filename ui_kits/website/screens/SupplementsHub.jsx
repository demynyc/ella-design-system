// Supplements hub, list of supplements Ella discusses. Click any card to
// expand the full "why", dosing notes, and the research backing it up.

// The list lives outside the component so other pages can count it.
function buildSupplementItems(isEs) {
  return [
    {
      name: 'Creatine',
      food: isEs ? 'Carne roja, arenque, salmón. Para sacar 3 g solo de la comida necesitarías casi medio kilo de carne al día, por eso la mayoría toma suplemento.' : 'Red meat, herring, salmon. Getting 3 g from food alone means roughly a pound of beef a day, which is why most women supplement.',
      form: isEs ? 'Monohidrato de creatina. Es la más barata y la que se usó en casi todos los estudios. Las mezclas y la "HCL" cuestan más y no tienen mejor evidencia.' : 'Creatine monohydrate. It is the cheapest form and the one nearly every study used. Blends and "HCL" versions cost more without better evidence.',
      caution: isEs ? 'Si tienes alguna enfermedad de los riñones, pregunta primero. Al principio puedes subir medio kilo: es agua dentro del músculo, no grasa.' : 'Ask first if you have kidney disease. Expect a pound or two of water weight early. That is water inside the muscle, not fat.',
      group: 'muscle',
      tag: isEs ? 'M\u00daSCULO \u00b7 FUERZA' : 'MUSCLE \u00b7 STRENGTH',
      desc: isEs ? 'Ayuda a mantener la masa muscular y la fuerza, junto con las pesas.' : 'Supports muscle mass and strength, alongside strength training.',
      tone: 'rose',
      why: isEs
        ? ['Después de la menopausia se pierde músculo más rápido. La creatina, junto con las pesas, ayuda a mantener el músculo y la fuerza.',
           'Estudios recientes sugieren que también ayuda con la energía y la memoria en mujeres de mediana edad.']
        : ['Muscle loss speeds up after menopause. Creatine, combined with strength training, helps maintain muscle and strength.',
           'Newer research suggests added benefits for energy and cognitive function in midlife women.'],
      dose: isEs ? '~3–5 g al día de monohidrato de creatina.' : '~3\u20135 g a day of creatine monohydrate.',
      research: isEs ? 'Resumen con evidencia de los Institutos Nacionales de Salud (NIH).' : 'Evidence summary from the U.S. National Institutes of Health (NIH).',
      source: { label: 'NIH Office of Dietary Supplements', href: 'https://ods.od.nih.gov/factsheets/' },
    },
    {
      name: 'Omega-3',
      food: isEs ? 'Salmón, sardinas, macarela, anchoas. Con dos o tres porciones a la semana, la mayoría no necesita cápsulas.' : 'Salmon, sardines, mackerel, anchovies. Two or three servings a week covers most people without a capsule.',
      form: isEs ? 'Lee la parte de atrás, no la de enfrente. "Aceite de pescado 1000 mg" es lo que pesa la cápsula; busca cuánto EPA + DHA trae y que tenga pruebas independientes de metales pesados.' : 'Read the back, not the front. "Fish oil 1000 mg" is the capsule weight; you want the EPA + DHA numbers. Look for third-party purity testing for heavy metals.',
      caution: isEs ? 'En dosis altas puede hacer la sangre más líquida. Avísale a tu médico si tomas anticoagulantes o te van a operar.' : 'High doses have a mild blood-thinning effect. Tell your doctor if you take blood thinners or have surgery coming up.',
      group: 'inflam',
      tag: isEs ? 'CORAZ\u00d3N \u00b7 CEREBRO' : 'HEART \u00b7 BRAIN',
      desc: isEs ? 'Antiinflamatorio. Ayuda al corazón, al cerebro y al estado de ánimo.' : 'Anti-inflammatory. Supports heart, brain, and mood.',
      tone: 'sage',
      why: isEs
        ? ['El estrógeno protege el corazón; cuando baja, sube el riesgo cardiovascular. Los omega-3 (EPA/DHA) ayudan a controlar los triglicéridos y la inflamación.',
           'El DHA es parte de la estructura del cerebro y puede ayudar con la memoria y el estado de ánimo en esta etapa.',
           'También pueden aliviar la rigidez en las articulaciones que muchas mujeres notan en la perimenopausia.']
        : ['Estrogen protects the heart, as it drops, cardiovascular risk rises. Omega-3s (EPA/DHA) help keep triglycerides and inflammation in check.',
           'DHA is a structural building block of the brain and may support memory and mood through the transition.',
           'They can also ease the joint stiffness many women notice in perimenopause.'],
      dose: isEs ? 'Busca ~1–2 g de EPA + DHA en total al día, con comida.' : 'Aim for ~1\u20132 g combined EPA + DHA per day, with food.',
      research: isEs
        ? 'Resumen con evidencia de los Institutos Nacionales de Salud (NIH).'
        : 'Evidence summary from the U.S. National Institutes of Health (NIH).',
      source: { label: 'NIH Office of Dietary Supplements', href: 'https://ods.od.nih.gov/factsheets/Omega3FattyAcids-Consumer/' },
    },
    {
      name: 'Vitamin D3',
      food: isEs ? 'Pescado graso, yema de huevo, leche fortificada. Con la comida casi nunca alcanza: la fuente principal es el sol, y en invierno baja.' : 'Fatty fish, egg yolks, fortified milk. Food rarely gets you there on its own. Sunlight is the main source, and it drops off in winter.',
      form: isEs ? 'D3 (colecalciferol), no D2. Tómala con una comida que tenga grasa, junto con K2.' : 'D3 (cholecalciferol), not D2. Take it with a meal that contains fat, and pair it with K2.',
      caution: isEs ? 'Se guarda en la grasa del cuerpo y se acumula. Es la que conviene medir antes y después, en vez de adivinar.' : 'Fat-soluble, so it builds up in the body. This is the one to test before and after rather than guess at.',
      group: 'muscle',
      tag: isEs ? 'HUESOS \u00b7 INMUNIDAD' : 'BONES \u00b7 IMMUNITY',
      desc: isEs ? 'A la mayoría de las mujeres de 45+ les falta. Pídele a tu médico que te la mida.' : 'Most women 45+ are deficient. Ask your doctor to test your levels first.',
      tone: 'sage',
      why: isEs
        ? ['Después de la menopausia se pierde hueso más rápido. La vitamina D es necesaria para absorber el calcio y proteger los huesos.',
           'Tenerla baja se relaciona con cansancio, dolor muscular y desánimo, síntomas que se confunden fácilmente con la menopausia.',
           'Es muy común que falte en mujeres mayores de 45, sobre todo donde hay poco sol.']
        : ['Bone loss speeds up after menopause. Vitamin D is required to absorb calcium and protect your bones.',
           'Low levels are linked to fatigue, muscle aches, and low mood, symptoms easy to mistake for menopause itself.',
           'Deficiency is very common in women over 45, especially in low-sunlight climates.'],
      dose: isEs ? 'Primero hazte un análisis de sangre. Muchos médicos recomiendan 1000–2000 UI al día según el resultado.' : 'Get a blood test first. Many providers suggest 1000\u20132000 IU/day depending on your result.',
      research: isEs ? 'Hoja informativa basada en evidencia del NIH.' : 'Evidence-based fact sheet from the NIH.',
      source: { label: 'NIH Office of Dietary Supplements', href: 'https://ods.od.nih.gov/factsheets/VitaminD-Consumer/' },
    },
    {
      name: 'Vitamin K2',
      food: isEs ? 'Natto, quesos añejos, yema de huevo. Las verduras de hoja verde tienen K1, que es parecida pero no es lo mismo.' : 'Natto, aged cheeses, egg yolks. Dark leafy greens give you K1, which is related but not the same thing.',
      form: isEs ? 'La MK-7 dura activa mucho más tiempo que la MK-4. Muchas veces ya viene en un buen suplemento de D3, así que revisa antes de comprar las dos.' : 'MK-7 stays active in the body far longer than MK-4. It is often already included in a good D3 supplement, so check before buying both.',
      caution: isEs ? 'Si tomas warfarina, no empieces la K2 sin hablar con tu médico. La vitamina K cambia directamente cómo funciona ese medicamento.' : 'If you take warfarin, do not add K2 without talking to your doctor. Vitamin K directly affects how that medication works.',
      group: 'muscle',
      tag: isEs ? 'HUESOS' : 'BONES',
      desc: isEs ? 'Trabaja junto con la vitamina D para mandar el calcio a donde debe ir.' : 'Pairs with Vit D to get calcium where it belongs.',
      tone: 'plum',
      why: isEs
        ? ['La vitamina K ayuda a mandar el calcio a los huesos y a mantenerlo fuera de las arterias.',
           'Funciona junto con la vitamina D, así que tiene más sentido tomarlas juntas.']
        : ['Vitamin K helps direct calcium into your bones and keep it out of your arteries.',
           'It works hand-in-hand with vitamin D, taking them together makes more sense than either alone.'],
      dose: isEs ? 'Muchas veces viene combinada con la vitamina D en un solo suplemento (como K2/MK-7).' : 'Often combined with vitamin D in a single supplement (K2/MK-7 form).',
      research: isEs ? 'Hoja informativa basada en evidencia del NIH.' : 'Evidence-based fact sheet from the NIH.',
      source: { label: 'NIH Office of Dietary Supplements', href: 'https://ods.od.nih.gov/factsheets/VitaminK-Consumer/' },
    },
    {
      name: 'Magnesium L-Threonate',
      food: isEs ? 'Semillas de calabaza, almendras, espinacas, frijoles negros, chocolate amargo.' : 'Pumpkin seeds, almonds, spinach, black beans, dark chocolate.',
      form: isEs ? 'El L-treonato es el que se ha estudiado para el cerebro y el sueño. El glicinato es más suave y más barato para uso general. Evita el óxido de magnesio: se absorbe mal y sirve más que nada como laxante.' : 'L-threonate is the one studied for brain and sleep. Glycinate is gentler and cheaper for general use. Skip magnesium oxide. It is poorly absorbed and mostly a laxative.',
      caution: isEs ? 'Puede aflojar el estómago; empieza con una dosis baja. Si tienes alguna enfermedad de los riñones, pregunta primero.' : 'Can loosen stools, so start at a low dose. Ask first if you have kidney disease.',
      group: 'calm',
      tag: isEs ? 'SUE\u00d1O \u00b7 ESTR\u00c9S' : 'SLEEP \u00b7 STRESS',
      desc: isEs ? 'Llega mejor al cerebro. Ayuda con el sueño, la calma y la memoria.' : 'Crosses into the brain better. Supports sleep, calm, and memory.',
      tone: 'plum',
      why: isEs
        ? ['El magnesio ayuda a regular el sistema nervioso, a relajar los músculos y a dormir, tres cosas que la menopausia suele alterar.',
           'El L-treonato llega al cerebro mejor que otras formas, por eso se relaciona más con la memoria y la concentración.',
           'También ayuda a los huesos y a controlar el azúcar en la sangre.']
        : ['Magnesium helps regulate the nervous system, muscle relaxation, and sleep, three things menopause tends to disrupt.',
           'The L-threonate form crosses the blood-brain barrier better than other forms, so it\u2019s more associated with cognitive and memory benefits.',
           'It also plays a role in bone health and blood-sugar regulation.'],
      dose: isEs ? 'Sigue la dosis del producto; suele ser ~1–2 g al día de magnesio L-treonato.' : 'Follow the product dosing, typically ~1\u20132 g a day of magnesium L-threonate.',
      research: isEs ? 'Hoja informativa basada en evidencia del NIH.' : 'Evidence-based fact sheet from the NIH.',
      source: { label: 'NIH Office of Dietary Supplements', href: 'https://ods.od.nih.gov/factsheets/Magnesium-Consumer/' },
    },
    {
      name: 'Turmeric',
      food: isEs ? 'Cúrcuma en la comida, siempre con pimienta negra y un poco de grasa: así se absorbe.' : 'Turmeric in cooking, always with black pepper and a little fat. That is what makes it absorbable.',
      form: isEs ? 'Un extracto estandarizado de curcumina con piperina, o en forma de fosfolípido. Las cápsulas de "cúrcuma en polvo" son casi puro relleno.' : 'A standardized curcumin extract with piperine, or a phospholipid form. Plain "turmeric powder" capsules are mostly filler.',
      caution: isEs ? 'En dosis altas hace la sangre más líquida y puede caer pesada con el estómago vacío. Evítala si tienes piedras en la vesícula.' : 'Mildly blood-thinning at high doses and hard on an empty stomach. Avoid it if you have gallstones.',
      group: 'inflam',
      tag: isEs ? 'INFLAMACI\u00d3N \u00b7 ARTICULACIONES' : 'INFLAMMATION \u00b7 JOINTS',
      desc: isEs ? 'Antiinflamatorio natural. Ayuda con el dolor y la inflamación de las articulaciones.' : 'Natural anti-inflammatory. Helps with joint pain and swelling.',
      tone: 'sage',
      why: isEs
        ? ['La curcumina, el compuesto activo de la cúrcuma, es antiinflamatoria y puede ayudar con el dolor de articulaciones tan común en la perimenopausia.',
           'Algunos estudios sugieren que también ayuda al estado de ánimo y al corazón.']
        : ['Curcumin, turmeric\u2019s active compound, has anti-inflammatory properties that may help with the joint pain common in perimenopause.',
           'Some studies suggest added benefits for mood and cardiovascular health.'],
      dose: isEs ? 'Busca curcumina con piperina o una forma que se absorba bien, ~500–1000 mg al día.' : 'Look for curcumin with piperine or a bioavailable form, ~500\u20131000 mg a day.',
      research: isEs ? 'La evidencia es prometedora, pero todavía es poca. Habla con tu médico.' : 'Evidence is promising but still limited; talk to your doctor.',
      source: null,
    },
    {
      name: 'Fiber',
      food: isEs ? 'Frijoles, lentejas, avena, moras, chía, verduras. Aquí la comida le gana al suplemento.' : 'Beans, lentils, oats, berries, chia, vegetables. This is the one where food genuinely beats a supplement.',
      form: isEs ? 'Si tomas suplemento, la cáscara de psyllium es la que tiene más evidencia. Tómala con un vaso grande de agua.' : 'If you do supplement, psyllium husk has the most evidence behind it. Take it with a full glass of water.',
      caution: isEs ? 'Súbele poco a poco o te vas a inflamar. Tómala un par de horas antes o después de cualquier medicamento.' : 'Increase slowly or you will bloat. Take it a couple of hours apart from any medication so it does not block absorption.',
      group: 'calm',
      tag: isEs ? 'DIGESTI\u00d3N \u00b7 HORMONAS' : 'GUT \u00b7 HORMONES',
      desc: isEs ? 'La meta es 25 g al día. Ayuda a que el cuerpo elimine bien el estrógeno.' : 'Aim for 25 g a day. Helps estrogen leave the body the way it should.',
      tone: 'sage',
      why: isEs
        ? ['La fibra alimenta a las bacterias del intestino que ayudan a procesar y eliminar el estrógeno de forma equilibrada.',
           'Ayuda a controlar el azúcar en la sangre y a sentirte llena, algo útil cuando el metabolismo cambia en la menopausia.',
           'Ayuda al corazón porque ayuda a controlar el colesterol.']
        : ['Fiber feeds the gut bacteria that help metabolize and clear estrogen in a balanced way.',
           'It steadies blood sugar and fullness, helpful when metabolism shifts in menopause.',
           'It supports heart health by helping manage cholesterol.'],
      dose: isEs ? 'La meta es ~25 g al día, de preferencia de la comida; un suplemento puede completar lo que falte.' : 'Aim for ~25 g a day, ideally from food; a supplement can fill the gap.',
      research: isEs ? 'Recomendaci\u00f3n general de salud p\u00fablica.' : 'General public-health guidance.',
      source: null,
    },
    {
      name: 'Probiotics',
      food: isEs ? 'Yogur, kéfir, chucrut, kimchi, miso. Comer fermentados todos los días hace más que una cápsula de vez en cuando.' : 'Yogurt, kefir, sauerkraut, kimchi, miso. Fermented food daily does more than an occasional capsule.',
      form: isEs ? 'Busca cepas con nombre, no solo "mezcla probiótica". Fíjate en las UFC y en la fecha de vencimiento: los cultivos vivos se mueren en el anaquel.' : 'Look for named strains, not just "probiotic blend." The CFU count and an expiry date matter, because live cultures die on the shelf.',
      caution: isEs ? 'Si tienes las defensas bajas, consulta primero.' : 'Check with your doctor first if you are immunocompromised.',
      group: 'calm',
      tag: isEs ? 'DIGESTI\u00d3N \u00b7 INMUNIDAD' : 'GUT \u00b7 IMMUNITY',
      desc: isEs ? 'Ayuda a la salud del intestino, que influye en las hormonas, las defensas y el estado de ánimo.' : 'Supports gut health, which influences hormones, immunity, and mood.',
      tone: 'plum',
      why: isEs
        ? ['Las bacterias del intestino ayudan a procesar el estrógeno y pueden influir en cómo te sientes en esta etapa.',
           'Un intestino sano también se relaciona con mejores defensas y menos inflamación.']
        : ['The gut microbiome helps metabolize estrogen and can influence how the body feels through the transition.',
           'A balanced gut is also linked to better immunity and lower inflammation.'],
      dose: isEs ? 'Busca una cepa con estudios que la respalden y sigue la dosis del producto.' : 'Look for a well-researched strain, follow the product\u2019s dosing.',
      research: isEs ? 'La evidencia cambia según la cepa; habla con tu médico.' : 'Evidence varies by strain; talk to your doctor.',
      source: null,
    },
  ];
}
window.getSupplementCount = () => buildSupplementItems(false).length;
window.getSupplementItems = (isEs) => buildSupplementItems(isEs);

export function SupplementsHub({ lang, setRoute }) {
  const t = useT(lang);
  const isEs = lang === 'es';
  const [open, setOpen] = React.useState(null); // index of open supplement

  const items = buildSupplementItems(isEs);

  const GROUPS = isEs ? [
    { key:'muscle', tone:'rose',  title:'Músculo y hueso',      note:'Lo que protege la fuerza y los huesos cuando baja el estrógeno.' },
    { key:'inflam', tone:'sage',  title:'Inflamación y corazón', note:'Cuando baja el estrógeno, la inflamación aumenta. Estos ayudan a controlarla.' },
    { key:'calm',   tone:'plum',  title:'Intestino, sueño y ánimo', note:'El intestino procesa el estrógeno, y dormir bien lo cambia todo.' },
  ] : [
    { key:'muscle', tone:'rose',  title:'Muscle & bone',        note:'What protects strength and bone density once estrogen drops.' },
    { key:'inflam', tone:'sage',  title:'Inflammation & heart', note:'Low estrogen means unchecked inflammation. These help keep it in check.' },
    { key:'calm',   tone:'plum',  title:'Gut, sleep & mood',    note:'The gut metabolizes estrogen, and sleep changes everything.' },
  ];

  const PRINCIPLES = isEs ? [
    { t:'Primero la comida',            d:'Los suplementos ayudan con lo que falta, no sustituyen la comida. Cuando un alimento sirve, te lo digo.' },
    { t:'La forma importa tanto como el nombre', d:'El óxido de magnesio y el glicinato no son lo mismo. Te digo cuál buscar.' },
    { t:'Si hay poca evidencia, te lo digo', d:'Algunos están bien estudiados. Otros son prometedores, pero todavía falta investigación. Mereces saber cuál es cuál.' },
  ] : [
    { t:'Food first, always',           d:'Supplements fill gaps, they don\u2019t replace a plate. Where a food source works, I say so.' },
    { t:'The form matters as much as the name', d:'Magnesium oxide and magnesium glycinate are not the same purchase. I tell you which form to look for.' },
    { t:'If the evidence is thin, I say so', d:'Some of these are well established. Others are promising and early. You deserve to know which is which.' },
  ];

  const FAQS = isEs ? [
    { q:'¿Necesito suplementos si como bien?',
      a:'La comida es la base. Pero a esta edad es común que falten algunas cosas aunque comas bien: vitamina D en los meses con poco sol, omega-3 si no comes pescado dos o tres veces a la semana, magnesio si vives con mucho estrés, y fibra (casi todas comemos la mitad de lo recomendado). Un análisis de sangre te dice más que adivinar.' },
    { q:'¿Cómo sé si un suplemento es bueno?',
      a:'Fíjate en tres cosas. La forma: D3 y no D2, magnesio glicinato o L-treonato y no óxido, y que diga cuánto EPA y DHA trae. La dosis, comparada con la que se usó en los estudios. Y los ingredientes extra: pocos y que los reconozcas. Las marcas serias publican análisis de laboratorios independientes.' },
    { q:'¿En cuánto tiempo voy a notar algo?',
      a:'Depende. El magnesio para dormir se puede notar en días. La vitamina D tarda de seis a ocho semanas en subir en la sangre. El omega-3 para la inflamación, de ocho a doce. Ser constante importa más que la dosis.' },
    { q:'¿Los puedo tomar con mis medicamentos?',
      a:'Algunos sí interactúan: la K2 con la warfarina, el omega-3 y la cúrcuma con los anticoagulantes, y la fibra con el horario de casi cualquier pastilla. Lleva los frascos a tu próxima cita y revísalos con tu médico.' },
  ] : [
    { q:'Do I need supplements if I eat well?',
      a:'Food is the base. But a few gaps are common at this stage even on a good diet: vitamin D in low-sunlight months, omega-3 if you don\u2019t eat oily fish two or three times a week, magnesium under sustained stress, and fiber (most people get about half of what\u2019s recommended). A blood test tells you more than guessing.' },
    { q:'How do I tell a good supplement from a bad one?',
      a:'Three checks. The form of the active ingredient: D3 not D2, magnesium glycinate or L-threonate rather than oxide, EPA and DHA listed by amount. The dose compared to what the studies actually used. And the excipient list, which should be short and recognizable. Serious brands publish third-party certificates of analysis.' },
    { q:'How long before I notice anything?',
      a:'It depends. Magnesium for sleep can show up within days. Vitamin D takes six to eight weeks to move your blood levels. Omega-3 for inflammation, eight to twelve. Consistency matters more than the size of the dose.' },
    { q:'Can I take these with my medication?',
      a:'Some interact. K2 with warfarin, omega-3 and turmeric with blood thinners, fiber with the timing of almost any pill. Bring the actual bottles to your next appointment and go through them with your doctor.' },
  ];

  const toneBg = (tone) => tone === 'rose' ? 'var(--ella-blush-50)' : tone === 'plum' ? 'var(--ella-plum-100)' : 'var(--ella-sage-100)';
  const toneFg = (tone) => tone === 'rose' ? 'var(--ella-rose)' : tone === 'plum' ? 'var(--ella-plum-500)' : 'var(--ella-sage-500)';
  const tagFg  = (tone) => tone === 'rose' ? 'var(--ella-terracotta)' : tone === 'plum' ? 'var(--ella-plum-700)' : 'var(--ella-sage-700)';

  const s = open != null ? items[open] : null;

  return (
    <div data-screen-label="06 Supplements">
      <section className="ella-section-tight">
        <div className="ella-container">
          <div className="ella-section-head" style={{ maxWidth: 720 }}>
            <div className="ella-eyebrow">{t('nav_supplements').toUpperCase()}</div>
            <h2>{isEs ? 'En esta etapa, más importantes que un multivitamínico.' : 'More important than a multivitamin, at this stage.'}</h2>
            <p className="ella-supp-lede">
              {isEs
                ? 'Estos son los que investigué para mí. No vendo ninguno. De cada uno te digo para qué sirve, de qué alimento sacarlo primero, qué buscar en la etiqueta y cuándo tener cuidado.'
                : 'These are the ones I researched for myself. I don\u2019t sell any of them. For each one you get what it does, the food to get it from first, the form to look for on the label, and when to be careful.'}
            </p>
          </div>

          <ol className="ella-supp-principles">
            {PRINCIPLES.map((p, i) => (
              <li key={p.t}>
                <span className="ella-supp-principle-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </li>
            ))}
          </ol>

          <div className="ella-supp-sections">
            {GROUPS.map((g) => (
              <div key={g.key} className="ella-supp-section" data-tone={g.tone}>
                <div className="ella-supp-section-head">
                  <h2>{g.title}</h2>
                  <p>{g.note}</p>
                </div>
                <div className="ella-supp-cards">
                  {items.map((sup, idx) => sup.group === g.key ? (
                    <button
                      key={sup.name}
                      type="button"
                      className="ella-supp-card"
                      data-tone={sup.tone}
                      onClick={() => setOpen(idx)}
                      aria-haspopup="dialog"
                    >
                      <span className="ella-supp-card-icon">
                        <IconDroplet width="18" height="18" />
                      </span>
                      <span className="ella-supp-card-name">{sup.name}</span>
                      <span className="ella-supp-card-desc">{sup.desc}</span>
                      <span className="ella-supp-card-more">
                        {isEs ? 'Ver más' : 'Read more'}
                        <IconArrow width="13" height="13" />
                      </span>
                    </button>
                  ) : null)}
                </div>
              </div>
            ))}
          </div>

          <div className="ella-supp-faq">
            <h2 className="ella-section-title">{isEs ? 'Lo que más me preguntan' : 'What people ask me most.'}</h2>
            <div className="ella-supp-faq-list">
              {FAQS.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}<IconDown width="16" height="16" /></summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 40, padding: '20px 24px', background: 'var(--ella-cream-100)', borderRadius: 16, fontSize: 14, color: 'var(--ella-clay-700)', fontStyle: 'italic', lineHeight: 1.5 }}>
            {isEs
              ? 'Habla con tu médico antes de empezar cualquier suplemento, sobre todo si tomas medicamentos. Ella comparte información, no consejo médico.'
              : 'Talk to your doctor before starting any supplement, especially if you take medication. Ella shares information, not personalized medical advice.'}
          </div>
        </div>
      </section>

      {/* ---------- Detail modal ---------- */}
      {s && (
        <div className="ella-supp-modal-overlay" onClick={() => setOpen(null)} role="dialog" aria-modal="true" aria-label={s.name}>
          <div className="ella-supp-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="ella-supp-modal-close" aria-label={isEs ? 'Cerrar' : 'Close'} onClick={() => setOpen(null)}>×</button>
            <div className="ella-supp-modal-head">
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: toneBg(s.tone), color: toneFg(s.tone), flex: '0 0 52px',
              }}>
                <IconDroplet width="26" height="26" />
              </div>
              <div>
                <span className="ella-supp-tag" style={{ background: toneBg(s.tone), color: tagFg(s.tone) }}>{s.tag}</span>
                <h3>{s.name}</h3>
              </div>
            </div>

            <div className="ella-supp-modal-body">
            <div className="ella-supp-modal-col">
            <h4 className="ella-supp-modal-sub">{isEs ? 'Por qué importa en esta etapa' : 'Why it matters now'}</h4>
            <ul className="ella-supp-why">
              {s.why.map((w, i) => <li key={i}>{w}</li>)}
            </ul>

            <div className="ella-supp-facts">
              <div className="ella-supp-fact">
                <span className="ella-supp-fact-lbl">{isEs ? 'PRIMERO, LA COMIDA' : 'GET IT FROM FOOD FIRST'}</span>
                <p>{s.food}</p>
              </div>
              <div className="ella-supp-fact">
                <span className="ella-supp-fact-lbl">{isEs ? 'QU\u00c9 BUSCAR EN LA ETIQUETA' : 'WHAT TO LOOK FOR ON THE LABEL'}</span>
                <p>{s.form}</p>
              </div>
            </div>

            </div>

            <div className="ella-supp-modal-col">
            <div className="ella-supp-dose">
              <span className="ella-supp-dose-lbl">{isEs ? 'CU\u00c1NTO' : 'HOW MUCH'}</span>
              <p>{s.dose}</p>
            </div>

            <div className="ella-supp-caution">
              <span className="ella-supp-fact-lbl">{isEs ? 'TEN CUIDADO SI' : 'BE CAREFUL IF'}</span>
              <p>{s.caution}</p>
            </div>

            <div className="ella-supp-evidence">
              <span className="ella-supp-fact-lbl">{isEs ? 'LA EVIDENCIA' : 'THE EVIDENCE'}</span>
              <p>{s.research}</p>
              {s.source && (
                <a className="ella-supp-source" href={s.source.href} target="_blank" rel="noopener noreferrer">
                  {s.source.label}
                  <IconArrow width="15" height="15" style={{ transform: 'rotate(-45deg)' }} />
                </a>
              )}
            </div>

            </div>
            </div>

            <div className="ella-supp-modal-disc">
              {isEs
                ? 'Información general, no consejo médico. Habla con tu médico antes de empezar, sobre todo si tomas medicamentos.'
                : 'General information, not medical advice. Talk to your doctor before starting, especially if you take medication.'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

window.SupplementsHub = SupplementsHub;
