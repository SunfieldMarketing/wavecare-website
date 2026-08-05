# CMS migration — remaining pages

Status and the block inventory for each page still hardcoded. The discovery work
(reading each page and working out which blocks it needs) is done and recorded
here, so the remaining sessions can go straight to building.

## Done — 12 of 19 URLs

| Route | Blocks used |
| --- | --- |
| `/photoservices` | hero (mosaic), noticeBar, beforeAfter, cardGrid, tabsShowcase, process, gallery, finalCta |
| `/commercial` | landingHero, videoFeature, statsBar, pillBand, auditCta |
| `/testimonials` | landingHero, statsBar, videoTestimonials, inlineCta, dividerLabel, testimonialCards, auditCta |
| `/contact` | contactHero, steps, calendarEmbed |
| `/case-studies` | caseStudyCards, stats, finalCta |
| `/case-studies/<slug>` ×4 | collection-driven + optional blocks |
| `/privacy-policy`, `/terms-of-service` | legalDocument |
| Navigation, Footer, Theme, Site Settings | globals |

## The rule that keeps catching people out

**Each page group has its own stylesheet and its own class vocabulary.** They are
not interchangeable:

| Stylesheet | Prefix / classes |
| --- | --- |
| `globals.css` | `.sec-pad .deep .ink .light .container .sec-head .stats .stat .num .cap .final` |
| `subservices.css` | `.phero .shoot-grid .proc-tabs .proc-sheet .mason .ctx-tab .mock-web` |
| `commercial.css` | `wc-*` |
| `testimonials.css` | `wct-*` |
| `contact.css` | `.chero .trust-item .form-card .chip .steps .step .sn` |
| `services.css` | `.split .service-card .feature-row .stats-row .testimonial-card .final-cta` |
| `case-studies.css` | `.cs-grid .cs-card .cs-media .cs-tag .cs-result` |

Writing a block that emits classes from the wrong sheet produces an unstyled
section. Always confirm against the page's own stylesheet before building.

## Suggested order

`/services` -> `/design-print` -> `/videoservices` -> `/about` -> `/webdesign` -> `/`

Rationale: the three service pages share `subservices.css` with the already-done
`/photoservices`, so blocks built for one will carry over. `/about` and
`/webdesign` each need bespoke interactive components. The homepage goes last,
when the block library is most complete — it is the highest-traffic page and the
least forgiving of a rushed job.

---

## `/services` — 368 lines, `services.css`

Its own class system, distinct from globals.css. Needs roughly 7 blocks:

| Section | Classes | Block |
| --- | --- | --- |
| Hero | `.hero .hero-video-wrap .hero-overlay .hero-inner .hero-sub .hero-actions` | **existing `hero`** with `background: video` |
| Logo marquee | `.marquee .marquee-row .m-logo` | new — existing `logoMarquee` emits different classes |
| Services grid | `.services-grid .service-card` | new |
| Split rows | `.split .split-image .split-text .split-body`, modifiers `flipped on-dark on-light` | new — existing `splitMedia` uses different classes |
| Feature row | `.feature-row .feature-card .feature-list` | new |
| Stats | `.stats-row .stat .stat-num .stat-label` | new — note `.stat-num`, not globals' `.num` |
| Testimonials | `.testimonial-section .testimonial-grid .testimonial-card .testimonial-attribution .quote-mark .testimonial-bg` | new — should read from the Testimonials collection |
| Final CTA | `.final-cta .final-cta-bg .final-cta-sub` | new — not globals' `.final` |

Videos referenced: `/videos/Website video .mp4`, `/videos/country_lane_720p.mp4`,
`/videos/Brochure wavecare video.mp4`, plus Vimeo `1187767005` in the hero.

## `/about` — 399 lines

Needs 5 new blocks. Confirmed by reading the page:

| Section | Classes | Block |
| --- | --- | --- |
| Hero | `.hero .hero-bg .hero-inner .hero-sub .hero-actions .scroll-cue` | **existing `hero`** with `background: image` |
| Why We Exist | `.who .story .story-img .big .lead` | new |
| Pull quotes | `.insight .q .vmark .glow` | new |
| Trust / Confidence / Fit | `.values .value` | new |
| **What We Do** | `.accordion .acc-panel .acc-num .acc-title .acc-tag .acc-detail .acc-content .acc-cta .acc-hint .acc-body-wrap` | new — **interactive, needs a client component** like ProcessShowcase |
| Video reel | `.reel-wrap .reel-frame` | new |
| Stats | `.stats four stagger .stat .num .cap` | **existing `stats`** (globals classes) |
| Testimonials | `.tcards .tcard` | new |
| Final CTA | `.final .foot` | **existing `finalCta`** |

## `/design-print`, `/videoservices`, `/webdesign`

All three import `subservices.css`, the same sheet as the already-migrated
`/photoservices`, so many blocks should carry straight over. Run the extractor
and diff the class list against what `/photoservices` already uses before
building anything new.

`/webdesign` additionally has a browser-mockup tab UI — check whether the
existing `tabsShowcase` block covers it before writing a new one.

## `/` (homepage) — 529 lines

Video hero, logo marquee, WebGL wave in the final CTA, and a horizontal
drag-scroll reel. Leave until last.

---

## Per-page recipe

```bash
# 1. see what is on the page, in document order
node scripts/extract-content.mjs "src/app/(frontend)/<page>/page.tsx"

# 2. confirm the class vocabulary against that page's own stylesheet
#    (see the table above — do not assume globals.css)

# 3. build blocks + renderers, then seed

npm run migrate:create -- <name>
npm run migrate
npm run seed

# 4. audit until it reports 0 missing classes
npm run audit:fidelity http://localhost:3000/<page> "eab4b20~1:src/app/<page>/page.tsx"

# 5. confirm nothing else regressed
npm run check:routes
```

`eab4b20~1` is the commit before the CMS work began — the reference for what the
original markup looked like.

## Gotchas already hit, worth not repeating

- **Never emit a class no stylesheet defines.** `.proc`, `.gal-grid` and
  `.container-wide` were invented early and rendered unstyled sections. The
  fidelity audit exists to catch exactly this.
- **Do not fight the stylesheet with inline styles.** Inline
  `gridTemplateColumns` overrode the responsive breakpoints in `.shoot-grid`.
- **Client-only content will not appear in the audit.** Randomised or
  state-dependent markup (glitter stars, form error states) is absent from
  server HTML in the original too — not a regression.
- **Interactive sections need their own client component.** See
  `ProcessShowcase.tsx` and `ContactForm.tsx` for the pattern: server block
  passes data, client component owns state.
- **Keep integrations out of the CMS.** The contact form's submit path stays in
  code so a content edit cannot break lead capture.
