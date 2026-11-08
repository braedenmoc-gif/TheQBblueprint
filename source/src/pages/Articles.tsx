import { Link } from '@/router';
import { ArrowUpRight, Clock } from 'lucide-react';
import { articles } from '@/data/articles';
import { CheatSheetSignup } from '@/components/CheatSheetSignup';

export default function Articles() {
  return (
    <>
      <section className="relative overflow-hidden bg-nearblack py-24 noise-overlay">
        <div className="container-x relative">
          <p className="eyebrow mb-3">Articles</p>
          <h1 className="display-xl text-6xl sm:text-7xl lg:text-8xl text-offwhite">Learn the position.</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-silver">Free quarterback lessons on reading defenses, footwork and the mental game, written by a college quarterback.</p>
        </div>
      </section>
      <section className="bg-charcoal py-20">
        <div className="container-x">
          <div className="grid gap-5 md:grid-cols-2">
            {articles.map((a) => (
              <Link key={a.slug} to={`/articles/${a.slug}`} className="group flex flex-col rounded-xl border border-white/[0.08] bg-nearblack p-7 transition-colors hover:border-electric/50">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">{a.category}</span>
                  <span className="flex items-center gap-1.5 text-xs text-silver"><Clock className="h-3.5 w-3.5" />{a.readMinutes} min read</span>
                </div>
                <h2 className="mt-4 font-headline text-xl font-semibold leading-snug text-offwhite group-hover:text-white">{a.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-silver">{a.description}</p>
                <span className="mt-5 inline-flex items-center gap-1 font-headline text-xs font-semibold uppercase tracking-wider2 text-electric">Read article <ArrowUpRight className="h-3.5 w-3.5" /></span>
              </Link>
            ))}
          </div>
          <div className="mt-14"><CheatSheetSignup /></div>
        </div>
      </section>
    </>
  );
}
