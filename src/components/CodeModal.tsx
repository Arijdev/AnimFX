'use client';

import { useEffect, useCallback, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Copy,
  Check,
  Code2,
  Sliders,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  BookOpen,
} from 'lucide-react';

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

interface CodeModalProps {
  anim: AnimationDef | null;
  onClose: () => void;
}

type Tab = 'customize' | 'code' | 'usage';
type PreviewShape = 'icon' | 'card' | 'button' | 'badge' | 'text';
type CodeFormat = 'shorthand' | 'longhand';

const EASING_PRESETS = [
  { label: 'Ease', value: 'ease', desc: 'Default smooth' },
  { label: 'Linear', value: 'linear', desc: 'Constant speed' },
  { label: 'Ease-In', value: 'ease-in', desc: 'Accelerate' },
  { label: 'Ease-Out', value: 'ease-out', desc: 'Decelerate' },
  { label: 'Ease-In-Out', value: 'ease-in-out', desc: 'Smooth start/stop' },
  { label: 'Spring', value: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)', desc: 'Bouncy overshoot' },
  { label: 'Snappy', value: 'cubic-bezier(0.16, 1, 0.3, 1)', desc: 'Fluid & crisp' },
  { label: 'Elastic', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)', desc: 'Rubber pop' },
  { label: 'Steps (4)', value: 'steps(4, end)', desc: 'Retro frame steps' },
];

const ITERATION_OPTIONS = [
  { label: '∞ Infinite', value: 'infinite' },
  { label: '1x (Once)', value: '1' },
  { label: '2x', value: '2' },
  { label: '3x', value: '3' },
  { label: '5x', value: '5' },
];

const DIRECTION_OPTIONS = [
  { label: 'Normal', value: 'normal' },
  { label: 'Reverse', value: 'reverse' },
  { label: 'Alternate', value: 'alternate' },
  { label: 'Alt-Reverse', value: 'alternate-reverse' },
];

const FILL_MODE_OPTIONS = [
  { label: 'Both', value: 'both' },
  { label: 'Forwards', value: 'forwards' },
  { label: 'Backwards', value: 'backwards' },
  { label: 'None', value: 'none' },
];

const CATEGORY_COLOR: Record<string, string> = {
  basic:     'bg-sky-500/15 text-sky-300 border border-sky-500/25',
  entrance:  'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25',
  attention: 'bg-amber-500/15 text-amber-300 border border-amber-500/25',
  glow:      'bg-violet-500/15 text-violet-300 border border-violet-500/25',
  creative:  'bg-pink-500/15 text-pink-300 border border-pink-500/25',
};

