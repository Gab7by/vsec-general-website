import { useSearchParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import ApplicantTypeStep from '../components/apply/ApplicantTypeStep'
import ApplicationForm from '../components/apply/ApplicationForm'
import { applicationForms } from '../lib/applicationForms'
import { programs } from '../data/enrollPrograms'

const steps = {
  choose: {
    eyebrow: 'Enrollment Application',
    title: 'Apply Now',
    subtitle: 'Tell us what type of applicant you are to get started.',
  },
  domestic: {
    eyebrow: 'Domestic (Ghanaian) Applicant',
    title: 'Student Application Form',
    subtitle: 'Complete the Student Application Form below. It takes about 10 minutes.',
  },
  international: {
    eyebrow: 'International Applicant',
    title: 'Student Application Form',
    subtitle: 'Complete the International Student Application Form below. It takes about 10 minutes.',
  },
}

export default function EnrollPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const preselectedProgram = programs.find(p => p.id === searchParams.get('program'))?.title ?? ''
  const typeParam = searchParams.get('type')
  const step = typeParam === 'domestic' || typeParam === 'international' ? typeParam : 'choose'
  const { eyebrow, title, subtitle } = steps[step]

  function goTo(type) {
    const next = new URLSearchParams(searchParams)
    if (type) next.set('type', type)
    else next.delete('type')
    setSearchParams(next)
    window.scrollTo({ top: 0 })
  }

  return (
    <main>
      {/* Page header */}
      <section
        className="pt-24 pb-12 md:pt-36 md:pb-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0B3D91 0%, #1A52B8 50%, #092E6E 100%)' }}
      >
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-10"
          style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)', transform: 'translate(25%, -25%)' }}
        />
        <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: 'var(--color-gold)' }} aria-hidden="true" />

        <div className="section relative text-center">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}
          >
            {eyebrow}
          </p>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}
          >
            {title}
          </h1>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.8)' }}
          >
            {subtitle}
          </p>
        </div>
      </section>

      {/* Form section */}
      <section className="py-12 md:py-20" style={{ backgroundColor: step === 'choose' ? '#ffffff' : 'var(--color-background)' }}>
        <div className={`section ${step === 'choose' ? 'max-w-2xl' : 'max-w-3xl'}`}>
          {step !== 'choose' && (
            <button
              type="button"
              onClick={() => goTo(null)}
              className="inline-flex items-center gap-2 text-sm font-semibold mb-6 hover:underline"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
            >
              <ArrowLeft size={16} /> Change applicant type
            </button>
          )}

          {step === 'choose' && <ApplicantTypeStep onContinue={goTo} />}
          {step !== 'choose' && (
            <ApplicationForm
              key={step}
              form={applicationForms[step]}
              initialValues={step === 'domestic' && preselectedProgram ? { programme: preselectedProgram } : undefined}
            />
          )}
        </div>
      </section>
    </main>
  )
}
