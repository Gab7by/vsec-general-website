import { Link } from 'react-router-dom'
import { ArrowRight, PenLine } from 'lucide-react'

export default function QuizTeaser() {
  return (
    <section className="py-6 md:py-10" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="section">
        <div
          className="relative rounded-2xl overflow-hidden px-6 py-8 sm:px-10 sm:py-9 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ background: 'linear-gradient(135deg, #0B3D91 0%, #1A52B8 60%, #092E6E 100%)' }}
        >
          {/* Gold top accent */}
          <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: 'var(--color-gold)' }} aria-hidden="true" />

          {/* Decorative glow */}
          <div aria-hidden="true" className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />

          {/* Left content */}
          <div className="relative flex items-start gap-4 text-left">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ backgroundColor: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.35)' }}
            >
              <PenLine size={22} color="#D4AF37" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}>
                How Good Is Your English?
              </p>
              <h3 className="text-lg sm:text-xl font-black text-white mb-1"
                style={{ fontFamily: 'var(--font-heading)' }}>
                Check your English level for free now!!
              </h3>
              <p className="text-sm"
                style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.75)' }}>
                20 questions · Instant CEFR result · Personalised course recommendation
              </p>
            </div>
          </div>

          {/* CTA */}
          <Link
            to="/english-quiz"
            className="btn-primary relative flex-shrink-0 text-sm px-6 py-3 rounded-xl"
          >
            Take the Quiz
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
