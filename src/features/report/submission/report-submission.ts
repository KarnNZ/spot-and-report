import type {
  ObservationType,
  ReportCoordinates,
} from "@/features/report/session/report-session";

export interface ReportSubmissionPayload {
  observationType: ObservationType;
  birdCount: number;
  species: string | null;
  notes: string | null;
  photo: File;
  location: {
    coordinates: ReportCoordinates | null;
    manualDescription: string | null;
  };
}

export type SubmissionResult =
  | {
      success: true;
      payload: ReportSubmissionPayload;
    }
  | {
      success: false;
      errors: string[];
    };
