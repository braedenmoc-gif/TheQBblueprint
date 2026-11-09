import { Link } from '@/router';
import { ArrowUpRight, Check } from 'lucide-react';
import { CHEAT_SHEET_URL } from '@/data/site';

const inside = [
  'Cover 0, 1, 2, 3 and 4 on one page',
  'What each coverage looks like before the snap',
  'How each one works, man or zone',
  'Where to throw against each coverage',
  'How to confirm the coverage after the snap',
];

export default function CheatSheet() {
  const url = CHEAT_SHEET_URL || 'https://payhip.com/b/seBFy';
  return (
    <>
      <section className="relative overflow-hidden bg-nearblack py-20 sm:py-24 noise-overlay">
        <div className="absolute inset-0 bg-grid-faint [background-size:48px_48px] opacity-40" />
        <div className="container-x relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="eyebrow mb-3">Free download</p>
              <h1 className="display-xl text-6xl sm:text-7xl text-offwhite">The QB Coverage<br />Cheat Sheet</h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-silver">One printable page that shows you the five coverages you will see most, what they look like before the snap, and where to throw against each one. Made by a college quarterback.</p>
              <ul className="mt-7 space-y-3">
                {inside.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-offwhite/90"><Check className="mt-0.5 h-4 w-4 shrink-0 text-electric" />{t}</li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a href={url} className="btn-primary">Get it free <ArrowUpRight className="h-4 w-4" /></a>
                <span className="text-xs text-silver">Enter your email on the next page. Instant PDF.</span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-6 rounded-3xl bg-electric/10 blur-2xl" />
              <img src="/images/cheat-sheet-preview.jpg" alt="Preview of the QB Coverage Cheat Sheet showing Cover 0 through Cover 4" className="relative w-full rotate-2 rounded-lg border border-white/10 shadow-2xl" />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-charcoal py-16">
        <div className="container-x">
          <div className="flex flex-col gap-6 rounded-xl border border-white/[0.08] bg-nearblack p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow mb-2">Want to practice the reads?</p>
              <p className="max-w-xl text-sm leading-relaxed text-silver">Try the free QB Lab: look at the defense, call the coverage, snap the ball and pick your throw.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/film-room" className="btn-primary">Try the QB Lab</Link>
              <Link to="/articles/cover-2-vs-cover-3" className="btn-ghost">Read: Cover 2 vs Cover 3</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
