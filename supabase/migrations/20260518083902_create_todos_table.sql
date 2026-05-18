create table if not exists todos (
  id bigint generated always as identity primary key,

  user_id uuid not null references auth.users(id),

  title text not null,

  created_at timestamptz not null default now()
);
alter table todos enable row level security;

create policy "users can view own todos"
on todos
for select
using (auth.uid() = user_id);

create policy "users can insert own todos"
on todos
for insert
with check (auth.uid() = user_id);