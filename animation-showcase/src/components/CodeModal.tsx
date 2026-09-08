'use client';

import { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Code2, Eye } from 'lucide-react';

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

/* ─── CSS Syntax Highlighter ─── */
function highlightCSS(raw: string): string {
  const lines = raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .split('\n');

  return lines.map((line, i) => {
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

    // Property: value (handles "  property: value;")
    l = l.replace(/^(\s+)([\w-]+)(\s*:)(\s*)([^;{}\n]+)(;?)$/,
      (_m, ws, prop, colon, sp, val, semi) =>
        `${ws}<span class="tok-p">${prop}</span>${colon}${sp}<span class="tok-v">${val}</span>${semi}`
    );

    return `<span class="line-num">${String(i + 1).padStart(3)}</span>${l}`;
  }).join('\n');
}

const CATEGORY_COLOR: Record<string, string> = {
  basic:     'bg-sky-500/15 text-sky-300 border border-sky-500/25',
  entrance:  'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25',
  attention: 'bg-amber-500/15 text-amber-300 border border-amber-500/25',
  glow:      'bg-violet-500/15 text-violet-300 border border-violet-500/25',
  creative:  'bg-pink-500/15 text-pink-300 border border-pink-500/25',
};

type Tab = 'preview' | 'code' | 'usage';

export default function CodeModal({ anim, onClose }: CodeModalProps) {
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<Tab>('code');

  const handleCopy = useCallback(async () => {
    if (!anim) return;
    await navigator.clipboard.writeText(anim.cssSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [anim]);

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
    return () => { document.body.style.overflow = ''; };
  }, [anim]);

  // Reset tab on open
  useEffect(() => { if (anim) setTab('code'); }, [anim?.id]);

  const usageSnippet = anim
    ? `<!-- HTML -->\n<div class="${anim.animClass.replace('anim-', '')}">\n  Your content here\n</div>\n\n/* Make sure the CSS is included */\n.${anim.animClass.replace('anim-', '')} {\n  animation: ${anim.animClass.replace('anim-', '')} 1s ease infinite;\n}`
    : '';

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
            className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-6 md:p-10">
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 24 }}
              transition={{ type: 'spring', bounce: 0.18, duration: 0.45 }}
              className="w-full max-w-4xl max-h-[90dvh] flex flex-col rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)]"
              style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.1)' }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`${anim.name} animation code`}
            >
              {/* ── Header ── */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/8 shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl shrink-0">{anim.icon}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2
                        className="text-white font-semibold text-base leading-tight"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        {anim.name}
                      </h2>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize shrink-0 ${CATEGORY_COLOR[anim.category]}`}>
                        {anim.category}
                      </span>
                    </div>
                    <p className="text-xs text-white/40 mt-0.5 leading-snug line-clamp-1">{anim.description}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="ml-3 shrink-0 p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <X size={18} />
                </button>
              </div>

              {/* ── Tab bar ── */}
              <div className="flex items-center gap-1 px-4 sm:px-6 py-2 border-b border-white/8 shrink-0 bg-[#080d14]">
                {(['preview', 'code', 'usage'] as Tab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all duration-200 ${
                      tab === t
                        ? 'bg-violet-600/80 text-white shadow-[0_0_12px_rgba(124,58,237,0.3)]'
                        : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {t === 'preview' && <Eye size={12} className="inline mr-1.5" />}
                    {t === 'code' && <Code2 size={12} className="inline mr-1.5" />}
                    {t}
                  </button>
                ))}
                {/* Copy button (always visible) */}
                <div className="ml-auto">
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      copied
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy CSS'}</span>
                    <span className="sm:hidden">{copied ? '✓' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* ── Body ── */}
              <div className="flex-1 overflow-hidden flex flex-col md:flex-row min-h-0">

                {/* Live Preview (always visible on md+, tab on mobile) */}
                <div className={`
                  md:flex md:flex-col md:items-center md:justify-center md:w-56 md:shrink-0
                  md:border-r border-white/8 bg-[#080d14]
                  ${tab === 'preview' ? 'flex flex-col items-center justify-center py-10' : 'hidden md:flex'}
                `}>
                  <div
                    className="w-28 h-28 rounded-2xl flex items-center justify-center text-5xl mb-4"
                    style={{ background: `${anim.accentColor}18` }}
                  >
                    <span className={`inline-block ${anim.animClass}`}>{anim.icon}</span>
                  </div>
                  <p className="text-xs text-white/30 text-center px-4 leading-relaxed">{anim.description}</p>
                </div>

                {/* Code / Usage pane */}
                <div className={`flex-1 overflow-auto min-h-0 ${tab === 'preview' ? 'hidden md:block' : 'block'}`}>
                  {tab !== 'usage' ? (
                    /* CSS Code View */
                    <div className="relative h-full">
                      <div className="p-4 sm:p-5 overflow-auto h-full">
                        <pre
                          className="text-xs sm:text-sm leading-6 sm:leading-7 whitespace-pre"
                          style={{ fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace", color: '#e6edf3' }}
                        >
                          <style>{`
                            .line-num { display:inline-block; width:2.5em; color:#3d4451; user-select:none; margin-right:.75em; text-align:right; }
                          `}</style>
                          <code dangerouslySetInnerHTML={{ __html: highlightCSS(anim.cssSnippet) }} />
                        </pre>
                      </div>
                    </div>
                  ) : (
                    /* Usage View */
                    <div className="p-4 sm:p-6 space-y-5">
                      <div>
                        <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">How to Use</p>
                        <ol className="space-y-3 text-sm text-white/60">
                          <li className="flex gap-3">
                            <span className="w-5 h-5 rounded-full bg-violet-600 text-white text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                            Copy the CSS snippet and paste it into your stylesheet.
                          </li>
                          <li className="flex gap-3">
                            <span className="w-5 h-5 rounded-full bg-violet-600 text-white text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                            Add the class to your HTML element.
                          </li>
                          <li className="flex gap-3">
                            <span className="w-5 h-5 rounded-full bg-violet-600 text-white text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                            Adjust <code className="text-violet-300 bg-violet-500/10 px-1 rounded">animation-duration</code> and{' '}
                            <code className="text-violet-300 bg-violet-500/10 px-1 rounded">animation-timing-function</code> as needed.
                          </li>
                        </ol>
                      </div>

                      <div className="rounded-xl overflow-hidden border border-white/8">
                        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-white/8">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                          <span className="ml-2 text-xs text-white/30">usage.html</span>
                        </div>
                        <pre
                          className="p-4 text-xs sm:text-sm leading-6 text-cyan-300 overflow-auto"
                          style={{ fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace", background: '#0d1117' }}
                        >
                          {usageSnippet}
                        </pre>
                      </div>

                      <div className="rounded-xl p-4 bg-amber-500/8 border border-amber-500/15">
                        <p className="text-xs text-amber-300/80 leading-relaxed">
                          <span className="font-semibold text-amber-300">💡 Tip:</span> For entrance animations,
                          remove <code className="bg-amber-500/15 px-1 rounded">infinite</code> and use{' '}
                          <code className="bg-amber-500/15 px-1 rounded">animation-fill-mode: both</code> to keep the final state.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ── Footer ── */}
              <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 border-t border-white/8 bg-[#080d14]">
                <p className="text-xs text-white/25">Press <kbd className="px-1.5 py-0.5 rounded bg-white/8 text-white/40 font-mono text-[10px]">Esc</kbd> to close</p>
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                    copied
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]'
                  }`}
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? 'Copied to clipboard!' : 'Copy CSS Snippet'}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
