"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { hasReportLocation } from "@/features/report/session/report-session";
import { useReportSession } from "@/features/report/session/use-report-session";
import { Button } from "@/shared/ui/button";

type LocationRequestStatus =
  | "idle"
  | "requesting"
  | "success"
  | "permission-denied"
  | "position-unavailable"
  | "request-timeout"
  | "unsupported";

interface GeolocationFailure {
  status:
    | "permission-denied"
    | "position-unavailable"
    | "request-timeout";
  feedback: string;
}

const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 10_000,
  maximumAge: 60_000,
};

const MAX_MANUAL_LOCATION_LENGTH = 200;

function getGeolocationFailure(
  error: GeolocationPositionError,
): GeolocationFailure {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return {
        status: "permission-denied",
        feedback:
          "Location permission was denied. You can describe the location below instead.",
      };
    case error.POSITION_UNAVAILABLE:
      return {
        status: "position-unavailable",
        feedback:
          "Your device could not determine a location. Try again or describe the location below.",
      };
    case error.TIMEOUT:
      return {
        status: "request-timeout",
        feedback:
          "Finding your location took too long. Try again or describe the location below.",
      };
    default:
      return {
        status: "position-unavailable",
        feedback:
          "Your location could not be found. Try again or describe the location below.",
      };
  }
}

export function LocationConfirmation() {
  const router = useRouter();
  const { session, setCoordinates, setManualLocation } = useReportSession();
  const locationRequestInProgress = useRef(false);
  const [requestStatus, setRequestStatus] =
    useState<LocationRequestStatus>("idle");
  const [geolocationFeedback, setGeolocationFeedback] = useState<string | null>(
    null,
  );

  const deviceCoordinates = session.location.coordinates;
  const manualLocation = session.location.manualDescription;
  const isRequesting = requestStatus === "requesting";
  const isUnsupported = requestStatus === "unsupported";
  const canContinue = hasReportLocation(session.location);

  function handleLocationRequest() {
    if (locationRequestInProgress.current) {
      return;
    }

    if (isRequesting) {
      return;
    }

    if (!("geolocation" in navigator)) {
      setRequestStatus("unsupported");
      setGeolocationFeedback(
        "Current location is unavailable in this browser. Describe the location below instead.",
      );
      return;
    }

    locationRequestInProgress.current = true;
    setRequestStatus("requesting");
    setGeolocationFeedback("Finding your location…");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        locationRequestInProgress.current = false;
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
        setRequestStatus("success");
        setGeolocationFeedback("Location found.");
      },
      (error) => {
        locationRequestInProgress.current = false;
        const failure = getGeolocationFailure(error);
        setRequestStatus(failure.status);
        setGeolocationFeedback(failure.feedback);
      },
      GEOLOCATION_OPTIONS,
    );
  }

  function handleContinue() {
    if (canContinue) {
      router.push("/report/questions");
    }
  }

  return (
    <div className="mt-8">
      <section
        aria-labelledby="device-location-heading"
        className="border-foreground/15 rounded-2xl border p-5"
      >
        <h2 id="device-location-heading" className="text-lg font-semibold">
          Use your device location
        </h2>
        <button
          type="button"
          disabled={isRequesting || isUnsupported}
          aria-busy={isRequesting}
          aria-describedby="geolocation-status"
          className="text-primary border-primary hover:bg-primary hover:text-primary-foreground active:bg-primary-active active:text-primary-foreground focus-visible:outline-focus disabled:border-disabled-background disabled:bg-disabled-background disabled:text-foreground-muted mt-4 min-h-12 w-full cursor-pointer rounded-xl border-2 px-6 py-3.5 text-base leading-6 font-semibold focus-visible:outline-[3px] focus-visible:outline-offset-[3px] disabled:cursor-not-allowed"
          onClick={handleLocationRequest}
        >
          {isRequesting ? "Finding your location…" : "Use my current location"}
        </button>

        <div
          id="geolocation-status"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {geolocationFeedback ? (
            <p className="text-foreground-muted mt-3 text-sm leading-6">
              {geolocationFeedback}
            </p>
          ) : null}
        </div>

        {deviceCoordinates ? (
          <div className="border-foreground/15 bg-selection/40 mt-5 rounded-xl border p-4">
            <h3 className="font-semibold">Device location found</h3>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 text-sm leading-6">
              <div>
                <dt className="text-foreground-muted">Latitude</dt>
                <dd className="font-semibold">
                  {deviceCoordinates.latitude.toFixed(5)}
                </dd>
              </div>
              <div>
                <dt className="text-foreground-muted">Longitude</dt>
                <dd className="font-semibold">
                  {deviceCoordinates.longitude.toFixed(5)}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-foreground-muted">Reported accuracy</dt>
                <dd className="font-semibold">
                  About {Math.round(deviceCoordinates.accuracy)} metres
                </dd>
              </div>
            </dl>
            <p className="text-foreground-muted mt-3 text-sm leading-6">
              These coordinates are a device estimate, not an exact address.
            </p>
          </div>
        ) : null}
      </section>

      <div className="border-foreground/15 mt-4 rounded-2xl border p-5">
        <label
          htmlFor="manual-location"
          className="block text-lg font-semibold"
        >
          Or describe the location
        </label>
        <p
          id="manual-location-hint"
          className="text-foreground-muted mt-1 text-sm leading-6"
        >
          For example: beside the northern entrance to Hagley Park
        </p>
        <textarea
          id="manual-location"
          value={manualLocation}
          maxLength={MAX_MANUAL_LOCATION_LENGTH}
          rows={3}
          aria-describedby="manual-location-hint manual-location-count"
          className="border-foreground/30 bg-background focus:border-primary focus:outline-focus mt-3 min-h-24 w-full resize-y rounded-xl border px-4 py-3 text-base leading-6 focus:outline-[3px] focus:outline-offset-[3px]"
          onChange={(event) => setManualLocation(event.currentTarget.value)}
        />
        <p
          id="manual-location-count"
          className="text-foreground-muted mt-1 text-right text-sm leading-6"
        >
          {manualLocation.length}/{MAX_MANUAL_LOCATION_LENGTH} characters
        </p>
      </div>

      <p className="text-foreground-muted border-foreground/15 bg-selection/40 mt-4 rounded-xl border px-4 py-3 text-sm leading-6">
        Your location stays in this report session for now and is not yet
        submitted or saved.
      </p>

      <div className="mt-6 space-y-3">
        <Button
          type="button"
          disabled={!canContinue}
          onClick={handleContinue}
        >
          Continue
        </Button>
        <Link
          href="/report/photo"
          className="text-primary hover:text-primary-hover active:text-primary-active flex min-h-12 w-full items-center justify-center rounded-xl px-5 py-3 text-center font-semibold underline-offset-4 hover:underline"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
