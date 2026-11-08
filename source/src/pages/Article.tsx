import { useEffect } from 'react';
import { Link, Navigate, useParams } from '@/router';
import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react';
import { articles, getArticle } from '@/data/articles';
import { getProduct } from '@/data/products';
import { CheatSheetSignup } from '@/components/CheatSheetSignup';

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticle(slug) : undefined;

  useEffect(() => {
    if (!article) return;
    const prev = document.title;
    document.title = `${article.title} | QB Blueprint`;
    return () => { document.title = prev; };
  }, [article]);

  if (!article) return <Navigate to="/articles" replace />;
  const product = getProduct(article.product);
  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <>
      <div className="border-b border-white/[0.06] bg-charcoal">
        <div className="container-x flex items-center gap-2 py-4 text-xs">
          <Link to="/articles" className="flex items-center gap-1 font-headline uppercase tracking-wider2 text-silver hover:text-offwhite transition-colors"><ArrowLeft className="h-3.5 w-3.5" /> Articles</Link>
        </div>
      </div>
      <article className="bg-nearblack py-16 sm:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center gap-4">
              <span className="eyebrow">{article.category}</span>
              <span className="flex items-center gap-1.5 text-xs text-silver"><Clock className="h-3.5 w-3.5" />{article.readMinutes} min read</span>
            </div>
            <h1 className="mt-4 font-display text-5xl uppercase leading-[0.95] text-offwhite sm:text-6xl">{article.title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-offwhite/90">{article.intro}</p>
            {article.sections.map((s) => (
              <section key={s.h} className="mt-10">
                <h2 className="font-headline text-2xl font-semibold text-offwhite">{s.h}</h2>
                {s.p?.map((t, i) => <p key={i} className="mt-4 text-base leading-relaxed text-silver">{t}</p>)}
                {s.list && (
                  <ul className="mt-4 space-y-3">
                    {s.list.map((t, i) => (
                      <li key={i} className="flex gap-3 text-base leading-relaxed text-silver"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-electric" />{t}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            {product && (
              <div className="mt-14 rounded-xl border border-white/[0.08] bg-charcoal p-7">
                <p className="eyebrow mb-2">Go deeper</p>
                <h3 className="font-headline text-xl font-semibold text-offwhite">{product.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver">{product.shortDescription}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link to={`/products/${product.slug}`} className="btn-primary">See the guide · ${product.price}</Link>
                  <Link to="/film-room" className="btn-ghost">Try the free QB Lab</Link>
                </div>
              </div>
            )}
            <div className="mt-8"><CheatSheetSignup compact /></div>
          </div>
        </div>
      </article>
      <section className="bg-charcoal py-16">
        <div className="container-x">
          <p className="eyebrow mb-6">Keep reading</p>
          <div className="grid gap-5 md:grid-cols-2">
            {more.map((a) => (
              <Link key={a.slug} to={`/articles/${a.slug}`} className="group rounded-xl border border-white/[0.08] bg-nearblack p-6 transition-colors hover:border-electric/50">
                <span className="eyebrow">{a.category}</span>
                <h3 className="mt-3 font-headline text-lg font-semibold text-offwhite">{a.title}</h3>
                <span className="mt-4 inline-flex items-center gap-1 font-headline text-xs font-semibold uppercase tracking-wider2 text-electric">Read <ArrowUpRight className="h-3.5 w-3.5" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
