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

## The world — and now there are two of them

Dark instrument panel. Deep teal-black ground, cyan as the reading colour, amber
as the single accent, `--signal` orange reserved for genuine cost or violation.

**The light world is a drafting sheet, not the panel inverted.** Warm paper
rather than white, deep teal *ink* rather than pale teal light, and the amber
drops two stops to an ochre that reads at 14px on paper. The ruled grid that was
a faint scanline in the dark becomes graph paper, which is what it always looked
like it wanted to be.

Every colour on the site is `rgb(var(--x) / <alpha>)`, so both worlds are ten
CSS variables in `index.css` and no component knows which one it is in. The
names keep their meanings, and that is what makes it work: `.card` is `bg-deep`
on `bg-void` and `.well` is `bg-void` inside a card, so *white on paper is
raised and paper inside white is recessed* — the directional surface rule
survives the swap untouched.

Three things do not survive a token swap and are handled explicitly:

- **Glow is a screen device.** On paper a text-shadow is a smudge, and at
  `text-mega` it made the h1 look out of focus. `--glow-cyan` / `--glow-amber`
  resolve to `none` in the light world rather than being overridden at 26 call
  sites.
- **Elevation is carried differently.** A dark card is legible because it is
  *lighter* than the ground; on paper that is a 4% luminance step where it was
  30%. The light card goes fully opaque and gets a real drop shadow — offset and
  blur, never a zero-offset halo. `.well` becomes an inset shadow rather than a
  darker fill.
- **The vignette nearly vanishes** (0.28 → 0.05) and the grid nearly doubles
  (0.05 → 0.09). A dark corner on a white page reads as dirt; a hairline that
  glowed on black disappears on paper.

The switch is `SwitchMode`, and the flash is prevented by a blocking inline
script in `index.html` — the only place it can be. A stored choice outranks the
OS, because a visitor who pressed the switch has said something more specific
than their system setting has.

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

**Sections may not share a shape**, and the second pass finished what the first
one started. Method, Capabilities and the research log once rendered the
identical twelve-column ruled row for ~3,600px. All three now have the shape
their content actually has:

- **Method is a deck.** Six numbered findings that are meant to be *compared*
  sat as six full-width rows of one pattern, which read as reference material —
  the opposite of what they are. As a deck they fit on one screen, the sequence
  is visible as a sequence, and reading one is a decision rather than a scroll.
- **Capabilities is a stack.** Five equal rows in a matrix said the five areas
  are peers. They are not: "Mathematical foundations" is what "Deployment &
  inference" is standing on, and that is the site's entire positioning claim.
  It is drawn as a stratigraphic section, each layer reaching less far than the
  one beneath it, and the accordion beside it reads in the same direction.
- **The research log is a plate grid.** The chronology survives — the cards are
  in order and lead with their year — but each entry now carries a *drawing* of
  what the work is.

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

## The instruments, and which slot each one earns

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

## The motion vocabulary

The site runs `motion` (v13). Before it, every transition on the page was one
CSS curve — `cubic-bezier(0.16, 1, 0.3, 1)`, an exponential ease-out. A spring
library arriving with its own defaults would have given the page two motion
accents, which is the same defect as the two h2 registers recorded above. So
there are **three springs, in `src/lib/motion.ts`, and no more**, all tuned to
sound like that curve:

- `marker` — stiffness 420, damping 38. Fast and dead-stop. A selector on an
  instrument arrives at its detent; it does not wobble past it.
- `panel` — bounce 0.06, 0.42s. Layout and overlay. A spring rather than a
  tween so an interruption is continuous instead of restarting.
- `press` — stiffness 520, damping 17. The only overshoot on the site, and it
  is spent on controls being *struck*: the dock item, the physics switch, the
  tilt.

`springOr(still, …)` collapses any of them to a 1ms tween under
`prefers-reduced-motion`. Not "no transition" — `AnimatePresence` and `layout`
need something to resolve against, and a snap is what the stylesheet already
does to every CSS animation, so the two agree.

**One way of saying "this one", and it moves.** The travelling amber marker —
a single element shared across siblings by `layoutId` — is the site's selection
device, in three places: the work console's case rail, the header nav's
underline, the dock's active dot. All three previously blinked out here and in
over there, which on a list reads as a redraw rather than as a movement. This
is the vocabulary; a fourth selection surface uses it too, and does not invent
a second one.

**The focal moment is the dossier, and it is a shared-element morph.** The
impact accordion is gone: four entries expanding in place made a 3,000px
section whose height depended on how curious the visitor had been, and nobody
compares two open accordions. A dossier is a stack of files and a file is a
thing you take *out* of the stack, so the card's own geometry — its frame, its
icon, its title, its year chip, its org line, each with a `layoutId` — travels
into a focused reader. It is the one modal on the page that earns itself:
checking a source wants protected focus and is finished with.

Two things that transition needs and did not get for free:

