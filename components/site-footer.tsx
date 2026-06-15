'use client'

import { useState, type FormEvent } from 'react'
import { Reveal } from '@/components/reveal'
import { Mail, Phone, MapPin, Package, CheckCircle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import emailjs from '@emailjs/browser'
import { useCart } from '@/lib/cart-context'
import {
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
} from '@/lib/emailjs-config'

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 12c0 5.52-4.48 10-10 10-1.72 0-3.34-.43-4.78-1.21L2 22l1.24-5.02C2.45 15.54 2 13.82 2 12 2 6.48 6.48 2 12 2s10 4.48 10 10Z" />
      <path d="M16.5 13.5c-.5-.25-2.75-1.35-3.15-1.5-.42-.15-.72-.22-1 .22-.3.44-1.1 1.35-1.35 1.62-.25.3-.5.3-1 0a7.06 7.06 0 0 1-2.62-1.62A7.8 7.8 0 0 1 6 10c0-.5.25-.75.5-1 .22-.22.44-.5.66-.75.22-.22.3-.38.44-.68.15-.3.07-.56-.04-.78-.1-.22-.85-2.05-1.15-2.77-.3-.7-.6-.6-.85-.6h-.68c-.22 0-.6.08-.9.4A2.78 2.78 0 0 0 3.3 6.8c0 1.87.8 3.68 2.1 5.4 1.3 1.73 3 2.92 4.7 3.5.52.18.94.3 1.25.4.52.16 1 .14 1.37.08.42-.06 1.35-.55 1.54-1.08.2-.53.2-1 .14-1.08-.06-.1-.26-.2-.76-.45Z" />
    </svg>
  )
}

const socials = [
  { icon: InstagramIcon, label: 'Instagram', href: 'https://www.instagram.com/fgb_tea?igsh=MWMyYmFjNHVlcXVqcQ==' },
  { icon: FacebookIcon, label: 'Facebook', href: 'https://www.facebook.com/share/1H5Yhp8ug9/' },
  { icon: WhatsAppIcon, label: 'WhatsApp', href: 'https://chat.whatsapp.com/BlSPF2rKwKG5driJPe1uHE' },
]

const contacts = [
  { icon: Mail, label: 'fakhrigrainsbarwani53@gmail.com', href: 'mailto:fakhrigrainsbarwani53@gmail.com' },
  { icon: Phone, label: '+91 70008 51364', href: 'tel:+917000851364' },
  { icon: MapPin, label: 'Barwani, Madhya Pradesh, India', href: 'https://maps.google.com/?q=Barwani,+Madhya+Pradesh,+India' },
]

/* ── Input class (reused from existing email input) ──── */
const inputCls =
  'w-full rounded-full border border-border bg-secondary/40 px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none'

/* ── Form state types ────────────────────────────────── */
interface FormData {
  fullName: string
  phone: string
  email: string
  company: string
  city: string
  message: string
}

interface FormErrors {
  fullName?: string
  phone?: string
  email?: string
}

const initialForm: FormData = {
  fullName: '',
  phone: '',
  email: '',
  company: '',
  city: '',
  message: '',
}

/* ── Validation ──────────────────────────────────────── */
function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.fullName.trim()) errors.fullName = 'Full name is required.'
  if (!data.phone.trim()) errors.phone = 'Phone number is required.'
  if (!data.email.trim()) {
    errors.email = 'Email address is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Enter a valid email address.'
  }
  return errors
}

