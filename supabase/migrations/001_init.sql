-- ═══════════════════════════════════════════════════════════
-- XRAGENCY AI DIGITAL AUDIT — Schema v1
-- Run this in Supabase SQL Editor to create all tables + RLS
-- ═══════════════════════════════════════════════════════════

-- ── 1. PROFILES (extends Supabase auth.users) ─────────────
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  role        text not null default 'agency' check (role in ('agency','client')),
  full_name   text,
  company     text,
  avatar_url  text,
  created_at  timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, role, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'role', 'agency'),
    coalesce(new.raw_user_meta_data->>'full_name', new.email)
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── 2. PROSPECTS ──────────────────────────────────────────
create table public.prospects (
  id              uuid primary key default gen_random_uuid(),
  owner_id        uuid not null references public.profiles(id) on delete cascade,
  business_name   text,
  website_url     text not null,
  industry        text,
  country         text,
  city            text,
  contact_name    text,
  contact_email   text,
  phone           text,
  notes           text,
  status          text not null default 'new'
                    check (status in ('new','audited','contacted','qualified','client')),
  latest_score    int,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index idx_prospects_owner on public.prospects(owner_id);
create index idx_prospects_status on public.prospects(status);

-- ── 3. AUDITS ─────────────────────────────────────────────
create table public.audits (
  id              uuid primary key default gen_random_uuid(),
  prospect_id     uuid not null references public.prospects(id) on delete cascade,
  owner_id        uuid not null references public.profiles(id) on delete cascade,
  website_url     text not null,
  status          text not null default 'pending'
                    check (status in ('pending','crawling','analyzing','completed','failed')),
  -- Digital Score (0-100)
  total_score     int,
  score_tech      int,
  score_seo       int,
  score_ux        int,
  score_local     int,
  score_perf      int,
  -- Crawl metadata
  pages_crawled   int default 0,
  page_count      int default 0,
  -- Summary
  executive_summary text,
  -- Timing
  started_at      timestamptz,
  completed_at    timestamptz,
  created_at      timestamptz not null default now()
);

create index idx_audits_prospect on public.audits(prospect_id);
create index idx_audits_owner on public.audits(owner_id);
create index idx_audits_status on public.audits(status);

-- ── 4. AUDIT ISSUES ───────────────────────────────────────
create table public.audit_issues (
  id              uuid primary key default gen_random_uuid(),
  audit_id        uuid not null references public.audits(id) on delete cascade,
  category        text not null
                    check (category in ('technical','seo','ux','local','performance')),
  severity        text not null
                    check (severity in ('critical','high','medium','low','info')),
  title           text not null,
  description     text,
  why_it_matters  text,
  business_impact text,
  recommendation  text,
  score_impact    int default 0,
  detected        boolean not null default true,
  page_url        text,
  created_at      timestamptz not null default now()
);

create index idx_issues_audit on public.audit_issues(audit_id);
create index idx_issues_category on public.audit_issues(category);
create index idx_issues_severity on public.audit_issues(severity);

-- ── 5. AUDIT OPPORTUNITIES ────────────────────────────────
create table public.audit_opportunities (
  id                  uuid primary key default gen_random_uuid(),
  audit_id            uuid not null references public.audits(id) on delete cascade,
  issue_id            uuid references public.audit_issues(id) on delete set null,
  opportunity_name    text not null,
  description         text,
  recommended_service text not null,
  priority            text not null default 'medium'
                        check (priority in ('critical','high','medium','low')),
  estimated_value     int,
  status              text not null default 'detected'
                        check (status in ('detected','proposed','accepted','rejected')),
  created_at          timestamptz not null default now()
);

create index idx_opps_audit on public.audit_opportunities(audit_id);

-- ── 6. AUDIT LOGS (crawl trace) ──────────────────────────
create table public.audit_logs (
  id          uuid primary key default gen_random_uuid(),
  audit_id    uuid not null references public.audits(id) on delete cascade,
  level       text not null default 'info' check (level in ('info','warn','error')),
  message     text not null,
  created_at  timestamptz not null default now()
);

create index idx_logs_audit on public.audit_logs(audit_id);

-- ═══════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════

alter table public.profiles enable row level security;
alter table public.prospects enable row level security;
alter table public.audits enable row level security;
alter table public.audit_issues enable row level security;
alter table public.audit_opportunities enable row level security;
alter table public.audit_logs enable row level security;

-- Profiles: users see only their own
create policy "profiles_self" on public.profiles
  for all using (auth.uid() = id);

-- Prospects: owner only
create policy "prospects_owner" on public.prospects
  for all using (auth.uid() = owner_id);

-- Audits: owner only
create policy "audits_owner" on public.audits
  for all using (auth.uid() = owner_id);

-- Issues: accessible via audit ownership
create policy "issues_owner" on public.audit_issues
  for all using (
    auth.uid() = (select owner_id from public.audits where id = audit_id)
  );

-- Opportunities: accessible via audit ownership
create policy "opps_owner" on public.audit_opportunities
  for all using (
    auth.uid() = (select owner_id from public.audits where id = audit_id)
  );

-- Logs: accessible via audit ownership
create policy "logs_owner" on public.audit_logs
  for all using (
    auth.uid() = (select owner_id from public.audits where id = audit_id)
  );

-- ═══════════════════════════════════════════════════════════
-- UPDATED_AT TRIGGER
-- ═══════════════════════════════════════════════════════════

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_prospects_updated
  before update on public.prospects
  for each row execute function public.set_updated_at();
