# Austin Health Brand Reference (Canonical)

> Single-source brand reference for LLM prompting and front-end development.
> Consolidated from the Austin Health Brand Guidelines v1 (Jan 2019) digital extract.
> Source of truth for colour, type and layout when generating HTML, documents or app UI.
> All external materials require Corporate Communications approval before release.

---

## 1. Colour

Hex values below are canonical. Where earlier working files drifted, the digital
guidelines win.

### Primary palette (digital, RGB / Hex)

| Colour | RGB | Hex |
|---|---|---|
| Deep Navy | R25, G19, B71 | `#191347` |
| Purple | R74, G42, B114 | `#4b2a72` |
| Crimson | R223, G29, B81 | `#df1f51` |
| Coral Pink | R240, G91, B79 | `#f15b50` |
| Burnt Orange | R225, G94, B38 | `#e05e26` |

### Tints (digital, for interactive elements such as buttons and rollovers)

| Tint | RGB | Hex |
|---|---|---|
| Dark Purple Tint | R67, G60, B99 | `#433c63` |
| Mid Purple Tint | R108, G83, B137 | `#6c5389` |
| Light Lavender | R158, G152, B174 | `#9e98ae` |
| Pale Lavender | R181, G168, B195 | `#b5a8c3` |
| Rose | R229, G101, B111 | `#e5656f` |
| Blush Pink | R240, G169, B167 | `#f0a9a7` |
| Warm Salmon | R244, G132, B112 | `#f48470` |
| Light Peach | R250, G186, B169 | `#fabaa9` |
| Warm Tan | R243, G157, B101 | `#f39d65` |
| Pale Apricot | R248, G189, B148 | `#f8bd94` |

### Secondary palette (digital, use with Corporate Communications approval)

| Colour | RGB | Hex |
|---|---|---|
| Yellow | R254, G209, B65 | `#fed141` |
| Sage Green | R147, G180, B121 | `#93b479` |
| Teal | R0, G180, B188 | `#00b4bc` |
| Sky Blue | R106, G209, B227 | `#6ad1e3` |
| Ocean Blue | R33, G106, B149 | `#216a95` |
| Slate Grey | R112, G131, B137 | `#708389` |

### CSS custom properties (copy-ready)

```css
:root {
  /* Primary */
  --austin-navy:        #191347;
  --austin-purple:      #4b2a72;
  --austin-crimson:     #df1f51;
  --austin-coral:       #f15b50;
  --austin-orange:      #e05e26;

  /* Purple tints */
  --austin-purple-dark: #433c63;
  --austin-purple-mid:  #6c5389;
  --austin-lavender:    #9e98ae;
  --austin-lavender-pale:#b5a8c3;

  /* Warm tints */
  --austin-rose:        #e5656f;
  --austin-blush:       #f0a9a7;
  --austin-salmon:      #f48470;
  --austin-peach:       #fabaa9;
  --austin-tan:         #f39d65;
  --austin-apricot:     #f8bd94;

  /* Secondary */
  --austin-yellow:      #fed141;
  --austin-sage:        #93b479;
  --austin-teal:        #00b4bc;
  --austin-sky:         #6ad1e3;
  --austin-ocean:       #216a95;
  --austin-slate:       #708389;
}
```

---

## 2. Typography

### Brand fonts

- **Work Sans** (Bold, Medium, Light): headings, subheadings, signage.
- **Karla** (Regular, Regular Italic, Bold): body copy.
- **Arial** (Bold for headings, Regular for body): sanctioned fallback when
  brand fonts are unavailable.

Both Work Sans and Karla are free Google Fonts, so they install cleanly on
Windows. Arial ships natively on Windows, so the fallback chain needs nothing
extra. For server-side PDF generation, Helvetica is the closest PDF-standard
equivalent to Arial with matching metrics.

### Web font import

```css
@import url('https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,400;0,700;1,400&family=Work+Sans:wght@300;500;700&display=swap');
```

### Hierarchy (patient / staff communications)

| Element | Font | Weight | Size | Line height |
|---|---|---|---|---|
| H1 | Work Sans | Bold | 25 pt | 30 pt |
| H2 | Work Sans | Bold | 14 pt | 17 pt |
| H3 | Work Sans | Bold | 12 pt | 15 pt |
| Body | Karla | Regular | 12.5 pt | 15 pt |