export function SiteFooter() {
  const { items, clearCart } = useCart()

  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const hasProducts = items.length > 0

  /* ── Field change handler ──────────────────────────── */
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    /* Clear field error on change */
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  /* ── Submit handler ────────────────────────────────── */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const validationErrors = validate(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('sending')

    const now = new Date()
    const submissionDate = now.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    const submissionTime = now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    })

    const productList =
      items.length > 0
        ? items.map((i) => `${i.productName} — ${i.quantity}`).join('\n')
        : 'No products selected'

    const templateParams = {
      customer_name: form.fullName,
      customer_company: form.company || 'N/A',
      customer_phone: form.phone,
      customer_email: form.email,
      customer_location: form.city || 'N/A',
      customer_message: form.message || 'No message provided.',
      product_list: productList,
      submission_date: submissionDate,
      submission_time: submissionTime,
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      )
      setStatus('success')
      setForm(initialForm)
      clearCart()

      /* Auto-dismiss success after 5 seconds */
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <footer id="contact" className="relative px-4 pb-10 pt-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="overflow-hidden rounded-[2.5rem] glass p-8 sm:p-12">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* ── Left column: form ─────────────────── */}
            <div>
              <h2 className="font-serif text-4xl leading-tight text-balance sm:text-5xl">
                Tell Us What You Need
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
                Share your requirements and we'll get back to you with product availability and supply details.
              </p>

              {/* ── Inquiry summary (only when cart has items) ── */}
              {hasProducts && (
                <div className="mt-6 rounded-2xl glass p-5">
                  <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-gold">
                    <Package className="size-4" />
                    Selected Products
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {items.map((item) => (
                      <li
                        key={item.productId}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-foreground">{item.productName}</span>
                        <span className="font-serif text-muted-foreground">
                          Qty: {item.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ── Form ──────────────────────────────── */}
              <form
                onSubmit={handleSubmit}
                className="mt-7 flex max-w-md flex-col gap-3"
              >
                {/* Full Name (required) */}
                <div>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={onChange}
                    placeholder="Full Name *"
                    aria-label="Full Name"
                    className={inputCls}
                  />
                  {errors.fullName && (
                    <p className="mt-1 px-5 text-xs text-destructive">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Phone (required) */}
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    placeholder="Phone Number *"
                    aria-label="Phone Number"
                    className={inputCls}
                  />
                  {errors.phone && (
                    <p className="mt-1 px-5 text-xs text-destructive">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Email (required) */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="Email Address *"
                    aria-label="Email Address"
                    className={inputCls}
                  />
                  {errors.email && (
                    <p className="mt-1 px-5 text-xs text-destructive">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Company (optional) */}
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={onChange}
                  placeholder="Company Name (optional)"
                  aria-label="Company Name"
                  className={inputCls}
                />

                {/* City (optional) */}
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={onChange}
                  placeholder="City / Location (optional)"
                  aria-label="City or Location"
                  className={inputCls}
                />

                {/* Message (optional) */}
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  placeholder="Message (optional)"
                  aria-label="Message"
                  rows={3}
                  className="w-full rounded-2xl border border-border bg-secondary/40 px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none resize-none"
                />

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-all hover:scale-[1.03] hover:shadow-[0_0_24px_-6px_var(--accent)] disabled:opacity-60 disabled:hover:scale-100"
                >
                  {status === 'sending' ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="size-4 animate-spin" />
                      Sending Inquiry…
                    </span>
                  ) : (
                    'Send Inquiry'
                  )}
                </button>

                {/* Status messages */}
                {status === 'success' && (
                  <div className="flex items-center gap-2 rounded-full glass px-5 py-3 text-sm text-primary">
                    <CheckCircle className="size-4" />
                    Inquiry sent successfully! We&apos;ll be in touch soon.
                  </div>
                )}
                {status === 'error' && (
                  <p className="px-5 text-sm text-destructive">
                    Something went wrong. Please try again or contact us directly.
                  </p>
                )}
              </form>
            </div>

            {/* ── Right column: contact + socials (untouched) ── */}
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-gold">
                  Get in Touch
                </h3>
                <ul className="mt-4 space-y-3">
                  {contacts.map((c) => (
                    <li key={c.label}>
                      <a
                        href={c.href}
                        className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <c.icon className="size-4 text-primary shrink-0" />
                        <span className="break-words">{c.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-gold">
                  Follow Along
                </h3>
                <div className="mt-4 flex gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="flex size-10 items-center justify-center rounded-full bg-secondary/50 text-foreground ring-1 ring-border transition-all hover:scale-110 hover:bg-accent hover:text-accent-foreground"
                    >
                      <s.icon className="size-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Footer bottom bar (untouched) ──────────── */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <div className="flex items-center gap-2">
            <Image
              src="/images/fgb-logo.png"
              alt="Fakhri Grains Barwani logo"
              width={32}
              height={32}
              className="size-8 rounded-full object-cover"
            />
            <span className="font-serif text-base font-semibold text-foreground">
              Fakhri Grains
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Fakhri Grains Barwani. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
