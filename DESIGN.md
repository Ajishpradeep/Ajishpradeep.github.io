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
slot. `CapabilityGraph` answers it in a single picture, which is why it is there.

**It is a link graph, and the links are the argument.** It was an orbit — one
maths core, four domains circling it — and that picture was true and said
nothing the positioning had not already said in a sentence. What it could not
draw is the part that is actually unusual: that moving from generative models to
retail vision to 3D biomechanics to agentic systems did not mean starting over,
because the same techniques kept doing work on the other side.

So sixteen skills are nodes too, and the four that serve two domains are drawn
once, between them, wired to both. Point at one and both its domains light on
opposite sides of the frame. That is not a caption claiming the foundation is
shared; it is the shared thing lighting both ends.

**Every cross-link is something a case study shows.** Scale anchoring is
geometry↔physics because metric scale is fixed by an anatomical prior — 204 bone
measurements validated against published anthropometrics. Temporal continuity is
physics↔edge because the club-telescoping failure was solved at inference by a
shaft-length tracker running on the device. Grounding is geometry↔agentic
because the coaching rules run on biomechanics the geometry stack produced.
Evaluation is agentic↔physics, and it is the one edge that crosses the middle,
because it is the site's own thesis at both ends. **Do not add a fifth link to
make the picture prettier.** The sourcing rule binds a drawn relationship
exactly as it binds a number.

**Placed, not solved.** Obsidian runs a force simulation; twenty-one nodes
relaxing inside a 340×300 panel land somewhere new on every load, including on
top of each other and outside the frame. The arrangement is computed from two
ellipses and drifts on it, so it breathes like a settled force graph — but the
settling was done by hand, where it can be checked. Domains sit at the four
diagonals precisely because an ellipse leaves its corners empty, which is where
the four domain names are pinned: four labels that cannot collide with anything,
at any width, however the graph drifts. Position says which name belongs to
which node; lighting says which is being read.

**Edges stop at the rim of what they connect.** Drawn centre to centre, the four
core→domain links were mostly underneath the two discs — present in the markup
and invisible in the picture, on the one relationship the panel is named after.

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
  The layout is deterministic, so the resting state is the layout with the drift
  amplitude at zero — the reduced-motion visitor sees exactly the picture the
  drift moves around, not a smaller substitute for it.
- **The status must be true in every mode.** The pill reads `static` when
  nothing moves, and it reads `drifting` rather than `orbiting`, because nothing
  orbits any more.
- **An affordance is worth more than a caption describing it.** The panel used to
  carry a mono line under the frame naming the drag and the tap. A caption that
  explains how to operate a picture is documentation, and it goes stale the
  moment either half stops being true — this one already had, twice. The
  controls announce themselves instead, and nothing is reachable only through the
  sentence that used to describe it.
- **A `useState` setter is not a dependency.** `at` and `view` were memoised on
  `tick`, which React guarantees is stable, so both were computed once at mount
  and never again: the drift did not drift and the camera sat where it had been
  initialised, showing one domain's cluster while the readout described another.
  Depend on the frame *value*. This cost a full round of screenshots to find,
  because a still frame of a frozen animation looks exactly like a still frame.
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
  drawing happens to scale it to, which on a phone was 7px.
- **The frame is not a box inside a box.** It was: a bordered, inset,
  24rem-capped panel inside a bordered card, which is a child framed more
  strongly than its container. It bleeds to the card's edges now, on `bg-void` —
  the page showing through rather than a fourth surface.
- **A graph view is a quiet thing, and this one had stopped being one.** It had
  acquired, one reasonable decision at a time: a knockout plate behind every
  name, a leader line from every dot to its name, an arrow glyph on four of them,
  dashed edges in a second colour, a glow under the core and another under the
  selected node, a beam under every live edge, and a camera that pulled back and
  dived in every few seconds. Each solved something real. Together they were
  noise, and the mesh underneath — which is the actual argument — could not be
  seen through them. **Before adding a device here, check what it is competing
  with.**
- **The drawing carries four names, not twenty.** The four domains are the map
  legend. Everything else is named in the list under the picture, and pointing at
  a name swells its node and rings it — which is the pairing a graphic cannot do
  alone. Sixteen labels in a 470px panel is exactly what made this cluttered.
- **The turn moves the graph, not the camera.** The cluster being read expands
  away from the core and brightens; the rest contracts toward it and fades. Depth
  is the right mechanism for a step that happens on a timer, because nothing the
  reader was already looking at slides out from under them. The camera is
  reserved for the one move the reader asks for: press a domain and it goes in.
- **A domain comes forward as a ring first and a solid second.** Fading an amber
  fill up from zero renders the part-way states as amber over deep teal, which is
  olive, and olive is in no part of this palette. Below 0.6 the node carries an
  amber outline instead.
- **Geometry that is a property of the arrangement is computed from the
  arrangement, not from the frame.** The edges bowed away from the core by the
  sign of (midpoint − core) · normal, recomputed every frame. For an edge that
  starts at the core the midpoint lies *on* the edge, so that value is exactly
  zero, and the drift pushed it either side of zero several times a second —
  four edges snapping their bow continuously. That was the jitter. The sign is
  decided once from the home positions; where it is genuinely zero there is no
  bow, which is what a spoke from the middle of a graph should look like anyway.
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
named by their action — "Reset", not "Reset: ready" — because the
argument only lands once the visitor breaks the system themselves.

**A binary state is a switch, and the label states the thing, not the verb.**
The constraint solver's control was a status badge reading "Physics: ON" that
nobody pressed; naming the action fixed that and introduced a second problem, an
action label on a binary state has to lie about half of what it shows. "Turn
physics off" sat there while the state it reported was on, so the word the eye
landed on was always the opposite of the truth of the panel. A switch is
unmistakably operable from its shape, so the label is free to name what it
controls and the readout is free to be true. The knob's position carries the
state without colour, and `signal` on the off side is correct under its own
definition — constraints off is a violation, and the drift readout below turns
the same colour.

Say a fact once. Three figures were stated four times each across the hero, the
dossier, a Reach paragraph and a Recognition list; every instance was true and
the repetition still read as padding to the exact reader the page most wants.

**This is a portfolio, not a product page.** The distinction is not abstract, and
two things failed it:

- The h1 is Pradeep's own sentence, promoted out of the intro paragraph beneath
  it, where it was the strongest line on the page and was being read fourth. It
  is said once: `site.intro` now starts at what used to be its second sentence.
  The line is also `about.headline`, which makes the two pages open on the same
  words — a refrain between two headlines rather than between a headline and a
  paragraph.
- The hero's headline figures were once 3cm, 240fps and on-device tracking —
  three properties of *one product*, which reads as a spec sheet for XView rather
  than a profile of the person who built it. The three that stand there now each
  answer a different question from a different part of the record: how good is the
  research, how far did it get, and who else says so.
- "Reach" was a half-page block with a stylised world map of three cities. A world
  map of offices is an employer's global-presence slide; it says something about a
  company's footprint and nothing about what this person can do. It is one row now.

**Empty space in a column is a question, and the answer is usually already in the
data.** The Selected systems index was 587px of content in a column whose height
a 1,347px card set — a quarter of the section held open and holding nothing. It
is filled by `outcome`, the one field on a case study the console never rendered
and the only one that says what was true *after* the system shipped, which is
what the industry reader is there for. It is set at `text-fine` rather than
`.copy`, because the column is a 36-character measure and 20px prose does not
survive that, and it sits after the card in the DOM so a phone reads what a
system did after reading what it was.

Before adding anything, ask whether it describes a product or a practitioner.
