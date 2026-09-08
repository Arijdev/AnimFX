'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AnimationCard from '@/components/AnimationCard';
import CodeModal, { AnimationDef } from '@/components/CodeModal';
import AnimationPlayground from '@/components/AnimationPlayground';
import { Search, X, Zap, GitBranch, Globe } from 'lucide-react';

/* ════════════════════════════════════════════════════
   50 ANIMATIONS DATA
════════════════════════════════════════════════════ */
const ANIMATIONS: AnimationDef[] = [
  /* ── BASIC (1-10) ─────────────────────────── */
  {
    id:'bounce', name:'Bounce', category:'basic', animClass:'anim-bounce', accentColor:'#7c3aed', icon:'🏀',
    description:'Simulates a rubber-ball bounce using easing curves on translateY.',
    cssSnippet:
`/* Bounce Animation */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  40% {
    transform: translateY(-28px);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  }
  70%  { transform: translateY(-14px); }
  90%  { transform: translateY(-4px); }
}

.bounce {
  animation: bounce 1s ease infinite;
}`,
  },
  {
    id:'rotate', name:'Rotate', category:'basic', animClass:'anim-rotate', accentColor:'#06b6d4', icon:'⚙️',
    description:'Continuous 360° clockwise rotation at a constant linear speed.',
    cssSnippet:
`/* Rotate Animation */
@keyframes rotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.rotate {
  animation: rotate 1s linear infinite;
}`,
  },
  {
    id:'pulse', name:'Pulse', category:'basic', animClass:'anim-pulse', accentColor:'#ec4899', icon:'💓',
    description:'Rhythmic scale in/out creating a heartbeat or breathing effect.',
    cssSnippet:
`/* Pulse Animation */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.25); }
}

.pulse {
  animation: pulse 1s ease-in-out infinite;
}`,
  },
  {
    id:'fade', name:'Fade', category:'basic', animClass:'anim-fade', accentColor:'#f59e0b', icon:'👻',
    description:'Smooth opacity oscillation between visible and nearly transparent.',
    cssSnippet:
`/* Fade Animation */
@keyframes fade {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.1; }
}

.fade {
  animation: fade 1.5s ease-in-out infinite;
}`,
  },
  {
    id:'slide-left', name:'Slide Left', category:'basic', animClass:'anim-slide-left', accentColor:'#10b981', icon:'◀️',
    description:'Oscillates left on translateX — great for directional indicators.',
    cssSnippet:
`/* Slide Left Animation */
@keyframes slideLeft {
  0%, 100% { transform: translateX(0); }
  50%       { transform: translateX(-24px); }
}

.slide-left {
  animation: slideLeft 1s ease-in-out infinite;
}`,
  },
  {
    id:'slide-right', name:'Slide Right', category:'basic', animClass:'anim-slide-right', accentColor:'#3b82f6', icon:'▶️',
    description:'Oscillates right — mirror of slide-left for arrows and indicators.',
    cssSnippet:
`/* Slide Right Animation */
@keyframes slideRight {
  0%, 100% { transform: translateX(0); }
  50%       { transform: translateX(24px); }
}

.slide-right {
  animation: slideRight 1s ease-in-out infinite;
}`,
  },
  {
    id:'slide-up', name:'Slide Up', category:'basic', animClass:'anim-slide-up', accentColor:'#a78bfa', icon:'⬆️',
    description:'Vertical oscillation — ideal for scroll cues and down-arrows.',
    cssSnippet:
`/* Slide Up Animation */
@keyframes slideUp {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-24px); }
}

.slide-up {
  animation: slideUp 1s ease-in-out infinite;
}`,
  },
  {
    id:'slide-down', name:'Slide Down', category:'basic', animClass:'anim-slide-down', accentColor:'#34d399', icon:'⬇️',
    description:'Downward oscillation — pair with slide-up for ping-pong effects.',
    cssSnippet:
`/* Slide Down Animation */
@keyframes slideDown {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(24px); }
}

.slide-down {
  animation: slideDown 1s ease-in-out infinite;
}`,
  },
  {
    id:'flip-x', name:'Flip X', category:'basic', animClass:'anim-flip-x', accentColor:'#60a5fa', icon:'🪙',
    description:'Full perspective rotateX flip — like flipping a pancake.',
    cssSnippet:
`/* Flip X Animation */
@keyframes flipX {
  0%   { transform: perspective(400px) rotateX(0); }
  50%  { transform: perspective(400px) rotateX(180deg); }
  100% { transform: perspective(400px) rotateX(360deg); }
}

.flip-x {
  animation: flipX 1.4s ease-in-out infinite;
}`,
  },
  {
    id:'flip-y', name:'Flip Y', category:'basic', animClass:'anim-flip-y', accentColor:'#f472b6', icon:'🃏',
    description:'Full perspective rotateY flip — a classic coin-toss 3D effect.',
    cssSnippet:
`/* Flip Y Animation */
@keyframes flipY {
  0%   { transform: perspective(400px) rotateY(0); }
  50%  { transform: perspective(400px) rotateY(180deg); }
  100% { transform: perspective(400px) rotateY(360deg); }
}

.flip-y {
  animation: flipY 1.4s ease-in-out infinite;
}`,
  },

  /* ── ENTRANCE (11-21) ──────────────────────── */
  {
    id:'bounce-in', name:'Bounce In', category:'entrance', animClass:'anim-bounce-in', accentColor:'#7c3aed', icon:'🎯',
    description:'Scales from zero with elastic overshoot — dramatic entrance.',
    cssSnippet:
`/* Bounce In — Entrance */
@keyframes bounceIn {
  0%         { transform: scale(0.3); opacity: 0; }
  50%        { transform: scale(1.05); opacity: 1; }
  70%        { transform: scale(0.9); }
  100%       { transform: scale(1); opacity: 1; }
}

.bounce-in {
  animation: bounceIn 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
  /* Remove 'infinite' for one-shot entrance */
}`,
  },
  {
    id:'fade-in-up', name:'Fade In Up', category:'entrance', animClass:'anim-fade-in-up', accentColor:'#06b6d4', icon:'🚀',
    description:'Rises into view while fading in — the most versatile entrance.',
    cssSnippet:
`/* Fade In Up — Entrance */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease forwards;
  /* Use animation-delay for staggered lists */
}`,
  },
  {
    id:'fade-in-down', name:'Fade In Down', category:'entrance', animClass:'anim-fade-in-down', accentColor:'#10b981', icon:'🌧️',
    description:'Drops in from above while fading in — great for dropdown menus.',
    cssSnippet:
`/* Fade In Down — Entrance */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-down {
  animation: fadeInDown 0.6s ease forwards;
}`,
  },
  {
    id:'fade-in-left', name:'Fade In Left', category:'entrance', animClass:'anim-fade-in-left', accentColor:'#f59e0b', icon:'⬅️',
    description:'Slides in from the left while fading — ideal for sidebar reveals.',
    cssSnippet:
`/* Fade In Left — Entrance */
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.fade-in-left {
  animation: fadeInLeft 0.6s ease forwards;
}`,
  },
  {
    id:'fade-in-right', name:'Fade In Right', category:'entrance', animClass:'anim-fade-in-right', accentColor:'#a78bfa', icon:'➡️',
    description:'Slides in from the right while fading — pairs with fade-in-left.',
    cssSnippet:
`/* Fade In Right — Entrance */
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.fade-in-right {
  animation: fadeInRight 0.6s ease forwards;
}`,
  },
  {
    id:'zoom-in', name:'Zoom In', category:'entrance', animClass:'anim-zoom-in', accentColor:'#ec4899', icon:'🔍',
    description:'Grows from invisibly small to full size — punchy and dramatic.',
    cssSnippet:
`/* Zoom In — Entrance */
@keyframes zoomIn {
  from {
    transform: scale(0.2);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.zoom-in {
  animation: zoomIn 0.5s ease-out forwards;
}`,
  },
  {
    id:'zoom-out', name:'Zoom Out', category:'entrance', animClass:'anim-zoom-out', accentColor:'#f43f5e', icon:'🔭',
    description:'Shrinks to nothing — use as an exit or reveal-by-hiding effect.',
    cssSnippet:
`/* Zoom Out — Exit */
@keyframes zoomOut {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.2);
    opacity: 0;
  }
}

.zoom-out {
  animation: zoomOut 0.5s ease-in forwards;
}`,
  },
  {
    id:'rotate-in', name:'Rotate In', category:'entrance', animClass:'anim-rotate-in', accentColor:'#3b82f6', icon:'🌀',
    description:'Spins in from negative rotation — great for icons and badges.',
    cssSnippet:
`/* Rotate In — Entrance */
@keyframes rotateIn {
  from {
    transform: rotate(-360deg) scale(0);
    opacity: 0;
  }
  to {
    transform: rotate(0deg) scale(1);
    opacity: 1;
  }
}

.rotate-in {
  animation: rotateIn 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}`,
  },
  {
    id:'slide-in-down', name:'Slide In Down', category:'entrance', animClass:'anim-slide-in-down', accentColor:'#34d399', icon:'🪂',
    description:'Slides in from above with a fade — natural-feeling drop animation.',
    cssSnippet:
`/* Slide In Down — Entrance */
@keyframes slideInDown {
  from {
    transform: translateY(-60px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-in-down {
  animation: slideInDown 0.5s ease forwards;
}`,
  },
  {
    id:'back-in-up', name:'Back In Up', category:'entrance', animClass:'anim-back-in-up', accentColor:'#60a5fa', icon:'📦',
    description:'Rises from below at 70% scale then snaps to full — unique depth feel.',
    cssSnippet:
`/* Back In Up — Entrance */
@keyframes backInUp {
  0% {
    transform: translateY(80px) scale(0.7);
    opacity: 0.7;
  }
  80% {
    transform: translateY(0) scale(0.7);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.back-in-up {
  animation: backInUp 0.8s ease forwards;
}`,
  },
  {
    id:'jack-in-box', name:'Jack In Box', category:'entrance', animClass:'anim-jack-in-box', accentColor:'#f472b6', icon:'🎁',
    description:'Pops in from the bottom with a springy overshoot — playful entrance.',
    cssSnippet:
`/* Jack In Box — Entrance */
@keyframes jackInBox {
  0% {
    transform: scale(0.1) rotate(30deg);
    transform-origin: center bottom;
    opacity: 0;
  }
  50%  { transform: rotate(-10deg); opacity: 1; }
  70%  { transform: rotate(3deg); }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}

.jack-in-box {
  animation: jackInBox 0.75s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
}`,
  },

  /* ── ATTENTION (22-31) ─────────────────────── */
  {
    id:'shake', name:'Shake', category:'attention', animClass:'anim-shake', accentColor:'#f43f5e', icon:'⚡',
    description:'Quick X-axis jitter with slight rotation — error or alert signal.',
    cssSnippet:
`/* Shake Animation */
@keyframes shake {
  0%, 100% { transform: translateX(0) rotate(0deg); }
  15%       { transform: translateX(-8px) rotate(-4deg); }
  30%       { transform: translateX(8px) rotate(4deg); }
  45%       { transform: translateX(-6px) rotate(-2deg); }
  60%       { transform: translateX(6px) rotate(2deg); }
  75%       { transform: translateX(-3px) rotate(-1deg); }
  90%       { transform: translateX(3px) rotate(1deg); }
}

.shake {
  animation: shake 0.8s ease-in-out infinite;
}`,
  },
  {
    id:'wobble', name:'Wobble', category:'attention', animClass:'anim-wobble', accentColor:'#f59e0b', icon:'🌊',
    description:'Multi-directional X-translation with rotation — drunk/unstable feel.',
    cssSnippet:
`/* Wobble Animation */
@keyframes wobble {
  0%, 100% { transform: translateX(0); }
  15%       { transform: translateX(-20px) rotate(-5deg); }
  30%       { transform: translateX(15px) rotate(3deg); }
  45%       { transform: translateX(-10px) rotate(-3deg); }
  60%       { transform: translateX(8px) rotate(2deg); }
  75%       { transform: translateX(-4px) rotate(-1deg); }
}

.wobble {
  animation: wobble 1.2s ease-in-out infinite;
}`,
  },
  {
    id:'rubber-band', name:'Rubber Band', category:'attention', animClass:'anim-rubber-band', accentColor:'#10b981', icon:'🧲',
    description:'Alternates scaleX and scaleY — realistic elastic stretching effect.',
    cssSnippet:
`/* Rubber Band Animation */
@keyframes rubberBand {
  0%, 100% { transform: scale(1); }
  30%       { transform: scaleX(1.25) scaleY(0.75); }
  40%       { transform: scaleX(0.75) scaleY(1.25); }
  50%       { transform: scaleX(1.15) scaleY(0.85); }
  65%       { transform: scaleX(0.95) scaleY(1.05); }
  75%       { transform: scaleX(1.05) scaleY(0.95); }
}

.rubber-band {
  animation: rubberBand 1s ease-in-out infinite;
}`,
  },
  {
    id:'jello', name:'Jello', category:'attention', animClass:'anim-jello', accentColor:'#7c3aed', icon:'🍮',
    description:'Dual-axis skew sequence that makes the element look like jello.',
    cssSnippet:
`/* Jello Animation */
@keyframes jello {
  0%, 11.1%, 100% { transform: none; }
  22.2% { transform: skewX(-12.5deg) skewY(-12.5deg); }
  33.3% { transform: skewX(6.25deg) skewY(6.25deg); }
  44.4% { transform: skewX(-3.125deg) skewY(-3.125deg); }
  55.5% { transform: skewX(1.5625deg) skewY(1.5625deg); }
  66.6% { transform: skewX(-0.78deg) skewY(-0.78deg); }
  77.7% { transform: skewX(0.39deg) skewY(0.39deg); }
  88.8% { transform: skewX(-0.2deg) skewY(-0.2deg); }
}

.jello {
  animation: jello 1.5s ease infinite;
}`,
  },
  {
    id:'tada', name:'Tada', category:'attention', animClass:'anim-tada', accentColor:'#ec4899', icon:'🎉',
    description:'Scale squeeze plus alternating rotation — celebratory reveal.',
    cssSnippet:
`/* Tada Animation */
@keyframes tada {
  0%, 100%    { transform: scaleX(1); }
  10%, 20%    { transform: scale3d(0.9, 0.9, 0.9) rotate(-3deg); }
  30%, 50%, 70%, 90% { transform: scale3d(1.1, 1.1, 1.1) rotate(3deg); }
  40%, 60%, 80%      { transform: scale3d(1.1, 1.1, 1.1) rotate(-3deg); }
}

.tada {
  animation: tada 1.5s ease-in-out infinite;
}`,
  },
  {
    id:'flash', name:'Flash', category:'attention', animClass:'anim-flash', accentColor:'#fbbf24', icon:'💥',
    description:'Hard-cut opacity toggle — urgent notification or cursor blink.',
    cssSnippet:
`/* Flash Animation */
@keyframes flash {
  0%, 50%, 100% { opacity: 1; }
  25%, 75%      { opacity: 0; }
}

.flash {
  animation: flash 1s ease infinite;
}`,
  },
  {
    id:'heartbeat', name:'Heartbeat', category:'attention', animClass:'anim-heartbeat', accentColor:'#f43f5e', icon:'❤️',
    description:'Double-pump scale mimicking a real heartbeat — health/love UIs.',
    cssSnippet:
`/* Heartbeat Animation */
@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  14%       { transform: scale(1.3); }
  28%       { transform: scale(1); }
  42%       { transform: scale(1.3); }
  70%       { transform: scale(1); }
}

.heartbeat {
  animation: heartbeat 1.3s ease-in-out infinite;
}`,
  },
  {
    id:'swing', name:'Swing', category:'attention', animClass:'anim-swing', accentColor:'#a78bfa', icon:'🎐',
    description:'Rotates from a top-center pivot like a swinging sign or pendulum.',
    cssSnippet:
`/* Swing Animation */
@keyframes swing {
  0%, 100% { transform: rotate(0); transform-origin: top center; }
  25%       { transform: rotate(15deg); transform-origin: top center; }
  75%       { transform: rotate(-15deg); transform-origin: top center; }
}

.swing {
  animation: swing 1s ease-in-out infinite;
}`,
  },
  {
    id:'pendulum', name:'Pendulum', category:'attention', animClass:'anim-pendulum', accentColor:'#60a5fa', icon:'🕰️',
    description:'Wider arc swing — mimics a grandfather clock pendulum.',
    cssSnippet:
`/* Pendulum Animation */
@keyframes pendulum {
  0%, 100% { transform: rotate(-25deg); transform-origin: top center; }
  50%       { transform: rotate(25deg); transform-origin: top center; }
}

.pendulum {
  animation: pendulum 1.2s ease-in-out infinite;
}`,
  },
  {
    id:'sway', name:'Sway', category:'attention', animClass:'anim-sway', accentColor:'#34d399', icon:'🌿',
    description:'Slow diagonal sway combining rotation and translation — tree/plant feel.',
    cssSnippet:
`/* Sway Animation */
@keyframes sway {
  0%, 100% { transform: rotate(-10deg) translateX(-5px); }
  50%       { transform: rotate(10deg) translateX(5px); }
}

.sway {
  animation: sway 2s ease-in-out infinite;
}`,
  },

  /* ── GLOW/COLOR (32-38) ────────────────────── */
  {
    id:'neon-glow', name:'Neon Glow', category:'glow', animClass:'anim-glow', accentColor:'#7c3aed', icon:'✨',
    description:'Pulses drop-shadow to mimic a neon light powering on and off.',
    cssSnippet:
`/* Neon Glow Animation */
@keyframes neonGlow {
  0%, 100% {
    filter: drop-shadow(0 0 4px #7c3aed)
            drop-shadow(0 0 10px #7c3aed);
  }
  50% {
    filter: drop-shadow(0 0 16px #a78bfa)
            drop-shadow(0 0 40px #7c3aed)
            drop-shadow(0 0 80px #7c3aed);
  }
}

.neon-glow {
  animation: neonGlow 1.5s ease-in-out infinite;
}`,
  },
  {
    id:'color-cycle', name:'Color Cycle', category:'glow', animClass:'anim-color', accentColor:'#ec4899', icon:'🌈',
    description:'Cycles through the spectrum with matching glow — rainbow mode.',
    cssSnippet:
`/* Color Cycle Animation */
@keyframes colorCycle {
  0%   { color: #7c3aed; filter: drop-shadow(0 0 8px #7c3aed); }
  20%  { color: #06b6d4; filter: drop-shadow(0 0 8px #06b6d4); }
  40%  { color: #10b981; filter: drop-shadow(0 0 8px #10b981); }
  60%  { color: #f59e0b; filter: drop-shadow(0 0 8px #f59e0b); }
  80%  { color: #ec4899; filter: drop-shadow(0 0 8px #ec4899); }
  100% { color: #7c3aed; filter: drop-shadow(0 0 8px #7c3aed); }
}

.color-cycle {
  animation: colorCycle 2s linear infinite;
}`,
  },
  {
    id:'glitch', name:'Glitch', category:'glow', animClass:'anim-glitch', accentColor:'#f43f5e', icon:'📺',
    description:'Simulates a display glitch with translate + hue-rotate steps.',
    cssSnippet:
`/* Glitch Animation */
@keyframes glitch {
  0%, 85%, 100% { transform: translate(0); filter: none; }
  87% { transform: translate(-4px, 2px); filter: hue-rotate(90deg) saturate(200%); }
  89% { transform: translate(4px, -2px); filter: hue-rotate(-90deg); }
  91% { transform: translate(-2px, 0); filter: none; }
  93% { transform: translate(2px, 1px); filter: saturate(300%); }
  95% { transform: translate(0, -1px); filter: none; }
}

.glitch {
  animation: glitch 2s steps(1) infinite;
}`,
  },
  {
    id:'flicker', name:'Neon Flicker', category:'glow', animClass:'anim-flicker', accentColor:'#a78bfa', icon:'💡',
    description:'Simulates a faulty neon sign with random on/off opacity drops.',
    cssSnippet:
`/* Neon Flicker Animation */
@keyframes neonFlicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    filter: drop-shadow(0 0 8px #a78bfa)
            drop-shadow(0 0 20px #7c3aed);
    opacity: 1;
  }
  20%, 24%, 55% {
    filter: none;
    opacity: 0.4;
  }
}

.neon-flicker {
  animation: neonFlicker 3s linear infinite;
}`,
  },
  {
    id:'sparkle', name:'Sparkle', category:'glow', animClass:'anim-sparkle', accentColor:'#fbbf24', icon:'⭐',
    description:'Brightens with a golden drop-shadow burst — jewel or star effect.',
    cssSnippet:
`/* Sparkle Animation */
@keyframes sparkle {
  0%, 100% { filter: brightness(1); transform: scale(1); }
  50% {
    filter: brightness(2)
            drop-shadow(0 0 8px #fbbf24)
            drop-shadow(0 0 16px #f59e0b);
    transform: scale(1.1);
  }
}

.sparkle {
  animation: sparkle 1.5s ease-in-out infinite;
}`,
  },
  {
    id:'rainbow', name:'Rainbow', category:'glow', animClass:'anim-rainbow', accentColor:'#06b6d4', icon:'🦄',
    description:'Spins hue-rotate 360° — turns any coloured element into a rainbow.',
    cssSnippet:
`/* Rainbow Animation */
@keyframes rainbow {
  from { filter: hue-rotate(0deg) saturate(200%); }
  to   { filter: hue-rotate(360deg) saturate(200%); }
}

.rainbow {
  animation: rainbow 2s linear infinite;
}`,
  },
  {
    id:'gradient', name:'Gradient Shift', category:'glow', animClass:'anim-gradient', accentColor:'#10b981', icon:'🎨',
    description:'Animates a background-gradient position creating a flowing colour wave.',
    cssSnippet:
`/* Gradient Shift Animation */
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50%       { background-position: 100% 50%; }
}

.gradient-shift {
  background: linear-gradient(270deg, #7c3aed, #06b6d4, #ec4899, #10b981);
  background-size: 300% 300%;
  animation: gradientShift 3s ease infinite;
  /* Add background-clip: text for text variant */
}`,
  },

  /* ── CREATIVE (39-50) ──────────────────────── */
  {
    id:'float', name:'Float', category:'creative', animClass:'anim-float', accentColor:'#06b6d4', icon:'🎈',
    description:'Gentle vertical drift with subtle rotation — hero icons and badges.',
    cssSnippet:
`/* Float Animation */
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  33%       { transform: translateY(-16px) rotate(3deg); }
  66%       { transform: translateY(-8px) rotate(-3deg); }
}

.float {
  animation: float 3s ease-in-out infinite;
}`,
  },
  {
    id:'orbit', name:'Orbit', category:'creative', animClass:'anim-orbit', accentColor:'#7c3aed', icon:'🪐',
    description:'Element rotates around a fixed origin like a satellite in orbit.',
    cssSnippet:
`/* Orbit Animation */
@keyframes orbit {
  0%   { transform: rotate(0deg) translateX(20px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(20px) rotate(-360deg); }
}

.orbit {
  animation: orbit 2s linear infinite;
  /* Place inside a relative container */
}`,
  },
  {
    id:'elastic', name:'Elastic', category:'creative', animClass:'anim-elastic', accentColor:'#f59e0b', icon:'🏓',
    description:'Spring-like scale that alternates X and Y to create an elastic feel.',
    cssSnippet:
`/* Elastic Animation */
@keyframes elastic {
  0%, 100% { transform: scale(1, 1); }
  25%       { transform: scale(0.9, 1.1); }
  50%       { transform: scale(1.2, 0.8); }
  75%       { transform: scale(0.95, 1.05); }
}

.elastic {
  animation: elastic 1s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
}`,
  },
  {
    id:'blur', name:'Blur In/Out', category:'creative', animClass:'anim-blur', accentColor:'#a78bfa', icon:'🌫️',
    description:'Dreamy focus blur oscillation combined with opacity — out of focus.',
    cssSnippet:
`/* Blur Animation */
@keyframes blurInOut {
  0%, 100% { filter: blur(0px); opacity: 1; }
  50%       { filter: blur(8px); opacity: 0.6; }
}

.blur {
  animation: blurInOut 2s ease-in-out infinite;
}`,
  },
  {
    id:'morph', name:'Morph', category:'creative', animClass:'anim-morph', accentColor:'#10b981', icon:'🔮',
    description:'Animated border-radius transforms a circle into organic blob shapes.',
    cssSnippet:
`/* Morph Animation */
@keyframes morph {
  0%   { border-radius: 50%; transform: rotate(0deg) scale(1); }
  33%  {
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    transform: rotate(120deg) scale(1.1);
  }
  66%  {
    border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
    transform: rotate(240deg) scale(0.9);
  }
  100% { border-radius: 50%; transform: rotate(360deg) scale(1); }
}

.morph {
  animation: morph 3s ease-in-out infinite;
}`,
  },
  {
    id:'wave', name:'Wave', category:'creative', animClass:'anim-wave', accentColor:'#60a5fa', icon:'👋',
    description:'Multi-step rotation sequence that perfectly mimics a waving hand.',
    cssSnippet:
`/* Wave Animation */
@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  15%       { transform: rotate(14deg); }
  30%       { transform: rotate(-8deg); }
  45%       { transform: rotate(14deg); }
  60%       { transform: rotate(-4deg); }
  75%       { transform: rotate(10deg); }
}

.wave {
  animation: wave 1.5s ease-in-out infinite;
  transform-origin: 70% 70%; /* Pivot at wrist */
}`,
  },
  {
    id:'spiral', name:'Spiral', category:'creative', animClass:'anim-spiral', accentColor:'#f472b6', icon:'🌪️',
    description:'Spins twice while shrinking and growing — swirling hypnotic effect.',
    cssSnippet:
`/* Spiral Animation */
@keyframes spiral {
  0%   { transform: rotate(0deg) scale(1); opacity: 1; }
  50%  { transform: rotate(360deg) scale(0.3); opacity: 0.3; }
  100% { transform: rotate(720deg) scale(1); opacity: 1; }
}

.spiral {
  animation: spiral 2.5s ease-in-out infinite;
}`,
  },
  {
    id:'ripple', name:'Ripple', category:'creative', animClass:'anim-ripple', accentColor:'#7c3aed', icon:'💧',
    description:'Box-shadow expands and fades creating a ripple wave from the element.',
    cssSnippet:
`/* Ripple Animation */
@keyframes ripple {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.6);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 0 20px rgba(124, 58, 237, 0);
    transform: scale(1.05);
  }
}

.ripple {
  animation: ripple 1.5s ease-out infinite;
}`,
  },
  {
    id:'blink', name:'Blink', category:'creative', animClass:'anim-blink', accentColor:'#fbbf24', icon:'👁️',
    description:'Hard on/off blink using step-end timing — cursor or LED effect.',
    cssSnippet:
`/* Blink Animation */
@keyframes blink {
  0%, 49%, 100% { opacity: 1; }
  50%, 99%      { opacity: 0; }
}

.blink {
  animation: blink 1s step-end infinite;
}`,
  },
  {
    id:'typewriter', name:'Typewriter', category:'creative', animClass:'anim-typewriter', accentColor:'#34d399', icon:'⌨️',
    description:'Blinking cursor achieved with border-right — classic terminal look.',
    cssSnippet:
`/* Typewriter Cursor Animation */
@keyframes typewriter {
  0%, 100% { border-right-color: currentColor; }
  50%       { border-right-color: transparent; }
}

.typewriter {
  border-right: 3px solid;
  white-space: nowrap;
  overflow: hidden;
  animation: typewriter 0.8s step-end infinite;
}

/* For full typewriter effect, combine with: */
@keyframes typing {
  from { width: 0; }
  to   { width: 100%; }
}`,
  },
  {
    id:'spin-fast', name:'Spin Fast', category:'creative', animClass:'anim-spin-fast', accentColor:'#f43f5e', icon:'💫',
    description:'Extremely fast continuous spin — loading spinners and turbines.',
    cssSnippet:
`/* Spin Fast Animation */
@keyframes spinFast {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.spin-fast {
  animation: spinFast 0.3s linear infinite;
}

/* Slower variant */
.spin-slow {
  animation: spinFast 2s linear infinite;
}`,
  },
  {
    id:'zoom-pulse', name:'Zoom Pulse', category:'creative', animClass:'anim-zoom-pulse', accentColor:'#06b6d4', icon:'📡',
    description:'Irregular scale sequence — urgent ping or radar sweep feel.',
    cssSnippet:
`/* Zoom Pulse Animation */
@keyframes zoomPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  25%       { transform: scale(1.4); opacity: 0.8; }
  50%       { transform: scale(0.8); opacity: 0.6; }
  75%       { transform: scale(1.2); opacity: 0.9; }
}

.zoom-pulse {
  animation: zoomPulse 1.5s ease-in-out infinite;
}`,
  },
];

