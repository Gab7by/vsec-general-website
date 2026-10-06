import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Eye, FileText, Loader2, RotateCcw, Send } from 'lucide-react'
import { adminFetch, formatDate } from '../../lib/adminApi'
import { DEFAULT_SIGNATORY, LETTER_STATUSES } from '../../lib/admissions'
import { buildLetterDraft, titleCase } from '../../lib/admissionLetter'
import { getForm } from '../../lib/applicationForms'
import { headingStyle, labelClass, labelStyle } from '../../lib/adminUi'
import AdminCard from '../../components/admin/AdminCard'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import LetterPreview from '../../components/admin/LetterPreview'

const SIGNATORY_KEY = 'vsec-admin-signatory'
const draftKey = number => `vsec-admin-letter-draft:${number}`

// Browser storage is a convenience only (unsent drafts, last signatory) — never required.
function readStorage(key) {
  try { return JSON.parse(localStorage.getItem(key) ?? 'null') } catch { return null }
}
function writeStorage(key, value) {
  try {
    if (value === null) localStorage.removeItem(key)
    else localStorage.setItem(key, JSON.stringify(value))
  } catch { /* storage unavailable */ }
}

function freshDraft(type, application) {
  const signatory = readStorage(SIGNATORY_KEY) ?? DEFAULT_SIGNATORY
  return { ...buildLetterDraft(type, application), signatoryName: signatory.name, signatoryTitle: signatory.title }
}

