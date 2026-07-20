"use client";

import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import type {
  ObservationType,
  ReportCoordinates,
  ReportSession,
  ReportSessionApi,
} from "@/features/report/session/report-session";

const INITIAL_REPORT_SESSION: ReportSession = {
  photo: null,
  location: {
    coordinates: null,
    manualDescription: "",
  },
  questions: {
    observationType: null,
    birdCount: 1,
    species: "",
    notes: "",
  },
};

const ReportSessionContext = createContext<ReportSessionApi | null>(null);

interface ReportSessionProviderProps {
  children: ReactNode;
}

export function ReportSessionProvider({
  children,
}: ReportSessionProviderProps) {
  const [session, setSession] = useState<ReportSession>(INITIAL_REPORT_SESSION);

  const setPhoto = useCallback((photo: File) => {
    setSession((currentSession) => ({
      ...currentSession,
      photo,
    }));
  }, []);

  const clearPhoto = useCallback(() => {
    setSession((currentSession) => ({
      ...currentSession,
      photo: null,
    }));
  }, []);

  const setCoordinates = useCallback((coordinates: ReportCoordinates) => {
    setSession((currentSession) => ({
      ...currentSession,
      location: {
        ...currentSession.location,
        coordinates,
      },
    }));
  }, []);

  const setManualLocation = useCallback((manualDescription: string) => {
    setSession((currentSession) => ({
      ...currentSession,
      location: {
        ...currentSession.location,
        manualDescription,
      },
    }));
  }, []);

  const clearLocation = useCallback(() => {
    setSession((currentSession) => ({
      ...currentSession,
      location: {
        coordinates: null,
        manualDescription: "",
      },
    }));
  }, []);

  const setObservationType = useCallback(
    (observationType: ObservationType) => {
      setSession((currentSession) => ({
        ...currentSession,
        questions: {
          ...currentSession.questions,
          observationType,
        },
      }));
    },
    [],
  );

  const setBirdCount = useCallback((birdCount: number) => {
    setSession((currentSession) => ({
      ...currentSession,
      questions: {
        ...currentSession.questions,
        birdCount,
      },
    }));
  }, []);

  const setSpecies = useCallback((species: string) => {
    setSession((currentSession) => ({
      ...currentSession,
      questions: {
        ...currentSession.questions,
        species,
      },
    }));
  }, []);

  const setNotes = useCallback((notes: string) => {
    setSession((currentSession) => ({
      ...currentSession,
      questions: {
        ...currentSession.questions,
        notes,
      },
    }));
  }, []);

  const value = useMemo<ReportSessionApi>(
    () => ({
      session,
      setPhoto,
      clearPhoto,
      setCoordinates,
      setManualLocation,
      clearLocation,
      setObservationType,
      setBirdCount,
      setSpecies,
      setNotes,
    }),
    [
      session,
      setPhoto,
      clearPhoto,
      setCoordinates,
      setManualLocation,
      clearLocation,
      setObservationType,
      setBirdCount,
      setSpecies,
      setNotes,
    ],
  );

  return (
    <ReportSessionContext.Provider value={value}>
      {children}
    </ReportSessionContext.Provider>
  );
}

export function useReportSession(): ReportSessionApi {
  const reportSession = useContext(ReportSessionContext);

  if (!reportSession) {
    throw new Error(
      "useReportSession must be used within a ReportSessionProvider.",
    );
  }

  return reportSession;
}
