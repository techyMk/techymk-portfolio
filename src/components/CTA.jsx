import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowUpRight, CheckCircle, ChevronDown, AlertCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const budgetOptions = [
  { label: 'Select a range', value: '' },
  { label: 'Under $100', value: 'Under $100' },
  { label: '$100 - $300', value: '$100 - $300' },
  { label: '$300 - $500', value: '$300 - $500' },
  { label: '$500 - $2,000', value: '$500 - $2,000' },
  { label: '$2,000 - $5,000', value: '$2,000 - $5,000' },
  { label: '$5,000+', value: '$5,000+' },
  { label: 'Custom', value: 'custom' },
];

/* ── Custom Dropdown ── */
function CustomSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = budgetOptions.find(o => o.value === value);

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div ref={ref} className="relative" data-hover>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="form-input flex items-center justify-between gap-2 text-left"
      >
        <span className={value ? 'text-content-primary' : 'text-content-muted'}>
          {selected?.label || 'Select a range'}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} className="text-content-muted" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-border bg-bg-elevated shadow-2xl shadow-black/20 overflow-hidden z-30"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {budgetOptions.filter(o => o.value !== '').map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full text-left px-4 py-3 text-[14px] transition-all duration-150 flex items-center justify-between ${
                  value === opt.value
                    ? 'bg-accent/10 text-accent font-medium'
                    : 'text-content-secondary hover:bg-bg-card hover:text-content-primary'
                }`}
              >
                {opt.label}
                {value === opt.value && (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RippleSubmit({ isValid, status }) {
  const ref = useRef(null);
  const [ripple, setRipple] = useState(null);

  const handleEnter = useCallback((e) => {
    if (!isValid || status !== 'idle') return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dx = Math.max(x, rect.width - x);
    const dy = Math.max(y, rect.height - y);
    const size = Math.ceil(Math.sqrt(dx * dx + dy * dy) * 2) + 20;
    setRipple({ x, y, size, key: Date.now() });
  }, [isValid, status]);

  const handleLeave = useCallback(() => setRipple(null), []);

  return (
    <motion.button
      ref={ref}
      type="submit"
      className={`relative overflow-hidden w-full flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-[14px] font-semibold shadow-lg transition-all duration-300 ${
        status === 'sent'
          ? 'bg-emerald-500 text-white shadow-emerald-500/20'
          : status === 'error'
          ? 'bg-red-500 text-white shadow-red-500/20'
          : isValid
          ? 'bg-black text-white dark:bg-white dark:text-black dark:hover:text-white'
          : 'bg-accent/40 text-white/60 cursor-not-allowed shadow-none'
      }`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      whileHover={isValid && status === 'idle' ? { scale: 1.02 } : {}}
      whileTap={isValid && status === 'idle' ? { scale: 0.98 } : {}}
      disabled={!isValid || status === 'sending'}
      data-hover
    >
      <AnimatePresence>
        {ripple && (
          <motion.span
            key={ripple.key}
            className="absolute rounded-full bg-accent pointer-events-none"
            style={{ left: ripple.x, top: ripple.y, x: '-50%', y: '-50%' }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: ripple.size, height: ripple.size, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>
      <span className="relative z-10 flex items-center gap-2.5">
        {status === 'sending' && (
          <><motion.div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} /> Sending...</>
        )}
        {status === 'sent' && <><CheckCircle size={16} /> Message Sent!</>}
        {status === 'error' && <><AlertCircle size={16} /> Failed — Try Again</>}
        {status === 'idle' && <><Send size={16} /> Send Message</>}
      </span>
    </motion.button>
  );
}

export default function CTA() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', budget: '', customBudget: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target ? e.target.value : e }));

  const isValid = form.name && form.email && form.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    setStatus('sending');

    const budget = form.budget === 'custom' ? form.customBudget : form.budget;

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('subject', form.subject || `Portfolio inquiry from ${form.name}`);
    formData.append('budget', budget || 'Not specified');
    formData.append('message', form.message);
    formData.append('_subject', `New inquiry from ${form.name}`);
    formData.append('_captcha', 'false');
    formData.append('_template', 'table');

    try {
      const res = await fetch('https://formsubmit.co/ajax/techymk.dev@gmail.com', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', subject: '', budget: '', customBudget: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-content mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20">
          {/* Left */}
          <div>
            <ScrollReveal>
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-accent/10 text-accent text-[11px] font-bold uppercase tracking-[0.18em] mb-4 sm:mb-6">Get in Touch</span>
              <h2 className="font-display text-[28px] sm:text-[36px] md:text-[52px] font-bold leading-[1.05] tracking-[-0.04em] mb-4 sm:mb-5">
                <span className="text-content-primary">Have a </span><span className="text-gradient">project</span><br /><span className="text-content-primary">in mind?</span>
              </h2>
              <p className="text-content-secondary text-[14px] sm:text-[16px] leading-relaxed mb-8 sm:mb-10 max-w-md">Let's create something exceptional together. Fill out the form and I'll get back to you within 24 hours.</p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="space-y-4 mb-10">
                <a href="mailto:techymk.dev@gmail.com" className="flex items-center gap-3 group" data-hover>
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-accent">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                  </div>
                  <div>
                    <p className="text-content-muted text-[11px] uppercase tracking-wider">Email</p>
                    <p className="text-content-primary text-[14px] group-hover:text-accent transition-colors">techymk.dev@gmail.com</p>
                  </div>
                </a>
                <a href="https://www.instagram.com/_i_am_the___mysterio___/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group" data-hover>
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-accent">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>
                  </div>
                  <div>
                    <p className="text-content-muted text-[11px] uppercase tracking-wider">Social</p>
                    <p className="text-content-primary text-[14px] group-hover:text-accent transition-colors">@techyMk</p>
                  </div>
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="glass glow-border rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
                <p className="text-content-primary text-[15px] font-medium mb-1 relative z-10">Prefer a quick chat?</p>
                <p className="text-content-muted text-[13px] mb-4 relative z-10">DM me on any social platform.</p>
                <a href="https://www.linkedin.com/in/techymk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-accent text-[13px] font-semibold relative z-10 group" data-hover>
                  Connect on LinkedIn <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Form */}
          <ScrollReveal direction="right" delay={0.1} scale>
            <form onSubmit={handleSubmit} className="glass glow-border rounded-[20px] sm:rounded-[24px] p-5 sm:p-7 md:p-10 space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-content-muted text-[11px] uppercase tracking-wider font-semibold mb-2.5 block">
                    Name <span className="text-accent">*</span>
                  </label>
                  <input type="text" placeholder="Your name" className="form-input" value={form.name} onChange={set('name')} required />
                </div>
                <div>
                  <label className="text-content-muted text-[11px] uppercase tracking-wider font-semibold mb-2.5 block">
                    Email <span className="text-accent">*</span>
                  </label>
                  <input type="email" placeholder="you@company.com" className="form-input" value={form.email} onChange={set('email')} required />
                </div>
              </div>

              <div>
                <label className="text-content-muted text-[11px] uppercase tracking-wider font-semibold mb-2.5 block">Subject</label>
                <input type="text" placeholder="Project inquiry" className="form-input" value={form.subject} onChange={set('subject')} />
              </div>

              <div>
                <label className="text-content-muted text-[11px] uppercase tracking-wider font-semibold mb-2.5 block">Budget</label>
                <CustomSelect value={form.budget} onChange={(v) => setForm(f => ({ ...f, budget: v, customBudget: v === 'custom' ? f.customBudget : '' }))} />
              </div>

              {/* Custom budget field */}
              <AnimatePresence>
                {form.budget === 'custom' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <label className="text-content-muted text-[11px] uppercase tracking-wider font-semibold mb-2.5 block">
                      Your Budget <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. $3,000 or Hourly rate"
                      className="form-input"
                      value={form.customBudget}
                      onChange={set('customBudget')}
                      required
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="text-content-muted text-[11px] uppercase tracking-wider font-semibold mb-2.5 block">
                  Message <span className="text-accent">*</span>
                </label>
                <textarea placeholder="Tell me about your project..." rows={4} className="form-input resize-none" value={form.message} onChange={set('message')} required />
              </div>

              <RippleSubmit isValid={isValid} status={status} />

              <p className="text-content-muted text-[11px] text-center">
                {status === 'sent' ? 'Thank you! I\'ll get back to you soon.' : 'Typically respond within 24 hours'}
              </p>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
