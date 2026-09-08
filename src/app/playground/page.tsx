'use client';

import { useState } from 'react';
import { ANIMATIONS } from '../../data/animations';

export default function PlaygroundPage() {
  const [selectedId, setSelectedId] = useState('bounce');
  const [duration, setDuration] = useState('1.2');
  const [timing, setTiming] = useState('ease');
  const [iteration, setIteration] = useState('infinite');
  const [targetType, setTargetType] = useState<'button' | 'card' | 'icon' | 'badge' | 'text'>('card');
  const [accentColor, setAccentColor] = useState('#4f46e5');
  const [copied, setCopied] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  const currentAnim = ANIMATIONS.find((a) => a.id === selectedId) || ANIMATIONS[0];

  const colorPalette = [
    { label: 'Indigo', value: '#4f46e5' },
    { label: 'Purple', value: '#9333ea' },
    { label: 'Emerald', value: '#10b981' },
    { label: 'Rose', value: '#e11d48' },
    { label: 'Amber', value: '#d97706' },
    { label: 'Cyan', value: '#0891b2' },
  ];

  const generatedCSS = `/* 1. Custom CSS Class */
.custom-${currentAnim.id} {
  animation: ${currentAnim.id} ${duration}s ${timing} ${iteration};
}

/* 2. Keyframes Definition */
${currentAnim.cssSnippet}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCSS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReplay = () => {
    setReplayKey((prev) => prev + 1);
  };

  const animStyle: React.CSSProperties = {
    animation: `${currentAnim.id} ${duration}s ${timing} ${iteration}`,
  };

  return (
    <div className="section">
      <div className="container" style={{ width: '100%', maxWidth: '1200px' }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h1 className="section-title" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', marginBottom: '8px' }}>
            Interactive Animation Playground
          </h1>
          <p className="section-desc">
            Test any of the 50 keyframes on different UI elements, fine-tune timing curves, and export optimized CSS.
          </p>
        </div>

        {/* Dual Pane Layout with zero-overflow grid */}
        <div className="playground-layout">
          {/* Left: Stage and Controls */}
          <div className="studio-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Live Stage</h3>
              <button onClick={handleReplay} className="btn btn-secondary btn-sm" aria-label="Replay animation">
                🔄 Replay
              </button>
            </div>

            {/* Stage */}
            <div className="studio-stage" key={replayKey}>
              {targetType === 'card' && (
                <div
                  style={{
                    ...animStyle,
                    width: 'min(180px, 85%)',
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--shadow-md)',
                    textAlign: 'center',
                    boxSizing: 'border-box',
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '6px' }}>{currentAnim.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{currentAnim.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Interactive Card</div>
                </div>
              )}

              {targetType === 'button' && (
                <button
                  style={{
                    ...animStyle,
                    padding: '12px 24px',
                    maxWidth: '90%',
                    borderRadius: '8px',
                    backgroundColor: accentColor,
                    color: '#ffffff',
                    fontWeight: 600,
                    border: 'none',
                    fontSize: 'clamp(0.9rem, 3vw, 1rem)',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <span>{currentAnim.icon}</span> Click Me
                </button>
              )}

              {targetType === 'icon' && (
                <div
                  style={{
                    ...animStyle,
                    width: '72px',
                    height: '72px',
                    borderRadius: '16px',
                    backgroundColor: accentColor,
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.2rem',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                    flexShrink: 0,
                  }}
                >
                  {currentAnim.icon}
                </div>
              )}

              {targetType === 'badge' && (
                <span
                  style={{
                    ...animStyle,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    maxWidth: '90%',
                    borderRadius: '9999px',
                    backgroundColor: accentColor,
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                  }}
                >
                  <span>{currentAnim.icon}</span> Status Active
                </span>
              )}

              {targetType === 'text' && (
                <div
                  style={{
                    ...animStyle,
                    fontSize: 'clamp(1.15rem, 4.5vw, 1.85rem)',
                    fontWeight: 800,
                    color: accentColor,
                    letterSpacing: '-0.02em',
                    textAlign: 'center',
                    maxWidth: '90%',
                    wordBreak: 'break-word',
                  }}
                >
                  Pure CSS Animation
                </div>
              )}
            </div>

            {/* Controls Form Grid */}
            <div className="studio-form-grid">
              <div className="form-group">
                <label className="form-label">Animation Preset</label>
                <select
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="control-select"
                >
                  {ANIMATIONS.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Target Element</label>
                <select
                  value={targetType}
                  onChange={(e) => setTargetType(e.target.value as any)}
                  className="control-select"
                >
                  <option value="card">Feature Card</option>
                  <option value="button">Call-to-Action Button</option>
                  <option value="icon">App Icon Tile</option>
                  <option value="badge">Status Pill Badge</option>
                  <option value="text">Headline Text</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Duration ({duration}s)</label>
                <input
                  type="range"
                  min="0.2"
                  max="4.0"
                  step="0.1"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="control-slider"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Timing Function</label>
                <select
                  value={timing}
                  onChange={(e) => setTiming(e.target.value)}
                  className="control-select"
                >
                  <option value="ease">ease</option>
                  <option value="linear">linear</option>
                  <option value="ease-in">ease-in</option>
                  <option value="ease-out">ease-out</option>
                  <option value="ease-in-out">ease-in-out</option>
                  <option value="cubic-bezier(0.68, -0.55, 0.265, 1.55)">bounce (bezier)</option>
                  <option value="cubic-bezier(0.16, 1, 0.3, 1)">spring-out (bezier)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Iteration Count</label>
                <select
                  value={iteration}
                  onChange={(e) => setIteration(e.target.value)}
                  className="control-select"
                >
                  <option value="infinite">infinite</option>
                  <option value="1">1 time</option>
                  <option value="2">2 times</option>
                  <option value="3">3 times</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Accent Theme</label>
                <div style={{ display: 'flex', gap: '10px', marginTop: '4px', flexWrap: 'wrap' }}>
                  {colorPalette.map((col) => (
                    <button
                      key={col.value}
                      onClick={() => setAccentColor(col.value)}
                      style={{
                        width: '32px',
                        height: '32px',
                        minWidth: '32px',
                        borderRadius: '50%',
                        backgroundColor: col.value,
                        border: accentColor === col.value ? '2px solid #ffffff' : '1px solid transparent',
                        outline: accentColor === col.value ? '2px solid var(--accent)' : 'none',
                        cursor: 'pointer',
                        transition: 'transform 0.1s ease',
                      }}
                      title={col.label}
                      aria-label={`Select ${col.label} color`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Generated CSS Code Box */}
          <div className="studio-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Generated CSS Code</h3>
              <button
                onClick={handleCopy}
                className="btn btn-primary btn-sm"
              >
                {copied ? '✓ Copied' : '📋 Copy CSS'}
              </button>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Paste this block into your stylesheet to use this customized animation immediately.
            </p>

            <div className="playground-code-box">
              {generatedCSS}
            </div>

            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                padding: '14px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
              }}
            >
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                💡 Quick Tip
              </div>
              Add <code style={{ color: 'var(--accent-text)', wordBreak: 'break-all' }}>.custom-{currentAnim.id}</code> to any element to animate it.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
