'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const PLAYGROUND_ANIMS = [
  { id: 'bounce',   label: 'Bounce',      cssClass: 'anim-bounce',   emoji: '🎯' },
  { id: 'rotate',   label: 'Rotate',      cssClass: 'anim-rotate',   emoji: '🔄' },
  { id: 'pulse',    label: 'Pulse',       cssClass: 'anim-pulse',    emoji: '💓' },
  { id: 'fade',     label: 'Fade',        cssClass: 'anim-fade',     emoji: '👻' },
  { id: 'slide',    label: 'Slide Up',    cssClass: 'anim-slide-up', emoji: '⬆️' },
  { id: 'flip',     label: 'Flip',        cssClass: 'anim-flip',     emoji: '🃏' },
  { id: 'shake',    label: 'Shake',       cssClass: 'anim-shake',    emoji: '⚡' },
  { id: 'glow',     label: 'Glow',        cssClass: 'anim-glow',     emoji: '✨' },
  { id: 'float',    label: 'Float',       cssClass: 'anim-float',    emoji: '🎈' },
  { id: 'color',    label: 'Color Cycle', cssClass: 'anim-color',    emoji: '🌈' },
  { id: 'elastic',  label: 'Elastic',     cssClass: 'anim-elastic',  emoji: '🧲' },
  { id: 'blur',     label: 'Blur',        cssClass: 'anim-blur',     emoji: '🌀' },
  { id: 'swing',    label: 'Swing',       cssClass: 'anim-swing',    emoji: '🎪' },
  { id: 'morph',    label: 'Morph',       cssClass: 'anim-morph',    emoji: '🔮' },
];

const SHAPES = [
  { id: 'circle',   label: 'Circle',   class: 'rounded-full w-24 h-24' },
  { id: 'square',   label: 'Square',   class: 'rounded-xl w-24 h-24' },
  { id: 'triangle', label: 'Emoji',    class: 'text-5xl leading-none' },
];

const COLORS = [
  { id: 'violet', label: 'Violet', from: '#7c3aed', to: '#4f46e5' },
  { id: 'cyan',   label: 'Cyan',   from: '#06b6d4', to: '#0891b2' },
  { id: 'pink',   label: 'Pink',   from: '#ec4899', to: '#db2777' },
  { id: 'emerald',label: 'Green',  from: '#10b981', to: '#059669' },
  { id: 'amber',  label: 'Amber',  from: '#f59e0b', to: '#d97706' },
];

const SPEEDS = [
  { id: '0.5x', label: '0.5×', mult: 2 },
  { id: '1x',   label: '1×',   mult: 1 },
  { id: '2x',   label: '2×',   mult: 0.5 },
  { id: '3x',   label: '3×',   mult: 0.33 },
];

export default function AnimationPlayground() {
  const [selectedAnim, setSelectedAnim] = useState(PLAYGROUND_ANIMS[0]);
  const [selectedShape, setSelectedShape] = useState(SHAPES[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedSpeed, setSelectedSpeed] = useState(SPEEDS[1]);
  const [playing, setPlaying] = useState(true);

  const animStyle: React.CSSProperties = {
    background: `linear-gradient(135deg, ${selectedColor.from}, ${selectedColor.to})`,
    animationDuration: `${selectedSpeed.mult}s`,
    boxShadow: `0 0 40px ${selectedColor.from}60`,
  };

  return (
    <section id="playground" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-pink-500/15 text-pink-300 border border-pink-500/25 mb-4">
            Interactive
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Animation <span className="gradient-text-pink">Playground</span>
          </h2>
          <p className="text-white/45 max-w-xl mx-auto">
            Mix and match animations, shapes, colors and speeds in real time.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Preview panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-3xl p-8 flex flex-col items-center justify-center min-h-[340px] gap-6"
          >
            {/* The animated element */}
            <div className="flex items-center justify-center w-full h-48">
              {selectedShape.id !== 'triangle' ? (
                <div
                  className={`${selectedShape.class} ${playing ? selectedAnim.cssClass : ''}`}
                  style={animStyle}
                />
              ) : (
                <span
                  className={`${selectedShape.class} ${playing ? selectedAnim.cssClass : ''}`}
                  style={{ animationDuration: `${selectedSpeed.mult}s` }}
                >
                  {selectedAnim.emoji}
                </span>
              )}
            </div>

            {/* Play/Pause */}
            <button
              onClick={() => setPlaying((p) => !p)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                playing
                  ? 'bg-white/10 text-white hover:bg-white/15 border border-white/15'
                  : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.4)]'
              }`}
            >
              {playing ? '⏸ Pause' : '▶ Play'}
            </button>

            {/* Label */}
            <div className="text-center">
              <p className="text-white font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {selectedAnim.label}
              </p>
              <p className="text-white/35 text-sm mt-0.5">
                {selectedSpeed.label} speed · {selectedColor.label}
              </p>
            </div>
          </motion.div>

          {/* Controls panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* Animation picker */}
            <div className="glass rounded-2xl p-5">
              <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">Animation</p>
              <div className="flex flex-wrap gap-2">
                {PLAYGROUND_ANIMS.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setSelectedAnim(a)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      selectedAnim.id === a.id
                        ? 'bg-violet-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                        : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Shape picker */}
            <div className="glass rounded-2xl p-5">
              <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">Shape</p>
              <div className="flex gap-3">
                {SHAPES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedShape(s)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      selectedShape.id === s.id
                        ? 'bg-violet-600 text-white'
                        : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color picker */}
            <div className="glass rounded-2xl p-5">
              <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">Color</p>
              <div className="flex gap-3">
                {COLORS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c)}
                    title={c.label}
                    className={`w-9 h-9 rounded-xl transition-all duration-200 ${
                      selectedColor.id === c.id
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent scale-110'
                        : 'hover:scale-105'
                    }`}
                    style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}
                  />
                ))}
              </div>
            </div>

            {/* Speed picker */}
            <div className="glass rounded-2xl p-5">
              <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">Speed</p>
              <div className="grid grid-cols-4 gap-2">
                {SPEEDS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSpeed(s)}
                    className={`py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      selectedSpeed.id === s.id
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]'
                        : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                    }`}
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
