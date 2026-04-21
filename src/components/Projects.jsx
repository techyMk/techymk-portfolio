import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const projects = [
  { id: 1, title: 'Embsys AI', desc: 'Full website design & development for an agentic AI visual intelligence company — including brand identity, logo, and UI/UX.', tags: ['Web', 'UI/UX', 'Branding', 'AI'], gradient: 'from-violet-600 via-purple-500 to-fuchsia-500', featured: true, link: 'https://embsysai.com/', img: 'assets/embsys.webp' },
  { id: 2, title: 'Inko', desc: 'A browser-based paint editor with brushes, colors, and layers — built entirely with vanilla JavaScript.', tags: ['JavaScript', 'Canvas', 'CSS'], gradient: 'from-cyan-500 via-blue-600 to-indigo-600', link: 'https://inko-techymk.netlify.app/', img: 'assets/inko.webp' },
  { id: 3, title: 'Leoplast', desc: 'Designing & developing a complete web presence for Tamil Nadu\'s premier plumbing manufacturer with 40 years of industry leadership.', tags: ['Web', 'UI/UX', 'Branding'], gradient: 'from-rose-500 via-pink-600 to-purple-600', featured: true, building: true, icon: 'leoplast' },
  { id: 4, title: 'NestGenie', desc: 'AI-powered home decor image generator — full-stack app with frontend and backend, creating custom interior designs from prompts.', tags: ['AI', 'React', 'Node.js', 'Full-Stack'], gradient: 'from-emerald-500 via-teal-600 to-cyan-600', link: 'https://nest-genie.vercel.app/', img: 'assets/nestgenie.webp' },
  { id: 5, title: 'Pixo', desc: 'Feature-rich image editor with filters, cropping, adjustments, and export — right in the browser.', tags: ['JavaScript', 'Canvas', 'CSS'], gradient: 'from-amber-500 via-orange-500 to-red-500', link: 'https://pixo-techymk.netlify.app/', img: 'assets/pixo.webp' },
  { id: 6, title: 'BrainDoc', desc: 'RAG-based chatbot supporting multiple retrieval models — full-stack app with document ingestion, vector search, and contextual responses.', tags: ['AI', 'RAG', 'React', 'Full-Stack'], gradient: 'from-indigo-500 via-violet-600 to-purple-700', link: 'https://brain-doc-rag.vercel.app/', img: 'assets/braindoc.webp' },
];

