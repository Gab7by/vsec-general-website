import { requireAdmin, allowMethods } from '../_lib/adminAuth.js'
import { applicationForms } from '../../src/lib/applicationForms.js'

const PAGE_SIZE = 1000
const SUMMARY_COLUMNS = [
  'id', 'application_number', 'created_at', 'given_names', 'family_name', 'email', 'mobile_phone',
  'programme', 'study_mode', 'preferred_campus', 'status', 'status_updated_at', 'admission_letter_sent_at',
].join(',')

async function fetchSummaries(supabase, form) {
  const rows = []
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await supabase
      .from(form.table)
      .select(SUMMARY_COLUMNS)
      .order('created_at', { ascending: false })
      .range(from, from + PAGE_SIZE - 1)
    if (error) throw error
    rows.push(...data.map(r => ({ ...r, type: form.type })))
    if (data.length < PAGE_SIZE) return rows
  }
}

export default async function handler(req, res) {
  if (!allowMethods(req, res, ['GET'])) return
  const admin = await requireAdmin(req, res)
  if (!admin) return

  try {
    const lists = await Promise.all(Object.values(applicationForms).map(f => fetchSummaries(admin.supabase, f)))
    const applications = lists.flat().sort((a, b) => b.created_at.localeCompare(a.created_at))
    res.setHeader('Cache-Control', 'no-store')
    return res.status(200).json({ applications })
  } catch (err) {
    console.error('List applications failed:', err.message)
    return res.status(500).json({ error: 'Could not load applications.' })
  }
}
