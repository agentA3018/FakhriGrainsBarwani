import { Reveal } from '@/components/reveal'
import { Shield, Zap, Wind, HeartPulse, Sparkles, Moon } from 'lucide-react'

const benefits = [
  {
    icon: Shield,
    title: 'Rich in Antioxidants',
    desc: 'Polyphenols and catechins help fight free radicals and support cellular health.',
  },
  {
    icon: Zap,
    title: 'Natural Energy',
    desc: 'A smooth, sustained lift from L-theanine and caffeine without the crash.',
  },
  {
    icon: Wind,
    title: 'Calm & Clarity',
    desc: 'Herbal infusions ease tension and bring a quiet focus to your day.',
  },
  {
    icon: HeartPulse,
    title: 'Heart Wellness',
    desc: 'Regular tea drinking is linked to healthier circulation and vitality.',
  },
  {
    icon: Sparkles,
    title: 'Radiant Skin',
    desc: 'Antioxidant-rich blends nourish your skin from the inside out.',
  },
  {
    icon: Moon,
    title: 'Restful Sleep',
    desc: 'Caffeine-free botanicals like chamomile gently guide you to rest.',
  },
]

export function Benefits() {
  return (
    <section id="benefits" className="relative px-4 py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 size-[32rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
      />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
            Health Benefits
          </span>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-balance sm:text-5xl">
            Wellness in every infusion
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Beyond its taste, tea has nourished body and mind for millennia.
            Here&apos;s what your daily ritual gives back.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal
              key={b.title}
              delay={(i % 3) * 120}
              as="article"
              className="group rounded-2xl glass p-7 transition-all hover:-translate-y-1.5 hover:shadow-[0_18px_48px_-20px_var(--primary)]"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/25 transition-transform group-hover:scale-110">
                <b.icon className="size-6" />
              </span>
              <h3 className="mt-5 font-serif text-xl text-foreground">
                {b.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {b.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
