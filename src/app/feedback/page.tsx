'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FeedbackPage() {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState<'suggestion' | 'request' | 'bug' | 'praise'>('suggestion');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !email.trim()) {
      alert('Please provide your email address and message.');
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setRating(5);
    setCategory('suggestion');
    setName('');
    setEmail('');
    setMessage('');
    setSubmitted(false);
  };

  const categories = [
    { id: 'suggestion', label: '💡 New Animation Suggestion' },
    { id: 'request', label: '🚀 Feature Request' },
    { id: 'bug', label: '🐞 Bug Report' },
    { id: 'praise', label: '❤️ General Feedback' },
  ];

  return (
    <div className="section">
      <div className="container feedback-container">
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h1 className="section-title" style={{ fontSize: '2.2rem', marginBottom: '8px' }}>
            Feedback & Community
          </h1>
          <p className="section-desc">
            Help us improve AnimFX. Suggest a new animation keyframe, report an issue, or share your thoughts.
          </p>
        </div>

        {submitted ? (
          <div
            className="docs-card"
            style={{
              textAlign: 'center',
              padding: '48px 24px',
              backgroundColor: 'var(--bg-secondary)',
            }}
          >
            <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🎉</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
              Thank You for Your Feedback!
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto 24px', lineHeight: 1.6 }}>
              Your suggestions help shape future releases and new CSS keyframe additions to the AnimFX library.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button onClick={handleReset} className="btn btn-secondary">
                Submit Another Response
              </button>
              <Link href="/library" className="btn btn-primary">
                Explore Library
              </Link>
            </div>
          </div>
        ) : (
          <div
            className="docs-card"
            style={{ backgroundColor: 'var(--bg-secondary)', padding: '32px' }}
          >
            <form onSubmit={handleSubmit}>
              {/* Star Rating */}
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Rate Your Experience</label>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star-btn ${
                        (hoverRating || rating) >= star ? 'active' : ''
                      }`}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      aria-label={`Rate ${star} star`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Category */}
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Category</label>
                <div className="category-chips">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategory(c.id as any)}
                      className={`chip-btn ${category === c.id ? 'active' : ''}`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name (Optional) */}
              <div className="form-group">
                <label className="form-label" htmlFor="feedback-name">
                  Your Name (Optional)
                </label>
                <input
                  id="feedback-name"
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                />
              </div>

              {/* Email (Required) */}
              <div className="form-group">
                <label className="form-label" htmlFor="feedback-email">
                  Email Address <span style={{ color: '#e11d48' }}>*</span>
                </label>
                <input
                  id="feedback-email"
                  type="email"
                  placeholder="alex@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                />
              </div>

              {/* Message */}
              <div className="form-group">
                <label className="form-label" htmlFor="feedback-message">
                  Your Message or Animation Idea <span style={{ color: '#e11d48' }}>*</span>
                </label>
                <textarea
                  id="feedback-message"
                  placeholder="Tell us what new animation effect you'd like to see, or any feedback..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="form-textarea"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '12px' }}
              >
                Submit Feedback
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
