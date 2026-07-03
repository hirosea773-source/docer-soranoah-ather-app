-- 古いmigrationで作成されたbigint版todosを削除し、uuid版の正しい定義で再作成する
-- このmigrationはプロトタイプ段階のローカル/CI環境向けで、既存Todoデータの保持は前提にしない
drop table if exists public.todos cascade;

create table if not exists public.todos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.todos enable row level security;

create policy "Users can read own todos"
on public.todos
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert own todos"
on public.todos
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update own todos"
on public.todos
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own todos"
on public.todos
for delete
to authenticated
using (auth.uid() = user_id);