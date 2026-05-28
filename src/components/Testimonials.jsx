import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote:
      'VSEC completely changed how I communicate with clients. The Business English course gave me the confidence to present in meetings I used to avoid.',
    name: 'Abena Mensah',
    role: 'Entrepreneur & Small Business Owner',
    initials: 'AM',
  },
  {
    quote:
      "I never had the chance to go to university, but VSEC gave me access to real business knowledge. I now run my own consultancy thanks to what I learned here.",
    name: 'Kwame Asante',
    role: 'Business Consultant',
    initials: 'KA',
  },
  {
    quote:
      'The IT fundamentals course opened entirely new doors for me. I was able to transition into a digital marketing role I never thought was possible.',
    name: 'Efua Boateng',
    role: 'Digital Marketing Specialist',
    initials: 'EB',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="section">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}
          >
            Student Stories
          </p>
          <h2
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
          >
            Real Results,{' '}
            <span className="gold-underline">Real People</span>
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
          >
            Hear from the students who have transformed their careers and lives through VSEC programs.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, role, initials }) => (
            <div
              key={name}
              className="relative rounded-2xl p-7 flex flex-col gap-5 border transition-shadow duration-200 hover:shadow-lg"
              style={{
                borderColor: 'var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {/* Gold quote accent */}
              <Quote
                size={28}
                strokeWidth={1.5}
                aria-hidden="true"
                style={{ color: 'var(--color-gold)', opacity: 0.7 }}
              />

              {/* Quote text */}
              <p
                className="leading-relaxed flex-1 italic"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'var(--color-text)',
                }}
              >
                "{quote}"
              </p>

              {/* Author */}
              <div
                className="flex items-center gap-3 pt-4 border-t"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0 text-white"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    backgroundColor: 'var(--color-primary)',
                  }}
                  aria-hidden="true"
                >
                  {initials}
                </div>
                <div>
                  <p
                    className="font-bold text-sm"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                  >
                    {name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
                  >
                    {role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
