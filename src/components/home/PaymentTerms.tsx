const TERMS = [
  {
    code: 'TT',
    title: 'Telegraphic Transfer',
    desc: 'Direct bank-to-bank wire transfer — the fastest and most common method for international trade payments.',
  },
  {
    code: 'LC',
    title: 'Letter of Credit',
    desc: "A bank-backed guarantee of payment, issued by the buyer's bank in favor of Myra Global, released on shipment terms.",
  },
]

export function PaymentTerms() {
  return (
    <section className="py-24 bg-white border-y border-steel/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1 lg:sticky lg:top-32 lg:self-start">
            <div className="flex items-center gap-4 mb-8">
              <span className="block h-px w-10 bg-slate shrink-0" />
              <p className="text-[11px] font-sans uppercase tracking-[0.3em] text-steel">
                Trade Terms
              </p>
            </div>
            <h2
              className="font-heading font-semibold text-navy leading-[1.05] mb-4"
              style={{ fontSize: 'clamp(26px, 3vw, 28px)' }}
            >
              Payment<br />
              <span className="">Terms</span>
            </h2>
            <p className="text-slate-dark/55 font-sans text-sm leading-relaxed">
              Payment terms are finalized based on mutual agreement and international trade
              standards. Buyers are welcome to discuss their preferred payment method while
              requesting a quotation.
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-px bg-steel/10">
            {TERMS.map(({ code, title, desc }) => (
              <div
                key={code}
                className="bg-white p-8 hover:bg-white transition-colors duration-200 group"
              >
                <p className="font-heading text-[3rem] font-light text-steel/25 leading-none mb-5 group-hover:text-steel/45 transition-colors duration-200">
                  {code}
                </p>
                <h3 className="font-heading text-xl font-semibold text-navy mb-2.5">
                  {title}
                </h3>
                <p className="text-slate-dark/55 text-[14px] font-sans leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
