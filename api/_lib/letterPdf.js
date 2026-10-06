import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { parseLetterBody } from '../../src/lib/admissionLetter.js'
import { SCHOOL } from '../../src/lib/admissions.js'

const BLUE = rgb(11 / 255, 61 / 255, 145 / 255)
const GOLD = rgb(212 / 255, 175 / 255, 55 / 255)
const TEXT = rgb(0.2, 0.2, 0.2)
const MUTED = rgb(0.39, 0.45, 0.55)

const PAGE = { width: 595.28, height: 841.89 } // A4
const MARGIN_X = 64
const BODY_SIZE = 11
const LINE = 16
const FOOTER_SPACE = 70

let logoBytes
async function loadLogo() {
  if (logoBytes !== undefined) return logoBytes
  try {
    logoBytes = await readFile(path.join(process.cwd(), 'public', 'vsec-logo.png'))
  } catch {
    logoBytes = null // the letter still renders without the logo
  }
  return logoBytes
}

// Ghanaian (Akan/Ewe/Ga) letters outside WinAnsi, mapped to their nearest Latin letter.
const FALLBACKS = { 'Ɛ': 'E', 'ɛ': 'e', 'Ɔ': 'O', 'ɔ': 'o', 'Ŋ': 'N', 'ŋ': 'n', 'Ɖ': 'D', 'ɖ': 'd', 'Ʋ': 'V', 'ʋ': 'v', 'Ƒ': 'F', 'ƒ': 'f', 'Ɣ': 'G', 'ɣ': 'g' }

// Standard PDF fonts only cover WinAnsi; replace anything else instead of failing.
function makeSanitizer(font) {
  const cache = new Map()
  const encodable = ch => {
    if (!cache.has(ch)) {
      try { font.encodeText(ch); cache.set(ch, true) } catch { cache.set(ch, false) }
    }
    return cache.get(ch)
  }
  return text => [...String(text).normalize('NFC')].map(ch => {
    if (ch === '\t') return ' '
    if (encodable(ch)) return ch
    if (FALLBACKS[ch]) return FALLBACKS[ch]
    const base = ch.normalize('NFD').replace(/\p{M}/gu, '')
    return base && [...base].every(encodable) ? base : '?'
  }).join('')
}

function wrap(text, font, size, maxWidth) {
  const words = text.split(/\s+/).filter(Boolean)
  const lines = []
  let line = ''
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      line = candidate
      continue
    }
    if (line) lines.push(line)
    // Break words longer than a full line (e.g. long emails).
    let rest = word
    while (font.widthOfTextAtSize(rest, size) > maxWidth) {
      let cut = rest.length - 1
      while (cut > 1 && font.widthOfTextAtSize(rest.slice(0, cut), size) > maxWidth) cut--
      lines.push(rest.slice(0, cut))
      rest = rest.slice(cut)
    }
    line = rest
  }
  if (line) lines.push(line)
  return lines.length ? lines : ['']
}

