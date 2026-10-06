// Admission letter template. Produces plain text with every placeholder already
// filled in, so admins can edit the letter freely before it is sent. The same text
// is rendered in the admin preview and in the PDF (api/_lib/letterPdf.js).
//
// Formatting conventions understood by both renderers:
//   - blank line            → paragraph break
//   - line starting "• "    → bullet point
//   - line in ALL CAPS      → bold heading

import { SCHOOL } from './admissions.js'

export function formatLetterDate(iso) {
  if (!iso) return ''
  const d = new Date(`${String(iso).slice(0, 10)}T00:00:00Z`)
  if (Number.isNaN(d.getTime())) return String(iso)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}

function addDays(iso, days) {
  const d = new Date(`${iso}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

// Applications are stored in BLOCK CAPITALS; letters read better in title case.
export function titleCase(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/(^|[\s\-'(/])(\p{L})/gu, (_, sep, ch) => sep + ch.toUpperCase())
}

export function letterTitle(application) {
  return `Offer of Admission – ${titleCase(application.programme)} – ${SCHOOL.name}`
}

export function buildLetterDraft(type, application, today = new Date().toISOString().slice(0, 10)) {
  const a = application
  const givenNames = titleCase(a.given_names)
  const familyName = titleCase(a.family_name)
  const programme = titleCase(a.programme)
  const campus = type === 'domestic' ? a.preferred_campus : titleCase(a.preferred_campus)
  const location = type === 'domestic'
    ? [titleCase(a.city), a.region].filter(Boolean).join(', ')
    : [titleCase(a.country)].filter(Boolean).join(', ')
  const deadline = formatLetterDate(addDays(today, 14))

  const paragraphs = [
    [formatLetterDate(today), `Ref: ${a.application_number}`].join('\n'),
    [`${givenNames} ${familyName}`, location, a.email].filter(Boolean).join('\n'),
    `Dear ${givenNames} ${familyName},`,
    `OFFER OF ADMISSION – ${String(a.programme).toUpperCase()}`,
    `We are pleased to inform you that, following a careful review of your application, you have been offered admission to ${SCHOOL.name} to study the ${programme} programme.`,
    [
      'The details of your admission are as follows:',
      `• Programme: ${programme}`,
      `• Mode of study: ${a.study_mode}`,
      `• Campus: ${campus}`,
      `• Commencement date: ${formatLetterDate(a.preferred_start_date)}`,
      `• Application number: ${a.application_number}`,
    ].join('\n'),
  ]

  if (type === 'international') {
    paragraphs.push(
      'This letter confirms your admission and may be presented in support of your student visa and immigration applications. Please contact the Admissions Office if you require any additional documentation.',
    )
  }
  if (type === 'domestic' && a.application_type === 'Corporate-Sponsored Learner' && a.sponsor_org_name) {
    paragraphs.push(
      `As a corporate-sponsored learner, your tuition fees will be invoiced to ${titleCase(a.sponsor_org_name)} in line with the sponsorship confirmation provided with your application.`,
    )
  }

  paragraphs.push(
    `To accept this offer, please reply to this email or contact the Admissions Office at ${SCHOOL.email} or ${SCHOOL.phone} by ${deadline}. Details of fees, orientation and your first day will be shared with you upon acceptance.`,
    `Congratulations once again on your admission. We look forward to welcoming you to ${SCHOOL.name}.`,
    'Yours sincerely,',
  )

  return { subject: letterTitle(a), body: paragraphs.join('\n\n') }
}

/** Splits letter text into blocks for rendering: { kind: 'heading' | 'paragraph' | 'bullets', lines }. */
export function parseLetterBody(body) {
  return String(body ?? '')
    .replace(/\r\n/g, '\n')
    .split(/\n\s*\n/)
    .map(block => block.split('\n').map(l => l.trimEnd()).filter(l => l.trim() !== ''))
    .filter(lines => lines.length > 0)
    .flatMap(lines => {
      const out = []
      let current = null
      for (const line of lines) {
        const isBullet = /^\s*[•\-*]\s+/.test(line)
        const kind = isBullet ? 'bullets' : 'paragraph'
        const text = isBullet ? line.replace(/^\s*[•\-*]\s+/, '') : line
        if (!current || current.kind !== kind) {
          current = { kind, lines: [] }
          out.push(current)
        }
        current.lines.push(text)
      }
      return out.map(b =>
        b.kind === 'paragraph' && b.lines.length === 1 && isHeading(b.lines[0]) ? { kind: 'heading', lines: b.lines } : b,
      )
    })
}

function isHeading(line) {
  const letters = line.replace(/[^\p{L}]/gu, '')
  return letters.length >= 4 && letters === letters.toUpperCase() && line.length <= 120
}
