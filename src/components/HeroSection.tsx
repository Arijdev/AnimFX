'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';

const PARTICLES = [
  { w:4, h:4, top:'15%', left:'8%',  bg:'#7c3aed', op:.7, dur:'6s',  del:'0s'   },
  { w:6, h:6, top:'22%', left:'88%', bg:'#06b6d4', op:.5, dur:'8s',  del:'1s'   },
  { w:3, h:3, top:'60%', left:'4%',  bg:'#ec4899', op:.6, dur:'7s',  del:'2s'   },
  { w:5, h:5, top:'72%', left:'92%', bg:'#10b981', op:.5, dur:'9s',  del:'0.5s' },
  { w:4, h:4, top:'40%', left:'52%', bg:'#f59e0b', op:.4, dur:'10s', del:'3s'   },
  { w:3, h:3, top:'82%', left:'38%', bg:'#7c3aed', op:.5, dur:'5s',  del:'1.5s' },
  { w:5, h:5, top:'10%', left:'62%', bg:'#06b6d4', op:.4, dur:'11s', del:'2.5s' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-mesh pt-16 sm:pt-20">
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="orb-1 absolute -top-32 -left-32 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full"
          style={{ background:'radial-gradient(circle, rgba(124,58,237,.22) 0%, transparent 70%)' }} />
        <div className="orb-2 absolute -bottom-32 -right-32 w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] rounded-full"
          style={{ background:'radial-gradient(circle, rgba(6,182,212,.18) 0%, transparent 70%)' }} />
        <div className="orb-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full"
          style={{ background:'radial-gradient(circle, rgba(236,72,153,.1) 0%, transparent 70%)' }} />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none grid-bg" />

      {/* Particles */}
      {PARTICLES.map((p, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none"
          style={{ width:p.w, height:p.h, top:p.top, left:p.left, background:p.bg, opacity:p.op,
            animation:`particle-drift ${p.dur} ease-in-out ${p.del} infinite` }} />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:.6, delay:.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-violet-500/30 text-xs sm:text-sm font-medium text-violet-300 mb-6 sm:mb-8"
        >
          <Sparkles size={13} className="text-violet-400" />
          50 CSS Animation Types
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 anim-pulse inline-block" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity:0, y:30 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:.7, delay:.2 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-5 sm:mb-6"
          style={{ fontFamily:'Space Grotesk, sans-serif' }}
        >
          <span className="text-white block sm:inline">Master CSS</span>
          <br className="hidden sm:block" />
          <span className="shimmer-text"> Animations</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:.6, delay:.4 }}
          className="text-base sm:text-xl text-white/50 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2"
        >
          Explore 50 interactive animations. Click any card to view &amp; copy the CSS — drop it straight into your project.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:.6, delay:.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <a href="#animations"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-[0_0_30px_rgba(124,58,237,.5)] hover:shadow-[0_0_50px_rgba(124,58,237,.7)] transition-all duration-300 text-center">
            Browse 50 Animations ↓
          </a>
          <a href="#playground"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-semibold text-white/80 glass hover:text-white border border-white/10 hover:border-white/20 transition-all duration-300 text-center">
            Open Playground →
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ duration:.8, delay:.8 }}
          className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
        >
          {[['50+','Animations'],['100%','Pure CSS'],['0','Dependencies']].map(([val, lbl]) => (
            <div key={lbl} className="flex flex-col items-center gap-1">
              <span className="text-2xl sm:text-3xl font-bold gradient-text" style={{ fontFamily:'Space Grotesk, sans-serif' }}>{val}</span>
              <span className="text-xs sm:text-sm text-white/40">{lbl}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ delay:1.2 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/25"
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ArrowDown size={14} className="anim-bounce" />
      </motion.div>
    </section>
  );
}
