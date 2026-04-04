import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Cursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [moving, setMoving] = useState(false);
  const hasMoved = useRef(false);
  const idleTimer = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const move = (e) => {
      if (!hasMoved.current) { hasMoved.current = true; setVisible(true); }
      setPos({ x: e.clientX, y: e.clientY });
      setMoving(true);

      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setMoving(false), 400);
    };
    const over = (e) => {
      if (e.target.closest('a, button, [data-hover], input, textarea, select')) setHovering(true);
    };
    const out = (e) => {
      if (e.target.closest('a, button, [data-hover], input, textarea, select')) setHovering(false);
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
      clearTimeout(idleTimer.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-[5px] h-[5px] rounded-full bg-white mix-blend-difference pointer-events-none z-[9998]"
        animate={{ x: pos.x - 2.5, y: pos.y - 2.5 }}
        transition={{ type: 'tween', duration: 0 }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 w-[28px] h-[28px] rounded-full border border-white/60 mix-blend-difference pointer-events-none z-[9998]"
        animate={{
          x: pos.x - 14,
          y: pos.y - 14,
          scale: hovering ? 1.6 : 1,
          opacity: moving ? (hovering ? 0.4 : 0.8) : 0,
        }}
        transition={{
          x: { type: 'spring', stiffness: 250, damping: 25, mass: 0.12 },
          y: { type: 'spring', stiffness: 250, damping: 25, mass: 0.12 },
          scale: { duration: 0.2 },
          opacity: { duration: 0.4 },
        }}
      />
    </>
  );
}
