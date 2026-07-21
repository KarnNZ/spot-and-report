alter table public.reports
  add column image_analysis jsonb,
  add column image_analysis_model text,
  add column image_analysis_generated_at timestamptz,
  add column image_analysis_approved_at timestamptz;

alter table public.reports
  add constraint reports_image_analysis_complete_check
    check (
      (
        image_analysis is null
        and image_analysis_model is null
        and image_analysis_generated_at is null
        and image_analysis_approved_at is null
      )
      or
      (
        image_analysis is not null
        and image_analysis_model is not null
        and image_analysis_generated_at is not null
        and image_analysis_approved_at is not null
      )
    ),
  add constraint reports_image_analysis_object_check
    check (
      image_analysis is null
      or (
        jsonb_typeof(image_analysis) = 'object'
        and image_analysis ->> 'schemaVersion' = '1.0'
      )
    ),
  add constraint reports_image_analysis_model_length_check
    check (
      image_analysis_model is null
      or char_length(btrim(image_analysis_model)) between 1 and 100
    );
