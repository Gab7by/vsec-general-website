export const questions = [
  // ── A1 — Beginner ──────────────────────────────────────────────────────────
  {
    id: 1,
    level: 'a1',
    question: 'What is the correct plural form of "child"?',
    options: ['childs', 'childrens', 'children', "child's"],
    answer: 'children',
  },
  {
    id: 2,
    level: 'a1',
    question: 'Choose the correct sentence: "She ___ to school every day."',
    options: ['go', 'goes', 'going', 'gone'],
    answer: 'goes',
  },
  {
    id: 3,
    level: 'a1',
    question: 'Which word correctly completes the sentence: "___ apple a day keeps the doctor away."',
    options: ['A', 'An', 'The', 'Some'],
    answer: 'An',
  },
  {
    id: 4,
    level: 'a1',
    question: 'Choose the correct word: "I am ___ student."',
    options: ['a', 'an', 'the', 'some'],
    answer: 'a',
  },

  // ── A2 — Elementary ────────────────────────────────────────────────────────
  {
    id: 5,
    level: 'a2',
    question: 'Choose the correct verb form: "Yesterday I ___ to the market."',
    options: ['go', 'going', 'goes', 'went'],
    answer: 'went',
  },
  {
    id: 6,
    level: 'a2',
    question: 'Complete the sentence: "I have lived here ___ five years."',
    options: ['since', 'ago', 'for', 'during'],
    answer: 'for',
  },
  {
    id: 7,
    level: 'a2',
    question: 'Choose the correct comparative form: "This book is ___ than that one."',
    options: ['more interesting', 'interestinger', 'most interesting', 'interestingly'],
    answer: 'more interesting',
  },
  {
    id: 8,
    level: 'a2',
    question: 'Which sentence is correct?',
    options: [
      'She don\'t like coffee.',
      'She doesn\'t likes coffee.',
      'She doesn\'t like coffee.',
      'She not like coffee.',
    ],
    answer: "She doesn't like coffee.",
  },

  // ── B1 — Intermediate ──────────────────────────────────────────────────────
  {
    id: 9,
    level: 'b1',
    question: 'Choose the correct form: "If I ___ more time, I would study harder."',
    options: ['have', 'has', 'having', 'had'],
    answer: 'had',
  },
  {
    id: 10,
    level: 'b1',
    question: 'Which sentence uses the present perfect correctly?',
    options: [
      'I have seen that movie yesterday.',
      'I saw that movie since Monday.',
      'I have already seen that movie.',
      'I see that movie before.',
    ],
    answer: 'I have already seen that movie.',
  },
  {
    id: 11,
    level: 'b1',
    question: 'Choose the sentence in the passive voice.',
    options: [
      'They built the bridge in 1985.',
      'The bridge was built in 1985.',
      'Building the bridge took two years.',
      'The builders finished the bridge.',
    ],
    answer: 'The bridge was built in 1985.',
  },
  {
    id: 12,
    level: 'b1',
    question: 'Choose the word that best completes the sentence: "She has been studying English ___ three hours."',
    options: ['since', 'for', 'during', 'by'],
    answer: 'for',
  },

  // ── B2 — Upper-Intermediate ────────────────────────────────────────────────
  {
    id: 13,
    level: 'b2',
    question: 'Choose the best word: "The new policy was met with considerable ___."',
    options: ['argue', 'disagree', 'opposite', 'resistance'],
    answer: 'resistance',
  },
  {
    id: 14,
    level: 'b2',
    question: 'Select the correctly reported form of: He said, "I am tired."',
    options: [
      'He said that he is tired.',
      'He said that he was tired.',
      'He said that he be tired.',
      'He said that he were tired.',
    ],
    answer: 'He said that he was tired.',
  },
  {
    id: 15,
    level: 'b2',
    question: 'Choose the sentence with the correct relative clause.',
    options: [
      'The man which called you is my brother.',
      'The man who called you is my brother.',
      'The man whom called you is my brother.',
      'The man whose called you is my brother.',
    ],
    answer: 'The man who called you is my brother.',
  },
  {
    id: 16,
    level: 'b2',
    question: 'Which word is closest in meaning to "meticulous"?',
    options: ['careless', 'quick', 'creative', 'thorough'],
    answer: 'thorough',
  },

  // ── C1 — Advanced ──────────────────────────────────────────────────────────
  {
    id: 17,
    level: 'c1',
    question: 'Which sentence contains a grammatical error?',
    options: [
      'Had I known, I would have acted differently.',
      'Not until he left did she realise her mistake.',
      'The report, together with the appendices, were submitted.',
      'Rarely had such talent been seen before.',
    ],
    answer: 'The report, together with the appendices, were submitted.',
  },
  {
    id: 18,
    level: 'c1',
    question: 'Choose the word closest in meaning to "equivocate".',
    options: ['clarify', 'hedge', 'assert', 'simplify'],
    answer: 'hedge',
  },
  {
    id: 19,
    level: 'c1',
    question: 'Select the sentence that correctly uses inversion for emphasis.',
    options: [
      'Never I have seen such dedication.',
      'Never have I seen such dedication.',
      'Never I seen have such dedication.',
      'Never seen have I such dedication.',
    ],
    answer: 'Never have I seen such dedication.',
  },
  {
    id: 20,
    level: 'c1',
    question: 'Which sentence is grammatically correct?',
    options: [
      'The data shows a clear upward trend.',
      'The data show a clear upward trend.',
      'Both A and B are acceptable in formal writing.',
      'Neither A nor B is correct.',
    ],
    answer: 'Both A and B are acceptable in formal writing.',
  },
]

