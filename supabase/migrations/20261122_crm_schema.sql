-- ═══════════════════════════════════════════════════════════════════════
-- XR AGENCY CRM — Schéma Supabase Complet + RLS (SELECT / INSERT / UPDATE / DELETE)
-- ═══════════════════════════════════════════════════════════════════════

create table if not exists public.crm_members (
  id text primary key,
  auth_user_id uuid references auth.users(id) on delete set null,
  name text not null,
  short_name text not null,
  role_label text not null,
  role_type text not null check (role_type in ('direction', 'manager', 'setter', 'closer', 'full_cycle', 'student', 'studio')),
  recruited_by text references public.crm_members(id) on delete set null,
  setting_rate numeric(4,2) not null default 0.10,
  closing_rate numeric(4,2) not null default 0.20,
  full_cycle_rate numeric(4,2) not null default 0.20,
  override_rate numeric(4,2) default 0,
  avatar_bg text not null default 'from-amber-400 to-orange-600',
  badge text not null,
  pin_hash text not null,
  custom_pin_set boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.crm_leads (
  id text primary key,
  name text not null,
  contact text not null,
  phone text not null,
  email text,
  website_url text,
  sector_id text not null default 'restaurant',
  service_id text not null default 'websites',
  plan_label text not null,
  billing text not null check (billing in ('once', 'month', 'year')),
  value numeric(12,2) not null default 0,
  extra_items jsonb not null default '[]'::jsonb,
  stage text not null check (stage in ('new', 'rdv', 'mockup', 'negociation', 'won')),
  setter_id text not null references public.crm_members(id),
  closer_id text not null references public.crm_members(id),
  issue text not null default '',
  notes text not null default '',
  follow_up_date date,
  won_at timestamptz,
  installments jsonb not null default '{"plan":"1x","paidCount":0}'::jsonb,
  commission_status text not null default 'estimated' check (commission_status in ('estimated', 'pending_payment', 'unlocked')),
  mockup_ready boolean not null default false,
  studio_status text check (studio_status in ('pending', 'in_production', 'delivered')),
  timeline jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Tables dédiées QG Privé Antoine, Recrutement Martin & Progression XR School (multi-appareils)
create table if not exists public.crm_director_private (
  id text primary key,
  owner_id text not null references public.crm_members(id),
  kind text not null check (kind in ('task', 'agenda', 'habit')),
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.crm_rh_candidates (
  id text primary key,
  manager_id text not null references public.crm_members(id),
  name text not null,
  phone text,
  target_role text not null,
  stage text not null check (stage in ('identified', 'interview', 'training', 'active')),
  notes text default '',
  created_at timestamptz not null default now()
);

create table if not exists public.crm_school_progress (
  member_id text primary key references public.crm_members(id) on delete cascade,
  completed_checks jsonb not null default '[]'::jsonb,
  dojo_stars int not null default 0,
  quiz_best_score int not null default 0,
  updated_at timestamptz not null default now()
);

create index if not exists idx_crm_leads_phone on public.crm_leads(phone);
create index if not exists idx_crm_leads_stage on public.crm_leads(stage);
create index if not exists idx_crm_leads_won_at on public.crm_leads(won_at);
create index if not exists idx_crm_leads_closer on public.crm_leads(closer_id);
create index if not exists idx_crm_leads_setter on public.crm_leads(setter_id);

-- ── Row Level Security Stricte (SELECT / INSERT / UPDATE / DELETE) ──

alter table public.crm_members enable row level security;
alter table public.crm_leads enable row level security;
alter table public.crm_director_private enable row level security;
alter table public.crm_rh_candidates enable row level security;
alter table public.crm_school_progress enable row level security;

-- Helper RLS : vérifier si l'utilisateur peut accéder à un lead donné
create or replace function public.can_access_crm_lead(lead_setter text, lead_closer text, lead_stage text)
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.crm_members me
    where me.auth_user_id = auth.uid()
    and (
      me.role_type = 'direction'
      or (me.role_type = 'studio' and lead_stage in ('mockup', 'won'))
      or lead_setter = me.id
      or lead_closer = me.id
      or (
        me.role_type = 'manager'
        and exists (
          select 1 from public.crm_members sub
          where sub.recruited_by = me.id
          and (sub.id = lead_setter or sub.id = lead_closer)
        )
      )
    )
  );
$$;

create policy "crm_leads_select" on public.crm_leads
for select using (public.can_access_crm_lead(setter_id, closer_id, stage));

create policy "crm_leads_insert" on public.crm_leads
for insert with check (public.can_access_crm_lead(setter_id, closer_id, stage));

create policy "crm_leads_update" on public.crm_leads
for update using (public.can_access_crm_lead(setter_id, closer_id, stage));

create policy "crm_leads_delete" on public.crm_leads
for delete using (
  exists (
    select 1 from public.crm_members me
    where me.auth_user_id = auth.uid()
    and (me.role_type = 'direction' or setter_id = me.id or closer_id = me.id)
  )
);

-- QG Privé : UNIQUEMENT la Direction (Antoine)
create policy "crm_director_private_only_director" on public.crm_director_private
for all using (
  exists (select 1 from public.crm_members me where me.auth_user_id = auth.uid() and me.role_type = 'direction')
);

-- RH Candidats : Direction + Manager propriétaire uniquement
create policy "crm_rh_candidates_rbac" on public.crm_rh_candidates
for all using (
  exists (
    select 1 from public.crm_members me
    where me.auth_user_id = auth.uid()
    and (me.role_type = 'direction' or me.id = crm_rh_candidates.manager_id)
  )
);

-- Vue sécurisée Concours (agrégats anonymisés : maquettes & services vendus, zéro client ni commission)
create or replace view public.crm_contest_stats as
select
  closer_id as member_id,
  count(*) filter (where stage = 'mockup') as mockups_in_progress,
  count(*) filter (where stage in ('rdv', 'negociation')) as active_rdv,
  count(*) filter (where stage = 'won') as won_count,
  jsonb_agg(service_id) filter (where stage = 'won') as sold_services
from public.crm_leads
group by closer_id;
