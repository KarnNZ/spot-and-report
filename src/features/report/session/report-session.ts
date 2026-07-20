export interface ReportCoordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export interface ReportLocation {
  coordinates: ReportCoordinates | null;
  manualDescription: string;
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
}
