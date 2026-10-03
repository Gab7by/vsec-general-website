import { createHash, timingSafeEqual } from 'node:crypto'
import { getForm } from '../../src/lib/applicationForms.js'
import { rebuildWorkbook, XLSX_TYPE } from '../_lib/workbook.js'

function passwordMatches(given) {
  const expected = process.env.ADMIN_PASSWORD?.trim()
  if (!expected || !given) return false
  const a = createHash('sha256').update(given).digest()
  const b = createHash('sha256').update(expected).digest()
  return timingSafeEqual(a, b)
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const auth = req.headers.authorization ?? ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  if (!passwordMatches(token)) {
    return res.status(401).json({ error: 'Incorrect password.' })
  }

  const form = getForm(req.query?.type)
  if (!form) return res.status(400).json({ error: 'Unknown applicant type.' })

  try {
    // Always rebuild so the download includes every application, even if a
    // per-submission refresh failed or two submissions raced.
    const buffer = await rebuildWorkbook(form)
    res.setHeader('Content-Type', XLSX_TYPE)
    res.setHeader('Content-Disposition', `attachment; filename="${form.workbookPath}"`)
    res.setHeader('Cache-Control', 'no-store')
    return res.status(200).send(buffer)
  } catch (err) {
    console.error('Workbook download failed:', form.type, err.message)
    return res.status(500).json({ error: 'Could not generate the Excel database.' })
  }
}
