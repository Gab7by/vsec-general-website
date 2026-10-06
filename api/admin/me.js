import { requireAdmin, allowMethods } from '../_lib/adminAuth.js'

export default async function handler(req, res) {
  if (!allowMethods(req, res, ['GET'])) return
  const admin = await requireAdmin(req, res)
  if (!admin) return
  res.setHeader('Cache-Control', 'no-store')
  return res.status(200).json({ email: admin.email, name: admin.name })
}
