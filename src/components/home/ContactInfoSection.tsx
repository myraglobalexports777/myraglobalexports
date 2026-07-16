type ContactData = {
  phone?: string | null
  whatsapp?: string | null
  email?: string | null
  businessHours?: string | null
}

type Props = { contact: ContactData }

type ContactItem = {
  label: string
  value: string | null | undefined
  href?: string
}

export function ContactInfoSection({ contact }: Props) {
  const items: ContactItem[] = [
    {
      label: 'Phone',
      value: contact.phone,
      href: contact.phone ? `tel:${contact.phone}` : undefined,
    },
    {
      label: 'WhatsApp',
      value: contact.whatsapp,
      href: contact.whatsapp
        ? `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`
        : undefined,
    },
    {
      label: 'Email',
      value: contact.email,
      href: contact.email ? `mailto:${contact.email}` : undefined,
    },
    {
      label: 'Business Hours',
      value: contact.businessHours,
    },
  ].filter((i): i is ContactItem & { value: string } => Boolean(i.value))

  if (items.length === 0) return null

  return (
    <section className="py-16 bg-white border-t border-steel/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center gap-4 mb-10 justify-center">
          <span className="block h-px w-10 bg-slate shrink-0" />
          <h2 className="text-[11px] font-sans uppercase tracking-[0.3em] text-steel">
            Get in Touch
          </h2>
          <span className="block h-px w-10 bg-slate shrink-0" />
        </div>
        <div className="grid grid-cols-1 gap-px bg-steel/10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ label, value, href }) => (
            <div key={label} className="bg-white p-8 text-center hover:bg-white transition-colors">
              <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-steel mb-3">
                {label}
              </p>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="font-heading text-lg font-light text-navy hover:text-steel transition-colors"
                >
                  {value}
                </a>
              ) : (
                <p className="font-heading text-lg font-light text-slate-dark">{value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