export default function AdminLetterPage() {
  const { type, number } = useParams()
  const form = getForm(type)
  const navigate = useNavigate()
  const [data, setData] = useState({ state: 'loading', application: null, letters: [], message: '' })
  const [letter, setLetter] = useState(null)
  const [restored, setRestored] = useState(false)
  const [tab, setTab] = useState('edit') // mobile only: edit | preview
  const [dialog, setDialog] = useState(null) // null | { mode: 'send' | 'resend' | 'reset', previous? }
  const [acknowledged, setAcknowledged] = useState(false)
  const [busy, setBusy] = useState(null) // 'preview' | 'send' | null
  const [error, setError] = useState('')
  const idempotencyKey = useRef(null)

  useEffect(() => {
    if (!form) return undefined
    let active = true
    adminFetch(`application?type=${type}&number=${encodeURIComponent(number)}`)
      .then(res => {
        if (!active) return
        setData({ state: 'ready', ...res, message: '' })
        const saved = readStorage(draftKey(number))
        if (saved?.body) {
          setLetter(saved)
          setRestored(true)
        } else {
          setLetter(freshDraft(type, res.application))
        }
      })
      .catch(err => active && setData(prev => ({ ...prev, state: 'error', message: err.message })))
    return () => { active = false }
  }, [form, type, number])

  function update(field, value) {
    setLetter(prev => {
      const next = { ...prev, [field]: value }
      writeStorage(draftKey(number), next)
      return next
    })
  }

  const payload = () => ({
    type,
    number,
    subject: letter.subject,
    body: letter.body,
    signatoryName: letter.signatoryName,
    signatoryTitle: letter.signatoryTitle,
  })

  const invalid = !letter?.subject.trim() || !letter?.body.trim() || !letter?.signatoryName.trim()

  async function previewPdf() {
    setError('')
    setBusy('preview')
    // Open the tab synchronously so popup blockers allow it, then point it at the PDF.
    const tabRef = window.open('', '_blank')
    try {
      const blob = await adminFetch('send-letter', { method: 'POST', body: { ...payload(), mode: 'preview' }, as: 'blob' })
      const url = URL.createObjectURL(blob)
      if (tabRef) tabRef.location.href = url
      else window.location.assign(url)
      setTimeout(() => URL.revokeObjectURL(url), 60_000)
    } catch (err) {
      tabRef?.close()
      setError(err.message)
    } finally {
      setBusy(null)
    }
  }

  function openSendDialog() {
    setError('')
    setAcknowledged(false)
    idempotencyKey.current = crypto.randomUUID()
    const previous = data.letters.filter(l => l.status === 'sent').map(l => ({ sentAt: l.sent_at, sentBy: l.sent_by_name }))
    setDialog(previous.length > 0 || data.application.admission_letter_sent_at ? { mode: 'resend', previous } : { mode: 'send' })
  }

  async function send() {
    setBusy('send')
    setError('')
    try {
      const res = await adminFetch('send-letter', {
        method: 'POST',
        body: { ...payload(), mode: 'send', idempotencyKey: idempotencyKey.current, confirmResend: dialog.mode === 'resend' },
      })
      writeStorage(draftKey(number), null)
      writeStorage(SIGNATORY_KEY, { name: letter.signatoryName, title: letter.signatoryTitle })
      navigate(`/admin/applicants/${type}/${number}`, {
        replace: true,
        state: { notice: res.warning ?? `Admission letter sent to ${res.recipient}. Status updated to Admitted.` },
      })
    } catch (err) {
      if (err.code === 'already_sent') {
        // Someone else sent a letter meanwhile — require explicit resend confirmation.
        idempotencyKey.current = crypto.randomUUID()
        setAcknowledged(false)
        setDialog({ mode: 'resend', previous: err.body.previous ?? [] })
      } else {
        setDialog(null)
        setError(err.message)
      }
    } finally {
      setBusy(null)
    }
  }

  if (!form) return <AdminCard className="p-8 text-center">Application not found.</AdminCard>
  if (data.state === 'loading' || (data.state === 'ready' && !letter)) {
    return <div className="flex justify-center py-16"><Loader2 className="animate-spin" size={28} style={{ color: 'var(--color-primary)' }} aria-label="Loading" /></div>
  }
  if (data.state === 'error') return <AdminCard className="p-6 text-sm" role="alert"><span style={{ color: '#DC2626' }}>{data.message}</span></AdminCard>

  const a = data.application
  const name = titleCase(`${a.given_names} ${a.family_name}`)
  const detailPath = `/admin/applicants/${type}/${number}`

  if (!LETTER_STATUSES.includes(a.status)) {
    return (
      <AdminCard className="p-8 text-center space-y-4">
        <p>{name} must be marked as <strong>Qualified</strong> before an admission letter can be drafted.</p>
        <Link to={detailPath} className="font-semibold hover:underline" style={{ color: 'var(--color-primary)' }}>Back to application</Link>
      </AdminCard>
    )
  }

  const editor = (
    <AdminCard className="p-5 sm:p-6 space-y-5">
      <div>
        <label htmlFor="letter-subject" className={labelClass} style={labelStyle}>Email subject</label>
        <input id="letter-subject" maxLength={200} value={letter.subject} onChange={e => update('subject', e.target.value)} className="input" />
      </div>
      <div>
        <label htmlFor="letter-body" className={labelClass} style={labelStyle}>Letter</label>
        <textarea id="letter-body" rows={22} maxLength={20000} value={letter.body} onChange={e => update('body', e.target.value)}
          className="input resize-y text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)' }} />
        <p className="text-xs mt-1.5" style={{ color: 'var(--color-text-muted)' }}>
          Leave a blank line between paragraphs. Start a line with “• ” for a bullet point. A line in CAPITALS becomes a heading.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="letter-signatory" className={labelClass} style={labelStyle}>Signatory name</label>
          <input id="letter-signatory" maxLength={120} value={letter.signatoryName} onChange={e => update('signatoryName', e.target.value)} className="input" />
        </div>
        <div>
          <label htmlFor="letter-signatory-title" className={labelClass} style={labelStyle}>Signatory title</label>
          <input id="letter-signatory-title" maxLength={120} value={letter.signatoryTitle} onChange={e => update('signatoryTitle', e.target.value)} className="input" />
        </div>
      </div>
    </AdminCard>
  )

  return (
    <div className="space-y-6">
      <Link to={detailPath} className="inline-flex items-center gap-2 text-sm font-semibold hover:underline" style={{ color: 'var(--color-primary)' }}>
        <ArrowLeft size={16} /> Back to application
      </Link>

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black" style={headingStyle}>Admission letter</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
            For {name} ({a.application_number}) · will be emailed to <strong>{a.email}</strong> as a PDF attachment
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setDialog({ mode: 'reset' })} disabled={busy !== null}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border bg-white text-sm font-semibold"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
            <RotateCcw size={16} /> Reset to template
          </button>
          <button type="button" onClick={previewPdf} disabled={busy !== null || invalid}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 bg-white text-sm font-semibold disabled:opacity-50"
            style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
            {busy === 'preview' ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} />} Preview PDF
          </button>
          <button type="button" onClick={openSendDialog} disabled={busy !== null || invalid}
            className="btn-primary rounded-xl px-5 py-2.5 disabled:opacity-50">
            <Send size={16} /> {a.admission_letter_sent_at ? 'Resend Admission Letter' : 'Send Admission Letter'}
          </button>
        </div>
      </div>

      {restored && (
        <p role="status" className="text-sm rounded-xl px-4 py-3" style={{ backgroundColor: 'var(--color-blue-tint)', color: 'var(--color-primary)' }}>
          Restored your unsent draft from earlier. Use “Reset to template” to start again.
        </p>
      )}
      {a.admission_letter_sent_at && (
        <p role="note" className="text-sm rounded-xl px-4 py-3" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
          An admission letter was already sent to this applicant on {formatDate(a.admission_letter_sent_at, { time: true })}. Sending again will email a second letter.
        </p>
      )}
      {error && <p role="alert" className="text-sm rounded-xl px-4 py-3" style={{ backgroundColor: '#FEF2F2', color: '#B91C1C' }}>{error}</p>}

      {/* Mobile tabs */}
      <div className="lg:hidden grid grid-cols-2 gap-2 p-1 rounded-xl bg-white border" style={{ borderColor: 'var(--color-border)' }} role="tablist">
        {[['edit', 'Edit', FileText], ['preview', 'Preview', Eye]].map(([value, label, Icon]) => (
          <button key={value} type="button" role="tab" aria-selected={tab === value} onClick={() => setTab(value)}
            className="inline-flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold"
            style={{ fontFamily: 'var(--font-heading)', backgroundColor: tab === value ? 'var(--color-primary)' : 'transparent', color: tab === value ? '#fff' : 'var(--color-text-muted)' }}>
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className={tab === 'edit' ? '' : 'hidden lg:block'}>{editor}</div>
        <div className={`lg:sticky lg:top-24 ${tab === 'preview' ? '' : 'hidden lg:block'}`}>
          <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading)' }}>Live preview</p>
          <LetterPreview body={letter.body} signatoryName={letter.signatoryName} signatoryTitle={letter.signatoryTitle} />
        </div>
      </div>

      <ConfirmDialog
        open={dialog?.mode === 'reset'}
        title="Reset the letter to the template?"
        tone="warning"
        confirmLabel="Reset letter"
        onCancel={() => setDialog(null)}
        onConfirm={() => {
          const draft = freshDraft(type, a)
          setLetter(draft)
          writeStorage(draftKey(number), null)
          setRestored(false)
          setDialog(null)
        }}
      >
        <p>Your edits to this letter will be replaced with a fresh copy of the template filled in with {name}’s details.</p>
      </ConfirmDialog>

      <ConfirmDialog
        open={dialog?.mode === 'send'}
        title="Send admission letter?"
        confirmLabel="Send letter"
        busy={busy === 'send'}
        onCancel={() => setDialog(null)}
        onConfirm={send}
      >
        <p>The admission letter will be emailed to <strong>{a.email}</strong> as a PDF attachment, with a copy to the school inbox.</p>
        <p>{name} will be marked as <strong>Admitted</strong>. This cannot be unsent.</p>
      </ConfirmDialog>

      <ConfirmDialog
        open={dialog?.mode === 'resend'}
        title="This applicant has already been sent a letter"
        tone="warning"
        confirmLabel="Send another letter"
        confirmDisabled={!acknowledged}
        busy={busy === 'send'}
        onCancel={() => setDialog(null)}
        onConfirm={send}
      >
        <p>An admission letter has already been sent to <strong>{a.email}</strong>:</p>
        <ul className="list-disc pl-5">
          {(dialog?.previous?.length ? dialog.previous : [{ sentAt: a.admission_letter_sent_at }]).map((p, i) => (
            <li key={i}>{formatDate(p.sentAt, { time: true })}{p.sentBy && ` by ${p.sentBy}`}</li>
          ))}
        </ul>
        <label className="flex items-start gap-2.5 font-semibold cursor-pointer">
          <input type="checkbox" checked={acknowledged} onChange={e => setAcknowledged(e.target.checked)} className="w-4 h-4 mt-0.5" style={{ accentColor: 'var(--color-primary)' }} />
          I understand the applicant will receive another admission letter.
        </label>
      </ConfirmDialog>
    </div>
  )
}
