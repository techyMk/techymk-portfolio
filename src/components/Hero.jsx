import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

function RippleButton({ href, children, className = '', rippleClass = 'bg-white/60' }) {
  const ref = useRef(null);
  const [ripple, setRipple] = useState(null);
  const handleEnter = useCallback((e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dx = Math.max(x, rect.width - x);
    const dy = Math.max(y, rect.height - y);
    const size = Math.ceil(Math.sqrt(dx * dx + dy * dy) * 2.5) + 40;
    setRipple({ x, y, size, key: Date.now() });
  }, []);
  const handleLeave = useCallback(() => setRipple(null), []);
  return (
    <motion.a ref={ref} href={href} className={`relative overflow-hidden ${className}`} onMouseEnter={handleEnter} onMouseLeave={handleLeave} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.97 }} data-hover>
      <AnimatePresence>
        {ripple && (
          <motion.span key={ripple.key} className={`absolute rounded-full pointer-events-none ${rippleClass}`} style={{ left: ripple.x, top: ripple.y, x: '-50%', y: '-50%' }} initial={{ width: 0, height: 0, opacity: 1 }} animate={{ width: ripple.size, height: ripple.size, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} />
        )}
      </AnimatePresence>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.a>
  );
}

function CharReveal({ children, delay = 0, inView = false }) {
  return (
    <span aria-label={children}>
      {children.split('').map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '120%', opacity: 0, filter: 'blur(8px)' }}
            animate={inView ? { y: 0, opacity: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.5, delay: delay + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
          >{ch === ' ' ? '\u00A0' : ch}</motion.span>
        </span>
      ))}
    </span>
  );
}

const marqueeItems = ['React', 'JavaScript', 'Figma', 'UI/UX', 'Python', 'Java', 'C++', 'Git', 'Next.js', 'TypeScript', 'Tailwind', 'MongoDB'];

