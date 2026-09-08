'use client';

import { useState } from 'react';
import { AnimationDef } from '../data/animations';

interface AnimationCardProps {
  animation: AnimationDef;
  onSelect: (anim: AnimationDef) => void;
}

export default function AnimationCard({ animation, onSelect }: AnimationCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(animation.cssSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="anim-card">
      <div
        className="card-stage"
        onClick={() => onSelect(animation)}
        style={{ cursor: 'pointer' }}
        title="Click to view details & customize"
      >
        <div
          className={`stage-element ${animation.animClass}`}
          style={{
            background: `linear-gradient(135deg, ${animation.accentColor} 0%, #4338ca 100%)`,
            color: '#ffffff',
          }}
        >
          {animation.icon}
        </div>
      </div>

      <div className="card-content">
        <div className="card-header-row">
          <h3 className="card-name">{animation.name}</h3>
          <span className="card-category">{animation.category}</span>
        </div>

        <p className="card-desc">{animation.description}</p>

        <div className="card-footer">
          <button
            onClick={() => onSelect(animation)}
            className="btn btn-secondary btn-sm"
          >
            Customize
          </button>
          <button
            onClick={handleCopy}
            className={`btn-copy ${copied ? 'copied' : ''}`}
            title="Copy CSS to clipboard"
          >
            {copied ? '✓ Copied' : '📋 CSS'}
          </button>
        </div>
      </div>
    </div>
  );
}
