'use client';

import { useState, useEffect } from 'react';
import { AnimationDef } from '../data/animations';

interface AnimationModalProps {
  animation: AnimationDef | null;
  onClose: () => void;
}

export default function AnimationModal({ animation, onClose }: AnimationModalProps) {
  const [duration, setDuration] = useState('1.2');
  const [easing, setEasing] = useState('ease');
  const [iteration, setIteration] = useState('infinite');
  const [shape, setShape] = useState<'box' | 'button' | 'icon' | 'badge'>('box');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!animation) return null;

  const generatedCustomCSS = `/* Customize animation usage */
.${animation.id}-custom {
  animation: ${animation.id} ${duration}s ${easing} ${iteration};
}

${animation.cssSnippet}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCustomCSS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const animStyle: React.CSSProperties = {
    animation: `${animation.id} ${duration}s ${easing} ${iteration}`,
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <span style={{ fontSize: '1.4rem' }}>{animation.icon}</span>
            <h2 className="modal-title">{animation.name}</h2>
            <span className="card-category">{animation.category}</span>
          </div>
          <button
            onClick={onClose}
            className="btn-icon"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          {/* Live Preview Stage */}
          <div className="modal-preview-stage">
            {shape === 'box' && (
              <div
                style={{
                  ...animStyle,
                  width: '64px',
                  height: '64px',
                  borderRadius: '12px',
                  background: `linear-gradient(135deg, ${animation.accentColor} 0%, #4338ca 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '1.8rem',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                }}
              >
                {animation.icon}
              </div>
            )}

            {shape === 'button' && (
              <button
                style={{
                  ...animStyle,
                  padding: '12px 28px',
                  borderRadius: '8px',
                  backgroundColor: animation.accentColor,
                  color: '#ffffff',
                  fontWeight: 600,
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                  cursor: 'pointer',
                }}
              >
                Action Button
              </button>
            )}

            {shape === 'badge' && (
              <span
                style={{
                  ...animStyle,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  backgroundColor: animation.accentColor,
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}
              >
                <span>{animation.icon}</span> Live Badge
              </span>
            )}

            {shape === 'icon' && (
              <div
                style={{
                  ...animStyle,
                  fontSize: '3.5rem',
                  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
                }}
              >
                {animation.icon}
              </div>
            )}
          </div>

          {/* Interactive Controls */}
          <div className="modal-controls">
            <div className="control-item">
              <label className="control-label">
                Speed / Duration ({duration}s)
              </label>
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

            <div className="control-item">
              <label className="control-label">Easing Curve</label>
              <select
                value={easing}
                onChange={(e) => setEasing(e.target.value)}
                className="control-select"
              >
                <option value="ease">ease</option>
                <option value="linear">linear</option>
                <option value="ease-in">ease-in</option>
                <option value="ease-out">ease-out</option>
                <option value="ease-in-out">ease-in-out</option>
                <option value="cubic-bezier(0.68, -0.55, 0.265, 1.55)">bounce bezier</option>
              </select>
            </div>

            <div className="control-item">
              <label className="control-label">Preview Element Shape</label>
              <select
                value={shape}
                onChange={(e) => setShape(e.target.value as any)}
                className="control-select"
              >
                <option value="box">Rounded Cube</option>
                <option value="button">Call-to-Action Button</option>
                <option value="badge">Pill Badge</option>
                <option value="icon">Standalone Emoji</option>
              </select>
            </div>

            <div className="control-item">
              <label className="control-label">Iteration Count</label>
              <select
                value={iteration}
                onChange={(e) => setIteration(e.target.value)}
                className="control-select"
              >
                <option value="infinite">infinite</option>
                <option value="1">1 (once)</option>
                <option value="2">2 times</option>
                <option value="3">3 times</option>
              </select>
            </div>
          </div>

          {/* Code Output */}
          <div className="control-item">
            <label className="control-label">Pure CSS Code</label>
            <div className="code-snippet-box">{generatedCustomCSS}</div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-secondary">
            Close
          </button>
          <button
            onClick={handleCopy}
            className="btn btn-primary"
          >
            {copied ? '✓ Copied to Clipboard!' : '📋 Copy Customized CSS'}
          </button>
        </div>
      </div>
    </div>
  );
}
