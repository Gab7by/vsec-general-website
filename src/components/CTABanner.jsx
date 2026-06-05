import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CTABanner() {
  return (
    <section className="py-20" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="section">
        <div
          className="relative rounded-3xl overflow-hidden px-8 py-16 md:px-16 text-center"
          style={{
            background: 'linear-gradient(135deg, #0B3D91 0%, #1A52B8 55%, #092E6E 100%)',
          }}
        >
          {/* Gold top border accent */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ backgroundColor: 'var(--color-gold)' }}
            aria-hidden="true"
          />

          {/* Decorative circles */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
              transform: 'translate(30%, -30%)',
            }}
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)',
              transform: 'translate(-30%, 30%)',
            }}
          />

          <div className="relative">
            <p
              className="text-sm font-bold uppercase tracking-widest mb-4"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}
            >
              Start Your Journey Today
            </p>
            <h2
              className="text-3xl md:text-5xl font-black text-white mb-5 max-w-2xl mx-auto"
              style={{ fontFamily: 'var(--font-heading)', lineHeight: '1.15' }}
            >
              Your Next Chapter Starts at VSEC
            </h2>
            <p
              className="text-lg mb-10 max-w-xl mx-auto leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.85)' }}
            >
              Enroll today and join hundreds of adults and entrepreneurs who chose
              to invest in themselves.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/enroll"
                className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl"
              >
                Enroll Now
                <ArrowRight size={18} />
              </Link>
              <a
                href="#programs"
                className="btn-outline-white inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl"
              >
                View Programs
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
