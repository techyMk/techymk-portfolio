import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, animate } from 'framer-motion';

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/techymk', icon: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label: 'GitHub', href: 'https://github.com/techyMk', icon: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> },
  { label: 'X', href: 'https://x.com/TechyMk', icon: <svg className="w-[16px] h-[16px]" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { label: 'Instagram', href: 'https://www.instagram.com/techymk.dev/', icon: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
];

/* ═══════════════════════════════════════════════════
   DRAGGABLE LETTER — each letter is independently
   draggable with spring-back + magnetic hover
   ═══════════════════════════════════════════════════ */
function DragLetter({ ch, index, inView, isGradient, onFling, onDragActivity, resetSignal }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [dragging, setDragging] = useState(false);
  const [flung, setFlung] = useState(false);

  // Reset to origin when parent fires resetSignal — animate smoothly back
  useEffect(() => {
    if (resetSignal > 0) {
      animate(x, 0, { type: 'spring', stiffness: 280, damping: 22 });
      animate(y, 0, { type: 'spring', stiffness: 280, damping: 22 });
      setFlung(false);
    }
  }, [resetSignal, x, y]);

  const handleDragStart = () => {
    setDragging(true);
    setFlung(false);
    onDragActivity?.();
  };

  const handleDragEnd = (_, info) => {
    setDragging(false);
    onDragActivity?.();
    const speed = Math.sqrt(info.velocity.x ** 2 + info.velocity.y ** 2);

    if (speed > 500) {
      // Fling — letter flies out with spring, stays there
      setFlung(true);
      onFling?.(index);
      const angle = Math.atan2(info.velocity.y, info.velocity.x);
      const dist = Math.min(speed * 0.3, 300);
      animate(x, Math.cos(angle) * dist, { type: 'spring', stiffness: 220, damping: 18 });
      animate(y, Math.sin(angle) * dist, { type: 'spring', stiffness: 220, damping: 18 });
    }
    // Otherwise: letter stays where it was dropped
  };

  return (
    <motion.span
      className={`font-display font-black uppercase leading-[0.92] tracking-[-0.04em] text-[clamp(38px,9.5vw,110px)] inline-block cursor-grab active:cursor-grabbing touch-none select-none ${
        isGradient ? 'text-gradient' : 'text-content-primary'
      }`}
      style={{ x, y }}
      initial={{ opacity: 0, filter: 'blur(12px)' }}
      animate={inView ? {
        opacity: 1, filter: 'blur(0px)',
        scale: flung ? [1, 0.6, 1] : 1,
      } : {}}
      transition={{
        opacity: { duration: 0.4, delay: index * 0.03 + 0.15 },
        filter: { duration: 0.4, delay: index * 0.03 + 0.15 },
        scale: { duration: 0.5 },
      }}
      drag
      dragMomentum={false}
      dragElastic={0.15}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      whileHover={!dragging ? { scale: 1.15, transition: { type: 'spring', stiffness: 400 } } : undefined}
      data-hover
    >
      {ch === ' ' ? '\u00A0' : ch}
    </motion.span>
  );
}

/* ═══════════════════════════════════════════════════
   INTERACTIVE HEADING — "LET'S CREATE."
   per-letter drag with fling sparks + click to explode all
   ═══════════════════════════════════════════════════ */
const HEADINGS = ["LET'S TALK.", "LET'S BUILD.", "LET'S CONNECT."];

function InteractiveHeading({ inView }) {
  const [headingIdx, setHeadingIdx] = useState(0);
  const currentHeading = HEADINGS[headingIdx];
  const chars = useMemo(() => currentHeading.split(''), [currentHeading]);
  const gradientStart = 6; // "LET'S " is always 6 chars, the action word gets the gradient
  const [sparks, setSparks] = useState([]);
  const containerRef = useRef(null);

  // Reset signal — incremented to tell all letters to snap back
  const [resetSignal, setResetSignal] = useState(0);
  const resetTimerRef = useRef(null);

  // Called by any letter on drag start or end — restarts the 5s idle timer
  const handleDragActivity = useCallback(() => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => {
      setResetSignal((s) => s + 1);
    }, 5000);
  }, []);

  useEffect(() => {
    return () => { if (resetTimerRef.current) clearTimeout(resetTimerRef.current); };
  }, []);

  // Explode all on double-click → cycle to next heading
  const [exploded, setExploded] = useState(false);
  const [explodeOffsets, setExplodeOffsets] = useState(null);
  const [burstKey, setBurstKey] = useState(0);
  const [burstPos, setBurstPos] = useState({ x: 0, y: 0 });

  const handleDoubleClick = useCallback((e) => {
    if (exploded) return;
    // Get click position relative to container
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setBurstPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
    const isMobile = window.innerWidth < 768;
    const range = isMobile ? 160 : 500;
    const rangeY = isMobile ? 140 : 300;
    const offsets = chars.map(() => ({
      x: (Math.random() - 0.5) * range,
      y: (Math.random() - 0.5) * rangeY,
      r: (Math.random() - 0.5) * 400,
    }));
    setExplodeOffsets(offsets);
    setExploded(true);
    setBurstKey((k) => k + 1);
    // After explosion fades, switch to next heading
    setTimeout(() => {
      setHeadingIdx((idx) => (idx + 1) % HEADINGS.length);
      setExplodeOffsets(null);
      setExploded(false);
      setResetSignal((s) => s + 1);
    }, 1800);
  }, [exploded, chars]);

  // Spark burst when a letter is flung
  const handleFling = useCallback((idx) => {
    const el = containerRef.current?.children[0]?.children[idx];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cRect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2 - cRect.left;
    const cy = rect.top + rect.height / 2 - cRect.top;
    const count = 10;
    const newSparks = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      cx, cy,
      angle: (Math.PI * 2 * i) / count + Math.random() * 0.5,
      dist: 40 + Math.random() * 80,
      size: 3 + Math.random() * 5,
    }));
    setSparks((prev) => [...prev, ...newSparks]);
    setTimeout(() => setSparks((prev) => prev.filter((s) => !newSparks.includes(s))), 700);
  }, []);

  return (
    <div ref={containerRef} className="relative mb-3 sm:mb-5 py-2" onDoubleClick={handleDoubleClick}>
      {/* Explosion effects (ring + sparks) — clipped to container so they can't overflow viewport */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence>
          {exploded && (
            <>
              <motion.div
                key={`ring-${burstKey}`}
                className="absolute rounded-full border-2 border-accent/40"
                style={{ left: burstPos.x, top: burstPos.y, translateX: '-50%', translateY: '-50%' }}
                initial={{ width: 0, height: 0, opacity: 0.8 }}
                animate={{ width: 800, height: 800, opacity: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              />
              {Array.from({ length: 18 }).map((_, i) => {
                const angle = (Math.PI * 2 * i) / 18;
                const dist = 100 + Math.random() * 140;
                return (
                  <motion.div
                    key={`boom-${burstKey}-${i}`}
                    className="absolute rounded-full"
                    style={{ left: burstPos.x, top: burstPos.y, width: 3 + Math.random() * 6, height: 3 + Math.random() * 6, backgroundColor: `rgba(var(--c-accent), ${0.4 + Math.random() * 0.6})` }}
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, opacity: 0, scale: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                );
              })}
            </>
          )}
        </AnimatePresence>

        {/* Fling sparks */}
        <AnimatePresence>
          {sparks.map((s) => (
            <motion.div
              key={s.id}
              className="absolute rounded-full"
              style={{ left: s.cx, top: s.cy, width: s.size, height: s.size, backgroundColor: 'rgba(var(--c-accent), 0.7)' }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: Math.cos(s.angle) * s.dist, y: Math.sin(s.angle) * s.dist, opacity: 0, scale: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Letters */}
      <div className="flex flex-wrap items-baseline">
        {chars.map((ch, i) => {
          // Space → fixed gap, not draggable
          if (ch === ' ') {
            return <span key={`${headingIdx}-sp-${i}`} className="w-[0.25em] font-display text-[clamp(38px,9.5vw,110px)]" />;
          }
          const off = explodeOffsets?.[i];
          if (off) {
            return (
              <motion.span
                key={i}
                className={`font-display font-black uppercase leading-[0.92] tracking-[-0.04em] text-[clamp(38px,9.5vw,110px)] inline-block select-none ${
                  i >= gradientStart ? 'text-gradient' : 'text-content-primary'
                }`}
                animate={{ x: [0, off.x], y: [0, off.y], rotate: [0, off.r], opacity: [1, 0], scale: [1, 0.4], filter: ['blur(0px)', 'blur(6px)'] }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: i * 0.02 }}
              >
                {ch}
              </motion.span>
            );
          }
          return (
            <DragLetter
              key={`${headingIdx}-${i}`}
              ch={ch}
              index={i}
              inView={inView}
              isGradient={i >= gradientStart}
              onFling={handleFling}
              onDragActivity={handleDragActivity}
              resetSignal={resetSignal}
            />
          );
        })}
      </div>

      <motion.p
        className="text-content-muted text-[10px] sm:text-[11px] mt-3 tracking-wide flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.4 }}
      >
        <motion.span
          className="inline-flex items-center gap-1 text-content-muted/60"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM7.5 14.25A5.25 5.25 0 1117.25 10.5" />
          </svg>
        </motion.span>
        drag letters &middot; double-click to explode
      </motion.p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   INTERACTIVE TERMINAL — no effect-based typing for boot
   ═══════════════════════════════════════════════════ */
const SURPRISES = [
  'Fun fact: I once debugged a production issue at 3 AM\nwith nothing but console.log and determination.',
  "01001000 01101001 = 'Hi' in binary!\nNow we speak two languages.",
  'My design philosophy:\n  -> Less is more\n  -> Every pixel matters\n  -> Users come first',
  "Pro tip: Ctrl+Z doesn't work in real life.\nBelieve me, I've tried.",
  'Currently powered by:\n  -> Curiosity\n  -> Chai\n  -> Clean code',
  '"Make it work, make it right, make it fast."\n  -- Kent Beck',
  'If debugging is removing bugs,\nthen programming is putting them in.\n  -- Edsger Dijkstra',
];

const SKILLS = `  react/       javascript/   figma/       python/
  next.js/     typescript/   tailwind/    java/
  mongodb/     django/       git/         c++/
  postgresql/  netlify/`;

const CHIPS = ['hire-me', 'view-work', 'ls', 'surprise', 'help'];

const BOOT_LINES = [
  { style: 'system', text: 'Initializing...' },
  { style: 'system', text: "Welcome to Manikandan's terminal." },
  { style: 'system', text: 'Type a command or pick one below.' },
];

function Terminal({ inView }) {
  const [lines, setLines] = useState([]);
  const [bootPhase, setBootPhase] = useState(0); // 0=waiting, 1,2,3=boot lines, 4=ready
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [copied, setCopied] = useState(false);
  const [glowPulse, setGlowPulse] = useState(false);
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const surpriseIdx = useRef(-1);
  const usedSurprises = useRef([]);
  const cancelRef = useRef(0);

  const scroll = useCallback(() => {
    requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    });
  }, []);

  const addLine = useCallback((line) => {
    setLines((prev) => [...prev, { ...line, key: line.key || `l-${Date.now()}-${Math.random()}` }]);
    scroll();
  }, [scroll]);

  // Boot sequence — no typing animation, just staggered line reveals
  useEffect(() => {
    if (!inView || bootPhase !== 0) return;
    setBootPhase(1);
    const timers = [];
    BOOT_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => {
        addLine({ ...line, key: `boot-${i}` });
        if (i === BOOT_LINES.length - 1) {
          setTimeout(() => { setShowInput(true); setBootPhase(4); scroll(); }, 300);
        }
      }, 500 + i * 500));
    });
    return () => timers.forEach(clearTimeout);
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  // Typing animation for command responses
  function TypedLine({ text, style, onDone }) {
    const [n, setN] = useState(0);
    const called = useRef(false);

    useEffect(() => {
      if (n >= text.length) {
        if (!called.current) { called.current = true; onDone?.(); }
        return;
      }
      const t = setTimeout(() => setN((c) => c + 1), text.length > 50 ? 14 : 22);
      return () => clearTimeout(t);
    }, [n, text]); // eslint-disable-line react-hooks/exhaustive-deps

    const cls = style === 'system' ? 'text-accent' : style === 'error' ? 'text-red-400' : 'text-content-secondary';
    return (
      <p className={`text-[12px] sm:text-[13px] whitespace-pre-wrap ${cls}`}>
        {text.slice(0, n)}
        <span className="animate-pulse ml-px text-accent">|</span>
      </p>
    );
  }

  const typeAndAdd = useCallback((line) => {
    return new Promise((resolve) => {
      setBusy(true);
      setLines((prev) => [...prev, { ...line, _typing: true, _resolve: resolve, key: `t-${Date.now()}` }]);
      scroll();
    });
  }, [scroll]);

  const handleTypeDone = useCallback((lineKey) => {
    setLines((prev) => prev.map((l) => {
      if (l.key === lineKey && l._typing) {
        l._resolve?.();
        return { ...l, _typing: false, _resolve: undefined };
      }
      return l;
    }));
    setBusy(false);
    scroll();
  }, [scroll]);

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  const executeCommand = useCallback(async (cmd) => {
    const t = cmd.trim().toLowerCase();
    if (!t || busy) return;
    const id = ++cancelRef.current;

    setShowInput(false);
    setInputValue('');
    addLine({ style: 'input', text: `$ ${t}` });
    await wait(150);
    if (cancelRef.current !== id) return;

    switch (t) {
      case 'hire-me':
      case 'hire': {
        await typeAndAdd({ style: 'response', text: "Great choice! Let's build something amazing." });
        if (cancelRef.current !== id) return;
        await wait(200);
        addLine({ style: 'email', text: 'techymk.dev@gmail.com' });
        setGlowPulse(true);
        setTimeout(() => setGlowPulse(false), 1500);
        break;
      }
      case 'view-work':
      case 'work':
      case 'projects':
        await typeAndAdd({ style: 'response', text: 'Scrolling to my best work...' });
        setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 500);
        break;

      case 'ls':
      case 'skills':
        addLine({ style: 'muted', text: 'skills/' });
        await wait(80);
        addLine({ style: 'code', text: SKILLS });
        break;

      case 'surprise':
      case 'random': {
        // Reset pool when all have been shown
        if (usedSurprises.current.length >= SURPRISES.length) usedSurprises.current = [];
        const remaining = SURPRISES.map((_, i) => i).filter((i) => !usedSurprises.current.includes(i));
        const randIdx = remaining[Math.floor(Math.random() * remaining.length)];
        usedSurprises.current.push(randIdx);
        surpriseIdx.current = randIdx;
        const s = SURPRISES[randIdx];
        await typeAndAdd({ style: 'response', text: s });
        break;
      }
      case 'coffee':
      case 'buy-coffee':
        await typeAndAdd({ style: 'response', text: 'Coffee fuels great code!' });
        if (cancelRef.current !== id) return;
        await wait(150);
        addLine({ style: 'link', text: 'buymeacoffee.com/techymk', href: 'https://buymeacoffee.com/techymk' });
        break;

      case 'clear':
        setLines([]);
        addLine({ style: 'system', text: 'Terminal cleared.' });
        break;

      case 'help':
        addLine({ style: 'muted', text: 'Available commands:' });
        addLine({
          style: 'code',
          text: '  hire-me     Get in touch for projects\n  view-work   See my portfolio\n  ls          List my tech stack\n  surprise    Something fun\n  coffee      Buy me a coffee\n  clear       Clear terminal\n  help        Show this message',
        });
        break;

      default:
        addLine({ style: 'error', text: `command not found: ${t}` });
        await wait(60);
        addLine({ style: 'muted', text: 'try: hire-me, view-work, ls, surprise, help' });
        break;
    }

    if (cancelRef.current !== id) return;
    await wait(200);
    setShowInput(true);
    setBusy(false);
    scroll();
  }, [busy, addLine, typeAndAdd, scroll]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText('techymk.dev@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') executeCommand(inputValue);
  }, [inputValue, executeCommand]);

  useEffect(() => {
    if (showInput && inputRef.current) inputRef.current.focus();
  }, [showInput]);

  const renderLine = (line) => {
    const base = 'text-[12px] sm:text-[13px]';

    // Typing animation line
    if (line._typing) {
      return <TypedLine text={line.text} style={line.style} onDone={() => handleTypeDone(line.key)} />;
    }

    switch (line.style) {
      case 'system':
        return <p className={`${base} text-accent`}>{line.text}</p>;
      case 'input':
        return <p className={`${base} text-content-primary font-semibold`}>{line.text}</p>;
      case 'response':
        return <p className={`${base} text-content-secondary whitespace-pre-wrap`}>{line.text}</p>;
      case 'error':
        return <p className={`${base} text-red-400`}>{line.text}</p>;
      case 'muted':
        return <p className={`${base} text-content-muted`}>{line.text}</p>;
      case 'code':
        return <pre className="text-[10px] sm:text-[12px] text-content-muted whitespace-pre leading-relaxed">{line.text}</pre>;
      case 'email':
        return (
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 my-2 p-3 sm:p-4 rounded-xl border border-accent/20 bg-accent/[0.04]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-accent font-semibold text-[13px] sm:text-[15px]">{line.text}</span>
            <div className="flex gap-2">
              <button onClick={handleCopy} className="px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-[11px] font-semibold hover:bg-accent/20 transition-colors" data-hover>
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <a href="#contact" className="px-3 py-1.5 rounded-lg bg-accent text-white text-[11px] font-semibold hover:bg-accent-hover transition-colors" data-hover>
                Contact form
              </a>
            </div>
          </motion.div>
        );
      case 'link':
        return (
          <motion.a href={line.href} target="_blank" rel="noopener noreferrer" className={`${base} inline-flex items-center gap-1.5 my-1 text-accent font-semibold hover:underline`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} data-hover>
            {line.text} <span className="text-[10px]">-&gt;</span>
          </motion.a>
        );
      default:
        return <p className={`${base} text-content-secondary`}>{line.text}</p>;
    }
  };

  return (
    <motion.div
      className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-border/30 mt-6 sm:mt-10"
      style={{
        background: 'rgba(var(--c-bg-card), 0.4)',
        backdropFilter: 'blur(24px)',
        boxShadow: glowPulse ? '0 0 50px rgba(var(--c-accent), 0.12), 0 0 100px rgba(var(--c-accent), 0.06)' : 'none',
        transition: 'box-shadow 0.5s ease',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none z-20 opacity-[0.012]"
        style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(var(--c-text-primary), 0.5) 2px, rgba(var(--c-text-primary), 0.5) 4px)' }}
      />

      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 sm:py-3 border-b border-border/20 bg-bg-elevated/30">
        <div className="flex items-center gap-1.5">
          <div className="w-[10px] h-[10px] sm:w-3 sm:h-3 rounded-full bg-[#FF5F57]/80" />
          <div className="w-[10px] h-[10px] sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E]/80" />
          <div className="w-[10px] h-[10px] sm:w-3 sm:h-3 rounded-full bg-[#28CA42]/80" />
        </div>
        <span className="text-content-muted text-[11px] sm:text-[12px] ml-2 font-mono tracking-wide">~/manikandan</span>
      </div>

      {/* Body */}
      <div ref={scrollRef} className="p-4 sm:p-5 md:p-6 font-mono min-h-[200px] sm:min-h-[240px] max-h-[350px] sm:max-h-[420px] overflow-y-auto space-y-1.5 relative z-10 scroll-smooth">
        {lines.map((line) => (
          <motion.div key={line.key} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.15 }}>
            {renderLine(line)}
          </motion.div>
        ))}

        {showInput && !busy && (
          <motion.div className="flex items-center gap-2 mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            <span className="text-accent text-[12px] sm:text-[13px] font-bold select-none">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-content-primary text-[12px] sm:text-[13px] caret-accent placeholder:text-content-muted/30"
              placeholder="type a command..."
              autoComplete="off"
              spellCheck={false}
            />
            <span className="animate-pulse text-accent text-sm leading-none">|</span>
          </motion.div>
        )}
      </div>

      {/* Command chips */}
      <AnimatePresence>
        {showInput && !busy && (
          <motion.div
            className="px-4 sm:px-5 md:px-6 pb-3.5 sm:pb-4 flex flex-wrap gap-1.5 sm:gap-2 relative z-10"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25, delay: 0.08 }}
          >
            {CHIPS.map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="px-2.5 sm:px-3.5 py-1.5 rounded-lg border border-border/50 text-content-muted text-[10px] sm:text-[11px] font-semibold tracking-wide hover:border-accent/30 hover:text-accent hover:bg-accent/[0.04] transition-all duration-200"
                data-hover
              >
                {cmd}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════ */
export default function Footer() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <footer className="relative z-[1] px-4 sm:px-6 pb-6 pt-4">
      <div className="max-w-content mx-auto">
        <div ref={sectionRef} className="py-10 sm:py-16 md:py-24 border-t border-border/30">
          <motion.p
            className="text-content-muted text-[11px] sm:text-[12px] uppercase tracking-[0.25em] font-semibold mb-3 sm:mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.05 }}
          >
            Ready to start?
          </motion.p>

          <InteractiveHeading inView={inView} />

          <motion.p
            className="text-content-secondary text-[13px] sm:text-[15px] max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
          >
            Drop a command in the terminal below. I'm always up for building something great.
          </motion.p>

          <Terminal inView={inView} />
        </div>

        {/* Socials + branding */}
        <div className="border-t border-border/30 py-6 sm:py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="flex items-center gap-3">
              <img src="assets/favicon.webp" alt="TechyMk" className="w-9 h-9 rounded-full object-cover" />
              <div>
                <p className="text-content-primary text-[15px] font-display font-bold">Manikandan</p>
                <p className="text-content-muted text-[12px]">Designer & Frontend Developer</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-bg-elevated border border-border flex items-center justify-center text-content-muted hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all duration-300" whileHover={{ y: -4, scale: 1.08 }} whileTap={{ scale: 0.95 }} aria-label={s.label} data-hover>
                  {s.icon}
                </motion.a>
              ))}
            </div>
            <div className="flex flex-col items-center md:items-end gap-2">
              <p className="text-content-muted text-[12px] uppercase tracking-[0.2em] font-semibold">Love My Works?</p>
              <motion.a href="https://buymeacoffee.com/techymk" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-full bg-accent/10 text-accent text-[13px] font-semibold hover:bg-accent/20 transition-colors" whileHover={{ scale: 1.05 }} data-hover>
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
