import { useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const symbols = [
  '</>','{ }','( )','//','&&','=>','::','[]',
  'fn','let','div','css','git','npm','jsx','sql',
  '< >','++','**','##','@','$','#','!',
  '0x','if','::','~','λ','Δ','∞','π',
];

function Particle({ symbol, i, mouseX, mouseY }) {
  // Random stable position
  const seed = useMemo(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 9 + Math.random() * 5,
    opacity: 0.04 + Math.random() * 0.06,
    dur: 15 + Math.random() * 25,
    delay: Math.random() * 10,
    driftX: -30 + Math.random() * 60,
    driftY: -30 + Math.random() * 60,
  }), []);

  // Cursor repulsion — particles gently push away from cursor
  const px = useTransform(mouseX, [-0.5, 0.5], [seed.driftX * 0.3, -seed.driftX * 0.3]);
  const py = useTransform(mouseY, [-0.5, 0.5], [seed.driftY * 0.3, -seed.driftY * 0.3]);

  return (
    <motion.span
      className="absolute pointer-events-none select-none font-mono text-content-primary"
      style={{
        left: `${seed.x}%`,
        top: `${seed.y}%`,
        fontSize: seed.size,
        opacity: seed.opacity,
        x: px,
        y: py,
      }}
      animate={{
        y: [0, seed.driftY, 0],
        x: [0, seed.driftX * 0.5, 0],
        rotate: [0, 360],
      }}
      transition={{
        duration: seed.dur,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: seed.delay,
      }}
    >
      {symbol}
    </motion.span>
  );
}

export default function FloatingTech() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 20, damping: 15 });
  const smoothY = useSpring(mouseY, { stiffness: 20, damping: 15 });

  useEffect(() => {
    const fn = (e) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, [mouseX, mouseY]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Reduce particle count on mobile for performance
  const particles = useMemo(() => {
    const count = isMobile ? 10 : 28;
    const picked = [];
    for (let i = 0; i < count; i++) {
      picked.push(symbols[i % symbols.length]);
    }
    return picked;
  }, [isMobile]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
      {particles.map((s, i) => (
        <Particle key={i} symbol={s} i={i} mouseX={smoothX} mouseY={smoothY} />
      ))}
    </div>
  );
}
