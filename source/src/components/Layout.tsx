import { type ReactNode, useEffect } from 'react';
import { useLocation } from '@/router';
import seo from '@/data/seo.json';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useReveal } from '@/hooks/useReveal';
import { ScrollToTop } from '@/components/ScrollToTop';

export function Layout({ children }: { children: ReactNode }) {
  useReveal();
  const { pathname } = useLocation();
  useEffect(() => {
    const m = (seo as Record<string, { title: string }>)[pathname.replace(/\/$/, '') || '/'];
    if (m) document.title = m.title;
  }, [pathname]);
  return (
    <div className="flex min-h-screen flex-col bg-nearblack">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
