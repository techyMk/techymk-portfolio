import { useEffect, useState, useCallback } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Coffee } from 'lucide-react';
import Loader from './components/Loader';
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
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-accent/90 text-white flex items-center justify-center shadow-lg shadow-accent/25 backdrop-blur-sm"
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
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 flex items-center gap-2 pl-2.5 pr-3 sm:pl-3 sm:pr-4 py-2 sm:py-2.5 rounded-full bg-[#FFDD00] text-[#0D0D0D] text-[12px] sm:text-[13px] font-bold shadow-lg shadow-[#FFDD00]/20"
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
  const [loading, setLoading] = useState(true);

  const handleLoaderComplete = useCallback(() => setLoading(false), []);

  // Safety fallback — force remove loader after 4s no matter what
  useEffect(() => {
    const fallback = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(fallback);
  }, []);

  // Scroll to top on refresh
  useEffect(() => {
    if (loading) {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
    document.body.style.overflow = '';
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // Smooth scroll for anchor links
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;
      const id = target.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -20 });
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, [loading]);

  return (
    <div className="grain min-h-screen bg-bg font-body relative">
      <AnimatePresence>
        {loading && <Loader key="loader" onComplete={handleLoaderComplete} />}
      </AnimatePresence>
      <div className="mesh-bg" />
      <FloatingTech />
      <Cursor />
      <Navbar />
      <main className="relative z-[1]">
        <Hero ready={!loading} />
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
