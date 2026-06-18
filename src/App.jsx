import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import ProgramDetailPage from './pages/ProgramDetailPage'
import ContactPage from './pages/ContactPage'
import EnrollPage from './pages/EnrollPage'
import EnglishQuizPage from './pages/EnglishQuizPage'
import StandaloneQuizPage from './pages/StandaloneQuizPage'

function AppLayout() {
  const location = useLocation()
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
