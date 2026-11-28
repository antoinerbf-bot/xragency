-- Migration to restrict audit_logs to director only
-- Added 2026-12-03

create policy "audit_logs_director_only" on public.audit_logs
for select using (
  exists (
    select 1 from public.crm_members m
    where m.auth_user_id = auth.uid()
      and m.role_type = 'direction'
  )
);

-- Allow insert for server side (via trigger) – already uses service role, so no extra policy needed.
