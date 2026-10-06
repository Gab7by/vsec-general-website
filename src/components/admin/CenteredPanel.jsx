import AdminCard from './AdminCard'

export default function CenteredPanel({ title, children }) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-6">
          <img src="/vsec-logo.png" alt="" className="w-12 h-12 object-contain" />
          <div>
            <p className="text-lg font-black" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>VSEC College</p>
            <p className="text-xs uppercase tracking-widest font-bold" style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-heading)' }}>Admissions Admin</p>
          </div>
        </div>
        <AdminCard className="p-6 sm:p-8">
          <h1 className="text-xl font-black mb-5" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>{title}</h1>
          {children}
        </AdminCard>
      </div>
    </main>
  )
}
