import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { authLinkError, requestPasswordLink, supabase, useAdminSession } from '../../lib/adminAuth'
import CenteredPanel from '../../components/admin/CenteredPanel'
import { labelClass, labelStyle } from '../../lib/adminUi'

function RequestNewLink() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus({ state: 'loading', message: '' })
    const result = await requestPasswordLink(email)
    setStatus({ state: result.ok ? 'done' : 'error', message: result.message })
  }

  if (status.state === 'done') {
    return <p role="status" className="text-sm" style={{ color: 'var(--color-primary)' }}>{status.message}</p>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="link-email" className={labelClass} style={labelStyle}>Your admin email address</label>
        <input id="link-email" type="email" required autoComplete="username" value={email}
          onChange={e => setEmail(e.target.value)} className="input" />
      </div>
      {status.state === 'error' && <p role="alert" className="text-sm" style={{ color: '#DC2626' }}>{status.message}</p>}
      <button type="submit" disabled={status.state === 'loading'} className="btn-primary w-full justify-center py-3.5 rounded-xl">
        {status.state === 'loading' ? 'Sending…' : 'Email me a new link'}
      </button>
      <Link to="/admin/applicants" className="block text-center text-sm font-semibold hover:underline" style={{ color: 'var(--color-primary)' }}>
        I already have a password — sign in
      </Link>
    </form>
  )
}

// Landing page for Supabase invite and password-recovery links.
export default function AdminSetPasswordPage() {
  const { session, loading } = useAdminSession()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  async function handleSubmit(e) {
    e.preventDefault()
    if (password.length < 10) return setStatus({ state: 'error', message: 'Use at least 10 characters.' })
    if (password !== confirm) return setStatus({ state: 'error', message: 'The passwords do not match.' })
    setStatus({ state: 'loading', message: '' })
    const { error } = await supabase.auth.updateUser({ password })
    setStatus(error ? { state: 'error', message: error.message } : { state: 'done', message: '' })
  }

  if (loading) {
    return <CenteredPanel title="Set your password"><Loader2 className="animate-spin" style={{ color: 'var(--color-primary)' }} /></CenteredPanel>
  }
  if (!session) {
    const used = authLinkError?.code === 'otp_expired'
    return (
      <CenteredPanel title={authLinkError ? 'This link has expired' : 'Set your password'}>
        <p className="text-sm mb-5" style={{ color: 'var(--color-text)' }}>
          {authLinkError
            ? used
              ? 'Invite and password links can only be used once and expire after a while. This one has already been used or is too old.'
              : `This link could not be used${authLinkError.description ? ` (${authLinkError.description})` : ''}.`
            : 'Open this page from the link in your invite or password-reset email.'}
          {' '}Enter your email below and we’ll send you a fresh link.
        </p>
        <RequestNewLink />
      </CenteredPanel>
    )
  }
  if (status.state === 'done') {
    return (
      <CenteredPanel title="Password saved">
        <p className="text-sm mb-5">Your password has been set. You can now use the admissions admin.</p>
        <Link to="/admin/applicants" className="btn-primary w-full justify-center py-3 rounded-xl">Continue</Link>
      </CenteredPanel>
    )
  }

  return (
    <CenteredPanel title="Set your password">
      <p className="text-sm mb-5" style={{ color: 'var(--color-text-muted)' }}>Signed in as {session.user.email}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="new-password" className={labelClass} style={labelStyle}>New password</label>
          <input id="new-password" type="password" autoComplete="new-password" required value={password}
            onChange={e => setPassword(e.target.value)} className="input" />
        </div>
        <div>
          <label htmlFor="confirm-password" className={labelClass} style={labelStyle}>Confirm password</label>
          <input id="confirm-password" type="password" autoComplete="new-password" required value={confirm}
            onChange={e => setConfirm(e.target.value)} className="input" />
        </div>
        {status.state === 'error' && <p role="alert" className="text-sm" style={{ color: '#DC2626' }}>{status.message}</p>}
        <button type="submit" disabled={status.state === 'loading'} className="btn-primary w-full justify-center py-3.5 rounded-xl">
          {status.state === 'loading' ? 'Saving…' : 'Save password'}
        </button>
      </form>
    </CenteredPanel>
  )
}
