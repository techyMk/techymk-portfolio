import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Eye, Building2, Home, GitPullRequest, MessageSquare, Lightbulb } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const projects = [
  { id: 1, title: 'Embsys AI', subtitle: 'Visual Intelligence Platform', Icon: Eye, desc: 'Full website design & development for an agentic AI visual intelligence company — including brand identity, logo, and UI/UX.', tags: ['Web', 'UI/UX', 'Branding', 'AI'], gradient: 'from-violet-600 via-purple-500 to-fuchsia-500', featured: true, link: 'https://embsysai.com/', img: 'assets/embsys.webp' },
  { id: 3, title: 'Leoplast', subtitle: 'Plumbing Manufacturer', Icon: Building2, desc: 'Designing & developing a complete web presence for Tamil Nadu\'s premier plumbing manufacturer with 40 years of industry leadership.', tags: ['Web', 'UI/UX', 'Branding'], gradient: 'from-rose-500 via-pink-600 to-purple-600', featured: true, building: true },
  { id: 4, title: 'NestGenie', subtitle: 'AI Home Decor Generator', Icon: Home, desc: 'AI-powered home decor image generator — full-stack app with frontend and backend, creating custom interior designs from prompts.', tags: ['AI', 'React', 'Node.js', 'Full-Stack'], gradient: 'from-emerald-500 via-teal-600 to-cyan-600', link: 'https://nest-genie.vercel.app/', img: 'assets/nestgenie.webp' },
  { id: 5, title: 'Codexa AI Bot', subtitle: 'AI Code Reviewer', Icon: GitPullRequest, desc: 'GitHub App that auto-reviews every PR with AI — catches bugs, security issues, and bad patterns before merge, posting findings with concrete fix suggestions.', tags: ['AI', 'GitHub App', 'DevOps', 'Full-Stack'], gradient: 'from-amber-500 via-orange-500 to-red-500', link: 'https://codexa-ai-techymk.vercel.app/', img: 'assets/codexa.webp'},
  { id: 6, title: 'BrainDoc', subtitle: 'RAG Chatbot', Icon: MessageSquare, desc: 'RAG-based chatbot supporting multiple retrieval models — full-stack app with document ingestion, vector search, and contextual responses.', tags: ['AI', 'RAG', 'React', 'Full-Stack'], gradient: 'from-indigo-500 via-violet-600 to-purple-700', link: 'https://brain-doc-rag.vercel.app/', img: 'assets/braindoc.webp' },
  { id: 2, title: 'Hintsight', subtitle: 'Forecast Calibration Tracker', Icon: Lightbulb, desc: 'Log predictions with stated probabilities, mark them right or wrong on the resolution date, and measure your calibration over time — turning judgment into data.', tags: ['React', 'Forecasting', 'Analytics'], gradient: 'from-cyan-500 via-blue-600 to-indigo-600', link: 'https://hintsight.vercel.app/', img: 'assets/hintsight.webp' },
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

  const isFeatured = p.featured;

  return (
    <div ref={ref}>
      <ScrollReveal delay={index * 0.06}>
        <div
          ref={cardRef}
          onMouseMove={onMove}
          onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
          onMouseEnter={() => setHovered(true)}
          className={`rounded-[20px] relative ${isFeatured ? 'featured-border' : 'glow-border'}`}
          style={{
            transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
            transition: 'transform 0.25s ease-out',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            WebkitFontSmoothing: 'antialiased',
          }}
          data-hover
        >

          <div className="group relative aspect-[16/10] rounded-[20px]" style={{ clipPath: 'inset(0 round 20px)', WebkitClipPath: 'inset(0 round 20px)', transform: 'translateZ(0)' }}>
            {/* Screenshot — always rendered at full opacity, the BASE layer */}
            {p.img && (
              <motion.img
                src={p.img}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover object-top"
                style={{ scale: bgScale }}
                loading="lazy"
              />
            )}

            {/* COVER OVERLAY — single unit, fades out as one to reveal the screenshot underneath */}
            <div className={`absolute inset-0 transition-opacity ease-out ${p.img ? 'duration-[600ms] group-hover:opacity-0' : ''}`}>
              {/* Gradient background */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-90`}
                style={{ scale: bgScale }}
              />

              {/* Subtle dot pattern */}
              <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

              {/* Soft glow orbs */}
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/[0.08] blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-black/[0.15] blur-3xl pointer-events-none" />

              {/* Branded wordmark */}
              <div className="absolute inset-x-0 top-0 bottom-[44%] flex flex-col items-center justify-center px-4 pointer-events-none">
                <motion.div
                  className="flex flex-col items-center text-center"
                  animate={hovered && !p.img ? { scale: 1.04, y: -4 } : { scale: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {p.Icon && (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/[0.12] backdrop-blur-md border border-white/[0.18] flex items-center justify-center mb-3 sm:mb-4 shadow-lg shadow-black/10">
                      <p.Icon size={22} className="text-white/90" strokeWidth={1.8} />
                    </div>
                  )}
                  <h3 className="font-display text-white text-[28px] sm:text-[36px] md:text-[44px] font-black tracking-[-0.04em] leading-[0.95] drop-shadow-[0_2px_12px_rgba(0,0,0,0.15)]">
                    {p.title}
                  </h3>
                  {p.subtitle && (
                    <p className="text-white/60 text-[10px] sm:text-[11px] mt-1.5 sm:mt-2 tracking-[0.2em] uppercase font-semibold">
                      {p.subtitle}
                    </p>
                  )}
                </motion.div>
              </div>

              {/* Bottom dark gradient (for text readability) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 via-[55%] to-transparent" />

              {/* Tags + description */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 md:p-7">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {p.tags.map(t => (
                    <span key={t} className="px-2.5 py-1 rounded-full bg-white/[0.08] backdrop-blur-sm text-white/60 text-[10px] font-semibold uppercase tracking-wider">{t}</span>
                  ))}
                </div>
                <p className="text-white/55 text-[13px] leading-relaxed max-w-sm">{p.desc}</p>
              </div>
            </div>

            {/* Accent shimmer sweep for featured — sits above cover */}
            {isFeatured && (
              <motion.div
                className="absolute inset-0 pointer-events-none z-10"
                style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.08) 55%, transparent 60%)' }}
                animate={{ x: ['-120%', '120%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
              />
            )}

            {/* Shine on hover — sits above cover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(circle at ${(tilt.y / 5 + 0.5) * 100}% ${(-tilt.x / 5 + 0.5) * 100}%, rgba(255,255,255,0.1) 0%, transparent 50%)`, opacity: hovered ? 1 : 0, transition: 'opacity 0.3s' }}
            />

            {/* Client Project badge — always visible above everything */}
            {isFeatured && (
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 right-16 lg:right-auto z-20 flex flex-col lg:flex-row items-start lg:items-center gap-1.5 lg:gap-3">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.12] backdrop-blur-md border border-white/[0.15]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                  <span className="text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">Client Project</span>
                </div>
                {p.building && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/25">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
                    </span>
                    <span className="text-amber-200 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">In Progress</span>
                  </div>
                )}
              </div>
            )}

            {/* Arrow button / link */}
            {p.link ? (
              <a href={p.link} target="_blank" rel="noopener noreferrer" className={`absolute top-5 right-5 w-10 h-10 rounded-full bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] flex items-center justify-center text-white/50 transition-all duration-300 z-20 ${isFeatured ? 'opacity-100 scale-100 text-white hover:bg-white/[0.15]' : 'opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 group-hover:text-white'}`} data-hover>
                <ExternalLink size={15} />
              </a>
            ) : (
              <div className={`absolute top-5 right-5 w-10 h-10 rounded-full bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] flex items-center justify-center text-white/50 transition-all duration-300 ${isFeatured ? 'opacity-100 scale-100 text-white' : 'opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 group-hover:text-white'}`}>
                <ExternalLink size={15} />
              </div>
            )}

            {/* Full card click overlay for linked projects */}
            {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" aria-label={`Visit ${p.title}`} />}
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
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          {projects.map((p, i) => (
            <Card key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
