import { Globe, Briefcase, Monitor, TrendingUp } from 'lucide-react'

export const programs = [
  {
    id: 'english',
    tag: 'Language',
    title: 'English Language',
    icon: Globe,
    shortDescription:
      'Build confidence in everyday communication, business interactions, presentations, and public speaking.',
    fullDescription:
      'Our English Language program is designed for adults who want to communicate with clarity, confidence, and professionalism. Whether you are navigating the workplace, building a business, or simply want to express yourself better, this program gives you the practical tools to do so. Lessons are taught in real-world contexts — not textbook exercises.',
    whoIsItFor:
      'Working adults, entrepreneurs, job seekers, and anyone who wants to communicate more effectively in professional settings.',
    outcomes: [
      'Speak confidently in business meetings and presentations',
      'Write professional emails, reports, and proposals',
      'Handle interviews and networking conversations with ease',
      'Build vocabulary relevant to your industry and goals',
    ],
    courses: [
      {
        title: 'Foundation English',
        description:
          'Master the core building blocks of English — grammar, sentence structure, and everyday vocabulary — so you can communicate clearly from day one.',
      },
      {
        title: 'Business Communication',
        description:
          'Learn how to communicate professionally in workplace contexts: emails, meetings, phone calls, and business correspondence.',
      },
      {
        title: 'Public Speaking & Presentation',
        description:
          'Develop the confidence and technique to speak in front of groups, present ideas compellingly, and handle questions under pressure.',
      },
      {
        title: 'Professional Writing',
        description:
          'Produce clear, persuasive written content — from formal reports and proposals to professional emails and cover letters.',
      },
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
    tag: 'Business',
    title: 'Business Fundamentals',
    icon: Briefcase,
    shortDescription:
      'Gain practical business acumen — from entrepreneurship and marketing to finance and operations.',
    fullDescription:
      'The Business Fundamentals program gives you the knowledge that used to be locked behind expensive degrees. You will learn how businesses work, how to start and grow your own, and how to make smart decisions with money and people. Every lesson is grounded in practical application, not theory.',
    whoIsItFor:
      'Aspiring entrepreneurs, small business owners, career changers, and anyone who wants to understand how business really works.',
    outcomes: [
      'Understand how to start, plan, and run a business',
      'Read financial statements and make informed money decisions',
      'Build and execute a basic marketing and sales strategy',
      'Lead teams and manage operations with confidence',
    ],
    courses: [
      {
        title: 'Introduction to Entrepreneurship',
        description:
          'Learn the mindset, process, and practical steps behind starting a business — from identifying an opportunity to validating your idea.',
      },
      {
        title: 'Marketing & Sales Basics',
        description:
          'Understand how to attract customers, communicate your value, and convert interest into sales using simple, proven strategies.',
      },
      {
        title: 'Financial Literacy for Business',
        description:
          'Read and interpret financial statements, manage cash flow, set prices, and make decisions that keep your business financially healthy.',
      },
      {
        title: 'Leadership & Management',
        description:
          'Develop the people skills, decision-making habits, and management frameworks that effective leaders use every day.',
      },
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
    tag: 'Technology',
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
