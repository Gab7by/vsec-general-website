import { CheckCircle } from 'lucide-react'

export default function SuccessCard({ title = 'Application Submitted!', children }) {
  return (
    <div
      role="status"
      className="rounded-2xl p-8 sm:p-12 text-center border bg-white"
      style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-md)' }}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ backgroundColor: 'var(--color-blue-tint)' }}
      >
        <CheckCircle size={32} style={{ color: 'var(--color-primary)' }} strokeWidth={1.75} />
      </div>
      <h2
        className="text-2xl font-black mb-3"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
      >
        {title}
      </h2>
      <div
        className="text-base leading-relaxed space-y-3"
        style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
      >
        {children}
      </div>
    </div>
  )
}
