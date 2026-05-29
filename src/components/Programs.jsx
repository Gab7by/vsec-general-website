import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { programs } from '../data/programs'

export default function Programs() {
  return (
    <section id="programs" className="py-20" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="section">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}
          >
            Our Programs
          </p>
          <h2
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
          >
            Learn What Matters
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
          >
            Seven focused program areas designed to give you real, applicable skills
            that accelerate your career and business.
          </p>
        </div>

        {/* Program cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map(program => {
            const Icon = program.icon
            return (
              <div key={program.id} className="card flex flex-col gap-5">
                {/* Icon + tag */}
                <div className="flex items-start justify-between">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    <Icon size={22} color="white" strokeWidth={1.75} />
                  </div>
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      backgroundColor: 'var(--color-blue-tint)',
                      color: 'var(--color-primary)',
                    }}
                  >
                    {program.tag}
                  </span>
                </div>

                {/* Text */}
                <div>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                  >
                    {program.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
                  >
                    {program.shortDescription}
                  </p>
                </div>

                {/* Course highlights */}
                <ul className="grid grid-cols-2 gap-2">
                  {program.courses.map(course => (
                    <li
                      key={course.title}
                      className="flex items-center gap-1.5 text-sm"
                      style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)' }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: 'var(--color-gold)' }}
                      />
                      {course.title}
                    </li>
                  ))}
                </ul>

                {/* Learn more — links to program detail page */}
                <Link
                  to={`/programs/${program.id}`}
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold transition-colors duration-200 cursor-pointer group"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                >
                  Learn more
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
