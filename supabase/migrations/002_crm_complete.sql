-- ═══════════════════════════════════════════════════════════
-- XRAGENCY CRM COMPLETE — Schema v2 (Additive Migration)
-- Clients, Quotes, Invoices, Projects, Tasks, Providers, Notifications
-- ═══════════════════════════════════════════════════════════

-- ── 1. CLIENTS ──────────────────────────────────────────────
create table if not exists public.clients (
  id                  text primary key,
  lead_id             text references public.prospects(id) on delete set null,
  company             text not null,
  contact_name        text not null,
  email               text not null,
  phone               text,
  website             text,
  city                text default 'Paris',
  country             text default 'France',
  sector              text default 'Commerce / PME',
  services_purchased  text[] default '{}',
  total_revenue_eur   numeric(12, 2) default 0,
  status              text not null default 'active' check (status in ('active', 'vip', 'archived')),
  assigned_to         uuid references public.profiles(id) on delete set null,
  internal_notes      text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index if not exists idx_clients_status on public.clients(status);
create index if not exists idx_clients_email on public.clients(email);

-- ── 2. QUOTES (DEVIS) ────────────────────────────────────────
create table if not exists public.quotes (
  id                  text primary key, -- e.g. DEV-2026-001
  client_id           text references public.clients(id) on delete set null,
  lead_id             text,
  client_name         text not null,
  client_company      text not null,
  client_email        text not null,
  items               jsonb not null default '[]'::jsonb,
  total_once_eur      numeric(12, 2) default 0,
  total_monthly_eur   numeric(12, 2) default 0,
  total_annual_eur    numeric(12, 2) default 0,
  status              text not null default 'sent' check (status in ('draft', 'sent', 'accepted', 'rejected', 'expired')),
  valid_until         timestamptz,
  payment_terms       text,
  notes               text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index if not exists idx_quotes_status on public.quotes(status);

-- ── 3. INVOICES & BANK TRANSFERS ────────────────────────────
create table if not exists public.invoices (
  id                  text primary key, -- e.g. FAC-2026-001 or VIR-2026-001
  quote_id            text references public.quotes(id) on delete set null,
  client_id           text references public.clients(id) on delete set null,
  client_name         text not null,
  client_company      text not null,
  client_email        text not null,
  items               jsonb not null default '[]'::jsonb,
  total_eur           numeric(12, 2) not null,
  tax_rate_pct        numeric(5, 2) default 0,
  tax_notice          text default 'TVA non applicable, art. 293 B du CGI.',
  payment_method      text not null default 'bank_transfer' check (payment_method in ('bank_transfer', 'stripe', 'other')),
  payment_reference   text not null unique,
  bank_details        jsonb not null default '{}'::jsonb,
  status              text not null default 'pending_transfer' check (status in ('pending_transfer', 'paid', 'cancelled', 'refunded')),
  paid_at             timestamptz,
  validated_by        uuid references public.profiles(id) on delete set null,
  due_date            timestamptz not null,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index if not exists idx_invoices_status on public.invoices(status);
create index if not exists idx_invoices_ref on public.invoices(payment_reference);

-- ── 4. PROJECTS ─────────────────────────────────────────────
create table if not exists public.projects (
  id                  text primary key, -- e.g. PRJ-001
  client_id           text references public.clients(id) on delete cascade,
  client_name         text not null,
  project_name        text not null,
  service_category    text not null default 'Web & SEO',
  manager_id          uuid references public.profiles(id) on delete set null,
  stage               text not null default 'production' check (stage in ('prep', 'waiting', 'production', 'review', 'delivered', 'suspended')),
  progress_pct        int default 0 check (progress_pct between 0 and 100),
  budget_eur          numeric(12, 2) default 0,
  start_date          timestamptz default now(),
  delivery_deadline   text,
  live_url            text,
  staging_url         text,
  milestones          jsonb not null default '[]'::jsonb,
  notes               text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index if not exists idx_projects_stage on public.projects(stage);

-- ── 5. TASKS ────────────────────────────────────────────────
create table if not exists public.tasks (
  id                  text primary key,
  title               text not null,
  description         text,
  assigned_to         uuid references public.profiles(id) on delete set null,
  priority            text not null default 'normal' check (priority in ('urgent', 'high', 'normal')),
  status              text not null default 'todo' check (status in ('todo', 'in_progress', 'done', 'overdue')),
  category            text not null default 'pro' check (category in ('pro', 'perso')),
  tag                 text default 'Agence',
  linked_entity_type  text check (linked_entity_type in ('lead', 'client', 'project', 'quote', 'invoice')),
  linked_entity_id    text,
  due_date            text,
  done_at             timestamptz,
  created_at          timestamptz not null default now()
);

create index if not exists idx_tasks_status on public.tasks(status);

-- ── 6. SUBCONTRACTORS / PROVIDERS ───────────────────────────
create table if not exists public.providers (
  id                  text primary key,
  name                text not null,
  company             text,
  email               text not null,
  phone               text,
  specialties         text[] default '{}',
  hourly_rate_eur     numeric(8, 2) default 60,
  availability        text not null default 'available' check (availability in ('available', 'busy', 'offline')),
  missions_count      int default 0,
  total_paid_eur      numeric(12, 2) default 0,
  notes               text,
  created_at          timestamptz not null default now()
);

-- ── 7. NOTIFICATIONS ─────────────────────────────────────────
create table if not exists public.crm_notifications (
  id                  text primary key,
  target_member_id    text not null default 'all',
  type                text not null check (type in ('new_lead', 'payment_received', 'quote_accepted', 'task_due', 'project_update')),
  title               text not null,
  message             text not null,
  read                boolean not null default false,
  link                text,
  created_at          timestamptz not null default now()
);

create index if not exists idx_notif_read on public.crm_notifications(read);

-- ── 8. RLS POLICIES ─────────────────────────────────────────
alter table public.clients enable row level security;
alter table public.quotes enable row level security;
alter table public.invoices enable row level security;
alter table public.projects enable row level security;
alter table public.tasks enable row level security;
alter table public.providers enable row level security;
alter table public.crm_notifications enable row level security;

-- Agency staff can read & write CRM records
create policy "Agency members can view all clients" on public.clients for select using (true);
create policy "Agency members can edit clients" on public.clients for all using (true);

create policy "Agency members can view quotes" on public.quotes for select using (true);
create policy "Agency members can edit quotes" on public.quotes for all using (true);

create policy "Agency members can view invoices" on public.invoices for select using (true);
create policy "Agency members can edit invoices" on public.invoices for all using (true);

create policy "Agency members can view projects" on public.projects for select using (true);
create policy "Agency members can edit projects" on public.projects for all using (true);

create policy "Agency members can manage tasks" on public.tasks for all using (true);
create policy "Agency members can manage providers" on public.providers for all using (true);
create policy "Agency members can view notifications" on public.crm_notifications for all using (true);
