import { Reveal } from '@/components/reveal'
import { Sprout, MapPinned, Award } from 'lucide-react'

const stats = [
  { icon: Sprout, value: '3+', label: 'Years of Trusted Growth' },
  { icon: MapPinned, value: '12', label: 'States & Cities Served' },
  { icon: Award, value: '100%', label: 'Commitment to Quality' },
]

export function Brand() {
  return (
    <section id="brand" className="relative px-4 py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
            Our Brand
          </span>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-balance sm:text-5xl">
            A legacy built on trust, quality and consistency
          </h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            In just a few years, Fakhri Grains Barwani has established itself as
            a trusted name in the agricultural products market. What began with a
            commitment to quality and customer satisfaction has grown into a network
            serving clients across multiple states and cities across India, delivering products 
            that businesses and consumers can rely on.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Our focus has always been simple — source quality products, maintain consistent 
            standards, and build long-term relationships through honest business practices. 
            Every order reflects our dedication to reliability, transparency, and customer trust.
          </p>

          <p className="mt-4 leading-relaxed text-muted-foreground">
            "We don't just supply products. We build trust through consistency, quality, and dependable service."
          </p>

          <p className="mt-4 leading-relaxed text-muted-foreground">
            - Fakhri Grains Barwani
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 120}
                className="rounded-2xl glass p-5 text-center transition-transform hover:scale-[1.04]"
              >
                <s.icon className="mx-auto mb-2 size-5 text-primary" />
                <div className="font-serif text-2xl text-foreground">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {s.label}
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150} className="relative">
          <div
            aria-hidden
            className="absolute -inset-4 rounded-[2rem] bg-primary/15 blur-2xl"
          />
          <div className="relative overflow-hidden rounded-[2rem] glass p-2">
            <div className="rounded-[1.6rem] bg-secondary/40 p-8">
              <blockquote className="font-serif text-2xl leading-snug text-balance text-foreground sm:text-3xl">
                &ldquo;We don&apos;t manufacture tea. We coax it, gently, from
                leaf to legacy.&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-full bg-accent/20 font-serif text-accent">
                  F
                </span>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    FGB Family
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Blended with Care & Perfection
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
