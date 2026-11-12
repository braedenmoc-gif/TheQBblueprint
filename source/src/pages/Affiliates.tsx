import { useState } from 'react';
import { BadgePercent, Gift, Link2, Send, ShieldCheck, Users } from 'lucide-react';
import { Link } from '@/router';
import { SUPPORT_EMAIL } from '@/data/site';

const perks = [
  { icon: BadgePercent, title: '30% commission', text: 'Earn 30% of every sale through your link. That is about $15 on every Complete Bundle.' },
  { icon: Gift, title: 'Free bundle', text: 'Get all three guides free so you know exactly what you are recommending.' },
  { icon: Users, title: 'A code for your followers', text: 'Your own discount code, so your audience gets 10% off.' },
  { icon: Link2, title: 'Tracking and payouts handled', text: 'Your link, sales and payouts are tracked through Payhip, our store platform.' },
];

const fits = [
  'QB trainers and private coaches',
  'Football IQ and film breakdown pages',
  'College and former quarterbacks',
  'Recruiting and football parent accounts',
  'Flag football and 7v7 coaches',
  'Football podcasts and newsletters',
];

const steps = [
  { n: '01', title: 'Apply', text: 'Send a short note with your account or show. It takes two minutes.' },
  { n: '02', title: 'Get the bundle', text: 'We send you all three guides free to look through.' },
  { n: '03', title: 'Share and earn', text: 'You get your link and code. Post when it fits your content and earn on every sale.' },
];

export default function Affiliates() {
  const [form, setForm] = useState({ name: '', email: '', handle: '', audience: '', note: '' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Name: ${form.name}\nEmail: ${form.email}\nAccount / show link: ${form.handle}\nAudience size: ${form.audience}\n\n${form.note}`;
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Affiliate application: ' + form.name)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <section className="relative overflow-hidden bg-nearblack py-24 noise-overlay">
        <div className="container-x relative">
          <p className="eyebrow mb-3 reveal">Affiliate Program</p>
          <h1 className="reveal display-xl text-6xl sm:text-7xl lg:text-8xl text-offwhite">Become an affiliate.</h1>
          <p className="reveal mt-5 max-w-2xl text-base leading-relaxed text-silver">
            Help young quarterbacks get better and earn money doing it. If your audience is QBs, coaches or football parents, recommend the guides you believe in and earn 30% of every sale.
          </p>
          <a href="#apply" className="reveal btn-primary mt-8 inline-flex">Apply now</a>
        </div>
      </section>

      <section className="bg-charcoal py-20">
        <div className="container-x">
          <p className="eyebrow mb-3 reveal">What you get</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map(({ icon: Icon, title, text }) => (
              <div key={title} className="reveal card-surface p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-nearblack text-electric"><Icon className="h-5 w-5" /></div>
                <h3 className="font-headline text-lg font-semibold uppercase tracking-tight text-offwhite">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-nearblack py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div className="reveal">
            <p className="eyebrow mb-3">Who it's for</p>
            <h2 className="display-xl text-4xl sm:text-5xl text-offwhite">Creators who help QBs get better.</h2>
            <ul className="mt-6 space-y-3">
              {fits.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-silver"><span className="h-1.5 w-1.5 rounded-full bg-electric" />{f}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-silver">
              Small accounts are welcome. An engaged audience matters more than follower count.
            </p>
          </div>
          <div className="reveal">
            <p className="eyebrow mb-3">How it works</p>
            <div className="space-y-4">
              {steps.map((s) => (
                <div key={s.n} className="card-surface flex gap-5 p-6">
                  <span className="display-xl text-4xl leading-none text-electric">{s.n}</span>
                  <div>
                    <h3 className="font-headline text-lg font-semibold uppercase tracking-tight text-offwhite">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-silver">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-silver">
              Not sure what you would be promoting? <Link to="/resources" className="text-electric hover:underline">See the guides</Link>.
            </p>
          </div>
        </div>
      </section>

      <section id="apply" className="bg-charcoal py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <div className="reveal space-y-5">
            <p className="eyebrow">Apply</p>
            <h2 className="display-xl text-4xl sm:text-5xl text-offwhite">Let's work together.</h2>
            <p className="text-sm leading-relaxed text-silver">
              Fill this out and it opens an email to us with your details. We reply within a few days.
            </p>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/10 bg-nearblack text-electric"><ShieldCheck className="h-5 w-5" /></div>
              <p className="text-sm leading-relaxed text-silver">
                Affiliates must be 18 or older, or have a parent's permission, and must label sponsored posts (for example #ad or "affiliate link"). College athletes should follow their school's NIL rules.
              </p>
            </div>
            {SUPPORT_EMAIL && (
              <p className="text-sm text-silver">Prefer email? <a href={`mailto:${SUPPORT_EMAIL}?subject=Affiliate%20application`} className="break-all text-electric hover:underline">{SUPPORT_EMAIL}</a></p>
            )}
          </div>

          <form onSubmit={submit} className="reveal card-surface space-y-5 p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
            </div>
            <Field label="Your account or show (link or @handle)" value={form.handle} onChange={(v) => setForm({ ...form, handle: v })} required />
            <Field label="Audience size (optional)" value={form.audience} onChange={(v) => setForm({ ...form, audience: v })} />
            <div>
              <label className="mb-1.5 block font-headline text-xs font-semibold uppercase tracking-wider2 text-silver">Tell us about your audience</label>
              <textarea rows={4} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className="w-full rounded-md border border-white/10 bg-nearblack px-4 py-3 text-sm text-offwhite placeholder-silver/40 outline-none transition-colors focus:border-electric" placeholder="Who follows you, and how you'd share the guides" />
            </div>
            <button type="submit" className="btn-primary w-full">Send my application <Send className="h-4 w-4" /></button>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ label, value, onChange, type = 'text', required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-1.5 block font-headline text-xs font-semibold uppercase tracking-wider2 text-silver">{label}</label>
      <input type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-md border border-white/10 bg-nearblack px-4 py-3 text-sm text-offwhite placeholder-silver/40 outline-none transition-colors focus:border-electric" />
    </div>
  );
}
