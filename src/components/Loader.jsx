import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CODE_LINES = [
  'import React from "react";',
  'import { motion } from "framer-motion";',
  '',
  'const Portfolio = () => {',
  '  const [ready, setReady] = useState(false);',
  '  const skills = ["React", "JavaScript", "UI/UX"];',
  '',
  '  useEffect(() => {',
  '    loadCreativity().then(() => setReady(true));',
  '  }, []);',
  '',
  '  return (',
  '    <motion.div animate={{ opacity: 1 }}>',
  '      <Hero name="Manikandan" />',
  '      <Projects count={20} />',
  '      <Contact available={true} />',
  '    </motion.div>',
  '  );',
  '};',
  '',
  'export default Portfolio;',
];

const CODE_LINES_RIGHT = [
  '.portfolio {',
  '  display: flex;',
  '  background: #060606;',
  '  font-family: "Clash Display";',
  '}',
  '',
  '.hero__title {',
  '  font-size: clamp(36px, 9vw, 110px);',
  '  font-weight: 900;',
  '  background: linear-gradient(',
  '    135deg, #7c3aed, #D946EF',
  '  );',
  '  -webkit-background-clip: text;',
  '}',
  '',
  '@keyframes glow {',
  '  0% { box-shadow: 0 0 20px #7c3aed; }',
  '  100% { box-shadow: 0 0 40px #D946EF; }',
  '}',
  '',
  '.card:hover {',
  '  transform: perspective(800px)',
  '    rotateX(5deg) rotateY(5deg);',
  '}',
];

function CodeColumn({ lines, side, phase }) {
  const startDelay = side === 'left' ? 0 : 0.15;

  return (
    <div className={`absolute top-0 ${side === 'left' ? 'left-0' : 'right-0'} w-[38%] sm:w-[32%] h-full overflow-hidden pointer-events-none`}>
      <div className={`p-4 sm:p-6 ${side === 'right' ? 'text-right' : ''}`}>
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className={`font-mono text-[8px] sm:text-[10px] md:text-[11px] leading-[1.8] sm:leading-[2] whitespace-pre ${
              line.includes('import') || line.includes('export') || line.includes('@keyframes')
                ? 'text-purple-400/20'
                : line.includes('const') || line.includes('function') || line.includes('.portfolio') || line.includes('.hero') || line.includes('.card')
                ? 'text-cyan-400/18'
                : line.includes('return') || line.includes('display') || line.includes('font-')
                ? 'text-emerald-400/15'
                : line.includes('//') || line.includes('{') || line.includes('}')
                ? 'text-white/8'
                : 'text-white/12'
            }`}
            initial={{ opacity: 0, x: side === 'left' ? -20 : 20 }}
            animate={phase >= 0 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: startDelay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            {line || '\u00A0'}
          </motion.div>
        ))}
      </div>
      {/* Fade towards center */}
      <div className={`absolute inset-0 ${
        side === 'left'
          ? 'bg-gradient-to-l from-[rgb(6,6,6)] via-[rgb(6,6,6)]/60 to-transparent'
          : 'bg-gradient-to-r from-[rgb(6,6,6)] via-[rgb(6,6,6)]/60 to-transparent'
      }`} />
    </div>
  );
}

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState(0); // 0=logo, 1=name, 2=exit
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 2200;
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(1, elapsed / duration);
      setProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 2400);
    const t3 = setTimeout(() => onComplete?.(), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const nameChars = 'techyMk'.split('');

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[rgb(6,6,6)] overflow-hidden"
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Live code background — left */}
          <CodeColumn lines={CODE_LINES} side="left" phase={phase} />
          {/* Live code background — right */}
          <CodeColumn lines={CODE_LINES_RIGHT} side="right" phase={phase} />

          {/* Typing cursor blinking on a random code line */}
          <motion.div
            className="absolute left-[12%] sm:left-[14%] w-[2px] h-[12px] sm:h-[14px] bg-purple-400/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 1.5 }}
            style={{ top: '42%' }}
          />

          {/* Ambient glow behind logo */}
          <motion.div
            className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full pointer-events-none z-[1]"
            style={{
              background: 'radial-gradient(circle, rgba(220, 60, 20, 0.15) 0%, rgba(220, 60, 20, 0.05) 40%, transparent 70%)',
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.2, 1], opacity: [0, 0.8, 0.6] }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />

          {/* Logo */}
          <motion.div
            className="relative z-10"
            initial={{ scale: 0, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <motion.img
              src="assets/favicon.webp"
              alt="TechyMk"
              className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-full"
              animate={{
                boxShadow: [
                  '0 0 0px rgba(220, 60, 20, 0)',
                  '0 0 40px rgba(220, 60, 20, 0.3), 0 0 80px rgba(220, 60, 20, 0.1)',
                  '0 0 30px rgba(220, 60, 20, 0.2), 0 0 60px rgba(220, 60, 20, 0.08)',
                ],
              }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </motion.div>

          {/* Name — character reveal */}
          <div className="relative z-10 mt-6 sm:mt-8 overflow-hidden">
            <div className="flex items-center gap-[1px] sm:gap-[2px]">
              {nameChars.map((ch, i) => (
                <motion.span
                  key={i}
                  className="font-display text-[24px] sm:text-[32px] font-black tracking-[0.15em] text-white/90"
                  initial={{ y: 40, opacity: 0, filter: 'blur(8px)' }}
                  animate={phase >= 1 ? { y: 0, opacity: 1, filter: 'blur(0px)' } : {}}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Tagline */}
          <motion.p
            className="relative z-10 mt-2 sm:mt-3 text-white/20 text-[10px] sm:text-[12px] tracking-[0.3em] uppercase font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Designer & Developer
          </motion.p>

          {/* Progress bar */}
          <div className="absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 w-[120px] sm:w-[160px] z-10">
            <div className="h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress * 100}%`,
                  background: 'linear-gradient(90deg, rgba(220, 60, 20, 0.6), rgba(var(--c-accent), 0.8))',
                }}
              />
            </div>
            <motion.p
              className="text-center text-white/15 text-[9px] sm:text-[10px] mt-2 font-mono tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {Math.round(progress * 100)}%
            </motion.p>
          </div>

          {/* Corner accents */}
          <motion.div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-white/[0.06] z-10" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.5 }} />
          <motion.div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-white/[0.06] z-10" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.5 }} />
          <motion.div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-white/[0.06] z-10" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.5 }} />
          <motion.div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-white/[0.06] z-10" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.5 }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
