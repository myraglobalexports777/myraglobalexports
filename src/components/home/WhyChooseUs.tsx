const REASONS = [
  {
    num: '01',
    title: 'Premium Quality',
    desc: 'Strictly selected produce meeting international food safety standards at every step.',
  },
  {
    num: '02',
    title: 'Global Reach',
    desc: 'Export to 30+ countries across Asia, Middle East, Europe, and Africa.',
  },
  {
    num: '03',
    title: 'Certified & Compliant',
    desc: 'GST, IEC, APEDA, and FSSAI certified — all regulatory requirements met.',
  },
  {
    num: '04',
    title: 'On-Time Delivery',
    desc: 'Reliable logistics partners ensuring timely shipments worldwide.',
  },
  {
    num: '05',
    title: 'Dedicated Support',
    desc: 'Responsive team for every step from inquiry to final delivery.',
  },
  {
    num: '06',
    title: 'Custom Packaging',
    desc: 'Flexible packaging options tailored precisely to buyer requirements.',
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-white border-y border-steel/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Title column */}
          <div className="lg:col-span-1 lg:sticky lg:top-32 lg:self-start">
            <div className="flex items-center gap-4 mb-8">
              <span className="block h-px w-10 bg-slate shrink-0" />
              <p className="text-[11px] font-sans uppercase tracking-[0.3em] text-steel">
                Our Strengths
              </p>
            </div>
            <h2
              className="font-heading font-semibold text-navy leading-[1.05] mb-4"
              style={{ fontSize: 'clamp(26px, 3vw, 28px)' }}
            >
              Why Choose<br />
              <span className="">Myra Global?</span>
            </h2>
            <p className="text-slate-dark/55 font-sans text-sm leading-relaxed">
              Your dedicated partner for premium agricultural exports from India to the world.
            </p>
          </div>

          {/* Feature grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-px bg-steel/10">
            {REASONS.map(({ num, title, desc }) => (
              <div
                key={title}
                className="bg-white p-8 hover:bg-white transition-colors duration-200 group"
              >
                <p className="font-heading text-[3rem] font-light text-steel/25 leading-none mb-5 group-hover:text-steel/45 transition-colors duration-200">
                  {num}
                </p>
                <h3 className="font-heading text-xl font-semibold text-navy mb-2.5">{title}</h3>
                <p className="text-slate-dark/55 text-[14px] font-sans leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
