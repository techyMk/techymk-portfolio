import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@._#/:-';

const quotes = [
  { text: '"Talk is cheap. Show me the code."', author: '— Linus Torvalds' },
  { text: '"First, solve the problem. Then, write the code."', author: '— John Johnson' },
  { text: '"Code is like humor. When you have to explain it, it\'s bad."', author: '— Cory House' },
  { text: '"Simplicity is the soul of efficiency."', author: '— Austin Freeman' },
  { text: '"Make it work, make it right, make it fast."', author: '— Kent Beck' },
  { text: '"The best error message is the one that never shows up."', author: '— Thomas Fuchs' },
  { text: '"Design is not just what it looks like. Design is how it works."', author: '— Steve Jobs' },
  { text: '"The only way to do great work is to love what you do."', author: '— Steve Jobs' },
  { text: '"Stay hungry, stay foolish."', author: '— Steve Jobs' },
  { text: '"Move fast and break things."', author: '— Mark Zuckerberg' },
  { text: '"It\'s not a bug — it\'s an undocumented feature."', author: '— Anonymous' },
];

const brandIcons = {
  Email: (c) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.5-9.75-6.5" /></svg>,
  LinkedIn: (c) => <svg viewBox="0 0 24 24" fill={c} className="w-full h-full"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  GitHub: (c) => <svg viewBox="0 0 24 24" fill={c} className="w-full h-full"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>,
  X: (c) => <svg viewBox="0 0 24 24" fill={c} className="w-full h-full"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  Instagram: (c) => <svg viewBox="0 0 24 24" fill={c} className="w-full h-full"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
};

const entries = [
  { text: 'techymk.dev@gmail.com', href: 'mailto:techymk.dev@gmail.com', label: 'Email', color: 'rgba(var(--c-accent),1)' },
  { text: 'linkedin.com/in/techymk', href: 'https://www.linkedin.com/in/techymk', label: 'LinkedIn', color: '#0A66C2' },
  { text: 'github.com/techyMk', href: 'https://github.com/techyMk', label: 'GitHub', color: '#8B5CF6' },
  { text: 'x.com/Manikan55718581', href: 'https://x.com/Manikan55718581', label: 'X', color: '#9CA3AF' },
  { text: 'instagram.com/techyMk', href: 'https://www.instagram.com/_i_am_the___mysterio___/', label: 'Instagram', color: '#E1306C' },
];

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/techymk', icon: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label: 'GitHub', href: 'https://github.com/techyMk', icon: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> },
  { label: 'X', href: 'https://x.com/Manikan55718581', icon: <svg className="w-[16px] h-[16px]" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { label: 'Instagram', href: 'https://www.instagram.com/_i_am_the___mysterio___/', icon: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
];

function createParticles(count, color) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6,
    distance: 50 + Math.random() * 90,
    size: 3 + Math.random() * 8,
    duration: 0.4 + Math.random() * 0.4,
    color,
  }));
}

