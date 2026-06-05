import Hero from '../components/Hero'
import WhyVsec from '../components/WhyVsec'
import Programs from '../components/Programs'
import Stats from '../components/Stats'
import Testimonials from '../components/Testimonials'
import CTABanner from '../components/CTABanner'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <WhyVsec />
      <Programs />
      <Stats />
      <Testimonials />
      <CTABanner />
    </main>
  )
}
