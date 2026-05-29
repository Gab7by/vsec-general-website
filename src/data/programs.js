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
    title: 'Information Technology',
    icon: Monitor,
    shortDescription:
      "Learn in-demand digital skills that open doors across every industry in today's tech-driven world.",
    fullDescription:
      'You do not need to be a programmer to thrive in a digital world — but you do need to understand technology. Our IT program teaches you the digital skills that every modern professional needs: how to use essential tools, understand data, and apply technology to solve real business problems.',
    whoIsItFor:
      'Adults new to technology, professionals looking to upskill, business owners wanting to leverage digital tools, and career changers entering tech-adjacent roles.',
    outcomes: [
      'Use computers, software, and the internet with full confidence',
      'Work effectively with productivity and collaboration tools',
      'Understand and work with data using spreadsheets and dashboards',
      'Apply technology to improve business processes and outcomes',
    ],
    courses: [
      {
        title: 'Computer Basics & Digital Literacy',
        description:
          'Start from the ground up — learn how computers work, how to navigate operating systems, and how to stay safe online.',
      },
      {
        title: 'Essential Digital Tools',
        description:
          'Master the tools professionals use every day: Google Workspace, Microsoft Office, email, calendars, and collaboration platforms.',
      },
      {
        title: 'Data Literacy & Spreadsheets',
        description:
          'Learn to collect, organise, analyse, and present data using spreadsheets — a skill valued in virtually every industry.',
      },
      {
        title: 'Technology for Business Growth',
        description:
          'Discover how to use digital marketing tools, e-commerce platforms, automation, and analytics to grow a business online.',
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
    title: 'Professional Development',
    icon: TrendingUp,
    shortDescription:
      'Develop the soft skills and professional mindset that employers and clients look for and respect.',
    fullDescription:
      'Technical knowledge gets you in the door — but professional skills determine how far you go. This program builds the personal and interpersonal competencies that set top performers apart: how you present yourself, manage your time, build relationships, and plan your career with intention.',
    whoIsItFor:
      'Job seekers, career climbers, new graduates, entrepreneurs, and anyone who wants to show up more professionally and purposefully in their work.',
    outcomes: [
      'Build a compelling personal brand that gets noticed',
      'Plan and execute a clear career or business development strategy',
      'Network confidently and build relationships that open doors',
      'Manage your time, energy, and priorities like a top performer',
    ],
    courses: [
      {
        title: 'Career Planning & Goal Setting',
        description:
          'Define your professional goals, map out a realistic career path, and build an action plan that keeps you moving forward.',
      },
      {
        title: 'Personal Branding',
        description:
          'Learn how to present yourself online and in person — crafting a professional image, LinkedIn profile, and personal narrative that stands out.',
      },
      {
        title: 'Networking & Relationship Building',
        description:
          'Develop the skills to build genuine professional connections, make strong first impressions, and grow a network that supports your goals.',
      },
      {
        title: 'Time Management & Productivity',
        description:
          'Master proven frameworks for prioritising tasks, managing energy, avoiding burnout, and getting the right things done consistently.',
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
