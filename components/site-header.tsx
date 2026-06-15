'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const links = [
  { label: 'Our Brand', href: '#brand' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'Products', href: '#products' },
  { label: 'Contact', href: '#contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between gap-4 rounded-full glass px-5 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-2">
          <Image
            src="/images/fgb-logo.png"
            alt="Fakhri Grains Barwani logo"
            width={36}
            height={36}
            className="size-9 rounded-full object-cover"
          />
          <span className="font-serif text-lg font-semibold tracking-wide text-foreground">
            Fakhri Grains
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#products"
          className="hidden rounded-full bg-accent px-5 py-2 text-sm font-medium text-accent-foreground transition-all hover:shadow-[0_0_24px_-4px_var(--accent)] hover:brightness-110 md:inline-block"
        >
          Shop Collection
        </a>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex size-9 items-center justify-center rounded-full text-foreground md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl glass p-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#products"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-accent px-5 py-2 text-center text-sm font-medium text-accent-foreground"
            >
              Shop Collection
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