export const levelResults = {
  a1: {
    badge: 'A1 · Beginner',
    title: 'You are at the Beginner level.',
    description:
      'You can understand and use familiar everyday expressions and basic phrases. You are just starting your English journey, and the right foundation will make all the difference.',
    recommendedCourse: 'Adult Literacy',
    recommendedCourseNote: 'Build core reading, writing, and speaking skills from the ground up in a supportive environment designed for adult learners.',
    programId: 'english',
    programName: 'VSEC Adult Literacy Institute',
  },
  a2: {
    badge: 'A2 · Elementary',
    title: 'You are at the Elementary level.',
    description:
      'You can communicate in simple, routine tasks on familiar topics. You have a good starting base — the right course will help you grow quickly and express yourself with greater confidence.',
    recommendedCourse: 'Functional English',
    recommendedCourseNote: 'Develop practical, everyday English for real-life situations including work, social interactions, and everyday communication.',
    programId: 'english',
    programName: 'VSEC Adult Literacy Institute',
  },
  b1: {
    badge: 'B1 · Intermediate',
    title: 'You are at the Intermediate level.',
    description:
      'You can deal with most situations that arise while travelling and describe experiences and events. You are ready to move beyond basics and start communicating with real fluency.',
    recommendedCourse: 'ESL (English as a Second Language)',
    recommendedCourseNote: 'Structured ESL instruction focused on grammar accuracy, conversational fluency, and academic reading and writing skills.',
    programId: 'business',
    programName: 'VSEC Language Academy',
  },
  b2: {
    badge: 'B2 · Upper-Intermediate',
    title: 'You are at the Upper-Intermediate level.',
    description:
      'You can interact with a degree of fluency and spontaneity with native speakers. You are at the threshold of professional and academic fluency — a targeted course will take you the rest of the way.',
    recommendedCourse: 'IELTS Preparation',
    recommendedCourseNote: 'Intensive preparation for IELTS with targeted practice in all four skills: listening, reading, writing, and speaking.',
    programId: 'business',
    programName: 'VSEC Language Academy',
  },
  c1: {
    badge: 'C1 · Advanced',
    title: 'You are at the Advanced level.',
    description:
      'You can express ideas fluently and spontaneously without much obvious searching for expression. Your strong command of English is an asset — polish it for professional and academic excellence.',
    recommendedCourse: 'Business English',
    recommendedCourseNote: 'Refine your professional communication with advanced business writing, presentation skills, and high-stakes negotiation language.',
    programId: 'business',
    programName: 'VSEC Language Academy',
  },
}

export function getLevel(score) {
  if (score <= 4) return 'a1'
  if (score <= 8) return 'a2'
  if (score <= 12) return 'b1'
  if (score <= 16) return 'b2'
  return 'c1'
}
