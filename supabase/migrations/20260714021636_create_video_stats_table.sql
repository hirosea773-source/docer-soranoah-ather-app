create table public.video_stats (
  id uuid primary key default gen_random_uuid(),
  video_id uuid not null references public.videos(id) on delete cascade,
  view_count bigint not null,
  like_count bigint,
  comment_count bigint,
  collected_at timestamp with time zone not null default now()
);

create index video_stats_video_id_collected_at_idx
  on public.video_stats (video_id, collected_at desc);
