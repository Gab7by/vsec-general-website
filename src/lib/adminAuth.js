// Browser Supabase client — used ONLY for admin sign-in and the session token.
// All admissions data is read and written through /api/admin/* (service role on the server).
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const authConfigured = Boolean(url && key)

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

export async function signOut() {
  await supabase?.auth.signOut()
}
