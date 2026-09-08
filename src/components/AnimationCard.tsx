'use client';

import { motion } from 'framer-motion';
import { Code2, Sliders } from 'lucide-react';
import { AnimationDef } from './CodeModal';

interface AnimationCardProps {
  anim: AnimationDef;
  index: number;
  onClick: (anim: AnimationDef) => void;
}

const CATEGORY_BADGE: Record<string, { label: string; color: string; dot: string }> = {
  basic:     { label: 'Basic',     color: 'bg-sky-500/15 text-sky-300 border-sky-500/25',     dot: 'bg-sky-400' },
  entrance:  { label: 'Entrance',  color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25', dot: 'bg-emerald-400' },
  attention: { label: 'Attention', color: 'bg-amber-500/15 text-amber-300 border-amber-500/25',  dot: 'bg-amber-400' },
  glow:      { label: 'Glow',      color: 'bg-violet-500/15 text-violet-300 border-violet-500/25', dot: 'bg-violet-400' },
  creative:  { label: 'Creative',  color: 'bg-pink-500/15 text-pink-300 border-pink-500/25',    dot: 'bg-pink-400' },
};

export default function AnimationCard({ anim, index, onClick }: AnimationCardProps) {
  const badge = CATEGORY_BADGE[anim.category];

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.4), ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={() => onClick(anim)}
      className="group relative w-full text-left glass glass-h rounded-2xl p-5 cursor-pointer
                 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
      aria-label={`View ${anim.name} animation code`}
    >
      {/* Accent corner glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at top left, ${anim.accentColor}20 0%, transparent 65%)` }}
      />

      {/* Top row: category badge + code icon */}
      <div className="flex items-center justify-between mb-4">
        <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full border ${badge.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
          {badge.label}
        </span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white/30">
          <Code2 size={14} />
        </span>
      </div>

      {/* Animation preview */}
      <div
        className="flex items-center justify-center h-20 sm:h-24 mb-4 rounded-xl transition-colors duration-300"
        style={{ background: `${anim.accentColor}10` }}
      >
        <span
          className={`text-4xl sm:text-5xl inline-block leading-none select-none ${anim.animClass}`}
          aria-hidden="true"
        >
          {anim.icon}
        </span>
      </div>

      {/* Info */}
      <h3
        className="text-sm sm:text-base font-semibold text-white mb-1 leading-snug"
        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
      >
        {anim.name}
      </h3>
      <p className="text-xs text-white/40 leading-relaxed line-clamp-2">{anim.description}</p>

      {/* "Click to customize & copy" footer hint */}
      <div className="mt-3 flex items-center gap-1.5 text-[10px] text-white/20 group-hover:text-violet-300 transition-colors duration-200">
        <Sliders size={10} />
        Click to customize &amp; copy code
      </div>
    </motion.button>
  );
}
