const GEAR =
  '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>';
const CURSOR = '<path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/>';
const IMG = '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>';
const SERVER =
  '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line>';
const CHECK = '<polyline points="20 6 9 17 4 12"></polyline>';

/**
 * The six fixed mini browser-window mockups from the "Everything Your Site
 * Needs" grid. Each is a small hand-styled animation preview — decorative UI
 * chrome, not editable content — selected per card via the `visual` field.
 */
export default function CapabilityMockup({ visual, label }: { visual: string; label: string }) {
  const inner = () => {
    switch (visual) {
      case 'design':
        return (
          <div className="anim-design">
            <div className="sidebar" />
            <div className="main">
              <div className="header" />
              <div className="grid-boxes">
                <div />
                <div />
                <div />
                <div />
              </div>
            </div>
          </div>
        );
      case 'dev':
        return (
          <div className="anim-dev">
            <div className="code-line w-full" />
            <div className="code-line w-2-3 ml-4" />
            <div className="code-line w-1-2 ml-8" />
            <div className="code-line w-1-3 ml-8" />
            <div className="code-line w-3-4 ml-4" />
            <div className="code-brackets">{'</>'}</div>
          </div>
        );
      case 'manage':
        return (
          <div className="anim-manage">
            <div className="gear-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: GEAR }} />
            </div>
            <div className="status-badge">Healthy</div>
          </div>
        );
      case 'seo':
        return (
          <div className="anim-seo">
            <div className="bars">
              <div className="bar" />
              <div className="bar" />
              <div className="bar" />
              <div className="bar" />
              <div className="bar" />
            </div>
            <div className="cursor-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--teal-bright)" stroke="#062a24" strokeWidth="1.5" dangerouslySetInnerHTML={{ __html: CURSOR }} />
            </div>
          </div>
        );
      case 'content':
        return (
          <div className="anim-content">
            <div className="content-lines">
              <div className="cline w-3-4" />
              <div className="cline w-full" />
              <div className="cline w-5-6" />
            </div>
            <div className="content-img">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" dangerouslySetInnerHTML={{ __html: IMG }} />
            </div>
          </div>
        );
      case 'hosting':
        return (
          <div className="anim-hosting">
            <div className="url-bar">https://yourfacility.com</div>
            <div className="server-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: SERVER }} />
            </div>
            <div className="check-mark">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: CHECK }} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="thumb mock-window" data-label={label}>
      <div className="mock-top">
        <span />
        <span />
        <span />
      </div>
      {inner()}
    </div>
  );
}