/* ════════════════════════════════════════════════════
   FILTER CONFIG
════════════════════════════════════════════════════ */
type Category = 'all' | 'basic' | 'entrance' | 'attention' | 'glow' | 'creative';

const FILTERS: { id: Category; label: string; color: string }[] = [
  { id: 'all',       label: 'All',       color: '' },
  { id: 'basic',     label: 'Basic',     color: 'text-sky-300' },
  { id: 'entrance',  label: 'Entrance',  color: 'text-emerald-300' },
  { id: 'attention', label: 'Attention', color: 'text-amber-300' },
  { id: 'glow',      label: 'Glow',      color: 'text-violet-300' },
  { id: 'creative',  label: 'Creative',  color: 'text-pink-300' },
];

/* ════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════ */
export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [search, setSearch] = useState('');
  const [selectedAnim, setSelectedAnim] = useState<AnimationDef | null>(null);

  const filtered = useMemo(() => {
    let list = ANIMATIONS;
    if (activeCategory !== 'all') list = list.filter(a => a.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(a => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q));
    }
    return list;
  }, [activeCategory, search]);

  return (
    <>
      <CodeModal anim={selectedAnim} onClose={() => setSelectedAnim(null)} />

      <main className="min-h-screen bg-mesh">
        <Navbar />
        <HeroSection />

        {/* ── Animations Grid ─────────────────────── */}
        <section id="animations" className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">

            {/* Heading */}
            <motion.div
              initial={{ opacity:0, y:24 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:.6 }}
              className="text-center mb-10 sm:mb-14"
            >
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/25 mb-4">
                50 Animations
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
                style={{ fontFamily:'Space Grotesk, sans-serif' }}
              >
                All <span className="gradient-text">Animations</span>
              </h2>
              <p className="text-white/45 max-w-xl mx-auto text-sm sm:text-base mb-8">
                Click any card to customize speed, easing, and direction live &mdash; then copy the customized code straight into your project.
              </p>

              {/* Search + Filters row */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="text"
                    placeholder="Search animations…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-8 pr-8 py-2 rounded-xl text-sm bg-white/5 border border-white/10
                               text-white placeholder:text-white/25 focus:outline-none focus:border-violet-500/50
                               focus:bg-white/8 transition-all duration-200"
                  />
                  {search && (
                    <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                      <X size={13} />
                    </button>
                  )}
                </div>

                {/* Filter pills */}
                <div className="flex items-center gap-1 glass rounded-xl p-1 flex-wrap justify-center">
                  {FILTERS.map(f => (
                    <button
                      key={f.id}
                      onClick={() => setActiveCategory(f.id)}
                      className={`relative px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                        activeCategory === f.id ? 'text-white' : `text-white/45 hover:text-white/80 ${f.color}`
                      }`}
                    >
                      {activeCategory === f.id && (
                        <motion.div
                          layoutId="filter-active"
                          className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg"
                          transition={{ type:'spring', bounce:.2, duration:.4 }}
                        />
                      )}
                      <span className="relative z-10">{f.label}</span>
                      <span className="relative z-10 ml-1 text-[10px] opacity-50">
                        {f.id === 'all' ? ANIMATIONS.length : ANIMATIONS.filter(a => a.category === f.id).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Result count */}
            <AnimatePresence mode="wait">
              {search && (
                <motion.p
                  key="count"
                  initial={{ opacity:0 }}
                  animate={{ opacity:1 }}
                  exit={{ opacity:0 }}
                  className="text-center text-xs text-white/35 mb-6"
                >
                  {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;
                </motion.p>
              )}
            </AnimatePresence>

            {/* Cards grid */}
            <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              <AnimatePresence>
                {filtered.map((anim, i) => (
                  <AnimationCard key={anim.id} anim={anim} index={i} onClick={setSelectedAnim} />
                ))}
              </AnimatePresence>
              {filtered.length === 0 && (
                <div className="col-span-full py-20 text-center text-white/30">
                  <p className="text-4xl mb-3">🔍</p>
                  <p className="text-sm">No animations found. Try a different search.</p>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* ── Playground ─────────────────────────── */}
        <div className="border-t border-white/5">
          <AnimationPlayground />
        </div>

        {/* ── Info Cards ─────────────────────────── */}
        <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-5 sm:gap-6">
              {[
                { icon:'🎨', title:'Pure CSS', desc:'Every animation uses @keyframes — no external libraries, no JavaScript required.' },
                { icon:'📋', title:'One-Click Copy', desc:'Click any card to get the full CSS snippet. Paste it into your stylesheet and go.' },
                { icon:'🎮', title:'Live Playground', desc:'Mix animations, shapes, colors and speeds in real time to find the perfect combo.' },
              ].map(({ icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity:0, y:24 }}
                  whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }}
                  transition={{ duration:.5, delay:i*.1 }}
                  className="glass rounded-2xl p-5 sm:p-6"
                >
                  <div className="text-3xl mb-4">{icon}</div>
                  <h3 className="text-base font-semibold text-white mb-2" style={{ fontFamily:'Space Grotesk, sans-serif' }}>{title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer ─────────────────────────────── */}
        <footer className="border-t border-white/5 py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                <Zap size={12} className="text-white" />
              </div>
              <span className="text-sm text-white/40" style={{ fontFamily:'Space Grotesk, sans-serif' }}>
                AnimFX — 50 CSS Animation Showcase
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
                <GitBranch size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
                <Globe size={18} />
              </a>
            </div>
            <p className="text-xs text-white/25">Built with Next.js 16 + Framer Motion</p>
          </div>
        </footer>
      </main>
    </>
  );
}
