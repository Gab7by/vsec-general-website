import { requireAdmin, allowMethods } from '../_lib/adminAuth.js'
import { loadAsset } from '../_lib/letterPdf.js'

// Serves the official signature to signed-in admins for the on-screen letter preview.
// The file is deliberately not in public/, so it cannot be downloaded from the website.
export default async function handler(req, res) {
  if (!allowMethods(req, res, ['GET'])) return
  const admin = await requireAdmin(req, res)
  if (!admin) return

  const png = await loadAsset('signature')
  if (!png) return res.status(404).json({ error: 'Signature not found.' })
  res.setHeader('Content-Type', 'image/png')
  res.setHeader('Cache-Control', 'private, max-age=3600')
  return res.status(200).send(png)
}
