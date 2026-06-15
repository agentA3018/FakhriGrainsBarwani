import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Brand } from '@/components/brand'
import { Benefits } from '@/components/benefits'
import { Products } from '@/components/products'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <SiteHeader />
      <Hero />
      <Brand />
      <Benefits />
      <Products />
      <SiteFooter />
    </main>
  )
}
