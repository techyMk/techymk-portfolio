import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Brain } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const services = [
  { icon: Code2, title: 'Web Development', desc: 'Building responsive, high-performance websites with clean code and modern frameworks like React.', tags: ['React', 'JavaScript', 'HTML/CSS', 'Responsive'] },
  { icon: Palette, title: 'UI/UX Design', desc: 'Crafting intuitive, user-friendly interfaces with wireframing, prototyping, and polished layouts.', tags: ['Figma', 'Wireframing', 'Prototyping', 'Layouts'] },
  { icon: Brain, title: 'Problem Solving', desc: 'Tackling challenges with analytical thinking, algorithmic approaches, and creative solutions.', tags: ['Algorithms', 'Java', 'C++', 'Python'] },
];

function Card({ service, index }) {
  const Icon = service.icon;
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const onMove = (e) => { if (!cardRef.current) return; const r = cardRef.current.getBoundingClientRect(); setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -5, y: ((e.clientX - r.left) / r.width - 0.5) * 5 }); };

  return (
    <ScrollReveal delay={index * 0.06} blur>
      <div ref={cardRef} onMouseMove={onMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })} className="group glow-border glass rounded-[18px] sm:rounded-[22px] p-5 sm:p-7 md:p-9 h-full transition-all duration-500 hover:shadow-2xl hover:shadow-accent/[0.06]" style={{ transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: 'transform 0.2s ease-out, box-shadow 0.5s' }} data-hover>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/15 to-accent/5 border border-accent/10 flex items-center justify-center mb-7 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent/10 transition-all duration-500">
          <Icon size={22} className="text-accent" />
        </div>
        <h3 className="font-display text-content-primary text-[20px] md:text-[22px] font-semibold mb-3 tracking-[-0.02em]">{service.title}</h3>
        <p className="text-content-secondary text-[14px] leading-[1.75] mb-6">{service.desc}</p>
        <div className="flex flex-wrap gap-2">
          {service.tags.map((t) => (
            <span key={t} className="px-3 py-1 rounded-full bg-bg-elevated/80 border border-border text-content-muted text-[11px] font-medium group-hover:border-accent/15 group-hover:text-content-secondary transition-all duration-500">{t}</span>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function Services() {
  return (
    <section id="services" className="section-padding">
      <div className="max-w-content mx-auto">
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-accent/10 text-accent text-[11px] font-bold uppercase tracking-[0.18em] mb-6">Services</span>
          <h2 className="font-display text-[28px] sm:text-[36px] md:text-[52px] font-bold leading-[1.05] tracking-[-0.04em] mb-4 sm:mb-5">
            <span className="text-content-primary">What I </span><span className="text-gradient">bring to the table</span>
          </h2>
          <p className="text-content-secondary text-[14px] sm:text-[16px] max-w-lg mx-auto leading-relaxed">From design to development — full-stack creative services to bring your ideas to life.</p>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">{services.map((s, i) => <Card key={s.title} service={s} index={i} />)}</div>
      </div>
    </section>
  );
}
