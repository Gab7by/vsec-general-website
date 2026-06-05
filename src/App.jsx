import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import ProgramDetailPage from './pages/ProgramDetailPage'
import ContactPage from './pages/ContactPage'
import EnrollPage from './pages/EnrollPage'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/programs/:programId" element={<ProgramDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/enroll" element={<EnrollPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