- **The source card fades to 0.25 while its file is open.** Motion leaves the
  origin element rendered during a shared-element transition, so without this
  the card and its own enlargement are both on screen and the metaphor dies the
  moment you see the file still sitting in the stack it came out of.
- **Content that has nothing to morph from arrives after the geometry settles**
  — 120ms, through a short blur. It reads as "this resolved" rather than as "a
  second thing appeared".

**`.card` carries `overflow-hidden`, and that is a trap for anything that hangs
outside its own box.** The dock is built from the card's border and background
written out longhand rather than from the class, because all six of its hover
labels sit *above* the bar and under `.card` every one of them was clipped to
nothing — an affordance that existed in the markup and had never been visible.

### The primitives, and the rule that governs adding another

`src/components/motion/` holds the Motion Primitives adaptations. Each one is
the upstream mechanism with the site's own constraints applied, and where the
two disagreed the site won:

- **`TextRoll`** — the hero h1, rolling in word by word on a 3D hinge, amber
  clause last. **Splits on words, not characters.** Upstream splits on
  characters and sets each `inline-block`, which is correct for a one-word
  demo and destroys a three-line headline: the browser can no longer see
  words, so it breaks lines mid-word and `text-balance` has nothing left to
  balance. `data-reveal` came off the h1 with it — a CSS reveal sliding a
  hinge that is still turning is two entrances fighting.
- **`TextScramble`** — the work console's domain line, which changes whenever
  the reader picks a different case. **Scrambles through letters, digits and
  the middot, never `#$%^&*`.** The upstream alphabet resolves through
  punctuation, which reads as a glitch — something broke and is repairing
  itself — and this page does not get to imply a state the system is not in.
  Through letters it reads as a readout settling, which is what has actually
  happened.
- **`InView`** — Capabilities and the Lab grid. It exists for what CSS cannot
  do: coordinate a stagger across *children*. `[data-reveal]` fires each row
  on its own threshold crossing, so a tall list arrives in whatever order and
  rhythm the scroll happens to produce. `once: true` by default, against the
  upstream demo — a section that re-animates every time it is scrolled past is
  a loop, not an entrance.
- **`TransitionPanel`** — inside the dossier, so the four files can be stepped
  through rather than opened and closed four times. Height is animated from a
  `ResizeObserver` reading because the exiting panel must be `position:
  absolute`, which otherwise leaves a hard height cut under a smooth slide.
- **`BorderTrail`** — the capability graph's frame, **bound to `playing`**.
  This is the only reason it is allowed to exist next to the no-simulated-
  telemetry rule: press pause and it stops, because the thing it reports has
  stopped. The status pill still says it in words; the trail never carries it
  alone.
- **`SpotlightBorder`** — the case-study band and the contact cards. The light
  is confined to a 1px ring by an opaque inner surface, so it never crosses
  the content. **Whatever it wraps gives up its own border.** The first pass
  wrapped an element that kept `border border-amber/50`, which laid an opaque
  line exactly over the ring the light travels in — the effect worked
  perfectly and was invisible behind the border it was lighting.
- **`Dock`** — real distance-based magnification off one shared pointer value,
  so the tiles either side of the one you are on grow too. **44 → 60 over
  130px, not the library's 48 → 80 over 150.** macOS's curve is built for a
  dock that is the only thing on screen; this one sits over research prose. It
  magnifies *width*, so neighbours move aside instead of being covered.
- **`Tilt`** — the lab cards, `rotationFactor={8}` and reversed so the corner
  you are nearest comes up to meet you. 8 is a ceiling, not a taste: at the
  library's other default of 15 the text shears visibly while you are reading
  it.

**The rule for the next one.** Every primitive above is bound to something the
page already had a state for — a selection, a timer, a case change, a pointer.
None was added because a section looked static. `animate.md`'s line is the
test: *do not animate a static area merely because it exists.* A mechanism with
no state to make legible is decoration, and this document has a record of what
happens when decoration accumulates one reasonable decision at a time.

### The drawings, and why they are drawn rather than photographed

Two new graphics, and both exist because a sentence could not do the job:

- **`CapabilityStack`** is Capabilities' right column. Left-aligned, not
  centred: centred slabs narrowing 13% a layer put the longest label on the
  narrowest slab, and "RESEARCH LEADERSHIP" hung off both ends of the thing it
  named. Left-aligned it reads as a stratigraphic section, every label starts
  inside its own slab at any width, and the taper still carries the argument.
- **`ResearchPlate`** gives each research entry the image `ExpandableEventCard`
  is built around and this site does not have. Filling that hole with stock
  photography would have put five pictures of laboratories on a page whose one
  rule is that nothing appears without being the actual thing. Instead: a GAN's
  hole and the context pulled across it, a shelf and the embedding space a new
  SKU lands in, two views and the body lifted out of them, one query attending
  across a row of keys, a spline replacing a dense layer. Keyed by the entry's
  own `plate` field, never by array position.

### What was taken from the component libraries, and what was not

