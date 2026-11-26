// Inline SVG assets, used instead of <img src="..."> so the bundle is
// fully self-contained when shared as a single HTML file.

// Bloom: five soft petals around a small center, taken from the homepage photo.
const BLOOM_ANGLES = [0, 72, 144, 216, 288];
function BloomPetals({ petal, center }) {
  return (
    <>
      {BLOOM_ANGLES.map((a) => (
        <ellipse key={a} cx="0" cy="-11" rx="5.6" ry="10" transform={'rotate(' + a + ')'} fill={petal} fillOpacity="0.88" />
      ))}
      <circle r="4.2" fill={center} />
    </>
  );
}

function LogoEllaSvg({ width = 160, color = '#2f261d', accent = '#7e5266', ...rest }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 96" width={width} height={width * (96/320)} {...rest}>
      <g transform="translate(32, 48) scale(1.3)">
        <BloomPetals petal={accent} center={color} />
      </g>
      <text x="74" y="68" style={{ fontFamily: "'DM Serif Display', 'Cormorant Garamond', Georgia, serif", fontSize: 64, fill: color }}>Ella</text>
    </svg>
  );
}

function LogoMarkSvg({ size = 32, color = '#7e5266', center = '#33242c', ...rest }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width={size} height={size} {...rest}>
      <g transform="translate(24, 24)">
        <BloomPetals petal={color} center={center} />
      </g>
    </svg>
  );
}

function IllustrationSprig({ width = 120, ...rest }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80" width={width} {...rest}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M60 76 Q60 40 60 8" />
        <path d="M60 58 Q42 54 32 40" />
        <path d="M60 50 Q78 46 88 32" />
        <path d="M60 40 Q48 36 40 26" />
        <path d="M60 30 Q72 26 80 16" />
        <path d="M60 22 Q52 18 48 10" />
        <circle cx="60" cy="8" r="2.4" fill="currentColor" />
      </g>
    </svg>
  );
}

function IllustrationBranch({ width = 160, ...rest }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width={width} {...rest}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 100 C40 80 60 60 80 60 C100 60 120 60 140 40" />
        <path d="M50 78 Q56 70 54 60" />
        <path d="M70 66 Q76 56 74 46" />
        <path d="M90 60 Q96 50 100 40" />
        <path d="M110 54 Q118 50 124 42" />
        <ellipse cx="40" cy="92" rx="10" ry="4" transform="rotate(-30 40 92)" />
        <ellipse cx="60" cy="74" rx="9" ry="3.5" transform="rotate(-30 60 74)" />
        <ellipse cx="80" cy="64" rx="9" ry="3.5" transform="rotate(-20 80 64)" />
        <ellipse cx="105" cy="56" rx="8" ry="3" transform="rotate(-15 105 56)" />
      </g>
    </svg>
  );
}

Object.assign(window, { LogoEllaSvg, LogoMarkSvg, IllustrationSprig, IllustrationBranch });

// Single lookup-by-name entry point, for design-system export purposes.
const SVG_MAP = { logo: LogoEllaSvg, mark: LogoMarkSvg, sprig: IllustrationSprig, branch: IllustrationBranch };
export function SvgAssets({ name = 'logo', ...rest }) {
  const Cmp = SVG_MAP[name] || LogoEllaSvg;
  return <Cmp {...rest} />;
}
window.SvgAssets = SvgAssets;
