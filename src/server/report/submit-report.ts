import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

import {
  persistReport,
  type ReportPersistenceDiagnostic,
  type ReportPersistenceGateway,
  type ReportPersistenceRecord,
} from "@/features/report/submission/report-persistence";
import type {
  StoredReportConfirmation,
  SubmitReportResult,
} from "@/features/report/submission/report-submission";
import { createSupabaseAdminClient } from "@/server/supabase/admin";
import { getSafeErrorDiagnostic } from "@/server/diagnostics/safe-error-diagnostic";

function isMissingBucketError(error: unknown): boolean {
  if (!error || typeof error !== "object") {
    return false;
  }

  const errorRecord = error as Record<string, unknown>;
  return (
    errorRecord.status === 404 ||
    errorRecord.statusCode === 404 ||
    errorRecord.statusCode === "404"
  );
}

function parseStoredReportConfirmation(
  value: unknown,
): StoredReportConfirmation | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const record = value as Record<string, unknown>;

  if (
    typeof record.reference !== "string" ||
    typeof record.submitted_at !== "string" ||
    record.status !== "submitted"
  ) {
    return null;
  }

  return {
    reference: record.reference,
    submittedAt: record.submitted_at,
    status: "submitted",
  };
}

function toDatabaseInsert(report: ReportPersistenceRecord) {
  return {
    id: report.id,
    reference: report.reference,
    incident_type: report.incidentType,
    bird_count: report.birdCount,
    reporter_species: report.reporterSpecies,
    reporter_notes: report.reporterNotes,
    latitude: report.latitude,
    longitude: report.longitude,
    location_accuracy_meters: report.locationAccuracyMeters,
    manual_location_description: report.manualLocationDescription,
    ai_summary: report.aiSummary,
    image_analysis: report.imageAnalysis,
    image_analysis_model: report.imageAnalysisModel,
    image_analysis_generated_at: report.imageAnalysisGeneratedAt,
    image_analysis_approved_at: report.imageAnalysisApprovedAt,
    photo_bucket: report.photoBucket,
    photo_path: report.photoPath,
    photo_original_name: report.photoOriginalName,
    photo_content_type: report.photoContentType,
    photo_size_bytes: report.photoSizeBytes,
    status: report.status,
  };
}

function createSupabasePersistenceGateway(
  supabase: SupabaseClient,
): ReportPersistenceGateway {
  return {
    async uploadPhoto({ bucket, path, photo, contentType }) {
      const photoBytes = await photo.arrayBuffer();
      const { error } = await supabase.storage
        .from(bucket)
        .upload(path, photoBytes, {
          contentType,
          upsert: false,
        });

      if (error) {
        return {
          ok: false,
          reason: isMissingBucketError(error)
            ? "missing-bucket"
            : "operation-failed",
          ...getSafeErrorDiagnostic(error),
        };
      }

      return { ok: true };
    },

    async insertReport(report) {
      const { data, error } = await supabase
        .from("reports")
        .insert(toDatabaseInsert(report))
        .select("reference, submitted_at, status")
        .single();

      if (error) {
        return {
          ok: false,
          reason: "operation-failed",
          ...getSafeErrorDiagnostic(error),
        };
      }

      const storedReport = parseStoredReportConfirmation(data);

      if (!storedReport) {
        return {
          ok: false,
          reason: "operation-failed",
          errorCode: "INVALID_CONFIRMATION",
        };
      }

      return { ok: true, report: storedReport };
    },

    async removePhoto({ bucket, path }) {
      const { error } = await supabase.storage.from(bucket).remove([path]);

      if (error) {
        return {
          ok: false,
          reason: "operation-failed",
          ...getSafeErrorDiagnostic(error),
        };
      }

      return { ok: true };
    },
  };
}

function logSafeDiagnostic(diagnostic: ReportPersistenceDiagnostic): void {
  console.error("Report persistence operation failed.", diagnostic);
}

export async function submitReport(
  formData: FormData,
): Promise<SubmitReportResult> {
  const supabase = createSupabaseAdminClient();
  const gateway = createSupabasePersistenceGateway(supabase);
  return persistReport(formData, gateway, {
    onDiagnostic: logSafeDiagnostic,
  });
}
