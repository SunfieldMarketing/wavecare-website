export default function Page() {
  return (
    <main dangerouslySetInnerHTML={{ __html: `
 
<!-- ========== HERO (video-reveal) ========== -->
<header class="hero" id="hero">
  <!-- Full-bleed video layer (revealed on scroll). [REPLACE] poster + src with real footage. -->
  <div class="hero-video" id="heroVideo">
    <video id="heroVid" autoplay muted loop playsinline
      poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='9'%3E%3Crect width='16' height='9' fill='%230a3a32'/%3E%3C/svg%3E">
      <!-- [REPLACE] <source src="your-reel.mp4" type="video/mp4"> -->
    </video>
    <div class="hero-vfallback" data-label="hero reel &middot; [REPLACE video src]"></div>
    <div class="hero-vtint"></div>
  </div>
 
  <!-- Masked headline: the text is a window into the same footage -->
  <div class="hero-in">
    <div class="hero-content">
      <svg class="wave-line" viewBox="0 0 120 18" aria-hidden="true"><path d="M2 9 Q17 1 32 9 T62 9 T92 9 T118 9"/></svg>
      <span class="label">Video Production</span>
      <h1 class="hero-h1">
        <span class="line">Show families the <span class="accent">heart</span></span>
        <span class="line">behind your care.</span>
      </h1>
      <p class="sub">Strategic healthcare video that highlights your team, facility, services, and resident experience &mdash; built to earn trust before families ever walk through your doors.</p>
      <div class="hero-ctas">
        <a href="contact" class="btn" data-cursor data-magnetic>Book a Call <span class="arr">&rarr;</span></a>
        <a href="#reel" class="btn btn-ghost" data-cursor data-magnetic>Watch Our Reel</a>
      </div>
    </div>
  </div>
  <div class="hero-scrollcue" aria-hidden="true"><span></span></div>
</header>
 
<!-- ========== TRUST STRIP ========== -->
<div class="trust">
  <div class="trust-in">
    <span>Senior Care &amp; Skilled Nursing</span><span class="dot"></span>
    <span>Assisted Living</span><span class="dot"></span>
    <span>Rehabilitation Centers</span><span class="dot"></span>
    <span>Memory Care</span><span class="dot"></span>
    <span>Medical Practices</span>
  </div>
</div>
 
<!-- ========== FEATURED REEL ========== -->
<section class="panel ink sec-pad" id="reel">
  <div class="container">
    <div class="sec-head center" data-reveal>
      <span class="label">Our Commercial</span>
      <h2>The work, in <span class="lite">motion.</span></h2>
    </div>
    <div class="reel-wrap" data-reveal>
      <div class="reel-frame" data-cursor data-cursor-play>
        <iframe src="https://player.vimeo.com/video/1187767005?title=0&byline=0&portrait=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
      </div>
      <p class="reel-cap">A two-minute look at what we mean by &ldquo;Built for Healthcare.&rdquo;</p>
    </div>
  </div>
</section>
 
<!-- ========== WHY VIDEO MATTERS ========== -->
<section class="panel light sec-pad">
  <div class="container">
    <div class="twocol">
      <div data-reveal>
        <span class="label dark">Why Video Matters</span>
        <h2>Families decide <span class="lite">before</span> they ever visit.</h2>
      </div>
      <div data-reveal>
        <p class="body-lg">Most families have already formed an opinion before they pick up the phone. Professional video lets them experience your environment, meet your team, and feel the level of care you provide &mdash; in the same seconds they&rsquo;d otherwise spend scrolling past you.</p>
        <p class="body-lg" style="margin-top:20px;">Done right, video doesn&rsquo;t just market the facility. It pre-qualifies the inquiry.</p>
      </div>
    </div>
  </div>
</section>
 
<!-- ========== WHAT WE PRODUCE (skim layer) ========== -->
<section class="panel ink sec-pad">
  <div class="glow" style="width:520px; height:520px; background:var(--teal-secondary); top:-120px; right:-120px;"></div>
  <div class="container">
    <div class="sec-head" data-reveal>
      <span class="label">What We Produce</span>
      <h2>Four kinds of video, <span class="accent">one standard.</span></h2>
      <p class="sub" style="margin-top:18px;">Every project is shot, edited, and delivered to the same standard &mdash; whether it&rsquo;s a 90-second hero film or a 15-second cut for Instagram.</p>
    </div>
    <div class="prod-grid stagger">
      <div class="prod-card">
        <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-7h6v7"/></svg></div>
        <h3>Facility Films</h3>
        <p>Hero videos for homepages, virtual tours, and admissions packets &mdash; the kind families watch before booking a visit.</p>
        <a href="#" class="sample" data-cursor>View Sample <span class="arr">&rarr;</span></a>
      </div>
      <div class="prod-card">
        <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15 20c0-2.2 1.8-4 4-4s2 1 2 1"/></svg></div>
        <h3>Family-Facing Stories</h3>
        <p>Welcome videos, resident testimonials, and care journeys that turn the abstract into the personal.</p>
        <a href="#" class="sample" data-cursor>View Sample <span class="arr">&rarr;</span></a>
      </div>
      <div class="prod-card">
        <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="3.5"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8M16 5l2 2 4-4"/></svg></div>
        <h3>Recruitment &amp; Culture</h3>
        <p>Films that attract caregivers and clinical staff by showing the team and culture, not the job description.</p>
        <a href="#" class="sample" data-cursor>View Sample <span class="arr">&rarr;</span></a>
      </div>
      <div class="prod-card">
        <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3.5"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg></div>
        <h3>Social &amp; Service Cuts</h3>
        <p>Vertical edits, service-line spots, and short-form content sized for the platforms your audience actually scrolls.</p>
        <a href="#" class="sample" data-cursor>View Sample <span class="arr">&rarr;</span></a>
      </div>
    </div>
  </div>
</section>
 
<!-- ========== PROCESS — accordion ========== -->
<section class="panel deep sec-pad">
  <div class="container container-wide">
    <div class="sec-head" data-reveal>
      <span class="label">Our Process</span>
      <h2>From first call to <span class="accent">final cut.</span></h2>
      <p class="sub" style="margin-top:18px;">Four phases, fully managed. Hover or tap a phase to see what happens inside it.</p>
    </div>
    <div class="proc-tabs" data-reveal>
      <button class="proc-tab on" data-proc="0" data-cursor>
        <span class="pnum">01</span>
        <span class="pname">Discovery &amp; Planning</span>
        <span class="pbar"></span>
      </button>
      <button class="proc-tab" data-proc="1" data-cursor>
        <span class="pnum">02</span>
        <span class="pname">Pre-Production</span>
        <span class="pbar"></span>
      </button>
      <button class="proc-tab" data-proc="2" data-cursor>
        <span class="pnum">03</span>
        <span class="pname">Production Day</span>
        <span class="pbar"></span>
      </button>
      <button class="proc-tab" data-proc="3" data-cursor>
        <span class="pnum">04</span>
        <span class="pname">Post &amp; Delivery</span>
        <span class="pbar"></span>
      </button>
    </div>
    <div class="proc-panel-wrap" data-reveal>
      <div class="proc-monitor">
        <div class="proc-detail">
        <div class="step on" data-step="0">
          <h3>Discovery &amp; Planning</h3>
          <p>We start with a strategy session to understand your facility, your audience, and what success looks like &mdash; then build a project plan around it.</p>
          <div class="chips"><span class="chip">Strategy Session</span><span class="chip">Goals &amp; Messaging</span><span class="chip">Project Timeline</span></div>
        </div>
        <div class="step" data-step="1">
          <h3>Pre-Production</h3>
          <p>We handle scripts, shot lists, interview prep, and on-site logistics with your team. Your staff focuses on residents; we handle everything else.</p>
          <div class="chips"><span class="chip">Scripting &amp; Storyboarding</span><span class="chip">Interview Prep</span><span class="chip">On-Site Coordination</span></div>
        </div>
        <div class="step" data-step="2">
          <h3>Production Day</h3>
          <p>A small, calm crew captures interviews, facility footage, resident lifestyle moments, and aerial coverage &mdash; respectful of residents and routines at every step.</p>
          <div class="chips"><span class="chip">Leadership &amp; Staff Interviews</span><span class="chip">Facility &amp; Lifestyle Footage</span><span class="chip">Aerial / Drone</span></div>
        </div>
        <div class="step" data-step="3">
          <h3>Post &amp; Delivery</h3>
          <p>Editing, color, sound, motion graphics, and captioning &mdash; finished in formats sized for every place your video will live.</p>
          <div class="chips"><span class="chip">Editing &amp; Color</span><span class="chip">Motion Graphics</span><span class="chip">Multi-Platform Exports</span></div>
        </div>
        </div>
        <div class="proc-screen">
          <div class="rec"><span class="led"></span>REC</div>
          <div class="grade-tag" id="gradeTag">RAW &middot; UNGRADED</div>
        <div class="scene on" data-scene="0" data-label="discovery / planning"></div>
        <div class="scene" data-scene="1" data-label="pre-production / prep"></div>
        <div class="scene" data-scene="2" data-label="production / film day"></div>
        <div class="scene" data-scene="3" data-label="post / delivery"></div>
          <div class="scanline"></div>
          <div class="tc" id="procTC">00:00:00:00</div>
          <div class="bars"><i></i><i></i><i></i><i></i><i></i></div>
        </div>
      </div>
    </div>
  </section>
 
<!-- ========== TYPES — filterable grid (detail layer) ========== -->
<section class="panel ink sec-pad">
  <div class="container container-wide">
    <div class="sec-head center" data-reveal>
      <span class="label">Types of Videos</span>
      <h2>Built for where it <span class="lite">lives.</span></h2>
      <p class="sub" style="margin:18px auto 0;">Every video is purpose-built for the place it will actually be seen &mdash; the website, the tour, the inbox, the feed.</p>
    </div>
    <div class="filter-bar" data-reveal>
      <button class="fchip on" data-filter="all" data-cursor data-cursor-count="15 videos">All</button>
      <button class="fchip" data-filter="facility" data-cursor data-cursor-count="3 videos">Facility Tour</button>
      <button class="fchip" data-filter="family" data-cursor data-cursor-count="3 videos">Family-Facing</button>
      <button class="fchip" data-filter="recruit" data-cursor data-cursor-count="3 videos">Recruitment</button>
      <button class="fchip" data-filter="testimonial" data-cursor data-cursor-count="3 videos">Testimonial</button>
      <button class="fchip" data-filter="social" data-cursor data-cursor-count="3 videos">Social</button>
    </div>
    <div class="types-grid stagger">
      <div class="tcard" data-cursor-play data-cat="facility">
        <div class="thumb" data-label="facility overview"><div class="play"><span>&#9654;</span></div></div>
        <div class="body"><h3>Facility Overview</h3><p>The cornerstone film &mdash; spaces, team, and standard of care.</p><div class="where">Homepage hero &middot; YouTube</div></div>
      </div>
      <div class="tcard" data-cursor-play data-cat="facility">
        <div class="thumb" data-label="website hero loop"><div class="play"><span>&#9654;</span></div></div>
        <div class="body"><h3>Website Hero Loop</h3><p>Short, silent loops that autoplay above the fold without distraction.</p><div class="where">Website hero &middot; Landing pages</div></div>
      </div>
      <div class="tcard" data-cursor-play data-cat="facility">
        <div class="thumb" data-label="amenities walkthrough"><div class="play"><span>&#9654;</span></div></div>
        <div class="body"><h3>Amenities Walkthrough</h3><p>A guided look at dining, activities, therapy spaces, and grounds.</p><div class="where">Tours page &middot; Admissions packet</div></div>
      </div>
      <div class="tcard" data-cursor-play data-cat="family">
        <div class="thumb" data-label="family welcome"><div class="play"><span>&#9654;</span></div></div>
        <div class="body"><h3>Family Welcome</h3><p>A warm introduction sent before the first tour. Calms the unknown.</p><div class="where">Email &middot; Admissions packet</div></div>
      </div>
      <div class="tcard" data-cursor-play data-cat="family">
        <div class="thumb" data-label="care journey"><div class="play"><span>&#9654;</span></div></div>
        <div class="body"><h3>Care Journey</h3><p>Walks a family through what daily life and care really look like.</p><div class="where">Website &middot; Email nurture</div></div>
      </div>
      <div class="tcard" data-cursor-play data-cat="family">
        <div class="thumb" data-label="service line video"><div class="play"><span>&#9654;</span></div></div>
        <div class="body"><h3>Service Line Spot</h3><p>Focused pieces for memory care, rehab, hospice, or key service lines.</p><div class="where">Service pages &middot; Ads</div></div>
      </div>
      <div class="tcard" data-cursor-play data-cat="recruit">
        <div class="thumb" data-label="recruitment"><div class="play"><span>&#9654;</span></div></div>
        <div class="body"><h3>Recruitment Film</h3><p>Shows the team and culture &mdash; what the job feels like, not just what it pays.</p><div class="where">Careers page &middot; LinkedIn</div></div>
      </div>
      <div class="tcard" data-cursor-play data-cat="recruit">
        <div class="thumb" data-label="day in the life"><div class="play"><span>&#9654;</span></div></div>
        <div class="body"><h3>Day in the Life</h3><p>Follows a caregiver through a shift to attract the right candidates.</p><div class="where">Careers page &middot; Indeed</div></div>
      </div>
      <div class="tcard" data-cursor-play data-cat="recruit">
        <div class="thumb" data-label="staff spotlight"><div class="play"><span>&#9654;</span></div></div>
        <div class="body"><h3>Staff Spotlight</h3><p>Short profiles that put real faces to your employer brand.</p><div class="where">Social &middot; Careers page</div></div>
      </div>
      <div class="tcard" data-cursor-play data-cat="testimonial">
        <div class="thumb" data-label="resident testimonial"><div class="play"><span>&#9654;</span></div></div>
        <div class="body"><h3>Resident &amp; Family Testimonial</h3><p>Real stories from real families &mdash; the most persuasive video you can publish.</p><div class="where">Website &middot; Sales materials</div></div>
      </div>
      <div class="tcard" data-cursor-play data-cat="testimonial">
        <div class="thumb" data-label="staff testimonial"><div class="play"><span>&#9654;</span></div></div>
        <div class="body"><h3>Staff Testimonial</h3><p>Team members on why they stay &mdash; trust for families and recruits alike.</p><div class="where">Careers &middot; About page</div></div>
      </div>
      <div class="tcard" data-cursor-play data-cat="testimonial">
        <div class="thumb" data-label="referral partner"><div class="play"><span>&#9654;</span></div></div>
        <div class="body"><h3>Referral Partner Story</h3><p>Physicians and discharge planners on why they refer to you.</p><div class="where">Sales deck &middot; Outreach</div></div>
      </div>
      <div class="tcard" data-cursor-play data-cat="social">
        <div class="thumb" data-label="social vertical"><div class="play"><span>&#9654;</span></div></div>
        <div class="body"><h3>Social Vertical Cut</h3><p>9:16 edits of your hero footage, sized for Instagram, TikTok, and Reels.</p><div class="where">Instagram &middot; TikTok</div></div>
      </div>
      <div class="tcard" data-cursor-play data-cat="social">
        <div class="thumb" data-label="event recap"><div class="play"><span>&#9654;</span></div></div>
        <div class="body"><h3>Event Recap</h3><p>Quick highlight reels from community events and open houses.</p><div class="where">Facebook &middot; Instagram</div></div>
      </div>
      <div class="tcard" data-cursor-play data-cat="social">
        <div class="thumb" data-label="seasonal short"><div class="play"><span>&#9654;</span></div></div>
        <div class="body"><h3>Seasonal Short</h3><p>Holiday and milestone moments that keep your feed warm and active.</p><div class="where">Social feeds</div></div>
      </div>
    </section>
 
<!-- ========== FEATURED WORK ========== -->
<section class="panel deep sec-pad">
  <div class="container container-wide">
    <div class="sec-head" data-reveal>
      <span class="label">Featured Work</span>
      <h2>Recent <span class="accent">healthcare</span> films.</h2>
    </div>
    <div class="fw-grid stagger">
      <!-- [REPLACE] set href to the real Vimeo/landing link for each project -->
      <a href="#" class="fw-card hero" data-cursor data-cursor-play>
        <div class="ph-bg" data-label="Commercial &middot; [REPLACE link]"><div class="play"><span>&#9654;</span></div></div>
        <div class="fw-meta"><span class="tag">Commercial</span><span class="title">[REPLACE &mdash; Project name]</span></div>
      </a>
      <div class="fw-side">
        <a href="#" class="fw-card small" data-cursor data-cursor-play>
          <div class="ph-bg" data-label="Virtual tour &middot; [REPLACE link]"><div class="play"><span>&#9654;</span></div></div>
          <div class="fw-meta"><span class="tag">Virtual Tour</span><span class="title">[REPLACE &mdash; Facility name]</span></div>
        </a>
        <a href="#" class="fw-card small" data-cursor data-cursor-play>
          <div class="ph-bg" data-label="Testimonial &middot; [REPLACE link]"><div class="play"><span>&#9654;</span></div></div>
          <div class="fw-meta"><span class="tag">Testimonial</span><span class="title">[REPLACE &mdash; Family name]</span></div>
        </a>
      </div>
    </div>
  </div>
</section>
 
<!-- ========== DELIVERABLES ========== -->
<section class="panel ink sec-pad">
  <div class="container">
    <div class="sec-head" data-reveal>
      <span class="label">What You&rsquo;ll Receive</span>
      <h2>Finished, formatted, <span class="lite">ready to use.</span></h2>
      <p class="sub" style="margin-top:18px;">Every project ships with the cuts and formats you actually need &mdash; nothing left for you to figure out in post.</p>
    </div>
    <div class="deliv stagger">
      <div class="deliv-item"><div class="ic">&#9646;</div><h4>Master 16:9 Cuts</h4><p>Web, YouTube, presentations.</p></div>
      <div class="deliv-item"><div class="ic">&#9647;</div><h4>Vertical Social Cuts</h4><p>9:16 for Reels, TikTok, Stories.</p></div>
      <div class="deliv-item"><div class="ic">cc</div><h4>Captioned Versions</h4><p>Burned-in and SRT for accessibility.</p></div>
      <div class="deliv-item"><div class="ic">&#8635;</div><h4>Raw Footage Archive</h4><p>Organized and delivered for future use.</p></div>
    </div>
  </div>
</section>
 
<!-- ========== FINAL CTA + WAVE ========== -->
` }} />
  );
}