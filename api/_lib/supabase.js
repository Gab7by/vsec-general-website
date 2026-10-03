import { createClient } from '@supabase/supabase-js'

export const BUCKET = 'applications'

let client

// Server-only client. The service role key bypasses RLS, so it must never reach the browser.
export function getSupabase() {
  const url = process.env.SUPABASE_URL?.trim()
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!url || !key) throw new Error('Supabase is not configured (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).')
  client ??= createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
  return client
}
