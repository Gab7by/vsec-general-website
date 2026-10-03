// Mirrors VSEC_Student_Application_Form_Domestic.docx (Domestic / Ghanaian applicants).
import { countries } from '../../data/countries.js'
import { DECLARATION_TEXT, EDUCATION_LEVELS, ENGLISH_BACKGROUND, GENDERS } from './shared.js'

const CORPORATE = 'Corporate-Sponsored Learner'
const AGENT = 'Agent/Recruiter'
const PARTNERSHIP = 'Corporate Partnership'
const OTHER = 'Other'
const isCorporate = d => d.application_type === CORPORATE

const GHANA_REGIONS = [
  'Ahafo', 'Ashanti', 'Bono', 'Bono East', 'Central', 'Eastern', 'Greater Accra', 'North East', 'Northern',
  'Oti', 'Savannah', 'Upper East', 'Upper West', 'Volta', 'Western', 'Western North',
]

export const domestic = {
  type: 'domestic',
  label: 'Domestic',
  table: 'domestic_applications',
  workbookPath: 'domestic-applicants.xlsx',
  sheetName: 'Domestic Applicants',
  duplicateKey: ['ghana_card_number'],
  notification: d => ({
    name: `${d.given_names.trim()} ${d.family_name.trim()}`,
    email: d.email.trim(),
    phone: d.mobile_phone.trim(),
    programme: `${d.programme.trim()} (${d.study_mode})`,
    applicationCategory: d.application_type,
    ...(isCorporate(d) ? { sponsor: d.sponsor_org_name.trim() } : {}),
  }),
  sections: [
    {
      title: 'Type of Application',
      fields: [
        { name: 'application_type', label: 'Type of Application', type: 'radio', required: true, options: ['Individual Learner (Self-sponsored)', CORPORATE], hint: 'Corporate-sponsored learners will also complete a Corporate Sponsor section below.' },
      ],
    },
    {
      title: 'Programme Selection',
      fields: [
        { name: 'programme', label: 'Programme Applied For', type: 'text', required: true, placeholder: 'e.g. General English, Executive English, Professional/Skills Training — specify', suggestions: ['General English', 'Executive English', 'Professional/Skills Training'] },
        { name: 'study_mode', label: 'Study Mode', type: 'radio', required: true, options: ['Full-time', 'Part-time', 'Online'] },
        { name: 'preferred_campus', label: 'Preferred Campus', type: 'radio', required: true, options: ['Kumasi Main Campus – Anloga Junction', 'Kumasi Other Campus – Abrepo Junction', 'Accra Main Campus – Osu', 'Online'] },
        { name: 'preferred_start_date', label: 'Preferred Start Date', type: 'date', required: true, half: true, rule: 'notPast' },
        { name: 'referral_agent', label: 'Referral/Agent Name', type: 'text', half: true, excelLabel: 'Referral / Agent Name' },
      ],
    },
    {
      title: 'Personal Details',
      fields: [
        { name: 'family_name', label: 'Family Name (Surname)', type: 'text', required: true, half: true, autoComplete: 'family-name' },
        { name: 'given_names', label: 'Given Name(s)', type: 'text', required: true, half: true, autoComplete: 'given-name' },
        { name: 'date_of_birth', label: 'Date of Birth', type: 'date', required: true, half: true, rule: 'dateOfBirth', autoComplete: 'bday' },
        { name: 'gender', label: 'Gender', type: 'select', required: true, half: true, options: GENDERS },
        { name: 'ghana_card_number', label: 'Ghana Card Number', type: 'text', required: true, half: true, max: 15, placeholder: 'GHA-000000000-0', pattern: /^GHA-\d{9}-\d$/i, patternMessage: 'Enter your Ghana Card number in the format GHA-000000000-0.' },
        { name: 'region', label: 'Region', type: 'select', required: true, half: true, options: GHANA_REGIONS },
        { name: 'residential_address', label: 'Residential Address', type: 'textarea', required: true, max: 500, placeholder: 'House number, street or digital address (e.g. GA-123-4567)', autoComplete: 'street-address' },
        { name: 'city', label: 'City / Town', type: 'text', required: true, half: true, autoComplete: 'address-level2' },
        { name: 'hometown', label: 'Hometown', type: 'text', required: true, half: true },
        { name: 'mobile_phone', label: 'Mobile Phone', type: 'tel', required: true, half: true, placeholder: '054 000 0000', autoComplete: 'tel' },
        { name: 'alt_phone', label: 'Alternative/WhatsApp Number', type: 'tel', half: true, placeholder: '020 000 0000' },
        { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'name@example.com', autoComplete: 'email' },
        { name: 'occupation', label: 'Current Occupation / Employer', type: 'text', excelLabel: 'Occupation / Employer' },
      ],
    },
    {
      title: 'Next of Kin / Emergency Contact',
      fields: [
        { name: 'kin_name', label: 'Full Name', type: 'text', required: true, half: true, excelLabel: 'Next of Kin Name' },
        { name: 'kin_relationship', label: 'Relationship to Applicant', type: 'text', required: true, half: true, excelLabel: 'Next of Kin Relationship' },
        { name: 'kin_phone', label: 'Phone Number', type: 'tel', required: true, half: true, placeholder: '054 000 0000', excelLabel: 'Next of Kin Phone' },
        { name: 'kin_address', label: 'Residential Address / Town', type: 'text', required: true, half: true, excelLabel: 'Next of Kin Address / Town' },
      ],
    },
    {
      title: 'Educational Background',
      fields: [
        { name: 'education_level', label: 'Highest Level of Education Completed', type: 'select', required: true, options: EDUCATION_LEVELS },
        { name: 'institution_name', label: 'Name of Institution', type: 'text', required: true },
        { name: 'study_country', label: 'Country of Study', type: 'select', required: true, half: true, options: countries, defaultValue: 'Ghana' },
        { name: 'year_completed', label: 'Year Completed', type: 'number', required: true, half: true, rule: 'year', placeholder: 'YYYY' },
      ],
    },
    {
      title: 'English Language Proficiency',
      fields: [
        { name: 'english_background', label: 'English Language Proficiency', type: 'radio', required: true, options: ENGLISH_BACKGROUND },
        { name: 'english_test', label: 'Prior English test/certificate & score, if any (e.g. IELTS, TOEFL, other)', type: 'text', excelLabel: 'Prior English Test & Score' },
      ],
    },
    {
      title: 'Corporate Sponsor Details',
      note: 'Complete this section because you selected "Corporate-Sponsored Learner".',
      showIf: isCorporate,
      fields: [
        { name: 'sponsor_org_name', label: 'Sponsoring Organisation Name', type: 'text', required: true, excelLabel: 'Sponsor Organisation' },
        { name: 'sponsor_org_address', label: 'Organisation Address', type: 'textarea', required: true, max: 500, excelLabel: 'Sponsor Address' },
        { name: 'sponsor_contact_name', label: 'HR / Contact Person Name', type: 'text', required: true, half: true, excelLabel: 'Sponsor Contact Name' },
        { name: 'sponsor_contact_title', label: 'Contact Person Title', type: 'text', required: true, half: true, excelLabel: 'Sponsor Contact Title' },
        { name: 'sponsor_contact_phone', label: 'Contact Person Phone', type: 'tel', required: true, half: true, placeholder: '030 000 0000', excelLabel: 'Sponsor Contact Phone' },
        { name: 'sponsor_contact_email', label: 'Contact Person Email', type: 'email', required: true, half: true, excelLabel: 'Sponsor Contact Email' },
        { name: 'applicant_job_title', label: "Applicant's Position / Job Title in Organisation", type: 'text', required: true, excelLabel: 'Applicant Job Title' },
        { name: 'billing_address', label: 'Billing / Invoice Address (if different from above)', type: 'textarea', max: 500, excelLabel: 'Billing / Invoice Address' },
        { name: 'purchase_order_ref', label: 'Purchase Order / Reference No.', type: 'text', max: 60, excelLabel: 'Purchase Order / Ref No.' },
        { name: 'sponsor_confirmed', label: 'The sponsoring organisation confirms it has agreed to pay tuition fees for the named applicant.', type: 'checkbox', required: true, errorMessage: "Please confirm the organisation has agreed to pay the applicant's tuition fees.", excelLabel: 'Sponsor Confirmed Fees' },
        { name: 'sponsor_rep_name', label: 'Authorised Sponsor Representative — Full Name', type: 'text', required: true, half: true, excelLabel: 'Sponsor Representative' },
      ],
    },
    {
      title: 'Health & Accessibility',
      fields: [
        { name: 'medical_needs', label: 'Any medical conditions or accessibility needs we should be aware of?', type: 'textarea', max: 1000, excelLabel: 'Medical / Accessibility Needs' },
      ],
    },
    {
      title: 'How Did You Hear About VSEC College?',
      fields: [
        { name: 'heard_about', label: 'How did you hear about us?', type: 'radio', required: true, options: [AGENT, 'Friend or Family', 'Social Media', 'Web Search', PARTNERSHIP, OTHER], excelLabel: 'Heard About VSEC Via' },
        { name: 'heard_about_detail', label: 'Please specify (agent, company or source)', type: 'text', requiredIf: d => [AGENT, PARTNERSHIP].includes(d.heard_about), showIf: d => [AGENT, PARTNERSHIP, OTHER].includes(d.heard_about), errorMessage: 'Please name the agent, company or partnership.', excelLabel: 'Heard About — Details' },
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