/* Scramble text hook */
function useScramble(target, active) {
  const [display, setDisplay] = useState(target);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const targetChars = target.split('');
    const len = Math.max(display.length, target.length);
    let iteration = 0;
    const totalSteps = len + 10;

    const tick = () => {
      setDisplay(
        Array.from({ length: len }, (_, i) => {
          if (i < iteration - 3) return targetChars[i] || '';
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('').slice(0, Math.max(target.length, len - Math.max(0, iteration - target.length)))
      );
      iteration++;
      if (iteration <= totalSteps) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, active]);

  return display;
}

export default function Footer() {
  const [idx, setIdx] = useState(0);
  const [scrambling, setScrambling] = useState(false);
  const [blast, setBlast] = useState(null);
  const current = entries[idx];

  const shuffle = useCallback(() => {
    if (scrambling) return;
    setScrambling(true);
    setIdx((prev) => (prev + 1) % entries.length);
    setTimeout(() => setScrambling(false), 600);
  }, [scrambling]);

  const handleTextClick = useCallback(() => {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    const particles = createParticles(14, current.color);
    setBlast({ particles, label: current.label, color: current.color, quote, key: Date.now() });
    setTimeout(() => setBlast(null), 3800);
  }, [current]);

  const displayText = useScramble(current.text, scrambling);

  return (
    <footer className="relative z-[1] px-6 pb-6 pt-4">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <div className="py-16 md:py-24 border-t border-border/30">
            <div className="flex items-center gap-3 mb-5">
              <p className="text-content-muted text-[12px] uppercase tracking-[0.2em] font-semibold">Ready to start?</p>
              <AnimatePresence mode="wait">
                <motion.span
                  key={current.label}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border"
                  style={{ color: current.color, borderColor: current.color + '40', backgroundColor: current.color + '10' }}
                  initial={{ opacity: 0, x: -8, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: 8, filter: 'blur(4px)' }}
                  transition={{ duration: 0.3 }}
                >
                  {current.label}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Text + shuffle + blast zone */}
            <div className="relative">
              <div className="flex items-center gap-5 md:gap-7">
                <button
                  onClick={handleTextClick}
                  className="font-display font-bold tracking-[-0.04em] leading-none text-[24px] sm:text-[32px] md:text-[48px] lg:text-[60px] transition-colors duration-300 hover:opacity-80 text-left cursor-pointer"
                  style={{ color: current.color }}
                  data-hover
                >
                  <span className="font-mono">{displayText}</span>
                </button>

                <motion.button
                  onClick={shuffle}
                  className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-accent flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-accent/25"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.85 }}
                  animate={scrambling ? { rotate: 360 } : { rotate: 0 }}
                  transition={scrambling ? { duration: 0.5, ease: 'easeInOut' } : { type: 'spring', stiffness: 300, damping: 20 }}
                  data-hover
                >
                  <Shuffle size={20} />
                </motion.button>
              </div>

              {/* Blast: icon + particles + quote — appears on the right */}
              <AnimatePresence>
                {blast && (
                  <motion.div
                    key={blast.key}
                    className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-5 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ exit: { duration: 0.6 } }}
                  >
                    {/* Icon with particle burst */}
                    <div className="relative w-[56px] h-[56px] flex-shrink-0">
                      <motion.div
                        className="w-full h-full"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: [0, 1.5, 1], rotate: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {brandIcons[blast.label]?.(blast.color)}
                      </motion.div>

                      {/* Ring pulse */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2"
                        style={{ borderColor: blast.color }}
                        initial={{ scale: 0.5, opacity: 0.8 }}
                        animate={{ scale: 2.5, opacity: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                      />

                      {/* Particles */}
                      {blast.particles.map((p) => (
                        <motion.div
                          key={p.id}
                          className="absolute left-1/2 top-1/2 rounded-full"
                          style={{ width: p.size, height: p.size, backgroundColor: blast.color }}
                          initial={{ x: '-50%', y: '-50%', opacity: 1, scale: 1 }}
                          animate={{
                            x: Math.cos(p.angle) * p.distance - p.size / 2,
                            y: Math.sin(p.angle) * p.distance - p.size / 2,
                            opacity: 0,
                            scale: 0,
                          }}
                          transition={{ duration: p.duration, ease: 'easeOut' }}
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <motion.div
                      className="hidden md:block max-w-[280px]"
                      initial={{ opacity: 0, x: -15, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      transition={{ delay: 0.25, duration: 0.5 }}
                    >
                      <p className="text-content-primary text-[13px] leading-relaxed font-medium italic">
                        {blast.quote.text}
                      </p>
                      <p className="text-content-muted text-[11px] mt-1.5">{blast.quote.author}</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Progress dots */}
            <div className="flex items-center gap-2 mt-6">
              {entries.map((e, i) => (
                <motion.button
                  key={e.label}
                  onClick={() => { if (i !== idx && !scrambling) { setScrambling(true); setIdx(i); setTimeout(() => setScrambling(false), 600); } }}
                  className="relative h-1.5 rounded-full transition-colors"
                  animate={{ width: i === idx ? 32 : 8, backgroundColor: i === idx ? current.color : 'rgba(var(--c-content-muted), 0.2)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  data-hover
                />
              ))}
              <span className="text-content-muted text-[11px] ml-2">click text for a surprise</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Socials row + branding */}
        <div className="border-t border-border/30 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <img src="assets/favicon.png" alt="TechyMk" className="w-9 h-9 rounded-full object-cover" />
              <div>
                <p className="text-content-primary text-[15px] font-display font-bold">Manikandan</p>
                <p className="text-content-muted text-[12px]">Designer & Frontend Developer</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {socials.map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-bg-elevated border border-border flex items-center justify-center text-content-muted hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
                  whileHover={{ y: -4, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={s.label}
                  data-hover
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
            <div className="flex flex-col items-center md:items-end gap-2">
              <p className="text-content-muted text-[12px] uppercase tracking-[0.2em] font-semibold">Love My Works?</p>
              <motion.a
                href="https://buymeacoffee.com/techymk"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-accent/10 text-accent text-[13px] font-semibold hover:bg-accent/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                data-hover
              >
                Buy me a Coffee &rarr;
              </motion.a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/20 pt-5 pb-2 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-content-muted text-[11px]">&copy; {new Date().getFullYear()} Manikandan. All rights reserved.</p>
          <p className="text-content-muted text-[11px]">Designed & built with passion</p>
        </div>
      </div>
    </footer>
  );
}
