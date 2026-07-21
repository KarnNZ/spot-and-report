# Supabase Setup

Spot & Report stores submitted reports in Supabase Postgres and keeps report
photos in a private Supabase Storage bucket. Reports are recorded by the
application but are not yet delivered to an external agency.

## 1. Create a Supabase project

Create a project in the Supabase dashboard and wait for its database and
Storage services to become ready. Do not commit the project URL or any API key
to this repository.

## 2. Apply the migration

Apply the migrations in filename order through the Supabase SQL Editor, or
link the project with the Supabase CLI and run `supabase db push`:

1. [`202607210001_create_reports.sql`](../supabase/migrations/202607210001_create_reports.sql)
2. [`202607210002_add_image_analysis.sql`](../supabase/migrations/202607210002_add_image_analysis.sql)

The migration:

- creates `public.reports` with domain and size constraints;
- enables Row Level Security without anonymous or authenticated policies;
- creates or updates the private `report-photos` bucket;
- limits the bucket to JPEG, PNG, WebP, HEIC and HEIF images up to 4 MB.
- adds nullable structured fields for reporter-approved image observations and
  their model, generation time and approval time.

After applying it, confirm that `report-photos` is marked private and that no
anonymous policies grant access to either `public.reports` or objects in this
bucket.

## 3. Configure local environment variables

Copy `.env.example` to `.env.local` and set:

```text
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

The project URL is intentionally public. The service-role key is privileged:
it bypasses Row Level Security and must exist only in server configuration.
Never prefix the service-role key with `NEXT_PUBLIC_`, expose it to browser
code, or include it in logs.

Local environment files are ignored by Git.

## 4. Configure Vercel

Add both variables to the appropriate Vercel Development, Preview and
Production environments:

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Redeploy after changing environment configuration.

Vercel Functions accept request bodies up to 4.5 MB. Because a report uses
`multipart/form-data`, Spot & Report limits the photo itself to 4 MB so the
complete request remains below that platform boundary. The same limit is
enforced by the browser, server validation, database constraint and private
Storage bucket.

## 5. Verify a stored report

Complete one report in the deployed application, then:

1. Find its reference in `public.reports` using the Supabase Table Editor or a
   restricted SQL query.
2. Confirm its `status` is `submitted` and its final edited `ai_summary` is
   stored.
3. When image observations were approved, confirm `image_analysis` and its
   associated model and timestamps are stored. When they were skipped or
   discarded, confirm those columns remain null.
4. Confirm its `photo_path` points to one object in the private
   `report-photos` bucket.
5. Confirm the bucket does not expose a public URL for that object.
6. Refresh the confirmation route and confirm the displayed reference does not
   change.

Do not publish screenshots containing report notes, coordinates, summaries,
service credentials or private Storage paths.

## 6. Verify failure behaviour

Run `npm test` to exercise validation, upload failure, insert failure,
compensating cleanup and client-session preservation with mocked Supabase
boundaries.

For a configured non-production test project, confirm that a failed request
leaves the Review screen available with its current report data and a retryable
error. A failed database insert must attempt to remove the previously uploaded
photo and must never display a successful confirmation.

## Security boundary

The browser sends one validated multipart request to the Next.js server. Only
the server creates the privileged Supabase client, storage path, report UUID
and human-readable reference. The browser cannot write directly to Postgres or
Storage, and the response excludes the internal UUID, coordinates, private
bucket name and object path.
