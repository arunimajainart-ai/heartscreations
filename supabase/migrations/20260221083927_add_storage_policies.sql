-- Create a public images bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do update set public = true;

-- Drop existing policies if they exist to avoid conflicts
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Public Upload" on storage.objects;
drop policy if exists "Public Update" on storage.objects;
drop policy if exists "Public Delete" on storage.objects;

-- Allow public read access to all files in the images bucket
create policy "Public Access"
on storage.objects for select
using (bucket_id = 'images');

-- Allow public uploads to the images bucket
create policy "Public Upload"
on storage.objects for insert
with check (bucket_id = 'images');

-- Allow public updates to files in the images bucket
create policy "Public Update"
on storage.objects for update
using (bucket_id = 'images');

-- Allow public deletes to files in the images bucket
create policy "Public Delete"
on storage.objects for delete
using (bucket_id = 'images');