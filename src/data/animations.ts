export interface AnimationDef {
  id: string;
  name: string;
  description: string;
  category: 'basic' | 'entrance' | 'attention' | 'glow' | 'creative';
  animClass: string;
  accentColor: string;
  icon: string;
  cssSnippet: string;
}

export type Category = 'all' | 'basic' | 'entrance' | 'attention' | 'glow' | 'creative';

export const CATEGORIES: { id: Category; label: string; count: number }[] = [
  { id: 'all', label: 'All Animations', count: 50 },
  { id: 'basic', label: 'Basic', count: 10 },
  { id: 'entrance', label: 'Entrance', count: 11 },
  { id: 'attention', label: 'Attention', count: 10 },
  { id: 'glow', label: 'Glow & Color', count: 7 },
  { id: 'creative', label: 'Creative', count: 12 },
];

export const ANIMATIONS: AnimationDef[] = [
  /* ── 1. BASIC (1-10) ────────────────────────── */
  {
    id: 'bounce',
    name: 'Bounce',
    category: 'basic',
    animClass: 'anim-bounce',
    accentColor: '#7c3aed',
    icon: '🏀',
    description: 'Simulates a rubber-ball bounce using cubic-bezier easing curves on translateY.',
    cssSnippet: `@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  40% {
    transform: translateY(-24px);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  }
  70% { transform: translateY(-12px); }
  90% { transform: translateY(-4px); }
}

.bounce {
  animation: bounce 1s ease infinite;
}`,
  },
  {
    id: 'rotate',
    name: 'Rotate',
    category: 'basic',
    animClass: 'anim-rotate',
    accentColor: '#06b6d4',
    icon: '⚙️',
    description: 'Continuous 360° clockwise rotation at a constant linear speed.',
    cssSnippet: `@keyframes rotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.rotate {
  animation: rotate 1s linear infinite;
}`,
  },
  {
    id: 'pulse',
    name: 'Pulse',
    category: 'basic',
    animClass: 'anim-pulse',
    accentColor: '#ec4899',
    icon: '💓',
    description: 'Rhythmic scale in/out creating a heartbeat or breathing effect.',
    cssSnippet: `@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.2); }
}

.pulse {
  animation: pulse 1s ease-in-out infinite;
}`,
  },
  {
    id: 'fade',
    name: 'Fade',
    category: 'basic',
    animClass: 'anim-fade',
    accentColor: '#f59e0b',
    icon: '👻',
    description: 'Smooth opacity oscillation between fully visible and nearly transparent.',
    cssSnippet: `@keyframes fade {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.15; }
}

.fade {
  animation: fade 1.5s ease-in-out infinite;
}`,
  },
  {
    id: 'slide-left',
    name: 'Slide Left',
    category: 'basic',
    animClass: 'anim-slide-left',
    accentColor: '#10b981',
    icon: '◀️',
    description: 'Horizontal oscillation to the left — ideal for directional indicators.',
    cssSnippet: `@keyframes slideLeft {
  0%, 100% { transform: translateX(0); }
  50%       { transform: translateX(-20px); }
}

.slide-left {
  animation: slideLeft 1s ease-in-out infinite;
}`,
  },
  {
    id: 'slide-right',
    name: 'Slide Right',
    category: 'basic',
    animClass: 'anim-slide-right',
    accentColor: '#3b82f6',
    icon: '▶️',
    description: 'Horizontal oscillation to the right — mirror of slide-left for forward cues.',
    cssSnippet: `@keyframes slideRight {
  0%, 100% { transform: translateX(0); }
  50%       { transform: translateX(20px); }
}

.slide-right {
  animation: slideRight 1s ease-in-out infinite;
}`,
  },
  {
    id: 'slide-up',
    name: 'Slide Up',
    category: 'basic',
    animClass: 'anim-slide-up',
    accentColor: '#a78bfa',
    icon: '⬆️',
    description: 'Vertical upward oscillation — useful for scroll cues and up-pointing elements.',
    cssSnippet: `@keyframes slideUp {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-20px); }
}

.slide-up {
  animation: slideUp 1s ease-in-out infinite;
}`,
  },
  {
    id: 'slide-down',
    name: 'Slide Down',
    category: 'basic',
    animClass: 'anim-slide-down',
    accentColor: '#34d399',
    icon: '⬇️',
    description: 'Vertical downward oscillation — great for dropdown cues and callouts.',
    cssSnippet: `@keyframes slideDown {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(20px); }
}

.slide-down {
  animation: slideDown 1s ease-in-out infinite;
}`,
  },
  {
    id: 'flip-x',
    name: 'Flip X',
    category: 'basic',
    animClass: 'anim-flip-x',
    accentColor: '#60a5fa',
    icon: '🪙',
    description: 'Full perspective rotateX 3D flip around horizontal axis.',
    cssSnippet: `@keyframes flipX {
  0%   { transform: perspective(400px) rotateX(0); }
  50%  { transform: perspective(400px) rotateX(180deg); }
  100% { transform: perspective(400px) rotateX(360deg); }
}

.flip-x {
  animation: flipX 1.4s ease-in-out infinite;
}`,
  },
  {
    id: 'flip-y',
    name: 'Flip Y',
    category: 'basic',
    animClass: 'anim-flip-y',
    accentColor: '#f472b6',
    icon: '🃏',
    description: 'Full perspective rotateY 3D flip — classic card or coin toss.',
    cssSnippet: `@keyframes flipY {
  0%   { transform: perspective(400px) rotateY(0); }
  50%  { transform: perspective(400px) rotateY(180deg); }
  100% { transform: perspective(400px) rotateY(360deg); }
}

.flip-y {
  animation: flipY 1.4s ease-in-out infinite;
}`,
  },

  /* ── 2. ENTRANCE (11-21) ─────────────────────── */
  {
    id: 'bounce-in',
    name: 'Bounce In',
    category: 'entrance',
    animClass: 'anim-bounce-in',
    accentColor: '#7c3aed',
    icon: '🎯',
    description: 'Scales from zero with elastic overshoot and settling bounce.',
    cssSnippet: `@keyframes bounceIn {
  0%   { transform: scale(0.3); opacity: 0; }
  50%  { transform: scale(1.05); opacity: 1; }
  70%  { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
}

.bounce-in {
  animation: bounceIn 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
}`,
  },
  {
    id: 'fade-in-up',
    name: 'Fade In Up',
    category: 'entrance',
    animClass: 'anim-fade-in-up',
    accentColor: '#06b6d4',
    icon: '🚀',
    description: 'Rises into view while smoothly transitioning from 0 to full opacity.',
    cssSnippet: `@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease forwards;
}`,
  },
  {
    id: 'fade-in-down',
    name: 'Fade In Down',
    category: 'entrance',
    animClass: 'anim-fade-in-down',
    accentColor: '#10b981',
    icon: '🌧️',
    description: 'Drops into view from above while fading in — ideal for modals.',
    cssSnippet: `@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-24px); }
  to   { opacity: 1; transform: translateY(0); }
}

.fade-in-down {
  animation: fadeInDown 0.6s ease forwards;
}`,
  },
  {
    id: 'fade-in-left',
    name: 'Fade In Left',
    category: 'entrance',
    animClass: 'anim-fade-in-left',
    accentColor: '#f59e0b',
    icon: '⬅️',
    description: 'Enters from the left with smooth fade — great for slide-out menus.',
    cssSnippet: `@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-24px); }
  to   { opacity: 1; transform: translateX(0); }
}

.fade-in-left {
  animation: fadeInLeft 0.6s ease forwards;
}`,
  },
  {
    id: 'fade-in-right',
    name: 'Fade In Right',
    category: 'entrance',
    animClass: 'anim-fade-in-right',
    accentColor: '#a78bfa',
    icon: '➡️',
    description: 'Enters from the right with smooth fade — pairs with fade-in-left.',
    cssSnippet: `@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(24px); }
  to   { opacity: 1; transform: translateX(0); }
}

.fade-in-right {
  animation: fadeInRight 0.6s ease forwards;
}`,
  },
  {
    id: 'zoom-in',
    name: 'Zoom In',
    category: 'entrance',
    animClass: 'anim-zoom-in',
    accentColor: '#ec4899',
    icon: '🔍',
    description: 'Grows from miniature scale to full size with crisp deceleration.',
    cssSnippet: `@keyframes zoomIn {
  from { transform: scale(0.2); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

.zoom-in {
  animation: zoomIn 0.5s ease-out forwards;
}`,
  },
  {
    id: 'zoom-out',
    name: 'Zoom Out',
    category: 'entrance',
    animClass: 'anim-zoom-out',
    accentColor: '#f43f5e',
    icon: '🔭',
    description: 'Shrinks down from full size towards 0 — dramatic exit effect.',
    cssSnippet: `@keyframes zoomOut {
  from { transform: scale(1); opacity: 1; }
  to   { transform: scale(0.2); opacity: 0; }
}

.zoom-out {
  animation: zoomOut 0.5s ease-in forwards;
}`,
  },
  {
    id: 'rotate-in',
    name: 'Rotate In',
    category: 'entrance',
    animClass: 'anim-rotate-in',
    accentColor: '#3b82f6',
    icon: '🌀',
    description: 'Spins into position from -360deg while scaling up to full size.',
    cssSnippet: `@keyframes rotateIn {
  from { transform: rotate(-360deg) scale(0); opacity: 0; }
  to   { transform: rotate(0deg) scale(1); opacity: 1; }
}

.rotate-in {
  animation: rotateIn 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}`,
  },
  {
    id: 'slide-in-down',
    name: 'Slide In Down',
    category: 'entrance',
    animClass: 'anim-slide-in-down',
    accentColor: '#34d399',
    icon: '🪂',
    description: 'Drops smoothly from -40px offset down to standard position.',
    cssSnippet: `@keyframes slideInDown {
  from { transform: translateY(-40px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}

.slide-in-down {
  animation: slideInDown 0.5s ease forwards;
}`,
  },
  {
    id: 'back-in-up',
    name: 'Back In Up',
    category: 'entrance',
    animClass: 'anim-back-in-up',
    accentColor: '#60a5fa',
    icon: '📦',
    description: 'Rises from below at 70% scale and then snaps to full size.',
    cssSnippet: `@keyframes backInUp {
  0%   { transform: translateY(50px) scale(0.7); opacity: 0.7; }
  80%  { transform: translateY(0) scale(0.7); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}

.back-in-up {
  animation: backInUp 0.8s ease forwards;
}`,
  },
  {
    id: 'jack-in-box',
    name: 'Jack In Box',
    category: 'entrance',
    animClass: 'anim-jack-in-box',
    accentColor: '#f472b6',
    icon: '🎁',
    description: 'Pops out from the bottom with rotation and springy overshoot.',
    cssSnippet: `@keyframes jackInBox {
  0%   { transform: scale(0.1) rotate(30deg); transform-origin: center bottom; opacity: 0; }
  50%  { transform: rotate(-10deg); opacity: 1; }
  70%  { transform: rotate(3deg); }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}

.jack-in-box {
  animation: jackInBox 0.75s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
}`,
  },

  /* ── 3. ATTENTION (22-31) ────────────────────── */
  {
    id: 'shake',
    name: 'Shake',
    category: 'attention',
    animClass: 'anim-shake',
    accentColor: '#f43f5e',
    icon: '⚡',
    description: 'Fast horizontal jitter — classic error and alert indicator.',
    cssSnippet: `@keyframes shake {
  0%, 100% { transform: translateX(0) rotate(0); }
  15% { transform: translateX(-6px) rotate(-3deg); }
  30% { transform: translateX(6px) rotate(3deg); }
  45% { transform: translateX(-4px) rotate(-2deg); }
  60% { transform: translateX(4px) rotate(2deg); }
  75% { transform: translateX(-2px) rotate(-1deg); }
  90% { transform: translateX(2px) rotate(1deg); }
}

.shake {
  animation: shake 0.8s ease-in-out infinite;
}`,
  },
  {
    id: 'wobble',
    name: 'Wobble',
    category: 'attention',
    animClass: 'anim-wobble',
    accentColor: '#f59e0b',
    icon: '🌊',
    description: 'Multi-directional sway combining translation and rotation.',
    cssSnippet: `@keyframes wobble {
  0%, 100% { transform: translateX(0); }
  15% { transform: translateX(-16px) rotate(-4deg); }
  30% { transform: translateX(12px) rotate(3deg); }
  45% { transform: translateX(-8px) rotate(-2deg); }
  60% { transform: translateX(6px) rotate(2deg); }
  75% { transform: translateX(-3px) rotate(-1deg); }
}

.wobble {
  animation: wobble 1.2s ease-in-out infinite;
}`,
  },
  {
    id: 'rubber-band',
    name: 'Rubber Band',
    category: 'attention',
    animClass: 'anim-rubber-band',
    accentColor: '#10b981',
    icon: '🧲',
    description: 'Alternating scaleX and scaleY creating realistic elastic stretching.',
    cssSnippet: `@keyframes rubberBand {
  0%, 100% { transform: scale(1); }
  30% { transform: scaleX(1.2) scaleY(0.8); }
  40% { transform: scaleX(0.8) scaleY(1.2); }
  50% { transform: scaleX(1.1) scaleY(0.9); }
  65% { transform: scaleX(0.95) scaleY(1.05); }
  75% { transform: scaleX(1.05) scaleY(0.95); }
}

.rubber-band {
  animation: rubberBand 1s ease-in-out infinite;
}`,
  },
  {
    id: 'jello',
    name: 'Jello',
    category: 'attention',
    animClass: 'anim-jello',
    accentColor: '#7c3aed',
    icon: '🍮',
    description: 'Dual-axis skew oscillation that makes elements wobble like jello.',
    cssSnippet: `@keyframes jello {
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
  animation: jello 1.4s ease infinite;
}`,
  },
  {
    id: 'tada',
    name: 'Tada',
    category: 'attention',
    animClass: 'anim-tada',
    accentColor: '#ec4899',
    icon: '🎉',
    description: 'Playful scale squeeze and rotational celebration reveal effect.',
    cssSnippet: `@keyframes tada {
  0%, 100% { transform: scaleX(1); }
  10%, 20% { transform: scale3d(0.9, 0.9, 0.9) rotate(-3deg); }
  30%, 50%, 70%, 90% { transform: scale3d(1.1, 1.1, 1.1) rotate(3deg); }
  40%, 60%, 80%      { transform: scale3d(1.1, 1.1, 1.1) rotate(-3deg); }
}

.tada {
  animation: tada 1.4s ease-in-out infinite;
}`,
  },
  {
    id: 'flash',
    name: 'Flash',
    category: 'attention',
    animClass: 'anim-flash',
    accentColor: '#fbbf24',
    icon: '💥',
    description: 'Urgent opacity strobe toggle for notifications and warnings.',
    cssSnippet: `@keyframes flash {
  0%, 50%, 100% { opacity: 1; }
  25%, 75%      { opacity: 0; }
}

.flash {
  animation: flash 1s ease infinite;
}`,
  },
  {
    id: 'heartbeat',
    name: 'Heartbeat',
    category: 'attention',
    animClass: 'anim-heartbeat',
    accentColor: '#f43f5e',
    icon: '❤️',
    description: 'Double-pulse scale rhythm mimicking a natural human heartbeat.',
    cssSnippet: `@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  14% { transform: scale(1.25); }
  28% { transform: scale(1); }
  42% { transform: scale(1.25); }
  70% { transform: scale(1); }
}

.heartbeat {
  animation: heartbeat 1.3s ease-in-out infinite;
}`,
  },
  {
    id: 'swing',
    name: 'Swing',
    category: 'attention',
    animClass: 'anim-swing',
    accentColor: '#a78bfa',
    icon: '🎐',
    description: 'Rotates from a top-center pivot like a hanging sign in the wind.',
    cssSnippet: `@keyframes swing {
  0%, 100% { transform: rotate(0); transform-origin: top center; }
  25% { transform: rotate(15deg); transform-origin: top center; }
  75% { transform: rotate(-15deg); transform-origin: top center; }
}

.swing {
  animation: swing 1s ease-in-out infinite;
}`,
  },
  {
    id: 'pendulum',
    name: 'Pendulum',
    category: 'attention',
    animClass: 'anim-pendulum',
    accentColor: '#60a5fa',
    icon: '🕰️',
    description: 'Harmonic arc swing from an overhead pivot like a clock pendulum.',
    cssSnippet: `@keyframes pendulum {
  0%, 100% { transform: rotate(-25deg); transform-origin: top center; }
  50% { transform: rotate(25deg); transform-origin: top center; }
}

.pendulum {
  animation: pendulum 1.2s ease-in-out infinite;
}`,
  },
  {
    id: 'sway',
    name: 'Sway',
    category: 'attention',
    animClass: 'anim-sway',
    accentColor: '#34d399',
    icon: '🌿',
    description: 'Gentle diagonal drift combining small translation and tilt.',
    cssSnippet: `@keyframes sway {
  0%, 100% { transform: rotate(-8deg) translateX(-4px); }
  50% { transform: rotate(8deg) translateX(4px); }
}

.sway {
  animation: sway 2s ease-in-out infinite;
}`,
  },

  /* ── 4. GLOW & COLOR (32-38) ────────────────── */
  {
    id: 'neon-glow',
    name: 'Neon Glow',
    category: 'glow',
    animClass: 'anim-glow',
    accentColor: '#7c3aed',
    icon: '✨',
    description: 'Pulses drop-shadow layers to simulate a glowing neon sign.',
    cssSnippet: `@keyframes neonGlow {
  0%, 100% { filter: drop-shadow(0 0 4px #7c3aed) drop-shadow(0 0 10px #7c3aed); }
  50% { filter: drop-shadow(0 0 16px #a78bfa) drop-shadow(0 0 35px #7c3aed); }
}

.neon-glow {
  animation: neonGlow 1.5s ease-in-out infinite;
}`,
  },
  {
    id: 'color-cycle',
    name: 'Color Cycle',
    category: 'glow',
    animClass: 'anim-color',
    accentColor: '#ec4899',
    icon: '🌈',
    description: 'Cycles element color and glowing aura across the color spectrum.',
    cssSnippet: `@keyframes colorCycle {
  0%   { color: #7c3aed; filter: drop-shadow(0 0 6px #7c3aed); }
  20%  { color: #06b6d4; filter: drop-shadow(0 0 6px #06b6d4); }
  40%  { color: #10b981; filter: drop-shadow(0 0 6px #10b981); }
  60%  { color: #f59e0b; filter: drop-shadow(0 0 6px #f59e0b); }
  80%  { color: #ec4899; filter: drop-shadow(0 0 6px #ec4899); }
  100% { color: #7c3aed; filter: drop-shadow(0 0 6px #7c3aed); }
}

.color-cycle {
  animation: colorCycle 2s linear infinite;
}`,
  },
  {
    id: 'glitch',
    name: 'Glitch',
    category: 'glow',
    animClass: 'anim-glitch',
    accentColor: '#f43f5e',
    icon: '📺',
    description: 'Simulates cybernetic display glitch with stepped chromatic shifts.',
    cssSnippet: `@keyframes glitch {
  0%, 85%, 100% { transform: translate(0); filter: none; opacity: 1; }
  87% { transform: translate(-3px, 2px); filter: hue-rotate(90deg) saturate(200%); }
  89% { transform: translate(3px, -2px); filter: hue-rotate(-90deg); }
  91% { transform: translate(-2px, 0); filter: none; }
  93% { transform: translate(2px, 1px); filter: saturate(300%); }
  95% { transform: translate(0, -1px); filter: none; }
}

.glitch {
  animation: glitch 2s steps(1) infinite;
}`,
  },
  {
    id: 'flicker',
    name: 'Neon Flicker',
    category: 'glow',
    animClass: 'anim-flicker',
    accentColor: '#a78bfa',
    icon: '💡',
    description: 'Simulates an intermittent neon transformer with quick opacity drops.',
    cssSnippet: `@keyframes neonFlicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { filter: drop-shadow(0 0 8px #a78bfa) drop-shadow(0 0 18px #7c3aed); opacity: 1; }
  20%, 24%, 55% { filter: none; opacity: 0.4; }
}

.neon-flicker {
  animation: neonFlicker 3s linear infinite;
}`,
  },
  {
    id: 'sparkle',
    name: 'Sparkle',
    category: 'glow',
    animClass: 'anim-sparkle',
    accentColor: '#fbbf24',
    icon: '⭐',
    description: 'Brightens and scales with golden aura — ideal for celebration/rewards.',
    cssSnippet: `@keyframes sparkle {
  0%, 100% { filter: brightness(1); transform: scale(1); }
  50% { filter: brightness(1.8) drop-shadow(0 0 12px #fbbf24); transform: scale(1.1); }
}

.sparkle {
  animation: sparkle 1.5s ease-in-out infinite;
}`,
  },
  {
    id: 'rainbow',
    name: 'Rainbow',
    category: 'glow',
    animClass: 'anim-rainbow',
    accentColor: '#06b6d4',
    icon: '🦄',
    description: 'Cycles hue-rotate from 0 to 360deg for continuous vibrant colors.',
    cssSnippet: `@keyframes rainbow {
  from { filter: hue-rotate(0deg) saturate(200%); }
  to   { filter: hue-rotate(360deg) saturate(200%); }
}

.rainbow {
  animation: rainbow 2s linear infinite;
}`,
  },
  {
    id: 'gradient',
    name: 'Gradient Shift',
    category: 'glow',
    animClass: 'anim-gradient',
    accentColor: '#10b981',
    icon: '🎨',
    description: 'Flows background position on multi-stop gradient for luminous surface waves.',
    cssSnippet: `@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50%       { background-position: 100% 50%; }
}

.gradient-shift {
  background: linear-gradient(270deg, #7c3aed, #06b6d4, #ec4899, #10b981);
  background-size: 300% 300%;
  animation: gradientShift 3s ease infinite;
}`,
  },

  /* ── 5. CREATIVE (39-50) ────────────────────── */
  {
    id: 'float',
    name: 'Float',
    category: 'creative',
    animClass: 'anim-float',
    accentColor: '#06b6d4',
    icon: '🎈',
    description: 'Gentle zero-gravity vertical levitation with subtle tilt.',
    cssSnippet: `@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0); }
  33% { transform: translateY(-12px) rotate(2deg); }
  66% { transform: translateY(-6px) rotate(-2deg); }
}

.float {
  animation: float 2.8s ease-in-out infinite;
}`,
  },
  {
    id: 'orbit',
    name: 'Orbit',
    category: 'creative',
    animClass: 'anim-orbit',
    accentColor: '#7c3aed',
    icon: '🪐',
    description: 'Element revolves around a center pivot like a satellite in orbit.',
    cssSnippet: `@keyframes orbit {
  0%   { transform: rotate(0deg) translateX(14px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(14px) rotate(-360deg); }
}

.orbit {
  animation: orbit 2s linear infinite;
}`,
  },
  {
    id: 'elastic',
    name: 'Elastic',
    category: 'creative',
    animClass: 'anim-elastic',
    accentColor: '#f59e0b',
    icon: '🏓',
    description: 'Bouncy spring physics that deform aspect ratio smoothly.',
    cssSnippet: `@keyframes elastic {
  0%, 100% { transform: scale(1, 1); }
  25% { transform: scale(0.9, 1.1); }
  50% { transform: scale(1.15, 0.85); }
  75% { transform: scale(0.95, 1.05); }
}

.elastic {
  animation: elastic 1s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
}`,
  },
  {
    id: 'blur',
    name: 'Blur In/Out',
    category: 'creative',
    animClass: 'anim-blur',
    accentColor: '#a78bfa',
    icon: '🌫️',
    description: 'Dreamy optical defocus oscillation combined with opacity.',
    cssSnippet: `@keyframes blurInOut {
  0%, 100% { filter: blur(0); opacity: 1; }
  50% { filter: blur(6px); opacity: 0.6; }
}

.blur {
  animation: blurInOut 2s ease-in-out infinite;
}`,
  },
  {
    id: 'morph',
    name: 'Morph',
    category: 'creative',
    animClass: 'anim-morph',
    accentColor: '#10b981',
    icon: '🔮',
    description: 'Animates border-radius to morph continuously between organic blob shapes.',
    cssSnippet: `@keyframes morph {
  0%   { border-radius: 50%; transform: rotate(0deg) scale(1); }
  33%  { border-radius: 30% 70% 70% 30%/30% 30% 70% 70%; transform: rotate(120deg) scale(1.05); }
  66%  { border-radius: 70% 30% 30% 70%/70% 70% 30% 30%; transform: rotate(240deg) scale(0.95); }
  100% { border-radius: 50%; transform: rotate(360deg) scale(1); }
}

.morph {
  animation: morph 3s ease-in-out infinite;
}`,
  },
  {
    id: 'wave',
    name: 'Wave',
    category: 'creative',
    animClass: 'anim-wave',
    accentColor: '#60a5fa',
    icon: '👋',
    description: 'Rotates from a wrist pivot point creating a friendly greeting gesture.',
    cssSnippet: `@keyframes wave {
  0%, 100% { transform: rotate(0); }
  15% { transform: rotate(14deg); }
  30% { transform: rotate(-8deg); }
  45% { transform: rotate(14deg); }
  60% { transform: rotate(-4deg); }
  75% { transform: rotate(10deg); }
}

.wave {
  animation: wave 1.5s ease-in-out infinite;
  transform-origin: 70% 70%;
}`,
  },
  {
    id: 'spiral',
    name: 'Spiral',
    category: 'creative',
    animClass: 'anim-spiral',
    accentColor: '#f472b6',
    icon: '🌪️',
    description: 'Double rotational spin coupled with scale shrink and expansion.',
    cssSnippet: `@keyframes spiral {
  0%   { transform: rotate(0deg) scale(1); opacity: 1; }
  50%  { transform: rotate(360deg) scale(0.3); opacity: 0.3; }
  100% { transform: rotate(720deg) scale(1); opacity: 1; }
}

.spiral {
  animation: spiral 2.5s ease-in-out infinite;
}`,
  },
  {
    id: 'ripple',
    name: 'Ripple',
    category: 'creative',
    animClass: 'anim-ripple',
    accentColor: '#7c3aed',
    icon: '💧',
    description: 'Concentric shadow ring that expands outward and dissipates.',
    cssSnippet: `@keyframes ripple {
  0%, 100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.6); transform: scale(1); }
  50% { box-shadow: 0 0 0 16px rgba(124, 58, 237, 0); transform: scale(1.04); }
}

.ripple {
  animation: ripple 1.5s ease-out infinite;
}`,
  },
  {
    id: 'blink',
    name: 'Blink',
    category: 'creative',
    animClass: 'anim-blink',
    accentColor: '#fbbf24',
    icon: '👁️',
    description: 'Hard binary on/off state toggle using step-end timing curve.',
    cssSnippet: `@keyframes blink {
  0%, 49%, 100% { opacity: 1; }
  50%, 99%      { opacity: 0; }
}

.blink {
  animation: blink 1s step-end infinite;
}`,
  },
  {
    id: 'typewriter',
    name: 'Typewriter',
    category: 'creative',
    animClass: 'anim-typewriter',
    accentColor: '#34d399',
    icon: '⌨️',
    description: 'Terminal cursor pulse with border-right flashing.',
    cssSnippet: `@keyframes typewriter {
  0%, 100% { border-right-color: currentColor; }
  50%       { border-right-color: transparent; }
}

.typewriter {
  border-right: 2px solid;
  white-space: nowrap;
  animation: typewriter 0.8s step-end infinite;
}`,
  },
  {
    id: 'spin-fast',
    name: 'Spin Fast',
    category: 'creative',
    animClass: 'anim-spin-fast',
    accentColor: '#f43f5e',
    icon: '💫',
    description: 'Ultra-fast continuous spin ideal for loaders and activity wheels.',
    cssSnippet: `@keyframes spinFast {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.spin-fast {
  animation: spinFast 0.3s linear infinite;
}`,
  },
  {
    id: 'zoom-pulse',
    name: 'Zoom Pulse',
    category: 'creative',
    animClass: 'anim-zoom-pulse',
    accentColor: '#06b6d4',
    icon: '📡',
    description: 'Asymmetric scale sequence simulating a radar sweep or sonar ping.',
    cssSnippet: `@keyframes zoomPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  25%       { transform: scale(1.3); opacity: 0.8; }
  50%       { transform: scale(0.8); opacity: 0.6; }
  75%       { transform: scale(1.15); opacity: 0.9; }
}

.zoom-pulse {
  animation: zoomPulse 1.5s ease-in-out infinite;
}`,
  },
];

export const FEATURED_ANIMATIONS = ANIMATIONS.filter(a =>
  ['bounce', 'rotate', 'pulse', 'neon-glow', 'fade-in-up', 'rubber-band', 'tada', 'float'].includes(a.id)
);
