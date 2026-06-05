export default function Page() {
  return (
    <main dangerouslySetInnerHTML={{ __html: `
 
<!-- ========== HERO (assembling photo wall) ========== -->
<header class="phero" id="phero">
  <div class="phero-wall" id="pheroWall">
      <div class="cell"><div class="pho" data-label="img 1"></div></div>
      <div class="cell"><div class="pho" data-label="img 2"></div></div>
      <div class="cell"><div class="pho" data-label="img 3"></div></div>
      <div class="cell"><div class="pho" data-label="img 4"></div></div>
      <div class="cell"><div class="pho" data-label="img 5"></div></div>
      <div class="cell"><div class="pho" data-label="img 6"></div></div>
      <div class="cell"><div class="pho" data-label="img 7"></div></div>
      <div class="cell"><div class="pho" data-label="img 8"></div></div>
      <div class="cell"><div class="pho" data-label="img 9"></div></div>
      <div class="cell"><div class="pho" data-label="img 10"></div></div>
      <div class="cell"><div class="pho" data-label="img 11"></div></div>
      <div class="cell"><div class="pho" data-label="img 12"></div></div>
      <div class="cell"><div class="pho" data-label="img 13"></div></div>
      <div class="cell"><div class="pho" data-label="img 14"></div></div>
      <div class="cell"><div class="pho" data-label="img 15"></div></div>
      <div class="cell"><div class="pho" data-label="img 16"></div></div>
      <div class="cell"><div class="pho" data-label="img 17"></div></div>
      <div class="cell"><div class="pho" data-label="img 18"></div></div>
  </div>
  <div class="phero-tint"></div>
  <div class="phero-in">
    <div class="phero-content">
      <svg class="wave-line" viewBox="0 0 120 18" aria-hidden="true"><path d="M2 9 Q17 1 32 9 T62 9 T92 9 T118 9"/></svg>
      <span class="label">Brand &amp; Photoshoots</span>
      <h1>Professional photography that <span class="accent">builds trust.</span></h1>
      <p class="sub">Showcase your facility, staff, residents, and care environment with authentic imagery &mdash; built for websites, social media, admissions materials, and marketing campaigns.</p>
      <div class="phero-ctas">
        <a href="contact" class="btn" data-cursor data-magnetic>Book a Photoshoot <span class="arr">&rarr;</span></a>
        <a href="#gallery" class="btn btn-ghost" data-cursor data-magnetic>View Photo Work</a>
      </div>
    </div>
  </div>
</header>
 
<!-- ========== TRUST STRIP ========== -->
<div class="trust">
  <div class="trust-in">Trusted by healthcare facilities improving their online presence, admissions marketing, and brand perception.</div>
</div>
 
<!-- ========== WHY IT MATTERS + before/after ========== -->
<section class="panel ink sec-pad">
  <div class="container container-wide">
    <div class="sec-head" data-reveal>
      <span class="label">Why Professional Photography Matters</span>
      <h2>Families form their first impression <span class="accent">online.</span></h2>
      <p class="sub" style="margin-top:18px;">Outdated, inconsistent, or stock photography can make even the best facility feel untrustworthy. Drag to see the difference real photography makes.</p>
    </div>
    <div data-reveal>
      <div class="ba" id="ba" data-cursor>
        <div class="layer after"><div class="pho" data-label="After &middot; professional [REPLACE]"></div></div>
        <div class="layer before" id="baBefore"><div class="pho" data-label="Before &middot; stock / outdated [REPLACE]"></div></div>
        <span class="tagb">Before</span>
        <span class="taga">After</span>
        <div class="handle" id="baHandle"><div class="grip"></div></div>
      </div>
      <p class="ba-note">Drag the handle &mdash; left is typical stock/DIY, right is professional Wavecare photography.</p>
    </div>
  </div>
</section>
 
<!-- ========== WHAT WE PHOTOGRAPH (cards) ========== -->
<section class="panel deep sec-pad">
  <div class="glow" style="width:520px; height:520px; background:var(--teal-secondary); top:-120px; right:-120px;"></div>
  <div class="container">
    <div class="sec-head" data-reveal>
      <span class="label">What We Photograph</span>
      <h2>Everything that tells your <span class="lite">story.</span></h2>
    </div>
    <div class="cap-grid stagger">
      <div class="cap-card">
        <h3>Facility Photography</h3>
        <p>Common areas, resident rooms, amenities, dining spaces, and exterior views &mdash; the spaces families judge first.</p>
      </div>
      <div class="cap-card">
        <h3>Staff &amp; Team Photography</h3>
        <p>Professional portraits and candid team moments that put real faces to your culture and care.</p>
      </div>
      <div class="cap-card">
        <h3>Resident Lifestyle</h3>
        <p>Authentic moments of daily life, activities, and community &mdash; the proof that people are happy here.</p>
      </div>
      <div class="cap-card">
        <h3>Marketing Content</h3>
        <p>Images shaped for websites, social, brochures, ads, and recruitment &mdash; shot with the end use in mind.</p>
      </div>
    </div>
  </div>
</section>
 
<!-- ========== FILTERABLE GALLERY ========== -->
<section class="panel ink sec-pad" id="gallery">
  <div class="container container-wide">
    <div class="sec-head center" data-reveal>
      <span class="label">The Work</span>
      <h2>Real facilities, <span class="accent">real moments.</span></h2>
      <p class="sub" style="margin:18px auto 0;">Filter by what you need to see. Every image is shot on location &mdash; no stock, ever.</p>
    </div>
    <div class="filter-bar" data-reveal>
      <button class="fchip on" data-filter="all" data-cursor>All</button>
      <button class="fchip" data-filter="facility" data-cursor>Facility</button>
      <button class="fchip" data-filter="staff" data-cursor>Staff &amp; Team</button>
      <button class="fchip" data-filter="resident" data-cursor>Resident Lifestyle</button>
      <button class="fchip" data-filter="marketing" data-cursor>Marketing</button>
    </div>
    <div class="gal" id="gal">
      <div class="gcard wide" data-cursor data-cursor-frame data-cat="facility">
        <div class="pho" data-label="Facility &middot; lobby"></div>
        <div class="cap">Facility &middot; lobby</div>
      </div>
      <div class="gcard " data-cursor data-cursor-frame data-cat="staff">
        <div class="pho" data-label="Staff &middot; portrait"></div>
        <div class="cap">Staff &middot; portrait</div>
      </div>
      <div class="gcard tall" data-cursor data-cursor-frame data-cat="resident">
        <div class="pho" data-label="Resident &middot; lifestyle"></div>
        <div class="cap">Resident &middot; lifestyle</div>
      </div>
      <div class="gcard " data-cursor data-cursor-frame data-cat="marketing">
        <div class="pho" data-label="Marketing &middot; web hero"></div>
        <div class="cap">Marketing &middot; web hero</div>
      </div>
      <div class="gcard " data-cursor data-cursor-frame data-cat="facility">
        <div class="pho" data-label="Facility &middot; dining"></div>
        <div class="cap">Facility &middot; dining</div>
      </div>
      <div class="gcard wide" data-cursor data-cursor-frame data-cat="resident">
        <div class="pho" data-label="Resident &middot; activity"></div>
        <div class="cap">Resident &middot; activity</div>
      </div>
      <div class="gcard " data-cursor data-cursor-frame data-cat="staff">
        <div class="pho" data-label="Staff &middot; candid"></div>
        <div class="cap">Staff &middot; candid</div>
      </div>
      <div class="gcard tall" data-cursor data-cursor-frame data-cat="marketing">
        <div class="pho" data-label="Marketing &middot; social"></div>
        <div class="cap">Marketing &middot; social</div>
      </div>
      <div class="gcard " data-cursor data-cursor-frame data-cat="facility">
        <div class="pho" data-label="Facility &middot; exterior"></div>
        <div class="cap">Facility &middot; exterior</div>
      </div>
      <div class="gcard " data-cursor data-cursor-frame data-cat="resident">
        <div class="pho" data-label="Resident &middot; garden"></div>
        <div class="cap">Resident &middot; garden</div>
      </div>
      <div class="gcard wide" data-cursor data-cursor-frame data-cat="staff">
        <div class="pho" data-label="Staff &middot; team"></div>
        <div class="cap">Staff &middot; team</div>
      </div>
      <div class="gcard " data-cursor data-cursor-frame data-cat="marketing">
        <div class="pho" data-label="Marketing &middot; brochure"></div>
        <div class="cap">Marketing &middot; brochure</div>
      </div>
    </div>
  </div>
</section>
 
<!-- ========== WHERE PHOTOS ARE USED (one photo, 3 contexts) ========== -->
<section class="panel deep sec-pad">
  <div class="container container-wide">
    <div class="sec-head" data-reveal>
      <span class="label">Where Your Photos Are Used</span>
      <h2>One shoot. <span class="accent">Everywhere</span> it counts.</h2>
      <p class="sub" style="margin-top:18px;">The same professional image earns its keep across every place families and referral partners find you.</p>
    </div>
    <div class="ctx" data-reveal>
      <div class="ctx-tabs">
        <button class="ctx-tab on" data-ctx="0" data-cursor>
          <h4>Website</h4><p>Stronger first impression, instant trust.</p>
        </button>
        <button class="ctx-tab" data-ctx="1" data-cursor>
          <h4>Brochures &amp; Packets</h4><p>Polished materials for tours and admissions.</p>
        </button>
        <button class="ctx-tab" data-ctx="2" data-cursor>
          <h4>Google Business Profile</h4><p>Better local visibility with real imagery.</p>
        </button>
      </div>
      <div class="ctx-stage" id="ctxStage">
        <div class="ctx-scene on" data-scene="0">
          <div class="mock-web">
            <div class="bar"><i></i><i></i><i></i></div>
            <div class="shot"><div class="pho" data-label="hero image [REPLACE]"></div></div>
            <div class="lines"><span></span><span></span><span></span></div>
          </div>
        </div>
        <div class="ctx-scene" data-scene="1">
          <div class="mock-bro">
            <div class="pg"><div class="shot"><div class="pho" data-label="brochure [REPLACE]"></div></div><div class="lines"><span></span><span></span></div></div>
            <div class="pg"><div class="shot"><div class="pho" data-label="packet [REPLACE]"></div></div><div class="lines"><span></span><span></span></div></div>
          </div>
        </div>
        <div class="ctx-scene" data-scene="2">
          <div class="mock-goo">
            <div class="shot"><div class="pho" data-label="listing image [REPLACE]"></div></div>
            <div class="info"><div class="name">Park Gardens &middot; Senior Living</div><div class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><div class="meta"></div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
 
<!-- ========== PROCESS — contact sheet develops ========== -->
<section class="panel ink sec-pad">
  <div class="container container-wide">
    <div class="sec-head" data-reveal>
      <span class="label">Our Process</span>
      <h2>From shot list to <span class="accent">final gallery.</span></h2>
      <p class="sub" style="margin-top:18px;">Hover a phase &mdash; watch the contact sheet develop from raw proofs to the final selects.</p>
    </div>
    <div class="proc-tabs" data-reveal>
      <button class="proc-tab on" data-proc="0" data-cursor><span class="pnum">01</span><span class="pname">Planning</span><span class="pbar"></span></button>
      <button class="proc-tab" data-proc="1" data-cursor><span class="pnum">02</span><span class="pname">Photoshoot Day</span><span class="pbar"></span></button>
      <button class="proc-tab" data-proc="2" data-cursor><span class="pnum">03</span><span class="pname">Editing</span><span class="pbar"></span></button>
      <button class="proc-tab" data-proc="3" data-cursor><span class="pnum">04</span><span class="pname">Delivery</span><span class="pbar"></span></button>
    </div>
    <div class="proc-panel-wrap" data-reveal>
      <div class="proc-monitor">
        <div class="proc-detail">
          <div class="step on" data-step="0"><h3>Planning</h3><p>We identify goals, locations, and the exact shot list &mdash; so nothing is missed and your staff knows what to expect.</p></div>
          <div class="step" data-step="1"><h3>Photoshoot Day</h3><p>Our team captures everything planned, efficiently and respectfully, working around residents and daily routines.</p></div>
          <div class="step" data-step="2"><h3>Editing</h3><p>Images are professionally edited, color-corrected, and optimized for every marketing use.</p></div>
          <div class="step" data-step="3"><h3>Delivery</h3><p>You receive organized, ready-to-use files for web, print, social, and advertising &mdash; named and sized correctly.</p></div>
        </div>
        <div class="proc-sheet" id="procSheet">
          <div class="loupe" id="procLoupe">PROOFS</div>
          <div class="frame"><div class="pho" data-label="proof 1"></div><div class="pick"></div></div>
          <div class="frame"><div class="pho" data-label="proof 2"></div><div class="pick"></div></div>
          <div class="frame"><div class="pho" data-label="proof 3"></div><div class="pick"></div></div>
          <div class="frame"><div class="pho" data-label="proof 4"></div><div class="pick"></div></div>
          <div class="frame"><div class="pho" data-label="select"></div><div class="pick"></div></div>
          <div class="frame"><div class="pho" data-label="proof 6"></div><div class="pick"></div></div>
        </div>
      </div>
    </div>
  </div>
</section>
 
<!-- ========== GALLERY / PROOF masonry ========== -->
<section class="panel deep sec-pad">
  <div class="container container-wide">
    <div class="sec-head center" data-reveal>
      <span class="label">Selected Work</span>
      <h2>A closer <span class="lite">look.</span></h2>
    </div>
    <div class="mason" data-reveal>
      <div class="m" style="--ar:0.75"><div class="pho" data-label="portrait [REPLACE]"></div></div>
      <div class="m" style="--ar:1.5"><div class="pho" data-label="facility [REPLACE]"></div></div>
      <div class="m" style="--ar:1"><div class="pho" data-label="resident [REPLACE]"></div></div>
      <div class="m" style="--ar:1.3"><div class="pho" data-label="dining [REPLACE]"></div></div>
      <div class="m" style="--ar:0.8"><div class="pho" data-label="staff [REPLACE]"></div></div>
      <div class="m" style="--ar:1.2"><div class="pho" data-label="exterior [REPLACE]"></div></div>
      <div class="m" style="--ar:1"><div class="pho" data-label="activity [REPLACE]"></div></div>
      <div class="m" style="--ar:1.4"><div class="pho" data-label="amenity [REPLACE]"></div></div>
      <div class="m" style="--ar:0.9"><div class="pho" data-label="lifestyle [REPLACE]"></div></div>
    </div>
    <div style="text-align:center; margin-top:50px;" data-reveal>
      <a href="contact" class="btn btn-ghost" data-cursor data-magnetic>View More Work <span class="arr">&rarr;</span></a>
    </div>
  </div>
</section>
 
<!-- ========== FINAL CTA + WAVE ========== -->
` }} />
  );
}