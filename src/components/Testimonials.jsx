import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const data = [
  { id: 1, q: 'Duncan truly understood my vision and turned it into impactful designs. Our conversion rate doubled within three months.', name: 'John Harris', role: 'Marketing Director, Vanta Co.', img: 'https://framerusercontent.com/images/RTNUbNmEH3Lg1VzA3NOYHdp3bHQ.jpg?width=400&height=400' },
  { id: 2, q: 'He took the time to understand our goals and delivered a design that resonated perfectly with our audience. Truly world-class.', name: 'Michael Lee', role: 'Product Manager, Nexus Labs', img: 'https://framerusercontent.com/images/ZbUvwGb7xhhwmovo3t9YO4bAIGs.jpg?width=400&height=400' },
  { id: 3, q: 'His design skills are unmatched. He transformed my rough ideas into a high-performing, visually striking website.', name: 'Sarah Johnson', role: 'CEO, Bloom Studio', img: 'https://framerusercontent.com/images/hleE21gbHw2Y29KULoer3tF8.jpg?width=400&height=400' },
  { id: 4, q: 'As a startup founder, I needed someone who could move fast without cutting corners. Duncan delivered beyond expectations.', name: 'Laura Bennett', role: 'Founder, Bennett & Co.', img: 'https://framerusercontent.com/images/qrxY8NagVO40NBrdhFEGgFR3PYY.jpg?width=620&height=630' },
];

export default function Testimonials() {
  const [cur, setCur] = useState(0);
  useEffect(() => { const t = setInterval(() => setCur(c => (c + 1) % data.length), 6000); return () => clearInterval(t); }, []);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/[0.03] blur-[150px] pointer-events-none" />

      <div className="max-w-content mx-auto relative z-10">
        <ScrollReveal className="text-center mb-10 sm:mb-16 md:mb-20">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-accent/10 text-accent text-[11px] font-bold uppercase tracking-[0.18em] mb-4 sm:mb-6">Testimonials</span>
          <h2 className="font-display text-[28px] sm:text-[36px] md:text-[52px] font-bold leading-[1.05] tracking-[-0.04em]"><span className="text-content-primary">Loved by </span><span className="text-gradient">clients</span></h2>
        </ScrollReveal>

        <ScrollReveal scale>
          <div className="max-w-3xl mx-auto">
            <div className="glass glow-border rounded-[20px] sm:rounded-[28px] p-5 sm:p-8 md:p-14 relative overflow-hidden">
              <span className="absolute top-2 right-4 sm:top-4 sm:right-8 font-display text-[80px] sm:text-[140px] leading-none select-none pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(var(--c-accent), 0.06), rgba(217, 70, 239, 0.03))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>"</span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={cur}
                  initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -24, filter: 'blur(6px)' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-display text-content-primary text-[16px] sm:text-[22px] md:text-[30px] font-medium leading-[1.35] tracking-[-0.02em] mb-6 sm:mb-10 relative z-10">
                    "{data[cur].q}"
                  </p>
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-accent/20 ring-offset-2 ring-offset-bg-card">
                      <img src={data[cur].img} alt={data[cur].name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-content-primary text-[15px] font-semibold">{data[cur].name}</p>
                      <p className="text-content-muted text-[13px]">{data[cur].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between mt-6 sm:mt-10 pt-4 sm:pt-6 border-t border-border/30 relative z-10">
                <div className="flex gap-2">
                  {data.map((_, i) => (
                    <button key={i} onClick={() => setCur(i)} className={`h-1.5 rounded-full transition-all duration-500 ${i === cur ? 'w-8 bg-accent shadow-lg shadow-accent/30' : 'w-4 bg-border-hover hover:bg-content-muted'}`} />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setCur(c => (c - 1 + data.length) % data.length)} className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-content-muted hover:text-accent hover:border-accent/30 transition-all" data-hover><ChevronLeft size={16} /></button>
                  <button onClick={() => setCur(c => (c + 1) % data.length)} className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-content-muted hover:text-accent hover:border-accent/30 transition-all" data-hover><ChevronRight size={16} /></button>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
              {data.map((t, i) => (
                <button key={t.id} onClick={() => setCur(i)} className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 transition-all duration-400 ${i === cur ? 'border-accent scale-110 shadow-lg shadow-accent/20' : 'border-border opacity-40 hover:opacity-100'}`} data-hover>
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
