import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, FileSignature, Loader2, Mail, Phone, Send } from 'lucide-react'
import { adminFetch, formatDate } from '../../lib/adminApi'
import { LETTER_STATUSES, MANUAL_STATUSES, statusInfo } from '../../lib/admissions'
import { titleCase } from '../../lib/admissionLetter'
import { allFields, isSectionVisible } from '../../lib/applicationCore'
import { getForm } from '../../lib/applicationForms'
import { headingStyle, labelClass, labelStyle } from '../../lib/adminUi'
import AdminCard from '../../components/admin/AdminCard'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import StatusBadge from '../../components/admin/StatusBadge'

function displayValue(field, value) {
  if (value === null || value === undefined || value === '') return '—'
  if (field.type === 'checkbox') return value ? 'Yes' : 'No'
  if (field.type === 'date') return formatDate(value)
  return String(value)
}

function ApplicationSections({ form, application }) {
  const fields = allFields(form)
  return form.sections.filter(s => isSectionVisible(s, application)).map((section, index) => (
    <AdminCard key={section.title} as="section" className="p-5 sm:p-6" aria-labelledby={`detail-section-${index}`}>
      <h2 id={`detail-section-${index}`} className="flex items-center gap-2.5 text-base font-black mb-4" style={headingStyle}>
        <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0"
          style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-primary)' }} aria-hidden="true">{index + 1}</span>
        {section.title}
      </h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        {fields.filter(f => f.section === section).map(field => (
          <div key={field.name} className={field.type === 'textarea' || !field.half ? 'sm:col-span-2' : ''}>
            <dt className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading)' }}>
              {field.excelLabel ?? field.label}
            </dt>
            <dd className="text-sm break-words whitespace-pre-line" style={{ color: 'var(--color-text)' }}>
              {displayValue(field, application[field.name])}
            </dd>
          </div>
        ))}
      </dl>
    </AdminCard>
  ))
}