```css
h1 { font-family: 'Work Sans', Arial, sans-serif; font-weight: 700; font-size: 25pt; line-height: 30pt; }
h2 { font-family: 'Work Sans', Arial, sans-serif; font-weight: 700; font-size: 14pt; line-height: 17pt; }
h3 { font-family: 'Work Sans', Arial, sans-serif; font-weight: 700; font-size: 12pt; line-height: 15pt; }
body, p { font-family: 'Karla', Arial, sans-serif; font-size: 12.5pt; line-height: 15pt; }
```

### Text rules

- Sentence case for headings and body (not title case, not all caps).
- Left-aligned text. Avoid justified or centred body copy.

---

## 3. Logo

### Placement and spacing

- Follow approved placement: logos aligned to corners or edges, never centred
  in isolation. Partner / co-brand logos sit in the footer.
- Minimum clear space around the Master Logo and the Austin Arrow equals the
  height of the Austin Arrow. Use more than the minimum where possible.

### Minimum size

- Master Logo: no smaller than 20 mm wide (print equivalent; scale
  proportionally for screen).
- Austin Arrow: no smaller than 10 mm wide.

### Never do

- Change the gradient colours on the logo
- Outline the logo
- Flatten the gradient on the 'A'
- Remove 'HEALTH' from the logo
- Stretch or distort the logo
- Change the 'HEALTH' font
- Change the logo alignment
- Replace 'HEALTH' with another word
- Use a low-resolution logo file
- Change the hierarchy between 'Austin' and 'HEALTH'
- Place the colour logo directly over photography
- Manually convert the colour logo to greyscale (use the Mono version instead)

On digital applications where brand colours are unavailable, use the Master
Logo, Mono.

> Note for generated documents: do not reproduce or fabricate the actual logo.
> Use an approved master artwork file, or a brand-consistent text lockup in
> Purple when no artwork is available.

---

## 4. The Pulse (graphic device)

The Pulse is the brand's curved housing shape, cropped from master artwork. It
acts as a container for colour, imagery or text.

### Usage principles

- **Balance:** do not centre the curved shape. Anchor it to an edge or corner
  and let it run off the page.
- **Cropping:** crop generously from the master artwork rather than shrinking
  the whole shape into frame.
- **Colour:** fill with a single solid brand colour. No gradient fills on the
  device itself in solid-colour applications.
- **Restraint:** one Pulse per layout as the dominant device. Do not tile or
  repeat it into a pattern.

### Avoid

- Horizontal or vertical bands or bars across the layout.
- Distorting or rotating the curve away from its master proportions.
- Outlining the shape.

---

## 5. Co-branding

- Austin Health branding leads. Partner or co-brand logos follow in the footer.
- Maintain the full minimum clear space between logos.
- Do not lock partner logos into the Master Logo or the Austin Arrow.
- Co-branded external material requires Corporate Communications sign-off.

---

## 6. Governance

- All external-facing materials require Corporate Communications approval before
  release.
- Secondary palette colours require Corporate Communications approval for use.
- Contact and current artwork: austin.org.au (Corporate Communications).

---

## 7. LLM prompt block (paste-in)

Use this when asking any model to generate Austin Health branded collateral.

```
Apply the Austin Health brand:
- Colours (hex): Deep Navy #191347, Purple #4b2a72 (primary brand colour),
  Crimson #df1f51, Coral Pink #f15b50, Burnt Orange #e05e26. Purple leads.
  Use solid colours only, no gradients. Secondary colours (Teal #00b4bc,
  Ocean Blue #216a95, Sage #93b479, Yellow #fed141, Sky #6ad1e3,
  Slate #708389) only if explicitly approved.
- Fonts: Work Sans (Bold) for headings, Karla for body, Arial as fallback.
- Text: sentence case, left-aligned. No justified or centred body copy.
- Layout: the Pulse curve as a single solid-colour housing device, anchored to
  an edge, never centred. No horizontal or vertical bands.
- Logo: do not fabricate the Austin Health logo. Leave a placeholder or use an
  approved artwork file.
- Note that the output needs Corporate Communications approval before release.
```
