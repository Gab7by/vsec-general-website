import { getSupabase } from './supabase.js'

/**
 * Verifies the Supabase Auth access token sent as `Authorization: Bearer <token>`
 * and that the user is on the `admin_users` allow-list.
 * Returns { userId, email, name } or sends a 401/403/500 response and returns null.
 */
export async function requireAdmin(req, res) {
  const auth = req.headers.authorization ?? ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : ''
  if (!token) {
    res.status(401).json({ error: 'Please sign in.' })
    return null
  }

  let supabase
  try {
    supabase = getSupabase()
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: 'Admin is temporarily unavailable.' })
    return null
  }

  const { data: userData, error: userError } = await supabase.auth.getUser(token)
  if (userError || !userData?.user) {
    res.status(401).json({ error: 'Your session has expired. Please sign in again.' })
    return null
  }

  const { data: admin, error } = await supabase
    .from('admin_users')
    .select('user_id, email, full_name')
    .eq('user_id', userData.user.id)
    .maybeSingle()
  if (error) {
    console.error('Admin lookup failed:', error.message)
    res.status(500).json({ error: 'Admin is temporarily unavailable.' })
    return null
  }
  if (!admin) {
    res.status(403).json({ error: 'This account is not authorised to use the admissions admin.' })
    return null
  }

  return { userId: admin.user_id, email: admin.email, name: admin.full_name || admin.email, supabase }
}

export function allowMethods(req, res, methods) {
  if (methods.includes(req.method)) return true
  res.setHeader('Allow', methods.join(', '))
  res.status(405).json({ error: 'Method not allowed.' })
  return false
}