export default function AdminApplicantDetailPage() {
  const { type, number } = useParams()
  const form = getForm(type)
  const location = useLocation()
  const navigate = useNavigate()
  const [data, setData] = useState({ state: 'loading', application: null, letters: [], message: '' })
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(null) // 'status' | 'notes' | null
  const [actionError, setActionError] = useState('')
  const [notice, setNotice] = useState(location.state?.notice ?? '')
  const [pendingStatus, setPendingStatus] = useState(null)

  useEffect(() => {
    if (location.state?.notice) navigate(location.pathname, { replace: true, state: null })
  }, [location.pathname, location.state, navigate])

  useEffect(() => {
    if (!form) return undefined
    let active = true
    adminFetch(`application?type=${type}&number=${encodeURIComponent(number)}`)
      .then(res => {
        if (!active) return
        setData({ state: 'ready', ...res, message: '' })
        setNotes(res.application.review_notes ?? '')
      })
      .catch(err => active && setData(prev => ({ ...prev, state: err.status === 404 ? 'missing' : 'error', message: err.message })))
    return () => { active = false }
  }, [form, type, number])

  async function patch(body, kind) {
    setSaving(kind)
    setActionError('')
    try {
      const res = await adminFetch('application', { method: 'PATCH', body: { type, number, ...body } })
      setData(prev => ({ ...prev, ...res }))
      if (kind === 'notes') setNotice('Review notes saved.')
      if (kind === 'status') setNotice(`Status changed to ${statusInfo(res.application.status).label}.`)
    } catch (err) {
      setActionError(err.message)
    } finally {
      setSaving(null)
    }
  }

  function requestStatus(status) {
    if (status === data.application.status) return
    // Changing an admitted applicant (letter already sent) needs explicit confirmation.
    if (data.application.status === 'admitted' || status === 'rejected') setPendingStatus(status)
    else patch({ status }, 'status')
  }

  if (!form || data.state === 'missing') {
    return (
      <AdminCard className="p-8 text-center">
        <p className="mb-4">Application not found.</p>
        <Link to="/admin/applicants" className="font-semibold hover:underline" style={{ color: 'var(--color-primary)' }}>Back to applicants</Link>
      </AdminCard>
    )
  }
  if (data.state === 'loading') {
    return <div className="flex justify-center py-16"><Loader2 className="animate-spin" size={28} style={{ color: 'var(--color-primary)' }} aria-label="Loading" /></div>
  }
  if (data.state === 'error') {
    return <AdminCard className="p-6 text-sm" role="alert"><span style={{ color: '#DC2626' }}>{data.message}</span></AdminCard>
  }

  const a = data.application
  const name = titleCase(`${a.given_names} ${a.family_name}`)
  const canDraft = LETTER_STATUSES.includes(a.status)
  const sentLetters = data.letters.filter(l => l.status === 'sent')
  const notesDirty = (notes.trim() || null) !== (a.review_notes ?? null)

  return (
    <div className="space-y-6">
      <Link to="/admin/applicants" onClick={e => { if (window.history.state?.idx > 0) { e.preventDefault(); navigate(-1) } }}
        className="inline-flex items-center gap-2 text-sm font-semibold hover:underline" style={{ color: 'var(--color-primary)' }}>
        <ArrowLeft size={16} /> Back to applicants
      </Link>

      {notice && (
        <div role="status" className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm" style={{ backgroundColor: '#DCFCE7', color: '#166534' }}>
          <CheckCircle2 size={18} className="shrink-0" /> <span className="flex-1">{notice}</span>
          <button type="button" onClick={() => setNotice('')} className="font-semibold">Dismiss</button>
        </div>
      )}

      {/* Header */}
      <AdminCard className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <StatusBadge status={a.status} size="lg" />
              <span className="text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full" style={{ backgroundColor: 'var(--color-blue-tint)', color: 'var(--color-primary)' }}>
                {form.label}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black break-words" style={headingStyle}>{name}</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
              {a.application_number} · Applied {formatDate(a.created_at, { time: true })}
            </p>
            <p className="text-sm mt-1">{titleCase(a.programme)} · {a.study_mode} · {a.preferred_campus}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-sm">
              <a href={`mailto:${a.email}`} className="inline-flex items-center gap-1.5 hover:underline" style={{ color: 'var(--color-primary)' }}><Mail size={15} />{a.email}</a>
              <a href={`tel:${a.mobile_phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 hover:underline" style={{ color: 'var(--color-primary)' }}><Phone size={15} />{a.mobile_phone}</a>
            </div>
          </div>
          <div className="sm:text-right shrink-0">
            <Link
              to={canDraft ? 'letter' : '#'}
              aria-disabled={!canDraft}
              onClick={e => { if (!canDraft) e.preventDefault() }}
              className="btn-primary justify-center rounded-xl px-5 py-3 w-full sm:w-auto"
              style={canDraft ? undefined : { opacity: 0.45, cursor: 'not-allowed' }}
            >
              <FileSignature size={18} /> {a.status === 'admitted' ? 'Draft New Admission Letter' : 'Draft Admission Letter'}
            </Link>
            {!canDraft && (
              <p className="text-xs mt-2 sm:max-w-[220px]" style={{ color: 'var(--color-text-muted)' }}>Mark the applicant as Qualified to draft an admission letter.</p>
            )}
            {a.admission_letter_sent_at && (
              <p className="text-xs mt-2" style={{ color: '#166534' }}>Letter sent {formatDate(a.admission_letter_sent_at, { time: true })}</p>
            )}
          </div>
        </div>
      </AdminCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Application */}
        <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
          <ApplicationSections form={form} application={a} />
        </div>

        {/* Review panel */}
        <div className="space-y-6 order-1 lg:order-2 lg:sticky lg:top-24">
          <AdminCard className="p-5 sm:p-6">
            <h2 className="text-base font-black mb-4" style={headingStyle}>Review</h2>
            <p className={labelClass} style={labelStyle}>Admission status</p>
            <div className="grid grid-cols-3 gap-2" role="group" aria-label="Admission status">
              {MANUAL_STATUSES.map(value => {
                const info = statusInfo(value)
                const active = a.status === value
                return (
                  <button key={value} type="button" onClick={() => requestStatus(value)} disabled={saving !== null} aria-pressed={active}
                    className="px-2 py-2.5 rounded-xl border-2 text-xs sm:text-sm font-semibold transition-colors disabled:opacity-60"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      borderColor: active ? info.color : 'var(--color-border)',
                      backgroundColor: active ? info.background : '#fff',
                      color: active ? info.color : 'var(--color-text-muted)',
                    }}>
                    {info.label}
                  </button>
                )
              })}
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>
              “Admitted” is set automatically when an admission letter is sent.
              {a.status_updated_at && <> Last changed {formatDate(a.status_updated_at, { time: true })}{a.status_updated_by_name && ` by ${a.status_updated_by_name}`}.</>}
            </p>

            <label htmlFor="review-notes" className={`${labelClass} mt-5`} style={labelStyle}>Review notes <span className="font-normal" style={{ color: 'var(--color-text-muted)' }}>(internal)</span></label>
            <textarea id="review-notes" rows={4} maxLength={5000} value={notes} onChange={e => setNotes(e.target.value)}
              placeholder="e.g. Placement test score, documents checked…" className="input resize-y text-sm" />
            <button type="button" onClick={() => patch({ review_notes: notes }, 'notes')} disabled={!notesDirty || saving !== null}
              className="mt-3 w-full px-4 py-2.5 rounded-xl border-2 text-sm font-semibold disabled:opacity-50"
              style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
              {saving === 'notes' ? 'Saving…' : 'Save notes'}
            </button>
            {actionError && <p role="alert" className="text-sm mt-3" style={{ color: '#DC2626' }}>{actionError}</p>}
          </AdminCard>

          <AdminCard className="p-5 sm:p-6">
            <h2 className="text-base font-black mb-3" style={headingStyle}>Admission letters</h2>
            {data.letters.length === 0 ? (
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>No admission letter has been sent yet.</p>
            ) : (
              <ul className="space-y-3">
                {data.letters.map(l => (
                  <li key={l.id} className="text-sm border-l-4 pl-3" style={{ borderColor: l.status === 'sent' ? '#16A34A' : l.status === 'failed' ? '#DC2626' : '#D97706' }}>
                    <p className="font-semibold flex items-center gap-1.5">
                      <Send size={13} />
                      {l.status === 'sent' ? (l.is_resend ? 'Resent' : 'Sent') : l.status === 'failed' ? 'Failed' : 'Sending'}
                      <span className="font-normal" style={{ color: 'var(--color-text-muted)' }}>· {formatDate(l.sent_at ?? l.created_at, { time: true })}</span>
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>To {l.recipient_email}{l.sent_by_name && ` by ${l.sent_by_name}`}</p>
                    {l.status === 'failed' && l.error && <p className="text-xs mt-0.5" style={{ color: '#DC2626' }}>{l.error}</p>}
                  </li>
                ))}
              </ul>
            )}
            {sentLetters.length > 0 && (
              <p className="text-xs mt-3" style={{ color: 'var(--color-text-muted)' }}>A copy of every sent letter is also BCC’d to {`vseccollege@gmail.com`}.</p>
            )}
          </AdminCard>
        </div>
      </div>

      <ConfirmDialog
        open={pendingStatus !== null}
        title={a.status === 'admitted' ? 'Change status of an admitted applicant?' : 'Reject this applicant?'}
        tone={pendingStatus === 'rejected' ? 'danger' : 'warning'}
        confirmLabel={`Mark as ${statusInfo(pendingStatus ?? 'pending').label}`}
        busy={saving === 'status'}
        onCancel={() => setPendingStatus(null)}
        onConfirm={async () => { await patch({ status: pendingStatus }, 'status'); setPendingStatus(null) }}
      >
        {a.status === 'admitted' && (
          <p>{name} has already been sent an admission letter{a.admission_letter_sent_at && ` (${formatDate(a.admission_letter_sent_at)})`}. Changing the status here does <strong>not</strong> notify the applicant or withdraw the letter.</p>
        )}
        {pendingStatus === 'rejected' && a.status !== 'admitted' && (
          <p>{name} will be marked as Rejected. The applicant is not notified automatically. You can change this later.</p>
        )}
      </ConfirmDialog>
    </div>
  )
}
