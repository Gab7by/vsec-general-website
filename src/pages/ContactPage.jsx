import { Mail, Phone } from 'lucide-react'
import { socials } from '../components/SocialIcons'

const contactDetails = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'vseccollege@gmail.com',
    href: 'mailto:vseccollege@gmail.com',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+233 541 623 059',
    href: 'tel:+233541623059',
  },
]

export default function ContactPage() {
  return (
    <main>
      {/* Page header */}
      <section
        className="pt-36 pb-20 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0B3D91 0%, #1A52B8 50%, #092E6E 100%)',
        }}
      >
        {/* Decorative gold circle */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-10"
          style={{
            background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
            transform: 'translate(25%, -25%)',
          }}
        />
        {/* Gold top accent */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: 'var(--color-gold)' }} aria-hidden="true" />

        <div className="section relative text-center">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}
          >
            Contact Us
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}
          >
            Get In Touch
          </h1>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.8)' }}
          >
            We'd love to hear from you. Reach out via email, phone, or follow us on social media.
          </p>
        </div>
      </section>

      {/* Contact details */}
      <section className="py-20 bg-white">
        <div className="section">

          {/* Email & Phone cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
            {contactDetails.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="card flex flex-col items-center text-center gap-4 py-10 group transition-shadow duration-200 hover:shadow-lg"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-blue-tint)' }}
                >
                  <Icon
                    size={26}
                    strokeWidth={1.75}
                    style={{ color: 'var(--color-primary)' }}
                    className="group-hover:scale-110 transition-transform duration-200"
                  />
                </div>
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-1"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}
                  >
                    {label}
                  </p>
                  <p
                    className="font-semibold text-base"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--color-primary)' }}
                  >
                    {value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Social media */}
          <div className="text-center">
            <p
              className="text-sm font-bold uppercase tracking-widest mb-8"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}
            >
              Follow Us
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {socials.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-primary)',
                    borderColor: 'var(--color-border)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--color-gold)'
                    e.currentTarget.style.color = 'var(--color-gold)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--color-border)'
                    e.currentTarget.style.color = 'var(--color-primary)'
                  }}
                >
                  <Icon size={18} />
                  {name}
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
