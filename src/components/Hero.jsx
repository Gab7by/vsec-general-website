import { useState, useEffect } from 'react'
import { ArrowRight, PlayCircle } from 'lucide-react'
import image1 from '../assets/images/image_1.jpeg'
import image3 from '../assets/images/image_3.jpeg'
import image4 from '../assets/images/image_4.jpeg'

const slides = [image1, image3, image4]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-14 sm:pt-28 sm:pb-20 overflow-hidden"
    >
      {/* Sliding background images */}
      {slides.map((src, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateX(${(i - current) * 100}%)`,
            transition: 'transform 700ms ease-in-out',
          }}
        />
      ))}

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

      {/* Slide indicator dots */}
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i === current ? 'var(--color-gold)' : 'rgba(255,255,255,0.4)',
              transform: i === current ? 'scale(1.25)' : 'scale(1)',
            }}
          />
        ))}
      </div>

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
              className="text-xs sm:text-sm font-semibold tracking-wide"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--color-gold)' }}
            >
              Professional Education for Adults & Entrepreneurs
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-1 text-white"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}
          >
            Upgrade
            <span
              className="block"
              style={{ color: 'var(--color-gold)' }}
            >
              Yourself !!
            </span>

          </h1>

          {/* Subtext */}
          <p
            className="text-base md:text-lg lg:text-xl mb-7 md:mb-10 max-w-2xl leading-relaxed"
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
          <div className="flex flex-wrap gap-6 sm:gap-10 mt-10 md:mt-16 pt-8 md:pt-10 border-t border-white/10">
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
