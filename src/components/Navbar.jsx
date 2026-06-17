import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', to: '/', type: 'route' },
  { label: 'Courses', to: '/courses', type: 'route' },
  { label: 'About', to: '/#about', type: 'anchor' },
  { label: 'Testimonials', to: '/#testimonials', type: 'anchor' },
  { label: 'Contact', to: '/contact', type: 'route' },
  { label: 'Test Your English Level', to: '/english-quiz', type: 'route' },
]

const linkClass =
  'px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 cursor-pointer'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-4 left-4 right-4 z-[30] rounded-2xl transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border border-blue-100'
          : 'bg-white/85 backdrop-blur-sm border border-blue-50'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center cursor-pointer">
          <img src="/vsec-logo.png" alt="VSEC Logo" className="h-14 w-auto object-contain" />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(link =>
            link.type === 'route' ? (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className={linkClass}
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--color-primary)'
                    e.currentTarget.style.backgroundColor = 'var(--color-blue-tint)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--color-text-muted)'
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ) : (
              <li key={link.label}>
                <a
                  href={link.to}
                  className={linkClass}
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--color-primary)'
                    e.currentTarget.style.backgroundColor = 'var(--color-blue-tint)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--color-text-muted)'
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  {link.label}
                </a>
              </li>
            )
          )}
        </ul>

        {/* Desktop CTA */}
        <Link
          to="/enroll"
          className="hidden md:inline-flex btn-primary text-sm px-5 py-2.5 rounded-xl"
        >
          Apply Now
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(o => !o)}
          className="md:hidden p-2 rounded-lg transition-colors duration-200 cursor-pointer"
          style={{ color: 'var(--color-primary)' }}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-blue-100 px-5 py-4 space-y-1 bg-white rounded-b-2xl">
          {navLinks.map(link =>
            link.type === 'route' ? (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200 cursor-pointer hover:bg-blue-50"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)' }}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.to}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200 cursor-pointer hover:bg-blue-50"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)' }}
              >
                {link.label}
              </a>
            )
          )}
          <Link
            to="/enroll"
            onClick={() => setOpen(false)}
            className="block btn-primary text-sm text-center mt-3 rounded-xl justify-center"
          >
            Apply Now
          </Link>
        </div>
      )}
    </header>
  )
}
