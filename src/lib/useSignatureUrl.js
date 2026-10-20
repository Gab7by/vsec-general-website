import { useEffect, useState } from 'react'
import { adminFetch } from './adminApi'

// Fetched once per session through the admin API (the file is not public) and shared
// by every preview, so typing in the letter editor never refetches it.
let signaturePromise = null

function loadSignatureUrl() {
  signaturePromise ??= adminFetch('signature', { as: 'blob' })
    .then(blob => URL.createObjectURL(blob))
    .catch(() => {
      signaturePromise = null // allow a retry on the next preview
      return null
    })
  return signaturePromise
}

export function useSignatureUrl() {
  const [url, setUrl] = useState(null)
  useEffect(() => {
    let active = true
    loadSignatureUrl().then(value => { if (active) setUrl(value) })
    return () => { active = false }
  }, [])
  return url
}
