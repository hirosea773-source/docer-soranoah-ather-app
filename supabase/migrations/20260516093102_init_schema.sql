create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,

  username text unique,
  display_name text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);