/* ─── CSS Syntax Highlighter ─── */
function highlightCSS(raw: string): string {
  const lines = raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .split('\n');

  return lines
    .map((line, i) => {
      let l = line;

      // Full-line comments
      if (/^\s*(\/\*|\/\/|\*)/.test(l)) {
        return `<span class="line-num">${String(i + 1).padStart(3)}</span><span class="tok-c">${l}</span>`;
      }

      // @keyframes / @media etc
      l = l.replace(/(@[\w-]+)/g, '<span class="tok-k">$1</span>');

      // % selectors and from/to
      l = l.replace(/\b(\d+(?:\.\d+)?%|from|to)\b(?=\s*[{,])/g, '<span class="tok-s">$1</span>');

      // Class selectors like .bounce {
      l = l.replace(/(\.[\w-]+)(?=\s*\{)/g, '<span class="tok-s">$1</span>');

      // Property: value
      l = l.replace(
        /^(\s+)([\w-]+)(\s*:)(\s*)([^;{}\n]+)(;?)$/,
        (_m, ws, prop, colon, sp, val, semi) =>
          `${ws}<span class="tok-p">${prop}</span>${colon}${sp}<span class="tok-v">${val}</span>${semi}`
      );

      return `<span class="line-num">${String(i + 1).padStart(3)}</span>${l}`;
    })
    .join('\n');
}

/* ─── Parse Raw Snippet ─── */
function parseSnippet(snippet: string, defaultName: string) {
  const kfMatch = snippet.match(/@keyframes\s+([a-zA-Z0-9_-]+)/);
  const keyframeName = kfMatch ? kfMatch[1] : defaultName;

  const classMatch = snippet.match(/\.([a-zA-Z0-9_-]+)\s*\{/);
  const className = classMatch ? classMatch[1] : defaultName;

  const classIndex = snippet.search(/\n\s*\.[a-zA-Z0-9_-]+\s*\{/);
  let keyframesBlock = snippet;
  if (classIndex !== -1) {
    keyframesBlock = snippet.substring(0, classIndex).trim();
  }

  return { keyframeName, className, keyframesBlock };
}

export default function CodeModal({ anim, onClose }: CodeModalProps) {
  const [tab, setTab] = useState<Tab>('customize');
  const [copied, setCopied] = useState(false);
  const [copiedType, setCopiedType] = useState<string>('');
  const [format, setFormat] = useState<CodeFormat>('shorthand');

  // Customization States
  const [duration, setDuration] = useState<number>(1.0);
  const [timingFunction, setTimingFunction] = useState<string>('ease');
  const [delay, setDelay] = useState<number>(0);
  const [iterationCount, setIterationCount] = useState<string>('infinite');
  const [direction, setDirection] = useState<string>('normal');
  const [fillMode, setFillMode] = useState<string>('both');

  // Preview States
  const [shape, setShape] = useState<PreviewShape>('icon');
  const [customText, setCustomText] = useState<string>('Awesome Animation');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [replayKey, setReplayKey] = useState<number>(0);

  // Parse keyframes and class info from snippet
  const parsed = useMemo(() => {
    if (!anim) return { keyframeName: 'anim', className: 'anim', keyframesBlock: '' };
    return parseSnippet(anim.cssSnippet, anim.animClass.replace('anim-', ''));
  }, [anim]);

  // Reset parameters when opening a different animation
  useEffect(() => {
    if (anim) {
      setTab('customize');
      setIsPaused(false);
      setReplayKey((k) => k + 1);

      // Inspect default snippet for initial values
      const isEntrance = anim.category === 'entrance';
      setDuration(isEntrance ? 0.8 : 1.0);
      setTimingFunction('ease');
      setDelay(0);
      setIterationCount(isEntrance ? '1' : 'infinite');
      setDirection('normal');
      setFillMode('both');
    }
  }, [anim?.id, anim?.category]);

  // Reset to original animation defaults
  const handleReset = useCallback(() => {
    if (!anim) return;
    const isEntrance = anim.category === 'entrance';
    setDuration(isEntrance ? 0.8 : 1.0);
    setTimingFunction('ease');
    setDelay(0);
    setIterationCount(isEntrance ? '1' : 'infinite');
    setDirection('normal');
    setFillMode('both');
    setIsPaused(false);
    setReplayKey((k) => k + 1);
  }, [anim]);

  // Keyboard shortcut: Esc to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = anim ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [anim]);

  // Generate customized CSS string
  const customizedClassBody = useMemo(() => {
    if (format === 'shorthand') {
      const parts = [
        parsed.keyframeName,
        `${duration}s`,
        timingFunction,
        delay > 0 ? `${delay}s` : null,
        iterationCount,
        direction !== 'normal' ? direction : null,
        fillMode !== 'none' ? fillMode : null,
      ]
        .filter(Boolean)
        .join(' ');

      return `  animation: ${parts};`;
    }

    const lines = [
      `  animation-name: ${parsed.keyframeName};`,
      `  animation-duration: ${duration}s;`,
      `  animation-timing-function: ${timingFunction};`,
      delay > 0 ? `  animation-delay: ${delay}s;` : null,
      `  animation-iteration-count: ${iterationCount};`,
      direction !== 'normal' ? `  animation-direction: ${direction};` : null,
      fillMode !== 'none' ? `  animation-fill-mode: ${fillMode};` : null,
    ].filter(Boolean);

    return lines.join('\n');
  }, [parsed.keyframeName, duration, timingFunction, delay, iterationCount, direction, fillMode, format]);

  const fullCustomizedCSS = useMemo(() => {
    return `${parsed.keyframesBlock}

/* Customized Class */
.${parsed.className} {
${customizedClassBody}
}`;
  }, [parsed.keyframesBlock, parsed.className, customizedClassBody]);

  // Copy handler
  const handleCopy = useCallback(
    async (type: 'css' | 'class' | 'html' = 'css') => {
      if (!anim) return;
      let textToCopy = fullCustomizedCSS;

      if (type === 'class') {
        textToCopy = `.${parsed.className} {\n${customizedClassBody}\n}`;
      } else if (type === 'html') {
        textToCopy = `<div class="${parsed.className}">\n  <!-- Your Content -->\n</div>`;
      }

      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setCopiedType(type);
      setTimeout(() => {
        setCopied(false);
        setCopiedType('');
      }, 2500);
    },
    [anim, fullCustomizedCSS, parsed.className, customizedClassBody]
  );

  const activeEasingLabel = useMemo(() => {
    const found = EASING_PRESETS.find((e) => e.value === timingFunction);
    return found ? found.label : 'Custom';
  }, [timingFunction]);

  return (
    <AnimatePresence>
      {anim && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-2 sm:p-4 md:p-6">
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 20 }}
              transition={{ type: 'spring', bounce: 0.16, duration: 0.4 }}
              className="w-full max-w-5xl max-h-[94dvh] flex flex-col rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.85)] border border-white/10"
              style={{ background: '#0b0f17' }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`${anim.name} animation customizer and code`}
            >
              {/* ── Header ── */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/8 shrink-0 bg-[#0d121c]">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl sm:text-3xl shrink-0 p-1.5 rounded-xl bg-white/5 border border-white/10">
                    {anim.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2
                        className="text-white font-semibold text-base sm:text-lg leading-tight"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        {anim.name}
                      </h2>
                      <span
                        className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full capitalize shrink-0 ${CATEGORY_COLOR[anim.category]}`}
                      >
                        {anim.category}
                      </span>
                    </div>
                    <p className="text-xs text-white/40 mt-0.5 leading-snug line-clamp-1">{anim.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <button
                    onClick={handleReset}
                    title="Reset to default settings"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-white/50 hover:text-white hover:bg-white/10 border border-white/10 transition-all duration-200"
                  >
                    <RotateCcw size={12} />
                    <span className="hidden sm:inline">Reset</span>
                  </button>
                  <button
                    onClick={onClose}
                    aria-label="Close modal"
                    className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* ── Navigation Tab Bar ── */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-2 border-b border-white/8 shrink-0 bg-[#070b12] gap-2 flex-wrap">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setTab('customize')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      tab === 'customize'
                        ? 'bg-violet-600 text-white shadow-[0_0_16px_rgba(124,58,237,0.4)]'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Sliders size={13} />
                    <span>Customize &amp; Preview</span>
                  </button>

                  <button
                    onClick={() => setTab('code')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      tab === 'code'
                        ? 'bg-violet-600 text-white shadow-[0_0_16px_rgba(124,58,237,0.4)]'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Code2 size={13} />
                    <span>CSS Code</span>
                  </button>

                  <button
                    onClick={() => setTab('usage')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      tab === 'usage'
                        ? 'bg-violet-600 text-white shadow-[0_0_16px_rgba(124,58,237,0.4)]'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <BookOpen size={13} />
                    <span>Usage Guide</span>
                  </button>
                </div>

                {/* Quick Copy Action */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy('css')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      copied && copiedType === 'css'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {copied && copiedType === 'css' ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copied && copiedType === 'css' ? 'Copied!' : 'Copy CSS'}</span>
                  </button>
                </div>
              </div>

              {/* ── Modal Body Content ── */}
              <div className="flex-1 overflow-auto min-h-0">
                {/* ── TAB 1: CUSTOMIZE & PREVIEW ── */}
                {tab === 'customize' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 min-h-full">
                    {/* Left Stage: Live Preview & Element Switcher (5 cols on lg) */}
                    <div className="lg:col-span-5 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-white/8 bg-[#080d15] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles size={12} className="text-violet-400" />
                            Live Stage
                          </span>
                          <span className="text-[11px] text-violet-400 font-mono">
                            {duration}s • {activeEasingLabel}
                          </span>
                        </div>

                        {/* Animated Stage Display Box */}
                        <div
                          className="relative h-52 sm:h-60 rounded-2xl flex items-center justify-center overflow-hidden border border-white/10 shadow-inner"
                          style={{
                            background: `radial-gradient(circle at center, ${anim.accentColor}18 0%, #060910 80%)`,
                          }}
                        >
                          {/* Ambient Stage Glow */}
                          <div
                            className="absolute w-40 h-40 rounded-full blur-3xl opacity-30 pointer-events-none"
                            style={{ background: anim.accentColor }}
                          />

                          {/* The Element Under Animation */}
                          <div
                            key={replayKey}
                            style={{
                              animationName: anim.animClass,
                              animationDuration: `${duration}s`,
                              animationTimingFunction: timingFunction,
                              animationDelay: `${delay}s`,
                              animationIterationCount: iterationCount,
                              animationDirection: direction,
                              animationFillMode: fillMode,
                              animationPlayState: isPaused ? 'paused' : 'running',
                            }}
                            className="relative z-10 select-none flex items-center justify-center cursor-default"
                          >
                            {shape === 'icon' && (
                              <span className="text-6xl sm:text-7xl leading-none filter drop-shadow-md">
                                {anim.icon}
                              </span>
                            )}

                            {shape === 'card' && (
                              <div
                                className="w-36 rounded-xl p-3.5 text-center backdrop-blur-xl border border-white/15 shadow-xl"
                                style={{ background: 'rgba(255,255,255,0.06)' }}
                              >
                                <div className="text-2xl mb-1">{anim.icon}</div>
                                <div className="text-xs font-semibold text-white truncate">{anim.name}</div>
                                <div className="text-[10px] text-white/40 mt-0.5">Glass Box</div>
                              </div>
                            )}

                            {shape === 'button' && (
                              <button
                                type="button"
                                className="px-5 py-2.5 rounded-xl font-medium text-xs text-white shadow-lg flex items-center gap-2 border border-white/20"
                                style={{ background: `linear-gradient(135deg, ${anim.accentColor}, #4f46e5)` }}
                              >
                                <span>{anim.icon}</span>
                                <span>Action Button</span>
                              </button>
                            )}

                            {shape === 'badge' && (
                              <span
                                className="px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 border"
                                style={{
                                  background: `${anim.accentColor}25`,
                                  color: '#ffffff',
                                  borderColor: `${anim.accentColor}50`,
                                }}
                              >
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                {anim.name} Feature
                              </span>
                            )}

                            {shape === 'text' && (
                              <span
                                className="text-2xl sm:text-3xl font-bold gradient-text text-center px-4"
                                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                              >
                                {customText || anim.name}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Stage Playback Controls */}
                        <div className="flex items-center justify-between gap-2 mt-3 p-1.5 rounded-xl bg-white/5 border border-white/8">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setIsPaused(!isPaused)}
                              title={isPaused ? 'Play animation' : 'Pause animation'}
                              className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                                isPaused
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  : 'bg-white/10 text-white hover:bg-white/15'
                              }`}
                            >
                              {isPaused ? <Play size={13} /> : <Pause size={13} />}
                              <span>{isPaused ? 'Resume' : 'Pause'}</span>
                            </button>

                            <button
                              onClick={() => setReplayKey((k) => k + 1)}
                              title="Re-trigger animation from start"
                              className="p-2 rounded-lg text-xs font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 transition-all flex items-center gap-1.5"
                            >
                              <RotateCcw size={13} />
                              <span>Replay</span>
                            </button>
                          </div>

                          <div className="text-[10px] text-white/40 pr-2">
                            {iterationCount === 'infinite' ? 'Looping' : `${iterationCount}x cycle`}
                          </div>
                        </div>

                        {/* Shape Selector Bar */}
                        <div className="mt-4">
                          <label className="text-[11px] font-medium text-white/40 block mb-2">
                            Preview Element:
                          </label>
                          <div className="grid grid-cols-5 gap-1.5 p-1 rounded-xl bg-white/5 border border-white/8">
                            {(
                              [
                                { id: 'icon', label: 'Icon' },
                                { id: 'card', label: 'Card' },
                                { id: 'button', label: 'Button' },
                                { id: 'badge', label: 'Badge' },
                                { id: 'text', label: 'Text' },
                              ] as { id: PreviewShape; label: string }[]
                            ).map((s) => (
                              <button
                                key={s.id}
                                onClick={() => setShape(s.id)}
                                className={`py-1.5 text-[11px] font-medium rounded-lg capitalize transition-all ${
                                  shape === s.id
                                    ? 'bg-violet-600 text-white shadow-sm'
                                    : 'text-white/40 hover:text-white hover:bg-white/5'
                                }`}
                              >
                                {s.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {shape === 'text' && (
                          <div className="mt-2.5">
                            <input
                              type="text"
                              value={customText}
                              onChange={(e) => setCustomText(e.target.value)}
                              placeholder="Type custom text..."
                              maxLength={30}
                              className="w-full px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50"
                            />
                          </div>
                        )}
                      </div>

                      {/* Mini Live CSS Snippet Preview */}
                      <div className="mt-5 pt-4 border-t border-white/8">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">
                            Active CSS Rule
                          </span>
                          <button
                            onClick={() => handleCopy('class')}
                            className="text-[10px] text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
                          >
                            <Copy size={10} />
                            <span>Copy Class Only</span>
                          </button>
                        </div>
                        <pre
                          className="p-2.5 rounded-xl bg-[#060910] border border-white/8 text-[11px] font-mono text-cyan-300 overflow-x-auto leading-relaxed"
                          style={{ fontFamily: "'JetBrains Mono', Consolas, monospace" }}
                        >
                          {`.${parsed.className} {\n${customizedClassBody}\n}`}
                        </pre>
                      </div>
                    </div>

                    {/* Right Panel: Interactive Customizer Sliders & Pills (7 cols on lg) */}
                    <div className="lg:col-span-7 p-4 sm:p-6 space-y-5 bg-[#0b0f17]">
                      {/* Control 1: Duration */}
                      <div className="glass rounded-xl p-4 border border-white/8 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-xs font-semibold text-white flex items-center gap-2">
                              Animation Speed / Duration
                            </label>
                            <p className="text-[11px] text-white/40">
                              Controls how long one full animation cycle takes
                            </p>
                          </div>
                          <span className="px-2.5 py-1 rounded-md bg-violet-600/20 text-violet-300 border border-violet-500/30 text-xs font-mono font-bold">
                            {duration.toFixed(1)}s
                          </span>
                        </div>

                        <input
                          type="range"
                          min="0.1"
                          max="5.0"
                          step="0.1"
                          value={duration}
                          onChange={(e) => setDuration(parseFloat(e.target.value))}
                          className="w-full accent-violet-500 cursor-pointer h-1.5 bg-white/10 rounded-lg"
                        />

                        {/* Quick Duration Presets */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] text-white/30">Presets:</span>
                          {[
                            { label: '0.3s Fast', val: 0.3 },
                            { label: '0.8s Snappy', val: 0.8 },
                            { label: '1.2s Normal', val: 1.2 },
                            { label: '2.0s Smooth', val: 2.0 },
                            { label: '3.5s Slow', val: 3.5 },
                          ].map((p) => (
                            <button
                              key={p.label}
                              onClick={() => setDuration(p.val)}
                              className={`px-2 py-0.5 rounded text-[10px] font-medium border transition-all ${
                                Math.abs(duration - p.val) < 0.05
                                  ? 'bg-violet-600 text-white border-violet-500'
                                  : 'bg-white/5 text-white/50 border-white/10 hover:text-white'
                              }`}
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Control 2: Timing Function / Easing */}
                      <div className="glass rounded-xl p-4 border border-white/8 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-xs font-semibold text-white">
                              Timing Function (Easing)
                            </label>
                            <p className="text-[11px] text-white/40">
                              Sets acceleration and deceleration physics
                            </p>
                          </div>
                          <span className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                            {activeEasingLabel}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                          {EASING_PRESETS.map((e) => (
                            <button
                              key={e.label}
                              onClick={() => setTimingFunction(e.value)}
                              className={`p-2 rounded-lg text-left transition-all border ${
                                timingFunction === e.value
                                  ? 'bg-violet-600/30 text-white border-violet-500 shadow-sm'
                                  : 'bg-white/5 text-white/60 border-white/8 hover:text-white hover:bg-white/8'
                              }`}
                            >
                              <div className="text-xs font-medium truncate">{e.label}</div>
                              <div className="text-[9px] text-white/35 truncate">{e.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Control 3 & 4: Iteration Count & Direction */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Iteration Count */}
                        <div className="glass rounded-xl p-4 border border-white/8 space-y-2.5">
                          <label className="text-xs font-semibold text-white block">
                            Iteration Count
                          </label>
                          <div className="grid grid-cols-2 gap-1.5">
                            {ITERATION_OPTIONS.map((it) => (
                              <button
                                key={it.value}
                                onClick={() => setIterationCount(it.value)}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all text-center ${
                                  iterationCount === it.value
                                    ? 'bg-violet-600 text-white border-violet-500'
                                    : 'bg-white/5 text-white/50 border-white/10 hover:text-white'
                                }`}
                              >
                                {it.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Direction */}
                        <div className="glass rounded-xl p-4 border border-white/8 space-y-2.5">
                          <label className="text-xs font-semibold text-white block">
                            Direction
                          </label>
                          <div className="grid grid-cols-2 gap-1.5">
                            {DIRECTION_OPTIONS.map((d) => (
                              <button
                                key={d.value}
                                onClick={() => setDirection(d.value)}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all text-center ${
                                  direction === d.value
                                    ? 'bg-violet-600 text-white border-violet-500'
                                    : 'bg-white/5 text-white/50 border-white/10 hover:text-white'
                                }`}
                              >
                                {d.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Control 5 & 6: Delay & Fill Mode */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Delay */}
                        <div className="glass rounded-xl p-4 border border-white/8 space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-white">Delay</label>
                            <span className="text-xs font-mono text-violet-300 font-semibold">
                              {delay.toFixed(1)}s
                            </span>
                          </div>
                          <input
                            type="range"
                            min="0.0"
                            max="3.0"
                            step="0.1"
                            value={delay}
                            onChange={(e) => setDelay(parseFloat(e.target.value))}
                            className="w-full accent-violet-500 cursor-pointer h-1.5 bg-white/10 rounded-lg"
                          />
                          <p className="text-[10px] text-white/35">Wait before starting</p>
                        </div>

                        {/* Fill Mode */}
                        <div className="glass rounded-xl p-4 border border-white/8 space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-white">Fill Mode</label>
                            <span className="text-xs font-mono text-cyan-300 font-semibold capitalize">
                              {fillMode}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            {FILL_MODE_OPTIONS.map((fm) => (
                              <button
                                key={fm.value}
                                onClick={() => setFillMode(fm.value)}
                                className={`px-2 py-1 rounded-md text-[11px] font-medium border transition-all ${
                                  fillMode === fm.value
                                    ? 'bg-violet-600 text-white border-violet-500'
                                    : 'bg-white/5 text-white/50 border-white/10 hover:text-white'
                                }`}
                              >
                                {fm.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── TAB 2: FULL CSS CODE ── */}
                {tab === 'code' && (
                  <div className="flex flex-col h-full bg-[#080d15]">
                    {/* Format Toggle Bar */}
                    <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 border-b border-white/8 bg-[#060a10]">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white/40 font-medium">Format:</span>
                        <div className="flex items-center p-0.5 rounded-lg bg-white/5 border border-white/10">
                          <button
                            onClick={() => setFormat('shorthand')}
                            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                              format === 'shorthand'
                                ? 'bg-violet-600 text-white shadow-sm'
                                : 'text-white/50 hover:text-white'
                            }`}
                          >
                            Shorthand
                          </button>
                          <button
                            onClick={() => setFormat('longhand')}
                            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                              format === 'longhand'
                                ? 'bg-violet-600 text-white shadow-sm'
                                : 'text-white/50 hover:text-white'
                            }`}
                          >
                            Detailed (Longhand)
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy('css')}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs text-violet-300 hover:text-white bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 transition-all"
                        >
                          <Copy size={11} />
                          <span>Copy Full CSS</span>
                        </button>
                      </div>
                    </div>

                    {/* Syntax Highlighted Code Viewer */}
                    <div className="flex-1 p-4 sm:p-6 overflow-auto">
                      <pre
                        className="text-xs sm:text-sm leading-6 sm:leading-7 whitespace-pre font-mono"
                        style={{
                          fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                          color: '#e6edf3',
                        }}
                      >
                        <style>{`
                          .line-num { display:inline-block; width:2.5em; color:#3d4451; user-select:none; margin-right:.75em; text-align:right; }
                          .tok-c { color: #64748b; font-style: italic; }
                          .tok-k { color: #f43f5e; font-weight: 600; }
                          .tok-s { color: #38bdf8; }
                          .tok-p { color: #a78bfa; }
                          .tok-v { color: #fbbf24; }
                        `}</style>
                        <code
                          dangerouslySetInnerHTML={{
                            __html: highlightCSS(fullCustomizedCSS),
                          }}
                        />
                      </pre>
                    </div>
                  </div>
                )}

                {/* ── TAB 3: USAGE GUIDE ── */}
                {tab === 'usage' && (
                  <div className="p-4 sm:p-6 md:p-8 space-y-6 max-w-3xl mx-auto overflow-auto">
                    <div>
                      <h3
                        className="text-base font-semibold text-white mb-2"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        How to use this customized animation
                      </h3>
                      <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                        Copy the customized CSS snippet generated above and drop it directly into your project.
                        Zero external dependencies or JavaScript runtime required!
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="glass rounded-xl p-4 border border-white/10 flex gap-3.5 items-start">
                        <span className="w-6 h-6 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          1
                        </span>
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-white">
                            Paste the CSS into your stylesheet
                          </p>
                          <p className="text-xs text-white/40 mt-1">
                            Paste the keyframes and <code className="text-violet-300">.{parsed.className}</code> class into your <code className="text-cyan-300">globals.css</code>, <code className="text-cyan-300">styles.css</code>, or CSS module.
                          </p>
                        </div>
                      </div>

                      <div className="glass rounded-xl p-4 border border-white/10 flex gap-3.5 items-start">
                        <span className="w-6 h-6 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          2
                        </span>
                        <div className="w-full">
                          <p className="text-xs sm:text-sm font-semibold text-white mb-2">
                            Add the class to your HTML element
                          </p>
                          <pre
                            className="p-3 rounded-lg bg-[#060910] border border-white/8 text-xs font-mono text-cyan-300 overflow-x-auto"
                            style={{ fontFamily: "'JetBrains Mono', Consolas, monospace" }}
                          >
                            {`<!-- HTML -->\n<div class="${parsed.className}">\n  Your content here\n</div>`}
                          </pre>
                        </div>
                      </div>

                      <div className="glass rounded-xl p-4 border border-white/10 flex gap-3.5 items-start">
                        <span className="w-6 h-6 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          3
                        </span>
                        <div className="w-full">
                          <p className="text-xs sm:text-sm font-semibold text-white mb-2">
                            Using with React / Next.js
                          </p>
                          <pre
                            className="p-3 rounded-lg bg-[#060910] border border-white/8 text-xs font-mono text-cyan-300 overflow-x-auto"
                            style={{ fontFamily: "'JetBrains Mono', Consolas, monospace" }}
                          >
                            {`export default function Card() {\n  return (\n    <div className="${parsed.className}">\n      <h3>Interactive Component</h3>\n    </div>\n  );\n}`}
                          </pre>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl p-4 bg-amber-500/10 border border-amber-500/20">
                      <p className="text-xs text-amber-300/90 leading-relaxed">
                        <span className="font-semibold text-amber-300">💡 Performance Tip:</span> All animations use GPU-accelerated CSS properties (<code className="bg-amber-500/20 px-1 rounded">transform</code> and <code className="bg-amber-500/20 px-1 rounded">opacity</code>) for smooth 60fps performance without layout thrashing.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Footer ── */}
              <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 border-t border-white/8 bg-[#070b12] gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-white/50 truncate flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-violet-400 shrink-0" />
                    <span>Configured:</span>
                    <span className="text-white/80 font-mono font-medium">
                      {duration}s • {activeEasingLabel} • {iterationCount} • {direction}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopy('css')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                      copied
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_24px_rgba(124,58,237,0.4)] hover:shadow-[0_0_32px_rgba(124,58,237,0.6)]'
                    }`}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? 'Copied Customized CSS!' : 'Copy Customized Code'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
