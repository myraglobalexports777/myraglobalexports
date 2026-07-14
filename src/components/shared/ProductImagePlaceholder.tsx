import { buildPlaceholderGradient } from '@/lib/placeholder'

type Props = {
  emoji: string | null
  accentColor: string | null
  className?: string
}

export function ProductImagePlaceholder({ emoji, accentColor, className }: Props) {
  const color = accentColor ?? '#1C3D69'
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className ?? ''}`}
      style={{ background: buildPlaceholderGradient(color) }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z' fill='none' stroke='rgba(0,0,0,0.05)' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />
      <span className="relative select-none text-5xl" aria-hidden="true">
        {emoji || '🌾'}
      </span>
    </div>
  )
}
