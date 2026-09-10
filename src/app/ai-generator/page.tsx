'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { formatCSS, formatHTML } from '../../lib/formatters';

interface GeneratedAnimation {
  id: string;
  name: string;
  tagline: string;
  category: string;
  tags: string[];
  html: string;
  css: string;
  js?: string;
  keyframeCode: string;
  reactSnippet?: string;
  instructions?: string;
  fullHtml: string;
  createdAt?: string;
}

// Default high-fidelity showcased animation on initial load
const DEFAULT_ANIMATION: GeneratedAnimation = {
  id: 'starter-portal',
  name: 'Quantum Hyper-Flux Portal',
  tagline: 'High-speed holographic energy vortex with dual counter-rotating rune rings and chromatic aura.',
  category: 'Glowing & Sci-Fi',
  tags: ['cyberpunk', 'portal', 'holographic', 'neon-glow', '60fps'],
  html: `<div class="quantum-portal-stage">
  <div class="portal-outer-ring"></div>
  <div class="portal-inner-ring"></div>
  <div class="portal-core-singularity"></div>
  <div class="portal-rune rune-1">⚡</div>
  <div class="portal-rune rune-2">✦</div>
  <div class="portal-rune rune-3">▲</div>
  <div class="portal-rune rune-4">✦</div>
  <div class="portal-status-label">WARP CONDUIT ACTIVE</div>
</div>`,
  css: `:root {
  --portal-cyan: #00f3ff;
  --portal-magenta: #ff007f;
  --portal-violet: #8b5cf6;
}

.quantum-portal-stage {
  position: relative;
  width: 260px;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 900px;
  user-select: none;
}

.portal-outer-ring {
  position: absolute;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  border: 3px dashed var(--portal-cyan);
  box-shadow: 0 0 25px rgba(0, 243, 255, 0.4), inset 0 0 20px rgba(0, 243, 255, 0.3);
  animation: spinClockwise 8s linear infinite;
}

.portal-inner-ring {
  position: absolute;
  width: 170px;
  height: 170px;
  border-radius: 50%;
  border: 3px dotted var(--portal-magenta);
  box-shadow: 0 0 30px rgba(255, 0, 127, 0.5), inset 0 0 15px rgba(255, 0, 127, 0.4);
  animation: spinCounterClockwise 5s linear infinite;
}

.portal-core-singularity {
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: radial-gradient(circle, #ffffff 10%, var(--portal-magenta) 50%, var(--portal-violet) 80%, transparent 100%);
  box-shadow: 0 0 45px var(--portal-magenta), 0 0 80px var(--portal-cyan);
  animation: singularityPulse 1.8s ease-in-out infinite alternate;
}

.portal-rune {
  position: absolute;
  font-size: 1.2rem;
  color: #ffffff;
  text-shadow: 0 0 10px var(--portal-cyan);
}

.rune-1 { top: 12px; animation: runeFloat 2.5s ease-in-out infinite alternate; }
.rune-2 { right: 12px; animation: runeFloat 2.5s ease-in-out infinite alternate 0.6s; }
.rune-3 { bottom: 12px; animation: runeFloat 2.5s ease-in-out infinite alternate 1.2s; }
.rune-4 { left: 12px; animation: runeFloat 2.5s ease-in-out infinite alternate 1.8s; }

.portal-status-label {
  position: absolute;
  bottom: -40px;
  font-size: 0.72rem;
  letter-spacing: 0.25em;
  font-weight: 800;
  color: var(--portal-cyan);
  text-shadow: 0 0 12px rgba(0, 243, 255, 0.7);
  animation: textFlicker 3s infinite;
}

@keyframes spinClockwise {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spinCounterClockwise {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

@keyframes singularityPulse {
  0% { transform: scale(0.85); filter: hue-rotate(0deg); }
  100% { transform: scale(1.22); filter: hue-rotate(45deg); }
}

@keyframes runeFloat {
  0% { transform: scale(0.9); opacity: 0.7; }
  100% { transform: scale(1.25); opacity: 1; }
}

@keyframes textFlicker {
  0%, 100% { opacity: 1; }
  45% { opacity: 0.6; }
  50% { opacity: 0.9; }
  55% { opacity: 0.4; }
  60% { opacity: 1; }
}`,
  js: '',
  keyframeCode: `@keyframes spinClockwise {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spinCounterClockwise {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

@keyframes singularityPulse {
  0% { transform: scale(0.85); filter: hue-rotate(0deg); }
  100% { transform: scale(1.22); filter: hue-rotate(45deg); }
}

@keyframes runeFloat {
  0% { transform: scale(0.9); opacity: 0.7; }
  100% { transform: scale(1.25); opacity: 1; }
}

@keyframes textFlicker {
  0%, 100% { opacity: 1; }
  45% { opacity: 0.6; }
  50% { opacity: 0.9; }
  55% { opacity: 0.4; }
  60% { opacity: 1; }
}`,
  reactSnippet: `export default function QuantumPortal() {
  return (
    <div className="quantum-portal-stage">
      <div className="portal-outer-ring" />
      <div className="portal-inner-ring" />
      <div className="portal-core-singularity" />
      <div className="portal-rune rune-1">⚡</div>
      <div className="portal-rune rune-2">✦</div>
      <div className="portal-rune rune-3">▲</div>
      <div className="portal-rune rune-4">✦</div>
      <div className="portal-status-label">WARP CONDUIT ACTIVE</div>
    </div>
  );
}`,
  instructions: 'Drop the CSS into your stylesheet and adjust --portal-cyan / --portal-magenta variables to match your brand palette.',
  fullHtml: '',
};

