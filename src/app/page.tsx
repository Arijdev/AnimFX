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

          <div className="hero-actions">
            <Link href="/library" className="btn btn-primary">
              Explore All 50 Animations →
            </Link>
            <Link href="/playground" className="btn btn-secondary">
              Open Interactive Playground
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
