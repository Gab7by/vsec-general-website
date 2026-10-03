import { validateApplication, normalizeApplication } from '../src/lib/applicationCore.js'
import { getForm } from '../src/lib/applicationForms.js'
import { getSupabase } from './_lib/supabase.js'
import { rebuildWorkbook } from './_lib/workbook.js'

const MAX_BODY_BYTES = 50 * 1024

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed.' })
  }
  if (Number(req.headers['content-length'] ?? 0) > MAX_BODY_BYTES) {
    return res.status(413).json({ error: 'Application is too large.' })
  }

  const body = req.body
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ error: 'Invalid request.' })
  }
  const form = getForm(body.applicantType)
  const data = body.data
  if (!form || !data || typeof data !== 'object' || Array.isArray(data)) {
    return res.status(400).json({ error: 'Invalid request.' })
  }

  // Honeypot: real users never see or fill this field.
  if (body.website) return res.status(200).json({ applicationNumber: null })

  const errors = validateApplication(form, data)
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: 'Please correct the highlighted fields.', errors })
  }

  const row = normalizeApplication(form, data)

  let supabase
  try {
    supabase = getSupabase()
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ error: 'Applications are temporarily unavailable.' })
  }

  const { data: inserted, error } = await supabase
    .from(form.table)
    .insert(row)
    .select('application_number')
    .single()

  if (error) {
    if (error.code === '23505') {
      let lookup = supabase.from(form.table).select('application_number')
      for (const key of form.duplicateKey) lookup = lookup.eq(key, row[key])
      const { data: existing } = await lookup.maybeSingle()
      return res.status(409).json({
        error: 'duplicate',
        applicationNumber: existing?.application_number ?? null,
      })
    }
    console.error('Insert failed:', form.type, error.code, error.message)
    return res.status(500).json({ error: 'We could not save your application.' })
  }

  // The database row is the record of truth; a failed Excel refresh must not fail the application.
  try {
    await rebuildWorkbook(form)
  } catch (err) {
    console.error('Workbook rebuild failed:', form.type, err.message)
  }

  return res.status(201).json({ applicationNumber: inserted.application_number })
}
