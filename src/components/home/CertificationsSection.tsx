import Image from 'next/image'

type CertImage = {
  url?: string | null
  alt?: string | null
}

type Certificate = {
  id: string
  title: string
  certificateNumber?: string | null
  image?: CertImage | null
}

type Props = { certificates: Certificate[] }

const MOCK_CERTS: Certificate[] = [
  { id: 'c1', title: 'APEDA', certificateNumber: 'Agri & Processed Food Export' },
  { id: 'c2', title: 'FSSAI', certificateNumber: 'Food Safety Standards Authority' },
  { id: 'c3', title: 'IEC', certificateNumber: 'Import Export Code' },
  { id: 'c4', title: 'GST', certificateNumber: 'Goods & Services Tax Reg.' },
]

export function CertificationsSection({ certificates }: Props) {
  const displayCerts = certificates.length > 0 ? certificates : MOCK_CERTS

  return (
    <section className="py-24 bg-white border-y border-steel/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
          {/* Label */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="block h-px w-10 bg-slate shrink-0" />
              <p className="text-[11px] font-sans uppercase tracking-[0.3em] text-steel">
                Compliance
              </p>
            </div>
            <h2
              className="font-heading font-semibold text-navy leading-tight mb-4"
              style={{ fontSize: 'clamp(26px, 3vw, 28px)' }}
            >
              Certified &amp;<br />
              <span className="">Compliant</span>
            </h2>
            <p className="text-slate-dark/55 font-sans text-sm leading-relaxed">
              All operations meet international quality and food safety standards.
            </p>
          </div>

          {/* Cert cards */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-px bg-steel/10">
            {displayCerts.map((cert) => (
              <div
                key={cert.id}
                className="bg-white p-7 flex flex-col items-center text-center hover:bg-white transition-colors"
              >
                {cert.image?.url ? (
                  <Image
                    src={cert.image.url}
                    alt={cert.image.alt ?? cert.title}
                    width={72}
                    height={72}
                    className="mb-4 object-contain"
                  />
                ) : (
                  <div
                    className="mb-4 flex h-14 w-14 items-center justify-center bg-navy/8 border border-steel/30"
                    aria-hidden="true"
                  >
                    <span className="font-heading text-lg font-bold text-navy">
                      {cert.title.slice(0, 2)}
                    </span>
                  </div>
                )}
                <p className="font-heading text-base font-semibold text-navy">{cert.title}</p>
                {cert.certificateNumber && (
                  <p className="mt-1 text-[11px] font-sans text-steel leading-tight">
                    {cert.certificateNumber}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
