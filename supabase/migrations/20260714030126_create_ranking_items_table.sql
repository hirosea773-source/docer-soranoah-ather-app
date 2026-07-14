create table public.ranking_items (
  id uuid primary key default gen_random_uuid(),
  snapshot_id uuid not null
    references public.ranking_snapshots(id) on delete cascade,
  video_id uuid not null
    references public.videos(id) on delete cascade,
  rank integer not null,
  score numeric(20, 6),
  constraint ranking_items_rank_positive_check
    check (rank > 0),
  constraint ranking_items_snapshot_video_unique
    unique (snapshot_id, video_id),
  constraint ranking_items_snapshot_rank_unique
    unique (snapshot_id, rank)
);
