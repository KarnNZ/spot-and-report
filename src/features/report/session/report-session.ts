import type { ApprovedImageAnalysis } from "@/features/report/image-analysis/report-image-analysis";

export interface ReportCoordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export interface ReportLocation {
  coordinates: ReportCoordinates | null;
  manualDescription: string;
}

export function hasReportLocation(location: ReportLocation): boolean {
  return (
    location.coordinates !== null ||
    location.manualDescription.trim().length > 0
  );
}

export type ObservationType = "dead" | "sick" | "multiple";

export interface ReportQuestions {
  observationType: ObservationType | null;
  birdCount: number;
  species: string;
  notes: string;
}

export interface ReportSession {
  photo: File | null;
  approvedImageAnalysis: ApprovedImageAnalysis | null;
  location: ReportLocation;
  questions: ReportQuestions;
  summary: string;
}

export function withReportPhoto(
  session: ReportSession,
  photo: File,
): ReportSession {
  return { ...session, photo, approvedImageAnalysis: null };
}

export function withoutReportPhoto(session: ReportSession): ReportSession {
  return { ...session, photo: null, approvedImageAnalysis: null };
}

export function withApprovedImageAnalysis(
  session: ReportSession,
  approvedImageAnalysis: ApprovedImageAnalysis,
): ReportSession {
  return { ...session, approvedImageAnalysis };
}

export function withoutApprovedImageAnalysis(
  session: ReportSession,
): ReportSession {
  return { ...session, approvedImageAnalysis: null };
}

export interface ReportSessionApi {
  session: ReportSession;
  setPhoto: (photo: File) => void;
  clearPhoto: () => void;
  approveImageAnalysis: (analysis: ApprovedImageAnalysis) => void;
  clearImageAnalysis: () => void;
  setCoordinates: (coordinates: ReportCoordinates) => void;
  setManualLocation: (manualDescription: string) => void;
  clearLocation: () => void;
  setObservationType: (observationType: ObservationType) => void;
  setBirdCount: (birdCount: number) => void;
  setSpecies: (species: string) => void;
  setNotes: (notes: string) => void;
  setSummary: (summary: string) => void;
  clearReport: () => void;
}
