-- ═══════════════════════════════════════════════════════════════════════
-- XR AGENCY CRM — Schéma Supabase + Row Level Security (RLS) Stricte
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
  stage text not null check (stage in ('new', 'rdv', 'mockup', 'negociation', 'won')),
  setter_id text not null references public.crm_members(id),
  closer_id text not null references public.crm_members(id),
  issue text not null default '',
  notes text not null default '',
  follow_up_date date,
  commission_status text not null default 'estimated' check (commission_status in ('estimated', 'pending_payment', 'unlocked')),
  mockup_ready boolean not null default false,
  studio_status text check (studio_status in ('pending', 'in_production', 'delivered')),
  timeline jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.crm_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- Index anti-doublons & performances
create index if not exists idx_crm_leads_phone on public.crm_leads(phone);
create index if not exists idx_crm_leads_stage on public.crm_leads(stage);
create index if not exists idx_crm_leads_closer on public.crm_leads(closer_id);
create index if not exists idx_crm_leads_setter on public.crm_leads(setter_id);

-- ── Row Level Security (Cloisonnement inviolable côté serveur) ──

alter table public.crm_members enable row level security;
alter table public.crm_leads enable row level security;
alter table public.crm_settings enable row level security;

-- Fonction utilitaire : rôle de l'utilisateur connecté
create or replace function public.current_crm_member()
returns public.crm_members
language sql
security definer
stable
as $$
  select * from public.crm_members where auth_user_id = auth.uid() limit 1;
$$;

-- Leads : Antoine voit tout ; Martin voit sa filière ; commerciaux voient uniquement les leurs ; Studio voit maquettes & signés
create policy "crm_leads_select_rbac" on public.crm_leads
for select using (
  exists (
    select 1 from public.crm_members me
    where me.auth_user_id = auth.uid()
    and (
      me.role_type = 'direction'
      or (me.role_type = 'studio' and crm_leads.stage in ('mockup', 'won'))
      or crm_leads.setter_id = me.id
      or crm_leads.closer_id = me.id
      or (
        me.role_type = 'manager'
        and exists (
          select 1 from public.crm_members sub
          where sub.recruited_by = me.id
          and (sub.id = crm_leads.setter_id or sub.id = crm_leads.closer_id)
        )
      )
    )
  )
);

-- Vue sécurisée pour le Concours d'Équipe (agrégats uniquement : maquettes & services vendus, zéro client ni commission)
create or replace view public.crm_contest_stats as
select
  closer_id as member_id,
  count(*) filter (where stage = 'mockup') as mockups_in_progress,
  count(*) filter (where stage in ('rdv', 'negociation')) as active_rdv,
  count(*) filter (where stage = 'won') as won_count,
  jsonb_agg(service_id) filter (where stage = 'won') as sold_services
from public.crm_leads
group by closer_id;
