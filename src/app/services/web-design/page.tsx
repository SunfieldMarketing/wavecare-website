export default function Page() {
  return (
    <main dangerouslySetInnerHTML={{ __html: `

<!-- ========== HERO — self-building browser ========== -->
<header class="whero" id="whero">
  <div class="whero-bg"></div>
  <div class="whero-grid"></div>
  <div class="whero-in">
    <div class="whero-content">
      <svg class="wave-line" viewBox="0 0 120 18" aria-hidden="true"><path d="M2 9 Q17 1 32 9 T62 9 T92 9 T118 9"/></svg>
      <span class="label">Web Design &amp; Management</span>
      <h1>Websites that earn trust and drive <span class="accent">admissions.</span></h1>
      <p class="sub">Modern healthcare websites designed specifically for nursing homes, assisted living communities, rehabilitation centers, and healthcare organizations.</p>
      <div class="whero-ctas">
        <a href="contact" class="btn" data-cursor data-magnetic>Get a Website Audit <span class="arr">&rarr;</span></a>
        <a href="#showcase" class="btn btn-ghost" data-cursor data-magnetic>View Website Examples</a>
      </div>
    </div>
    <div class="build-wrap" id="buildWrap">
      <div class="build-badge" id="buildBadge">BUILDING&hellip;</div>
      <div class="browser build">
        <div class="chrome">
          <div class="dots"><i></i><i></i><i></i></div>
          <div class="urlbar"><span id="urlText"></span><span class="cursor"></span></div>
        </div>
        <div class="viewport">
          <div class="site" id="site">
            <div class="blk nav" data-step="0"><span class="logo-dot"></span><span class="nlinks"><i></i><i></i><i></i></span></div>
            <div class="blk hero" data-step="1">
              <div class="htitle"></div><div class="hsub"></div>
              <div class="hbtn" id="ghostBtn"><span>Book a Tour</span></div>
              <div class="hphoto"></div>
            </div>
            <div class="blk row" data-step="2"><span class="cardlet"></span></div>
            <div class="blk row2" data-step="2"><span class="cardlet"></span></div>
            <div class="blk foot" data-step="3"></div>
          </div>
          <div class="ghost" id="ghost">
            <svg viewBox="0 0 24 24" fill="#fff" stroke="#062A24" stroke-width="1"><path d="M5 3l15 9-6 1.5L17 20l-3 1.3-3-6.4L7 19z"/></svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>

<!-- ========== TRUST STRIP ========== -->
<div class="trust">
  <div class="trust-in">Trusted by healthcare providers improving their online presence, increasing inquiries, and modernizing their brand experience.</div>
</div>

<!-- ========== WHY IT MATTERS — before/after ========== -->
<section class="panel ink sec-pad">
  <div class="container container-wide">
    <div class="twocol">
      <div data-reveal>
        <span class="label">Why Your Website Matters</span>
        <h2>Families decide in <span class="accent">seconds.</span></h2>
        <p class="body-lg" style="margin-top:20px;">An outdated website creates uncertainty. A professional one builds confidence before the first phone call &mdash; it should build trust immediately, communicate services clearly, showcase your team, improve search visibility, and generate more inquiries.</p>
      </div>
      <div data-reveal>
        <div class="ba" id="ba" data-cursor>
          <div class="layer after">
            <div class="site-new">
              <div class="b nav"></div><div class="b h"></div><div class="b c1"></div><div class="b c2"></div><div class="b foot"></div>
            </div>
          </div>
          <div class="layer before" id="baBefore">
            <div class="site-old">
              <div class="b nav"></div><div class="b h"></div><div class="b t1"></div><div class="b t2"></div><div class="b t3"></div>
              <div class="stamp">&copy; 2011 &middot; Best viewed in IE</div>
            </div>
          </div>
          <span class="tagb">Before</span>
          <span class="taga">After</span>
          <div class="handle" id="baHandle"><div class="grip"></div></div>
        </div>
        <p class="ba-note">Drag &mdash; left is a typical dated healthcare site, right is a modern Wavecare build.</p>
      </div>
    </div>
  </div>
</section>

<!-- ========== SERVICES — mini-preview cards ========== -->
<section class="panel deep sec-pad">
  <div class="glow" style="width:520px; height:520px; background:var(--teal-secondary); top:-120px; right:-120px;"></div>
  <div class="container container-wide">
    <div class="sec-head" data-reveal>
      <span class="label">Web Design &amp; Management Services</span>
      <h2>Everything your site needs, <span class="lite">handled.</span></h2>
      <p class="sub" style="margin-top:18px;">Hover any service to see it in action.</p>
    </div>
    <div class="svc-grid stagger">
      <div class="svc" data-cursor>
        <div class="svc-prev"><div class="mini-chrome"><i></i><i></i><i></i></div><div class="mini-stage"><div class="el a"></div><div class="el b"></div><div class="el c"></div></div></div>
        <div class="svc-body">
          <h3>Website Design</h3>
          <p>Custom healthcare-focused design built around your brand and goals.</p>
        </div>
      </div>
      <div class="svc" data-cursor>
        <div class="svc-prev"><div class="mini-chrome"><i></i><i></i><i></i></div><div class="mini-stage"><div class="el a"></div><div class="el b"></div><div class="el c"></div></div></div>
        <div class="svc-body">
          <h3>Website Development</h3>
          <p>Fast, responsive websites optimized for desktop, tablet, and mobile.</p>
        </div>
      </div>
      <div class="svc" data-cursor>
        <div class="svc-prev"><div class="mini-chrome"><i></i><i></i><i></i></div><div class="mini-stage"><div class="el a"></div><div class="el b"></div><div class="el c"></div></div></div>
        <div class="svc-body">
          <h3>Website Management</h3>
          <p>Ongoing updates, content changes, maintenance, and support.</p>
        </div>
      </div>
      <div class="svc" data-cursor>
        <div class="svc-prev seo"><div class="mini-chrome"><i></i><i></i><i></i></div><div class="mini-stage"><div class="el bar b1"></div><div class="el bar b2"></div><div class="el bar b3"></div><div class="el bar b4"></div><div class="el bar b5"></div></div></div>
        <div class="svc-body">
          <h3>SEO Foundations</h3>
          <p>Technical setup and optimization to help improve search visibility.</p>
        </div>
      </div>
      <div class="svc" data-cursor>
        <div class="svc-prev"><div class="mini-chrome"><i></i><i></i><i></i></div><div class="mini-stage"><div class="el a"></div><div class="el b"></div><div class="el c"></div></div></div>
        <div class="svc-body">
          <h3>Content Strategy</h3>
          <p>Clear messaging that helps families quickly find what they need.</p>
        </div>
      </div>
      <div class="svc" data-cursor>
        <div class="svc-prev host"><div class="mini-chrome"><i></i><i></i><i></i></div><div class="mini-stage"><div class="el dot"></div></div></div>
        <div class="svc-body">
          <h3>Hosting &amp; Performance</h3>
          <p>Reliable hosting and monitoring to keep your site running smoothly.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ========== PROCESS — build monitor ========== -->
<section class="panel ink sec-pad">
  <div class="container container-wide">
    <div class="sec-head" data-reveal>
      <span class="label">Your Complete Web Team</span>
      <h2>From audit to <span class="accent">always-on.</span></h2>
      <p class="sub" style="margin-top:18px;">Hover a phase &mdash; watch a site go from flagged audit to a live, managed website.</p>
    </div>
    <div class="proc-tabs" data-reveal>
      <button class="proc-tab on" data-proc="0" data-cursor><span class="pnum">01</span><span class="pname">Audit</span><span class="pbar"></span></button>
      <button class="proc-tab" data-proc="1" data-cursor><span class="pnum">02</span><span class="pname">Design</span><span class="pbar"></span></button>
      <button class="proc-tab" data-proc="2" data-cursor><span class="pnum">03</span><span class="pname">Build</span><span class="pbar"></span></button>
      <button class="proc-tab" data-proc="3" data-cursor><span class="pnum">04</span><span class="pname">Manage</span><span class="pbar"></span></button>
    </div>
    <div class="proc-panel-wrap" data-reveal>
      <div class="proc-monitor">
        <div class="proc-detail">
          <div class="step on" data-step="0"><h3>Audit</h3><p>We review your current website, identify opportunities and problems, and create a strategic plan.</p></div>
          <div class="step" data-step="1"><h3>Design</h3><p>We create a modern website experience tailored to your facility and audience.</p></div>
          <div class="step" data-step="2"><h3>Build</h3><p>Our team develops and launches your website with performance and usability in mind.</p></div>
          <div class="step" data-step="3"><h3>Manage</h3><p>We provide ongoing support, updates, and improvements after launch &mdash; so it keeps performing.</p></div>
        </div>
        <div class="proc-screen">
          <div class="proc-tag" id="procTag">AUDIT</div>
          <div class="browser bmon">
            <div class="chrome"><div class="dots"><i></i><i></i><i></i></div><div class="urlbar">yourfacility.org</div></div>
            <div class="viewport">
              <!-- audit -->
              <div class="bstage audit on" data-stage="0">
                <div class="old"><div class="l" style="top:6%"></div><div class="l" style="top:26%; height:18%"></div><div class="l" style="top:52%"></div><div class="l" style="top:64%; width:60%"></div></div>
                <div class="flag" style="top:10%; left:12%;">!</div>
                <div class="flag" style="top:30%; right:14%;">!</div>
                <div class="flag" style="top:58%; left:20%;">!</div>
              </div>
              <!-- wireframe -->
              <div class="bstage wire" data-stage="1">
                <div class="w" style="top:8%; height:9%;"></div>
                <div class="w" style="top:22%; height:28%;"></div>
                <div class="w" style="top:54%; height:14%; right:54%;"></div>
                <div class="w" style="top:54%; height:14%; left:48%;"></div>
                <div class="w" style="top:72%; height:16%;"></div>
              </div>
              <!-- build -->
              <div class="bstage build" data-stage="2">
                <div class="b nav"></div><div class="b h"></div><div class="b c1"></div><div class="b c2"></div>
              </div>
              <!-- manage -->
              <div class="bstage manage" data-stage="3">
                <div class="up">LIVE &middot; 99.9% UPTIME</div>
                <div class="card" style="left:8%; top:20%; width:36%; height:32%;"><div class="n">+38%</div><div class="t">Inquiries</div></div>
                <div class="card" style="right:8%; top:20%; width:36%; height:32%;"><div class="n">1.2s</div><div class="t">Load Time</div></div>
                <div class="card" style="left:8%; top:58%; width:36%; height:30%;"><div class="n">A+</div><div class="t">SEO Health</div></div>
                <div class="card" style="right:8%; top:58%; width:36%; height:30%;"><div class="n">24/7</div><div class="t">Monitoring</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ========== FEATURED WEBSITE SHOWCASE ========== -->
<section class="panel deep sec-pad" id="showcase">
  <div class="container container-wide">
    <div class="sec-head center" data-reveal>
      <span class="label">Featured Website Showcase</span>
      <h2>Recent <span class="accent">healthcare</span> sites.</h2>
    </div>
    <div class="show-grid stagger">
      <div class="show" data-cursor>
        <div class="browser"><div class="chrome"><div class="dots"><i></i><i></i><i></i></div><div class="urlbar">[REPLACE &middot; project URL]</div></div>
          <div class="viewport"><div class="ph" data-label="homepage screenshot [REPLACE]"></div></div></div>
        <div class="cap"><h3>[REPLACE &mdash; Facility name]</h3><p>Website Design &amp; Build &middot; [REPLACE summary]</p></div>
      </div>
      <div class="show" data-cursor>
        <div class="browser"><div class="chrome"><div class="dots"><i></i><i></i><i></i></div><div class="urlbar">[REPLACE &middot; project URL]</div></div>
          <div class="viewport"><div class="ph" data-label="homepage screenshot [REPLACE]"></div></div></div>
        <div class="cap"><h3>[REPLACE &mdash; Facility name]</h3><p>Website Design &amp; Build &middot; [REPLACE summary]</p></div>
      </div>
    </div>
    <div style="text-align:center; margin-top:50px;" data-reveal>
      <a href="contact" class="btn btn-ghost" data-cursor data-magnetic>View Website Examples <span class="arr">&rarr;</span></a>
    </div>
  </div>
</section>

<!-- ========== WHAT MAKES A GREAT SITE ========== -->
<section class="panel ink sec-pad">
  <div class="container container-wide">
    <div class="sec-head center" data-reveal>
      <span class="label">What Makes a Great Healthcare Website</span>
      <h2>Five things we never <span class="lite">skip.</span></h2>
    </div>
    <div class="pts stagger">
      <div class="pt">
        <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18M3 12h18M3 18h12"/></svg></div>
        <h4>Easy Navigation</h4>
        <p>Families can quickly find important information.</p>
      </div>
      <div class="pt">
        <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z"/></svg></div>
        <h4>Thoughtful Design</h4>
        <p>Creates confidence and credibility.</p>
      </div>
      <div class="pt">
        <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/></svg></div>
        <h4>Mobile Friendly</h4>
        <p>Works seamlessly across all devices.</p>
      </div>
      <div class="pt">
        <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h12M13 7l5 5-5 5"/></svg></div>
        <h4>Clear Calls-to-Action</h4>
        <p>Encourages visitors to contact your team.</p>
      </div>
      <div class="pt">
        <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg></div>
        <h4>Search Optimized</h4>
        <p>Helps residents and families find you online.</p>
      </div>
    </div>
  </div>
</section>

<!-- ========== FINAL CTA + WAVE ========== -->
` }} />
  );
}