# Design

The visual world of ajishpradeep.github.io. Written after a critique opened the
question of whether the incumbent terminal/HUD language was doing any work; the
answer was *some of it was, and the loudest parts were not*. This records what
was kept, what was cut, and the rules that decide the next thing.

## The surface

**Mode: Experience, carrying a Persuade success condition.** The artifact leads —
the work has to be visible and operable from the first viewport — but the page
succeeds only when it starts a conversation. Two reading speeds share one
artifact: a sixty-second scan and a twenty-minute read. Neither may be served by
degrading the other.

Much of the traffic is a **second touch**. Someone has already seen a CV, a talk,
or a referral. The page's job is to confirm rather than introduce.

## The one rule

**A claim carries its receipt, and a number carries its source.**

This is a content rule that became a design rule, and it is the thing worth
protecting above every aesthetic choice here. It is why:

- The impact dossier separates "My part" from "Public record" as *layout*, in a
  recessed `.well` beside a list of external links — the restraint is visible in
  half a second rather than buried in a footnote.
- Method's findings each carry "Where this came from: `<case-study section>`",
  and principle 06 deliberately carries none, because no case backs it.
- The hero instrument's caption says **"illustration, not measured data"** on the
  axis itself. Synthetic numbers carry the fact that they are synthetic.

A previous boot overlay printed `ready · 240 fps · mpjpe 3.0cm` as though a model
had cold-started. Nothing had loaded. It was the one place the design told a
small lie, and it primed a reader to discount the real 3cm figure 600px later.
It is gone. Do not reintroduce simulated telemetry in any form.

## The world

Dark instrument panel. Deep teal-black ground, cyan as the reading colour, amber
as the single accent, `--signal` orange reserved for genuine cost or violation.

**Type.** Funnel Display for display and UI, Source Serif 4 for prose, JetBrains
Mono for data, labels and measurement. Mono is allowed for code, data and
measurement — never as a costume for "technical". Six size steps and no more
(`micro` `fine` `base` `lead` `title` `headline` `mega`); `mega` is the h1, once
per page, and nothing else may borrow it.

**Surfaces are directional, three levels only.** Page ground → `.card` (raised,
one frame) → `.well` (recessed, drawn weaker, only inside a card). A container
may frame its children; **a child may never out-frame its container.** If
something needs a fourth level it needs less content, not another box.

**One h2 register.** `font-display text-headline font-extrabold uppercase
text-cyan`, on every section. There were two, and the quieter one was set below
the h3 inside the card underneath it — which put the site's best writing (Method)
in its faintest voice.

**Sections may not share a shape.** Method, Capabilities and the research log
once rendered the identical twelve-column ruled row for ~3,600px. Reference
material earns the matrix; claims-with-receipts get set as claims. When a new
section arrives, ask what shape its content actually has before reaching for the
row.

## What was cut, and why it stays cut

- **The particle canvas** (`HudCanvas`). A distance-threshold node field mounted
  three times across the site. The single most-shipped decorative canvas on the
  web, and silent about a product whose subject is measuring a body in three
  dimensions.
- **The boot overlay.** See the one rule.
- **Bracketed h2s, and ten of thirteen corner traces.** The bracket, the trace
  and the mono label are one device. Spent on headings, on every card, and on
  every tag at once, it stopped being a mark and became wallpaper. Four traces
  remain.
- **Index-mapped icon arrays.** A leaf for CarbonPass, a music note for Magic
  Shuffle — literal noun-illustration, reassigned silently whenever an entry was
  added. Icons are keyed from the data or they do not appear. In the lab, the
  per-project tag list replaced them: it distinguishes the cards, which is the
  one thing an icon in that position never did.

**Do not** add: gradient text, glass-as-decoration, hero-metric stat grids, a
kicker above a heading, or a card whose structure is icon + heading + text
repeated as the page's skeleton.

## The two instruments, and which slot each one earns

The hero answers **"what is this person expert in"**. Nothing else can have that
slot. `CapabilityGraph` — one maths core feeding four domains — answers it in a
single picture, which is why it is there.

`MetricBlindness` briefly held the hero and was moved out. It is good work and it
was in the wrong position: it introduces *one* problem from *one* case study,
which is a figure from a paper, not a profile. It now sits in Method directly
under principle 01, the finding it dramatises — the one claim on the page whose
receipt can be handed to the reader to run themselves. That is a better argument
in a smaller place.

**The lesson worth keeping:** a hero artifact must summarise the person's range.
Depth belongs next to the specific claim it proves.

Both must clear the same interaction bar, and this is where the graph had to be
repaired rather than restored:

- **Auto-updating content needs a real pause control.** The graph cycles its four
  domains, which is a genuine feature — they introduce themselves without the
  visitor discovering the graph is interactive. It is also WCAG 2.2.2 (Level A),
  and hover-to-pause is not a mechanism on a touch screen. It has a labelled
  pause button, and any deliberate selection stops the cycle for good.
