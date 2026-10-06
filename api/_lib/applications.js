export const APPLICATION_NUMBER_RE = /^VSEC-(INT|DOM)-\d{4}-\d{6}$/

export async function loadApplication(supabase, form, number) {
  const { data, error } = await supabase.from(form.table).select('*').eq('application_number', number).maybeSingle()
  if (error) throw error
  return data
}
