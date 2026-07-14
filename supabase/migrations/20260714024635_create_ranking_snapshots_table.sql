create table public.ranking_snapshots (
  id uuid primary key default gen_random_uuid(),
  region_code text not null,
  category_id text,
  ranking_date timestamp with time zone not null,
  created_at timestamp with time zone not null default now()
);

create index ranking_snapshots_region_category_date_idx
  on public.ranking_snapshots (
    region_code,
    category_id,
    ranking_date desc
  );
