-- Migration to add audit logs table, indexes, and payroll RLS
-- Added 2026-12-01

create table if not exists public.audit_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null,
  action text not null,
  table_name text not null,
  record_id text,
  details jsonb,
  created_at timestamptz not null default now()
);

-- Indexes for audit logs
create index if not exists idx_audit_logs_user on public.audit_logs(user_id);
create index if not exists idx_audit_logs_table on public.audit_logs(table_name);

-- Composite index for leads status + date (created_at)
create index if not exists idx_crm_leads_status_date on public.crm_leads(stage, created_at);

-- RLS for a payroll view (derived from leads)
create or replace view public.crm_payroll as
select 
  l.id as lead_id,
  l.closer_id as member_id,
  l.value as amount,
  l.won_at as period
from public.crm_leads l
where l.stage = 'won';

alter table public.crm_payroll enable row level security;

create policy "payroll_select_director" on public.crm_payroll
for select using (
  exists (select 1 from public.crm_members m where m.auth_user_id = auth.uid() and m.role_type = 'direction')
);

-- End of migration