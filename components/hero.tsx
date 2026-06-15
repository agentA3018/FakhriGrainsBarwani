import Image from 'next/image'
import { Reveal } from '@/components/reveal'

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pt-36 pb-20 sm:pt-44 lg:pb-28"
    >
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 size-[28rem] rounded-full bg-accent/15 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Organic · Single Estate · Since 2024
            </span>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Tea, brewed to{' '}
              <span className="text-primary italic">perfection</span>
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-muted-foreground lg:mx-0">
              From mist-covered hillsides to your cup. We craft small-batch
              organic teas that honor centuries of heritage and the art of slow
              living.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <a
                href="#products"
                className="group w-full rounded-full bg-accent px-7 py-3.5 text-center font-medium text-accent-foreground transition-all hover:scale-[1.03] hover:shadow-[0_0_32px_-6px_var(--accent)] sm:w-auto"
              >
                Explore Our Blends
              </a>
              <a
                href="#brand"
                className="w-full rounded-full glass px-7 py-3.5 text-center font-medium text-foreground transition-all hover:scale-[1.03] hover:brightness-110 sm:w-auto"
              >
                Our Story
              </a>
            </div>
          </Reveal>
        </div>

        {/* 3D floating visual */}
        <Reveal delay={200} className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-square">
            <div
              aria-hidden
              className="absolute inset-6 rounded-full bg-primary/25 blur-3xl"
            />
            <div className="animate-float-slow relative h-full w-full drop-shadow-2xl">
              <Image
                src="/images/hero-tea-cup.png"
                alt="Premium glass cup of matcha tea with floating tea leaves"
                fill
                priority
                className="object-contain"
              />
            </div>
            {/* floating accent leaves */}
            <div className="animate-float-leaf absolute right-2 top-6 size-3 rounded-full bg-accent/70 blur-[1px]" />
            <div className="animate-float-leaf absolute left-4 bottom-12 size-2.5 rounded-full bg-gold blur-[1px] [animation-delay:1.5s]" />
            <div className="animate-float-leaf absolute left-10 top-10 size-2 rounded-full bg-primary blur-[1px] [animation-delay:3s]" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
