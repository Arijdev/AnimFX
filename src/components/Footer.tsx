import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="navbar-brand">
              <div className="brand-icon">⚡</div>
              <span>AnimFX</span>
            </div>
            <p>
              A classic, lightweight library of 50 production-ready Pure CSS keyframe animations.
              Zero JavaScript dependencies, GPU-accelerated, and instant copy-paste ready.
            </p>
          </div>

          <div className="footer-col">
            <h4>Navigation</h4>
            <ul className="footer-links">
              <li><Link href="/" className="footer-link">Home</Link></li>
              <li><Link href="/library" className="footer-link">Animation Library</Link></li>
              <li><Link href="/playground" className="footer-link">Interactive Playground</Link></li>
              <li><Link href="/about" className="footer-link">About & Docs</Link></li>
              <li><Link href="/feedback" className="footer-link">Feedback & Support</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Categories</h4>
            <ul className="footer-links">
              <li><Link href="/library?cat=basic" className="footer-link">Basic (10)</Link></li>
              <li><Link href="/library?cat=entrance" className="footer-link">Entrance (11)</Link></li>
              <li><Link href="/library?cat=attention" className="footer-link">Attention (10)</Link></li>
              <li><Link href="/library?cat=glow" className="footer-link">Glow & Color (7)</Link></li>
              <li><Link href="/library?cat=creative" className="footer-link">Creative (12)</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li><Link href="/about#integration" className="footer-link">Integration Guide</Link></li>
              <li><Link href="/about#performance" className="footer-link">CSS vs JS Performance</Link></li>
              <li><Link href="/about#browser-support" className="footer-link">Browser Compatibility</Link></li>
              <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations" target="_blank" rel="noreferrer" className="footer-link">MDN CSS Animations ↗</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} AnimFX Library. Open source under MIT License.</span>
          <span>Pure CSS • Zero JavaScript Runtime • 60 FPS</span>
        </div>
      </div>
    </footer>
  );
}
