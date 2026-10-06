import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Loader2, LogOut, ShieldAlert, Users } from 'lucide-react'
import { authConfigured, signOut, supabase, useAdminSession } from '../../lib/adminAuth'
import { adminFetch } from '../../lib/adminApi'
import { labelClass, labelStyle } from '../../lib/adminUi'
import CenteredPanel from '../../components/admin/CenteredPanel'

function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [])
}

function SignIn() {
  const [mode, setMode] = useState('signin') // signin | forgot
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus({ state: 'loading', message: '' })
    if (mode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
      setStatus(error ? { state: 'error', message: 'Incorrect email or password.' } : { state: 'idle', message: '' })
    } else {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/admin/set-password`,
      })
      setStatus(error
        ? { state: 'error', message: 'Could not send the reset email. Please try again later.' }
        : { state: 'done', message: 'If that email belongs to an admin account, a password reset link is on its way.' })
    }
  }

  return (
    <CenteredPanel title={mode === 'signin' ? 'Sign in' : 'Reset your password'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="admin-email" className={labelClass} style={labelStyle}>Email address</label>
          <input id="admin-email" type="email" required autoComplete="username" value={email}
            onChange={e => setEmail(e.target.value)} className="input" />
        </div>
        {mode === 'signin' && (
          <div>
            <label htmlFor="admin-password" className={labelClass} style={labelStyle}>Password</label>
            <input id="admin-password" type="password" required autoComplete="current-password" value={password}
              onChange={e => setPassword(e.target.value)} className="input" />
          </div>
        )}
        {status.message && (
          <p role={status.state === 'error' ? 'alert' : 'status'} className="text-sm"
            style={{ color: status.state === 'error' ? '#DC2626' : 'var(--color-primary)' }}>
            {status.message}
          </p>
        )}
        <button type="submit" disabled={status.state === 'loading'} className="btn-primary w-full justify-center py-3.5 rounded-xl"
          style={{ opacity: status.state === 'loading' ? 0.7 : 1 }}>
          {status.state === 'loading' ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Send reset link'}
        </button>
        <button type="button" onClick={() => { setMode(mode === 'signin' ? 'forgot' : 'signin'); setStatus({ state: 'idle', message: '' }) }}
          className="w-full text-sm font-semibold hover:underline" style={{ color: 'var(--color-primary)' }}>
          {mode === 'signin' ? 'Forgot password?' : 'Back to sign in'}
        </button>
      </form>
    </CenteredPanel>
  )
}

function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-background)' }}>
      <Loader2 className="animate-spin" size={28} style={{ color: 'var(--color-primary)' }} aria-label="Loading" />
    </main>
  )
}

export default function AdminLayout() {
  useNoIndex()
  const { session, loading } = useAdminSession()

  if (!authConfigured) {
    return <CenteredPanel title="Admin not configured"><p className="text-sm">VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY must be set.</p></CenteredPanel>
  }
  if (loading) return <Loading />
  if (!session) return <SignIn />
  // Keyed by user so switching accounts always re-checks admin access.
  return <AdminShell key={session.user.id} session={session} />
}

function AdminShell({ session }) {
  const [admin, setAdmin] = useState({ state: 'loading', profile: null, message: '' })

  useEffect(() => {
    let active = true
    adminFetch('me')
      .then(profile => active && setAdmin({ state: 'ready', profile, message: '' }))
      .catch(err => active && setAdmin({ state: err.status === 403 ? 'forbidden' : 'error', profile: null, message: err.message }))
    return () => { active = false }
  }, [])

  if (admin.state === 'loading') return <Loading />
  if (admin.state !== 'ready') {
    return (
      <CenteredPanel title={admin.state === 'forbidden' ? 'Access denied' : 'Something went wrong'}>
        <div className="flex gap-3 mb-5">
          <ShieldAlert size={22} className="shrink-0" style={{ color: '#B91C1C' }} />
          <p className="text-sm" style={{ color: 'var(--color-text)' }}>
            {admin.message} {admin.state === 'forbidden' && `(${session.user.email})`}
          </p>
        </div>
        <button type="button" onClick={signOut} className="btn-primary w-full justify-center py-3 rounded-xl">Sign out</button>
      </CenteredPanel>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      <header className="sticky top-0 z-40" style={{ backgroundColor: 'var(--color-primary)', borderBottom: '3px solid var(--color-gold)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
          <Link to="/admin/applicants" className="flex items-center gap-2.5 shrink-0">
            <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
              <img src="/vsec-logo.png" alt="" className="w-7 h-7 object-contain" />
            </span>
            <span className="hidden sm:block leading-tight">
              <span className="block text-white font-black text-sm" style={{ fontFamily: 'var(--font-heading)' }}>VSEC College</span>
              <span className="block text-[11px] uppercase tracking-widest font-bold" style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-heading)' }}>Admissions</span>
            </span>
          </Link>
          <nav className="flex-1">
            <NavLink to="/admin/applicants" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-white/10"
              style={{ fontFamily: 'var(--font-heading)' }}>
              <Users size={16} /> Applicants
            </NavLink>
          </nav>
          <span className="hidden md:block text-sm text-white/80 truncate max-w-[200px]" title={admin.profile.email}>{admin.profile.name}</span>
          <button type="button" onClick={signOut} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-white/10"
            style={{ fontFamily: 'var(--font-heading)' }}>
            <LogOut size={16} /> <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Outlet context={{ admin: admin.profile }} />
      </main>
    </div>
  )
}
