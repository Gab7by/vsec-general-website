import { Users, Clock, Award, BookOpen } from 'lucide-react'
import useInView from '../hooks/useInView'
import image2 from '../assets/images/image_2.jpeg'

const reasons = [
  {
    icon: Users,
    title: 'For Busy Adults',
    description:
      'Flexible schedules designed around your life — not the other way around. Evening and weekend classes available.',
  },
  {
    icon: Clock,
    title: 'Practical, Not Theoretical',
    description:
      'Every lesson is built around real-world application. You will use what you learn from day one.',
  },
  {
    icon: Award,
    title: 'No University? No Problem',
    description:
      "VSEC opens doors to quality education for those who couldn't attend university — merit over credentials.",
  },
  {
    icon: BookOpen,
    title: 'Modern Curriculum',
    description:
      "Courses are continuously updated to reflect today's professional landscape, tools, and opportunities.",
  },
]

export default function WhyVsec() {
  const [imgRef, imgInView] = useInView()

  return (
    <section id="about" className="py-14 md:py-20 bg-white">
      <div className="section">
        {/* Header */}
        <div className="max-w-2xl mb-8 md:mb-14">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}
          >
            Why Choose VSEC
          </p>
          <h2
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
          >
            Education That Works
            <br />
            <span className="gold-underline">For You</span>
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
          >
            We believe every person deserves access to quality education and the
            opportunity to grow professionally — regardless of their background.
          </p>
        </div>

        {/* Section image */}
        <div
          ref={imgRef}
          className="w-full mb-12 rounded-2xl overflow-hidden"
          style={{
            opacity: imgInView ? 1 : 0,
            transform: imgInView ? 'translateY(0)' : 'translateY(48px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <img
            src={image2}
            alt="VSEC students in a learning environment"
            className="w-full aspect-video object-cover"
          />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map(({ icon: Icon, title, description }) => (
            <div key={title} className="card group">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-200"
                style={{ backgroundColor: 'var(--color-blue-tint)' }}
              >
                <Icon
                  size={22}
                  strokeWidth={1.75}
                  style={{ color: 'var(--color-primary)' }}
                  className="group-hover:scale-110 transition-transform duration-200"
                />
              </div>
              <h3
                className="font-bold mb-2"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  color: 'var(--color-primary)',
                }}
              >
                {title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