/* ── Themed cover art — bold, app-icon-quality SVG illustrations ── */
function CoverArt({ icon, hovered }) {
  const wrap = 'absolute inset-0 bottom-[40%] pointer-events-none select-none flex items-center justify-center overflow-hidden';
  switch (icon) {
    case 'embsys':
      // AI eye / vision intelligence
      return (
        <div className={wrap}>
          <motion.svg viewBox="0 0 200 140" className="w-[70%] h-[80%]" fill="none" animate={hovered ? { scale: 1.08 } : { scale: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            {/* Outer eye shape */}
            <motion.path d="M10 70 Q50 15 100 15 Q150 15 190 70 Q150 125 100 125 Q50 125 10 70Z" stroke="white" strokeWidth="1.5" opacity="0.15" fill="white" fillOpacity="0.02" animate={hovered ? { d: 'M10 70 Q50 25 100 25 Q150 25 190 70 Q150 115 100 115 Q50 115 10 70Z' } : {}} transition={{ duration: 0.5 }} />
            {/* Iris */}
            <circle cx="100" cy="70" r="32" fill="white" opacity="0.05" stroke="white" strokeWidth="1.5" strokeOpacity="0.15" />
            <motion.circle cx="100" cy="70" r="32" stroke="white" strokeWidth="0.5" opacity="0.08" strokeDasharray="4 4" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '100px 70px' }} />
            {/* Pupil */}
            <circle cx="100" cy="70" r="18" fill="white" opacity="0.08" />
            <motion.circle cx="100" cy="70" r="10" fill="white" opacity="0.12" animate={hovered ? { r: 14 } : { r: 10 }} transition={{ duration: 0.4 }} />
            <circle cx="106" cy="63" r="4" fill="white" opacity="0.2" />
            {/* Circuit traces from eye */}
            {[
              'M10 70 L-5 70 L-5 50 L-20 50', 'M10 70 L-5 70 L-5 90 L-20 90',
              'M190 70 L205 70 L205 50 L220 50', 'M190 70 L205 70 L205 90 L220 90',
              'M100 15 L100 0 L80 0', 'M100 15 L100 0 L120 0',
              'M100 125 L100 140 L80 140', 'M100 125 L100 140 L120 140',
            ].map((d, i) => (
              <motion.path key={i} d={d} stroke="white" strokeWidth="1" opacity="0.07" strokeLinecap="round"
                animate={{ opacity: [0.04, 0.12, 0.04] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }} />
            ))}
            {/* Data nodes */}
            {[[-20, 50], [-20, 90], [220, 50], [220, 90], [80, 0], [120, 0], [80, 140], [120, 140]].map(([x, y], i) => (
              <motion.rect key={i} x={x - 3} y={y - 3} width="6" height="6" rx="1" fill="white" opacity="0.08"
                animate={{ opacity: [0.05, 0.18, 0.05] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }} />
            ))}
            {/* Scanning ring */}
            <motion.circle cx="100" cy="70" r="45" stroke="white" strokeWidth="0.8" opacity="0.06" strokeDasharray="8 12"
              animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '100px 70px' }} />
          </motion.svg>
        </div>
      );

    case 'inko':
      // Paint editor — color palette + canvas with drawings
      return (
        <div className={wrap}>
          <motion.svg viewBox="0 0 220 130" className="w-[78%] h-[90%]" fill="none" animate={hovered ? { scale: 1.04 } : { scale: 1 }} transition={{ duration: 0.5 }}>
            {/* Color palette — left side */}
            <motion.g opacity={hovered ? 0.4 : 0.25} transition={{ duration: 0.3 }}>
              <circle cx="16" cy="20" r="7" fill="#60A5FA" />
              <circle cx="16" cy="39" r="7" fill="#F472B6" />
              <circle cx="16" cy="58" r="7" fill="#34D399" />
              <circle cx="16" cy="77" r="7" fill="#FBBF24" />
              <circle cx="16" cy="96" r="7" fill="#A78BFA" />
              {/* Active ring */}
              <circle cx="16" cy="58" r="10" stroke="white" strokeWidth="1.5" opacity="0.5" />
            </motion.g>

            {/* Canvas */}
            <rect x="35" y="5" width="175" height="115" rx="6" stroke="white" strokeWidth="1.5" opacity="0.14" fill="white" fillOpacity="0.025" />
            {/* Canvas checkerboard hint */}
            <rect x="36" y="6" width="173" height="113" rx="5" fill="white" fillOpacity="0.01" />

            {/* "techyMk" handwritten text on canvas */}
            <motion.text x="122" y="52" fill="white" fontSize="22" fontWeight="bold" fontFamily="'Clash Display', sans-serif" textAnchor="middle" letterSpacing="-0.5" opacity={hovered ? 0.22 : 0.13}>
              techyMk
            </motion.text>

            {/* Drawn shapes on canvas */}
            {/* Circle */}
            <motion.circle cx="75" cy="85" r="14" stroke="#60A5FA" strokeWidth="2" opacity={hovered ? 0.25 : 0.12}
              animate={hovered ? { r: 16 } : {}} transition={{ duration: 0.4 }} />
            {/* Triangle */}
            <motion.path d="M110 98 L122 72 L134 98 Z" stroke="#F472B6" strokeWidth="2" strokeLinejoin="round" opacity={hovered ? 0.25 : 0.12}
              animate={hovered ? { y: -2 } : {}} transition={{ duration: 0.4 }} />
            {/* Star */}
            <motion.path d="M165 75 L168 85 L178 85 L170 91 L173 101 L165 95 L157 101 L160 91 L152 85 L162 85 Z" stroke="#FBBF24" strokeWidth="1.5" strokeLinejoin="round" opacity={hovered ? 0.25 : 0.12}
              animate={hovered ? { rotate: 15, scale: 1.1 } : {}} transition={{ duration: 0.4 }} style={{ transformOrigin: '165px 88px' }} />
            {/* Squiggly line */}
            <motion.path d="M50 75 Q58 68 66 75 Q74 82 82 75" stroke="#34D399" strokeWidth="2" strokeLinecap="round" opacity={hovered ? 0.22 : 0.1}
              animate={hovered ? { pathLength: 1 } : { pathLength: 0.7 }} transition={{ duration: 0.5 }} style={{ pathLength: 0.7 }} />

            {/* Cursor on canvas */}
            <motion.g animate={hovered ? { x: 6, y: -4 } : { x: 0, y: 0 }} transition={{ duration: 0.3 }}>
              <circle cx="170" cy="60" r="8" stroke="white" strokeWidth="1" opacity="0.18" />
              <circle cx="170" cy="60" r="1.5" fill="white" opacity="0.25" />
            </motion.g>
          </motion.svg>
        </div>
      );

    case 'leoplast':
      // Under construction — crane + building + code brackets
      return (
        <div className={wrap}>
          <motion.svg viewBox="0 0 240 140" className="w-[78%] h-[90%]" fill="none" animate={hovered ? { scale: 1.04 } : { scale: 1 }} transition={{ duration: 0.5 }}>
            {/* Blueprint grid */}
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={`v${i}`} x1={20 * i} y1="0" x2={20 * i} y2="140" stroke="white" strokeWidth="0.3" opacity="0.03" />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={20 * i} x2="240" y2={20 * i} stroke="white" strokeWidth="0.3" opacity="0.03" />
            ))}

            {/* Building structure — wireframe */}
            <rect x="70" y="50" width="60" height="70" rx="2" stroke="white" strokeWidth="1.2" opacity="0.12" strokeDasharray="4 3" />
            <rect x="75" y="58" width="14" height="14" rx="1" stroke="white" strokeWidth="0.8" opacity="0.08" />
            <rect x="95" y="58" width="14" height="14" rx="1" stroke="white" strokeWidth="0.8" opacity="0.08" />
            <rect x="115" y="58" width="10" height="14" rx="1" stroke="white" strokeWidth="0.8" opacity="0.06" strokeDasharray="2 2" />
            <rect x="75" y="80" width="14" height="14" rx="1" stroke="white" strokeWidth="0.8" opacity="0.08" />
            <rect x="95" y="80" width="14" height="14" rx="1" stroke="white" strokeWidth="0.8" opacity="0.06" strokeDasharray="2 2" />
            <rect x="85" y="102" width="16" height="18" rx="1.5" stroke="white" strokeWidth="0.8" opacity="0.1" />

            {/* Crane */}
            <line x1="155" y1="120" x2="155" y2="15" stroke="white" strokeWidth="2" opacity="0.12" />
            <line x1="155" y1="15" x2="90" y2="15" stroke="white" strokeWidth="1.5" opacity="0.1" />
            <line x1="155" y1="15" x2="175" y2="15" stroke="white" strokeWidth="1.5" opacity="0.1" />
            {/* Crane support cables */}
            <line x1="155" y1="30" x2="100" y2="15" stroke="white" strokeWidth="0.6" opacity="0.07" />
            <line x1="155" y1="30" x2="170" y2="15" stroke="white" strokeWidth="0.6" opacity="0.07" />
            {/* Crane hook + cable */}
            <motion.g animate={{ y: [0, 4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
              <line x1="105" y1="15" x2="105" y2="38" stroke="white" strokeWidth="0.8" opacity="0.1" />
              <path d="M101 38 Q105 45 109 38" stroke="white" strokeWidth="1" opacity="0.15" />
              {/* Dangling block */}
              <rect x="98" y="46" width="14" height="10" rx="1" fill="white" opacity="0.06" stroke="white" strokeWidth="0.8" strokeOpacity="0.1" />
            </motion.g>
            {/* Crane base */}
            <rect x="145" y="118" width="20" height="6" rx="1" fill="white" opacity="0.06" />

            {/* Code brackets — </> */}
            <motion.g opacity={hovered ? 0.25 : 0.12} transition={{ duration: 0.3 }}>
              <text x="175" y="72" fill="white" fontSize="28" fontFamily="monospace" fontWeight="bold">&lt;/&gt;</text>
            </motion.g>

            {/* Gear */}
            <motion.g animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '200px 105px' }}>
              <circle cx="200" cy="105" r="10" stroke="white" strokeWidth="1.2" opacity="0.1" />
              <circle cx="200" cy="105" r="4" stroke="white" strokeWidth="0.8" opacity="0.08" />
              {[0, 45, 90, 135].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                return <rect key={deg} x={198 + 9 * Math.cos(rad)} y={103 + 9 * Math.sin(rad)} width="4" height="4" rx="0.5" fill="white" opacity="0.08" transform={`rotate(${deg}, ${200 + 9 * Math.cos(rad)}, ${105 + 9 * Math.sin(rad)})`} />;
              })}
            </motion.g>

            {/* Progress bar */}
            <rect x="30" y="130" width="100" height="4" rx="2" fill="white" opacity="0.05" />
            <motion.rect x="30" y="130" height="4" rx="2" fill="white" opacity="0.12" animate={{ width: [0, 65, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
            <text x="30" y="127" fill="white" opacity="0.08" fontSize="7" fontFamily="monospace">BUILDING...</text>

            {/* Caution stripes — top */}
            <g opacity="0.06">
              {Array.from({ length: 16 }).map((_, i) => (
                <rect key={i} x={i * 16 - 2} y="0" width="8" height="5" fill="#FBBF24" transform={`skewX(-20)`} />
              ))}
            </g>
          </motion.svg>
        </div>
      );

    case 'tagzo':
      // Phone with QR code
      return (
        <div className={wrap}>
          <motion.svg viewBox="0 0 200 150" className="w-[60%] h-[80%]" fill="none" animate={hovered ? { scale: 1.08 } : { scale: 1 }} transition={{ duration: 0.5 }}>
            {/* Phone frame */}
            <rect x="55" y="5" width="90" height="140" rx="12" stroke="white" strokeWidth="1.5" opacity="0.15" fill="white" fillOpacity="0.025" />
            {/* Screen */}
            <rect x="62" y="18" width="76" height="110" rx="4" fill="white" opacity="0.02" stroke="white" strokeWidth="0.5" strokeOpacity="0.08" />
            {/* Notch */}
            <rect x="85" y="8" width="30" height="5" rx="2.5" fill="white" opacity="0.06" />
            {/* QR Code on screen */}
            <g transform="translate(70, 28)">
              {/* Position markers */}
              <rect x="0" y="0" width="16" height="16" rx="2" stroke="white" strokeWidth="2" opacity="0.2" />
              <rect x="4" y="4" width="8" height="8" rx="1" fill="white" opacity="0.12" />
              <rect x="44" y="0" width="16" height="16" rx="2" stroke="white" strokeWidth="2" opacity="0.2" />
              <rect x="48" y="4" width="8" height="8" rx="1" fill="white" opacity="0.12" />
              <rect x="0" y="44" width="16" height="16" rx="2" stroke="white" strokeWidth="2" opacity="0.2" />
              <rect x="4" y="48" width="8" height="8" rx="1" fill="white" opacity="0.12" />
              {/* Data pattern */}
              {[[22,2],[32,2],[42,2],[22,12],[22,22],[32,22],[42,22],[52,22],
                [2,22],[12,22],[2,32],[22,32],[42,32],[52,32],
                [22,42],[32,42],[42,42],[52,42],[52,52],[42,52],[32,52]
              ].map(([x, y], i) => (
                <motion.rect key={i} x={x} y={y} width="6" height="6" rx="0.5" fill="white"
                  animate={{ opacity: [0.06, 0.18, 0.06] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: (i * 0.12) % 2.5 }} />
              ))}
            </g>
            {/* Scan animation */}
            <motion.line x1="65" x2="135" stroke="white" strokeWidth="1.5" opacity="0.15" strokeLinecap="round"
              animate={{ y1: [25, 120, 25], y2: [25, 120, 25] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
            {/* Corner scan brackets */}
            <motion.g opacity={hovered ? 0.2 : 0.1} transition={{ duration: 0.3 }}>
              <path d="M65 32 L65 25 L72 25" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M135 32 L135 25 L128 25" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M65 120 L65 125 L72 125" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M135 120 L135 125 L128 125" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </motion.g>
            {/* Floating QR fragments around phone */}
            <motion.rect x="20" y="30" width="20" height="20" rx="3" stroke="white" strokeWidth="0.8" opacity="0.06"
              animate={hovered ? { x: 15, rotate: -5 } : {}} transition={{ duration: 0.4 }} />
            <motion.rect x="160" y="50" width="18" height="18" rx="3" stroke="white" strokeWidth="0.8" opacity="0.05"
              animate={hovered ? { x: 165, rotate: 8 } : {}} transition={{ duration: 0.4, delay: 0.05 }} />
          </motion.svg>
        </div>
      );

    case 'pixo':
      // Photo with editing UI overlay
      return (
        <div className={wrap}>
          <motion.svg viewBox="0 0 220 140" className="w-[72%] h-[85%]" fill="none" animate={hovered ? { scale: 1.05 } : { scale: 1 }} transition={{ duration: 0.5 }}>
            {/* Main image frame */}
            <rect x="35" y="10" width="150" height="105" rx="6" stroke="white" strokeWidth="1.2" opacity="0.14" fill="white" fillOpacity="0.025" />
            {/* Photo scene — sunset landscape */}
            <circle cx="145" cy="35" r="14" fill="white" opacity="0.08" />
            <motion.circle cx="145" cy="35" r="18" stroke="white" strokeWidth="0.5" opacity="0.04" animate={hovered ? { r: 22, opacity: 0.08 } : {}} transition={{ duration: 0.5 }} />
            {/* Sun rays */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              return <motion.line key={deg} x1={145 + 20 * Math.cos(rad)} y1={35 + 20 * Math.sin(rad)} x2={145 + 28 * Math.cos(rad)} y2={35 + 28 * Math.sin(rad)} stroke="white" strokeWidth="0.5" opacity="0.04" animate={hovered ? { opacity: 0.1 } : {}} transition={{ duration: 0.3 }} />;
            })}
            {/* Mountains */}
            <polygon points="35,115 70,50 95,85 120,40 160,80 185,115" fill="white" opacity="0.07" />
            <polygon points="35,115 60,75 90,115" fill="white" opacity="0.04" />
            {/* Crop corners */}
            <motion.g opacity={hovered ? 0.3 : 0.15} transition={{ duration: 0.3 }}>
              <path d="M42 20 L42 30 M42 20 L52 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M178 20 L178 30 M178 20 L168 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M42 105 L42 95 M42 105 L52 105" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M178 105 L178 95 M178 105 L168 105" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </motion.g>
            {/* Left toolbar */}
            <motion.g opacity={hovered ? 0.18 : 0.08} transition={{ duration: 0.3 }}>
              <rect x="8" y="20" width="18" height="85" rx="5" stroke="white" strokeWidth="0.8" fill="white" fillOpacity="0.02" />
              {/* Tool icons */}
              <rect x="12" y="28" width="10" height="10" rx="2" stroke="white" strokeWidth="0.8" />
              <circle cx="17" cy="48" r="5" stroke="white" strokeWidth="0.8" />
              <path d="M12 58 L22 68 M22 58 L12 68" stroke="white" strokeWidth="0.7" />
              <path d="M14 78 L20 78 M17 75 L17 81" stroke="white" strokeWidth="0.8" />
              <path d="M12 90 Q17 85 22 90 Q17 95 12 90" stroke="white" strokeWidth="0.7" />
            </motion.g>
            {/* Bottom adjustments bar */}
            <motion.g opacity={hovered ? 0.18 : 0.08} transition={{ duration: 0.3 }}>
              <rect x="40" y="122" width="140" height="12" rx="4" stroke="white" strokeWidth="0.6" fill="white" fillOpacity="0.02" />
              {/* Slider knobs */}
              {[65, 95, 125, 155].map((x, i) => (
                <g key={i}>
                  <line x1={x - 12} y1="128" x2={x + 12} y2="128" stroke="white" strokeWidth="0.6" opacity="0.6" />
                  <motion.circle cx={x} cy="128" r="3" fill="white" opacity="0.3" animate={hovered ? { cx: x + (i % 2 ? 4 : -4) } : {}} transition={{ duration: 0.4 }} />
                </g>
              ))}
            </motion.g>
          </motion.svg>
        </div>
      );

    case 'quizzy':
      // Trophy + quiz card stack
      return (
        <div className={wrap}>
          <motion.svg viewBox="0 0 200 140" className="w-[68%] h-[82%]" fill="none" animate={hovered ? { scale: 1.06 } : { scale: 1 }} transition={{ duration: 0.5 }}>
            {/* Card stack — back */}
            <motion.rect x="75" y="18" width="80" height="55" rx="8" stroke="white" strokeWidth="0.8" opacity="0.06" fill="white" fillOpacity="0.01" transform="rotate(-6, 115, 45)"
              animate={hovered ? { rotate: -10, x: -5 } : {}} transition={{ duration: 0.4 }} style={{ transformOrigin: '115px 45px' }} />
            {/* Card stack — middle */}
            <motion.rect x="75" y="18" width="80" height="55" rx="8" stroke="white" strokeWidth="0.8" opacity="0.08" fill="white" fillOpacity="0.015" transform="rotate(3, 115, 45)"
              animate={hovered ? { rotate: 6, x: 3 } : {}} transition={{ duration: 0.4, delay: 0.03 }} style={{ transformOrigin: '115px 45px' }} />
            {/* Card stack — front */}
            <rect x="75" y="18" width="80" height="55" rx="8" stroke="white" strokeWidth="1.2" opacity="0.14" fill="white" fillOpacity="0.025" />
            {/* Question mark on card */}
            <motion.text x="115" y="54" fill="white" fontSize="28" fontWeight="bold" textAnchor="middle" fontFamily="serif" opacity="0.12"
              animate={hovered ? { opacity: 0.22, scale: 1.1 } : {}} transition={{ duration: 0.3 }}
              style={{ transformOrigin: '115px 48px' }}>?</motion.text>
            {/* Trophy */}
            <motion.g animate={hovered ? { y: -4, scale: 1.08 } : { y: 0, scale: 1 }} transition={{ duration: 0.4 }} style={{ transformOrigin: '38px 70px' }}>
              {/* Cup */}
              <path d="M22 45 L22 35 L54 35 L54 45 Q54 70 38 75 Q22 70 22 45Z" stroke="white" strokeWidth="1.2" opacity="0.15" fill="white" fillOpacity="0.04" />
              {/* Handles */}
              <path d="M22 42 Q10 42 10 55 Q10 63 22 63" stroke="white" strokeWidth="1" opacity="0.1" />
              <path d="M54 42 Q66 42 66 55 Q66 63 54 63" stroke="white" strokeWidth="1" opacity="0.1" />
              {/* Stem + base */}
              <line x1="38" y1="75" x2="38" y2="85" stroke="white" strokeWidth="1.2" opacity="0.12" />
              <rect x="26" y="85" width="24" height="5" rx="2" fill="white" opacity="0.08" />
              {/* Star on trophy */}
              <motion.path d="M38 48 L40 54 L46 54 L41 58 L43 64 L38 60 L33 64 L35 58 L30 54 L36 54Z" fill="white" opacity="0.12"
                animate={hovered ? { opacity: 0.25 } : {}} transition={{ duration: 0.3 }} />
            </motion.g>
            {/* Score circles */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.g key={i}>
                <circle cx={85 + i * 16} cy="86" r="5" stroke="white" strokeWidth="0.8" opacity={i < 4 ? 0.12 : 0.06} fill={i < 4 ? 'white' : 'none'} fillOpacity={i < 4 ? 0.06 : 0} />
                {i < 4 && <motion.path d={`M${82 + i * 16} 86 l2 2 l4-4`} stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.15"
                  animate={hovered ? { opacity: 0.3 } : {}} transition={{ duration: 0.3, delay: i * 0.05 }} />}
              </motion.g>
            ))}
            {/* Timer */}
            <rect x="80" y="100" width="70" height="4" rx="2" fill="white" opacity="0.04" />
            <motion.rect x="80" y="100" height="4" rx="2" fill="white" opacity="0.1" animate={{ width: [70, 15, 70] }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }} />
            {/* Floating elements */}
            <motion.text x="170" y="35" fill="white" fontSize="14" opacity="0.06" animate={hovered ? { y: 30, opacity: 0.12 } : {}} transition={{ duration: 0.4 }}>+10</motion.text>
            <motion.circle cx="175" cy="75" r="8" stroke="white" strokeWidth="0.6" opacity="0.05" animate={hovered ? { scale: 1.3, opacity: 0.1 } : {}} transition={{ duration: 0.3 }} />
          </motion.svg>
        </div>
      );

    default:
      return null;
  }
}

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
          style={{ transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: 'transform 0.25s ease-out' }}
          data-hover
        >

          <div className="group relative aspect-[16/10] rounded-[20px] overflow-hidden">
            {/* Background — screenshot image or gradient */}
            {p.img ? (
              <motion.img
                src={p.img}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover object-top"
                style={{ scale: bgScale }}
                loading="lazy"
              />
            ) : (
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-700`}
                style={{ scale: bgScale }}
              />
            )}

            {/* Grid pattern overlay — only for gradient cards */}
            {!p.img && <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />}

            {/* Accent shimmer sweep for featured */}
            {isFeatured && (
              <motion.div
                className="absolute inset-0 pointer-events-none z-10"
                style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.08) 55%, transparent 60%)' }}
                animate={{ x: ['-120%', '120%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
              />
            )}

            {/* Cover art illustration — only for gradient cards */}
            {!p.img && p.icon && <CoverArt icon={p.icon} hovered={hovered} />}

            {/* Title watermark — only when no illustration and no image */}
            {!p.icon && !p.img && (
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <motion.span
                  className="font-display text-white/[0.05] text-[48px] sm:text-[80px] md:text-[110px] font-bold tracking-[-0.04em] select-none whitespace-nowrap"
                  animate={hovered ? { scale: 1.05, y: -5 } : { scale: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {p.title}
                </motion.span>
              </div>
            )}

            {/* Bottom gradient overlay */}
            <div className={`absolute inset-0 ${p.img ? 'bg-gradient-to-t from-black/90 via-black/50 via-[50%] to-black/10' : p.icon ? 'bg-gradient-to-t from-black/80 via-black/40 via-[55%] to-transparent' : 'bg-gradient-to-t from-black/70 via-black/5 to-transparent'}`} />

            {/* Shine on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(circle at ${(tilt.y / 5 + 0.5) * 100}% ${(-tilt.x / 5 + 0.5) * 100}%, rgba(255,255,255,0.1) 0%, transparent 50%)`, opacity: hovered ? 1 : 0, transition: 'opacity 0.3s' }}
            />

            {/* Client Project badge — top left for featured */}
            {isFeatured && (
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20 flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.12] backdrop-blur-md border border-white/[0.15]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                  <span className="text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">Client Project</span>
                </div>
                {p.building && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/25">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
                    </span>
                    <span className="text-amber-200 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">In Progress</span>
                  </div>
                )}
              </div>
            )}

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {projects.map((p, i) => (
            <Card key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
