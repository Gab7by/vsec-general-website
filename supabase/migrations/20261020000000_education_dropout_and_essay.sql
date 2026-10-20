-- Education: "Nil" and "I am a dropout" options + optional personal statement essay.
-- Institution/country/year are now empty for applicants with no formal education,
-- and "year completed" is replaced by the dropout questions for dropouts.

alter table public.international_applications
  add column dropout_reason   text,
  add column dropout_stage    text,
  add column motivation_essay text,
  alter column institution_name drop not null,
  alter column study_country    drop not null,
  alter column year_completed   drop not null;

alter table public.domestic_applications
  add column dropout_reason   text,
  add column dropout_stage    text,
  add column motivation_essay text,
  alter column institution_name drop not null,
  alter column study_country    drop not null,
  alter column year_completed   drop not null;
