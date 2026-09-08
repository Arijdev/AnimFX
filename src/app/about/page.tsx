import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Page Title */}
        <div style={{ marginBottom: '40px' }}>
          <h1 className="section-title" style={{ fontSize: '2.2rem', marginBottom: '8px' }}>
            About AnimFX & Pure CSS
          </h1>
          <p className="section-desc">
            A classic, lightweight philosophy for high-performance web animations.
          </p>
        </div>

        {/* 1. Philosophy */}
        <div className="docs-card">
          <h3>⚡ The Philosophy of Zero-JS Animations</h3>
          <p>
            Modern web applications frequently suffer from JavaScript bloat. Adding large animation libraries like Framer Motion (35+ KB) or GSAP (60+ KB) forces the browser's single main thread to compute coordinates on every frame, which can lead to jank, dropped frames, and poor Core Web Vitals (INP and FID).
          </p>
          <p>
            AnimFX provides 50 battle-tested, hardware-accelerated CSS keyframe animations. Because they execute directly on the browser's GPU compositor thread, they run at a fluid 60 FPS even when the JavaScript main thread is heavily occupied.
          </p>
        </div>

        {/* 2. Performance Comparison Table */}
        <div className="docs-card" id="performance">
          <h3>📊 Performance & Architecture Comparison</h3>
          <p>
            How Pure CSS keyframes compare against JavaScript-driven animation runtimes:
          </p>
          <div className="table-responsive-wrapper">
            <table className="compat-table">
              <thead>
                <tr>
                  <th>Criterion</th>
                  <th>AnimFX (Pure CSS)</th>
                  <th>Framer Motion</th>
                  <th>GSAP</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Bundle Overhead</strong></td>
                  <td className="feature-tag-good">0 KB JavaScript</td>
                  <td>~35 KB gzip</td>
                  <td>~60 KB gzip</td>
                </tr>
                <tr>
                  <td><strong>Execution Thread</strong></td>
                  <td className="feature-tag-good">Compositor (GPU)</td>
                  <td>Main JS Thread</td>
                  <td>Main JS Thread</td>
                </tr>
                <tr>
                  <td><strong>Performance under CPU Load</strong></td>
                  <td className="feature-tag-good">Flawless 60 FPS</td>
                  <td>Potential Frame Drops</td>
                  <td>Good, but main-thread bound</td>
                </tr>
                <tr>
                  <td><strong>Framework Agnostic</strong></td>
                  <td className="feature-tag-good">100% (Any HTML/Framework)</td>
                  <td>React / Next.js Only</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td><strong>Setup Complexity</strong></td>
                  <td className="feature-tag-good">Copy & Paste</td>
                  <td>NPM install + Wrappers</td>
                  <td>NPM install + Plugins</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Integration Guide */}
        <div className="docs-card" id="integration">
          <h3>🛠️ Integration Guide</h3>
          <p>
            You can drop AnimFX keyframes into any project in under 30 seconds:
          </p>

          <h4 style={{ fontSize: '1rem', marginTop: '16px', marginBottom: '8px', color: 'var(--text-primary)' }}>
            Option A: Plain HTML & CSS
          </h4>
          <div className="code-snippet-box">
{`<!-- 1. Include in your styles.css -->
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.btn-bounce {
  animation: bounce 1.2s ease infinite;
}

<!-- 2. Apply to HTML -->
<button class="btn-bounce">Click Me</button>`}
          </div>

          <h4 style={{ fontSize: '1rem', marginTop: '20px', marginBottom: '8px', color: 'var(--text-primary)' }}>
            Option B: React / Next.js / Vue / Svelte
          </h4>
          <div className="code-snippet-box">
{`// Add keyframes to your global.css, then use standard className
export default function HeroButton() {
  return (
    <button className="anim-bounce bg-indigo-600 text-white px-6 py-3 rounded-lg">
      Launch App
    </button>
  );
}`}
          </div>
        </div>

        {/* 4. Browser Support */}
        <div className="docs-card" id="browser-support">
          <h3>🌐 Browser Compatibility</h3>
          <p>
            CSS keyframe animations and transform composites enjoy near-universal 100% global browser support:
          </p>
          <div className="table-responsive-wrapper">
            <table className="compat-table">
              <thead>
                <tr>
                  <th>Browser</th>
                  <th>Minimum Version</th>
                  <th>Global Support Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Google Chrome</td>
                  <td>Chrome 43+</td>
                  <td className="feature-tag-good">✓ 100% Supported</td>
                </tr>
                <tr>
                  <td>Apple Safari (iOS & macOS)</td>
                  <td>Safari 9+</td>
                  <td className="feature-tag-good">✓ 100% Supported</td>
                </tr>
                <tr>
                  <td>Mozilla Firefox</td>
                  <td>Firefox 16+</td>
                  <td className="feature-tag-good">✓ 100% Supported</td>
                </tr>
                <tr>
                  <td>Microsoft Edge</td>
                  <td>Edge 12+</td>
                  <td className="feature-tag-good">✓ 100% Supported</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Accessibility */}
        <div className="docs-card">
          <h3>♿ Accessibility & Reduced Motion</h3>
          <p>
            Always respect user motion preferences by including this simple fallback in your CSS:
          </p>
          <div className="code-snippet-box">
{`@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`}
          </div>
        </div>

        {/* Action Button */}
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link href="/library" className="btn btn-primary">
            Browse All 50 Animations in Library →
          </Link>
        </div>
      </div>
    </div>
  );
}
