export default function Page() {
  return (
    <main dangerouslySetInnerHTML={{ __html: `

<!-- ========== HERO — 3D tilting print desk ========== -->
<header class="dhero" id="dhero">
  <div class="dhero-bg"></div>
  <div class="dhero-in">
    <div class="dhero-content">
      <svg class="wave-line" viewBox="0 0 120 18" aria-hidden="true"><path d="M2 9 Q17 1 32 9 T62 9 T92 9 T118 9"/></svg>
      <span class="label">Design &amp; Print</span>
      <h1>Materials that <span class="accent">represent</span> your facility.</h1>
      <p class="sub">From brochures and admissions packets to signage and promotional materials, we create design assets that help healthcare organizations look polished, organized, and trustworthy.</p>
      <div class="dhero-ctas">
        <a href="contact" class="btn" data-cursor data-magnetic>Start a Design Project <span class="arr">&rarr;</span></a>
        <a href="#work" class="btn btn-ghost" data-cursor data-magnetic>View Our Work</a>
      </div>
    </div>
    <div class="desk" id="desk">
      <div class="desk-shadow"></div>
      <div class="desk-stage" id="deskStage">
        <div class="piece folder" data-depth="0.3" data-cursor><div class="inner"><div class="paper" data-label="folder [REPLACE]"></div></div></div>
        <div class="piece brochure" data-depth="0.55" data-cursor><div class="inner"><div class="paper" data-label="brochure [REPLACE]"></div></div></div>
        <div class="piece postcard" data-depth="0.7" data-cursor><div class="inner"><div class="paper" data-label="postcard [REPLACE]"></div></div></div>
        <div class="piece signage" data-depth="0.45" data-cursor><div class="inner"><div class="paper dark" data-label="signage [REPLACE]"></div></div></div>
        <div class="piece card" data-depth="1" data-cursor><div class="inner"><div class="paper" data-label="card [REPLACE]"></div></div></div>
      </div>
    </div>
  </div>
</header>

<!-- ========== TRUST STRIP ========== -->
<div class="trust">
  <div class="trust-in">
    <span>Healthcare-Focused Design</span><span class="dot"></span>
    <span>Print-Ready Files</span><span class="dot"></span>
    <span>Custom Branding</span><span class="dot"></span>
    <span>Premium Materials</span>
  </div>
</div>

<!-- ========== WHY IT MATTERS ========== -->
<section class="panel ink sec-pad">
  <div class="container container-wide">
    <div class="twocol">
      <div data-reveal>
        <span class="label">Why Design &amp; Print Matters</span>
        <h2>First impressions are <span class="accent">physical.</span></h2>
        <p class="body-lg" style="margin-top:20px;">Families often form opinions about your facility before they ever speak with your team. Professional design creates confidence, improves communication, and makes sure every touchpoint reflects the quality of care you provide.</p>
      </div>
      <div data-reveal>
        <div class="ba" id="ba" data-cursor>
          <div class="layer after"><div class="paper" data-label="After &middot; Wavecare design [REPLACE]"></div></div>
          <div class="layer before" id="baBefore"><div class="paper" data-label="Before &middot; DIY / outdated [REPLACE]"></div></div>
          <span class="tagb">Before</span>
          <span class="taga">After</span>
          <div class="handle" id="baHandle"><div class="grip"></div></div>
        </div>
        <p class="ba-note">Drag &mdash; left is a typical DIY flyer, right is a professionally designed piece.</p>
      </div>
    </div>
  </div>
</section>

<!-- ========== SERVICES — hover-to-open cards ========== -->
<section class="panel deep sec-pad">
  <div class="glow" style="width:520px; height:520px; background:var(--teal-secondary); top:-120px; right:-120px;"></div>
  <div class="container container-wide">
    <div class="sec-head" data-reveal>
      <span class="label">Design &amp; Print Services</span>
      <h2>Everything your facility hands <span class="lite">over.</span></h2>
      <p class="sub" style="margin-top:18px;">Hover any service to open it up.</p>
    </div>
    <div class="svc-grid stagger">
      <div class="svc" data-cursor data-cursor-open>
        <button class="svc-toggle" aria-label="Expand Brochures &amp; Marketing"></button>
        <div class="svc-obj"><div class="flapL"><div class="paper" data-label=""></div></div><div class="flapR"><div class="paper" data-label=""></div></div><div class="face" style="z-index:-1"><div class="paper dark" data-label=""></div></div></div>
        <div class="svc-inner">
          <span class="svc-num">01</span>
          <h3>Brochures &amp; Marketing</h3>
          <p>Professionally designed brochures, flyers, postcards, and promotional pieces.</p>
          <div class="svc-more">
            <div class="svc-thumbs">
              <div class="t"><div class="paper" data-label="sample [REPLACE]"></div></div>
              <div class="t"><div class="paper" data-label="sample [REPLACE]"></div></div>
              <div class="t"><div class="paper" data-label="sample [REPLACE]"></div></div>
            </div>
          </div>
          <span class="svc-see">See examples <span class="arr">&rarr;</span></span>
        </div>
      </div>
      <div class="svc" data-cursor data-cursor-open>
        <button class="svc-toggle" aria-label="Expand Admissions &amp; Welcome Packets"></button>
        <div class="svc-obj"><div class="face" style="z-index:0"><div class="paper" data-label=""></div></div><div class="lid"><div class="paper dark" data-label=""></div></div></div>
        <div class="svc-inner">
          <span class="svc-num">02</span>
          <h3>Admissions &amp; Welcome Packets</h3>
          <p>Organized materials that help families navigate the admissions process.</p>
          <div class="svc-more">
            <div class="svc-thumbs">
              <div class="t"><div class="paper" data-label="sample [REPLACE]"></div></div>
              <div class="t"><div class="paper" data-label="sample [REPLACE]"></div></div>
              <div class="t"><div class="paper" data-label="sample [REPLACE]"></div></div>
            </div>
          </div>
          <span class="svc-see">See examples <span class="arr">&rarr;</span></span>
        </div>
      </div>
      <div class="svc" data-cursor data-cursor-open>
        <button class="svc-toggle" aria-label="Expand Signage &amp; Facility Graphics"></button>
        <div class="svc-obj lift"><div class="face"><div class="paper" data-label=""></div></div><div class="face"><div class="paper dark" data-label=""></div></div></div>
        <div class="svc-inner">
          <span class="svc-num">03</span>
          <h3>Signage &amp; Facility Graphics</h3>
          <p>Interior and exterior signage designed for clarity and consistency.</p>
          <div class="svc-more">
            <div class="svc-thumbs">
              <div class="t"><div class="paper" data-label="sample [REPLACE]"></div></div>
              <div class="t"><div class="paper" data-label="sample [REPLACE]"></div></div>
              <div class="t"><div class="paper" data-label="sample [REPLACE]"></div></div>
            </div>
          </div>
          <span class="svc-see">See examples <span class="arr">&rarr;</span></span>
        </div>
      </div>
      <div class="svc" data-cursor data-cursor-open>
        <button class="svc-toggle" aria-label="Expand Presentation &amp; Sales"></button>
        <div class="svc-obj"><div class="face" style="z-index:0"><div class="paper" data-label=""></div></div><div class="lid"><div class="paper dark" data-label=""></div></div></div>
        <div class="svc-inner">
          <span class="svc-num">04</span>
          <h3>Presentation &amp; Sales</h3>
          <p>Referral packets, presentation folders, and leave-behinds for outreach teams.</p>
          <div class="svc-more">
            <div class="svc-thumbs">
              <div class="t"><div class="paper" data-label="sample [REPLACE]"></div></div>
              <div class="t"><div class="paper" data-label="sample [REPLACE]"></div></div>
              <div class="t"><div class="paper" data-label="sample [REPLACE]"></div></div>
            </div>
          </div>
          <span class="svc-see">See examples <span class="arr">&rarr;</span></span>
        </div>
      </div>
      <div class="svc" data-cursor data-cursor-open>
        <button class="svc-toggle" aria-label="Expand Event &amp; Community"></button>
        <div class="svc-obj lift"><div class="face"><div class="paper" data-label=""></div></div><div class="face"><div class="paper dark" data-label=""></div></div></div>
        <div class="svc-inner">
          <span class="svc-num">05</span>
          <h3>Event &amp; Community</h3>
          <p>Banners, handouts, displays, and promotional assets for events and outreach.</p>
          <div class="svc-more">
            <div class="svc-thumbs">
              <div class="t"><div class="paper" data-label="sample [REPLACE]"></div></div>
              <div class="t"><div class="paper" data-label="sample [REPLACE]"></div></div>
              <div class="t"><div class="paper" data-label="sample [REPLACE]"></div></div>
            </div>
          </div>
          <span class="svc-see">See examples <span class="arr">&rarr;</span></span>
        </div>
      </div>
      <div class="svc" data-cursor data-cursor-open>
        <button class="svc-toggle" aria-label="Expand Video Brochures"></button>
        <div class="svc-obj"><div class="flapL"><div class="paper" data-label=""></div></div><div class="flapR"><div class="paper" data-label=""></div></div><div class="face" style="z-index:-1"><div class="paper dark" data-label=""></div></div></div>
        <div class="svc-inner">
          <span class="svc-num">06</span>
          <h3>Video Brochures</h3>
          <p>Premium print-meets-screen pieces &mdash; see the spotlight below.</p>
          <div class="svc-more">
            <div class="svc-thumbs">
              <div class="t"><div class="paper" data-label="sample [REPLACE]"></div></div>
              <div class="t"><div class="paper" data-label="sample [REPLACE]"></div></div>
              <div class="t"><div class="paper" data-label="sample [REPLACE]"></div></div>
            </div>
          </div>
          <span class="svc-see">See examples <span class="arr">&rarr;</span></span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ========== PROCESS — press-proof monitor ========== -->
<section class="panel ink sec-pad">
  <div class="container container-wide">
    <div class="sec-head" data-reveal>
      <span class="label">Our Process</span>
      <h2>From blank page to <span class="accent">press-ready.</span></h2>
      <p class="sub" style="margin-top:18px;">Hover a phase &mdash; watch a piece go from wireframe to a print-ready proof.</p>
    </div>
    <div class="proc-tabs" data-reveal>
      <button class="proc-tab on" data-proc="0" data-cursor><span class="pnum">01</span><span class="pname">Discovery</span><span class="pbar"></span></button>
      <button class="proc-tab" data-proc="1" data-cursor><span class="pnum">02</span><span class="pname">Design</span><span class="pbar"></span></button>
      <button class="proc-tab" data-proc="2" data-cursor><span class="pnum">03</span><span class="pname">Refine</span><span class="pbar"></span></button>
      <button class="proc-tab" data-proc="3" data-cursor><span class="pnum">04</span><span class="pname">Print &amp; Deliver</span><span class="pbar"></span></button>
    </div>
    <div class="proc-panel-wrap" data-reveal>
      <div class="proc-monitor">
        <div class="proc-detail">
          <div class="step on" data-step="0"><h3>Discovery</h3><p>We review your goals, audience, and existing materials &mdash; and define exactly what each piece needs to do.</p></div>
          <div class="step" data-step="1"><h3>Design</h3><p>We create concepts aligned with your brand and messaging, turning the brief into real layouts.</p></div>
          <div class="step" data-step="2"><h3>Refine</h3><p>We collaborate on revisions and finalize the design &mdash; every edit marked and resolved.</p></div>
          <div class="step" data-step="3"><h3>Print &amp; Deliver</h3><p>We prepare production-ready files or coordinate printing and delivery &mdash; press marks, bleeds, and CMYK all handled.</p></div>
        </div>
        <div class="proc-proof">
          <div class="proof-tag" id="proofTag">WIREFRAME</div>
          <div class="proof-sheet" id="proofSheet">
            <!-- stage 0: wireframe -->
            <div class="proof-stage proof-wire on" data-stage="0">
              <div class="wbox" style="top:8%; height:26%;"></div>
              <div class="wl" style="top:42%;"></div>
              <div class="wl" style="top:52%;"></div>
              <div class="wbox" style="top:62%; height:20%;"></div>
              <div class="wl" style="top:88%; width:40%; left:12%;"></div>
            </div>
            <!-- stage 1: flat comp -->
            <div class="proof-stage proof-comp" data-stage="1">
              <div class="band" style="top:0; height:30%;"></div>
              <div class="img" style="top:36%; height:24%;"></div>
              <div class="ln" style="top:66%;"></div>
              <div class="ln" style="top:73%;"></div>
              <div class="ln" style="top:80%; width:50%;"></div>
            </div>
            <!-- stage 2: revision markup -->
            <div class="proof-stage proof-comp proof-rev" data-stage="2">
              <div class="band" style="top:0; height:30%;"></div>
              <div class="img" style="top:36%; height:24%;"></div>
              <div class="ln" style="top:66%;"></div>
              <div class="ln" style="top:73%;"></div>
              <div class="ln" style="top:80%; width:50%;"></div>
              <div class="circle" style="top:6%; left:18%;"></div>
              <div class="note" style="top:4%; left:42%;">tighten logo</div>
              <div class="mark" style="top:36%; left:14%; right:14%; height:24%;"></div>
              <div class="note" style="top:60%; left:30%;">swap photo</div>
            </div>
            <!-- stage 3: final + registration + cmyk -->
            <div class="proof-stage proof-final" data-stage="3">
              <div class="band"></div>
              <div class="logo"></div>
              <div class="img" style="top:36%; height:24%;"></div>
              <div class="ln" style="top:66%;"></div>
              <div class="ln" style="top:73%;"></div>
              <div class="ln" style="top:80%; width:50%;"></div>
              <div class="reg" style="top:-8px; left:-8px;"></div>
              <div class="reg" style="top:-8px; right:-8px;"></div>
              <div class="reg" style="bottom:-8px; left:-8px;"></div>
              <div class="reg" style="bottom:-8px; right:-8px;"></div>
              <div class="cmyk"><i class="c"></i><i class="m"></i><i class="y"></i><i class="k"></i></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ========== DELIVERABLES ========== -->
<section class="panel ink sec-pad">
  <div class="container container-wide">
    <div class="sec-head" data-reveal>
      <span class="label">What You&rsquo;ll Receive</span>
      <h2>Print-ready, and <span class="lite">yours.</span></h2>
      <p class="sub" style="margin-top:18px;">No guesswork at the print shop &mdash; every project is delivered correctly specced and ready to produce.</p>
    </div>
    <div class="deliv stagger">
      <div class="deliv-item"><div class="ic">&#9636;</div><h4>Print-Ready Files</h4><p>CMYK, bleeds, and crop marks set correctly.</p></div>
      <div class="deliv-item"><div class="ic">&#9635;</div><h4>Editable Source</h4><p>The working files &mdash; you own the design.</p></div>
      <div class="deliv-item"><div class="ic">&#9633;</div><h4>Stock &amp; Finish Specs</h4><p>Paper weight, matte/soft-touch, spot UV.</p></div>
      <div class="deliv-item"><div class="ic">&#9654;</div><h4>Production Coordination</h4><p>We can manage printing and delivery end to end.</p></div>
    </div>
  </div>
</section>

<!-- ========== FEATURED: VIDEO BROCHURE ========== -->
<section class="panel deep sec-pad">
  <div class="container container-wide">
    <div class="vbro" data-reveal>
      <div>
        <span class="label">Signature Product</span>
        <h3>The Video Brochure</h3>
        <p>A printed piece with an embedded HD screen that plays your video the moment it&rsquo;s opened. Almost no facility in senior care hands this to a family &mdash; which is exactly why it&rsquo;s unforgettable when you do.</p>
        <a href="contact" class="btn" data-cursor data-magnetic>Ask About Video Brochures <span class="arr">&rarr;</span></a>
      </div>
      <div class="vbro-visual" data-cursor>
        <div class="paper dark" data-label="video brochure [REPLACE]"></div>
        <div class="play"><span>&#9654;</span></div>
      </div>
    </div>
  </div>
</section>

<!-- ========== FEATURED WORK ========== -->
<section class="panel deep sec-pad" id="work">
  <div class="container container-wide">
    <div class="sec-head center" data-reveal>
      <span class="label">Featured Work</span>
      <h2>A look at the <span class="accent">collateral.</span></h2>
    </div>
    <div class="fw-grid stagger">
      <div class="fw wide" data-cursor>
        <div class="paper dark" data-label="Tri-fold brochure [REPLACE]"></div>
        <div class="cap">Tri-fold brochure</div>
      </div>
      <div class="fw " data-cursor>
        <div class="paper dark" data-label="Business cards [REPLACE]"></div>
        <div class="cap">Business cards</div>
      </div>
      <div class="fw tall" data-cursor>
        <div class="paper dark" data-label="Pull-up banner [REPLACE]"></div>
        <div class="cap">Pull-up banner</div>
      </div>
      <div class="fw " data-cursor>
        <div class="paper dark" data-label="Admissions folder [REPLACE]"></div>
        <div class="cap">Admissions folder</div>
      </div>
      <div class="fw " data-cursor>
        <div class="paper dark" data-label="Postcard mailer [REPLACE]"></div>
        <div class="cap">Postcard mailer</div>
      </div>
      <div class="fw wide" data-cursor>
        <div class="paper dark" data-label="Signage system [REPLACE]"></div>
        <div class="cap">Signage system</div>
      </div>
      <div class="fw " data-cursor>
        <div class="paper dark" data-label="Presentation deck [REPLACE]"></div>
        <div class="cap">Presentation deck</div>
      </div>
      <div class="fw " data-cursor>
        <div class="paper dark" data-label="Video brochure [REPLACE]"></div>
        <div class="cap">Video brochure</div>
      </div>
    </div>
    <div style="text-align:center; margin-top:50px;" data-reveal>
      <a href="contact" class="btn btn-ghost" data-cursor data-magnetic>View Our Work <span class="arr">&rarr;</span></a>
    </div>
  </div>
</section>

<!-- ========== FINAL CTA + WAVE ========== -->
` }} />
  );
}