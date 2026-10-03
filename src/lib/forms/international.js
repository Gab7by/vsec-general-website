// Mirrors VSEC_International_Student_Application_Form.docx.
import { countries } from '../../data/countries.js'
import { DECLARATION_TEXT, EDUCATION_LEVELS, ENGLISH_BACKGROUND } from './shared.js'

const AGENT = 'Agent/Recruiter'
const OTHER = 'Other'

export const international = {
  type: 'international',
  label: 'International',
  table: 'international_applications',
  workbookPath: 'international-applicants.xlsx',
  sheetName: 'International Applicants',
  duplicateKey: ['email', 'passport_number'],
  notification: d => ({
    name: `${d.given_names.trim()} ${d.family_name.trim()}`,
    email: d.email.trim(),
    phone: d.mobile_phone.trim(),
    programme: `${d.programme} (${d.study_mode})`,
  }),
  sections: [
    {
      title: 'Programme Selection',
      fields: [
        { name: 'programme', label: 'Programme', type: 'radio', required: true, options: ['General English Programme', 'Executive English Programme'] },
        { name: 'study_mode', label: 'Study Mode', type: 'radio', required: true, options: ['Full-time', 'Part-time'] },
        { name: 'preferred_start_date', label: 'Preferred Start Date', type: 'date', required: true, half: true, rule: 'notPast' },
        { name: 'preferred_campus', label: 'Preferred Campus', type: 'text', required: true, half: true, suggestions: ['Accra Main Campus – Osu', 'Kumasi Main Campus – Anloga Junction', 'Kumasi Other Campus – Abrepo Junction', 'Online'], placeholder: 'e.g. Accra Main Campus – Osu' },
      ],
    },
    {
      title: 'Personal Details',
      fields: [
        { name: 'family_name', label: 'Family Name', type: 'text', required: true, half: true, autoComplete: 'family-name' },
        { name: 'given_names', label: 'Given Name(s)', type: 'text', required: true, half: true, autoComplete: 'given-name' },
        { name: 'date_of_birth', label: 'Date of Birth', type: 'date', required: true, half: true, rule: 'dateOfBirth', autoComplete: 'bday' },
        { name: 'nationality', label: 'Nationality', type: 'select', required: true, half: true, options: countries },
        { name: 'gender', label: 'Gender', type: 'select', required: true, half: true, options: ['Male', 'Female', 'Prefer not to say'] },
        { name: 'passport_number', label: 'Passport Number', type: 'text', required: true, half: true, max: 30 },
        { name: 'passport_expiry_date', label: 'Passport Expiry Date', type: 'date', required: true, half: true, rule: 'future', ruleMessage: 'Your passport must not have expired.' },
        { name: 'residential_address', label: 'Current Residential Address', type: 'textarea', required: true, max: 500, autoComplete: 'street-address' },
        { name: 'country', label: 'Country', type: 'select', required: true, half: true, options: countries },
        { name: 'postal_code', label: 'Postal/ZIP Code', type: 'text', half: true, max: 20, autoComplete: 'postal-code' },
        { name: 'mobile_phone', label: 'Mobile Phone (with country code)', type: 'tel', required: true, half: true, requireCountryCode: true, placeholder: '+233 54 000 0000', autoComplete: 'tel' },
        { name: 'email', label: 'Email Address', type: 'email', required: true, half: true, placeholder: 'name@example.com', autoComplete: 'email' },
      ],
    },
    {
      title: 'Emergency Contact',
      fields: [
        { name: 'emergency_name', label: 'Full Name', type: 'text', required: true, half: true, excelLabel: 'Emergency Contact Name' },
        { name: 'emergency_relationship', label: 'Relationship to Applicant', type: 'text', required: true, half: true, excelLabel: 'Emergency Contact Relationship' },
        { name: 'emergency_phone', label: 'Phone Number', type: 'tel', required: true, half: true, requireCountryCode: true, placeholder: '+233 54 000 0000', excelLabel: 'Emergency Contact Phone' },
        { name: 'emergency_email', label: 'Email Address', type: 'email', half: true, excelLabel: 'Emergency Contact Email' },
      ],
    },
    {
      title: 'Educational Background',
      fields: [
        { name: 'education_level', label: 'Highest Level of Education Completed', type: 'select', required: true, options: EDUCATION_LEVELS },
        { name: 'institution_name', label: 'Name of Institution', type: 'text', required: true },
        { name: 'study_country', label: 'Country of Study', type: 'select', required: true, half: true, options: countries },
        { name: 'year_completed', label: 'Year Completed', type: 'number', required: true, half: true, rule: 'year', placeholder: 'YYYY' },
      ],
    },
    {
      title: 'English Language Background',
      fields: [
        { name: 'english_background', label: 'English Language Background', type: 'radio', required: true, options: ENGLISH_BACKGROUND },
        { name: 'english_test', label: 'Prior English test/certificate & score, if applicable (e.g. IELTS, TOEFL, other)', type: 'text', excelLabel: 'Prior English Test & Score' },
      ],
    },
    {
      title: 'Accommodation & Support Needs',
      fields: [
        { name: 'accommodation', label: 'Accommodation', type: 'radio', required: true, options: ['I need accommodation guidance from VSEC', 'I have arranged my own accommodation'] },
        { name: 'medical_needs', label: 'Do you have any medical conditions or accessibility needs we should be aware of?', type: 'textarea', max: 1000, excelLabel: 'Medical / Accessibility Needs' },
      ],
    },
    {
      title: 'How Did You Hear About VSEC College?',
      fields: [
        { name: 'heard_about', label: 'How did you hear about us?', type: 'radio', required: true, options: [AGENT, 'Friend or Family', 'Social Media', 'Web Search', OTHER], excelLabel: 'Heard About VSEC Via' },
        { name: 'agent_name', label: 'Agent/Recruiter name or agency', type: 'text', requiredIf: d => d.heard_about === AGENT, showIf: d => d.heard_about === AGENT, excelLabel: 'Agent / Agency' },
        { name: 'heard_about_other', label: 'Please specify where you heard about us', type: 'text', requiredIf: d => d.heard_about === OTHER, showIf: d => d.heard_about === OTHER, excelLabel: 'Heard About (Other)' },
      ],
    },
    {
      title: 'Declaration',
      text: DECLARATION_TEXT,
      fields: [
        { name: 'declaration_agreed', label: 'I have read and agree to the declaration above', type: 'checkbox', required: true, errorMessage: 'You must agree to the declaration to submit.', excelLabel: 'Declaration Agreed' },
        { name: 'signature_name', label: 'Print Name (serves as your signature)', type: 'text', required: true, half: true, excelLabel: 'Signature / Print Name' },
        { name: 'declaration_date', label: 'Date', type: 'date', readOnly: true, autoToday: true, half: true, excelLabel: 'Declaration Date' },
      ],
    },
  ],
}
