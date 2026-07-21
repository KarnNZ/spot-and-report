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
  location: ReportLocation;
  questions: ReportQuestions;
  summary: string;
}

export interface ReportSessionApi {
  session: ReportSession;
  setPhoto: (photo: File) => void;
  clearPhoto: () => void;
  setCoordinates: (coordinates: ReportCoordinates) => void;
  setManualLocation: (manualDescription: string) => void;
  clearLocation: () => void;
  setObservationType: (observationType: ObservationType) => void;
  setBirdCount: (birdCount: number) => void;
  setSpecies: (species: string) => void;
  setNotes: (notes: string) => void;
  setSummary: (summary: string) => void;
}
