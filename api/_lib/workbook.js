import ExcelJS from 'exceljs'
import { excelColumns } from '../../src/lib/applicationCore.js'
import { getSupabase, BUCKET } from './supabase.js'

export const XLSX_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

const PAGE_SIZE = 1000

async function fetchAllApplications(supabase, form, columns) {
  const rows = []
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await supabase
      .from(form.table)
      .select(columns.map(c => c.key).join(','))
      .order('id', { ascending: true })
      .range(from, from + PAGE_SIZE - 1)
    if (error) throw error
    rows.push(...data)
    if (data.length < PAGE_SIZE) return rows
  }
}

function toCell(column, value) {
  if (value === null || value === undefined || value === '') return null
  switch (column.type) {
    case 'date': return new Date(`${value}T00:00:00Z`)
    case 'datetime': return new Date(value)
    case 'boolean': return value ? 'Yes' : 'No'
    case 'number': return Number(value)
    default: return value
  }
}

/** Builds the full workbook from every stored application (rows are never dropped). */
export async function buildWorkbook(form, columns, rows) {
  const workbook = new ExcelJS.Workbook()
  workbook.creator = 'VSEC College website'
  workbook.created = new Date()

  const sheet = workbook.addWorksheet(form.sheetName, {
    views: [{ state: 'frozen', xSplit: 1, ySplit: 1 }],
  })
  sheet.columns = columns.map(c => ({
    key: c.key,
    header: c.header,
    width: c.width,
    style: c.type === 'date'
      ? { numFmt: 'dd/mm/yyyy' }
      : c.type === 'datetime' ? { numFmt: 'dd/mm/yyyy hh:mm' } : {},
  }))

  const header = sheet.getRow(1)
  header.height = 30
  header.eachCell(cell => {
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, name: 'Calibri' }
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0B3D91' } }
    cell.alignment = { vertical: 'middle', wrapText: true }
  })

  for (const row of rows) {
    sheet.addRow(Object.fromEntries(columns.map(c => [c.key, toCell(c, row[c.key])])))
  }
  sheet.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: columns.length } }

  return Buffer.from(await workbook.xlsx.writeBuffer())
}

/** Regenerates a form's Excel database from the database and stores it in the private bucket. */
export async function rebuildWorkbook(form) {
  const supabase = getSupabase()
  const columns = excelColumns(form)
  const buffer = await buildWorkbook(form, columns, await fetchAllApplications(supabase, form, columns))
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(form.workbookPath, buffer, { contentType: XLSX_TYPE, upsert: true })
  if (error) throw error
  return buffer
}
