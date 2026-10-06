// Browser Supabase client — used ONLY for admin sign-in and the session token.
// All admissions data is read and written through /api/admin/* (service role on the server).
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const authConfigured = Boolean(url && key)

// Read before the client is created: Supabase consumes and clears auth hashes. When an
// invite/reset link is expired or already used, Supabase redirects here with
// #error=access_denied&error_code=otp_expired&error_description=…
const authHash = new URLSearchParams(typeof window === 'undefined' ? '' : window.location.hash.slice(1))
export const authLinkError = authHash.get('error_code') || authHash.get('error')
  ? { code: authHash.get('error_code') || authHash.get('error'), description: authHash.get('error_description') ?? '' }
  : null

export const supabase = authConfigured
  ? createClient(url, key, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } })
  : null

export function useAdminSession() {
  const [state, setState] = useState({ session: null, loading: authConfigured })

  useEffect(() => {
    if (!supabase) return undefined
    let active = true
    supabase.auth.getSession().then(({ data }) => {
      if (active) setState({ session: data.session, loading: false })
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({ session, loading: false })
    })
    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [])

  return state
}

/** Emails a link that opens /admin/set-password. Returns { ok, message }. */
export async function requestPasswordLink(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo: `${window.location.origin}/admin/set-password`,
  })
  if (!error) {
    return { ok: true, message: 'If that email belongs to an admin account, a link to set your password is on its way. Check your spam folder too.' }
  }
  if (error.status === 429 || error.code === 'over_email_send_rate_limit') {
    return { ok: false, message: 'Too many emails have been sent recently. Please wait about an hour and try again, or ask the site administrator for help.' }
  }
  return { ok: false, message: 'Could not send the email. Please try again later.' }
}

export async function signOut() {
  await supabase?.auth.signOut()
}
