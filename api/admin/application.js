import { requireAdmin, allowMethods } from '../_lib/adminAuth.js'
import { getForm } from '../../src/lib/applicationForms.js'
import { MANUAL_STATUSES } from '../../src/lib/admissions.js'
import { APPLICATION_NUMBER_RE, loadApplication } from '../_lib/applications.js'

async function loadLetters(supabase, form, applicationId) {
  const { data, error } = await supabase
    .from('admission_letters')
    .select('id, recipient_email, subject, status, error, is_resend, sent_by_name, created_at, sent_at')
    .eq('application_type', form.type)
    .eq('application_id', applicationId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

async function adminNames(supabase, ids) {
  const unique = [...new Set(ids.filter(Boolean))]
  if (unique.length === 0) return {}
  const { data } = await supabase.from('admin_users').select('user_id, email, full_name').in('user_id', unique)
  return Object.fromEntries((data ?? []).map(a => [a.user_id, a.full_name || a.email]))
}

export default async function handler(req, res) {
  if (!allowMethods(req, res, ['GET', 'PATCH'])) return
  const admin = await requireAdmin(req, res)
  if (!admin) return
  const { supabase } = admin

  const type = req.method === 'GET' ? req.query?.type : req.body?.type
  const number = req.method === 'GET' ? req.query?.number : req.body?.number
  const form = getForm(type)
  if (!form || typeof number !== 'string' || !APPLICATION_NUMBER_RE.test(number)) {
    return res.status(400).json({ error: 'Invalid application reference.' })
  }

  try {
    const application = await loadApplication(supabase, form, number)
    if (!application) return res.status(404).json({ error: 'Application not found.' })

    if (req.method === 'PATCH') {
      const { status, review_notes: notes } = req.body
      const update = {}
      if (status !== undefined) {
        if (!MANUAL_STATUSES.includes(status)) {
          return res.status(400).json({ error: 'Admitted is set automatically when an admission letter is sent.' })
        }
        if (status !== application.status) {
          Object.assign(update, { status, status_updated_at: new Date().toISOString(), status_updated_by: admin.userId })
        }
      }
      if (notes !== undefined) {
        if (typeof notes !== 'string' || notes.length > 5000) return res.status(400).json({ error: 'Notes are too long.' })
        update.review_notes = notes.trim() || null
      }
      if (Object.keys(update).length > 0) {
        const { error } = await supabase.from(form.table).update(update).eq('id', application.id)
        if (error) throw error
        Object.assign(application, update)
      }
    }

    const letters = await loadLetters(supabase, form, application.id)
    const names = await adminNames(supabase, [application.status_updated_by])
    res.setHeader('Cache-Control', 'no-store')
    return res.status(200).json({
      application: { ...application, type: form.type, status_updated_by_name: names[application.status_updated_by] ?? null },
      letters,
    })
  } catch (err) {
    console.error('Application request failed:', err.message)
    return res.status(500).json({ error: 'Could not load or update the application.' })
  }
}