/** Renders the admission letter as a branded A4 PDF. Returns a Uint8Array. */
export async function buildLetterPdf({ subject, body, signatoryName, signatoryTitle }) {
  const pdf = await PDFDocument.create()
  pdf.setTitle(subject)
  pdf.setAuthor(SCHOOL.name)
  pdf.setCreator(`${SCHOOL.name} Admissions`)

  const regular = await pdf.embedFont(StandardFonts.Helvetica)
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const clean = makeSanitizer(regular)
  const logoPng = await loadLogo()
  const logo = logoPng ? await pdf.embedPng(logoPng) : null

  const contentWidth = PAGE.width - MARGIN_X * 2
  let page
  let y

  function drawFirstHeader() {
    const bandHeight = 96
    page.drawRectangle({ x: 0, y: PAGE.height - bandHeight, width: PAGE.width, height: bandHeight, color: BLUE })
    page.drawRectangle({ x: 0, y: PAGE.height - bandHeight - 4, width: PAGE.width, height: 4, color: GOLD })
    let textX = MARGIN_X
    if (logo) {
      const size = 62
      const cx = MARGIN_X + size / 2
      const cy = PAGE.height - bandHeight / 2
      page.drawCircle({ x: cx, y: cy, size: size / 2 + 4, color: rgb(1, 1, 1) })
      page.drawImage(logo, { x: cx - size / 2, y: cy - size / 2, width: size, height: size })
      textX = MARGIN_X + size + 20
    }
    page.drawText('VSEC COLLEGE', { x: textX, y: PAGE.height - 50, size: 22, font: bold, color: rgb(1, 1, 1) })
    page.drawText('Office of Admissions', { x: textX, y: PAGE.height - 70, size: 11, font: regular, color: GOLD })
    y = PAGE.height - bandHeight - 48
  }

  function drawContinuationHeader() {
    page.drawRectangle({ x: 0, y: PAGE.height - 6, width: PAGE.width, height: 6, color: BLUE })
    page.drawText(clean(`${SCHOOL.name} – ${subject}`).slice(0, 110), { x: MARGIN_X, y: PAGE.height - 34, size: 9, font: regular, color: MUTED })
    page.drawRectangle({ x: MARGIN_X, y: PAGE.height - 42, width: contentWidth, height: 1, color: GOLD })
    y = PAGE.height - 70
  }

  function newPage() {
    page = pdf.addPage([PAGE.width, PAGE.height])
    if (pdf.getPageCount() === 1) drawFirstHeader()
    else drawContinuationHeader()
  }

  function ensureSpace(height) {
    if (y - height < FOOTER_SPACE) newPage()
  }

  function drawLines(lines, { font = regular, size = BODY_SIZE, color = TEXT, x = MARGIN_X } = {}) {
    for (const line of lines) {
      ensureSpace(LINE)
      page.drawText(line, { x, y, size, font, color })
      y -= LINE
    }
  }

  newPage()

  for (const block of parseLetterBody(body)) {
    if (block.kind === 'heading') {
      const lines = wrap(clean(block.lines[0]), bold, 12, contentWidth)
      ensureSpace(LINE * lines.length + 6)
      y -= 2
      drawLines(lines, { font: bold, size: 12, color: BLUE })
    } else if (block.kind === 'bullets') {
      for (const item of block.lines) {
        const lines = wrap(clean(item), regular, BODY_SIZE, contentWidth - 18)
        ensureSpace(LINE)
        page.drawText('•', { x: MARGIN_X + 4, y, size: BODY_SIZE, font: bold, color: GOLD })
        drawLines(lines, { x: MARGIN_X + 18 })
      }
    } else {
      for (const line of block.lines) drawLines(wrap(clean(line), regular, BODY_SIZE, contentWidth))
    }
    y -= 9 // paragraph spacing
  }

  // Signature block (space left for a handwritten signature on printed copies).
  ensureSpace(LINE * 3 + 40)
  y -= 34
  page.drawRectangle({ x: MARGIN_X, y: y + LINE - 2, width: 160, height: 0.75, color: MUTED })
  drawLines([clean(signatoryName || 'Admissions Office')], { font: bold })
  if (signatoryTitle) drawLines(wrap(clean(signatoryTitle), regular, BODY_SIZE, contentWidth))

  // Footer on every page.
  const pages = pdf.getPages()
  const footer = clean(`${SCHOOL.email}  ·  ${SCHOOL.phone}  ·  ${SCHOOL.website}`)
  pages.forEach((p, i) => {
    p.drawRectangle({ x: MARGIN_X, y: 46, width: contentWidth, height: 0.75, color: GOLD })
    p.drawText(footer, { x: MARGIN_X, y: 32, size: 8.5, font: regular, color: MUTED })
    const label = `Page ${i + 1} of ${pages.length}`
    p.drawText(label, { x: PAGE.width - MARGIN_X - regular.widthOfTextAtSize(label, 8.5), y: 32, size: 8.5, font: regular, color: MUTED })
  })

  return pdf.save()
}
