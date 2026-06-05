$files = Get-ChildItem -Path "d:\Downloads\wavecare own Design" -Filter *.html
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    if ($content -notmatch "\.nav-dropdown") {
        # Inject CSS
        $css = @"
  /* Dropdown */
  .nav-dropdown { position: relative; display: inline-block; }
  .dropdown-content { 
    visibility: hidden; opacity: 0; position: absolute; top: 100%; left: 50%; transform: translateX(-50%) translateY(10px);
    background: rgba(6,42,36,0.95); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); 
    border-radius: 8px; padding: 12px 0; min-width: 180px; transition: all 0.3s ease; z-index: 1001;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3); display: flex; flex-direction: column; text-align: center;
  }
  .nav-dropdown:hover .dropdown-content { visibility: visible; opacity: 1; transform: translateX(-50%) translateY(0); }
  .dropdown-content a { padding: 10px 20px !important; color: rgba(255,255,255,0.82) !important; font-size: 13.5px !important; transition: background 0.2s, color 0.2s; white-space: nowrap; border: none !important; }
  .dropdown-content a:hover { background: rgba(95,208,191,0.15) !important; color: #fff !important; }
  .dropdown-content a::after { display: none !important; }
</style>
"@
        $content = $content -replace "</style>", $css
        
        # Inject HTML dropdown into nav-links only
        $html = @"
      <div class="nav-dropdown">
        <a href="services.html" data-cursor>Services ▾</a>
        <div class="dropdown-content">
          <a href="photoservices.html" data-cursor>Brand & Photoshoots</a>
          <a href="videoservices.html" data-cursor>Video Production</a>
          <a href="design-print.html" data-cursor>Design & Print</a>
          <a href="webdesign.html" data-cursor>Web Design</a>
        </div>
      </div>
"@
        $content = [regex]::Replace($content, "(?s)(<div class=`"nav-links`">.*?)(<a href=`"[^`"]+`"(?: class=`"active`")? data-cursor>Services</a>)", "`$1$html", 1)
        
        Set-Content -Path $file.FullName -Value $content
    }
}
