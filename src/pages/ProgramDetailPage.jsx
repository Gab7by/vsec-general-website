import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { getProgramById } from '../data/programs'
import CTABanner from '../components/CTABanner'

export default function ProgramDetailPage() {
  const { programId } = useParams()
  const program = getProgramById(programId)

  if (!program) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-28"
        style={{ backgroundColor: 'var(--color-background)' }}>
        <p className="text-5xl font-black" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
          404
        </p>
        <p className="text-lg" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}>
          Program not found.
        </p>
        <Link to="/" className="btn-primary mt-2 rounded-xl px-6 py-3">
          Back to Home
        </Link>
      </div>
    )
  }

  const Icon = program.icon

  return (
    <div style={{ backgroundColor: 'var(--color-background)' }}>

      {/* ── Hero ───────────────────────────────────────── */}
      <section
        className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #0B3D91 0%, #1A52B8 50%, #0B3D91 100%)' }}
      >
        {/* Gold top accent */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: 'var(--color-gold)' }} aria-hidden="true" />

        {/* Decorative glow */}
        <div aria-hidden="true" className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-10"
          style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />

        <div className="section">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold mb-8 transition-colors duration-200 cursor-pointer"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.7)' }}
            onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-8 max-w-3xl">
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}>
              <Icon size={30} color="#D4AF37" strokeWidth={1.5} />
            </div>

            <div>
              {/* Tag badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 border"
                style={{ backgroundColor: 'rgba(212,175,55,0.12)', borderColor: 'rgba(212,175,55,0.35)' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-gold)' }} />
                <span className="text-xs font-bold uppercase tracking-widest"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}>
                  {program.tag}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4"
                style={{ fontFamily: 'var(--font-heading)', lineHeight: '1.15' }}>
                {program.title}
              </h1>
              <p className="text-lg leading-relaxed mb-8"
                style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.82)' }}>
                {program.shortDescription}
              </p>

              <Link to={`/enroll?program=${program.id}`} className="btn-primary rounded-xl px-7 py-3.5">
                Enroll in This Program
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Overview ───────────────────────────────────── */}
      <section className="py-12 md:py-20 bg-white">
        <div className="section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            {/* Left: description */}
            <div>
              <p className="text-sm font-bold uppercase tracking-widest mb-3"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}>
                Program Overview
              </p>
              <h2 className="text-3xl font-black mb-5"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                What Is This Program?
              </h2>
              <p className="text-base leading-relaxed mb-6"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)', lineHeight: '1.8' }}>
                {program.fullDescription}
              </p>
              <div className="rounded-xl p-5 border-l-4"
                style={{ backgroundColor: 'var(--color-blue-tint)', borderColor: 'var(--color-primary)' }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                  Who Is This For?
                </p>
                <p className="text-sm leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)' }}>
                  {program.whoIsItFor}
                </p>
              </div>
            </div>

            {/* Right: outcomes */}
            <div>
              <p className="text-sm font-bold uppercase tracking-widest mb-3"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}>
                What You Will Gain
              </p>
              <h2 className="text-3xl font-black mb-6"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                Learning Outcomes
              </h2>
              <ul className="space-y-4">
                {program.outcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={20} className="flex-shrink-0 mt-0.5"
                      style={{ color: 'var(--color-gold)' }} strokeWidth={2} />
                    <span className="text-base leading-relaxed"
                      style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)' }}>
                      {outcome}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Courses in this program ─────────────────────── */}
      <section className="py-12 md:py-20" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="section">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-sm font-bold uppercase tracking-widest mb-3"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}>
              Curriculum
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
              Courses in This Program
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {program.courses.map((course, i) => (
              <div key={i} className="card flex flex-col gap-3">
                {/* Course number */}
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                    style={{ backgroundColor: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                    {i + 1}
                  </span>
                  <h3 className="font-bold text-base"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                    {course.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed pl-10"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}>
                  {course.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  )
}
