-- Admissions management: review status, admin allow-list and admission letter history.
-- All tables keep RLS enabled with NO policies: only the server (service role) can access them.

-- ---------------------------------------------------------------- Review status on applications
alter table public.international_applications
  add column status                      text not null default 'pending'
    check (status in ('pending', 'qualified', 'admitted', 'rejected')),
  add column status_updated_at           timestamptz,
  add column status_updated_by           uuid,
  add column review_notes                text,
  add column admission_letter_sent_at    timestamptz,
  add column admission_letter_send_count integer not null default 0;

alter table public.domestic_applications
  add column status                      text not null default 'pending'
    check (status in ('pending', 'qualified', 'admitted', 'rejected')),
  add column status_updated_at           timestamptz,
  add column status_updated_by           uuid,
  add column review_notes                text,
  add column admission_letter_sent_at    timestamptz,
  add column admission_letter_send_count integer not null default 0;

create index international_applications_status_idx on public.international_applications (status, created_at desc);
create index domestic_applications_status_idx on public.domestic_applications (status, created_at desc);

-- ---------------------------------------------------------------- Admin allow-list
-- A Supabase Auth account is only an administrator if it has a row here.
create table public.admin_users (
  user_id     uuid primary key references auth.users (id) on delete cascade,
  email       text not null,
  full_name   text,
  created_at  timestamptz not null default now()
);
alter table public.admin_users enable row level security;
revoke all on public.admin_users from anon, authenticated;

-- ---------------------------------------------------------------- Admission letter history
create table public.admission_letters (
  id                  bigint generated always as identity primary key,
  application_type    text not null check (application_type in ('domestic', 'international')),
  application_id      bigint not null,
  application_number  text not null,
  recipient_email     text not null,
  subject             text not null,
  body                text not null,
  signatory_name      text,
  signatory_title     text,
  pdf_path            text,
  status              text not null default 'sending' check (status in ('sending', 'sent', 'failed')),
  error               text,
  idempotency_key     uuid not null unique,
  resend_message_id   text,
  is_resend           boolean not null default false,
  sent_by             uuid,
  sent_by_name        text,
  created_at          timestamptz not null default now(),
  sent_at             timestamptz
);
create index admission_letters_application_idx on public.admission_letters (application_type, application_id, created_at desc);
alter table public.admission_letters enable row level security;
revoke all on public.admission_letters from anon, authenticated;

-- ---------------------------------------------------------------- Atomic "letter sent" bookkeeping
create function public.record_admission_letter_sent(
  p_letter_id bigint,
  p_type text,
  p_application_id bigint,
  p_admin_id uuid,
  p_message_id text
) returns timestamptz
language plpgsql security definer set search_path = '' as $$
declare
  v_now timestamptz := now();
begin
  update public.admission_letters
     set status = 'sent', sent_at = v_now, resend_message_id = p_message_id, error = null
   where id = p_letter_id;

  if p_type = 'international' then
    update public.international_applications
       set status = 'admitted', admission_letter_sent_at = v_now,
           admission_letter_send_count = admission_letter_send_count + 1,
           status_updated_at = v_now, status_updated_by = p_admin_id
     where id = p_application_id;
  elsif p_type = 'domestic' then
    update public.domestic_applications
       set status = 'admitted', admission_letter_sent_at = v_now,
           admission_letter_send_count = admission_letter_send_count + 1,
           status_updated_at = v_now, status_updated_by = p_admin_id
     where id = p_application_id;
  else
    raise exception 'Unknown application type %', p_type;
  end if;

  return v_now;
end;
$$;
revoke execute on function public.record_admission_letter_sent(bigint, text, bigint, uuid, text) from public, anon, authenticated;
grant execute on function public.record_admission_letter_sent(bigint, text, bigint, uuid, text) to service_role;
