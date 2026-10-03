import { international } from './forms/international.js'
import { domestic } from './forms/domestic.js'

export const applicationForms = { domestic, international }

export function getForm(type) {
  return Object.hasOwn(applicationForms, type) ? applicationForms[type] : null
}
