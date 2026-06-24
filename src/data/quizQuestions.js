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

  // ── IELTS-Style Questions ──────────────────────────────────────────────────

  // ── A1 — Notice & sign reading ────────────────────────────────────────────
  {
    id: 21,
    level: 'a1',
    question: 'Read the notice: "The library opens at 9am on weekdays and at 11am on weekends. It closes at 6pm every day." When does the library open on Saturday?',
    options: ['9am', '11am', '6pm', '8am'],
    answer: '11am',
  },
  {
    id: 22,
    level: 'a1',
    question: 'Read the instruction: "Mix the ingredients together. Then pour into a tin and bake for 30 minutes." What should you do FIRST?',
    options: ['Bake for 30 minutes', 'Pour into a tin', 'Mix the ingredients', 'Heat the oven'],
    answer: 'Mix the ingredients',
  },
  {
    id: 23,
    level: 'a1',
    question: 'Read the sign: "No food or drink allowed in this area." What does this sign mean?',
    options: [
      'You must buy food here.',
      'You cannot eat or drink here.',
      'Food is provided for free.',
      'Drinks are available nearby.',
    ],
    answer: 'You cannot eat or drink here.',
  },
  {
    id: 24,
    level: 'a1',
    question: 'Which sentence is correct?',
    options: [
      'She have two cats.',
      'She has two cats.',
      'She are having two cats.',
      'She having two cats.',
    ],
    answer: 'She has two cats.',
  },

  // ── A2 — Short email & advertisement reading ───────────────────────────────
  {
    id: 25,
    level: 'a2',
    question: 'Read this email: "Dear Maria, I cannot come to the meeting tomorrow. I have a doctor\'s appointment at that time. Sorry for the inconvenience. — Tom." Why can Tom not attend the meeting?',
    options: [
      'He forgot about the meeting.',
      'He has a medical appointment.',
      'He is travelling abroad.',
      'He is not interested in the topic.',
    ],
    answer: 'He has a medical appointment.',
  },
  {
    id: 26,
    level: 'a2',
    question: 'Choose the correct linking word: "I wanted to go to the beach; ___, it started to rain, so we stayed home."',
    options: ['however', 'so', 'because', 'and'],
    answer: 'however',
  },
  {
    id: 27,
    level: 'a2',
    question: 'Read this advertisement: "English classes for adults. Tuesday and Thursday evenings, 6–8pm. GHS 50 per month. Free for students under 18." How much does an adult pay each month?',
    options: ['Nothing', 'GHS 18', 'GHS 50', 'GHS 100'],
    answer: 'GHS 50',
  },
  {
    id: 28,
    level: 'a2',
    question: 'Choose the word closest in meaning to "purchase".',
    options: ['sell', 'lend', 'buy', 'return'],
    answer: 'buy',
  },

  // ── B1 — Short passage & academic collocations ────────────────────────────
  {
    id: 29,
    level: 'b1',
    question: 'Read this passage: "Research shows that students who take short breaks every 45 minutes perform better on tests than those who study without stopping. A brief rest allows the brain to process and retain information more effectively." According to the passage, what is the main benefit of taking breaks?',
    options: [
      'It makes studying more enjoyable.',
      'It allows the brain to process information more effectively.',
      'It reduces the total time needed to study.',
      'It prevents students from feeling stressed.',
    ],
    answer: 'It allows the brain to process information more effectively.',
  },
  {
    id: 30,
    level: 'b1',
    question: 'Choose the best word to complete this sentence: "The scientist conducted extensive ___ before publishing her findings."',
    options: ['research', 'travel', 'discussion', 'preparation'],
    answer: 'research',
  },
  {
    id: 31,
    level: 'b1',
    question: 'Choose the correct linking word: "She studied very hard for the exam. ___, she did not pass."',
    options: ['As a result', 'Nevertheless', 'Furthermore', 'In addition'],
    answer: 'Nevertheless',
  },
  {
    id: 32,
    level: 'b1',
    question: 'Choose the correct form to complete the sentence: "The results of the study ___ in an international journal last month."',
    options: ['published', 'were published', 'have published', 'are publishing'],
    answer: 'were published',
  },

  // ── B2 — Academic extracts & word formation ───────────────────────────────
  {
    id: 33,
    level: 'b2',
    question: 'Read this extract: "Despite significant advances in renewable energy technology, the global transition away from fossil fuels remains slow, largely due to economic factors and entrenched political interests." What does the passage suggest is the main obstacle to this transition?',
    options: [
      'A lack of renewable energy technology',
      'Economic and political factors',
      'Strong public opposition to change',
      'Insufficient environmental regulations',
    ],
    answer: 'Economic and political factors',
  },
  {
    id: 34,
    level: 'b2',
    question: 'Choose the word closest in meaning to "predominant".',
    options: ['rare', 'minor', 'dominant', 'recent'],
    answer: 'dominant',
  },
  {
    id: 35,
    level: 'b2',
    question: 'Choose the correct word form: "The ___ of the experiment produced unexpected results." (Base word: CONCLUDE)',
    options: ['concluding', 'conclusion', 'conclusive', 'conclusively'],
    answer: 'conclusion',
  },
  {
    id: 36,
    level: 'b2',
    question: 'Which sentence uses formal written English correctly?',
    options: [
      'Not only the temperature increased, but also the pressure.',
      'Not only did the temperature increase, but the pressure also rose.',
      'Not only the temperature did increase, but also the pressure rose.',
      'Not only increased the temperature, but also rose the pressure.',
    ],
    answer: 'Not only did the temperature increase, but the pressure also rose.',
  },

  // ── C1 — Advanced inference & register ───────────────────────────────────
  {
    id: 37,
    level: 'c1',
    question: 'Read this extract: "The author\'s prose is characterised by an almost pathological precision; every word appears weighed, every comma deliberate. Yet this very meticulousness can become its own impediment, occasionally rendering passages opaque where clarity was presumably intended." What criticism of the author\'s style does the passage imply?',
    options: [
      'The writing is too simple for most readers.',
      'Excessive carefulness can make the writing difficult to understand.',
      'The writing lacks sufficient factual detail.',
      'The register is inappropriate for the intended audience.',
    ],
    answer: 'Excessive carefulness can make the writing difficult to understand.',
  },
  {
    id: 38,
    level: 'c1',
    question: 'Choose the word that best completes the sentence: "The diplomat\'s response was deliberately ___, carefully avoiding commitment to any particular position."',
    options: ['candid', 'ambiguous', 'resolute', 'concise'],
    answer: 'ambiguous',
  },
  {
    id: 39,
    level: 'c1',
    question: 'Which sentence is grammatically correct in formal academic writing?',
    options: [
      'Were the data analysed more carefully, different conclusions might emerge.',
      'If the data would be analysed more carefully, different conclusions may emerge.',
      'Unless the data are not analysed more carefully, different conclusions may emerge.',
      'When the data would be analysed, different conclusions are emerging.',
    ],
    answer: 'Were the data analysed more carefully, different conclusions might emerge.',
  },
  {
    id: 40,
    level: 'c1',
    question: 'In formal academic writing, which word is the most appropriate substitute for "show"?',
    options: ['prove', 'demonstrate', 'tell', 'reveal'],
    answer: 'demonstrate',
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
  if (score <= 8)  return 'a1'
  if (score <= 16) return 'a2'
  if (score <= 24) return 'b1'
  if (score <= 32) return 'b2'
  return 'c1'
}
