import { Resend } from 'resend'
import { requireAdmin, allowMethods } from '../_lib/adminAuth.js'
import { APPLICATION_NUMBER_RE, loadApplication } from '../_lib/applications.js'
import { buildLetterPdf } from '../_lib/letterPdf.js'
import { BUCKET } from '../_lib/supabase.js'
import { getForm } from '../../src/lib/applicationForms.js'
import { LETTER_STATUSES, SCHOOL } from '../../src/lib/admissions.js'
import { titleCase } from '../../src/lib/admissionLetter.js'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const IN_PROGRESS_WINDOW_MS = 2 * 60 * 1000

function bad(res, message) {
  return res.status(400).json({ error: message })
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch])
}

function coverEmail({ application, signatoryName, signatoryTitle }) {
  const name = titleCase(application.given_names)
  const programme = titleCase(application.programme)
  const text = [
    `Dear ${name},`,
    '',
    `Congratulations! Please find attached your official letter of admission to ${SCHOOL.name} for the ${programme} programme (Application No. ${application.application_number}).`,
    '',
    'Please read the letter carefully and follow the instructions in it to accept your offer. If you have any questions, simply reply to this email.',
    '',
    'Warm regards,',
    signatoryName,
    signatoryTitle,
    `${SCHOOL.email} · ${SCHOOL.phone}`,
  ].filter(l => l !== undefined && l !== null).join('\n')

  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#F5F7FF;font-family:'Open Sans',Arial,sans-serif;color:#333333">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #D1D9F0">
    <div style="background:#0B3D91;padding:20px 28px;border-bottom:4px solid #D4AF37">
      <p style="margin:0;color:#ffffff;font-family:Montserrat,Arial,sans-serif;font-size:20px;font-weight:800;letter-spacing:.5px">VSEC COLLEGE</p>
      <p style="margin:4px 0 0;color:#D4AF37;font-size:13px">Office of Admissions</p>
    </div>
    <div style="padding:28px;font-size:15px;line-height:1.6">
      <p style="margin:0 0 16px">Dear ${escapeHtml(name)},</p>
      <p style="margin:0 0 16px"><strong style="color:#0B3D91">Congratulations!</strong> Please find attached your official letter of admission to ${SCHOOL.name} for the <strong>${escapeHtml(programme)}</strong> programme (Application No. ${escapeHtml(application.application_number)}).</p>
      <p style="margin:0 0 16px">Please read the letter carefully and follow the instructions in it to accept your offer. If you have any questions, simply reply to this email.</p>
      <p style="margin:24px 0 0">Warm regards,<br><strong>${escapeHtml(signatoryName)}</strong>${signatoryTitle ? `<br>${escapeHtml(signatoryTitle)}` : ''}</p>
    </div>
    <div style="padding:16px 28px;background:#EEF2FF;color:#64748B;font-size:12px">${SCHOOL.email} · ${SCHOOL.phone} · ${SCHOOL.website}</div>
  </div></body></html>`

  return { text, html }
}

export default async function handler(req, res) {
  if (!allowMethods(req, res, ['POST'])) return
  const admin = await requireAdmin(req, res)
  if (!admin) return
  const { supabase } = admin

  const b = req.body ?? {}
  const form = getForm(b.type)
  if (!form || typeof b.number !== 'string' || !APPLICATION_NUMBER_RE.test(b.number)) return bad(res, 'Invalid application reference.')
  const subject = typeof b.subject === 'string' ? b.subject.trim() : ''
  const body = typeof b.body === 'string' ? b.body.trim() : ''
  const signatoryName = typeof b.signatoryName === 'string' ? b.signatoryName.trim() : ''
  const signatoryTitle = typeof b.signatoryTitle === 'string' ? b.signatoryTitle.trim() : ''
  if (!subject || subject.length > 200) return bad(res, 'Please enter a subject (up to 200 characters).')
  if (!body || body.length > 20000) return bad(res, 'Please enter the letter text (up to 20,000 characters).')
  if (!signatoryName || signatoryName.length > 120 || signatoryTitle.length > 120) return bad(res, 'Please enter the signatory name and title (up to 120 characters each).')
  if (!['preview', 'send'].includes(b.mode)) return bad(res, 'Invalid request.')

  try {
    const application = await loadApplication(supabase, form, b.number)
    if (!application) return res.status(404).json({ error: 'Application not found.' })
    if (!LETTER_STATUSES.includes(application.status)) {
      return res.status(409).json({ error: 'not_qualified', message: 'Mark the applicant as Qualified before sending an admission letter.' })
    }

    const letter = { subject, body, signatoryName, signatoryTitle }

    if (b.mode === 'preview') {
      const pdf = await buildLetterPdf(letter)
      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', `inline; filename="admission-letter-${application.application_number}-preview.pdf"`)
      res.setHeader('Cache-Control', 'no-store')
      return res.status(200).send(Buffer.from(pdf))
    }

    // ---- send ----
    if (typeof b.idempotencyKey !== 'string' || !UUID_RE.test(b.idempotencyKey)) return bad(res, 'Invalid request.')

    const { data: previous, error: prevError } = await supabase
      .from('admission_letters')
      .select('status, created_at, sent_at, sent_by_name')
      .eq('application_type', form.type)
      .eq('application_id', application.id)
      .in('status', ['sent', 'sending'])
      .order('created_at', { ascending: false })
    if (prevError) throw prevError

    const inProgress = previous.find(l => l.status === 'sending' && Date.now() - Date.parse(l.created_at) < IN_PROGRESS_WINDOW_MS)
    if (inProgress) {
      return res.status(409).json({ error: 'in_progress', message: 'An admission letter for this applicant is already being sent. Please wait a moment and refresh.' })
    }
    const sent = previous.filter(l => l.status === 'sent')
    if ((application.admission_letter_sent_at || sent.length > 0) && b.confirmResend !== true) {
      return res.status(409).json({ error: 'already_sent', previous: sent.map(l => ({ sentAt: l.sent_at, sentBy: l.sent_by_name })) })
    }

    const apiKey = process.env.RESEND_API_KEY?.trim()
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured.')
      return res.status(500).json({ error: 'Email sending is not configured yet.' })
    }

    const { data: row, error: insertError } = await supabase
      .from('admission_letters')
      .insert({
        application_type: form.type,
        application_id: application.id,
        application_number: application.application_number,
        recipient_email: application.email,
        subject,
        body,
        signatory_name: signatoryName,
        signatory_title: signatoryTitle || null,
        idempotency_key: b.idempotencyKey,
        is_resend: sent.length > 0 || Boolean(application.admission_letter_sent_at),
        sent_by: admin.userId,
        sent_by_name: admin.name,
      })
      .select('id')
      .single()
    if (insertError) {
      if (insertError.code === '23505') {
        return res.status(409).json({ error: 'duplicate_request', message: 'This letter has already been submitted for sending.' })
      }
      throw insertError
    }

    const fail = async message => {
      await supabase.from('admission_letters').update({ status: 'failed', error: message.slice(0, 500) }).eq('id', row.id)
    }

    let pdf
    try {
      pdf = Buffer.from(await buildLetterPdf(letter))
    } catch (err) {
      await fail(`PDF: ${err.message}`)
      throw err
    }

    const pdfPath = `letters/${application.application_number}-${Date.now()}.pdf`
    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(pdfPath, pdf, { contentType: 'application/pdf' })
    if (uploadError) console.error('Letter PDF upload failed:', uploadError.message)
    else await supabase.from('admission_letters').update({ pdf_path: pdfPath }).eq('id', row.id)

    const resend = new Resend(apiKey)
    const { text, html } = coverEmail({ application, signatoryName, signatoryTitle })
    const replyTo = process.env.LETTER_REPLY_TO?.trim() || SCHOOL.email
    const bcc = process.env.LETTER_BCC?.trim() ?? SCHOOL.email
    const { data: sentEmail, error: sendError } = await resend.emails.send(
      {
        from: process.env.LETTER_FROM?.trim() || 'VSEC College Admissions <admissions@vseccollege.com>',
        to: [application.email],
        ...(bcc ? { bcc: [bcc] } : {}),
        replyTo,
        subject,
        text,
        html,
        attachments: [{ filename: `VSEC-Admission-Letter-${application.application_number}.pdf`, content: pdf }],
      },
      { idempotencyKey: b.idempotencyKey },
    )
    if (sendError) {
      console.error('Resend failed:', sendError.name, sendError.message)
      await fail(`${sendError.name}: ${sendError.message}`)
      return res.status(502).json({ error: 'send_failed', message: `The email could not be sent: ${sendError.message}` })
    }

    const { data: sentAt, error: recordError } = await supabase.rpc('record_admission_letter_sent', {
      p_letter_id: row.id,
      p_type: form.type,
      p_application_id: application.id,
      p_admin_id: admin.userId,
      p_message_id: sentEmail?.id ?? null,
    })
    if (recordError) {
      // The email went out; surface the bookkeeping problem without implying it failed.
      console.error('record_admission_letter_sent failed:', recordError.message)
      return res.status(200).json({ ok: true, warning: 'The letter was sent, but the status could not be updated. Please refresh and check.' })
    }

    return res.status(200).json({ ok: true, sentAt, recipient: application.email })
  } catch (err) {
    console.error('Send letter failed:', err.message)
    return res.status(500).json({ error: 'Something went wrong while preparing the letter.' })
  }
}
