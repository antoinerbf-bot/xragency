-- Private SaaS tables are accessed through authenticated, owner-scoped RLS.
-- Anonymous visitors must not have direct table privileges.
revoke all on table
  public.kv_store_f7d0f1e3,
  public.profiles,
  public.prospects,
  public.audits,
  public.audit_issues,
  public.audit_opportunities,
  public.audit_logs
from anon;

[executed on device: MacBook-Air-de-rousseau.local (0e45da18-76cf-43a9-8d87-a4dcd1ea626d)]