export default function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  // Hi(2.5s) → wave twice seamlessly(5s) → Hi(2.5s) → ...
  const [showWave, setShowWave] = useState(false);
  useEffect(() => {
    let on = false;
    const run = () => {
      on = !on;
      setShowWave(on);
      return setTimeout(run, on ? 5000 : 2500);
    };
    const t = setTimeout(run, 2500);
    return () => clearTimeout(t);
  }, []);

  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 30, damping: 20 });
  const sy = useSpring(my, { stiffness: 30, damping: 20 });
  const photoX = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const photoY = useTransform(sy, [-0.5, 0.5], [-14, 14]);
  const textPar = useTransform(sx, [-0.5, 0.5], [8, -8]);
  const floatX = useTransform(sx, [-0.5, 0.5], [-30, 30]);
  const floatY = useTransform(sy, [-0.5, 0.5], [-30, 30]);

  useEffect(() => {
    const fn = (e) => { mx.set(e.clientX / window.innerWidth - 0.5); my.set(e.clientY / window.innerHeight - 0.5); };
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, [mx, my]);

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Floating shapes */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ x: floatX, y: floatY }}>
        {['top-[10%] left-[6%] w-2.5 h-2.5 rounded-full border border-accent/20','top-[25%] right-[9%] w-3 h-3 border border-accent/15 rotate-45','bottom-[30%] left-[13%] w-2 h-2 bg-accent/10 rounded-full','top-[55%] right-[18%] w-4 h-4 border border-content-muted/8 rounded-lg rotate-12','bottom-[40%] left-[4%] w-8 h-[1px] bg-gradient-to-r from-accent/20 to-transparent'].map((cls, i) => (
          <motion.div key={i} className={`absolute ${cls}`} animate={{ y: [-15, 15, -15], rotate: [0, 180, 360] }} transition={{ duration: 5 + i * 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }} />
        ))}
      </motion.div>

      <div ref={ref} className="max-w-content mx-auto w-full px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 pb-6 flex-1 flex flex-col justify-center relative z-10">

        {/* Mobile layout: stacked centered | Desktop: 3-col grid */}
        <div className="flex flex-col items-center text-center lg:text-left lg:items-stretch lg:grid lg:grid-cols-[1fr_260px_1fr] gap-4 lg:gap-6">

          {/* Left column — flush right (towards image), TECHY MK above WEBSITE's left edge */}
          <motion.div className="relative min-w-0 flex items-center justify-center lg:justify-end order-2 lg:order-none mt-6 lg:mt-0" style={{ x: textPar }}>
            <div className="relative inline-block">
              <motion.p
                className="absolute bottom-full left-0 mb-2 text-content-primary text-[10px] sm:text-[11px] md:text-[13px] tracking-[0.25em] uppercase font-bold whitespace-nowrap"
                initial={{ opacity: 0, x: -20, filter: 'blur(8px)' }}
                animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                Techy MK
              </motion.p>
              <h1 className="font-display font-black text-content-primary uppercase leading-none tracking-[-0.04em] text-[clamp(32px,10vw,80px)] sm:text-[clamp(36px,8vw,80px)] lg:text-[clamp(36px,5.5vw,80px)]">
                <CharReveal delay={0.5} inView={inView}>WEBSITE</CharReveal>
              </h1>
            </div>
          </motion.div>

          {/* Center — Photo */}
          <motion.div
            className="relative flex justify-center order-first lg:order-none"
            initial={{ opacity: 0, y: 50, scale: 0.88, filter: 'blur(12px)' }}
            animate={inView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div className="relative" style={{ x: photoX, y: photoY }}>
              <motion.div
                className="absolute -inset-8 rounded-[32px] blur-3xl"
                style={{ background: 'radial-gradient(circle, rgba(var(--c-accent), 0.12) 0%, rgba(217,70,239,0.05) 50%, transparent 70%)' }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="relative w-[240px] h-[280px] sm:w-[260px] sm:h-[310px] md:w-full md:h-[360px] lg:h-[390px] rounded-[20px] sm:rounded-[24px] overflow-hidden border border-border/30 shadow-2xl shadow-black/25">
                <img
                  src="assets/hero.png"
                  alt="Profile"
                  className="w-full h-full object-cover object-top"
                />
                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" animate={{ x: ['-150%', '250%'] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 8, ease: 'easeInOut' }} />
              </div>

              {/* Hi / Hand badge */}
              <motion.div
                className="absolute -bottom-3 -left-3 w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] md:w-[90px] md:h-[90px] rounded-full bg-accent flex items-center justify-center shadow-xl shadow-accent/30"
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.2, type: 'spring', bounce: 0.5 }}
                whileHover={{ scale: 1.12, rotate: -10 }}
              >
                <AnimatePresence mode="wait">
                  {showWave ? (
                    <motion.div key="wave" className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] md:w-[38px] md:h-[38px]" style={{ originX: 0.5, originY: 0.9 }} initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1, rotate: [0, 14, -8, 14, -4, 10, 0, 0, 14, -8, 14, -4, 10, 0] }} exit={{ opacity: 0, scale: 0.4 }} transition={{ duration: 0.3, rotate: { duration: 2.4, delay: 0.2, ease: 'easeInOut' } }}>
                      <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/270b.svg" alt="wave" className="w-full h-full" />
                    </motion.div>
                  ) : (
                    <motion.span key="hi" className="text-white font-display text-[16px] sm:text-[20px] md:text-[26px] font-medium" initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.4 }} transition={{ duration: 0.35 }}>Hi!</motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right column — flush left (towards image), tagline below DEVELOPER's right edge */}
          <motion.div className="relative min-w-0 flex items-center justify-center lg:justify-start order-3 lg:order-none" style={{ x: textPar }}>
            <div className="relative inline-block">
              <h1 className="font-display font-black text-content-primary uppercase leading-none tracking-[-0.04em] text-[clamp(32px,10vw,80px)] sm:text-[clamp(36px,8vw,80px)] lg:text-[clamp(36px,5.5vw,80px)]">
                <CharReveal delay={0.8} inView={inView}>DEVELOPER</CharReveal>
              </h1>
              <motion.p
                className="mt-3 lg:absolute lg:top-full lg:right-0 lg:mt-2 text-content-secondary text-[12px] md:text-[14px] leading-relaxed text-center lg:text-right"
                initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                India-based web designer & digital<br />designer crafting premium experiences
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-8 sm:mt-10"
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <RippleButton href="#projects" rippleClass="bg-accent" className="inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-black text-white dark:bg-white dark:text-black dark:hover:text-white text-[12px] sm:text-[13px] font-semibold shadow-lg">
            View My Work <ArrowDown size={15} />
          </RippleButton>
          <RippleButton href="#contact" rippleClass="bg-accent" className="group inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full border border-accent text-accent text-[12px] sm:text-[13px] font-semibold hover:text-white transition-colors">
            Hire Me <ArrowUpRight size={15} />
          </RippleButton>
        </motion.div>

        {/* Scroll */}
        <motion.div className="flex justify-center mt-4 sm:mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}>
          <motion.div className="w-[1px] h-[35px] bg-gradient-to-b from-accent/40 via-content-muted/15 to-transparent" animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} />
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="border-t border-border/30 py-2 sm:py-3 overflow-hidden mt-auto">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((w, i) => (
            <span key={i} className="flex items-center gap-5 sm:gap-8 md:gap-12 mx-5 sm:mx-8 md:mx-12 font-display text-[18px] sm:text-[24px] md:text-[36px] font-semibold uppercase select-none">
              <span className="text-gradient opacity-10">{w}</span>
              <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-accent/15" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
