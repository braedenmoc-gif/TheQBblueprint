import { ArrowUpRight, FileText } from 'lucide-react';
import { CHEAT_SHEET_URL } from '@/data/site';

export function CheatSheetSignup({ compact = false }: { compact?: boolean }) {
  if (!CHEAT_SHEET_URL) return null;
  return (
    <div className={`rounded-xl border border-electric/40 bg-electric/[0.08] ${compact ? 'p-6' : 'p-8 sm:p-10'}`}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-electric/40 bg-electric/10 text-electric"><FileText className="h-5 w-5" /></span>
          <div>
            <p className="eyebrow mb-1">Free download</p>
            <h3 className="font-display text-3xl uppercase leading-none text-offwhite sm:text-4xl">The QB Coverage Cheat Sheet</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-silver">The five most common coverages on one page: what each looks like before the snap and where to throw against it. Free. Just enter your email on the next page and it's yours.</p>
          </div>
        </div>
        <a href={CHEAT_SHEET_URL} className="btn-primary shrink-0">Get it free <ArrowUpRight className="h-4 w-4" /></a>
      </div>
    </div>
  );
}
