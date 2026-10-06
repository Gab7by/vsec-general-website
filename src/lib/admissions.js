// Admission review statuses, shared by the admin UI and the /api/admin functions.

export const STATUSES = [
  { value: 'pending',   label: 'Pending',   color: '#92400E', background: '#FEF3C7' },
  { value: 'qualified', label: 'Qualified', color: '#1E40AF', background: '#DBEAFE' },
  { value: 'admitted',  label: 'Admitted',  color: '#166534', background: '#DCFCE7' },
  { value: 'rejected',  label: 'Rejected',  color: '#991B1B', background: '#FEE2E2' },
]

/** Statuses an admin may set by hand; "admitted" is only set by sending an admission letter. */
export const MANUAL_STATUSES = ['pending', 'qualified', 'rejected']

/** An admission letter may be drafted/sent for these statuses (admitted = resend). */
export const LETTER_STATUSES = ['qualified', 'admitted']

export function statusInfo(value) {
  return STATUSES.find(s => s.value === value) ?? STATUSES[0]
}

export const SCHOOL = {
  name: 'VSEC College',
  email: 'vseccollege@gmail.com',
  phone: '+233 541 623 059',
  website: 'vseccollege.com',
}

export const DEFAULT_SIGNATORY = { name: 'Admissions Office', title: 'VSEC College' }
