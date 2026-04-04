import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Scroll-linked reveal with blur + scale + y + opacity.
 * Elements smoothly materialize as you scroll — no binary pop-in.
 *
 * @param {string} direction - 'up' | 'down' | 'left' | 'right'
 * @param {number} offset - distance in px
 * @param {boolean} blur - enable blur-in
 * @param {boolean} scale - enable scale-in
 * @param {number} delay - stagger delay (0-1 range, portion of scroll range)
 */
export default function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  offset = 60,
  blur = true,
  scale: enableScale = false,
  delay = 0,
  once = true,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.92', 'start 0.4'],
  });

  const start = delay;
  const end = Math.min(start + 0.7, 1);

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  const yMap = direction === 'up' ? [offset, 0] : direction === 'down' ? [-offset, 0] : [0, 0];
  const xMap = direction === 'left' ? [offset, 0] : direction === 'right' ? [-offset, 0] : [0, 0];

  const y = useTransform(scrollYProgress, [start, end], yMap);
  const x = useTransform(scrollYProgress, [start, end], xMap);
  const filter = useTransform(scrollYProgress, [start, end], blur ? ['blur(8px)', 'blur(0px)'] : ['blur(0px)', 'blur(0px)']);
  const scaleVal = useTransform(scrollYProgress, [start, end], enableScale ? [0.92, 1] : [1, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, x, filter, scale: scaleVal, willChange: 'transform, opacity, filter' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger container — delays children based on index.
 */
export function StaggerReveal({ children, className = '', stagger = 0.08 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.92', 'start 0.3'],
  });

  const total = Array.isArray(children) ? children.length : 1;
  const items = Array.isArray(children) ? children : [children];

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => {
        const start = i * stagger;
        const end = Math.min(start + 0.5, 1);
        return (
          <ScrollRevealItem key={i} progress={scrollYProgress} start={start} end={end}>
            {child}
          </ScrollRevealItem>
        );
      })}
    </div>
  );
}

function ScrollRevealItem({ children, progress, start, end }) {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [40, 0]);
  const filter = useTransform(progress, [start, end], ['blur(6px)', 'blur(0px)']);

  return (
    <motion.div style={{ opacity, y, filter, willChange: 'transform, opacity, filter' }}>
      {children}
    </motion.div>
  );
}
