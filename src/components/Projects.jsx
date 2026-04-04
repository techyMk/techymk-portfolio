import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const projects = [
  { id: 1, title: 'GemAI', desc: 'A Gemini AI clone — conversational AI interface with streaming responses.', tags: ['React', 'API', 'AI'], gradient: 'from-violet-600 via-purple-500 to-fuchsia-500' },
  { id: 2, title: 'Zecure', desc: 'Advanced password generator with strength analysis and clipboard integration.', tags: ['JavaScript', 'Security'], gradient: 'from-cyan-500 via-blue-600 to-indigo-600' },
  { id: 3, title: 'Pixo', desc: 'Browser-based image editor with filters, cropping, and export capabilities.', tags: ['Canvas', 'CSS', 'JS'], gradient: 'from-rose-500 via-pink-600 to-purple-600' },
  { id: 4, title: 'LexiFlow', desc: 'Dictionary app with pronunciation, definitions, and smart search.', tags: ['React', 'API'], gradient: 'from-emerald-500 via-teal-600 to-cyan-600' },
  { id: 5, title: 'Comprez', desc: 'File compressor tool — compress images and files right in the browser.', tags: ['JavaScript', 'Web APIs'], gradient: 'from-amber-500 via-orange-500 to-red-500' },
  { id: 6, title: 'Narrato', desc: 'AI-powered story generator creating unique narratives from prompts.', tags: ['AI', 'React', 'API'], gradient: 'from-indigo-500 via-violet-600 to-purple-700' },
];

function Card({ p, index }) {
  const ref = useRef(null);
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15]);

  const onMove = (e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -5, y: ((e.clientX - r.left) / r.width - 0.5) * 5 });
  };

  return (
    <div ref={ref}>
      <ScrollReveal delay={index * 0.06}>
        <div
          ref={cardRef}
          onMouseMove={onMove}
          onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
          onMouseEnter={() => setHovered(true)}
          className="glow-border rounded-[20px]"
          style={{ transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: 'transform 0.25s ease-out' }}
          data-hover
        >
          <div className="group relative aspect-[16/10] rounded-[20px] overflow-hidden">
            {/* Gradient bg */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-700`}
              style={{ scale: bgScale }}
            />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            {/* Large title watermark */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <motion.span
                className="font-display text-white/[0.07] text-[48px] sm:text-[80px] md:text-[110px] font-bold tracking-[-0.04em] select-none whitespace-nowrap"
                animate={hovered ? { scale: 1.05, y: -5 } : { scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {p.title}
              </motion.span>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-6 left-6 w-12 h-12 rounded-full border border-white/[0.08]" />
            <div className="absolute top-[30%] right-[12%] w-3 h-3 rounded-full bg-white/[0.06]" />
            <div className="absolute bottom-[35%] left-[8%] w-20 h-[1px] bg-white/[0.06] rotate-[-30deg]" />

            {/* Bottom gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

            {/* Shine on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(circle at ${(tilt.y / 5 + 0.5) * 100}% ${(-tilt.x / 5 + 0.5) * 100}%, rgba(255,255,255,0.1) 0%, transparent 50%)`, opacity: hovered ? 1 : 0, transition: 'opacity 0.3s' }}
            />

            {/* Content */}
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 md:p-7">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {p.tags.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-full bg-white/[0.08] backdrop-blur-sm text-white/60 text-[10px] font-semibold uppercase tracking-wider group-hover:bg-white/[0.12] group-hover:text-white/80 transition-all duration-300">{t}</span>
                ))}
              </div>
              <h3 className="font-display text-white text-[20px] md:text-[24px] font-bold tracking-[-0.02em] leading-tight mb-1">{p.title}</h3>
              <p className="text-white/35 text-[13px] leading-relaxed max-w-sm group-hover:text-white/55 transition-colors duration-500">{p.desc}</p>
            </div>

            {/* Arrow button */}
            <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] flex items-center justify-center text-white/50 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 group-hover:text-white transition-all duration-300">
              <ExternalLink size={15} />
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="max-w-content mx-auto">
        <ScrollReveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 sm:mb-14 md:mb-16">
          <div>
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-accent/10 text-accent text-[11px] font-bold uppercase tracking-[0.18em] mb-4 sm:mb-6">Selected Work</span>
            <h2 className="font-display text-[28px] sm:text-[36px] md:text-[52px] font-bold leading-[1.05] tracking-[-0.04em]">
              <span className="text-content-primary">Featured </span><span className="text-gradient">projects</span>
            </h2>
          </div>
          <a href="#projects" className="inline-flex items-center gap-2 text-accent text-[14px] font-semibold group" data-hover>
            View all 20+ <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {projects.map((p, i) => (
            <Card key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
