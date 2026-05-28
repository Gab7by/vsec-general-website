const stats = [
  { value: '500+', label: 'Students Enrolled', description: 'Adults and entrepreneurs trust VSEC' },
  { value: '4', label: 'Program Areas', description: 'English, Business, IT, Professional Dev' },
  { value: '98%', label: 'Satisfaction Rate', description: 'Based on student feedback surveys' },
  { value: '100%', label: 'Practical Focus', description: 'Every lesson built for real-world use' },
]

export default function Stats() {
  return (
    <section style={{ backgroundColor: 'var(--color-primary)' }}>
      {/* Gold top accent line */}
      <div className="h-1" style={{ backgroundColor: 'var(--color-gold)' }} aria-hidden="true" />

      <div className="section py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {stats.map(({ value, label, description }) => (
            <div key={label} className="text-center">
              <p
                className="text-4xl md:text-5xl font-black mb-1"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}
              >
                {value}
              </p>
              <p
                className="font-bold text-sm mb-1 text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {label}
              </p>
              <p
                className="text-xs leading-relaxed hidden md:block"
                style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.6)' }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Gold bottom accent line */}
      <div className="h-1" style={{ backgroundColor: 'var(--color-gold)' }} aria-hidden="true" />
    </section>
  )
}
