-- Optimistic atomic writes for the single-document XR CRM store.
-- Conflicts are surfaced instead of silently overwriting a newer CRM state.
create or replace function public.xr_crm_save_state(
  p_state jsonb,
  p_expected_version bigint
)
returns bigint
language plpgsql
security definer
set search_path = ''
as $function$
declare
  next_version bigint;
begin
  if p_expected_version = 0 then
    insert into public.xr_crm_state (id, state, version, updated_at)
    values ('main', p_state, 1, now())
    on conflict (id) do nothing
    returning version into next_version;
    if next_version is not null then
      return next_version;
    end if;
  end if;

  update public.xr_crm_state
     set state = p_state,
         version = version + 1,
         updated_at = now()
   where id = 'main'
     and version = p_expected_version
  returning version into next_version;

  if next_version is null then
    raise exception 'XR_CRM_STATE_CONFLICT' using errcode = '40001';
  end if;

  return next_version;
end;
$function$;

revoke all on function public.xr_crm_save_state(jsonb, bigint) from public, anon, authenticated;
grant execute on function public.xr_crm_save_state(jsonb, bigint) to service_role;
