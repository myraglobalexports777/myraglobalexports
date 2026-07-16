'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import {
  Mail,
  Search,
  Receipt,
  CheckCircle2,
  PackageCheck,
  FileText,
  Ship,
  Handshake,
  type LucideIcon,
} from 'lucide-react'
import { siteSettings } from '@/data/site-settings'

type Step = {
  icon: LucideIcon
  title: string
  description: string
  details?: string[]
}

const STEPS: Step[] = [
  {
    icon: Mail,
    title: 'Send Your Inquiry',
    description:
      'Share your product requirements through our inquiry form, WhatsApp, or email.',
    details: ['Product Name', 'Quantity', 'Destination Country', 'Packaging Preference', 'Special Requirements (if any)'],
  },
  {
    icon: Search,
    title: 'Requirement Analysis',
    description:
      'Our export team carefully reviews your requirements and recommends the most suitable product, packaging, and shipping solution.',
  },
  {
    icon: Receipt,
    title: 'Receive Quotation',
    description: 'We send a detailed quotation including:',
    details: ['Product Price', 'Packaging Details', 'MOQ (Minimum Order Quantity)', 'Delivery Timeline', 'Shipping Terms (FOB / CIF / EXW)'],
  },
  {
    icon: CheckCircle2,
    title: 'Order Confirmation',
    description:
      'Once the quotation is approved, the buyer confirms the order by issuing a Purchase Order (PO) or confirming via email.',
  },
  {
    icon: PackageCheck,
    title: 'Quality Inspection & Packaging',
    description:
      'Every product is inspected for quality and packed using export-standard packaging to ensure freshness and safe transportation.',
  },
  {
    icon: FileText,
    title: 'Documentation',
    description: 'We prepare all necessary export documents, including:',
    details: [
      'Commercial Invoice',
      'Packing List',
      'Bill of Lading / Air Waybill',
      'Certificate of Origin (if required)',
      'Phytosanitary Certificate (if applicable)',
    ],
  },
  {
    icon: Ship,
    title: 'Shipping & Delivery',
    description:
      'The shipment is dispatched through trusted logistics partners, and tracking details are shared with the buyer until the goods reach the destination safely.',
  },
  {
    icon: Handshake,
    title: 'After-Sales Support',
    description:
      "Our relationship doesn't end with delivery. We provide continuous support for future orders and long-term business partnerships.",
  },
]

function StepItem({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -60px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const Icon = step.icon

  return (
    <div ref={ref} className="relative flex gap-6 sm:gap-8 pb-14 last:pb-0">
      {/* Connector line */}
      {index < STEPS.length - 1 && (
        <span
          className="absolute left-[27px] sm:left-8 top-14 bottom-0 w-px bg-steel/25"
          aria-hidden="true"
        />
      )}

      {/* Numbered circle */}
      <div
        className={`relative z-10 flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full bg-navy transition-all duration-700 ease-out ${
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
        style={{ transitionDelay: visible ? `${index * 60}ms` : '0ms' }}
      >
        <Icon className="h-6 w-6 text-white" strokeWidth={1.8} aria-hidden="true" />
        <span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-steel text-[11px] font-sans font-semibold text-white ring-2 ring-white">
          {index + 1}
        </span>
      </div>

      {/* Content */}
      <div
        className={`flex-1 pt-1.5 transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
        style={{ transitionDelay: visible ? `${index * 60 + 80}ms` : '0ms' }}
      >
        <h3 className="font-heading text-[19px] font-semibold text-navy mb-2 leading-tight">
          {step.title}
        </h3>
        <p className="text-slate-dark/60 font-sans text-[14px] sm:text-[15px] leading-relaxed max-w-xl">
          {step.description}
        </p>
        {step.details && (
          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 max-w-xl">
            {step.details.map((detail) => (
              <li
                key={detail}
                className="flex items-start gap-2 text-[13px] font-sans text-slate-dark/55"
              >
                <span className="mt-1.5 block h-1 w-1 rounded-full bg-steel shrink-0" />
                {detail}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export function HowItWorksSection() {
  const whatsappHref = siteSettings.social.whatsapp ?? 'https://wa.me/918169213274'

  return (
    <section className="py-24 bg-white border-y border-steel/30">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="block h-px w-10 bg-slate shrink-0" />
            <p className="text-[11px] font-sans uppercase tracking-[0.3em] text-steel">
              How It Works
            </p>
            <span className="block h-px w-10 bg-slate shrink-0" />
          </div>
          <h2
            className="font-heading font-semibold text-navy leading-tight mb-4"
            style={{ fontSize: 'clamp(26px, 3vw, 28px)' }}
          >
            From Inquiry to Successful Delivery
          </h2>
          <p className="text-slate-dark/60 font-sans text-sm sm:text-[15px] leading-relaxed max-w-2xl mx-auto">
            Our simple and transparent export process ensures a smooth experience for
            buyers worldwide. From your first inquiry to the final shipment, MYRA GLOBAL
            is committed to delivering quality products with complete support.
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          {STEPS.map((step, i) => (
            <StepItem key={step.title} step={step} index={i} />
          ))}
        </div>

        {/* Final CTA */}
        <div className="text-center border-t border-steel/30 pt-16">
          <h3
            className="font-heading font-semibold text-navy leading-tight mb-4"
            style={{ fontSize: 'clamp(22px, 2.6vw, 26px)' }}
          >
            Ready to Import Premium Agricultural Products from India?
          </h3>
          <p className="text-slate-dark/60 font-sans text-sm sm:text-[15px] leading-relaxed max-w-2xl mx-auto mb-8">
            Partner with MYRA GLOBAL for premium quality agricultural products,
            competitive pricing, reliable shipping, and complete export support.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/get-quote"
              className="rounded-md bg-slate px-8 py-3.5 text-[12px] font-sans font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-slate-dark"
            >
              Get a Quote
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-slate px-8 py-3.5 text-[12px] font-sans font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-slate-dark"
            >
              WhatsApp Us
            </a>
            <Link
              href="/contact"
              className="rounded-md border border-slate/20 px-8 py-3.5 text-[12px] font-sans font-semibold uppercase tracking-[0.14em] text-slate-dark/60 transition-all hover:border-navy hover:text-navy"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
