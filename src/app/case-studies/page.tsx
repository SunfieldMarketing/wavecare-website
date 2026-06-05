export default function Page() {
  return (
    <main dangerouslySetInnerHTML={{ __html: `
 
<header class="hero">
  <div class="hero-bg">
    <!-- [REPLACE] hero.jpg (caregiver + resident) — swap .ph for <img src="..." alt="Caregiver with resident"> -->
    <div class="ph" data-label="hero.jpg &middot; caregiver + resident"></div>
  </div>
  <div class="hero-overlay"></div>
  <div class="hero-in">
    <div class="hero-content">
      <svg class="wave-line" viewBox="0 0 120 18" aria-hidden="true"><path d="M2 9 Q17 1 32 9 T62 9 T92 9 T118 9"/></svg>
      <span class="label">Case Studies</span>
      <h1>The work behind <span class="accent">the trust.</span></h1>
      <p class="sub">Real facilities. Real families finding the right care. See how we help healthcare brands look as good as the care they provide.</p>
      <div class="hero-ctas">
        <a href="#work" class="btn" data-cursor data-magnetic>See the projects <span class="arr">&rarr;</span></a>
        <a href="contact" class="btn btn-ghost" data-cursor data-magnetic>Book a Call</a>
      </div>
    </div>
  </div>
</header>
 
<section class="panel light sec-pad">
  <div class="container">
    <div class="sec-head" data-reveal>
      <span class="label dark">Built for Healthcare</span>
      <h2>Families judge a facility in seconds. <span class="accent">We make those seconds count.</span></h2>
      <p class="sub" style="margin-top:18px;">Every project below started the same way &mdash; a facility that wasn't being seen the way it deserved. Here's what changed once it was.</p>
    </div>
  </div>
</section>
 
<section class="panel ink sec-pad" id="work">
  <div class="glow" style="width:520px; height:520px; background:var(--teal-secondary); top:-120px; right:-120px;"></div>
  <div class="container">
    <div class="sec-head center" data-reveal>
      <span class="label">Selected Projects</span>
      <h2>Results we're <span class="lite">proud of.</span></h2>
    </div>
    <div class="cs-grid stagger">
 
      <a href="index.html/case-studies/park-gardens" class="cs-card" data-cursor>
        <div class="cs-media">
          <!-- [REPLACE] park_garden_website_full_page.jpg -->
          <div class="ph"><span>[REPLACE &mdash; Park Gardens website screenshot]</span></div>
          <div class="cs-tag"><span>Web Design</span><span>Photography</span></div>
        </div>
        <div class="cs-body">
          <div class="cs-client">Park Gardens Rehabilitation &amp; Nursing</div>
          <h3>A skilled nursing site that finally matched the care inside.</h3>
          <p class="cs-desc">A full website rebuild and on-site photoshoot that gave families a real first impression &mdash; warm, clear, and built to convert tours.</p>
          <div class="cs-result"><span class="num">[RESULT]%</span><span class="lbl">more qualified inquiries</span></div>
          <span class="cs-go">View case study <span class="arr">&rarr;</span></span>
        </div>
      </a>
 
      <a href="index.html/case-studies/project-two" class="cs-card" data-cursor>
        <div class="cs-media">
          <div class="ph"><span>[REPLACE &mdash; project image]</span></div>
          <div class="cs-tag"><span>Video Production</span></div>
        </div>
        <div class="cs-body">
          <div class="cs-client">[REPLACE &mdash; Facility / Client name]</div>
          <h3>A facility tour film that booked the room.</h3>
          <p class="cs-desc">[REPLACE &mdash; one-line summary: what they came to us for and what we delivered.]</p>
          <div class="cs-result"><span class="num">[RESULT]</span><span class="lbl">[REPLACE &mdash; metric label]</span></div>
          <span class="cs-go">View case study <span class="arr">&rarr;</span></span>
        </div>
      </a>
 
      <a href="index.html/case-studies/project-three" class="cs-card" data-cursor>
        <div class="cs-media">
          <div class="ph"><span>[REPLACE &mdash; project image]</span></div>
          <div class="cs-tag"><span>Design &amp; Print</span><span>Branding</span></div>
        </div>
        <div class="cs-body">
          <div class="cs-client">[REPLACE &mdash; Facility / Client name]</div>
          <h3>A brand refresh that aged up the perception, not the people.</h3>
          <p class="cs-desc">[REPLACE &mdash; one-line summary: what they came to us for and what we delivered.]</p>
          <div class="cs-result"><span class="num">[RESULT]</span><span class="lbl">[REPLACE &mdash; metric label]</span></div>
          <span class="cs-go">View case study <span class="arr">&rarr;</span></span>
        </div>
      </a>
 
      <a href="index.html/case-studies/project-four" class="cs-card" data-cursor>
        <div class="cs-media">
          <div class="ph"><span>[REPLACE &mdash; project image]</span></div>
          <div class="cs-tag"><span>Advertising</span></div>
        </div>
        <div class="cs-body">
          <div class="cs-client">[REPLACE &mdash; Facility / Client name]</div>
          <h3>Ad spend that finally filled beds, not just clicks.</h3>
          <p class="cs-desc">[REPLACE &mdash; one-line summary: what they came to us for and what we delivered.]</p>
          <div class="cs-result"><span class="num">[RESULT]</span><span class="lbl">[REPLACE &mdash; metric label]</span></div>
          <span class="cs-go">View case study <span class="arr">&rarr;</span></span>
        </div>
      </a>
 
    </div>
  </div>
</section>
 
<section class="panel deep sec-pad">
  <div class="container">
    <div class="sec-head center" data-reveal>
      <span class="label">By the Numbers</span>
      <h2>A decade of <span class="accent">getting it right.</span></h2>
    </div>
    <div class="stats stagger">
      <div class="stat"><div class="n" data-count="10">0</div><div class="t">Years in Healthcare</div></div>
      <div class="stat"><div class="n" data-count="500" data-suffix="+">0</div><div class="t">Facilities Served</div></div>
      <div class="stat"><div class="n" data-count="700">0</div><div class="t">Assisted Placements</div></div>
      <div class="stat"><div class="n" data-count="2400" data-comma="1">0</div><div class="t">Smiles Captured</div></div>
    </div>
  </div>
</section>
 
` }} />
  );
}