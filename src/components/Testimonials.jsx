const testimonials = [
  { videoUrl: 'https://www.youtube.com/embed/keP1vOZ5UwU' },
  { videoUrl: 'https://www.youtube.com/embed/R96Xlx_IdBM' },
  { videoUrl: 'https://www.youtube.com/embed/BOWSmJwWe7U' },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-14 md:py-20 bg-white">
      <div className="section">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-14">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}
          >
            Student Stories
          </p>
          <h2
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
          >
            Real Results,{' '}
            <span className="gold-underline">Real People</span>
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
          >
            Hear from the students who have transformed their careers and lives through VSEC programs.
          </p>
        </div>

        {/* Video testimonial cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {testimonials.map(({ videoUrl }, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden border transition-shadow duration-200 hover:shadow-lg"
              style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
            >
              <div className="aspect-video">
                <iframe
                  src={videoUrl}
                  title={`Student testimonial ${i + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
