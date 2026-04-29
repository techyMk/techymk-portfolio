import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const faqs = [
  { q: 'What services do you offer?', a: 'I offer UI/UX design, web design, graphic design, and branding — each tailored to your business goals, audience, and product vision.' },
  { q: 'How does the design process work?', a: 'My process is structured into four stages: Discovery, Design, Development, and Delivery. You\'ll be involved throughout, with regular check-ins and feedback at key milestones.' },
  { q: 'How long does a project usually take?', a: 'A typical landing page takes 1–2 weeks, while a full branding project is completed in 4–6 weeks. Timelines may vary based on scope, and I\'ll share a detailed plan during our first call.' },
  { q: 'What do I need to get started?', a: 'To get started, I\'ll need a brief outlining your goals, target audience, brand guidelines (if any), content, and references or inspiration. Don\'t worry if you don\'t have everything — I can help guide you.' },
  { q: 'Do you offer revisions?', a: 'Yes—revisions are included in every project. The exact number depends on the scope, but the goal is to ensure the final outcome aligns perfectly with your vision.' },
  { q: 'How do I get started?', a: 'You can reach out via email or the contact form. We\'ll schedule a discovery call to understand your needs, and I\'ll follow up with a tailored proposal outlining scope, timeline, and pricing.' },
];

function Item({ faq, index, open, toggle }) {
  return (
    <ScrollReveal delay={index * 0.04}>
      <div className={`rounded-2xl border transition-all duration-400 ${open ? 'glass border-accent/15 shadow-xl shadow-accent/[0.04]' : 'border-border hover:border-border-hover bg-transparent'}`}>
        <button onClick={toggle} className="w-full flex items-center justify-between p-5 md:p-6 text-left group" data-hover>
          <div className="flex items-center gap-4">
            <span className="text-accent/30 font-display font-bold text-[14px]">{String(index + 1).padStart(2, '0')}</span>
            <span className={`text-[15px] md:text-[16px] font-medium transition-colors ${open ? 'text-content-primary' : 'text-content-secondary group-hover:text-content-primary'}`}>{faq.q}</span>
          </div>
          <motion.div className="w-7 h-7 rounded-full border border-border flex items-center justify-center flex-shrink-0 ml-4 group-hover:border-accent/30 transition-colors" animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            <Plus size={14} className="text-accent" />
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="px-4 sm:px-5 md:px-6 pb-5 sm:pb-6 pl-[44px] sm:pl-[52px] md:pl-[60px] text-content-secondary text-[13px] sm:text-[14px] leading-[1.85]">{faq.a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section id="faq" className="section-padding">
      <div className="max-w-content mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[0.4fr_0.6fr] gap-8 sm:gap-12 lg:gap-20">
          <ScrollReveal className="lg:sticky lg:top-32 lg:self-start">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-accent/10 text-accent text-[11px] font-bold uppercase tracking-[0.18em] mb-4 sm:mb-6">FAQ</span>
            <h2 className="font-display text-[28px] sm:text-[36px] md:text-[52px] font-bold leading-[1.05] tracking-[-0.04em] mb-3 sm:mb-4"><span className="text-gradient">Questions?</span></h2>
            <p className="text-content-secondary text-[15px] leading-relaxed mb-6">Can't find what you need?</p>
            <a href="https://wa.me/917825938625" target="_blank" rel="noopener noreferrer" className="text-accent text-[14px] font-semibold hover:underline" data-hover>Let's chat directly →</a>
          </ScrollReveal>
          <div className="space-y-3">
            {faqs.map((f, i) => <Item key={i} faq={f} index={i} open={openIdx === i} toggle={() => setOpenIdx(openIdx === i ? null : i)} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