- **A reduced-motion path needs a designed resting state, not an absent one.**
  Skipping the animation left the nodes at their seed angles, which is the one
  arrangement where labels leave the frame. The rest layout is rotated 45°. It
  shares the orbit the animation uses rather than a smaller one — the frame is
  now sized so every node, caption and satellite is inside it at every angle, so
  the reduced-motion visitor sees the picture the animation settles into.
- **The status must be true in every mode.** The pill reads `static`, not
  `orbiting`, when nothing moves.
- **An affordance is worth more than a caption describing it.** The panel used to
  carry a mono line under the frame naming the drag and the tap. A caption that
  explains how to operate a picture is documentation, and it goes stale the
  moment either half stops being true — this one already had, twice. The
  controls announce themselves instead: the nodes take a grab cursor, the skills
  are controls that respond to a pointer, and nothing is reachable only through
  the sentence that used to describe it.
- **`[touch-action:pan-y]`, never `touch-none`**, on anything in the scroll path.
- **Prefer the platform control.** `MetricBlindness` is a native
  `input[type=range]`: keyboard stepping, touch handling and value announcement
  come free and correct.

**Graphics do not carry text at a size the graphic chose.** The graph's
satellites were labelled at 7px inside a 40px ring around a 25px node; they
collided with each other, with the node and with its caption, and were unreadable
even when they did not. Four permanent labels do not fit in that ring at any
readable size, and no amount of nudging changes that.

What replaced them is the rule worth keeping:

- **Every label in the graphic is HTML on top of it, at the site's own sizes.**
  The viewBox scales; 14px does not. Inside the SVG a caption is whatever the
  box happens to scale it to, which on a phone was 7px. The frame is capped
  (`max-w`) so the drawing only ever lives between 0.87× and 1.13×, which is the
  band every clearance in the layout is solved for.
- **One label at a time, on demand, is the version that fits.** Point at a skill
  in the readout — or at its dot — and that dot alone is named on a plate that
  opens away from the node and is clamped to the frame. One label cannot collide
  with three others.
- **A hover previews and a press latches.** Naming a skill on hover alone meant
  the label went out on the way to the thing it was pointing at, and on a pointer
  device the press looked dead because the hover had already lit it. The pin
  survives the pointer leaving and the domain cycle; a second press releases it.
  This is the same rule one level up, where selecting a domain stops the cycle
  for good — a deliberate action outranks a passing one, everywhere in the panel.
- **The readout is the permanent legend, and it is spatial.** The four skills are
  a fixed 2×2 whose reading order is the four satellites' fixed positions, so the
  top-left chip is the top-left dot. That is the labelling; the peek confirms it.
  Satellites do not rotate — a rotating dot is one the reader has to chase, and
  it swept through the node's caption four times a revolution.
- **A capability list points at the work that proves it.** Each domain carries
  "Where this shows up: `<case study>`", in the same device Method uses. A
  skills list is the easiest thing on a portfolio to assert and the hardest to
  believe.

## Motion and access

WCAG 2.1 AA is a hard requirement, not an aspiration.

- **One authored moment per surface**, not an effect on every section.
- Nothing auto-advances content without a visible pause control. Prefer not
  auto-advancing.
- `prefers-reduced-motion` is read through `useReducedMotion` (reactive) or
  `prefersReducedMotion()` (one-shot). Never hand-roll the media query again —
  there were three copies and two never updated.
- Any widget with custom key handling gets `role="application"` plus
  `aria-roledescription`, because `role="img"` on an interactive thing means the
  screen reader eats the arrow keys and the affordance you documented does not
  exist for the user you documented it for.
- Every `<section>` is labelled by its heading; every `<nav>` carries a name.
- Touch targets ≥44px. Interactive borders ≥3:1. Body text ≥4.5:1.
- Platform-specific glyphs (`⌘`) are detected, never hardcoded.

## Copy

The product's own language, and no more of it than the claim needs. Controls are
named by their action — "Turn physics off", not "Physics: ON" — because the
argument only lands once the visitor breaks the system themselves.

Say a fact once. Three figures were stated four times each across the hero, the
dossier, a Reach paragraph and a Recognition list; every instance was true and
the repetition still read as padding to the exact reader the page most wants.

**This is a portfolio, not a product page.** The distinction is not abstract, and
two things failed it:

- The hero's headline figures were once 3cm, 240fps and on-device tracking —
  three properties of *one product*, which reads as a spec sheet for XView rather
  than a profile of the person who built it. The three that stand there now each
  answer a different question from a different part of the record: how good is the
  research, how far did it get, and who else says so.
- "Reach" was a half-page block with a stylised world map of three cities. A world
  map of offices is an employer's global-presence slide; it says something about a
  company's footprint and nothing about what this person can do. It is one row now.

Before adding anything, ask whether it describes a product or a practitioner.
