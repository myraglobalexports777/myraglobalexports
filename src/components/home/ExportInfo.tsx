const SHIPMENT_TERMS = [
  { code: 'FOB', name: 'Free On Board' },
  { code: 'CIF', name: 'Cost, Insurance & Freight' },
  { code: 'CNF', name: 'Cost & Freight' },
  { code: 'EXW', name: 'Ex Works' },
]

const PROCESS_STEPS = [
  { num: '01', title: 'Inquiry & Quotation', desc: 'Buyer shares requirement; Myra Global issues a formal quotation.' },
  { num: '02', title: 'Order Confirmation', desc: 'Terms, quantity, and payment method finalized between both parties.' },
  { num: '03', title: 'Quality Sourcing & Packing', desc: 'Produce sourced, quality-checked, and packed per buyer specification.' },
  { num: '04', title: 'Port Loading', desc: 'Container loaded and cleared for export via JNPT / Mumbai Port.' },
  { num: '05', title: 'Shipment & Delivery', desc: 'Goods shipped and tracked through to the buyer’s destination port.' },
]

export function ExportInfo() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <span className="block h-px w-10 bg-slate shrink-0" />
              <p className="text-[11px] font-sans uppercase tracking-[0.3em] text-steel">
                How We Export
              </p>
            </div>
            <h2
              className="font-heading font-semibold text-navy leading-tight"
              style={{ fontSize: 'clamp(26px, 3vw, 28px)' }}
            >
              Export <span className="">Information</span>
            </h2>
          </div>
          <p className="text-slate-dark/55 text-sm font-sans max-w-xs leading-relaxed">
            Shipments loaded via JNPT / Mumbai Port, on shipment terms discussed and agreed at
            quotation stage.
          </p>
        </div>

        {/* Shipment terms */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-steel/10 mb-16">
          {SHIPMENT_TERMS.map(({ code, name }) => (
            <div key={code} className="bg-white p-6 text-center">
              <p className="font-heading text-2xl font-semibold text-navy">{code}</p>
              <p className="text-slate-dark/55 text-[13px] font-sans mt-1">{name}</p>
            </div>
          ))}
        </div>

        {/* Shipping process */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-8">
          {PROCESS_STEPS.map(({ num, title, desc }, i) => (
            <div key={num} className="relative">
              <p className="font-heading text-[2.5rem] font-light text-steel/30 leading-none mb-4">
                {num}
              </p>
              <h3 className="font-heading text-base font-semibold text-navy mb-2">
                {title}
              </h3>
              <p className="text-slate-dark/55 text-[13px] font-sans leading-relaxed">{desc}</p>
              {i < PROCESS_STEPS.length - 1 && (
                <span className="hidden sm:block absolute top-5 -right-4 w-8 h-px bg-steel/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
