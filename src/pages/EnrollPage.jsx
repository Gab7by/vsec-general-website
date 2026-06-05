import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CheckCircle, Home, Plane } from 'lucide-react'

const programs = [
  { id: 'english',          title: 'VSEC Adult Literacy Institute',              fees: { domestic: 'GHS XXX', international: 'USD XXX' } },
  { id: 'business',         title: 'VSEC Language Academy',                      fees: { domestic: 'GHS XXX', international: 'USD XXX' } },
  { id: 'it',               title: 'VSEC Corporate Training Solutions',          fees: { domestic: 'GHS XXX', international: 'USD XXX' } },
  { id: 'professional-dev', title: 'VSEC Teacher Development Institute',         fees: { domestic: 'GHS XXX', international: 'USD XXX' } },
  { id: 'program-5',        title: 'VSEC Study Abroad & Educational Consulting', fees: { domestic: 'GHS XXX', international: 'USD XXX' } },
  { id: 'program-6',        title: 'VSEC Digital Learning',                      fees: { domestic: 'GHS XXX', international: 'USD XXX' } },
  { id: 'program-7',        title: 'VSEC Talent & Life Skills Academy',          fees: { domestic: 'GHS XXX', international: 'USD XXX' } },
]

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mykazavk'

const applicantTypes = [
  { value: 'domestic',      label: 'Domestic',      Icon: Home },
  { value: 'international', label: 'International', Icon: Plane },
]

export default function EnrollPage() {
  const [searchParams] = useSearchParams()
  const preselected = searchParams.get('program') ?? ''

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    applicantType: '',
    program: preselected,
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function setApplicantType(value) {
    setForm(prev => ({ ...prev, applicantType: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const selectedProgram = programs.find(p => p.id === form.program)
  const showFee = selectedProgram && form.applicantType

  return (
    <main>
      {/* Page header */}
      <section
        className="pt-24 pb-12 md:pt-36 md:pb-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0B3D91 0%, #1A52B8 50%, #092E6E 100%)' }}
      >
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-10"
          style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)', transform: 'translate(25%, -25%)' }}
        />
        <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: 'var(--color-gold)' }} aria-hidden="true" />

        <div className="section relative text-center">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}
          >
            Enrollment Application
          </p>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}
          >
            Apply Now
          </h1>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.8)' }}
          >
            Fill in the form below and we'll get back to you shortly to confirm your enrollment.
          </p>
        </div>
      </section>

      {/* Form section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="section max-w-2xl">
          {status === 'success' ? (
            <div
              className="rounded-2xl p-12 text-center border"
              style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-md)' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: 'var(--color-blue-tint)' }}
              >
                <CheckCircle size={32} style={{ color: 'var(--color-primary)' }} strokeWidth={1.75} />
              </div>
              <h2
                className="text-2xl font-black mb-3"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
              >
                Application Submitted!
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
              >
                Thank you for applying to VSEC. We have received your application and will be in touch with you shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-8 md:p-12 border"
              style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-md)' }}
            >
              <div className="space-y-6">

                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-bold mb-2"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                  >
                    Full Name <span style={{ color: 'var(--color-gold)' }}>*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Kwame Mensah"
                    className="input"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold mb-2"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                  >
                    Email Address <span style={{ color: 'var(--color-gold)' }}>*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="e.g. kwame@example.com"
                    className="input"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-bold mb-2"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                  >
                    Phone Number <span style={{ color: 'var(--color-gold)' }}>*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="e.g. +233 54 000 0000"
                    className="input"
                  />
                </div>

                {/* Location */}
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-bold mb-2"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                  >
                    Location (City / Country) <span style={{ color: 'var(--color-gold)' }}>*</span>
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Accra, Ghana"
                    className="input"
                  />
                </div>

                {/* Applicant Type */}
                <div>
                  <p
                    className="block text-sm font-bold mb-3"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                  >
                    Applicant Type <span style={{ color: 'var(--color-gold)' }}>*</span>
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {applicantTypes.map(({ value, label, Icon }) => {
                      const active = form.applicantType === value
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setApplicantType(value)}
                          className="flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl border-2 font-semibold text-sm transition-all duration-200"
                          style={{
                            fontFamily: 'var(--font-heading)',
                            backgroundColor: active ? 'var(--color-primary)' : 'var(--color-blue-tint)',
                            borderColor: active ? 'var(--color-primary)' : 'var(--color-border)',
                            color: active ? '#ffffff' : 'var(--color-text-muted)',
                          }}
                        >
                          <Icon size={17} strokeWidth={2} />
                          {label}
                        </button>
                      )
                    })}
                  </div>
                  {/* Hidden required input to enforce selection */}
                  <input
                    type="text"
                    name="applicantType"
                    required
                    value={form.applicantType}
                    readOnly
                    className="sr-only"
                    aria-hidden="true"
                  />
                </div>

                {/* Program */}
                <div>
                  <label
                    htmlFor="program"
                    className="block text-sm font-bold mb-2"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                  >
                    Program of Interest <span style={{ color: 'var(--color-gold)' }}>*</span>
                  </label>
                  <select
                    id="program"
                    name="program"
                    required
                    value={form.program}
                    onChange={handleChange}
                    className="input"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="" disabled>Select a program…</option>
                    {programs.map(p => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                </div>

                {/* Dynamic fee card */}
                {showFee && (
                  <div
                    className="rounded-xl p-5 border-l-4"
                    style={{ backgroundColor: 'var(--color-blue-tint)', borderColor: 'var(--color-gold)' }}
                  >
                    <p
                      className="text-xs font-bold uppercase tracking-widest mb-1"
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}
                    >
                      Enrollment Fee
                    </p>
                    <p
                      className="text-2xl font-black mb-0.5"
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                    >
                      {selectedProgram.fees[form.applicantType]}
                    </p>
                    <p
                      className="text-xs capitalize"
                      style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
                    >
                      {form.applicantType} · {selectedProgram.title}
                    </p>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-bold mb-2"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                  >
                    Additional Information{' '}
                    <span className="font-normal" style={{ color: 'var(--color-text-muted)' }}>(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us a bit about yourself or any questions you have…"
                    className="input resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p
                    className="text-sm text-center"
                    style={{ fontFamily: 'var(--font-body)', color: '#DC2626' }}
                  >
                    Something went wrong. Please try again or email us at vseccollege@gmail.com.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-primary w-full justify-center text-base py-4 rounded-xl"
                  style={{ opacity: status === 'submitting' ? 0.7 : 1 }}
                >
                  {status === 'submitting' ? 'Submitting…' : 'Submit Application'}
                </button>

              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
