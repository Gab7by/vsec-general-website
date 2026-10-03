-- Student application form submissions (Domestic + International).
-- Columns mirror src/lib/forms/domestic.js and src/lib/forms/international.js.
-- RLS is enabled with NO policies: only the server (service role key) can read/write.

-- Application No. e.g. VSEC-INT-2026-000001 / VSEC-DOM-2026-000001 (prefix passed as trigger argument)
create function public.set_application_number()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.application_number :=
    tg_argv[0] || '-' || to_char(now() at time zone 'UTC', 'YYYY') || '-' || lpad(new.id::text, 6, '0');
  return new;
end;
$$;
revoke execute on function public.set_application_number() from public, anon, authenticated;

-- ---------------------------------------------------------------- International
create table public.international_applications (
  id                      bigint generated always as identity primary key,
  application_number      text unique,
  created_at              timestamptz not null default now(),

  -- 1. Programme Selection
  programme               text not null,
  study_mode              text not null,
  preferred_start_date    date not null,
  preferred_campus        text not null,
  -- 2. Personal Details
  family_name             text not null,
  given_names             text not null,
  date_of_birth           date not null,
  nationality             text not null,
  gender                  text not null,
  passport_number         text not null,
  passport_expiry_date    date not null,
  residential_address     text not null,
  country                 text not null,
  postal_code             text,
  mobile_phone            text not null,
  email                   text not null,
  -- 3. Emergency Contact
  emergency_name          text not null,
  emergency_relationship  text not null,
  emergency_phone         text not null,
  emergency_email         text,
  -- 4. Educational Background
  education_level         text not null,
  institution_name        text not null,
  study_country           text not null,
  year_completed          smallint not null,
  -- 5. English Language Background
  english_background      text not null,
  english_test            text,
  -- 6. Accommodation & Support Needs
  accommodation           text not null,
  medical_needs           text,
  -- 7. How Did You Hear About VSEC College?
  heard_about             text not null,
  agent_name              text,
  heard_about_other       text,
  -- 8. Declaration
  declaration_agreed      boolean not null check (declaration_agreed),
  signature_name          text not null,
  declaration_date        date not null
);

-- One application per applicant (email + passport). Values are normalised by the API.
create unique index international_applications_applicant_key
  on public.international_applications (email, passport_number);

create trigger international_applications_number
  before insert on public.international_applications
  for each row execute function public.set_application_number('VSEC-INT');

alter table public.international_applications enable row level security;
revoke all on public.international_applications from anon, authenticated;

-- ---------------------------------------------------------------- Domestic
create table public.domestic_applications (
  id                      bigint generated always as identity primary key,
  application_number      text unique,
  created_at              timestamptz not null default now(),

  -- 1. Type of Application
  application_type        text not null,
  -- 2. Programme Selection
  programme               text not null,
  study_mode              text not null,
  preferred_campus        text not null,
  preferred_start_date    date not null,
  referral_agent          text,
  -- 3. Personal Details
  family_name             text not null,
  given_names             text not null,
  date_of_birth           date not null,
  gender                  text not null,
  ghana_card_number       text not null,
  region                  text not null,
  residential_address     text not null,
  city                    text not null,
  hometown                text not null,
  mobile_phone            text not null,
  alt_phone               text,
  email                   text not null,
  occupation              text,
  -- 4. Next of Kin / Emergency Contact
  kin_name                text not null,
  kin_relationship        text not null,
  kin_phone               text not null,
  kin_address             text not null,
  -- 5. Educational Background
  education_level         text not null,
  institution_name        text not null,
  study_country           text not null,
  year_completed          smallint not null,
  -- 6. English Language Proficiency
  english_background      text not null,
  english_test            text,
  -- 7. Corporate-Sponsored Applicants Only (null for individual learners)
  sponsor_org_name        text,
  sponsor_org_address     text,
  sponsor_contact_name    text,
  sponsor_contact_title   text,
  sponsor_contact_phone   text,
  sponsor_contact_email   text,
  applicant_job_title     text,
  billing_address         text,
  purchase_order_ref      text,
  sponsor_confirmed       boolean,
  sponsor_rep_name        text,
  -- 8. Health & Accessibility
  medical_needs           text,
  -- 9. How Did You Hear About VSEC College?
  heard_about             text not null,
  heard_about_detail      text,
  -- 10. Declaration
  declaration_agreed      boolean not null check (declaration_agreed),
  signature_name          text not null,
  declaration_date        date not null,

  constraint domestic_corporate_sponsor_complete check (
    application_type <> 'Corporate-Sponsored Learner'
    or (sponsor_org_name is not null and sponsor_confirmed is true and sponsor_rep_name is not null)
  )
);

-- One application per Ghana Card number (stored uppercase by the API).
create unique index domestic_applications_applicant_key
  on public.domestic_applications (ghana_card_number);

create trigger domestic_applications_number
  before insert on public.domestic_applications
  for each row execute function public.set_application_number('VSEC-DOM');

alter table public.domestic_applications enable row level security;
revoke all on public.domestic_applications from anon, authenticated;

-- ---------------------------------------------------------------- Storage
-- Private bucket that holds the generated Excel databases.
insert into storage.buckets (id, name, public)
values ('applications', 'applications', false)
on conflict (id) do nothing;
