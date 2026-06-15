'use client'

import Image from 'next/image'
import { Reveal } from '@/components/reveal'
import { useCart } from '@/lib/cart-context'
import { Minus, Plus } from 'lucide-react'

const products = [
  {
    id: 'premium-elaichi-chai',
    name: 'Premium Elaichi Chai',
    tag: 'Elaichi Tea',
    notes: 'A comforting blend of the finest tea leaves and aromatic green cardamom for a fragrant, refreshing cup.',
    price: '₹400',
    image: '/images/product-matcha.png',
  },
  {
    id: 'signature-natural-blend',
    name: 'Signature Natural Blend',
    tag: 'Natural Tea',
    notes: 'Pure, robust, and classic. Our everyday staple crafted to deliver nature`s true essence in every sip.',
    price: '₹250',
    image: '/images/product-earlgrey.png',
  },
  {
    id: 'authentic-masala-chai',
    name: 'Authentic Masala Chai',
    tag: 'Masala Tea · Best Seller',
    notes: 'An immunity-boosting infusion of premium tea and warming traditional spices for your daily dose of comfort.',
    price: '₹400',
    image: '/images/product-chamomile.png',
  },
]

function QuantityControls({
  productId,
  productName,
}: {
  productId: string
  productName: string
}) {
  const { addItem, updateQuantity, getQuantity } = useCart()
  const qty = getQuantity(productId)

  if (qty === 0) {
    return (
      <button
        type="button"
        onClick={() => addItem(productId, productName)}
        className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-accent-foreground transition-all group-hover:shadow-[0_0_24px_-6px_var(--accent)] hover:brightness-110"
      >
        Add to Cart
      </button>
    )
  }

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => updateQuantity(productId, qty - 1)}
        className="flex size-8 items-center justify-center rounded-full bg-accent text-accent-foreground transition-all hover:brightness-110"
      >
        <Minus className="size-3.5" />
      </button>
      <span className="min-w-[2rem] text-center font-serif text-lg text-foreground">
        {qty}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => updateQuantity(productId, qty + 1)}
        className="flex size-8 items-center justify-center rounded-full bg-accent text-accent-foreground transition-all hover:brightness-110"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  )
}

export function Products() {
  return (
    <section id="products" className="relative px-4 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
            Our Products
          </span>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-balance sm:text-5xl">
            Signature blends, thoughtfully crafted
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Each tin is sealed at peak freshness so every cup tastes exactly as
            our blenders intended.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {products.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 140}
              as="article"
              className="group overflow-hidden rounded-3xl glass transition-all hover:-translate-y-2 hover:shadow-[0_24px_60px_-24px_var(--accent)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary/30">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-primary/10 blur-2xl"
                />
                <Image
                  src={p.image || '/placeholder.svg'}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-7">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
                  {p.tag}
                </span>
                <h3 className="mt-2 font-serif text-2xl text-foreground">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.notes}
                </p>
                <div className="mt-3.5 flex">
                  <span className="inline-flex items-center rounded-full border border-border bg-secondary/35 px-2.5 py-0.5 text-xs font-medium text-muted-foreground/90">
                    500g
                  </span>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="font-serif text-xl text-foreground">
                    {p.price}
                  </span>
                  <QuantityControls
                    productId={p.id}
                    productName={p.name}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
