import { useEffect, useState } from 'react'
import { Download, Lock } from 'lucide-react'
import { applicationForms } from '../lib/applicationForms'

const ENDPOINT = '/api/admin/applicants-xlsx'

export default function AdminApplicantsPage() {
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | done | error
  const [loadingType, setLoadingType] = useState(null)
  const [message, setMessage] = useState('')

  // Keep this staff page out of search engines.
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [])

  async function download(form) {
    if (!password) {
      setMessage('Enter the staff password.')
      setStatus('error')
      return
    }
    setLoadingType(form.type)
    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch(`${ENDPOINT}?type=${form.type}`, { headers: { Authorization: `Bearer ${password}` } })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setMessage(body.error ?? 'Download failed.')
        setStatus('error')
        return
      }
      const url = URL.createObjectURL(await res.blob())
      const a = document.createElement('a')
      a.href = url
      a.download = form.workbookPath
      a.click()
      URL.revokeObjectURL(url)
      setStatus('done')
    } catch {
      setMessage('Network error. Please try again.')
      setStatus('error')
    } finally {
      setLoadingType(null)
    }
  }

  return (
    <main className="pt-28 pb-20 md:pt-36" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="section max-w-md">
        <form
          onSubmit={e => e.preventDefault()}
          className="rounded-2xl p-6 sm:p-8 border bg-white"
          style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-md)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Lock size={22} style={{ color: 'var(--color-primary)' }} />
            <h1 className="text-xl font-black" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
              Application Databases
            </h1>
          </div>
          <label htmlFor="admin-password" className="block text-sm font-bold mb-2"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
            Staff password
          </label>
          <input id="admin-password" type="password" required autoComplete="current-password"
            value={password} onChange={e => setPassword(e.target.value)} className="input mb-5" />

          {status === 'error' && (
            <p role="alert" className="text-sm mb-4" style={{ color: '#DC2626' }}>{message}</p>
          )}
          {status === 'done' && (
            <p role="status" className="text-sm mb-4" style={{ color: 'var(--color-primary)' }}>
              Download started.
            </p>
          )}

          <div className="space-y-3">
            {Object.values(applicationForms).map(form => (
              <button key={form.type} type="button" onClick={() => download(form)} disabled={status === 'loading'}
                className="btn-primary w-full justify-center py-3.5 rounded-xl"
                style={{ opacity: status === 'loading' ? 0.7 : 1 }}>
                <Download size={18} />
                {loadingType === form.type ? 'Preparing…' : `Download ${form.label} applicants (.xlsx)`}
              </button>
            ))}
          </div>
        </form>
      </div>
    </main>
  )
}
