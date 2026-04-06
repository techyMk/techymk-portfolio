import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Works', href: '#projects' },
];

function ThemeSwitch() {
  const { dark, toggle } = useTheme();
  return (
    <button onClick={toggle} aria-label="Toggle theme" className="relative w-[42px] h-[22px] rounded-full bg-bg-elevated border border-border hover:border-border-hover transition-colors flex items-center px-[2px]" data-hover>
      <motion.div className="w-[18px] h-[18px] rounded-full bg-accent shadow-md shadow-accent/30 z-10" animate={{ x: dark ? 18 : 0 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
    </button>
  );
}

/* Nav link with active state */
function NavLink({ href, children, active }) {
  return (
    <motion.a
      href={href}
      className={`relative px-3 py-1.5 rounded-full text-[13px] transition-colors duration-200 inline-block ${
        active ? 'text-accent' : 'text-content-secondary hover:text-content-primary'
      }`}
      style={{ perspective: 400 }}
      whileHover={{ rotateX: -8, rotateY: 4, scale: 1.06 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
    >
      {active && (
        <motion.span
          className="absolute inset-0 rounded-full bg-accent/[0.08]"
          layoutId="navActive"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.a>
  );
}

/* Button with ripple fill from hover/click origin */
function RippleButton({ href, children, className = '', onClick, rippleClass = 'bg-white/60' }) {
  const ref = useRef(null);
  const [ripple, setRipple] = useState(null);

  const handleInteraction = useCallback((e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dx = Math.max(x, rect.width - x);
    const dy = Math.max(y, rect.height - y);
    const farthestX = Math.max(x, rect.width - x);
    const farthestY = Math.max(y, rect.height - y);
    const size = Math.ceil(Math.sqrt(farthestX * farthestX + farthestY * farthestY) * 2.5);
    setRipple({ x, y, size, key: Date.now() });
  }, []);

  const handleLeave = useCallback(() => setRipple(null), []);

  return (
    <a
      ref={ref}
      href={href}
      className={`relative overflow-hidden inline-flex items-center justify-center ${className}`}
      onMouseEnter={handleInteraction}
      onMouseLeave={handleLeave}
      onClick={onClick}
      data-hover
    >
      <AnimatePresence>
        {ripple && (
          <motion.span
            key={ripple.key}
            className={`absolute rounded-full pointer-events-none ${rippleClass}`}
            style={{ left: ripple.x, top: ripple.y, x: '-50%', y: '-50%' }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: ripple.size, height: ripple.size, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>
      <span className="relative z-10">{children}</span>
    </a>
  );
}

export default function Navbar() {
  const [mode, setMode] = useState('nav');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const lastScroll = useRef(0);

  // Track which section is in view
  useEffect(() => {
    const sectionIds = ['home', 'services', 'about', 'projects'];
    const visibleSections = new Set();
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) visibleSections.add(id);
          else visibleSections.delete(id);

          if (visibleSections.size === 0) {
            setActiveSection('');
          } else {
            // Pick the last one in DOM order that's visible
            const active = sectionIds.filter((s) => visibleSections.has(s)).pop();
            if (active) setActiveSection(`#${active}`);
          }
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const threshold = 300;
    const onScroll = () => {
      const y = window.scrollY;
      const dir = y > lastScroll.current ? 'down' : 'up';
      lastScroll.current = y;
      if (y < threshold) setMode('nav');
      else if (dir === 'down') setMode('badge');
      else if (dir === 'up') setMode('nav');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
        <AnimatePresence mode="wait">
          {mode === 'nav' ? (
            <motion.nav
              key="nav"
              className="flex items-center gap-1 px-2 py-2 rounded-full bg-bg-card/50 backdrop-blur-xl border border-border/30"
              initial={{ opacity: 0, y: -20, scale: 0.9, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, scale: 0.95, filter: 'blur(6px)' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href="#home" className="flex items-center gap-2 pl-3 pr-2">
                <img src="assets/favicon.webp" alt="TechyMk" className="w-7 h-7 rounded-full object-cover" />
              </a>

              <div className="hidden md:block w-px h-5 bg-border mx-1" />

              <div className="hidden md:flex items-center">
                {navLinks.map((l) => (
                  <NavLink key={l.label} href={l.href} active={activeSection === l.href}>{l.label}</NavLink>
                ))}
              </div>

              <div className="hidden md:block w-px h-5 bg-border mx-1" />

              <ThemeSwitch />

              <RippleButton href="#contact" rippleClass="bg-accent" className="hidden md:inline-flex px-4 py-1.5 rounded-full bg-black text-white dark:bg-white dark:text-black dark:hover:text-white text-[13px] font-semibold">
                Hire Me
              </RippleButton>

              <button className="md:hidden w-8 h-8 rounded-full flex items-center justify-center text-content-primary" onClick={() => setMenuOpen(true)} aria-label="Menu">
                <Menu size={16} />
              </button>
            </motion.nav>
          ) : (
            <motion.div
              key="badge"
              className="flex items-center gap-2 pl-3 pr-4 sm:pl-4 sm:pr-5 py-2.5 rounded-full bg-bg-card/60 backdrop-blur-xl border border-border/30 cursor-pointer"
              initial={{ opacity: 0, y: -20, scale: 0.8, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, scale: 0.9, filter: 'blur(6px)' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setMenuOpen(true)}
              data-hover
            >
              <img src="assets/favicon.webp" alt="TechyMk" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover flex-shrink-0" />
              <span className="text-content-secondary text-[11px] sm:text-[13px] font-medium whitespace-nowrap">Available for freelance works</span>
              <span className="relative flex-shrink-0 flex items-center justify-center w-4 h-4">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-40" />
                <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-emerald-500 shadow-md shadow-emerald-500/30" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-bg/95 backdrop-blur-2xl flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-bg-elevated border border-border flex items-center justify-center text-content-primary"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              data-hover
            >
              <X size={18} />
            </motion.button>

            <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
              <ThemeSwitch />
            </motion.div>

            {navLinks.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-[36px] md:text-[48px] font-semibold text-content-primary hover:text-accent transition-colors py-2"
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.08 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                style={{ perspective: 400 }}
                whileHover={{ rotateX: -6, rotateY: 3, scale: 1.04 }}
                data-hover
              >
                {l.label}
              </motion.a>
            ))}

            <RippleButton
              href="#contact"
              onClick={() => setMenuOpen(false)}
              rippleClass="bg-accent"
              className="mt-8 px-8 py-3.5 rounded-full bg-black text-white dark:bg-white dark:text-black dark:hover:text-white font-display font-semibold text-[18px] shadow-lg"
            >
              Hire Me
            </RippleButton>

            <motion.div
              className="absolute bottom-8 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-content-muted text-[12px]">Available for freelance work</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
