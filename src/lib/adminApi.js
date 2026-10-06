import { supabase } from './adminAuth'

export class AdminApiError extends Error {
  constructor(status, body) {
    super(body?.message || (body?.error && !/^[a-z_]+$/.test(body.error) ? body.error : null) || 'Something went wrong. Please try again.')
    this.status = status
    this.code = body?.error
    this.body = body ?? {}
  }
}

/** Calls an /api/admin endpoint with the signed-in admin's access token. */
export async function adminFetch(path, { method = 'GET', body, as = 'json' } = {}) {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  if (!token) throw new AdminApiError(401, { error: 'Please sign in.' })

  const res = await fetch(`/api/admin/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}))
    if (res.status === 401) await supabase.auth.signOut()
    throw new AdminApiError(res.status, errorBody)
  }
  return as === 'blob' ? res.blob() : res.json()
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function formatDate(value, { time = false } = {}) {
  if (!value) return '—'
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T00:00:00`) : new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return date.toLocaleString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
    ...(time ? { hour: '2-digit', minute: '2-digit' } : {}),
  })
}