Twelve Watermelon UI and Motion Primitives components were on the table. Four
were used, and the mapping was content-first in every case: the mechanism was
picked because a piece of this site already had the state it describes.

- **Expandable card** → the impact dossier. The focal moment above.
- **Dock** → section navigation below 1400px, where `SectionRail` cannot fit
  and the header has scrolled away.
- **Carousel-navigator's direction awareness** → the work console. Previous and
  Next used to produce the identical fade-up, so the one thing the animation
  could have said was the one thing it did not.
- **Tilt** → the six lab cards, at 6° rather than the library's 15. At 15 the
  text shears visibly while you are reading it. `.lift` came off those six and
  only those six: a `translateY` on hover was fighting the tilt for the same
  transform.

These were declined, and the reasons generalise:

- **Fractional-picker** would have replaced `MetricBlindness`'s native
  `input[type=range]`, and "prefer the platform control" is a rule above it.
- **Minimal-carousel, voice-chat-disclosure, show-qr, weight-widget,
  discrete-tabs, tooltip-11, and the Blog2 card grid** describe content this
  site does not have. Blog2 in particular is six saturated pastel fills and a
  bookmark icon, which is a different world, not a component.
- **`InViewImagesGrid` as drawn** needs a masonry of photographs, and there are
  none — the only images on the site are a portrait and a résumé. Its
  *mechanism*, `staggerChildren` over a grid with a blur-and-scale entrance,
  shipped on the two grids that do exist: the lab cards and the case-study
  metrics row.
- **`Spotlight` used bare** is a glow following the cursor, which this document
  rejects by name, and a soft blob drifting over 17px serif prose is a
  legibility cost paid for atmosphere. `SpotlightBorder` is the same primitive
  in the configuration that does not have that problem — the light is in the
  frame, which is the same family as the `.trace` corner brackets, described
  above as "an instrument framing its reading".

### The hand-picked five

A second, shorter list arrived with the instruction to use all of it. Each one
found real content, and in three cases the component's own default was wrong for
this page and was changed rather than accommodated:

- **`SwitchMode`** → the theme toggle, and the light world it needed. Its
  `next-themes` dependency, its `react-icons` glyphs and its eight colour props
  are all gone: this is a static SPA with one document, one icon library at one
  stroke weight, and a token system that the switch's whole job is to *change*.
- **`MinimalCarousel`** → the six Method findings. The tiles are buttons, not
  divs — the demo puts `onClick` on a `div`, and six findings behind a control
  nobody can tab to is worse than six findings in a list. **Nothing is open by
  default.** An earlier pass defaulted principle 01 open, with a companion
  diagram (`BlindSpotMap`, since removed) pinned above the whole deck making
  the same argument a second time. Scrolling to Method meant arriving at an
  already-expanded card nobody had pressed, plus a permanently-open twin above
  it wearing none of the deck's own affordances — no number, no close button.
  The deck now opens the same closed shape it returns to, and every expansion
  on this page is something the visitor did.
- **`Features2`** → the Capabilities layout. Its accordion holds two items in a
  row; this holds five in a column, because five side by side at this width
  gives each a 14-character measure.
- **`Blog2`** → the lab grid. Its six saturated pastel fills became a ramp built
  from this site's own two colours, running newest to oldest — so the variation
  carries a date axis instead of nothing. Six unrelated hues on a card grid read
  as six unrelated *kinds of thing*, and these six are all personal repositories
  in one lab.
- **`ExpandableEventCard`** → the research log, with `ResearchPlate` supplying
  the image it is built around.

**A component library is an inventory of mechanisms, not a shopping list.** The
question is never "is this good" — every one of them was good. It is "which
piece of this site already has the state this mechanism makes legible", and
where the answer is none, the mechanism either finds different content, or has
that content drawn for it, or does not ship.

## Motion and access

WCAG 2.1 AA is a hard requirement, not an aspiration.

- **One authored moment per surface**, not an effect on every section.
- **An overlay owes three things**, and `useDialog` is where they live: focus
  in on open and back to the trigger on close, Tab cycling inside the panel,
  and no scrolling behind it. `aria-modal="true"` announces that the rest of
  the page is gone; it does not make it so.
- Nothing auto-advances content without a visible pause control. Prefer not
  auto-advancing.
- `prefers-reduced-motion` is read through `useReducedMotion` (reactive) or
  `prefersReducedMotion()` (one-shot). Never hand-roll the media query again —
  there were three copies and two never updated.
- **"Which section is being read" is one definition**, in `useSectionSpy`, and
  it is one scroll listener behind `useSyncExternalStore` rather than one per
  consumer. It was computed twice with two thresholds — the header marked a
  section active at 140px, the rail at 40% of the viewport — which nobody
  noticed while the two were gated to widths that never overlapped. The dock
  spans 320–1400px, so all three are now on screen together and any
  disagreement is a bug the visitor can see. The store recomputes on scroll and
  resize, and a client-side route change is neither, so `App` calls
  `remeasureSections()` on every navigation.
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
