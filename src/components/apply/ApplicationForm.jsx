import { useMemo, useRef, useState } from 'react'
import { AlertCircle } from 'lucide-react'
import {
  allFields,
  emptyApplication,
  isFieldRequired,
  isFieldVisible,
  isSectionVisible,
  validateApplication,
} from '../../lib/applicationCore'
import SuccessCard from './SuccessCard'

const API_ENDPOINT = '/api/application'
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mykazavk'
const ERROR_COLOR = '#DC2626'

const labelClass = 'block text-sm font-bold mb-2'
const labelStyle = { fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }

function RequiredMark() {
  return <span style={{ color: 'var(--color-gold)' }} aria-hidden="true"> *</span>
}

function FieldError({ id, message }) {
  if (!message) return null
  return (
    <p id={id} className="text-sm mt-1.5" style={{ fontFamily: 'var(--font-body)', color: ERROR_COLOR }}>
      {message}
    </p>
  )
}

function FieldHint({ text }) {
  if (!text) return null
  return (
    <p className="text-xs mt-1.5" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}>
      {text}
    </p>
  )
}

function Field({ field, value, error, required, onChange, idPrefix }) {
  const id = `${idPrefix}-${field.name}`
  const errorId = `${id}-error`
  const common = {
    id,
    name: field.name,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    'aria-required': required || undefined,
  }
  const invalidStyle = error ? { borderColor: ERROR_COLOR } : undefined

  if (field.type === 'radio') {
    return (
      <fieldset id={id} tabIndex={-1} aria-describedby={common['aria-describedby']} className="outline-none">
        <legend className={labelClass} style={labelStyle}>
          {field.label}{required && <RequiredMark />}
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {field.options.map(option => {
            const active = value === option
            return (
              <label
                key={option}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer text-sm transition-colors duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#D4AF37]"
                style={{
                  fontFamily: 'var(--font-body)',
                  backgroundColor: active ? 'var(--color-blue-tint)' : 'var(--color-surface)',
                  borderColor: active ? 'var(--color-primary)' : error ? ERROR_COLOR : 'var(--color-border)',
                  color: 'var(--color-text)',
                }}
              >
                <input
                  type="radio"
                  name={field.name}
                  value={option}
                  checked={active}
                  onChange={() => onChange(field.name, option)}
                  className="w-4 h-4 shrink-0"
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                {option}
              </label>
            )
          })}
        </div>
        <FieldHint text={field.hint} />
        <FieldError id={errorId} message={error} />
      </fieldset>
    )
  }

  if (field.type === 'checkbox') {
    return (
      <div>
        <label className="flex items-start gap-3 cursor-pointer text-sm font-semibold" style={labelStyle}>
          <input
            {...common}
            type="checkbox"
            checked={value === true}
            onChange={e => onChange(field.name, e.target.checked)}
            className="w-5 h-5 mt-0.5 shrink-0"
            style={{ accentColor: 'var(--color-primary)' }}
          />
          <span>{field.label}{required && <RequiredMark />}</span>
        </label>
        <FieldError id={errorId} message={error} />
      </div>
    )
  }

  let control
  if (field.type === 'select') {
    control = (
      <select {...common} value={value} onChange={e => onChange(field.name, e.target.value)}
        className="input" style={{ cursor: 'pointer', ...invalidStyle }}>
        <option value="">Select…</option>
        {field.options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    )
  } else if (field.type === 'textarea') {
    control = (
      <textarea {...common} rows={3} value={value} maxLength={field.max} placeholder={field.placeholder}
        autoComplete={field.autoComplete ?? 'off'}
        onChange={e => onChange(field.name, e.target.value)}
        className="input resize-y uppercase placeholder:normal-case" style={invalidStyle} />
    )
  } else {
    const isText = field.type === 'text'
    control = (
      <>
        <input
          {...common}
          type={field.type === 'number' ? 'text' : field.type}
          inputMode={field.type === 'number' ? 'numeric' : undefined}
          maxLength={field.type === 'number' ? 4 : field.max ?? 200}
          value={value}
          readOnly={field.readOnly}
          placeholder={field.placeholder}
          list={field.suggestions ? `${id}-list` : undefined}
          autoComplete={field.autoComplete ?? 'off'}
          onChange={e => onChange(field.name, e.target.value)}
          className={`input ${isText ? 'uppercase placeholder:normal-case' : ''}`}
          style={{ ...invalidStyle, ...(field.readOnly ? { backgroundColor: 'var(--color-blue-tint)' } : null) }}
        />
        {field.suggestions && (
          <datalist id={`${id}-list`}>
            {field.suggestions.map(s => <option key={s} value={s} />)}
          </datalist>
        )}
      </>
    )
  }

  return (
    <div>
      <label htmlFor={id} className={labelClass} style={labelStyle}>
        {field.label}
        {required && <RequiredMark />}
        {!required && !field.readOnly && (
          <span className="font-normal" style={{ color: 'var(--color-text-muted)' }}> (optional)</span>
        )}
      </label>
      {control}
      <FieldHint text={field.hint} />
      <FieldError id={errorId} message={error} />
    </div>
  )
}

export default function ApplicationForm({ form, initialValues }) {
  const fields = useMemo(() => allFields(form), [form])
  const [data, setData] = useState(() => emptyApplication(form, initialValues))
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error | duplicate
  const [applicationNumber, setApplicationNumber] = useState(null)
  const [serverMessage, setServerMessage] = useState('')
  const honeypotRef = useRef(null)
  const summaryRef = useRef(null)
  const idPrefix = form.type

  function handleChange(name, value) {
    const next = { ...data, [name]: value }
    setData(next)
    // After the first submit attempt, re-validate live so errors clear as they're fixed.
    if (submitted) setErrors(validateApplication(form, next))
  }

  function focusFirstError(errs) {
    const first = fields.find(f => errs[f.name])
    if (!first) return
    const el = document.getElementById(`${idPrefix}-${first.name}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    el?.focus({ preventScroll: true })
  }

  async function notifySchool(number) {
    const details = form.notification(data)
    try {
      await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `New ${form.label} Applicant – ${details.name}`,
          applicantType: form.label,
          ...details,
          applicationNumber: number,
        }),
      })
    } catch {
      // The application is already saved; a failed notification must not block the applicant.
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (status === 'submitting') return
    setSubmitted(true)

    const errs = validateApplication(form, data)
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      setStatus('idle')
      focusFirstError(errs)
      return
    }

    setStatus('submitting')
    setServerMessage('')
    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ applicantType: form.type, data, website: honeypotRef.current?.value ?? '' }),
      })
      const body = await res.json().catch(() => ({}))

      if (res.ok) {
        setApplicationNumber(body.applicationNumber)
        if (body.applicationNumber) await notifySchool(body.applicationNumber)
        setStatus('success')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (res.status === 409) {
        setApplicationNumber(body.applicationNumber)
        setStatus('duplicate')
        summaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        summaryRef.current?.focus({ preventScroll: true })
      } else if (res.status === 400 && body.errors) {
        setErrors(body.errors)
        setStatus('idle')
        focusFirstError(body.errors)
      } else {
        setServerMessage(body.error ?? '')
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <SuccessCard>
        <p>
          Thank you for applying to VSEC College. Your {form.label.toLowerCase()} student application has been submitted successfully.
        </p>
        {applicationNumber && (
          <p>
            Your application number is{' '}
            <strong style={{ color: 'var(--color-primary)' }}>{applicationNumber}</strong>.
            Please keep it for your records.
          </p>
        )}
        <p>Our admissions team will review your application and contact you shortly.</p>
      </SuccessCard>
    )
  }

  const errorCount = Object.keys(errors).length
  const visibleSections = form.sections.filter(s => isSectionVisible(s, data))

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}>
        Please complete all sections. Fields marked <span style={{ color: 'var(--color-gold)' }}>*</span> are required.
        Text is saved in BLOCK CAPITALS.
      </p>

      <div ref={summaryRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {submitted && errorCount > 0 && (
          <div className="flex gap-3 rounded-xl p-4 border" style={{ borderColor: ERROR_COLOR, backgroundColor: '#FEF2F2' }}>
            <AlertCircle size={20} style={{ color: ERROR_COLOR }} className="shrink-0 mt-0.5" />
            <p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: ERROR_COLOR }}>
              Please correct {errorCount === 1 ? 'the highlighted field' : `the ${errorCount} highlighted fields`} before submitting.
            </p>
          </div>
        )}
        {status === 'duplicate' && (
          <div className="flex gap-3 rounded-xl p-4 border" style={{ borderColor: 'var(--color-gold)', backgroundColor: 'var(--color-blue-tint)' }}>
            <AlertCircle size={20} style={{ color: 'var(--color-primary)' }} className="shrink-0 mt-0.5" />
            <p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)' }}>
              It looks like you have already applied
              {applicationNumber && <> (Application No. <strong>{applicationNumber}</strong>)</>}.
              To update your application, please email{' '}
              <a href="mailto:vseccollege@gmail.com" className="underline">vseccollege@gmail.com</a>.
            </p>
          </div>
        )}
      </div>

      {visibleSections.map((section, index) => (
        <section
          key={section.title}
          aria-labelledby={`${idPrefix}-section-${index}`}
          className="rounded-2xl p-6 sm:p-8 border bg-white"
          style={{
            borderColor: section.showIf ? 'var(--color-gold)' : 'var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <h2
            id={`${idPrefix}-section-${index}`}
            className="flex items-center gap-3 text-lg sm:text-xl font-black mb-6"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
          >
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0"
              style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-primary)' }}
              aria-hidden="true"
            >
              {index + 1}
            </span>
            {section.title}
          </h2>

          {section.note && (
            <p className="text-sm -mt-3 mb-6" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}>
              {section.note}
            </p>
          )}

          {section.text && (
            <p
              className="text-sm leading-relaxed mb-6 p-4 rounded-xl"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)', backgroundColor: 'var(--color-blue-tint)' }}
            >
              {section.text}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
            {fields.filter(f => f.section === section && isFieldVisible(f, data)).map(field => (
              <div key={field.name} className={field.half ? '' : 'md:col-span-2'}>
                <Field
                  field={field}
                  value={data[field.name]}
                  error={errors[field.name]}
                  required={isFieldRequired(field, data)}
                  onChange={handleChange}
                  idPrefix={idPrefix}
                />
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Honeypot — hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label>
          Website
          <input ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm text-center" style={{ fontFamily: 'var(--font-body)', color: ERROR_COLOR }}>
          {serverMessage || 'Something went wrong.'} Please try again, or email us at vseccollege@gmail.com.
        </p>
      )}

      <p className="text-xs text-center" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}>
        Your information is sent securely and used only by VSEC College admissions to process your application.
      </p>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary w-full justify-center text-base py-4 rounded-xl"
        style={{ opacity: status === 'submitting' ? 0.7 : 1 }}
      >
        {status === 'submitting' ? 'Submitting…' : 'Submit Application'}
      </button>
    </form>
  )
}
