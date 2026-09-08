'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Menu, X } from 'lucide-react';

const NAV = [
  { label: 'Animations', href: '#animations' },
  { label: 'Playground', href: '#playground' },
  { label: 'About', href: '#about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close on route-hash navigation
  const handleLink = () => setOpen(false);

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled ? 'glass border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]' : 'border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between" style={{ height: 60 }}>
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group" aria-label="AnimFX home">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,.5)] group-hover:shadow-[0_0_30px_rgba(124,58,237,.8)] transition-all duration-300">
            <Zap size={15} className="text-white" />
          </div>
          <span style={{ fontFamily: 'Space Grotesk, sans-serif' }} className="text-[17px] font-bold text-white tracking-tight">
            Anim<span className="text-violet-400">FX</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(l => (
            <a key={l.label} href={l.href}
              className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200">
              {l.label}
            </a>
          ))}
          <a href="#animations"
            className="ml-3 px-4 py-2 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(124,58,237,.4)] hover:shadow-[0_0_30px_rgba(124,58,237,.6)] transition-all duration-300">
            View Animations ↓
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open
              ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={20} /></motion.span>
              : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={20} /></motion.span>
            }
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden glass border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV.map(l => (
                <a key={l.label} href={l.href} onClick={handleLink}
                  className="py-2.5 px-3 text-sm font-medium text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                  {l.label}
                </a>
              ))}
              <a href="#animations" onClick={handleLink}
                className="mt-2 py-2.5 px-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-center">
                View Animations ↓
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
