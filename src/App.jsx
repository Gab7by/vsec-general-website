import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import ProgramDetailPage from './pages/ProgramDetailPage'
import ContactPage from './pages/ContactPage'
import EnrollPage from './pages/EnrollPage'
import EnglishQuizPage from './pages/EnglishQuizPage'
import StandaloneQuizPage from './pages/StandaloneQuizPage'

// Admin pages are loaded on demand so the public site bundle stays small.
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'))
const AdminApplicantsPage = lazy(() => import('./pages/admin/AdminApplicantsPage'))
const AdminApplicantDetailPage = lazy(() => import('./pages/admin/AdminApplicantDetailPage'))
const AdminLetterPage = lazy(() => import('./pages/admin/AdminLetterPage'))
const AdminSetPasswordPage = lazy(() => import('./pages/admin/AdminSetPasswordPage'))

// Supabase invite / password-recovery links land on the Site URL with the token in the
// hash; send them to the page that lets the admin choose a password.
if (/[#&]type=(invite|recovery)/.test(window.location.hash) && window.location.pathname !== '/admin/set-password') {
  window.location.replace(`/admin/set-password${window.location.hash}`)
}

function AdminRoutes() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }} />}>
      <Routes>
        <Route path="set-password" element={<AdminSetPasswordPage />} />
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="applicants" replace />} />
          <Route path="applicants" element={<AdminApplicantsPage />} />
          <Route path="applicants/:type/:number" element={<AdminApplicantDetailPage />} />
          <Route path="applicants/:type/:number/letter" element={<AdminLetterPage />} />
          <Route path="*" element={<Navigate to="applicants" replace />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

function AppLayout() {
  const location = useLocation()
  const isQuizSubdomain = window.location.hostname === 'englishtest.vseccollege.com'

  if (isQuizSubdomain) {
    return <StandaloneQuizPage />
  }

  if (location.pathname === '/admin' || location.pathname.startsWith('/admin/')) {
    return (
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    )
  }

  const isStandalone = location.pathname === '/quiz'

  return (
    <>
      {!isStandalone && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/programs/:programId" element={<ProgramDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/enroll" element={<EnrollPage />} />
        <Route path="/english-quiz" element={<EnglishQuizPage />} />
        <Route path="/quiz" element={<StandaloneQuizPage />} />
      </Routes>
      {!isStandalone && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}
