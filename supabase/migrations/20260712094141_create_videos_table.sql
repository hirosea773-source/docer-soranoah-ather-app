create table public.videos (
  id uuid primary key default gen_random_uuid(),
  youtube_video_id text not null unique,
  title text not null,
  channel_title text not null,
  thumbnail_url text not null,
  published_at timestamp with time zone not null,
  duration text not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);
