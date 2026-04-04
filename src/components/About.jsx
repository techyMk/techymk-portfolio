import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Download } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

function Counter({ target, suffix = '' }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const dur = 2000, start = performance.now();
    const step = (now) => { const p = Math.min((now - start) / dur, 1); setN(Math.floor((1 - Math.pow(1 - p, 4)) * target)); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }, [inView, target]);
  return <span ref={ref}>{n}{suffix}</span>;
}

const stats = [
  { val: 20, suf: '+', label: 'Projects' },
  { val: 14, suf: '+', label: 'Technologies' },
  { val: 100, suf: '%', label: 'Passion' },
];

const skills = [
  { name: 'React', color: '#61DAFB', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Next.js', color: 'var(--nextjs-color)', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
  { name: 'TypeScript', color: '#3178C6', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'JavaScript', color: '#F7DF1E', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'Tailwind', color: '#06B6D4', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Python', color: '#3776AB', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'Java', color: '#ED8B00', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'C++', color: '#00599C', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
  { name: 'MongoDB', color: '#47A248', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
  { name: 'Django', color: '#092E20', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg' },
  { name: 'Figma', color: '#F24E1E', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
  { name: 'Git', color: '#F05032', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { name: 'PostgreSQL', color: '#336791', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
  { name: 'Netlify', color: '#00C7B7', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/netlify/netlify-original.svg' },
];

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-accent/10 text-accent text-[11px] font-bold uppercase tracking-[0.18em] mb-10">About</span>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-14 lg:gap-20 items-start">
          {/* Left — Info */}
          <div>
            <ScrollReveal>
              <h2 className="font-display text-content-primary text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-[-0.035em] mb-7">
                Passionate about creating <span className="text-gradient">digital experiences</span> that matter
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <div className="space-y-4 text-content-secondary text-[15px] leading-[1.8] mb-8">
                <p>I'm Manikandan — a designer and frontend developer who thrives at the intersection of creativity and code. I specialize in building beautiful, responsive websites and solving complex problems with clean, efficient solutions.</p>
                <p>With expertise in UI/UX design using Figma, Photoshop, and Canva, combined with strong frontend skills in React and modern JavaScript, I deliver experiences that are both visually stunning and technically robust.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <div className="flex flex-wrap gap-3 mb-10">
                <a href="#contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white text-[13px] font-semibold hover:bg-accent-hover transition-colors shadow-lg shadow-accent/15" data-hover>
                  Hire Me <ArrowUpRight size={14} />
                </a>
                <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-content-muted text-[13px] hover:text-accent hover:border-accent/30 transition-all" data-hover>
                  <Download size={14} /> Download CV
                </a>
              </div>
            </ScrollReveal>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((s, i) => (
                <ScrollReveal key={s.label} delay={0.16 + i * 0.05}>
                  <div className="glass glow-border rounded-2xl p-4 text-center">
                    <div className="font-display text-content-primary text-[28px] md:text-[34px] font-bold leading-none tracking-[-0.03em] mb-1"><Counter target={s.val} suffix={s.suf} /></div>
                    <p className="text-content-muted text-[11px] font-medium uppercase tracking-wider">{s.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Right — Skills grid */}
          <ScrollReveal delay={0.1} direction="right">
            <div className="glass glow-border rounded-[24px] p-7 md:p-9">
              <div className="flex items-center justify-between mb-7">
                <p className="text-content-muted text-[11px] uppercase tracking-[0.18em] font-bold">Tech Stack</p>
                <p className="text-content-muted text-[11px]">{skills.length} technologies</p>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="relative rounded-xl p-4 text-center border border-border/50 bg-bg-elevated/50 hover:border-border-hover transition-all duration-300 group overflow-hidden"
                    whileHover={{ y: -4, scale: 1.03 }}
                    data-hover
                  >
                    {/* Colored glow on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 50%, ${skill.color}10 0%, transparent 70%)` }} />
                    {/* Icon */}
                    <img src={skill.img} alt={skill.name} className="w-7 h-7 mx-auto mb-2 transition-transform duration-300 group-hover:scale-110" loading="lazy" />
                    {/* Name */}
                    <p className="text-content-primary text-[12px] font-semibold group-hover:text-black dark:group-hover:text-white transition-colors duration-300 relative z-10">{skill.name}</p>
                    {/* Color bar at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: skill.color }} />
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
