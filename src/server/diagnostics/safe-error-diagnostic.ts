export interface SafeErrorDiagnostic {
  errorName?: string;
  errorCode?: string;
  statusCode?: string;
  underlyingErrorName?: string;
  underlyingErrorCode?: string;
}

function readSafeValue(value: unknown): string | undefined {
  if (typeof value !== "string" && typeof value !== "number") {
    return undefined;
  }

  const normalizedValue = String(value).trim().slice(0, 64);
  return normalizedValue && /^[a-z0-9_.:-]+$/i.test(normalizedValue)
    ? normalizedValue
    : undefined;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : null;
}

export function getSafeErrorDiagnostic(error: unknown): SafeErrorDiagnostic {
  const errorRecord = asRecord(error);

  if (!errorRecord) {
    return {};
  }

  const underlyingError =
    asRecord(errorRecord.originalError) ?? asRecord(errorRecord.cause);
  const nestedCause = underlyingError
    ? asRecord(underlyingError.cause)
    : null;

  return {
    errorName: readSafeValue(errorRecord.name),
    errorCode:
      readSafeValue(errorRecord.code) ?? readSafeValue(errorRecord.error),
    statusCode:
      readSafeValue(errorRecord.statusCode) ??
      readSafeValue(errorRecord.status),
    underlyingErrorName: readSafeValue(underlyingError?.name),
    underlyingErrorCode:
      readSafeValue(underlyingError?.code) ?? readSafeValue(nestedCause?.code),
  };
}
