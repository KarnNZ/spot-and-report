export interface ReportCoordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export interface ReportLocation {
  coordinates: ReportCoordinates | null;
  manualDescription: string;
}

export interface ReportSession {
  photo: File | null;
  location: ReportLocation;
}

export interface ReportSessionApi {
  session: ReportSession;
  setPhoto: (photo: File) => void;
  clearPhoto: () => void;
  setCoordinates: (coordinates: ReportCoordinates) => void;
  setManualLocation: (manualDescription: string) => void;
  clearLocation: () => void;
}
