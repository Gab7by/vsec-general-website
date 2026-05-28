import { ArrowRight, PlayCircle } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden"
      style={{
        // TODO: replace with real VSEC group photo
        backgroundImage: "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Royal Blue overlay — keeps text readable over the photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(150deg, rgba(11,61,145,0.90) 0%, rgba(26,82,184,0.82) 50%, rgba(9,46,110,0.92) 100%)',
        }}
      />

      {/* Decorative elements */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
          transform: 'translate(25%, -25%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-5"
        style={{
          background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)',
          transform: 'translate(-30%, 30%)',
        }}
      />

      {/* Gold horizontal accent line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: 'var(--color-gold)' }}
      />

      <div className="relative section w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7 border"
            style={{
              backgroundColor: 'rgba(212, 175, 55, 0.12)',
              borderColor: 'rgba(212, 175, 55, 0.4)',
            }}
          >
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--color-gold)' }}
            />
            <span
              className="text-sm font-semibold tracking-wide"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--color-gold)' }}
            >
              Professional Education for Adults & Entrepreneurs
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 text-white"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}
          >
            Unlock Your
            <span
              className="block"
              style={{ color: 'var(--color-gold)' }}
            >
              Professional
            </span>
            Potential
          </h1>

          {/* Subtext */}
          <p
            className="text-lg md:text-xl mb-10 max-w-2xl leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.85)' }}
          >
            VSEC empowers adults, entrepreneurs, and aspiring professionals with
            practical English language skills, Business knowledge, IT expertise, and
            Professional Development — on your schedule.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#programs" className="btn-primary text-base px-8 py-4 rounded-xl">
              Explore Programs
              <ArrowRight size={18} />
            </a>
            <a href="#about" className="btn-outline-white text-base px-8 py-4 rounded-xl">
              <PlayCircle size={18} />
              Learn More
            </a>
          </div>

          {/* Trust micro-stats */}
          <div className="flex flex-wrap gap-10 mt-16 pt-10 border-t border-white/10">
            {[
              { value: '500+', label: 'Students Enrolled' },
              { value: '4', label: 'Program Areas' },
              { value: '98%', label: 'Satisfaction Rate' },
            ].map(stat => (
              <div key={stat.label}>
                <p
                  className="text-3xl font-black"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-sm mt-0.5"
                  style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.65)' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
