import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Coffee } from 'lucide-react';
import Cursor from './components/Cursor';
import FloatingTech from './components/FloatingTech';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';

import CTA from './components/CTA';
import Footer from './components/Footer';

function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-accent/90 text-white flex items-center justify-center shadow-lg shadow-accent/25 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          data-hover
        >
          <ArrowUp size={16} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function BuyMeCoffee() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => {
      const footer = document.querySelector('footer');
      const footerTop = footer ? footer.getBoundingClientRect().top : Infinity;
      setShow(window.scrollY > 400 && footerTop > window.innerHeight);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="https://buymeacoffee.com/techymk"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 z-50 flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-full bg-[#FFDD00] text-[#0D0D0D] text-[13px] font-bold shadow-lg shadow-[#FFDD00]/20"
          initial={{ opacity: 0, scale: 0.5, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.5, x: -20 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          data-hover
        >
          <Coffee size={16} strokeWidth={2.5} className="flex-shrink-0" />
          <span className="hidden sm:inline">Buy me a coffee</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="grain min-h-screen bg-bg font-body relative">
      <div className="mesh-bg" />
      <FloatingTech />
      <Cursor />
      <Navbar />
      <main className="relative z-[1]">
        <Hero />
        <Services />
        <About />
        <Projects />
        <Testimonials />
        <FAQ />

        <CTA />
      </main>
      <Footer />
      <ScrollToTop />

      <BuyMeCoffee />
    </div>
  );
}
