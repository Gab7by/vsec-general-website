// TODO: Replace placeholder names, roles, and photo URLs with real VSEC staff details
const staff = [
  {
    name: 'Dr. Kwame Boateng',
    role: 'Founder & Director',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Mrs. Abena Mensah',
    role: 'Academic Coordinator',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Mr. Kofi Asante',
    role: 'English Language Instructor',
    photo: 'https://randomuser.me/api/portraits/men/65.jpg',
  },
  {
    name: 'Ms. Efua Darko',
    role: 'Business & Entrepreneurship Tutor',
    photo: 'https://randomuser.me/api/portraits/women/28.jpg',
  },
  {
    name: 'Mr. Yaw Frimpong',
    role: 'IT & Technology Instructor',
    photo: 'https://randomuser.me/api/portraits/men/41.jpg',
  },
  {
    name: 'Ms. Akua Owusu',
    role: 'Student Support Officer',
    photo: 'https://randomuser.me/api/portraits/women/55.jpg',
  },
]

export default function Staff() {
  return (
    <section id="team" className="py-20 bg-white">
      <div className="section">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)' }}
          >
            Our Team
          </p>
          <h2
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
          >
            The People{' '}
            <span className="gold-underline">Behind VSEC</span>
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
          >
            Our dedicated team of educators and professionals is committed to
            delivering quality education and genuine support to every student.
          </p>
        </div>

        {/* Staff grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {staff.map(({ name, role, photo }) => (
            <div
              key={name}
              className="card flex flex-col items-center text-center gap-4 py-8"
            >
              {/* Circular photo */}
              <div
                className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 ring-4"
                style={{ ringColor: 'var(--color-primary)', outline: '3px solid var(--color-primary)', outlineOffset: '2px' }}
              >
                <img
                  src={photo}
                  alt={`Photo of ${name}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Name */}
              <div>
                <p
                  className="font-bold text-base leading-snug"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                >
                  {name}
                </p>
                {/* Gold divider */}
                <div
                  className="w-8 h-0.5 mx-auto my-2"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                  aria-hidden="true"
                />
                {/* Role */}
                <p
                  className="text-sm leading-snug"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
                >
                  {role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
