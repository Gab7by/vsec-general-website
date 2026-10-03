import { useState } from 'react'
import { Home, Plane, ArrowRight } from 'lucide-react'

const applicantTypes = [
  {
    value: 'domestic',
    label: 'Domestic',
    description: 'I live in Ghana and am applying as a local student.',
    Icon: Home,
  },
  {
    value: 'international',
    label: 'International',
    description: 'I am applying from outside Ghana or will need to travel to study.',
    Icon: Plane,
  },
]

export default function ApplicantTypeStep({ onContinue }) {
  const [selected, setSelected] = useState('')
  const [showError, setShowError] = useState(false)

  function handleContinue() {
    if (!selected) {
      setShowError(true)
      return
    }
    onContinue(selected)
  }

  return (
    <div
      className="rounded-2xl p-6 sm:p-8 md:p-12 border bg-white"
      style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-md)' }}
    >
      <fieldset aria-describedby={showError ? 'applicant-type-error' : undefined}>
        <legend
          className="text-xl font-black mb-2"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
        >
          What type of applicant are you? <span style={{ color: 'var(--color-gold)' }}>*</span>
        </legend>
        <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}>
          Choose one option to continue to the right application form.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {applicantTypes.map(({ value, label, description, Icon }) => {
            const active = selected === value
            return (
              <label
                key={value}
                className="flex flex-col gap-3 p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#D4AF37]"
                style={{
                  backgroundColor: active ? 'var(--color-primary)' : 'var(--color-blue-tint)',
                  borderColor: active ? 'var(--color-primary)' : 'var(--color-border)',
                }}
              >
                <input
                  type="radio"
                  name="applicantType"
                  value={value}
                  checked={active}
                  onChange={() => { setSelected(value); setShowError(false) }}
                  className="sr-only"
                />
                <span className="flex items-center gap-2.5">
                  <Icon size={22} strokeWidth={2} style={{ color: active ? 'var(--color-gold)' : 'var(--color-primary)' }} />
                  <span
                    className="text-lg font-bold"
                    style={{ fontFamily: 'var(--font-heading)', color: active ? '#ffffff' : 'var(--color-primary)' }}
                  >
                    {label}
                  </span>
                </span>
                <span
                  className="text-sm"
                  style={{ fontFamily: 'var(--font-body)', color: active ? 'rgba(255,255,255,0.85)' : 'var(--color-text-muted)' }}
                >
                  {description}
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>

      {showError && (
        <p id="applicant-type-error" role="alert" className="text-sm mt-4" style={{ fontFamily: 'var(--font-body)', color: '#DC2626' }}>
          Please select Domestic or International to continue.
        </p>
      )}

      <button
        type="button"
        onClick={handleContinue}
        className="btn-primary w-full justify-center text-base py-4 rounded-xl mt-8"
      >
        Continue <ArrowRight size={18} />
      </button>
    </div>
  )
}
