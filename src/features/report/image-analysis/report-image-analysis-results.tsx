import {
  type ApparentCondition,
  type ImageObservation,
  type ReportImageAnalysis,
} from "./report-image-analysis";

const CONDITION_LABELS: Record<ApparentCondition, string> = {
  appears_alive: "Appears alive",
  possibly_deceased: "Possibly deceased",
  appears_deceased: "Appears deceased",
  unclear: "Unclear",
};

function Confidence({ value }: { value: ImageObservation<unknown>["confidence"] }) {
  return (
    <span className="text-foreground-muted mt-1 block text-sm capitalize">
      {value} confidence
    </span>
  );
}

export function ReportImageAnalysisResults({
  analysis,
}: {
  analysis: ReportImageAnalysis;
}) {
  return (
    <dl className="mt-4 space-y-4">
      {analysis.possibleBirdType.value ? (
        <div>
          <dt className="text-foreground-muted text-sm font-semibold">
            Possible bird type
          </dt>
          <dd className="mt-1 leading-7">
            {analysis.possibleBirdType.value}
            <Confidence value={analysis.possibleBirdType.confidence} />
          </dd>
        </div>
      ) : null}

      {analysis.estimatedVisibleBirdCount.value !== null ? (
        <div>
          <dt className="text-foreground-muted text-sm font-semibold">
            Estimated visible bird count
          </dt>
          <dd className="mt-1 leading-7">
            {analysis.estimatedVisibleBirdCount.value}
            <Confidence
              value={analysis.estimatedVisibleBirdCount.confidence}
            />
          </dd>
        </div>
      ) : null}

      <div>
        <dt className="text-foreground-muted text-sm font-semibold">
          Apparent condition
        </dt>
        <dd className="mt-1 leading-7">
          {CONDITION_LABELS[analysis.apparentCondition.value]}
          <Confidence value={analysis.apparentCondition.confidence} />
        </dd>
      </div>

      <div>
        <dt className="text-foreground-muted text-sm font-semibold">
          Visible concerns
        </dt>
        <dd className="mt-1 leading-7">
          <ul className="list-disc space-y-1 pl-5">
            {analysis.visibleConcerns.value.map((concern, index) => (
              <li key={`${index}-${concern}`}>{concern}</li>
            ))}
          </ul>
          <Confidence value={analysis.visibleConcerns.confidence} />
        </dd>
      </div>

      {analysis.environment.value ? (
        <div>
          <dt className="text-foreground-muted text-sm font-semibold">
            Environment
          </dt>
          <dd className="mt-1 leading-7">
            {analysis.environment.value}
            <Confidence value={analysis.environment.confidence} />
          </dd>
        </div>
      ) : null}
    </dl>
  );
}