const INSPIRATION_PROMPTS = [
  { icon: '🌌', label: 'Cyberpunk Neon Portal', prompt: 'Cyberpunk neon portal with rotating runic energy rings and glowing laser core' },
  { icon: '🔮', label: 'Holographic 3D Glass Card', prompt: '3D floating holographic card with reflective iridescent rainbow sheen and perspective tilt' },
  { icon: '⚡', label: 'Electric Arc Button', prompt: 'Electric charge button with crackling lightning arcs and magnetic hover ripple' },
  { icon: '🌊', label: 'Morphing Liquid Blob', prompt: 'Smooth organic liquid blob morphing seamlessly with chromatic gradient and lava flow' },
  { icon: '💎', label: 'Prismatic Crystal Spinner', prompt: 'Prismatic diamond crystal spinner with rainbow light refraction and rotating facets' },
  { icon: '🛸', label: 'Anti-Gravity Sci-Fi Orb', prompt: 'Futuristic anti-gravity floating sphere with scanning laser grid and levitation wobble' },
  { icon: '✨', label: 'Particle Shockwave Button', prompt: 'Satisfying magnetic action button that unleashes a particle shockwave burst on hover' },
  { icon: '🧬', label: 'DNA Synthesis Helix', prompt: 'Glowing double helix rotating in 3D perspective with particle nucleotide bonds' },
];

const STYLE_PRESETS = [
  { id: 'all', label: 'All Styles' },
  { id: 'Glowing & Sci-Fi', label: 'Glowing & Sci-Fi' },
  { id: '3D & Perspective', label: '3D & Perspective' },
  { id: 'Fluid & Liquid', label: 'Fluid & Liquid' },
  { id: 'UI Micro-interaction', label: 'UI Micro-interactions' },
  { id: 'Loading & Spinners', label: 'Loaders & Spinners' },
  { id: 'Text Effects', label: 'Text Effects' },
];

