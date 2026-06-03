import { Globe, Briefcase, Monitor, TrendingUp } from 'lucide-react'

export const programs = [
  {
    id: 'english',
    title: 'VSEC ADULT LITERACY INSTITUTE',
    icon: Globe,
    shortDescription:
      'Learn English with Confidence. Read, Write, and Speak Fluently.',
    fullDescription:
      'At VSEC Adult Literacy Institute, we help learner develop confidence in reading, writing, and speaking English through practical, easy-to-understand, and interactive learning methods. Whether you are looking to improve communication skills for work, education, business, or everyday life, our programs are designed to support learners at every level. We are committed to creating a supportive learning environment that promotes personal growth, confidence, and lifelong learning.',
    whoIsItFor:
      'Working adults, entrepreneurs, job seekers, and anyone who wants to communicate more effectively in professional settings.',
    outcomes: [
      'Speak confidently in business meetings and daily conversations',
      'Write professional emails, reports, and proposals',
      'Handle interviews and networking conversations with ease',
      'Build vocabulary relevant to your industry and goals',
    ],
    courses: [
      {
        title: 'Adult Literacy',
        description:
          'Designed to help adults develop essential reading, writing, and speaking skills in English for everyday communication, personal growth, and career advancement.',
      },
      {
        title: 'Functional English',
        description:
          'Focuses on practical English skills used in daily life, workplaces, businesses, and social interactions to improve confidence and communication.',
      },
      {
        title: 'WASSCE Preparation',
        description:
          'Structured lessons and exam preparation support for WASSCE candidates, covering key subjects and test-taking strategies to help students succeed.',
      },
      {
        title: 'BECE Preparation',
        description:
          'Structured lessons and exam preparation support for BECE candidates, covering key subjects and test-taking strategies to help students succeed.',
      },
      {
        title: 'Communication Skills for Professionals',
        description:
          'Develops effective verbal and written communication skills, including public speaking, confidence building, interpersonal communication, and professional interaction.',
      }
    ],
    testimonial: {
      quote:
        'VSEC completely changed how I communicate with clients. The Business English course gave me the confidence to present in meetings I used to avoid.',
      name: 'Abena Mensah',
      role: 'Entrepreneur & Small Business Owner',
      initials: 'AM',
    },
  },
  {
    id: 'business',
    title: 'VSEC LANGUAGE ACADEMY',
    icon: Briefcase,
    shortDescription:
      'Learn Languages. Build Confidence. Connect with the World.',
    fullDescription:
      'VSEC Language Academy offers practical language learning programs designed to help you communicate confidently in English, French, and other languages. Our courses focus on real-world communication skills for work, travel, and everyday life. Whether you want to improve your English for business, learn French for travel, or pick up another language for personal growth, our supportive learning environment and experienced instructors will help you achieve your goals.',
    whoIsItFor:
      'Professionals, Students, Migrants, International applicants',
    outcomes: [
      'Communicate confidently in spoken English in everyday, academic, and professional settings.',
      'Read and understand English texts with improved comprehension and vocabulary.',
      'Write clear, correct, and well-structured sentences, emails, and short documents.',
      'Apply effective communication skills in interviews, presentations, and workplace interactions.',
    ],
    courses: [
      {
        title: 'English as a Second Language (ESL)',
        description:
          'Our ESL program is designed to help non-native English speakers build strong foundational skills in listening, speaking, reading, and writing. Learners improve everyday communication, expand vocabulary, and gain confidence using English in academic, professional, and social settings.',
      },
      {
        title: 'IELTS Preparation',
        description:
          'This course equips students with the strategies and skills needed to achieve high scores in the IELTS exam. It focuses on all four modules—Listening, Reading, Writing, and Speaking—while providing practice tests, time management techniques, and exam-focused coaching.',
      },
      {
        title: 'TOEFL Preparation',
        description:
          'Our TOEFL program prepares students for success in the TOEFL iBT exam by strengthening academic English skills. It emphasizes reading comprehension, lecture-based listening, structured writing, and fluent speaking required for university admission abroad.',
      },
      {
        title: 'Business English',
        description:
          'This course helps professionals develop the language skills needed in corporate environments. It covers business communication, email writing, presentations, meetings, negotiations, and professional vocabulary to improve workplace effectiveness and confidence.',
      },
      {
        title: 'Public speaking',
        description:
          'The Public Speaking course builds confidence and clarity in verbal communication. Learners practice speech delivery, audience engagement, storytelling techniques, and presentation skills to speak effectively in formal and informal settings.',
      },
      {
        title: 'Accent Reduction',
        description:
          'This program helps learners improve pronunciation and reduce strong first-language influence when speaking English. It focuses on clarity, intonation, rhythm, and speech patterns to make communication more natural and easily understood by global audiences.',
      }
    ],
    testimonial: {
      quote:
        "I never had the chance to go to university, but VSEC gave me access to real business knowledge. I now run my own consultancy thanks to what I learned here.",
      name: 'Kwame Asante',
      role: 'Business Consultant',
      initials: 'KA',
    },
  },
  {
    id: 'it',
    title: 'VSEC CORPORATE TRAINING SOLUTIONS',
    icon: Monitor,
    shortDescription:
      "Transforming People, Strengthening Organizations.",
    fullDescription:
      'VSEC Corporate Training Solutions provides professional training programs designed to enhance workplace performance, communication, leadership, and productivity. We equip organizations and their teams with practical skills and knowledge to drive growth, improve efficiency, and achieve business success.',
    whoIsItFor:
      'Churches, Banks, NGOs, Hospitals, Government institutions, SMEs',
    outcomes: [
      'Communicate professionally and effectively in workplace environments.',
      'Apply leadership and teamwork skills to improve organizational performance.',
      'Enhance productivity through improved problem-solving and decision-making abilities.',
      'Demonstrate greater confidence and competence in professional and business interactions.',
    ],
    courses: [
      {
        title: 'Business Communication',
        description:
          'Develop professional communication skills for effective interactions with colleagues, clients, and stakeholders in the workplace.',
      },
      {
        title: 'Customer Service',
        description:
          'Learn how to deliver exceptional customer experiences through effective communication, problem-solving, and relationship-building skills.',
      },
      {
        title: 'Leadership communication',
        description:
          'Build the communication skills needed to inspire teams, manage change, resolve conflicts, and lead with confidence.',
      },
      {
        title: 'Workplace writing',
        description:
          'Master the art of writing clear, professional emails, reports, memos, and other business documents for workplace success.',
      },
    ],
    testimonial: {
      quote:
        'The IT fundamentals course opened entirely new doors for me. I was able to transition into a digital marketing role I never thought was possible.',
      name: 'Efua Boateng',
      role: 'Digital Marketing Specialist',
      initials: 'EB',
    },
  },
  {
    id: 'professional-dev',
    tag: 'Growth',
    title: 'VSEC TEACHER DEVELOPMENT INSTITUTE',
    icon: TrendingUp,
    shortDescription:
      'Empowering Educators. Transforming Learning.',
    fullDescription:
      'VSEC Teacher Development Institute provides high-quality professional development programs for educators, equipping them with modern teaching strategies, classroom management techniques, and instructional skills to enhance student learning and academic excellence.',
    whoIsItFor:
      'Teachers, Tutors, Adult educators',
    outcomes: [
      'Apply modern teaching methods to improve classroom instruction and student engagement.',
      'Demonstrate effective classroom management skills to create a positive learning environment.',
      'Design and deliver well-structured lesson plans aligned with learning objectives.',
      'Use assessment and feedback strategies to support continuous student improvement and academic success.',
    ],
    courses: [
      {
        title: 'Modern Teaching Methodologies',
        description:
          'Focuses on student-centered teaching approaches, active learning strategies, and effective lesson delivery techniques.',
      },
      {
        title: 'Classroom Management and Discipline',
        description:
          'Equips teachers with practical skills to maintain order, manage behavior, and create a positive learning environment.',
      },
      {
        title: 'Lesson Planning and Curriculum Design',
        description:
          'Trains educators on how to design structured lesson plans and align teaching content with curriculum standards.',
      },
      {
        title: 'Assessment and Evaluation Techniques',
        description:
          'Develops skills in designing tests, assessing student performance, and using feedback to improve learning outcomes.',
      },
    ],
    testimonial: {
      quote:
        'The Professional Development program helped me stop drifting and start building. I landed a promotion within three months of finishing the course.',
      name: 'Kofi Darkwa',
      role: 'Operations Manager',
      initials: 'KD',
    },
  },
]

export function getProgramById(id) {
  return programs.find(p => p.id === id) ?? null
}
