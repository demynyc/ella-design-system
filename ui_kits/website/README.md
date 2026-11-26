# Ella Website UI Kit

An interactive click-thru prototype of the Ella marketing site. Run it by
opening `index.html` in a browser (or via the project preview).

## Components

Every built component in this kit:

- `ArticlesHub` — filterable grid of all articles
- `ArticleView` — long-form article template with takeaways, TOC, and references
- `AwarenessQuiz` — 3-question "Where am I?" check-in with results
- `Footer` — footer with link columns and privacy link
- `Header` — sticky header, primary nav, EN/ES language toggle
- `Homepage` — hero, why-this-matters, content pillars, consultation
- `Icons` — inline Lucide icon set
- `NutritionHub` — nutrition landing with article cards
- `Photo` — photography slot with tinted gradient fallback
- `Privacy` — short plain-language privacy note
- `Glossary` — searchable Spanish–English terms and phrases
- `Resources` — curated external links grouped by topic
- `SupplementsHub` — supplements with the "why", dosing, and research
- `SvgAssets` — brand line-art and ornaments

### Screens by route

| Route          | Component        |
|----------------|-----------------|
| `home`         | `Homepage`      |
| `quiz`         | `AwarenessQuiz` |
| `articles`     | `ArticlesHub`   |
| `article`      | `ArticleView`   |
| `nutrition`    | `NutritionHub`  |
| `supplements`  | `SupplementsHub`|
| `resources`    | `Resources`     |

Support modules: `components/i18n.jsx` (`useT(lang)` hook and EN/ES dictionary), `tweaks-panel.jsx` (Tweaks-panel scaffolding).

## Tweaks panel

Toggle "Tweaks" in the toolbar to open the Tweaks panel and play with:

- **Primary color** — 4 curated swatches (rose / deep rose / plum / sage)
- **Hero copy** — Default / Editorial / Soft
- **Botanical ornaments** — show/hide brand line-art around the hero
- **Display font** — DM Serif Display, Cormorant Garamond, Fraunces, Lora
- **Body font** — Nunito, Manrope, Inter
- **Language** — English / Español (the toggle in the header also flips this)
- **Jump-to-screen** — quick navigation between screens

## Notes & caveats

- **All photography is placeholder.** The `<Photo>` component renders a warm
  gradient with an abstract figure suggestion to mark where real licensed
  photographs of women 45-70 should go. The emotional weight of the real site
  rests on real photography — please license a small set before launch.
- **Logo is placeholder.** A simple sprig mark + DM Serif Display wordmark
  stands in for the future Ella logo.
- **Fonts are Google Fonts substitutions.** Real brand fonts (e.g. Recoleta,
  GT Sectra, Söhne) can be swapped in via `colors_and_type.css`.
- **Spanish copy** is included for every primary surface. In production it
  should be commissioned (not auto-translated) so warmth and idiom survive.
- The kit covers cosmetic UI only — actual form submission and PDF
  generation are stubbed.