export default function AiGeneratorPage() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [currentAnim, setCurrentAnim] = useState<GeneratedAnimation>(DEFAULT_ANIMATION);
  const [activeTab, setActiveTab] = useState<'css' | 'html' | 'full' | 'react' | 'keyframes'>('css');
  const [copied, setCopied] = useState(false);
  const [wordWrap, setWordWrap] = useState(false);

  // Stage controls
  const [stageBg, setStageBg] = useState<'dark' | 'black' | 'light' | 'grid'>('dark');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [speedMultiplier, setSpeedMultiplier] = useState<'0.5' | '1' | '1.5' | '2'>('1');
  const [isPlaying, setIsPlaying] = useState(true);
  const [replayCount, setReplayCount] = useState(0);

  // Remix input
  const [remixPrompt, setRemixPrompt] = useState('');
  const [remixing, setRemixing] = useState(false);

  // History & Presets
  const [history, setHistory] = useState<GeneratedAnimation[]>([]);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('animfx_ai_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setHistory(parsed);
        }
      }
    } catch (e) {
      console.warn('Could not load history:', e);
    }
  }, []);

  // Save history to localStorage
  const saveToHistory = (anim: GeneratedAnimation) => {
    setHistory((prev) => {
      const filtered = prev.filter((a) => a.id !== anim.id);
      const next = [anim, ...filtered].slice(0, 12);
      try {
        localStorage.setItem('animfx_ai_history', JSON.stringify(next));
      } catch (e) {
        console.warn('Could not save history:', e);
      }
      return next;
    });
  };

  // Cycling status messages during AI generation
  useEffect(() => {
    if (!loading && !remixing) {
      setLoadingStep(0);
      return;
    }
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % 4);
    }, 1800);
    return () => clearInterval(interval);
  }, [loading, remixing]);

  const loadingSteps = [
    'Connecting to Gemini 3.7...',
    'Synthesizing hardware-accelerated keyframes...',
    'Compositing 60 FPS transform math & CSS styles...',
    'Preparing live interactive sandbox stage...',
  ];

  // Handle generation
  const handleGenerate = async (targetPrompt?: string) => {
    const queryPrompt = targetPrompt || prompt;
    if (!queryPrompt.trim() || loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/generate-animation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: queryPrompt,
          style: selectedStyle,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate animation');
      }

      setCurrentAnim(data.data);
      saveToHistory(data.data);
      setReplayCount((prev) => prev + 1);
      setIsPlaying(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong while generating with Gemini';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Handle iterative remix
  const handleRemix = async () => {
    if (!remixPrompt.trim() || remixing) return;

    setRemixing(true);
    setError(null);

    try {
      const res = await fetch('/api/generate-animation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: remixPrompt,
          refineContext: {
            previousName: currentAnim.name,
            previousHtml: currentAnim.html,
            previousCss: currentAnim.css,
            previousJs: currentAnim.js,
            instruction: remixPrompt,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to remix animation');
      }

      setCurrentAnim(data.data);
      saveToHistory(data.data);
      setRemixPrompt('');
      setReplayCount((prev) => prev + 1);
      setIsPlaying(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong while remixing with Gemini';
      setError(message);
    } finally {
      setRemixing(false);
    }
  };

  // Keyboard shortcut Ctrl+Enter to generate
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleGenerate();
    }
  };

  // Assemble isolated iframe document
  const constructIframeHtml = () => {
    const playState = isPlaying ? 'running' : 'paused';
    const speedRatio = speedMultiplier === '0.5' ? '2' : speedMultiplier === '1.5' ? '0.67' : speedMultiplier === '2' ? '0.5' : '1';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    html, body {
      width: 100%;
      height: 100%;
      background: transparent;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    *, *::before, *::after {
      animation-play-state: ${playState} !important;
      ${speedRatio !== '1' ? `animation-duration-multiplier: ${speedRatio};` : ''}
    }
    ${currentAnim.css}
  </style>
</head>
<body>
  ${currentAnim.html}
  ${
    currentAnim.js
      ? `<script>
    try {
      ${currentAnim.js}
    } catch(e) {
      console.warn('Script error in preview:', e);
    }
  </script>`
      : ''
  }
</body>
</html>`;
  };

  // Code tab content getter with automatic formatting
  const getActiveCode = () => {
    switch (activeTab) {
      case 'css':
        return formatCSS(currentAnim.css);
      case 'html':
        return formatHTML(currentAnim.html);
      case 'full':
        return currentAnim.fullHtml || constructIframeHtml();
      case 'react':
        return (
          currentAnim.reactSnippet ||
          `// React JSX Component\nexport default function ${currentAnim.name.replace(/[^a-zA-Z0-9]/g, '')}() {\n  return (\n    <>\n      <style>{\`\n${formatCSS(currentAnim.css)}\n      \`}</style>\n      ${formatHTML(currentAnim.html)}\n    </>\n  );\n}`
        );
      case 'keyframes':
        return formatCSS(currentAnim.keyframeCode || currentAnim.css);
      default:
        return formatCSS(currentAnim.css);
    }
  };

  const handleCopy = () => {
    const code = getActiveCode();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const fullHtml = currentAnim.fullHtml || constructIframeHtml();
    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentAnim.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="section">
      <div className="container" style={{ width: '100%', maxWidth: '1280px' }}>
        {/* Page Header */}
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <div className="ai-studio-badge">
            <span className="sparkle">✨</span> Powered by Google Gemini 3.7 Flash
          </div>
          <h1
            className="section-title"
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 2.7rem)',
              marginBottom: '10px',
              letterSpacing: '-0.02em',
            }}
          >
            AI Motion Studio
          </h1>
          <p
            className="section-desc"
            style={{ maxWidth: '680px', margin: '0 auto' }}
          >
            Create any CSS, SVG, or interactive web animation on demand. Just enter a prompt to get a live real-time preview and export production-ready code.
          </p>
        </div>

        {/* Prompt Input Studio Box */}
        <div className="ai-prompt-card">
          <textarea
            className="ai-prompt-textarea"
            placeholder="Describe the animation you want to build... (e.g. Glowing cybernetic vortex with counter-rotating rune rings, liquid morphing lava blob, or magnetic 3D button)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading || remixing}
          />

          <div className="ai-prompt-bottom-bar">
            {/* Style Preset Selector */}
            <div className="ai-prompt-tags-group">
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Style:
              </span>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="control-select"
                style={{
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-card)',
                }}
                disabled={loading || remixing}
              >
                {STYLE_PRESETS.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.label}
                  </option>
                ))}
              </select>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  marginLeft: '4px',
                }}
              >
                Press <kbd style={{ padding: '2px 6px', background: 'var(--bg-card)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>Ctrl+Enter</kbd>
              </span>
            </div>

            {/* Generate Action Button */}
            <button
              onClick={() => handleGenerate()}
              disabled={!prompt.trim() || loading || remixing}
              className="ai-btn-generate"
              aria-label="Generate Animation with Gemini AI"
            >
              {loading ? (
                <>
                  <span className="ai-spinner-ring" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></span>
                  Generating with Gemini...
                </>
              ) : (
                <>
                  <span>✨</span> Generate Animation
                </>
              )}
            </button>
          </div>
        </div>

        {/* Inspiration Starter Pills */}
        <div className="ai-inspirations-container">
          <div className="ai-inspirations-title">Instant Prompts & Inspirations</div>
          <div className="ai-inspirations-list">
            {INSPIRATION_PROMPTS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPrompt(item.prompt);
                  handleGenerate(item.prompt);
                }}
                disabled={loading || remixing}
                className="ai-inspiration-chip"
                title={item.prompt}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Error Notification Alert */}
        {error && (
          <div
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid #ef4444',
              borderRadius: '10px',
              padding: '12px 18px',
              color: '#fca5a5',
              fontSize: '0.9rem',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⚠️</span>
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              style={{ background: 'transparent', border: 'none', color: '#fca5a5', cursor: 'pointer', fontSize: '1.1rem' }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Main Dual-Pane Studio: Live Preview + Code Studio */}
        <div className="playground-layout" style={{ alignItems: 'stretch' }}>
          {/* Left: Sandboxed Live Stage */}
          <div className="ai-stage-wrapper">
            {/* Stage Toolbar */}
            <div className="ai-stage-toolbar">
              {/* Playback Controls */}
              <div className="ai-toolbar-group">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`ai-tool-btn ${isPlaying ? 'active' : ''}`}
                  title={isPlaying ? 'Pause animation' : 'Resume animation'}
                >
                  {isPlaying ? '⏸ Pause' : '▶ Play'}
                </button>
                <button
                  onClick={() => setReplayCount((prev) => prev + 1)}
                  className="ai-tool-btn"
                  title="Replay from start"
                >
                  🔄 Replay
                </button>
                <select
                  value={speedMultiplier}
                  onChange={(e) => setSpeedMultiplier(e.target.value as '0.5' | '1' | '1.5' | '2')}
                  className="control-select"
                  style={{
                    padding: '4px 8px',
                    fontSize: '0.78rem',
                    borderRadius: '6px',
                    backgroundColor: 'var(--bg-card)',
                  }}
                  title="Playback Speed"
                >
                  <option value="0.5">0.5x</option>
                  <option value="1">1.0x (Normal)</option>
                  <option value="1.5">1.5x</option>
                  <option value="2">2.0x (Fast)</option>
                </select>
              </div>

              {/* Viewport & Background Toggles */}
              <div className="ai-toolbar-group">
                {/* Background Switcher */}
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    onClick={() => setStageBg('dark')}
                    className={`ai-tool-btn ${stageBg === 'dark' ? 'active' : ''}`}
                    title="Deep Navy Backdrop"
                  >
                    🌌
                  </button>
                  <button
                    onClick={() => setStageBg('black')}
                    className={`ai-tool-btn ${stageBg === 'black' ? 'active' : ''}`}
                    title="Pure OLED Black"
                  >
                    ⬛
                  </button>
                  <button
                    onClick={() => setStageBg('light')}
                    className={`ai-tool-btn ${stageBg === 'light' ? 'active' : ''}`}
                    title="Clean Light Mode"
                  >
                    ☀️
                  </button>
                  <button
                    onClick={() => setStageBg('grid')}
                    className={`ai-tool-btn ${stageBg === 'grid' ? 'active' : ''}`}
                    title="Blueprint Grid"
                  >
                    ▦
                  </button>
                </div>

                {/* Device Mode */}
                <button
                  onClick={() => setDeviceMode(deviceMode === 'desktop' ? 'mobile' : 'desktop')}
                  className={`ai-tool-btn ${deviceMode === 'mobile' ? 'active' : ''}`}
                  title={deviceMode === 'desktop' ? 'Switch to Mobile Phone View' : 'Switch to Desktop View'}
                >
                  {deviceMode === 'desktop' ? '📱 Mobile' : '🖥 Desktop'}
                </button>
              </div>
            </div>

            {/* Sandbox Viewport with Isolated Iframe */}
            <div
              className={`ai-sandbox-viewport bg-${stageBg} ${deviceMode === 'mobile' ? 'device-mobile' : ''}`}
            >
              {/* Generating Overlay */}
              {(loading || remixing) && (
                <div className="ai-generating-overlay">
                  <div className="ai-spinner-ring"></div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#f8fafc' }}>
                    {loadingSteps[loadingStep]}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                    Gemini is crafting customized 60fps CSS keyframes...
                  </div>
                </div>
              )}

              <iframe
                key={`${currentAnim.id}-${replayCount}-${speedMultiplier}-${isPlaying}`}
                className="ai-sandbox-iframe"
                srcDoc={constructIframeHtml()}
                title="AI Animation Sandbox Preview"
                sandbox="allow-scripts"
              />
            </div>

            {/* Animation Details Meta Card & Remix Bar */}
            <div className="ai-meta-card">
              <div className="ai-meta-header">
                <div className="ai-meta-title">{currentAnim.name}</div>
                <span className="card-category">{currentAnim.category}</span>
              </div>
              <div className="ai-meta-tagline">{currentAnim.tagline}</div>
              <div className="ai-meta-tags">
                {currentAnim.tags?.map((tag, idx) => (
                  <span key={idx} className="ai-meta-tag">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Interactive Refine / Remix Bar */}
              <div className="ai-remix-section">
                <input
                  type="text"
                  placeholder="✨ Remix or tweak (e.g. 'Make it neon green', 'Speed up rotation', 'Add pulsing ring')..."
                  className="ai-remix-input"
                  value={remixPrompt}
                  onChange={(e) => setRemixPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRemix();
                  }}
                  disabled={loading || remixing}
                />
                <button
                  onClick={handleRemix}
                  disabled={!remixPrompt.trim() || loading || remixing}
                  className="btn btn-secondary btn-sm"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {remixing ? 'Refining...' : 'Remix ➔'}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Code Studio & Exporter */}
          <div className="ai-code-studio">
            {/* Code Tabs Header */}
            <div className="ai-tabs-header">
              <div className="ai-tabs-nav">
                <button
                  onClick={() => setActiveTab('css')}
                  className={`ai-tab-btn ${activeTab === 'css' ? 'active' : ''}`}
                >
                  CSS & Keyframes
                </button>
                <button
                  onClick={() => setActiveTab('html')}
                  className={`ai-tab-btn ${activeTab === 'html' ? 'active' : ''}`}
                >
                  HTML Markup
                </button>
                <button
                  onClick={() => setActiveTab('full')}
                  className={`ai-tab-btn ${activeTab === 'full' ? 'active' : ''}`}
                >
                  Full HTML5 File
                </button>
                <button
                  onClick={() => setActiveTab('react')}
                  className={`ai-tab-btn ${activeTab === 'react' ? 'active' : ''}`}
                >
                  React / TSX
                </button>
                <button
                  onClick={() => setActiveTab('keyframes')}
                  className={`ai-tab-btn ${activeTab === 'keyframes' ? 'active' : ''}`}
                >
                  Keyframes Only
                </button>
              </div>

              <div className="ai-code-actions">
                <button
                  onClick={handleDownload}
                  className="btn btn-outline-primary btn-sm"
                  title="Download standalone HTML file"
                >
                  💾 Download
                </button>
                <button
                  onClick={handleCopy}
                  className={`btn btn-primary btn-sm ${copied ? 'copied' : ''}`}
                  title="Copy code to clipboard"
                >
                  {copied ? '✓ Copied' : '📋 Copy'}
                </button>
              </div>
            </div>

            {/* Code Display Area */}
            {(() => {
              const activeCode = getActiveCode();
              const codeLines = activeCode.split('\n');
              return (
                <div className="ai-code-editor-container">
                  <div className="ai-code-sub-bar">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 700, color: '#f8fafc' }}>
                        {activeTab === 'css'
                          ? 'CSS & Keyframes'
                          : activeTab === 'html'
                          ? 'HTML Markup'
                          : activeTab === 'full'
                          ? 'Standalone HTML5 File'
                          : activeTab === 'react'
                          ? 'React / TSX'
                          : 'Keyframes Only'}
                      </span>
                      <span style={{ color: '#475569' }}>•</span>
                      <span>{codeLines.length} lines</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={() => setWordWrap(!wordWrap)}
                        className="ai-tool-btn"
                        style={{ fontSize: '0.78rem', padding: '4px 10px' }}
                        title="Toggle line wrapping"
                      >
                        {wordWrap ? '↩ No Wrap' : '↵ Wrap Lines'}
                      </button>

                      <button
                        onClick={handleCopy}
                        className="btn btn-primary btn-sm"
                        style={{
                          fontSize: '0.82rem',
                          padding: '5px 14px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: copied
                            ? '#10b981'
                            : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                          color: '#ffffff',
                          fontWeight: 700,
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          boxShadow: '0 2px 10px rgba(99, 102, 241, 0.4)',
                        }}
                        title="Copy code to clipboard"
                      >
                        {copied ? '✓ Copied!' : '📋 Copy Code'}
                      </button>
                    </div>
                  </div>
                  <div className="ai-code-editor-body">
                    <div className="ai-code-gutter">
                      {codeLines.map((_, i) => (
                        <span key={i} className="ai-code-line-num">
                          {i + 1}
                        </span>
                      ))}
                    </div>
                    <pre
                      className="ai-code-pre"
                      style={{ whiteSpace: wordWrap ? 'pre-wrap' : 'pre' }}
                    >
                      <code>{activeCode}</code>
                    </pre>
                  </div>
                </div>
              );
            })()}

            {/* Code Footer / Developer Tips */}
            <div className="ai-code-footer">
              <div>
                💡{' '}
                {currentAnim.instructions ||
                  'Paste this CSS code directly into your stylesheet to use this animation anywhere.'}
              </div>
              <Link
                href="/playground"
                className="footer-link"
                style={{ color: 'var(--accent-text)', fontWeight: 600, whiteSpace: 'nowrap', marginLeft: '12px' }}
              >
                Open Manual Playground →
              </Link>
            </div>
          </div>
        </div>

        {/* Recent AI Generations History */}
        {history.length > 0 && (
          <div style={{ marginTop: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                Recent AI Creations ({history.length})
              </h3>
              <button
                onClick={() => {
                  setHistory([]);
                  localStorage.removeItem('animfx_ai_history');
                }}
                className="footer-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.82rem' }}
              >
                Clear History
              </button>
            </div>

            <div className="ai-history-grid">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="ai-history-card"
                  onClick={() => {
                    setCurrentAnim(item);
                    setReplayCount((prev) => prev + 1);
                  }}
                  title="Click to load into stage"
                >
                  <div className="ai-history-header">
                    <span className="ai-history-title">{item.name}</span>
                    <span className="card-category" style={{ fontSize: '0.72rem' }}>
                      {item.category}
                    </span>
                  </div>
                  <p className="ai-history-desc">{item.tagline}</p>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {item.tags?.slice(0, 3).map((tag, i) => (
                      <span key={i} className="ai-meta-tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
