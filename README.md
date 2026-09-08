# ⚡ AnimFX — Pure CSS Animation Library

> **A classic, lightweight, production-ready showcase of 50 pure CSS keyframe animations.**  
> Zero JavaScript dependencies, 60 FPS GPU hardware-accelerated, 100% responsive, and ready to copy-paste directly into your web projects.

[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![CSS](https://img.shields.io/badge/Pure_CSS-Keyframes-indigo?style=flat&logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌟 Overview

Modern web applications often suffer from JavaScript runtime bloat. Adding heavy animation libraries like Framer Motion (35+ KB) or GSAP (60+ KB) can strain the browser's single main thread, causing frame drops and degrading Core Web Vitals (INP and FID).

**AnimFX** solves this by providing **50 curated, GPU-composited CSS keyframe animations**. Because these animations run on the browser's dedicated compositor thread via `transform` and `opacity`, they guarantee fluid 60 FPS performance even under heavy CPU loads.

---

## ✨ Features

- **🎯 50 Production Keyframe Animations**: Spanning 5 categorized collections:
  - **Basic (10)**: Bounce, Rotate, Pulse, Fade, Slide directions, Flip axes.
  - **Entrance (11)**: Fade In, Slide In, Zoom In, Pop In, Drop In, Bounce In.
  - **Attention (10)**: Shake, Heartbeat, Wobble, Flash, Swing, Jello, Rubber Band, Tada.
  - **Glow & Color (7)**: Neon Glow, Gradient Flow, Color Cycle, Border Beam, Rainbow Ring.
  - **Creative (12)**: Float, Morph Box, Text Shimmer, Glitch, Ripple Wave, Particle Orbit, Levitate, Typing Cursor, Radar Ping.
- **🎮 Interactive Playground (`/playground`)**:
  - Live preview stage supporting 5 target elements (Card, Button, App Icon, Status Badge, Headline Text).
  - Fine-tune speed/duration sliders (0.2s - 4.0s).
  - Timing curve selector (`linear`, `ease`, `ease-in-out`, `bounce-bezier`, `spring-out`).
  - Iteration counter (`infinite`, 1, 2, 3).
  - Live color palette swatches.
  - Real-time generated CSS code block with 1-click clipboard export.
- **📚 Animation Library (`/library`)**:
  - Complete 50-item catalog with live previews and category tags.
  - Instant text search (by name, keyword, or behavior).
  - Quick category tab pills with item counters.
  - 1-click CSS copying with instant checkmark feedback.
- **⚙️ Customization Modal Dialog**:
  - Click "Customize" on any card to tweak speed, easing curves, and element shapes in real time.
- **🌓 Dark & Light Mode**:
  - Smooth theme switching with persistent `localStorage` support.
- **📱 100% Responsive Architecture**:
  - Meticulously tested and optimized for all screen sizes (mobile 320px+, tablet 768px+, and desktop).
  - Touch-friendly tap targets (minimum 42-44px), horizontal swiping pill bars, and non-clipping layouts.
- **♿ Reduced Motion Support**:
  - Pre-configured `@media (prefers-reduced-motion: reduce)` accessibility rules.

---

## 📊 Performance Comparison

| Feature | **AnimFX (Pure CSS)** | Framer Motion | GSAP | Lottie |
| :--- | :--- | :--- | :--- | :--- |
| **JS Bundle Overhead** | **0 KB (Zero)** | ~35 KB gzip | ~60 KB gzip | ~150 KB gzip |
| **Execution Thread** | **Compositor (GPU)** | Main JS Thread | Main JS Thread | Main JS Thread / Canvas |
| **60 FPS Under CPU Load** | **Flawless** | Potential drops | Good, but thread-bound | CPU intensive |
| **Framework Agnostic** | **100% (Any HTML/Framework)** | React / Next.js only | Yes | Yes |
| **Setup Complexity** | **Copy & Paste** | NPM install + wrappers | NPM install + plugins | JSON files + player |

---

## 📁 Project Structure

```text
animation/
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.tsx          # Documentation, comparisons & guides
│   │   ├── feedback/
│   │   │   └── page.tsx          # 5-star rating & community form
│   │   ├── library/
│   │   │   └── page.tsx          # 50-animation catalog & search filters
│   │   ├── playground/
│   │   │   └── page.tsx          # Interactive live testing studio
│   │   ├── animations.css        # All 50 pure CSS keyframes & class utilities
│   │   ├── globals.css           # Vanilla CSS design system & theme variables
│   │   ├── layout.tsx            # Root layout with navbar, footer & viewport
│   │   └── page.tsx              # Home landing page with hero & popular cards
│   ├── components/
│   │   ├── AnimationCard.tsx     # Preview card with instant copy button
│   │   ├── AnimationModal.tsx    # Interactive speed & easing customization dialog
│   │   ├── Footer.tsx            # Classic 4-column footer
│   │   └── Navbar.tsx            # Sticky header with mobile drawer & theme toggle
│   └── data/
│       └── animations.ts         # Complete typed dataset of all 50 animations
├── public/                       # Static public assets
├── package.json                  # Dependencies & build scripts
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Project documentation
```

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- npm, pnpm, or yarn

### 2. Installation
```bash
# Clone repository
git clone https://github.com/your-username/animation-showcase.git
cd animation-showcase

# Install dependencies
npm install
```

### 3. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build
```bash
npm run build
npm run start
```

---

## 🛠️ How to Use Animations in Your Project

### Option A: Plain HTML & CSS
Copy the `@keyframes` snippet and utility class into your CSS file:

```css
/* styles.css */
@keyframes bounce {
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

.anim-bounce {
  animation: bounce 1.2s ease infinite;
}
```

Apply it to your HTML element:
```html
<button class="anim-bounce">Click Me</button>
```

### Option B: React / Next.js / Vue / Svelte
Import `animations.css` into your global layout or component:

```tsx
// App.tsx or page.tsx
export default function HeroSection() {
  return (
    <div className="anim-pulse card">
      <h2>Animated Card</h2>
    </div>
  );
}
```

---

## 🌐 Browser Compatibility

| Browser | Supported Versions | Status |
| :--- | :--- | :---: |
| **Google Chrome** | Chrome 43+ | ✓ 100% Supported |
| **Apple Safari** | Safari 9+ (iOS & macOS) | ✓ 100% Supported |
| **Mozilla Firefox** | Firefox 16+ | ✓ 100% Supported |
| **Microsoft Edge** | Edge 12+ | ✓ 100% Supported |
| **Opera** | Opera 30+ | ✓ 100% Supported |

---

## ♿ Accessibility

To respect users who prefer reduced motion, include this rule in your stylesheet:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
Feel free to use, customize, and share these animations in personal and commercial projects.
