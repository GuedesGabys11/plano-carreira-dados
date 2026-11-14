-- Sincronização do app Plano de Carreira em Dados (projeto Supabase próprio dela)
create table if not exists public.pc_progress (
  code text primary key check (code ~ '^pc-[a-z0-9]{4}(-[a-z0-9]{4}){5}$'),
  s jsonb not null,
  upd bigint not null default 0,
  ver integer not null default 1,
  saved_at timestamptz not null default now()
);
alter table public.pc_progress enable row level security;
revoke all on public.pc_progress from anon, authenticated;

create or replace function public.pc_get(p_code text)
returns jsonb language sql stable security definer set search_path = '' as $$
  select jsonb_build_object('s', s, 'upd', upd, 'ver', ver)
  from public.pc_progress where code = p_code;
$$;

create or replace function public.pc_ver(p_code text)
returns integer language sql stable security definer set search_path = '' as $$
  select coalesce((select ver from public.pc_progress where code = p_code), 0);
$$;

create or replace function public.pc_save(p_code text, p_s jsonb, p_upd bigint, p_base integer)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare cur integer;
begin
  if p_code !~ '^pc-[a-z0-9]{4}(-[a-z0-9]{4}){5}$' then raise exception 'codigo invalido'; end if;
  if pg_column_size(p_s) > 2000000 then raise exception 'progresso grande demais'; end if;
  select ver into cur from public.pc_progress where code = p_code for update;
  if cur is null then
    if p_base <> 0 then return jsonb_build_object('ok', false, 'ver', 0); end if;
    insert into public.pc_progress(code, s, upd, ver) values (p_code, p_s, p_upd, 1);
    return jsonb_build_object('ok', true, 'ver', 1);
  end if;
  if cur <> p_base then return jsonb_build_object('ok', false, 'ver', cur); end if;
  update public.pc_progress set s = p_s, upd = p_upd, ver = cur + 1, saved_at = now() where code = p_code;
  return jsonb_build_object('ok', true, 'ver', cur + 1);
end;
$$;

revoke all on function public.pc_get(text), public.pc_ver(text), public.pc_save(text, jsonb, bigint, integer) from public;
grant execute on function public.pc_get(text), public.pc_ver(text), public.pc_save(text, jsonb, bigint, integer) to anon, authenticated;
