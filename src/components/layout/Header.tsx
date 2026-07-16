'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/certifications', label: 'Certifications' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/partners', label: 'Partners' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 bg-navy ${
        scrolled ? 'shadow-[0_1px_16px_rgba(0,0,0,0.18)]' : ''
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/logo.png"
            alt="Myra Global Exports"
            width={52}
            height={52}
            className="object-contain brightness-0 invert"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="relative px-3 py-2 text-[11.5px] font-sans font-medium uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-white group"
            >
              {label}
              <span className="absolute bottom-1 left-3 right-3 h-px bg-white origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
          ))}
          <Link
            href="/get-quote"
            className="ml-4 rounded-md bg-slate px-5 py-2.5 text-[11.5px] font-sans font-semibold uppercase tracking-[0.12em] text-white transition-all duration-200 hover:bg-slate-dark"
          >
            Get Quote
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-1 text-white/80"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-white/15 bg-navy px-6 pb-6 lg:hidden">
          <div className="flex flex-col pt-2">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="border-b border-white/10 py-3 text-[11px] font-sans font-medium uppercase tracking-[0.15em] text-white/70 hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/get-quote"
              className="mt-5 rounded-md bg-slate py-3 text-center text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-white"
              onClick={() => setMobileOpen(false)}
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
