'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ANIMATIONS, CATEGORIES, AnimationDef, Category } from '../../data/animations';
import AnimationCard from '../../components/AnimationCard';
import AnimationModal from '../../components/AnimationModal';

function LibraryContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get('cat') as Category) || 'all';

  const [activeCategory, setActiveCategory] = useState<Category>(
    CATEGORIES.some((c) => c.id === initialCategory) ? initialCategory : 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAnim, setSelectedAnim] = useState<AnimationDef | null>(null);

  const filteredAnimations = useMemo(() => {
    return ANIMATIONS.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="section">
      <div className="container">
        {/* Page Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 className="section-title" style={{ fontSize: '2.2rem', marginBottom: '8px' }}>
            Animation Library
          </h1>
          <p className="section-desc">
            Browse, search, and copy from our catalog of 50 pure CSS keyframe animations.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="filters-bar">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by name, category, or behavior (e.g. bounce, fade, glow)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="search-clear-btn"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="category-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              >
                <span>{cat.label}</span>
                <span className="tab-count">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Result status summary */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '20px',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
          }}
        >
          <span>
            Showing <strong>{filteredAnimations.length}</strong> of{' '}
            <strong>{ANIMATIONS.length}</strong> animations
            {activeCategory !== 'all' && ` in "${activeCategory}"`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>

          {(activeCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-text)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.88rem',
              }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Animations Grid */}
        {filteredAnimations.length > 0 ? (
          <div className="animations-grid">
            {filteredAnimations.map((anim) => (
              <AnimationCard
                key={anim.id}
                animation={anim}
                onSelect={(a) => setSelectedAnim(a)}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '64px 20px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🔎</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-primary)' }}>
              No matching animations found
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
              We couldn't find any animations matching "{searchQuery}". Try a different keyword or category.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="btn btn-primary btn-sm"
            >
              View All Animations
            </button>
          </div>
        )}
      </div>

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

export default function LibraryPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '64px 0', textAlign: 'center' }}>Loading Library...</div>}>
      <LibraryContent />
    </Suspense>
  );
}
