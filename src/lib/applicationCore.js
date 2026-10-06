// Generic engine for VSEC application forms. A form schema (see ./forms/*.js) lists
// sections and fields; these helpers validate, normalise and describe Excel columns
// for any schema, and are shared by the browser and the /api functions.
// Field `name`s are the database column names.

export function todayISO(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function allFields(form) {
  return form.sections.flatMap(s => s.fields.map(f => ({ ...f, section: s })))
}

export function isSectionVisible(section, data) {
  return section.showIf ? section.showIf(data) : true
}

export function isFieldVisible(field, data) {
  return isSectionVisible(field.section, data) && (field.showIf ? field.showIf(data) : true)
}

export function isFieldRequired(field, data) {
  return isFieldVisible(field, data) && Boolean(field.required || field.requiredIf?.(data))
}

export function emptyApplication(form, initial = {}) {
  const data = Object.fromEntries(allFields(form).map(f => [f.name, f.type === 'checkbox' ? false : f.defaultValue ?? '']))
  for (const f of allFields(form)) if (f.autoToday) data[f.name] = todayISO()
  return { ...data, ...initial }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/

function isValidISODate(value) {
  if (!ISO_DATE_RE.test(value)) return false
  const d = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value
}

function addYears(iso, years) {
  const [y, m, d] = iso.split('-')
  return `${Number(y) + years}-${m}-${d}`
}

// International numbers must start with +; local Ghana numbers may be 0XXXXXXXXX.
function phoneError(value, requireCountryCode) {
  const compact = value.replace(/[\s\-()]/g, '')
  if (/^\+\d{7,15}$/.test(compact)) return null
  if (!requireCountryCode && /^0\d{9}$/.test(compact)) return null
  return requireCountryCode
    ? 'Enter the number with country code, starting with + (e.g. +233 54 000 0000).'
    : 'Enter a valid phone number, e.g. 054 000 0000 or +233 54 000 0000.'
}

function checkField(field, raw, data, today) {
  const value = typeof raw === 'string' ? raw.trim() : raw
  const required = isFieldRequired(field, data)

  if (!isFieldVisible(field, data) || field.readOnly) return null
  if (field.type === 'checkbox') {
    return required && value !== true ? (field.errorMessage ?? `${field.label} is required.`) : null
  }
  if (value === '' || value === undefined || value === null) {
    return required ? (field.errorMessage ?? `${field.label} is required.`) : null
  }
  if (typeof value !== 'string') return `${field.label} is invalid.`
  const max = field.max ?? 200
  if (value.length > max) return `${field.label} must be ${max} characters or fewer.`

  if ((field.type === 'radio' || field.type === 'select') && !field.options.includes(value)) {
    return `Please choose a valid option for ${field.label}.`
  }
  if (field.type === 'email' && !EMAIL_RE.test(value)) return 'Please enter a valid email address.'
  if (field.type === 'tel') return phoneError(value, field.requireCountryCode)
  if (field.pattern && !field.pattern.test(value)) return field.patternMessage
  if (field.type === 'date') {
    if (!isValidISODate(value)) return `Please enter a valid date for ${field.label}.`
    if (field.rule === 'future' && value <= today) return field.ruleMessage ?? `${field.label} must be in the future.`
    if (field.rule === 'notPast' && value < today) return 'The start date cannot be in the past.'
    if (field.rule === 'dateOfBirth') {
      if (value > addYears(today, -10)) return 'You must be at least 10 years old to apply.'
      if (value < addYears(today, -100)) return 'Please check your date of birth.'
    }
  }
  if (field.rule === 'year') {
    const year = Number(value)
    const current = Number(today.slice(0, 4))
    if (!/^\d{4}$/.test(value) || year < 1950 || year > current) return `Enter a year between 1950 and ${current}.`
  }
  return null
}

/** Returns { fieldName: message } — empty when valid. */
export function validateApplication(form, data, today = todayISO()) {
  const errors = {}
  for (const field of allFields(form)) {
    const message = checkField(field, data?.[field.name], data ?? {}, today)
    if (message) errors[field.name] = message
  }
  return errors
}

/** Trims, uppercases free text (forms ask for BLOCK CAPITALS) and clears hidden fields. */
export function normalizeApplication(form, data, today = todayISO()) {
  const row = {}
  for (const field of allFields(form)) {
    const visible = isFieldVisible(field, data)
    let value = data[field.name]
    if (field.type === 'checkbox') { row[field.name] = visible ? value === true : null; continue }
    value = visible && typeof value === 'string' ? value.trim() : ''
    if (field.type === 'email') value = value.toLowerCase()
    else if (['text', 'textarea'].includes(field.type)) value = value.toUpperCase()
    else if (field.type === 'tel') value = value.replace(/\s+/g, ' ')
    if (field.type === 'number') value = value === '' ? '' : Number(value)
    if (field.autoToday) value = today
    row[field.name] = value === '' ? null : value
  }
  return row
}

/** Column order for the Excel database. */
export function excelColumns(form) {
  return [
    { key: 'application_number', header: 'Application No.', width: 22 },
    { key: 'created_at', header: 'Submitted At', width: 20, type: 'datetime' },
    { key: 'status', header: 'Admission Status', width: 16, type: 'status' },
    { key: 'admission_letter_sent_at', header: 'Admission Letter Sent', width: 20, type: 'datetime' },
    ...allFields(form).map(f => ({
      key: f.name,
      header: f.excelLabel ?? f.label,
      type: f.type === 'date' ? 'date' : f.type === 'checkbox' ? 'boolean' : f.type === 'number' ? 'number' : 'text',
      width: f.type === 'textarea' ? 40 : f.type === 'date' ? 14 : f.type === 'radio' ? 30 : 22,
    })),
  ]
}
