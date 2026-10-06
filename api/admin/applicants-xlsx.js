import { getForm } from '../../src/lib/applicationForms.js'
import { rebuildWorkbook, XLSX_TYPE } from '../_lib/workbook.js'
import { requireAdmin, allowMethods } from '../_lib/adminAuth.js'

export default async function handler(req, res) {
  if (!allowMethods(req, res, ['GET'])) return
  const admin = await requireAdmin(req, res)
  if (!admin) return

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
