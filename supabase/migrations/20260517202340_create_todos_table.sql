create table public.todos (
  id bigint generated always as identity primary key,

  user_id uuid not null references auth.users(id) on delete cascade,

  title text not null,

  created_at timestamptz not null default now()
);
alter table public.todos
enable row level security;
create policy "Users can view own todos"
on public.todos
for select
using (
  auth.uid() = user_id
);
create policy "Users can insert own todos"
on public.todos
for insert
with check (
  auth.uid() = user_id
);