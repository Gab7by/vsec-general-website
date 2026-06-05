import { socials } from './SocialIcons'

const links = {
  Programs: ['English Language', 'Business Fundamentals', 'Information Technology', 'Professional Development'],
  Company: ['About VSEC', 'Our Mission', 'Testimonials'],
  Support: ['FAQ', 'Enrollment Guide', 'Student Portal', 'Privacy Policy'],
}

export default function Footer() {
  return (
    <footer id="contact" style={{ backgroundColor: 'var(--color-primary-dark, #092E6E)' }}>
      {/* Gold top accent */}
      <div className="h-1" style={{ backgroundColor: 'var(--color-gold)' }} aria-hidden="true" />

      <div className="section py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Brand column */}
          <div>
            <div className="mb-4">
              <img src="/vsec-logo.png" alt="VSEC Logo" className="h-14 md:h-20 w-auto object-contain" />
            </div>
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.6)' }}
            >
              Empowering adults, entrepreneurs, and aspiring professionals through practical,
              modern education — providing second chances and real transformation.
            </p>
            <a
              href="mailto:vseccollege@gmail.com"
              className="text-sm transition-colors duration-200 cursor-pointer block mb-2"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--color-gold)' }}
            >
              vseccollege@gmail.com
            </a>
            <a
              href="/contact"
              className="text-sm transition-colors duration-200 cursor-pointer hover:text-white"
              style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.55)' }}
            >
              Contact Us →
            </a>
            <div className="flex gap-3 mt-5">
              {socials.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.15)'
                    e.currentTarget.style.color = 'var(--color-gold)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4
                className="font-black text-white mb-4 text-sm uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {category}
              </h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-200 cursor-pointer hover:text-white"
                      style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.55)' }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 pt-6 md:mt-12 md:pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <p
            className="text-xs"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.35)' }}
          >
            © {new Date().getFullYear()} VSEC. All rights reserved.
          </p>
          <p
            className="text-xs"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-gold)', opacity: 0.7 }}
          >
            Trust · Excellence · Structure · Opportunity
          </p>
        </div>
      </div>
    </footer>
  )
}
