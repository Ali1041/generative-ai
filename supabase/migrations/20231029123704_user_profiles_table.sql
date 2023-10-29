
create table profiles (
id bigint primary key generated always as identity,
username text,
profession text,
address text,
avatar_url text,
user_id uuid references auth.users not null,
updated_at timestamptz default now(),
created_at timestamptz default now()

constraint username_length check (char_length(username) >= 3)
);

alter table profiles enable row level security;

create policy "Only authenticated users see their own profiles" on profiles for select using (auth.uid() = user_id);
create policy "Only authenticated users can insert in their profiles" on profiles for insert with check (auth.uid() = user_id);
create policy "Only authenticated users can update their profiles" on profiles for update using (auth.uid() = user_id);