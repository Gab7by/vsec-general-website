import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronRight, Download, Loader2, RefreshCw, Search, X } from 'lucide-react'
import { adminFetch, downloadBlob, formatDate } from '../../lib/adminApi'
import { STATUSES } from '../../lib/admissions'
import { titleCase } from '../../lib/admissionLetter'
import { applicationForms } from '../../lib/applicationForms'
import { headingStyle } from '../../lib/adminUi'
import AdminCard from '../../components/admin/AdminCard'
import StatusBadge from '../../components/admin/StatusBadge'

const FILTER_KEYS = ['q', 'status', 'type', 'programme', 'from', 'to']
const TYPE_LABEL = { domestic: 'Domestic', international: 'International' }

function fullName(a) {
  return titleCase(`${a.given_names} ${a.family_name}`)
}

function detailPath(a) {
  return `/admin/applicants/${a.type}/${a.application_number}`
}

export default function AdminApplicantsPage() {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const filters = Object.fromEntries(FILTER_KEYS.map(k => [k, params.get(k) ?? '']))
  const [data, setData] = useState({ state: 'loading', applications: [], message: '' })
  const [reloadKey, setReloadKey] = useState(0)
  const [downloading, setDownloading] = useState(null)
  const [downloadError, setDownloadError] = useState('')

  useEffect(() => {
    let active = true
    adminFetch('applications')
      .then(({ applications }) => active && setData({ state: 'ready', applications, message: '' }))
      .catch(err => active && setData(prev => ({ ...prev, state: 'error', message: err.message })))
    return () => { active = false }
  }, [reloadKey])

  const setFilter = useCallback((key, value) => {
    setParams(prev => {
      const next = new URLSearchParams(prev)
      if (value) next.set(key, value)
      else next.delete(key)
      return next
    }, { replace: true })
  }, [setParams])

  const programmes = useMemo(
    () => [...new Set(data.applications.map(a => titleCase(a.programme)))].sort(),
    [data.applications],
  )

  // Everything except the status filter — used for the status count chips.
  const baseFiltered = useMemo(() => {
    const q = filters.q.trim().toLowerCase()
    return data.applications.filter(a => {
      if (filters.type && a.type !== filters.type) return false
      if (filters.programme && titleCase(a.programme) !== filters.programme) return false
      const day = a.created_at.slice(0, 10)
      if (filters.from && day < filters.from) return false
      if (filters.to && day > filters.to) return false
      if (q) {
        const haystack = `${a.given_names} ${a.family_name} ${a.email} ${a.application_number} ${a.mobile_phone}`.toLowerCase()
        if (!q.split(/\s+/).every(term => haystack.includes(term))) return false
      }
      return true
    })
  }, [data.applications, filters.q, filters.type, filters.programme, filters.from, filters.to])

  const rows = filters.status ? baseFiltered.filter(a => a.status === filters.status) : baseFiltered
  const counts = Object.fromEntries(STATUSES.map(s => [s.value, baseFiltered.filter(a => a.status === s.value).length]))
  const hasFilters = FILTER_KEYS.some(k => filters[k])

  async function downloadExcel(form) {
    setDownloading(form.type)
    setDownloadError('')
    try {
      downloadBlob(await adminFetch(`applicants-xlsx?type=${form.type}`, { as: 'blob' }), form.workbookPath)
    } catch (err) {
      setDownloadError(err.message)
    } finally {
      setDownloading(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black" style={headingStyle}>Applicants</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
            Review applications, update admission status and send admission letters.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.values(applicationForms).map(form => (
            <button key={form.type} type="button" onClick={() => downloadExcel(form)} disabled={downloading !== null}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border bg-white text-sm font-semibold hover:bg-slate-50 disabled:opacity-60"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
              {downloading === form.type ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
              {form.label} Excel
            </button>
          ))}
        </div>
      </div>
      {downloadError && <p role="alert" className="text-sm" style={{ color: '#DC2626' }}>{downloadError}</p>}

      {/* Status chips */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[{ value: '', label: 'All', count: baseFiltered.length }, ...STATUSES.map(s => ({ ...s, count: counts[s.value] }))].map(s => {
          const active = filters.status === s.value
          return (
            <button key={s.value || 'all'} type="button" onClick={() => setFilter('status', s.value)} aria-pressed={active}
              className="text-left rounded-xl border-2 px-4 py-3 bg-white transition-colors"
              style={{ borderColor: active ? 'var(--color-primary)' : 'var(--color-border)' }}>
              <span className="block text-2xl font-black" style={{ ...headingStyle, color: s.color ?? 'var(--color-primary)' }}>{s.count}</span>
              <span className="block text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading)' }}>{s.label}</span>
            </button>
          )
        })}
      </div>

      {/* Filters */}
      <AdminCard className="p-4 sm:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          <label className="relative lg:col-span-4">
            <span className="sr-only">Search applicants</span>
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} />
            <input type="search" value={filters.q} onChange={e => setFilter('q', e.target.value)}
              placeholder="Search name, email, phone or application no." className="input" style={{ paddingLeft: 42 }} />
          </label>
          <label className="lg:col-span-2">
            <span className="sr-only">Applicant type</span>
            <select value={filters.type} onChange={e => setFilter('type', e.target.value)} className="input" style={{ cursor: 'pointer' }}>
              <option value="">All types</option>
              <option value="domestic">Domestic</option>
              <option value="international">International</option>
            </select>
          </label>
          <label className="lg:col-span-2">
            <span className="sr-only">Programme</span>
            <select value={filters.programme} onChange={e => setFilter('programme', e.target.value)} className="input" style={{ cursor: 'pointer' }}>
              <option value="">All programmes</option>
              {programmes.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </label>
          <label className="lg:col-span-2">
            <span className="block text-[11px] font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--color-text-muted)' }}>Applied from</span>
            <input type="date" value={filters.from} max={filters.to || undefined} onChange={e => setFilter('from', e.target.value)} className="input" />
          </label>
          <label className="lg:col-span-2">
            <span className="block text-[11px] font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--color-text-muted)' }}>Applied to</span>
            <input type="date" value={filters.to} min={filters.from || undefined} onChange={e => setFilter('to', e.target.value)} className="input" />
          </label>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 mt-3 text-sm">
          <span style={{ color: 'var(--color-text-muted)' }} aria-live="polite">
            {data.state === 'ready' && `${rows.length} of ${data.applications.length} applicant${data.applications.length === 1 ? '' : 's'}`}
          </span>
          <div className="flex gap-4">
            {hasFilters && (
              <button type="button" onClick={() => setParams({}, { replace: true })} className="inline-flex items-center gap-1 font-semibold hover:underline" style={{ color: 'var(--color-primary)' }}>
                <X size={14} /> Clear filters
              </button>
            )}
            <button type="button" onClick={() => setReloadKey(k => k + 1)} className="inline-flex items-center gap-1 font-semibold hover:underline" style={{ color: 'var(--color-primary)' }}>
              <RefreshCw size={14} /> Refresh
            </button>
          </div>
        </div>
      </AdminCard>

      {data.state === 'loading' && (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin" size={28} style={{ color: 'var(--color-primary)' }} aria-label="Loading applicants" /></div>
      )}
      {data.state === 'error' && (
        <AdminCard className="p-6 text-sm" role="alert"><span style={{ color: '#DC2626' }}>{data.message}</span></AdminCard>
      )}
      {data.state === 'ready' && rows.length === 0 && (
        <AdminCard className="p-10 text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
          {data.applications.length === 0 ? 'No applications have been submitted yet.' : 'No applicants match these filters.'}
        </AdminCard>
      )}

      {data.state === 'ready' && rows.length > 0 && (
        <>
          {/* Desktop / tablet table */}
          <AdminCard className="hidden md:block overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide" style={{ backgroundColor: 'var(--color-blue-tint)', color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading)' }}>
                  <th className="px-4 py-3 font-semibold">Applicant</th>
                  <th className="px-4 py-3 font-semibold">Programme</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Applied</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold hidden lg:table-cell">Letter sent</th>
                  <th className="px-2 py-3"><span className="sr-only">Open</span></th>
                </tr>
              </thead>
              <tbody>
                {rows.map(a => (
                  <tr key={`${a.type}-${a.id}`} onClick={() => navigate(detailPath(a))}
                    className="border-t cursor-pointer hover:bg-slate-50" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="px-4 py-3">
                      <Link to={detailPath(a)} onClick={e => e.stopPropagation()} className="font-semibold hover:underline" style={{ color: 'var(--color-primary)' }}>
                        {fullName(a)}
                      </Link>
                      <span className="block text-xs" style={{ color: 'var(--color-text-muted)' }}>{a.email} · {a.application_number}</span>
                    </td>
                    <td className="px-4 py-3">{titleCase(a.programme)}<span className="block text-xs" style={{ color: 'var(--color-text-muted)' }}>{a.study_mode}</span></td>
                    <td className="px-4 py-3">{TYPE_LABEL[a.type]}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{formatDate(a.created_at)}</td>
                    <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                    <td className="px-4 py-3 whitespace-nowrap hidden lg:table-cell">{a.admission_letter_sent_at ? formatDate(a.admission_letter_sent_at) : '—'}</td>
                    <td className="px-2 py-3"><ChevronRight size={18} style={{ color: 'var(--color-text-muted)' }} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AdminCard>

          {/* Mobile cards */}
          <ul className="md:hidden space-y-3">
            {rows.map(a => (
              <li key={`${a.type}-${a.id}`}>
                <Link to={detailPath(a)} className="block rounded-2xl border bg-white p-4" style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-bold truncate" style={headingStyle}>{fullName(a)}</p>
                      <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>{a.email}</p>
                    </div>
                    <StatusBadge status={a.status} />
                  </div>
                  <p className="text-sm mt-2">{titleCase(a.programme)} · {a.study_mode}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                    {TYPE_LABEL[a.type]} · Applied {formatDate(a.created_at)} · {a.application_number}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
