import { ArrowUpRight, Clock } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const posts = [
  { id: 1, cat: 'Insights', date: 'Apr 30, 2025', time: '5 min', title: '5 Design Trends That Will Define 2025', desc: 'The top design trends influencing web, UI/UX, and branding this year.', img: 'https://framerusercontent.com/images/IUYreEo8ON7qCLgK2tgDOW0xoI.jpg' },
  { id: 2, cat: 'Process', date: 'Apr 27, 2025', time: '4 min', title: 'How to Streamline Your Design Workflow', desc: 'Practical strategies to save time and deliver quality work efficiently.', img: 'https://framerusercontent.com/images/E1WpqVmKDy3dfBvA5ZUr05iM.jpg' },
];

function Card({ post, index }) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <div className="group glass glow-border rounded-[22px] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-accent/[0.06]" data-hover>
        <div className="relative aspect-[16/9] overflow-hidden">
          <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-[11px] font-semibold uppercase tracking-wider">{post.cat}</span>
        </div>
        <div className="p-7">
          <div className="flex items-center gap-3 text-content-muted text-[12px] mb-3">
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-content-muted" />
            <span className="flex items-center gap-1"><Clock size={11} />{post.time}</span>
          </div>
          <h3 className="font-display text-content-primary text-[18px] md:text-[21px] font-semibold tracking-[-0.02em] mb-2 group-hover:text-accent transition-colors duration-300 leading-tight">{post.title}</h3>
          <p className="text-content-secondary text-[14px] leading-relaxed mb-5">{post.desc}</p>
          <span className="inline-flex items-center gap-1.5 text-accent text-[13px] font-semibold group-hover:gap-2.5 transition-all duration-300">Read article <ArrowUpRight size={14} /></span>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function Blog() {
  return (
    <section id="blog" className="section-padding">
      <div className="max-w-content mx-auto">
        <ScrollReveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16 md:mb-20">
          <div>
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-accent/10 text-accent text-[11px] font-bold uppercase tracking-[0.18em] mb-6">Blog</span>
            <h2 className="font-display text-[36px] md:text-[52px] font-bold leading-[1.05] tracking-[-0.04em]"><span className="text-content-primary">Insights & </span><span className="text-gradient">ideas</span></h2>
          </div>
          <a href="#blog" className="inline-flex items-center gap-2 text-accent text-[14px] font-semibold group" data-hover>All articles <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></a>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{posts.map((p, i) => <Card key={p.id} post={p} index={i} />)}</div>
      </div>
    </section>
  );
}
