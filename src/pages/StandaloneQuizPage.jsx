import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, XCircle, RotateCcw, BookOpen, GraduationCap, ExternalLink, User, Mail } from 'lucide-react'
import { questions, levelResults, getLevel } from '../data/quizQuestions'

const FEEDBACK_DELAY = 900
const FORMSPREE_URL = 'https://formspree.io/f/mykazavk'

function BrandedHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b flex items-center justify-between px-5 py-3"
      style={{ borderColor: 'var(--color-border)', minHeight: '56px' }}>
      <div className="flex items-center gap-2">
        <img src="/vsec-logo.png" alt="VSEC College" className="h-8 w-auto" />
        <span className="font-black text-base hidden sm:block"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
          VSEC College
        </span>
      </div>
      <span className="text-xs font-bold uppercase tracking-widest"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}>
        Free English Assessment
      </span>
    </header>
  )
}

export default function StandaloneQuizPage() {
  const [phase, setPhase] = useState('intro')   // 'intro' | 'collect' | 'quiz' | 'result'
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)
  const [locked, setLocked] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [phase, current])

  function handleCollect(e) {
    e.preventDefault()
    setUserName(e.target.elements['fullName'].value.trim())
    setUserEmail(e.target.elements['email'].value.trim())
    setCurrent(0)
    setScore(0)
    setSelected(null)
    setLocked(false)
    setPhase('quiz')
  }

  function sendResults(name, email, finalScore) {
    const level = levelResults[getLevel(finalScore)]
    const completedAt = new Date().toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'medium' })
    fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `English Test Result — ${name}`,
        'Full Name': name,
        'Participant Email': email,
        'Score': `${finalScore} / ${questions.length}`,
        'CEFR Level': level.badge,
        'Recommended Course': level.recommendedCourse,
        'Program': level.programName,
        'Completed At': completedAt,
      }),
    }).catch(() => {})
  }

  function handleSelect(option) {
    if (locked) return
    setSelected(option)
    setLocked(true)
    const correct = option === questions[current].answer
    const newScore = correct ? score + 1 : score

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(c => c + 1)
        setSelected(null)
        setLocked(false)
        if (correct) setScore(newScore)
      } else {
        if (correct) setScore(newScore)
        sendResults(userName, userEmail, newScore)
        setPhase('result')
      }
    }, FEEDBACK_DELAY)

    if (correct) setScore(newScore)
  }

  const q = questions[current]
  const result = phase === 'result' ? levelResults[getLevel(score)] : null

  // ── Intro ─────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <>
        <BrandedHeader />
        <main>
          <section
            className="pt-14 pb-12 md:pb-20 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0B3D91 0%, #1A52B8 50%, #092E6E 100%)', minHeight: '280px' }}
          >
            <div aria-hidden="true" className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-10"
              style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)', transform: 'translate(25%, -25%)' }} />
            <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: 'var(--color-gold)' }} aria-hidden="true" />
            <div className="section relative text-center pt-10 md:pt-16">
              <p className="text-sm font-bold uppercase tracking-widest mb-3"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}>
                English Proficiency
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>
                Test Your English Level
              </h1>
              <p className="text-base md:text-lg max-w-xl mx-auto"
                style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.8)' }}>
                Answer 20 questions and instantly discover your CEFR proficiency level — from Beginner to Advanced — along with a personalised course recommendation.
              </p>
            </div>
          </section>

          <section className="py-12 md:py-16 bg-white">
            <div className="section max-w-2xl">
              <div className="rounded-2xl p-8 md:p-12 border text-center"
                style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-md)' }}>

                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: 'var(--color-blue-tint)' }}>
                  <BookOpen size={30} style={{ color: 'var(--color-primary)' }} strokeWidth={1.75} />
                </div>

                <h2 className="text-2xl font-black mb-3"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                  How It Works
                </h2>
                <p className="text-base leading-relaxed mb-6"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}>
                  You will be shown 20 multiple-choice questions covering grammar, vocabulary, and sentence structure
                  across five CEFR proficiency levels. Choose the best answer for each question. At the end, we will
                  tell you your exact English level and recommend the right VSEC course for you.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {[['20', 'Questions'], ['~7 min', 'Duration'], ['Instant', 'Result']].map(([val, lbl]) => (
                    <div key={lbl} className="px-5 py-3 rounded-xl"
                      style={{ backgroundColor: 'var(--color-blue-tint)' }}>
                      <p className="text-lg font-black" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>{val}</p>
                      <p className="text-xs" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}>{lbl}</p>
                    </div>
                  ))}
                </div>

                <button onClick={() => setPhase('collect')} className="btn-primary text-base px-10 py-4 rounded-xl">
                  Start Quiz
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </section>
        </main>
      </>
    )
  }

  // ── Collect ───────────────────────────────────────────────────────────────
  if (phase === 'collect') {
    return (
      <>
        <BrandedHeader />
        <main className="min-h-screen bg-white pt-20 pb-16">
          <div className="section max-w-2xl">
            <div className="rounded-2xl p-8 md:p-12 border"
              style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-md)' }}>

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: 'var(--color-blue-tint)' }}>
                <User size={26} style={{ color: 'var(--color-primary)' }} strokeWidth={1.75} />
              </div>

              <h2 className="text-2xl font-black mb-2"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                Before You Begin
              </h2>
              <p className="text-sm mb-8"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}>
                Enter your details so we can send your results to VSEC College.
              </p>

              <form onSubmit={handleCollect} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-1.5"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)' }}>
                    Full Name <span style={{ color: 'var(--color-gold)' }}>*</span>
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ color: 'var(--color-text-muted)' }} />
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Kwame Mensah"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-colors"
                      style={{
                        fontFamily: 'var(--font-body)',
                        borderColor: 'var(--color-border)',
                        backgroundColor: 'var(--color-surface)',
                        color: 'var(--color-text)',
                      }}
                      onFocus={e => { e.target.style.borderColor = 'var(--color-primary)' }}
                      onBlur={e => { e.target.style.borderColor = 'var(--color-border)' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1.5"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)' }}>
                    Email Address <span style={{ color: 'var(--color-gold)' }}>*</span>
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ color: 'var(--color-text-muted)' }} />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. kwame@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-colors"
                      style={{
                        fontFamily: 'var(--font-body)',
                        borderColor: 'var(--color-border)',
                        backgroundColor: 'var(--color-surface)',
                        color: 'var(--color-text)',
                      }}
                      onFocus={e => { e.target.style.borderColor = 'var(--color-primary)' }}
                      onBlur={e => { e.target.style.borderColor = 'var(--color-border)' }}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full text-base py-4 rounded-xl justify-center mt-2">
                  Begin Test
                  <ArrowRight size={18} />
                </button>

                <p className="text-xs text-center pt-1"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}>
                  Your details are used only to send your results to VSEC College.
                </p>
              </form>
            </div>
          </div>
        </main>
      </>
    )
  }

  // ── Quiz ──────────────────────────────────────────────────────────────────
  if (phase === 'quiz') {
    const progress = (current / questions.length) * 100

    return (
      <>
        <BrandedHeader />
        <main className="min-h-screen bg-white pt-20 pb-16">
          <div className="section max-w-2xl">

            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold uppercase tracking-widest"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}>
                  Question {current + 1} of {questions.length}
                </p>
                <p className="text-xs font-semibold"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}>
                  {Math.round(progress)}% complete
                </p>
              </div>
              <div className="w-full h-2 rounded-full" style={{ backgroundColor: 'var(--color-border)' }}>
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%`, backgroundColor: 'var(--color-gold)' }}
                />
              </div>
            </div>

            <div className="rounded-2xl p-7 md:p-10 border mb-6"
              style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
              <p className="text-xl md:text-2xl font-bold leading-snug"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                {q.question}
              </p>
            </div>

            <div className="space-y-3">
              {q.options.map((option, i) => {
                const isSelected = selected === option
                const isCorrect = option === q.answer
                let bg = 'var(--color-surface)'
                let border = 'var(--color-border)'
                let color = 'var(--color-text)'
                let Icon = null

                if (locked) {
                  if (isCorrect) {
                    bg = 'rgba(34,197,94,0.1)'; border = '#22C55E'; color = '#15803D'; Icon = CheckCircle
                  } else if (isSelected && !isCorrect) {
                    bg = 'rgba(239,68,68,0.1)'; border = '#EF4444'; color = '#B91C1C'; Icon = XCircle
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(option)}
                    disabled={locked}
                    className="w-full text-left flex items-center gap-4 px-5 py-4 rounded-xl border-2 font-medium text-sm transition-all duration-200"
                    style={{ fontFamily: 'var(--font-body)', backgroundColor: bg, borderColor: border, color, cursor: locked ? 'default' : 'pointer' }}
                    onMouseEnter={e => { if (!locked) e.currentTarget.style.borderColor = 'var(--color-primary)' }}
                    onMouseLeave={e => { if (!locked) e.currentTarget.style.borderColor = 'var(--color-border)' }}
                  >
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                      style={{ backgroundColor: locked && isCorrect ? '#22C55E' : locked && isSelected ? '#EF4444' : 'var(--color-blue-tint)', color: locked && (isCorrect || isSelected) ? '#fff' : 'var(--color-primary)' }}>
                      {['A', 'B', 'C', 'D'][i]}
                    </span>
                    <span className="flex-1">{option}</span>
                    {Icon && <Icon size={18} className="flex-shrink-0" />}
                  </button>
                )
              })}
            </div>
          </div>
        </main>
      </>
    )
  }

  // ── Result ────────────────────────────────────────────────────────────────
  return (
    <>
      <BrandedHeader />
      <main>
        <section
          className="pt-14 pb-12 md:pb-20 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0B3D91 0%, #1A52B8 50%, #092E6E 100%)' }}
        >
          <div aria-hidden="true" className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-10"
            style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)', transform: 'translate(25%, -25%)' }} />
          <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: 'var(--color-gold)' }} aria-hidden="true" />
          <div className="section relative text-center pt-8 md:pt-12">
            <p className="text-sm font-bold uppercase tracking-widest mb-3"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}>
              Your Result
            </p>
            <div className="inline-block px-6 py-2 rounded-full mb-4"
              style={{ backgroundColor: 'rgba(212,175,55,0.18)', border: '1px solid rgba(212,175,55,0.45)' }}>
              <span className="text-2xl md:text-3xl font-black"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}>
                {result.badge}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-0"
              style={{ fontFamily: 'var(--font-heading)', lineHeight: '1.2' }}>
              {result.title}
            </h1>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="section max-w-2xl">
            <div className="rounded-2xl p-8 md:p-12 border"
              style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-md)' }}>

              <div className="flex items-center justify-center gap-3 mb-6 pb-6 border-b"
                style={{ borderColor: 'var(--color-border)' }}>
                <div className="text-center">
                  <p className="text-5xl font-black" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                    {score}<span className="text-2xl text-gray-300">/{questions.length}</span>
                  </p>
                  <p className="text-sm mt-1" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}>
                    Questions correct
                  </p>
                </div>
              </div>

              <p className="text-base leading-relaxed text-center mb-8"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)' }}>
                {result.description}
              </p>

              {/* Recommended course card */}
              <div className="rounded-xl p-5 mb-8 border-2"
                style={{ borderColor: 'rgba(212,175,55,0.45)', backgroundColor: 'var(--color-blue-tint)' }}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(212,175,55,0.18)', border: '1px solid rgba(212,175,55,0.4)' }}>
                    <GraduationCap size={18} style={{ color: 'var(--color-gold)' }} strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold uppercase tracking-widest mb-0.5"
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}>
                      Recommended for You
                    </p>
                    <p className="text-base font-black leading-tight"
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                      {result.recommendedCourse}
                    </p>
                    <p className="text-xs mt-0.5"
                      style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}>
                      {result.programName}
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)' }}>
                  {result.recommendedCourseNote}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                <Link
                  to={`/enroll?program=${result.programId}`}
                  className="btn-primary text-base px-8 py-4 rounded-xl justify-center"
                >
                  Apply at VSEC College
                  <ExternalLink size={16} />
                </Link>
                <button
                  onClick={() => setPhase('collect')}
                  className="btn-outline-white text-base px-8 py-4 rounded-xl justify-center inline-flex items-center gap-2"
                  style={{ color: 'var(--color-primary)', borderColor: 'var(--color-border)' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-blue-tint)' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
                >
                  <RotateCcw size={16} />
                  Retake Quiz
                </button>
              </div>

              <p className="text-xs text-center"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}>
                Powered by{' '}
                <a href="https://vseccollege.vercel.app" target="_blank" rel="noreferrer"
                  style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                  VSEC College
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
