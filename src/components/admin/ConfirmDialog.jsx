import { useEffect, useRef } from 'react'
import { AlertTriangle, X } from 'lucide-react'

/** Accessible modal confirmation: focus moves into it, Tab stays inside, Esc / backdrop cancel. */
export default function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'primary', // primary | warning | danger
  busy = false,
  confirmDisabled = false,
  onConfirm,
  onCancel,
}) {
  const dialogRef = useRef(null)
  const cancelRef = useRef(null)
  const previouslyFocused = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    previouslyFocused.current = document.activeElement
    cancelRef.current?.focus()
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
      previouslyFocused.current?.focus?.()
    }
  }, [open])

  if (!open) return null

  function handleKeyDown(e) {
    if (e.key === 'Escape' && !busy) {
      e.stopPropagation()
      onCancel()
    }
    if (e.key === 'Tab') {
      const focusable = dialogRef.current.querySelectorAll('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])')
      const list = [...focusable].filter(el => !el.disabled)
      if (list.length === 0) return
      const first = list[0]
      const last = list[list.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  }

  const confirmColors = {
    primary: { backgroundColor: 'var(--color-primary)', color: '#ffffff' },
    warning: { backgroundColor: '#B45309', color: '#ffffff' },
    danger: { backgroundColor: '#B91C1C', color: '#ffffff' },
  }[tone]

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ backgroundColor: 'rgba(9, 46, 110, 0.55)' }}
      onMouseDown={e => { if (e.target === e.currentTarget && !busy) onCancel() }}
    >
      <div
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        onKeyDown={handleKeyDown}
        className="w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: 'var(--shadow-xl)' }}
      >
        <div className="flex items-start gap-3 mb-4">
          {tone !== 'primary' && (
            <AlertTriangle size={22} className="shrink-0 mt-0.5" style={{ color: tone === 'danger' ? '#B91C1C' : '#B45309' }} />
          )}
          <h2 id="confirm-dialog-title" className="flex-1 text-lg font-black" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
            {title}
          </h2>
          <button type="button" onClick={onCancel} disabled={busy} aria-label="Close" className="p-1 rounded-lg hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>
        <div className="text-sm leading-relaxed space-y-3" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)' }}>
          {children}
        </div>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="px-5 py-3 rounded-xl border font-semibold text-sm"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy || confirmDisabled}
            className="px-5 py-3 rounded-xl font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ ...confirmColors, fontFamily: 'var(--font-heading)' }}
          >
            {busy ? 'Please wait…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
