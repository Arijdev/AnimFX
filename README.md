# ⚡ AnimFX — CSS Animation Showcase

> **50 production-ready CSS animations** — browse, preview live, copy the code, and drop it straight into your project.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff69b4?style=flat-square)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-7c3aed?style=flat-square)](LICENSE)

---

## ✨ Features

- **50 CSS Animations** across 5 categories — all pure CSS `@keyframes`, zero JavaScript needed
- **Live preview** on every card — animations play continuously in the card
- **Interactive Customizer Modal** — click any card to customize:
  - ⏱️ **Duration & Speed** (0.1s to 5.0s with quick presets)
  - 📈 **Timing Function / Easing** (Ease, Linear, Spring, Snappy, Elastic, Steps)
  - 🔁 **Iteration Count** (Infinite, 1x, 2x, 3x, 5x)
  - ↔️ **Direction** (Normal, Reverse, Alternate, Alt-Reverse)
  - ⏳ **Delay & Fill Mode** (0.0s to 3.0s, Both / Forwards / Backwards / None)
  - 🎭 **Preview Shapes** (Icon, Glass Card, Button, Badge, or Custom Text)
  - ⏯️ **Playback Controls** (Pause, Play, Replay from start)
- **Live Generated CSS** — code updates in real-time as you tweak sliders with Shorthand and Longhand format support
- **One-click copy** — copy the customized CSS directly into your project
- **Syntax-highlighted code view** — colour-coded `@keyframes` + customized class definition
- **Usage guide tab** — step-by-step instructions for HTML, React, and Next.js
- **Search + Filter** — search by name/description, filter by category
- **Interactive Playground** — mix any animation × shape × colour × speed in real time
- **Fully responsive** — works on mobile, tablet, and desktop
- **Dark glassmorphism UI** — built with Framer Motion scroll-animations and ambient orbs

---

## 🎬 Animation Categories

| Category | Count | Examples |
|---|---|---|
| 🔵 **Basic** | 10 | Bounce, Rotate, Pulse, Fade, Slide ×4, Flip X/Y |
| 🟢 **Entrance** | 11 | Bounce In, Fade In ×4, Zoom In/Out, Rotate In, Slide In Down, Back In Up, Jack In Box |
| 🟡 **Attention** | 10 | Shake, Wobble, Rubber Band, Jello, Tada, Flash, Heartbeat, Swing, Pendulum, Sway |
| 🟣 **Glow** | 7 | Neon Glow, Color Cycle, Glitch, Neon Flicker, Sparkle, Rainbow, Gradient Shift |
| 🩷 **Creative** | 12 | Float, Orbit, Elastic, Blur, Morph, Wave, Spiral, Ripple, Blink, Typewriter, Spin Fast, Zoom Pulse |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** or **pnpm**

### Install & Run

```bash
# Clone the repo
git clone https://github.com/your-username/animation.git
cd animation

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📋 How to Use an Animation

1. **Browse or search** for an animation on the homepage
2. **Click the card** to open the interactive customizer modal
3. **Customize** duration, easing physics, iteration count, direction, and delay live on the preview stage
4. Hit **"Copy Customized Code"** (or switch to "CSS Code" tab to choose shorthand or detailed property syntax)
5. **Paste** into your stylesheet and add the class to your HTML element — done!

### Example

```css
/* Paste this into your stylesheet */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  40% {
    transform: translateY(-28px);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  }
  70% { transform: translateY(-14px); }
  90% { transform: translateY(-4px); }
}

.bounce {
  animation: bounce 1s ease infinite;
}
```

```html
<!-- Then use it in your HTML -->
<div class="bounce">🏀 I'm bouncing!</div>
```

> **Tip for entrance animations:** Remove `infinite` and add `animation-fill-mode: both` to keep the final state after the animation plays once.

---

## 🏗️ Project Structure

```
animation/
├── src/
│   ├── app/
│   │   ├── globals.css          # Design tokens + 50 @keyframe animations + layout CSS
│   │   ├── layout.tsx           # Root layout, fonts, SEO metadata
│   │   └── page.tsx             # Main page — 50 animation data + grid + filters
│   └── components/
│       ├── Navbar.tsx           # Sticky frosted-glass navbar, mobile menu
│       ├── HeroSection.tsx      # Full-screen hero with orbs, particles, shimmer text
│       ├── AnimationCard.tsx    # Glassmorphism card — live preview + click-for-code
│       ├── CodeModal.tsx        # Code view modal — syntax highlight, copy, usage tabs
│       └── AnimationPlayground.tsx  # Live mixer — animation × shape × colour × speed
├── public/
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

---

## 🛠️ Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org) | 16 (App Router) | React framework, SSR |
| [TypeScript](https://www.typescriptlang.org) | 5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | v4 | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | 11 | Scroll-triggered animations, modal transitions |
| [Lucide React](https://lucide.dev) | latest | Icons |

---

## 🎨 Design System

- **Background:** Deep space `#04040f` with radial gradient mesh
- **Glass surfaces:** `backdrop-filter: blur(20px)` + `rgba(255,255,255,0.04)` border
- **Accent:** Violet `#7c3aed` → Indigo `#4f46e5` gradient
- **Typography:** [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (headings) + [Inter](https://fonts.google.com/specimen/Inter) (body) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (code)
- **Animations:** Custom `@keyframes` library, 50 effects defined in `globals.css`

---

## 🤝 Contributing

Contributions are welcome! To add a new animation:

1. Add the `@keyframes` and `.class` to `globals.css`
2. Add an entry to the `ANIMATIONS` array in `page.tsx` with:
   - `id`, `name`, `description`, `category`, `animClass`, `accentColor`, `icon`
   - A complete `cssSnippet` string (the copy-paste ready code)
3. Open a PR — that's it!

---

## 📄 License

MIT © 2026 — free to use in personal and commercial projects.
