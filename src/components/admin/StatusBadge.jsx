import { statusInfo } from '../../lib/admissions'

export default function StatusBadge({ status, size = 'sm' }) {
  const { label, color, background } = statusInfo(status)
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold whitespace-nowrap ${size === 'lg' ? 'px-3 py-1 text-sm' : 'px-2.5 py-0.5 text-xs'}`}
      style={{ color, backgroundColor: background, fontFamily: 'var(--font-heading)' }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
      {label}
    </span>
  )
}
