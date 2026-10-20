export const DECLARATION_TEXT =
  "I declare that the information provided in this application is true, complete, and accurate to the best of my knowledge. I understand that providing false information may result in the withdrawal of any offer of admission. I agree to comply with VSEC College's policies, code of conduct, and fee terms, and I understand that this form does not guarantee admission."

export const NIL = 'Nil'
export const DROPOUT = 'I am a dropout'

export const EDUCATION_LEVELS = [
  NIL, 'Primary/JHS', 'Secondary/High School (SHS/WASSCE)', 'Diploma/Certificate', "Bachelor's Degree", "Master's Degree", 'Doctorate', DROPOUT, 'Other',
]

export const ESSAY_QUESTION = 'Why do you want to improve your English-speaking skills or further develop yourself?'

/**
 * Educational Background fields shared by both forms. "Nil" hides the institution
 * questions; "I am a dropout" replaces "Year Completed" with two dropout questions.
 */
export function educationFields({ countries, defaultCountry }) {
  const level = d => d.education_level
  return [
    { name: 'education_level', label: 'Highest Level of Education Completed', type: 'select', required: true, options: EDUCATION_LEVELS },
    { name: 'institution_name', label: 'Name of Institution', type: 'text', required: true, showIf: d => level(d) !== NIL },
    { name: 'study_country', label: 'Country of Study', type: 'select', required: true, half: true, options: countries, showIf: d => level(d) !== NIL, ...(defaultCountry ? { defaultValue: defaultCountry } : {}) },
    { name: 'year_completed', label: 'Year Completed', type: 'number', required: true, half: true, rule: 'year', placeholder: 'YYYY', showIf: d => level(d) !== NIL && level(d) !== DROPOUT },
    { name: 'dropout_reason', label: 'Why did you drop out?', type: 'textarea', max: 1000, preserveCase: true, requiredIf: d => level(d) === DROPOUT, showIf: d => level(d) === DROPOUT, excelLabel: 'Dropout Reason' },
    { name: 'dropout_stage', label: 'In which year or at what educational level did you drop out?', type: 'text', max: 100, placeholder: 'e.g. 2015, SHS 2', requiredIf: d => level(d) === DROPOUT, showIf: d => level(d) === DROPOUT, excelLabel: 'Dropout Year / Level' },
  ]
}

export const personalStatementSection = {
  title: 'Personal Statement',
  fields: [
    { name: 'motivation_essay', label: ESSAY_QUESTION, type: 'textarea', max: 5000, rows: 8, preserveCase: true, hint: 'Optional — share your goals in your own words.', excelLabel: 'Personal Statement' },
  ],
}

export const ENGLISH_BACKGROUND = [
  'English is my first language', 'I have studied English before', 'This is my first time studying English formally',
]

export const GENDERS = ['Male', 'Female', 'Prefer not to say']
