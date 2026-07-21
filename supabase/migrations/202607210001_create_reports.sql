create table if not exists public.reports (
  id uuid primary key,
  reference text not null unique,

  incident_type text not null,
  bird_count integer not null,
  reporter_species text,
  reporter_notes text,

  latitude double precision,
  longitude double precision,
  location_accuracy_meters double precision,
  manual_location_description text,

  ai_summary text not null,

  photo_bucket text not null,
  photo_path text not null,
  photo_original_name text,
  photo_content_type text not null,
  photo_size_bytes bigint not null,

  status text not null default 'submitted',

  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint reports_incident_type_check
    check (incident_type in ('dead', 'sick', 'multiple')),
  constraint reports_bird_count_check
    check (bird_count between 1 and 999),
  constraint reports_status_check
    check (status in ('submitted', 'under_review', 'routed', 'closed')),
  constraint reports_coordinates_complete_check
    check (
      (latitude is null and longitude is null and location_accuracy_meters is null)
      or
      (latitude is not null and longitude is not null and location_accuracy_meters is not null)
    ),
  constraint reports_location_required_check
    check (
      latitude is not null
      or nullif(btrim(manual_location_description), '') is not null
    ),
  constraint reports_latitude_check
    check (latitude is null or latitude between -90 and 90),
  constraint reports_longitude_check
    check (longitude is null or longitude between -180 and 180),
  constraint reports_location_accuracy_check
    check (location_accuracy_meters is null or location_accuracy_meters > 0),
  constraint reports_species_length_check
    check (reporter_species is null or char_length(reporter_species) <= 100),
  constraint reports_notes_length_check
    check (reporter_notes is null or char_length(reporter_notes) <= 500),
  constraint reports_manual_location_length_check
    check (
      manual_location_description is null
      or char_length(manual_location_description) <= 200
    ),
  constraint reports_ai_summary_check
    check (char_length(btrim(ai_summary)) between 1 and 1000),
  constraint reports_photo_content_type_check
    check (
      photo_content_type in (
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/heic',
        'image/heif'
      )
    ),
  constraint reports_photo_size_check
    check (photo_size_bytes between 1 and 4194304),
  constraint reports_photo_bucket_check
    check (photo_bucket = 'report-photos')
);

alter table public.reports enable row level security;

revoke all on table public.reports from anon, authenticated;
grant select, insert, update, delete on table public.reports to service_role;

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'report-photos',
  'report-photos',
  false,
  4194304,
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/heic',
    'image/heif'
  ]::text[]
)
on conflict (id) do update
set
  name = excluded.name,
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Deliberately no policies are created for anon or authenticated roles.
-- The private bucket and reports table are accessed only by the server-held
-- service-role client in this MVP.
