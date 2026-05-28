const links = {
  Programs: ['English Language', 'Business Fundamentals', 'Information Technology', 'Professional Development'],
  Company: ['About VSEC', 'Our Mission', 'Testimonials', 'Contact Us'],
  Support: ['FAQ', 'Enrollment Guide', 'Student Portal', 'Privacy Policy'],
}

export default function Footer() {
  return (
    <footer id="contact" style={{ backgroundColor: 'var(--color-primary-dark, #092E6E)' }}>
      {/* Gold top accent */}
      <div className="h-1" style={{ backgroundColor: 'var(--color-gold)' }} aria-hidden="true" />

      <div className="section py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-gold)' }}
              >
                <span
                  className="font-black text-sm"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                >
                  V
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="font-black text-base tracking-wide text-white"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  VSEC
                </span>
                <span
                  className="text-[10px] font-medium tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--color-gold)' }}
                >
                  Education
                </span>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.6)' }}
            >
              Empowering adults, entrepreneurs, and aspiring professionals through practical,
              modern education — providing second chances and real transformation.
            </p>
            <a
              href="mailto:info@vsec.edu"
              className="text-sm transition-colors duration-200 cursor-pointer"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--color-gold)' }}
            >
              info@vsec.edu
            </a>
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
          className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
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
