type Props = { href: string; label: string; className?: string }

export function PDFDownloadButton({ href, label, className = '' }: Props) {
  return (
    <a
      href={href}
      download
      className={`inline-flex items-center gap-2 rounded-md bg-slate px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-dark ${className}`}
    >
      <span aria-hidden="true">📄</span> {label}
    </a>
  )
}
