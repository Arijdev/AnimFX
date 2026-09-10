'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ANIMATIONS, AnimationDef } from '../data/animations';
import AnimationCard from '../components/AnimationCard';
import AnimationModal from '../components/AnimationModal';

export default function HomePage() {
  const [selectedAnim, setSelectedAnim] = useState<AnimationDef | null>(null);

  // Handpick 8 popular featured animations
  const featuredIds = [
    'bounce',
    'pulse',
    'shimmer',
    'pop-in',
    'float',
    'shake',
    'gradient-flow',
    'morph-box',
  ];

  const featuredAnimations = ANIMATIONS.filter((a) =>
    featuredIds.includes(a.id)
  );

  return (
    <div>
      {/* ── HERO SECTION ────────────────────────────── */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-pill">
            <span className="hero-pill-dot"></span>
            <span>50 Production Animations • Zero JavaScript Runtime</span>
          </div>

          <h1 className="hero-title">
            Classic, Lightweight <br />
            <span className="highlight">Pure CSS Animations</span>
          </h1>

          <p className="hero-subtitle">
            Enhance your web applications with 60 FPS hardware-accelerated keyframe
            animations. Fully customizable, framework-agnostic, and ready to copy into your project.
          </p>

          <div className="hero-actions" style={{ flexWrap: 'wrap', gap: '12px' }}>
            <Link
              href="/ai-generator"
              className="btn"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)',
                color: '#ffffff',
                fontWeight: 700,
                boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)',
                border: 'none',
              }}
            >
              ✨ Create with Gemini AI →
            </Link>
            <Link href="/library" className="btn btn-primary">
              Explore All 50 Animations
            </Link>
            <Link href="/playground" className="btn btn-secondary">
              Interactive Playground
            </Link>
          </div>

          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">50</div>
              <div className="stat-label">Unique Animations</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">0 KB</div>
              <div className="stat-label">JavaScript Dependencies</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">60 FPS</div>
              <div className="stat-label">Hardware Accelerated</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">100%</div>
              <div className="stat-label">Open Source & Free</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI GENERATOR SPOTLIGHT BANNER ───────────── */}
      <section style={{ padding: '0 0 20px 0' }}>
        <div className="container">
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(168, 85, 247, 0.15) 50%, rgba(217, 70, 239, 0.1) 100%)',
              border: '1px solid rgba(168, 85, 247, 0.35)',
              borderRadius: '16px',
              padding: 'clamp(20px, 4vw, 36px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              flexWrap: 'wrap',
              boxShadow: '0 8px 32px rgba(139, 92, 246, 0.15)',
            }}
          >
            <div style={{ maxWidth: '640px' }}>
              <div className="ai-studio-badge">
                <span className="sparkle">✨</span> NEW FEATURE
              </div>
              <h2 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 1.9rem)', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>
                Create Custom Animations with Gemini AI
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Prompt any visual effect—cyberpunk portals, 3D floating glass, liquid blobs, or magnetic buttons. Gemini generates complete CSS keyframes, HTML, and isolated real-time sandbox preview.
              </p>
            </div>
            <Link
              href="/ai-generator"
              className="btn"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)',
                color: '#ffffff',
                fontWeight: 700,
                padding: '12px 24px',
                fontSize: '0.95rem',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 18px rgba(139, 92, 246, 0.35)',
              }}
            >
              Open AI Motion Studio →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED SECTION ────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Popular Animations</h2>
              <p className="section-desc">
                Frequently used entrance, attention, and creative micro-interactions.
              </p>
            </div>
            <Link href="/library" className="btn btn-outline-primary btn-sm">
              View All 50 in Library →
            </Link>
          </div>

          <div className="animations-grid">
            {featuredAnimations.map((anim) => (
              <AnimationCard
                key={anim.id}
                animation={anim}
                onSelect={(a) => setSelectedAnim(a)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUE PROPOSITIONS ──────────────────────── */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="section-title">Why Use Pure CSS Keyframes?</h2>
            <p className="section-desc" style={{ maxWidth: '600px', margin: '8px auto 0' }}>
              Built for performance-critical web applications where every millisecond and kilobyte matters.
            </p>
          </div>

          <div className="features-grid">
            <div className="docs-card" style={{ marginBottom: 0 }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>⚡</div>
              <h3>Zero Runtime Overhead</h3>
              <p>
                No heavy external libraries like Framer Motion or GSAP needed. Browser native CSS engines handle all execution without blocking the main JavaScript thread.
              </p>
            </div>

            <div className="docs-card" style={{ marginBottom: 0 }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🎯</div>
              <h3>GPU Compositing</h3>
              <p>
                All keyframes leverage hardware-composited CSS properties (`transform` and `opacity`) to eliminate layout recalculations and guarantee smooth 60fps renders.
              </p>
            </div>

            <div className="docs-card" style={{ marginBottom: 0 }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🧩</div>
              <h3>Universal Compatibility</h3>
              <p>
                Works seamlessly in React, Vue, Next.js, Svelte, Angular, Astro, or static HTML. Simply copy the `@keyframes` block directly into your stylesheet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Dialog */}
      {selectedAnim && (
        <AnimationModal
          animation={selectedAnim}
          onClose={() => setSelectedAnim(null)}
        />
      )}
    </div>
  );
}
