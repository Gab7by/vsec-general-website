import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { programs } from '../data/programs'
import CTABanner from '../components/CTABanner'

const ALL = 'all'

export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState(ALL)

  const filters = [
    { id: ALL, label: 'All Courses' },
    ...programs.map(p => ({ id: p.id, label: p.tag })),
  ]

  const visiblePrograms =
    activeFilter === ALL ? programs : programs.filter(p => p.id === activeFilter)

  return (
    <div style={{ backgroundColor: 'var(--color-background)' }}>

      {/* ── Hero ───────────────────────────────────────── */}
      <section
        className="relative pt-24 pb-10 md:pt-32 md:pb-16 overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #0B3D91 0%, #1A52B8 50%, #092E6E 100%)' }}
      >
        <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: 'var(--color-gold)' }} aria-hidden="true" />
        <div aria-hidden="true" className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />

        <div className="section text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border"
            style={{ backgroundColor: 'rgba(212,175,55,0.12)', borderColor: 'rgba(212,175,55,0.35)' }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-gold)' }} />
            <span className="text-sm font-bold uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}>
              {programs.reduce((n, p) => n + p.courses.length, 0)} Courses Available
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>
            Explore Our Courses
          </h1>
          <p className="text-lg max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.82)' }}>
            Practical, modern courses designed for working adults. Choose your
            program area and start learning what matters.
          </p>
        </div>
      </section>

      {/* ── Filter tabs ────────────────────────────────── */}
      <div className="sticky top-20 z-[20] bg-white/90 backdrop-blur-sm border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="section py-0">
          <div className="flex gap-1 overflow-x-auto py-3 no-scrollbar">
            {filters.map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className="px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex-shrink-0"
                style={{
                  fontFamily: 'var(--font-heading)',
                  backgroundColor: activeFilter === f.id ? 'var(--color-primary)' : 'transparent',
                  color: activeFilter === f.id ? '#ffffff' : 'var(--color-text-muted)',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Course grid ────────────────────────────────── */}
      <div className="section py-10 md:py-16">
        {visiblePrograms.map(program => {
          const Icon = program.icon
          return (
            <div key={program.id} className="mb-14 last:mb-0">
              {/* Program heading */}
              <div className="flex items-start justify-between flex-wrap gap-2 mb-4 md:mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-primary)' }}>
                    <Icon size={18} color="white" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest"
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}>
                      {program.tag}
                    </p>
                    <h2 className="text-base sm:text-lg md:text-xl font-black"
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                      {program.title}
                    </h2>
                  </div>
                </div>
                <Link
                  to={`/programs/${program.id}`}
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold transition-colors duration-200 cursor-pointer group"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                >
                  View program
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
              </div>

              {/* Course cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {program.courses.map((course, i) => (
                  <div key={i} className="card flex flex-col gap-3">
                    {/* Gold dot + badge */}
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--color-gold)' }} />
                      <span className="text-xs font-bold uppercase tracking-wider"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-muted)' }}>
                        {program.tag}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm"
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                      {course.title}
                    </h3>
                    <p className="text-xs leading-relaxed flex-1"
                      style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}>
                      {course.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <CTABanner />
    </div>
  )
}
