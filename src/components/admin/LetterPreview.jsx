import { parseLetterBody } from '../../lib/admissionLetter'
import { SCHOOL } from '../../lib/admissions'

/** On-screen preview that mirrors the PDF layout in api/_lib/letterPdf.js. */
export default function LetterPreview({ body, signatoryName, signatoryTitle }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden border" style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
      <div className="flex items-center gap-4 px-6 py-5" style={{ backgroundColor: 'var(--color-primary)', borderBottom: '4px solid var(--color-gold)' }}>
        <span className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0">
          <img src="/vsec-logo.png" alt="" className="w-12 h-12 object-contain" />
        </span>
        <div>
          <p className="text-xl font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>VSEC COLLEGE</p>
          <p className="text-sm" style={{ color: 'var(--color-gold)' }}>Office of Admissions</p>
        </div>
      </div>
      <div className="px-6 sm:px-10 py-8 text-[15px] leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: '#333' }}>
        {parseLetterBody(body).map((block, i) => {
          if (block.kind === 'heading') {
            return <p key={i} className="font-bold mb-3 mt-1" style={{ color: 'var(--color-primary)' }}>{block.lines[0]}</p>
          }
          if (block.kind === 'bullets') {
            return (
              <ul key={i} className="mb-3 space-y-0.5">
                {block.lines.map((line, j) => (
                  <li key={j} className="flex gap-2.5">
                    <span style={{ color: 'var(--color-gold)' }} aria-hidden="true">•</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            )
          }
          return (
            <p key={i} className="mb-3 break-words">
              {block.lines.map((line, j) => <span key={j} className="block">{line}</span>)}
            </p>
          )
        })}
        <div className="mt-10">
          <div className="w-40 border-t mb-1" style={{ borderColor: '#64748B' }} />
          <p className="font-bold">{signatoryName || 'Admissions Office'}</p>
          {signatoryTitle && <p>{signatoryTitle}</p>}
        </div>
      </div>
      <div className="mx-6 sm:mx-10 mb-5 pt-2 border-t text-xs flex flex-wrap gap-x-3" style={{ borderColor: 'var(--color-gold)', color: '#64748B' }}>
        <span>{SCHOOL.email}</span><span>·</span><span>{SCHOOL.phone}</span><span>·</span><span>{SCHOOL.website}</span>
      </div>
    </div>
  )
}
