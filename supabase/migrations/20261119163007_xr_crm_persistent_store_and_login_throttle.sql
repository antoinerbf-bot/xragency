-- Durable XR CRM state and persistent login throttling.
-- The service_role is the only database role allowed to access these tables.
-- Never expose a Supabase secret/service-role key to browser code.

create table if not exists public.xr_crm_state (
  id text primary key check (id = 'main'),
  state jsonb not null,
  version bigint not null default 1 check (version > 0),
  updated_at timestamptz not null default now()
);

alter table public.xr_crm_state enable row level security;
revoke all on table public.xr_crm_state from public, anon, authenticated;
grant select, insert, update, delete on table public.xr_crm_state to service_role;

create table if not exists public.xr_crm_login_attempts (
  id bigint generated always as identity primary key,
  identifier_hash text not null,
  succeeded boolean not null default false,
  attempted_at timestamptz not null default now()
);

create index if not exists xr_crm_login_attempts_lookup
  on public.xr_crm_login_attempts (identifier_hash, attempted_at desc)
  where succeeded = false;

alter table public.xr_crm_login_attempts enable row level security;
revoke all on table public.xr_crm_login_attempts from public, anon, authenticated;
grant select, insert, delete on table public.xr_crm_login_attempts to service_role;
